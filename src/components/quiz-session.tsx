import { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';

import { domainName, examTitle } from '@/content/catalog';
import type { Question } from '@/content/types';
import { correctLabels } from '@/game/quiz';
import type { Achievement, AnswerInput, ReviewChange } from '@/game/progress';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useTheme } from '@/theme/theme-context';

import { Button } from './button';
import { Chip } from './chip';
import { ChoiceList } from './choice-list';
import { Screen } from './screen';

export interface GradedAnswer {
  correct: boolean;
  xpGained: number;
  confidentlyWrong: boolean;
  reviewChange: ReviewChange;
  unlocked: Achievement[];
}

type Phase = 'answer' | 'reveal' | 'done';

export function QuizSession({
  questions,
  reduceMotion,
  onGrade,
  onComplete,
  onAgain,
  onRetry,
  onProgress,
  onExit,
}: {
  questions: Question[];
  reduceMotion?: boolean;
  onGrade: (question: Question, input: AnswerInput) => GradedAnswer;
  onComplete: (summary: { total: number; correctCount: number }) => { unlocked: Achievement[] };
  onAgain: () => void;
  onRetry: () => void;
  onProgress: () => void;
  onExit: () => void;
}) {
  const theme = useTheme();
  const systemReduced = useReducedMotion();
  const reduced = reduceMotion ?? systemReduced;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [confidence, setConfidence] = useState<AnswerInput['confidence'] | null>(null);
  const [phase, setPhase] = useState<Phase>('answer');
  const [current, setCurrent] = useState<GradedAnswer | null>(null);
  const [outcomes, setOutcomes] = useState<GradedAnswer[]>([]);
  const [roundUnlocks, setRoundUnlocks] = useState<Achievement[]>([]);
  const finished = useRef(false);
  const question = questions[index];

  if (!question || phase === 'done') {
    const correctCount = outcomes.filter((item) => item.correct).length;
    const xp = outcomes.reduce((sum, item) => sum + item.xpGained, 0);
    const badges = uniqueBadges([...outcomes.flatMap((item) => item.unlocked), ...roundUnlocks]);
    return (
      <Screen>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 32, fontWeight: '700' }}>
          Round complete
        </Text>
        <Text style={{ color: theme.ink, fontSize: 18, lineHeight: 26 }}>
          You answered {correctCount} of {questions.length} correctly and earned {xp} XP.
        </Text>
        <View
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.line,
            borderWidth: 1,
            borderRadius: 18,
            padding: 16,
            gap: 8,
          }}
        >
          <Text style={{ color: theme.ink, fontWeight: '700' }}>Badges</Text>
          {badges.length === 0 ? (
            <Text style={{ color: theme.muted }}>No new badges this round.</Text>
          ) : (
            badges.map((badge) => (
              <Text key={badge.id} style={{ color: theme.ink }}>
                New badge: {badge.name}. {badge.description}
              </Text>
            ))
          )}
        </View>
        <Button label="Practice again" onPress={onAgain} />
        <Button label="Retry missed" onPress={onRetry} variant="secondary" />
        <Button label="View progress" onPress={onProgress} variant="secondary" />
        <Button label="Back home" onPress={onExit} variant="ghost" />
      </Screen>
    );
  }

  const ready = selected.length > 0 && confidence !== null;
  const domain = domainName(question.domain);

  function checkAnswer() {
    if (!question || !confidence || selected.length === 0) return;
    const graded = onGrade(question, { selected, confidence });
    setOutcomes((items) => [...items, graded]);
    setCurrent(graded);
    setPhase('reveal');
  }

  function continueRound() {
    if (index + 1 >= questions.length) {
      if (!finished.current) {
        finished.current = true;
        const summary = onComplete({
          total: questions.length,
          correctCount: outcomes.filter((item) => item.correct).length,
        });
        setRoundUnlocks(summary.unlocked);
      }
      setPhase('done');
      return;
    }
    setIndex((value) => value + 1);
    setSelected([]);
    setConfidence(null);
    setCurrent(null);
    setPhase('answer');
  }

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 20, fontWeight: '700' }}>
          Question {index + 1} of {questions.length}
        </Text>
        <Button label="Exit" onPress={onExit} variant="ghost" />
      </View>
      <View
        accessibilityRole="progressbar"
        accessibilityLabel="Round progress"
        accessibilityValue={{ min: 1, max: questions.length, now: index + 1, text: `${index + 1} of ${questions.length}` }}
        style={{ height: 8, backgroundColor: theme.line, borderRadius: 99 }}
      >
        <View
          style={{
            width: `${Math.round(((index + 1) / questions.length) * 100)}%`,
            height: 8,
            backgroundColor: theme.accent,
            borderRadius: 99,
          }}
        />
      </View>
      <Text style={{ color: theme.muted, fontWeight: '700' }}>
        {domain} · {examTitle(question.exam)} · {question.id}
      </Text>
      <Text style={{ color: theme.ink, fontSize: 22, lineHeight: 30 }}>{question.prompt}</Text>
      <ChoiceList question={question} selected={selected} locked={phase === 'reveal'} onChange={setSelected} />
      <View accessibilityRole="radiogroup" accessibilityLabel="How sure are you?" style={{ gap: 8 }}>
        <Text style={{ color: theme.ink, fontWeight: '700' }}>How sure are you?</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {(['guessing', 'somewhat', 'sure'] as const).map((level) => {
            const label = level === 'guessing' ? 'Guessing' : level === 'somewhat' ? 'Somewhat' : 'Sure';
            return (
              <Chip
                key={level}
                label={label}
                selected={confidence === level}
                disabled={phase === 'reveal'}
                onPress={() => setConfidence(level)}
              />
            );
          })}
        </View>
      </View>
      {phase === 'answer' ? (
        <Button
          label="Check answer"
          onPress={checkAnswer}
          disabled={!ready}
          accessibilityHint={ready ? 'Shows whether you were right' : 'Choose an answer and a confidence level first'}
        />
      ) : current ? (
        <Reveal
          question={question}
          graded={current}
          reduceMotion={reduced}
          isLast={index + 1 >= questions.length}
          onContinue={continueRound}
        />
      ) : null}
    </Screen>
  );
}

function Reveal({
  question,
  graded,
  reduceMotion,
  isLast,
  onContinue,
}: {
  question: Question;
  graded: GradedAnswer;
  reduceMotion: boolean;
  isLast: boolean;
  onContinue: () => void;
}) {
  const theme = useTheme();
  const [motion] = useState(() => ({
    opacity: new Animated.Value(reduceMotion ? 1 : 0),
    shift: new Animated.Value(reduceMotion ? 0 : 8),
  }));

  useEffect(() => {
    if (reduceMotion) return;
    const animation = Animated.parallel([
      Animated.timing(motion.opacity, { toValue: 1, duration: 220, useNativeDriver: false }),
      Animated.timing(motion.shift, { toValue: 0, duration: 220, useNativeDriver: false }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [motion, reduceMotion]);

  const tone = graded.correct ? theme.success : theme.danger;
  const background = graded.correct ? theme.successBg : theme.dangerBg;

  return (
    <View accessibilityLiveRegion="polite" style={{ gap: 12 }}>
      <Animated.View
        style={{
          opacity: motion.opacity,
          transform: [{ translateY: motion.shift }],
          backgroundColor: background,
          borderRadius: 18,
          padding: 16,
          gap: 8,
          borderWidth: 1,
          borderColor: tone,
        }}
      >
        <Text accessibilityRole="header" style={{ color: tone, fontSize: 24, fontWeight: '700' }}>
          {graded.correct ? 'Correct' : 'Not quite'}
        </Text>
        {graded.confidentlyWrong ? (
          <Text style={{ color: theme.ink, fontWeight: '700' }}>
            Confidently wrong. You marked Sure, and this answer is flagged for review.
          </Text>
        ) : (
          <Text style={{ color: theme.ink }}>{reviewCopy(graded)}</Text>
        )}
        <Text style={{ color: theme.ink, fontWeight: '700' }}>Answer: {correctLabels(question)}</Text>
        <Text style={{ color: theme.ink, fontSize: 16, lineHeight: 24 }}>{question.explanation}</Text>
        <Text style={{ color: theme.ink, fontWeight: '700' }}>+{graded.xpGained} XP</Text>
      </Animated.View>
      <Button label={isLast ? 'See results' : 'Next question'} onPress={onContinue} />
    </View>
  );
}

function reviewCopy(graded: GradedAnswer): string {
  if (graded.reviewChange === 'cleared') return 'Removed from the review queue.';
  if (graded.correct && graded.reviewChange === 'added') {
    return 'You got it. Because you were guessing, it stays in the review queue.';
  }
  if (!graded.correct && graded.reviewChange === 'added') return 'Added to the review queue.';
  if (graded.reviewChange === 'kept') return 'It stays in the review queue.';
  return 'Recorded.';
}

function uniqueBadges(badges: Achievement[]): Achievement[] {
  const seen = new Set<string>();
  return badges.filter((badge) => {
    if (seen.has(badge.id)) return false;
    seen.add(badge.id);
    return true;
  });
}
