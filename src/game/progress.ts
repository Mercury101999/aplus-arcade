import { DOMAIN_IDS, EXAM_IDS, type DomainId, type ExamId, type Question } from '@/content/types';

import {
  ACCURACY_SOLID_PERCENT,
  CORRECT_XP,
  LEVEL_BASE_XP,
  PARTICIPATION_XP,
  SOMEWHAT_BONUS_XP,
  SURE_BONUS_XP,
} from './constants';
import { isSelectionCorrect } from './quiz';

export type Confidence = 'guessing' | 'somewhat' | 'sure';

export const CONFIDENCE_LEVELS: readonly Confidence[] = ['guessing', 'somewhat', 'sure'];

export interface Tally {
  answered: number;
  correct: number;
}

export interface ReviewItem {
  reason: 'missed' | 'low-confidence';
  updatedAt: string;
}

export interface Achievement {
  id:
    | 'first-answer'
    | 'first-round'
    | 'clean-sweep'
    | 'streak-3'
    | 'streak-7'
    | 'xp-100'
    | 'xp-500'
    | 'sure-10'
    | 'review-clear-5'
    | 'all-domains'
    | 'century'
    | 'comeback';
  name: string;
  description: string;
  earned: (state: ProgressState) => boolean;
}

export interface ProgressState {
  version: 1;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  totals: Tally;
  byExam: Record<ExamId, Tally>;
  byDomain: Record<DomainId, Tally>;
  confidence: Record<Confidence, Tally>;
  confidentlyWrong: number;
  sureCorrect: number;
  reviewCleared: number;
  roundsCompleted: number;
  cleanSweeps: number;
  review: Record<string, ReviewItem>;
  achievements: Achievement['id'][];
  confidentMisses: string[];
}

export interface AnswerInput {
  selected: number[];
  confidence: Confidence;
}

export type ReviewChange = 'added' | 'kept' | 'cleared' | 'none';

export interface AnswerResult {
  state: ProgressState;
  correct: boolean;
  xpGained: number;
  unlocked: Achievement[];
  confidentlyWrong: boolean;
  reviewChange: ReviewChange;
}

export interface RoundSummary {
  total: number;
  correctCount: number;
}

export interface LevelProgress {
  level: number;
  into: number;
  span: number;
  nextAt: number;
}

const ACHIEVEMENT_LIST: Achievement[] = [
  {
    id: 'first-answer',
    name: 'Clocked in',
    description: 'Answer your first question.',
    earned: (state) => state.totals.answered >= 1,
  },
  {
    id: 'first-round',
    name: 'Shift complete',
    description: 'Finish a quiz round.',
    earned: (state) => state.roundsCompleted >= 1,
  },
  {
    id: 'clean-sweep',
    name: 'Clean sweep',
    description: 'Finish a 10-question round with every answer correct.',
    earned: (state) => state.cleanSweeps >= 1,
  },
  {
    id: 'streak-3',
    name: 'Three-day streak',
    description: 'Study three days in a row.',
    earned: (state) => state.streak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Week on the desk',
    description: 'Study seven days in a row.',
    earned: (state) => state.streak >= 7,
  },
  {
    id: 'xp-100',
    name: 'Ticket stack',
    description: 'Earn 100 XP.',
    earned: (state) => state.xp >= 100,
  },
  {
    id: 'xp-500',
    name: 'Senior on the floor',
    description: 'Earn 500 XP.',
    earned: (state) => state.xp >= 500,
  },
  {
    id: 'sure-10',
    name: 'Calibrated',
    description: 'Get 10 answers right while marking Sure.',
    earned: (state) => state.sureCorrect >= 10,
  },
  {
    id: 'comeback',
    name: 'Second look',
    description: 'Clear a review question by answering it correctly with confidence.',
    earned: (state) => state.reviewCleared >= 1,
  },
  {
    id: 'review-clear-5',
    name: 'Queue cleared',
    description: 'Clear 5 review questions by answering them correctly with confidence.',
    earned: (state) => state.reviewCleared >= 5,
  },
  {
    id: 'all-domains',
    name: 'Full floor',
    description: 'Answer at least one question in every exam domain.',
    earned: (state) => DOMAIN_IDS.every((domain) => state.byDomain[domain].answered > 0),
  },
  {
    id: 'century',
    name: 'Century',
    description: 'Answer 100 questions.',
    earned: (state) => state.totals.answered >= 100,
  },
];

export const ACHIEVEMENTS: readonly Achievement[] = ACHIEVEMENT_LIST;

const ACHIEVEMENT_IDS = new Set<Achievement['id']>(ACHIEVEMENT_LIST.map((badge) => badge.id));

function zeroTally(): Tally {
  return { answered: 0, correct: 0 };
}

export function emptyProgress(): ProgressState {
  return {
    version: 1,
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    totals: zeroTally(),
    byExam: {
      '220-1101': zeroTally(),
      '220-1102': zeroTally(),
    },
    byDomain: Object.fromEntries(DOMAIN_IDS.map((domain) => [domain, zeroTally()])) as Record<
      DomainId,
      Tally
    >,
    confidence: {
      guessing: zeroTally(),
      somewhat: zeroTally(),
      sure: zeroTally(),
    },
    confidentlyWrong: 0,
    sureCorrect: 0,
    reviewCleared: 0,
    roundsCompleted: 0,
    cleanSweeps: 0,
    review: {},
    achievements: [],
    confidentMisses: [],
  };
}

export function localDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function previousDateKey(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year || 1970, (month || 1) - 1, day || 1);
  date.setDate(date.getDate() - 1);
  return localDateKey(date);
}

export function formatDateKey(dateKey: string): string {
  const [year, month, day] = dateKey.split('-').map(Number);
  if (!year || !month || !day) return dateKey;
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function xpFor(correct: boolean, confidence: Confidence): number {
  if (!correct) return PARTICIPATION_XP;
  let xp = PARTICIPATION_XP + CORRECT_XP;
  if (confidence === 'somewhat') xp += SOMEWHAT_BONUS_XP;
  if (confidence === 'sure') xp += SURE_BONUS_XP;
  return xp;
}

export function levelProgress(xp: number): LevelProgress {
  let level = 1;
  let floor = 0;
  let span = LEVEL_BASE_XP;
  const safeXp = Math.max(0, Math.floor(xp));
  while (safeXp >= floor + span && level < 500) {
    floor += span;
    level += 1;
    span += LEVEL_BASE_XP;
  }
  return { level, into: safeXp - floor, span, nextAt: floor + span };
}

export function percent(correct: number, answered: number): number | null {
  if (answered <= 0) return null;
  return Math.round((correct / answered) * 100);
}

export function accuracyWord(correct: number, answered: number): 'Not started' | 'Review' | 'Solid' {
  const value = percent(correct, answered);
  if (value === null) return 'Not started';
  return value >= ACCURACY_SOLID_PERCENT ? 'Solid' : 'Review';
}

export function weakestDomains(state: ProgressState, limit = 3): DomainId[] {
  return DOMAIN_IDS.filter((domain) => state.byDomain[domain].answered > 0)
    .sort((left, right) => {
      const leftRate = state.byDomain[left].correct / state.byDomain[left].answered;
      const rightRate = state.byDomain[right].correct / state.byDomain[right].answered;
      if (leftRate !== rightRate) return leftRate - rightRate;
      return state.byDomain[right].answered - state.byDomain[left].answered;
    })
    .slice(0, limit);
}

export function reviewSummary(state: ProgressState): {
  total: number;
  missed: number;
  lowConfidence: number;
} {
  const items = Object.values(state.review);
  const missed = items.filter((item) => item.reason === 'missed').length;
  return { total: items.length, missed, lowConfidence: items.length - missed };
}

function cloneState(state: ProgressState): ProgressState {
  return {
    ...state,
    totals: { ...state.totals },
    byExam: {
      '220-1101': { ...state.byExam['220-1101'] },
      '220-1102': { ...state.byExam['220-1102'] },
    },
    byDomain: Object.fromEntries(
      DOMAIN_IDS.map((domain) => [domain, { ...state.byDomain[domain] }]),
    ) as Record<DomainId, Tally>,
    confidence: {
      guessing: { ...state.confidence.guessing },
      somewhat: { ...state.confidence.somewhat },
      sure: { ...state.confidence.sure },
    },
    review: Object.fromEntries(
      Object.entries(state.review).map(([id, item]) => [id, { ...item }]),
    ),
    achievements: [...state.achievements],
    confidentMisses: [...state.confidentMisses],
  };
}

function bump(tally: Tally, correct: boolean): void {
  tally.answered += 1;
  if (correct) tally.correct += 1;
}

function bumpStreak(state: ProgressState, today: string): void {
  if (state.lastActiveDate === today) return;
  if (state.lastActiveDate && previousDateKey(today) === state.lastActiveDate) {
    state.streak += 1;
  } else {
    state.streak = 1;
  }
  state.lastActiveDate = today;
}

function collectUnlocks(state: ProgressState): Achievement[] {
  const owned = new Set(state.achievements);
  const unlocked = ACHIEVEMENT_LIST.filter((badge) => !owned.has(badge.id) && badge.earned(state));
  if (unlocked.length > 0) {
    state.achievements = [...state.achievements, ...unlocked.map((badge) => badge.id)];
  }
  return unlocked;
}

export function applyAnswer(
  state: ProgressState,
  question: Question,
  input: AnswerInput,
  now: Date,
): AnswerResult {
  const next = cloneState(state);
  const correct = isSelectionCorrect(input.selected, question.correct);
  const confident = input.confidence !== 'guessing';
  const confidentlyWrong = !correct && input.confidence === 'sure';
  const today = localDateKey(now);
  const wasQueued = Boolean(next.review[question.id]);

  bump(next.totals, correct);
  bump(next.byExam[question.exam], correct);
  bump(next.byDomain[question.domain], correct);
  bump(next.confidence[input.confidence], correct);
  next.xp += xpFor(correct, input.confidence);
  bumpStreak(next, today);

  if (correct && input.confidence === 'sure') next.sureCorrect += 1;
  if (confidentlyWrong) {
    next.confidentlyWrong += 1;
    next.confidentMisses = [
      ...next.confidentMisses.filter((id) => id !== question.id),
      question.id,
    ].slice(-20);
  }

  let reviewChange: ReviewChange;
  if (correct && confident) {
    if (wasQueued) {
      delete next.review[question.id];
      next.reviewCleared += 1;
      reviewChange = 'cleared';
    } else {
      reviewChange = 'none';
    }
    next.confidentMisses = next.confidentMisses.filter((id) => id !== question.id);
  } else if (!correct) {
    next.review[question.id] = { reason: 'missed', updatedAt: today };
    reviewChange = wasQueued ? 'kept' : 'added';
  } else {
    next.review[question.id] = { reason: 'low-confidence', updatedAt: today };
    reviewChange = wasQueued ? 'kept' : 'added';
  }

  return {
    state: next,
    correct,
    xpGained: xpFor(correct, input.confidence),
    unlocked: collectUnlocks(next),
    confidentlyWrong,
    reviewChange,
  };
}

export function completeRound(
  state: ProgressState,
  summary: RoundSummary,
): { state: ProgressState; unlocked: Achievement[] } {
  const next = cloneState(state);
  if (summary.total > 0) {
    next.roundsCompleted += 1;
    if (summary.total >= 10 && summary.correctCount === summary.total) {
      next.cleanSweeps += 1;
    }
  }
  return { state: next, unlocked: collectUnlocks(next) };
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function nonNegativeInt(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

function readTally(value: unknown): Tally {
  const record = asRecord(value);
  if (!record) return zeroTally();
  const answered = nonNegativeInt(record.answered);
  const correct = Math.min(nonNegativeInt(record.correct), answered);
  return { answered, correct };
}

export function sanitizeProgress(value: unknown): ProgressState {
  const empty = emptyProgress();
  const record = asRecord(value);
  if (!record || record.version !== 1) return empty;

  const byExam = { ...empty.byExam };
  const examRecord = asRecord(record.byExam);
  for (const exam of EXAM_IDS) {
    byExam[exam] = readTally(examRecord?.[exam]);
  }

  const byDomain = { ...empty.byDomain };
  const domainRecord = asRecord(record.byDomain);
  for (const domain of DOMAIN_IDS) {
    byDomain[domain] = readTally(domainRecord?.[domain]);
  }

  const confidence = { ...empty.confidence };
  const confidenceRecord = asRecord(record.confidence);
  for (const level of CONFIDENCE_LEVELS) {
    confidence[level] = readTally(confidenceRecord?.[level]);
  }

  const review: Record<string, ReviewItem> = {};
  const reviewRecord = asRecord(record.review);
  if (reviewRecord) {
    for (const [id, item] of Object.entries(reviewRecord)) {
      const reviewItem = asRecord(item);
      if (!id.trim() || !reviewItem) continue;
      if (reviewItem.reason !== 'missed' && reviewItem.reason !== 'low-confidence') continue;
      review[id] = {
        reason: reviewItem.reason,
        updatedAt: typeof reviewItem.updatedAt === 'string' ? reviewItem.updatedAt : '',
      };
    }
  }

  const achievements: Achievement['id'][] = [];
  if (Array.isArray(record.achievements)) {
    for (const id of record.achievements) {
      if (typeof id === 'string' && ACHIEVEMENT_IDS.has(id as Achievement['id'])) {
        const badgeId = id as Achievement['id'];
        if (!achievements.includes(badgeId)) achievements.push(badgeId);
      }
    }
  }

  const confidentMisses: string[] = [];
  if (Array.isArray(record.confidentMisses)) {
    for (const id of record.confidentMisses) {
      if (typeof id === 'string' && id.trim() && !confidentMisses.includes(id)) {
        confidentMisses.push(id);
      }
    }
  }

  const lastActiveDate =
    typeof record.lastActiveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(record.lastActiveDate)
      ? record.lastActiveDate
      : null;

  return {
    version: 1,
    xp: nonNegativeInt(record.xp),
    streak: nonNegativeInt(record.streak),
    lastActiveDate,
    totals: readTally(record.totals),
    byExam,
    byDomain,
    confidence,
    confidentlyWrong: nonNegativeInt(record.confidentlyWrong),
    sureCorrect: nonNegativeInt(record.sureCorrect),
    reviewCleared: nonNegativeInt(record.reviewCleared),
    roundsCompleted: nonNegativeInt(record.roundsCompleted),
    cleanSweeps: nonNegativeInt(record.cleanSweeps),
    review,
    achievements,
    confidentMisses: confidentMisses.slice(-20),
  };
}
