import { screen, userEvent } from '@testing-library/react-native';

import { emptyProgress, type ProgressState } from '@/game/progress';
import { HomeScreen } from '@/screens/home-screen';

import { renderApp } from './render';

function withReview(): ProgressState {
  return {
    ...emptyProgress(),
    review: {
      'net-01': { reason: 'missed', updatedAt: '2026-11-18' },
      'md-01': { reason: 'low-confidence', updatedAt: '2026-11-18' },
    },
  };
}

describe('HomeScreen', () => {
  it('starts a filtered round and keeps retry disabled when the queue is empty', async () => {
    const onStart = jest.fn();
    const onRetry = jest.fn();
    await renderApp(
      <HomeScreen state={emptyProgress()} onStart={onStart} onRetry={onRetry} onOpenProgress={jest.fn()} />,
    );
    const user = userEvent.setup();

    await user.press(screen.getByRole('radio', { name: 'Core 1 · 220-1101' }));
    await user.press(screen.getByRole('radio', { name: 'Networking' }));
    await user.press(screen.getByRole('button', { name: 'Start round' }));
    expect(onStart).toHaveBeenCalledWith('220-1101', 'networking');

    const retry = screen.getByRole('button', { name: 'Retry missed' });
    expect(retry.props.accessibilityState.disabled).toBe(true);
    await user.press(retry);
    expect(onRetry).not.toHaveBeenCalled();
  });

  it('offers the review queue when it has questions', async () => {
    const onRetry = jest.fn();
    await renderApp(
      <HomeScreen state={withReview()} onStart={jest.fn()} onRetry={onRetry} onOpenProgress={jest.fn()} />,
    );
    await userEvent.setup().press(screen.getByRole('button', { name: 'Retry missed (2)' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/1 missed and 1 low-confidence/)).toBeTruthy();
  });
});
