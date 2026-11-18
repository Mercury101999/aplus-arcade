import type { DomainId, ExamId, Question } from '@/content/types';
import { DOMAIN_IDS } from '@/content/types';

import { ROUND_SIZE } from './constants';

export type RoundMode = 'standard' | 'retry';

export interface RoundRequest {
  mode: RoundMode;
  exam: ExamId | 'all';
  domain: DomainId | 'all';
  count: number;
}

export function standardRound(exam: ExamId | 'all', domain: DomainId | 'all'): RoundRequest {
  return { mode: 'standard', exam, domain, count: ROUND_SIZE };
}

export function retryRound(): RoundRequest {
  return { mode: 'retry', exam: 'all', domain: 'all', count: ROUND_SIZE };
}

export function parseRoundRequest(input: {
  mode?: string;
  exam?: string;
  domain?: string;
}): RoundRequest {
  const mode = input.mode === 'retry' ? 'retry' : 'standard';
  const exam = input.exam === '220-1101' || input.exam === '220-1102' ? input.exam : 'all';
  const domain = DOMAIN_IDS.includes(input.domain as DomainId) ? (input.domain as DomainId) : 'all';
  return { mode, exam, domain, count: ROUND_SIZE };
}

export function isSelectionCorrect(selected: readonly number[], correct: readonly number[]): boolean {
  if (selected.length !== correct.length) return false;
  const chosen = new Set(selected);
  return correct.every((index) => chosen.has(index));
}

export function correctLabels(question: Question): string {
  return question.correct.map((index) => question.choices[index]).join('; ');
}

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = copy[index];
    const swap = copy[swapIndex];
    if (current === undefined || swap === undefined) continue;
    copy[index] = swap;
    copy[swapIndex] = current;
  }
  return copy;
}

export function pickQuestions(
  bank: readonly Question[],
  request: RoundRequest,
  reviewIds: readonly string[],
  random: () => number = Math.random,
): Question[] {
  const pool =
    request.mode === 'retry'
      ? bank.filter((question) => reviewIds.includes(question.id))
      : bank.filter((question) => {
          if (request.exam !== 'all' && question.exam !== request.exam) return false;
          if (request.domain !== 'all' && question.domain !== request.domain) return false;
          return true;
        });

  return shuffle(pool, random).slice(0, Math.max(0, request.count));
}
