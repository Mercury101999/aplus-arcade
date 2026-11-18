import { DOMAIN_CATALOG } from './catalog';
import { DOMAIN_IDS, EXAM_IDS, type DomainId, type Question } from './types';

const MINIMUM_PER_DOMAIN = 15;
const MINIMUM_EXPLANATION = 80;
const MINIMUM_PROMPT = 20;

export function validateBank(questions: readonly Question[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const prompts = new Set<string>();
  const counts = Object.fromEntries(DOMAIN_IDS.map((id) => [id, 0])) as Record<DomainId, number>;

  questions.forEach((question, index) => {
    const where = question.id || `index ${index}`;

    if (!question.id.trim()) {
      errors.push(`Missing id at index ${index}.`);
    } else if (ids.has(question.id)) {
      errors.push(`Duplicate id ${question.id}.`);
    } else {
      ids.add(question.id);
    }

    if (!EXAM_IDS.includes(question.exam)) {
      errors.push(`${where}: invalid exam.`);
    }

    if (!DOMAIN_IDS.includes(question.domain)) {
      errors.push(`${where}: invalid domain.`);
    } else {
      counts[question.domain] += 1;
      if (DOMAIN_CATALOG[question.domain].exam !== question.exam) {
        errors.push(`${where}: exam does not match its domain.`);
      }
    }

    if (question.prompt.trim().length < MINIMUM_PROMPT) {
      errors.push(`${where}: prompt is too short.`);
    }
    if (prompts.has(question.prompt)) {
      errors.push(`${where}: duplicate prompt.`);
    }
    prompts.add(question.prompt);

    if (question.choices.length < 2) {
      errors.push(`${where}: needs at least two choices.`);
    }
    if (question.choices.some((choice) => choice.trim().length === 0)) {
      errors.push(`${where}: has an empty choice.`);
    }
    if (new Set(question.choices).size !== question.choices.length) {
      errors.push(`${where}: has duplicate choices.`);
    }

    if (question.correct.length === 0) {
      errors.push(`${where}: missing a correct answer.`);
    }
    if (new Set(question.correct).size !== question.correct.length) {
      errors.push(`${where}: repeats a correct index.`);
    }
    if (
      question.correct.some(
        (choiceIndex) =>
          !Number.isInteger(choiceIndex) ||
          choiceIndex < 0 ||
          choiceIndex >= question.choices.length,
      )
    ) {
      errors.push(`${where}: correct index is out of range.`);
    }
    if (question.correct.length >= question.choices.length) {
      errors.push(`${where}: every choice is marked correct.`);
    }

    if (question.explanation.trim().length < MINIMUM_EXPLANATION) {
      errors.push(`${where}: explanation is too short.`);
    }
  });

  for (const domain of DOMAIN_IDS) {
    if (counts[domain] < MINIMUM_PER_DOMAIN) {
      errors.push(`${domain} has ${counts[domain]} questions; expected at least ${MINIMUM_PER_DOMAIN}.`);
    }
  }

  return errors;
}
