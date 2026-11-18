import AsyncStorage from '@react-native-async-storage/async-storage';

import { emptyProgress } from '@/game/progress';
import { STORAGE_KEY } from '@/game/constants';
import { loadProgress, saveProgress } from '@/storage/progress-store';

describe('progress storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('round-trips progress and recovers from corrupt JSON', async () => {
    const state = emptyProgress();
    state.xp = 25;
    state.streak = 2;
    await saveProgress(state);

    const loaded = await loadProgress();
    expect(loaded.xp).toBe(25);
    expect(loaded.streak).toBe(2);

    await AsyncStorage.setItem(STORAGE_KEY, '{not json');
    expect((await loadProgress()).xp).toBe(0);
  });
});
