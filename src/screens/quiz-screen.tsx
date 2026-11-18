import { useState } from 'react';
import { Text } from 'react-native';

import { questionBank } from '@/content/bank';
import type { Question } from '@/content/types';
import type { Achievement, AnswerInput } from '@/game/progress';
import { pickQuestions, type RoundRequest } from '@/game/quiz';
import { useTheme } from '@/theme/theme-context';

import { Button } from '@/components/button';
import { QuizSession, type GradedAnswer } from '@/components/quiz-session';
import { Screen } from '@/components/screen';

export function QuizScreen({
  request,
  reviewIds,
  onGrade,
  onComplete,
  onAgain,
  onRetry,
  onProgress,
  onExit,
}: {
  request: RoundRequest;
  reviewIds: readonly string[];
  onGrade: (question: Question, input: AnswerInput) => GradedAnswer;
  onComplete: (summary: { total: number; correctCount: number }) => { unlocked: Achievement[] };
  onAgain: () => void;
  onRetry: () => void;
  onProgress: () => void;
  onExit: () => void;
}) {
  const theme = useTheme();
  const [questions] = useState(() => pickQuestions(questionBank, request, reviewIds));

  if (questions.length === 0) {
    return (
      <Screen>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 28, fontWeight: '700' }}>
          No questions in this round
        </Text>
        <Text style={{ color: theme.muted, lineHeight: 22 }}>
          The review queue is empty, or nothing matched this filter. Answer a mixed round first and the misses
          will land here.
        </Text>
        <Button label="Back home" onPress={onExit} />
      </Screen>
    );
  }

  return (
    <QuizSession
      questions={questions}
      onGrade={onGrade}
      onComplete={onComplete}
      onAgain={onAgain}
      onRetry={onRetry}
      onProgress={onProgress}
      onExit={onExit}
    />
  );
}
