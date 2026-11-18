import AsyncStorage from '@react-native-async-storage/async-storage';

import { emptyProgress, sanitizeProgress, type ProgressState } from '@/game/progress';
import { STORAGE_KEY } from '@/game/constants';

export async function loadProgress(): Promise<ProgressState> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProgress();
    return sanitizeProgress(JSON.parse(raw) as unknown);
  } catch {
    return emptyProgress();
  }
}

export async function saveProgress(state: ProgressState): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
