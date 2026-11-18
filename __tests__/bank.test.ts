import { questionBank } from '@/content/bank';
import { DOMAIN_IDS, EXAM_IDS } from '@/content/types';
import { validateBank } from '@/content/validate';

describe('question bank', () => {
  const errors = validateBank(questionBank);

  it('passes the schema checks', () => {
    expect(errors).toEqual([]);
  });

  it('covers both exams and at least 135 questions', () => {
    expect(questionBank.length).toBeGreaterThanOrEqual(135);
    for (const exam of EXAM_IDS) {
      expect(questionBank.some((question) => question.exam === exam)).toBe(true);
    }
    for (const domain of DOMAIN_IDS) {
      const count = questionBank.filter((question) => question.domain === domain).length;
      expect(count).toBeGreaterThanOrEqual(15);
    }
  });

  it('includes select-all questions and does not hide the answer in one slot', () => {
    expect(questionBank.filter((question) => question.correct.length > 1).length).toBeGreaterThanOrEqual(9);
    const firstIndexes = questionBank.map((question) => question.correct[0]);
    const mostCommon = Math.max(
      ...[0, 1, 2, 3].map((index) => firstIndexes.filter((value) => value === index).length),
    );
    expect(mostCommon / questionBank.length).toBeLessThan(0.5);
  });
});
