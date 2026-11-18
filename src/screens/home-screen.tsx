import { useState } from 'react';
import { Text, View } from 'react-native';

import { questionBank } from '@/content/bank';
import { DOMAIN_CATALOG, EXAMS } from '@/content/catalog';
import { DOMAIN_IDS, type DomainId, type ExamId } from '@/content/types';
import { levelProgress, percent, reviewSummary, weakestDomains, type ProgressState } from '@/game/progress';
import { displayFont } from '@/theme/fonts';
import { useTheme } from '@/theme/theme-context';

import { Button } from '@/components/button';
import { Chip } from '@/components/chip';
import { Screen } from '@/components/screen';

export function HomeScreen({
  state,
  saveError,
  onStart,
  onRetry,
  onOpenProgress,
}: {
  state: ProgressState;
  saveError?: string | null;
  onStart: (exam: ExamId | 'all', domain: DomainId | 'all') => void;
  onRetry: () => void;
  onOpenProgress: () => void;
}) {
  const theme = useTheme();
  const [exam, setExam] = useState<ExamId | 'all'>('all');
  const [domain, setDomain] = useState<DomainId | 'all'>('all');
  const level = levelProgress(state.xp);
  const review = reviewSummary(state);
  const accuracy = percent(state.totals.correct, state.totals.answered);
  const weak = weakestDomains(state, 1)[0];
  const domains = DOMAIN_IDS.filter((id) => exam === 'all' || DOMAIN_CATALOG[id].exam === exam);

  function chooseExam(next: ExamId | 'all') {
    setExam(next);
    setDomain((current) => {
      if (current === 'all') return current;
      if (next !== 'all' && DOMAIN_CATALOG[current].exam !== next) return 'all';
      return current;
    });
  }

  return (
    <Screen>
      <View style={{ gap: 4 }}>
        <Text
          accessibilityRole="header"
          style={{ color: theme.ink, fontFamily: displayFont, fontSize: 42, lineHeight: 48, fontWeight: '700' }}
        >
          <Text style={{ color: theme.accent }}>A+</Text> Arcade
        </Text>
        <Text style={{ color: theme.muted, fontSize: 16, lineHeight: 22 }}>
          Short drills for CompTIA A+ Core 1 and Core 2. Progress stays on this device.
        </Text>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        <Stat label={`Level ${level.level}`} detail={`${state.xp} XP`} />
        <Stat
          label={state.lastActiveDate ? `${state.streak}-day streak` : 'No streak yet'}
          detail={state.lastActiveDate ? 'Answer one question a day' : 'Answer a question to start'}
        />
        <Stat
          label={accuracy === null ? 'No score yet' : `${accuracy}% accuracy`}
          detail={`${state.totals.correct} of ${state.totals.answered} correct`}
        />
      </View>

      <View
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.line,
          borderWidth: 1,
          borderRadius: 20,
          padding: 16,
          gap: 14,
        }}
      >
        <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 22, fontWeight: '700' }}>
          Start a round
        </Text>
        <Text style={{ color: theme.muted }}>
          {questionBank.length} original questions · 10 per round · explanation after every answer
        </Text>
        <View accessibilityRole="radiogroup" accessibilityLabel="Exam" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip label="Mixed" selected={exam === 'all'} onPress={() => chooseExam('all')} />
          <Chip label={EXAMS['220-1101'].title} selected={exam === '220-1101'} onPress={() => chooseExam('220-1101')} />
          <Chip label={EXAMS['220-1102'].title} selected={exam === '220-1102'} onPress={() => chooseExam('220-1102')} />
        </View>
        <View accessibilityRole="radiogroup" accessibilityLabel="Domain" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip label="All domains" selected={domain === 'all'} onPress={() => setDomain('all')} />
          {domains.map((id) => (
            <Chip
              key={id}
              label={DOMAIN_CATALOG[id].name}
              selected={domain === id}
              onPress={() => setDomain(id)}
            />
          ))}
        </View>
        <Button
          label="Start round"
          accessibilityHint="Starts a 10 question round with the filters you picked"
          onPress={() => onStart(exam, domain)}
        />
        <Button
          label={review.total === 0 ? 'Retry missed' : `Retry missed (${review.total})`}
          variant="secondary"
          disabled={review.total === 0}
          accessibilityHint="Missed questions and correct guesses stay queued until you answer them correctly with confidence"
          onPress={onRetry}
        />
        <Text style={{ color: theme.muted, fontSize: 14, lineHeight: 20 }}>
          {review.total === 0
            ? 'Nothing is waiting for review.'
            : `${review.missed} missed and ${review.lowConfidence} low-confidence correct answers are waiting. A question leaves the queue when you get it right and you were not guessing.`}
        </Text>
      </View>

      {weak ? (
        <Text style={{ color: theme.ink }}>
          Weakest domain so far: {DOMAIN_CATALOG[weak].name}. Open progress for the full breakdown.
        </Text>
      ) : null}

      {saveError ? <Text style={{ color: theme.danger }}>{saveError}</Text> : null}

      <Button label="View progress" variant="secondary" onPress={onOpenProgress} />
      <Text style={{ color: theme.muted, fontSize: 13, lineHeight: 18 }}>
        Unofficial study aid. Not affiliated with CompTIA. Theme follows your device setting.
      </Text>
    </Screen>
  );
}

function Stat({ label, detail }: { label: string; detail: string }) {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: theme.surfaceAlt,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        minWidth: 140,
        flexGrow: 1,
      }}
    >
      <Text style={{ color: theme.ink, fontWeight: '700', fontSize: 16 }}>{label}</Text>
      <Text style={{ color: theme.muted, fontSize: 13 }}>{detail}</Text>
    </View>
  );
}
