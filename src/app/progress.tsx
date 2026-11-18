import { useRouter } from 'expo-router';

import { ProgressDashboard } from '@/screens/progress-dashboard';
import { useProgress } from '@/state/progress-context';

export default function ProgressRoute() {
  const router = useRouter();
  const { state, ready, reset } = useProgress();
  if (!ready) return null;

  return <ProgressDashboard state={state} onReset={() => void reset()} onHome={() => router.replace('/')} />;
}
