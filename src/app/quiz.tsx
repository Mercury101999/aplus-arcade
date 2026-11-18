import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { parseRoundRequest } from '@/game/quiz';
import { QuizScreen } from '@/screens/quiz-screen';
import { useProgress } from '@/state/progress-context';

export default function QuizRoute() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string | string[]; exam?: string | string[]; domain?: string | string[] }>();
  const request = parseRoundRequest({
    mode: first(params.mode),
    exam: first(params.exam),
    domain: first(params.domain),
  });
  const { ready, state, recordAnswer, completeRound } = useProgress();
  const [generation, setGeneration] = useState(0);

  if (!ready) return null;

  return (
    <QuizScreen
      key={`${request.mode}:${request.exam}:${request.domain}:${generation}`}
      request={request}
      reviewIds={Object.keys(state.review)}
      onGrade={recordAnswer}
      onComplete={completeRound}
      onAgain={() => setGeneration((value) => value + 1)}
      onRetry={() => {
        setGeneration((value) => value + 1);
        router.replace({
          pathname: '/quiz',
          params: { mode: 'retry', exam: 'all', domain: 'all' },
        });
      }}
      onProgress={() => router.push('/progress')}
      onExit={() => router.replace('/')}
    />
  );
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}
