import { useRouter } from 'expo-router';

import { HomeScreen } from '@/screens/home-screen';
import { useProgress } from '@/state/progress-context';

export default function HomeRoute() {
  const router = useRouter();
  const { state, saveError, ready } = useProgress();

  if (!ready) return null;

  return (
    <HomeScreen
      state={state}
      saveError={saveError}
      onStart={(exam, domain) =>
        router.push({
          pathname: '/quiz',
          params: { mode: 'standard', exam, domain },
        })
      }
      onRetry={() =>
        router.push({
          pathname: '/quiz',
          params: { mode: 'retry', exam: 'all', domain: 'all' },
        })
      }
      onOpenProgress={() => router.push('/progress')}
    />
  );
}
