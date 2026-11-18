import type { DomainId, ExamId, Question } from '../types';

export interface QuestionDraft {
  id: string;
  prompt: string;
  choices: readonly [string, string, string, string];
  correct: number | readonly number[];
  explanation: string;
}

export function defineQuestions(
  exam: ExamId,
  domain: DomainId,
  drafts: readonly QuestionDraft[],
): Question[] {
  return drafts.map((draft) => ({
    id: draft.id,
    exam,
    domain,
    prompt: draft.prompt,
    choices: [...draft.choices],
    correct: typeof draft.correct === 'number' ? [draft.correct] : [...draft.correct],
    explanation: draft.explanation,
  }));
}
