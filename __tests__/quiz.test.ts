import { questionBank } from '@/content/bank';
import { isSelectionCorrect, parseRoundRequest, pickQuestions } from '@/game/quiz';

function randomFrom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

describe('quiz selection', () => {
  it('filters by exam and domain and caps the round', () => {
    const round = pickQuestions(
      questionBank,
      { mode: 'standard', exam: '220-1101', domain: 'networking', count: 10 },
      [],
      randomFrom(3),
    );
    expect(round).toHaveLength(10);
    expect(round.every((question) => question.exam === '220-1101' && question.domain === 'networking')).toBe(
      true,
    );
    expect(questionBank[0]?.prompt).toBeTruthy();
  });

  it('does not mutate the bank', () => {
    const before = questionBank.map((question) => question.id).join(',');
    pickQuestions(questionBank, { mode: 'standard', exam: 'all', domain: 'all', count: 10 }, [], randomFrom(1));
    expect(questionBank.map((question) => question.id).join(',')).toBe(before);
  });

  it('pulls a retry round only from the review queue', () => {
    const ids = ['net-01', 'hw-02', 'missing'];
    const round = pickQuestions(
      questionBank,
      { mode: 'retry', exam: '220-1102', domain: 'security', count: 10 },
      ids,
      randomFrom(9),
    );
    expect(round.map((question) => question.id).sort()).toEqual(['hw-02', 'net-01']);
  });

  it('returns an empty retry when the queue is empty', () => {
    expect(
      pickQuestions(questionBank, { mode: 'retry', exam: 'all', domain: 'all', count: 10 }, []),
    ).toEqual([]);
  });

  it('parses route params and ignores unknown filters', () => {
    expect(parseRoundRequest({ mode: 'retry', exam: 'nope', domain: 'networking' })).toEqual({
      mode: 'retry',
      exam: 'all',
      domain: 'networking',
      count: 10,
    });
    expect(parseRoundRequest({ mode: 'standard', exam: '220-1102', domain: 'security' }).exam).toBe('220-1102');
  });

  it('grades a multi-select answer as a set', () => {
    expect(isSelectionCorrect([0, 2], [2, 0])).toBe(true);
    expect(isSelectionCorrect([0], [0, 2])).toBe(false);
    expect(isSelectionCorrect([0, 1, 2], [0, 2])).toBe(false);
  });
});
