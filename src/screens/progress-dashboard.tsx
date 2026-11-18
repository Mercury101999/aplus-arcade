import { useState, type ReactNode } from 'react';
import { Modal, Text, View } from 'react-native';

import { questionBank } from '@/content/bank';
import { ACCURACY_SOLID_PERCENT } from '@/game/constants';
import { DOMAIN_CATALOG, examTitle } from '@/content/catalog';
import { DOMAIN_IDS, EXAM_IDS } from '@/content/types';
import {
  ACHIEVEMENTS,
  CONFIDENCE_LEVELS,
  accuracyWord,
  formatDateKey,
  levelProgress,
  percent,
  reviewSummary,
  type ProgressState,
} from '@/game/progress';
import { useTheme } from '@/theme/theme-context';

import { Button } from '@/components/button';
import { Screen } from '@/components/screen';

export function ProgressDashboard({
  state,
  onReset,
  onHome,
}: {
  state: ProgressState;
  onReset: () => void;
  onHome: () => void;
}) {
  const theme = useTheme();
  const [confirming, setConfirming] = useState(false);
  const level = levelProgress(state.xp);
  const review = reviewSummary(state);
  const overall = percent(state.totals.correct, state.totals.answered);
  const questions = new Map(questionBank.map((question) => [question.id, question]));

  const domains = [...DOMAIN_IDS].sort((left, right) => {
    const leftAnswered = state.byDomain[left].answered;
    const rightAnswered = state.byDomain[right].answered;
    if (leftAnswered === 0 && rightAnswered === 0) return 0;
    if (leftAnswered === 0) return 1;
    if (rightAnswered === 0) return -1;
    return (
      state.byDomain[left].correct / leftAnswered - state.byDomain[right].correct / rightAnswered
    );
  });

  return (
    <Screen>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 32, fontWeight: '700' }}>
          Progress
        </Text>
        <Button label="Home" variant="ghost" onPress={onHome} />
      </View>
      <Text style={{ color: theme.muted, lineHeight: 20 }}>
        These percentages are practice accuracy. CompTIA scores the real exams on a scaled score, not a
        percent you can read off this screen.
      </Text>

      <Card>
        <Text style={{ color: theme.ink, fontSize: 20, fontWeight: '700' }}>Level {level.level}</Text>
        <Text style={{ color: theme.muted }}>
          {level.into} of {level.span} XP toward level {level.level + 1}. Total {state.xp} XP.
        </Text>
        <Meter value={level.into} max={level.span} label="XP toward the next level" />
        <Text style={{ color: theme.ink }}>
          {state.lastActiveDate
            ? `${state.streak}-day streak. Last studied ${formatDateKey(state.lastActiveDate)}.`
            : 'No streak yet. A streak counts a calendar day when you answer at least one question.'}
        </Text>
        <Text style={{ color: theme.muted }}>
          Every answer earns 5 XP. A correct answer earns 5 more. Somewhat adds another 5, and Sure adds 10,
          so a confident correct answer is worth 20 XP.
        </Text>
      </Card>

      <Card>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 20, fontWeight: '700' }}>
          Accuracy
        </Text>
        <Text style={{ color: theme.ink }}>
          Overall: {overall === null ? 'Not started' : `${overall}%`} ({state.totals.correct} of{' '}
          {state.totals.answered} correct). Status: {accuracyWord(state.totals.correct, state.totals.answered)}.
        </Text>
        {EXAM_IDS.map((exam) => {
          const tally = state.byExam[exam];
          const value = percent(tally.correct, tally.answered);
          return (
            <Text key={exam} style={{ color: theme.ink }}>
              {examTitle(exam)}: {value === null ? 'Not started' : `${value}%`} ({tally.correct} of{' '}
              {tally.answered}). {accuracyWord(tally.correct, tally.answered)}.
            </Text>
          );
        })}
      </Card>

      <Card>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 20, fontWeight: '700' }}>
          Domains
        </Text>
        <Text style={{ color: theme.muted }}>
          Weakest attempted domains are listed first. Solid means {ACCURACY_SOLID_PERCENT}% or better. Review
          means keep drilling.
        </Text>
        {domains.map((domain) => {
          const tally = state.byDomain[domain];
          const value = percent(tally.correct, tally.answered);
          const word = accuracyWord(tally.correct, tally.answered);
          return (
            <View key={domain} style={{ gap: 4 }}>
              <Text style={{ color: theme.ink, fontWeight: '700' }}>
                {DOMAIN_CATALOG[domain].name} · {word}
              </Text>
              <Text style={{ color: theme.muted }}>
                {value === null ? 'Not started' : `${tally.correct} of ${tally.answered} correct, ${value}%`}
              </Text>
              <Meter
                value={tally.correct}
                max={Math.max(tally.answered, 1)}
                label={`${DOMAIN_CATALOG[domain].name} accuracy`}
              />
            </View>
          );
        })}
      </Card>

      <Card>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 20, fontWeight: '700' }}>
          Confidence calibration
        </Text>
        <Text style={{ color: theme.muted }}>
          This compares how sure you said you were with whether the answer was right.
        </Text>
        {CONFIDENCE_LEVELS.map((level) => {
          const tally = state.confidence[level];
          const value = percent(tally.correct, tally.answered);
          const name = level === 'guessing' ? 'Guessing' : level === 'somewhat' ? 'Somewhat' : 'Sure';
          return (
            <Text key={level} style={{ color: theme.ink }}>
              {name}: {tally.answered === 0 ? 'No answers yet' : `${tally.correct} of ${tally.answered} correct (${value}%)`}
            </Text>
          );
        })}
        <Text style={{ color: theme.ink, fontWeight: '700' }}>
          Confidently wrong: {state.confidentlyWrong}
        </Text>
        <Text style={{ color: theme.muted }}>
          A confidently wrong answer was marked Sure and missed. Those are the fastest points to win back.
        </Text>
        {state.confidentMisses.length === 0 ? (
          <Text style={{ color: theme.ink }}>None are waiting right now.</Text>
        ) : (
          state.confidentMisses
            .slice(-3)
            .reverse()
            .map((id) => {
              const question = questions.get(id);
              return (
                <Text key={id} style={{ color: theme.ink }}>
                  Review {id}: {question ? question.prompt : 'Retired question'}
                </Text>
              );
            })
        )}
        <Text style={{ color: theme.ink }}>
          Review queue: {review.total} ({review.missed} missed, {review.lowConfidence} low-confidence correct).
        </Text>
      </Card>

      <Card>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 20, fontWeight: '700' }}>
          Badges
        </Text>
        {ACHIEVEMENTS.map((badge) => {
          const earned = state.achievements.includes(badge.id);
          return (
            <Text key={badge.id} style={{ color: theme.ink }}>
              {earned ? 'Earned' : 'Locked'}: {badge.name}. {badge.description}
            </Text>
          );
        })}
      </Card>

      <Card>
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 20, fontWeight: '700' }}>
          Reset
        </Text>
        <Text style={{ color: theme.muted }}>
          Erase XP, the streak, the review queue, and badges stored on this device. The question bank stays.
        </Text>
        <Button label="Reset progress" variant="danger" onPress={() => setConfirming(true)} />
      </Card>

      <Modal visible={confirming} transparent animationType="fade" onRequestClose={() => setConfirming(false)}>
        <View
          accessibilityViewIsModal
          style={{
            flex: 1,
            backgroundColor: 'rgba(16, 20, 24, 0.72)',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <View
            accessibilityRole="alert"
            style={{
              backgroundColor: theme.surface,
              borderRadius: 18,
              padding: 20,
              gap: 12,
              borderWidth: 1,
              borderColor: theme.line,
            }}
          >
            <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 22, fontWeight: '700' }}>
              Erase progress?
            </Text>
            <Text style={{ color: theme.ink, lineHeight: 22 }}>
              This deletes the XP, streak, review queue, and badges stored on this device. You cannot undo it.
            </Text>
            <Button label="Keep progress" onPress={() => setConfirming(false)} />
            <Button
              label="Erase progress"
              variant="danger"
              onPress={() => {
                setConfirming(false);
                onReset();
              }}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

function Card({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
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
      {children}
    </View>
  );
}

function Meter({ value, max, label }: { value: number; max: number; label: string }) {
  const theme = useTheme();
  const width = max <= 0 ? 0 : Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max, now: Math.min(value, max) }}
      style={{ height: 10, backgroundColor: theme.line, borderRadius: 99, overflow: 'hidden' }}
    >
      <View style={{ width: `${width}%`, height: 10, backgroundColor: theme.accent }} />
    </View>
  );
}
