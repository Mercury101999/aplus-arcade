import { screen } from '@testing-library/react-native';

import { questionBank } from '@/content/bank';
import { applyAnswer, emptyProgress } from '@/game/progress';
import { ProgressDashboard } from '@/screens/progress-dashboard';

import { press, renderApp } from './render';

describe('ProgressDashboard', () => {
  it('shows weakest-domain order, calibration, and a confirmed reset', async () => {
    let state = emptyProgress();
    const when = new Date('2026-11-18T12:00:00');
    const networking = questionBank.filter((question) => question.domain === 'networking').slice(0, 2);
    for (const question of networking) {
      const wrong = question.choices.findIndex((_, index) => !question.correct.includes(index));
      state = applyAnswer(state, question, { selected: [wrong], confidence: 'sure' }, when).state;
    }
    const mobile = questionBank.find((question) => question.domain === 'mobile-devices');
    if (!mobile) throw new Error('missing mobile question');
    state = applyAnswer(state, mobile, { selected: [...mobile.correct], confidence: 'sure' }, when).state;

    const onReset = jest.fn();
    await renderApp(<ProgressDashboard state={state} onReset={onReset} onHome={jest.fn()} />);

    const domainMeters = screen.getAllByLabelText(/accuracy$/);
    expect(domainMeters[0]?.props.accessibilityLabel).toBe('Networking accuracy');
    expect(screen.getByText(/Confidently wrong/)).toBeTruthy();
    expect(screen.getAllByText(/1 of 3 correct/).length).toBeGreaterThan(0);

    await press(screen.getByRole('button', { name: 'Reset progress' }));
    expect(screen.getByText('Erase progress?')).toBeTruthy();
    await press(screen.getByRole('button', { name: 'Keep progress' }));
    expect(onReset).not.toHaveBeenCalled();

    await press(screen.getByRole('button', { name: 'Reset progress' }));
    await press(screen.getByRole('button', { name: 'Erase progress' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
