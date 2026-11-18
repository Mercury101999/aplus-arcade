import { screen, userEvent } from '@testing-library/react-native';

import { QuizSession } from '@/components/quiz-session';
import type { Question } from '@/content/types';
import { isSelectionCorrect } from '@/game/quiz';

import { renderApp } from './render';

const questions: Question[] = [
  {
    id: 'fixture-1',
    exam: '220-1101',
    domain: 'networking',
    prompt: 'Which port does the fixture use for secure web traffic?',
    choices: ['Port 23', 'Port 80', 'Port 443', 'Port 25'],
    correct: [2],
    explanation: 'The fixture uses port 443 because the explanation has to be visible after the answer.',
  },
  {
    id: 'fixture-2',
    exam: '220-1101',
    domain: 'networking',
    prompt: 'Which second fixture question comes after the first?',
    choices: ['This one', 'Another', 'Third', 'Fourth'],
    correct: [0],
    explanation: 'The second explanation is here so the next question can be checked too.',
  },
];

describe('QuizSession', () => {
  it('requires an answer and a confidence rating before it reveals the explanation', async () => {
    const onGrade = jest.fn((question: Question, input: { selected: number[]; confidence: 'guessing' | 'somewhat' | 'sure' }) => {
      const correct = isSelectionCorrect(input.selected, question.correct);
      return {
        correct,
        xpGained: correct ? 20 : 5,
        confidentlyWrong: !correct && input.confidence === 'sure',
        reviewChange: correct ? ('none' as const) : ('added' as const),
        unlocked: [],
      };
    });
    const onComplete = jest.fn(() => ({ unlocked: [] }));

    await renderApp(
      <QuizSession
        questions={questions}
        reduceMotion
        onGrade={onGrade}
        onComplete={onComplete}
        onAgain={jest.fn()}
        onRetry={jest.fn()}
        onProgress={jest.fn()}
        onExit={jest.fn()}
      />,
    );

    const user = userEvent.setup();
    expect(screen.getByText('How sure are you?')).toBeTruthy();
    const check = screen.getByRole('button', { name: 'Check answer' });
    expect(check.props.accessibilityState.disabled).toBe(true);
    await user.press(check);
    expect(onGrade).not.toHaveBeenCalled();
    expect(screen.queryByText(/fixture uses port 443/)).toBeNull();

    await user.press(screen.getByRole('radio', { name: 'Port 80' }));
    await user.press(screen.getByRole('radio', { name: 'Sure' }));
    await user.press(screen.getByRole('button', { name: 'Check answer' }));

    expect(screen.getByText('Not quite')).toBeTruthy();
    expect(screen.getByText(/Confidently wrong/)).toBeTruthy();
    expect(screen.getByText('Answer: Port 443')).toBeTruthy();
    expect(screen.getByText(/fixture uses port 443/)).toBeTruthy();
    expect(onGrade).toHaveBeenCalledTimes(1);

    await user.press(screen.getByRole('button', { name: 'Next question' }));
    expect(screen.getByText('Question 2 of 2')).toBeTruthy();

    await user.press(screen.getByRole('radio', { name: 'This one' }));
    await user.press(screen.getByRole('radio', { name: 'Somewhat' }));
    await user.press(screen.getByRole('button', { name: 'Check answer' }));
    await user.press(screen.getByRole('button', { name: 'See results' }));

    expect(screen.getByText('Round complete')).toBeTruthy();
    expect(screen.getByText(/1 of 2 correctly/)).toBeTruthy();
    expect(onComplete).toHaveBeenCalledWith({ total: 2, correctCount: 1 });
  });
});
