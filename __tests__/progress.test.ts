import { questionBank } from '@/content/bank';
import { DOMAIN_IDS } from '@/content/types';
import {
  accuracyWord,
  applyAnswer,
  completeRound,
  emptyProgress,
  levelProgress,
  localDateKey,
  sanitizeProgress,
  weakestDomains,
  xpFor,
  type ProgressState,
} from '@/game/progress';
import type { Question } from '@/content/types';

const day = (iso: string) => new Date(`${iso}T15:00:00`);

function question(id: string, domain: Question['domain'] = 'networking'): Question {
  return {
    id,
    exam: domain === 'security' ? '220-1102' : '220-1101',
    domain,
    prompt: `${id} prompt that is long enough to be a real question.`,
    choices: ['Alpha', 'Beta', 'Gamma', 'Delta'],
    correct: [1],
    explanation: 'Beta is correct because this fixture says so and the explanation is long enough.',
  };
}

function answer(
  state: ProgressState,
  item: Question,
  correct: boolean,
  confidence: 'guessing' | 'somewhat' | 'sure',
  when: Date,
) {
  return applyAnswer(state, item, { selected: correct ? [1] : [0], confidence }, when);
}

describe('scoring and review', () => {
  it('pays more XP when a correct answer is more confident', () => {
    expect(xpFor(false, 'sure')).toBe(5);
    expect(xpFor(true, 'guessing')).toBe(10);
    expect(xpFor(true, 'somewhat')).toBe(15);
    expect(xpFor(true, 'sure')).toBe(20);
  });

  it('queues misses and guesses, then clears a confident correct answer', () => {
    const item = question('q1');
    const missed = answer(emptyProgress(), item, false, 'sure', day('2026-11-18'));
    expect(missed.correct).toBe(false);
    expect(missed.confidentlyWrong).toBe(true);
    expect(missed.state.review.q1?.reason).toBe('missed');
    expect(missed.state.confidentlyWrong).toBe(1);
    expect(missed.state.xp).toBe(5);
    expect(missed.unlocked.map((badge) => badge.id)).toContain('first-answer');

    const guessed = answer(missed.state, item, true, 'guessing', day('2026-11-18'));
    expect(guessed.state.review.q1?.reason).toBe('low-confidence');
    expect(guessed.state.xp).toBe(15);

    const cleared = answer(guessed.state, item, true, 'somewhat', day('2026-11-18'));
    expect(cleared.reviewChange).toBe('cleared');
    expect(cleared.state.review.q1).toBeUndefined();
    expect(cleared.state.reviewCleared).toBe(1);
    expect(cleared.state.confidentMisses).not.toContain('q1');
    expect(cleared.unlocked.map((badge) => badge.id)).toContain('comeback');
  });

  it('does not mutate the previous state', () => {
    const start = emptyProgress();
    answer(start, question('q1'), true, 'sure', day('2026-11-18'));
    expect(start.xp).toBe(0);
    expect(start.totals.answered).toBe(0);
  });

  it('builds and breaks a streak on calendar days', () => {
    let state = emptyProgress();
    state = answer(state, question('a'), true, 'sure', day('2026-11-16')).state;
    state = answer(state, question('b'), true, 'sure', day('2026-11-16')).state;
    expect(state.streak).toBe(1);
    state = answer(state, question('c'), true, 'sure', day('2026-11-17')).state;
    expect(state.streak).toBe(2);
    state = answer(state, question('d'), true, 'sure', day('2026-11-19')).state;
    expect(state.streak).toBe(1);
    expect(state.lastActiveDate).toBe('2026-11-19');
  });

  it('levels up on the published curve', () => {
    expect(levelProgress(0)).toMatchObject({ level: 1, into: 0, span: 80 });
    expect(levelProgress(79).level).toBe(1);
    expect(levelProgress(80)).toMatchObject({ level: 2, into: 0, span: 160 });
    expect(levelProgress(240)).toMatchObject({ level: 3, into: 0, span: 240 });
  });

  it('awards a clean sweep only for a perfect round of 10', () => {
    const partial = completeRound(emptyProgress(), { total: 4, correctCount: 4 });
    expect(partial.state.roundsCompleted).toBe(1);
    expect(partial.state.cleanSweeps).toBe(0);
    expect(partial.unlocked.map((badge) => badge.id)).toContain('first-round');

    const perfect = completeRound(emptyProgress(), { total: 10, correctCount: 10 });
    expect(perfect.state.cleanSweeps).toBe(1);
    expect(perfect.unlocked.map((badge) => badge.id)).toContain('clean-sweep');
  });

  it('ranks the weakest attempted domain and labels accuracy in words', () => {
    let state = emptyProgress();
    state = answer(state, question('n1', 'networking'), false, 'guessing', day('2026-11-18')).state;
    state = answer(state, question('n2', 'networking'), false, 'guessing', day('2026-11-18')).state;
    state = answer(state, question('s1', 'security'), true, 'sure', day('2026-11-18')).state;
    expect(weakestDomains(state, 2)[0]).toBe('networking');
    expect(accuracyWord(0, 0)).toBe('Not started');
    expect(accuracyWord(1, 2)).toBe('Review');
    expect(accuracyWord(8, 10)).toBe('Solid');
  });

  it('unlocks the full-floor badge after every domain has an answer', () => {
    let state = emptyProgress();
    DOMAIN_IDS.forEach((domain, index) => {
      const real = questionBank.find((item) => item.domain === domain);
      if (!real) throw new Error(`missing ${domain}`);
      state = applyAnswer(
        state,
        real,
        { selected: [real.correct[0] ?? 0], confidence: 'sure' },
        day('2026-11-18'),
      ).state;
      expect(state.byDomain[domain].answered).toBeGreaterThan(0);
      expect(index).toBeGreaterThanOrEqual(0);
    });
    expect(state.achievements).toContain('all-domains');
  });

  it('drops corrupt saved progress instead of crashing', () => {
    expect(sanitizeProgress(null).xp).toBe(0);
    expect(sanitizeProgress({ version: 2, xp: 90 }).xp).toBe(0);
    const saved = sanitizeProgress({
      version: 1,
      xp: 42.9,
      streak: -4,
      lastActiveDate: 'nope',
      totals: { answered: 3, correct: 9 },
      review: { 'net-01': { reason: 'missed', updatedAt: '2026-11-18' }, bad: { reason: 'other' } },
      achievements: ['first-answer', 'not-real', 'first-answer'],
      confidentMisses: ['net-01', 4, 'net-01'],
    });
    expect(saved.xp).toBe(42);
    expect(saved.streak).toBe(0);
    expect(saved.lastActiveDate).toBeNull();
    expect(saved.totals).toEqual({ answered: 3, correct: 3 });
    expect(saved.review['net-01']?.reason).toBe('missed');
    expect(saved.review.bad).toBeUndefined();
    expect(saved.achievements).toEqual(['first-answer']);
    expect(saved.confidentMisses).toEqual(['net-01']);
    expect(localDateKey(day('2026-11-18'))).toBe('2026-11-18');
  });
});
