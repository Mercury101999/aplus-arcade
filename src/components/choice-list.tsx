import { Pressable, Text, View } from 'react-native';

import type { Question } from '@/content/types';
import { useTheme } from '@/theme/theme-context';

export function ChoiceList({
  question,
  selected,
  locked,
  onChange,
}: {
  question: Question;
  selected: number[];
  locked: boolean;
  onChange: (next: number[]) => void;
}) {
  const theme = useTheme();
  const multi = question.correct.length > 1;

  function toggle(index: number) {
    if (locked) return;
    if (!multi) {
      onChange([index]);
      return;
    }
    if (selected.includes(index)) {
      onChange(selected.filter((item) => item !== index));
      return;
    }
    onChange([...selected, index].sort((left, right) => left - right));
  }

  return (
    <View
      accessibilityRole={multi ? undefined : 'radiogroup'}
      accessibilityLabel="Answer choices"
      style={{ gap: 10 }}
    >
      {multi ? (
        <Text style={{ color: theme.muted, fontSize: 15 }}>Select all that apply.</Text>
      ) : null}
      {question.choices.map((choice, index) => {
        const picked = selected.includes(index);
        const isCorrect = question.correct.includes(index);
        const tag = !locked ? '' : isCorrect ? 'Correct answer' : picked ? 'Not correct' : '';
        const mark = multi ? (picked ? '☑' : '☐') : picked ? '●' : '○';
        return (
          <Pressable
            key={`${question.id}-${index}`}
            accessibilityRole={multi ? 'checkbox' : 'radio'}
            accessibilityState={{ selected: picked, checked: picked, disabled: locked }}
            accessibilityLabel={tag ? `${choice}. ${tag}` : choice}
            disabled={locked}
            onPress={() => toggle(index)}
            style={({ pressed }) => ({
              minHeight: 52,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: locked && isCorrect ? theme.success : picked ? theme.accent : theme.line,
              backgroundColor: locked && isCorrect ? theme.successBg : theme.surface,
              paddingHorizontal: 14,
              paddingVertical: 12,
              opacity: pressed && !locked ? 0.88 : 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 10,
            })}
          >
            <Text style={{ color: theme.ink, fontSize: 18, width: 24 }} importantForAccessibility="no">
              {mark}
            </Text>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ color: theme.ink, fontSize: 16, lineHeight: 22 }}>{choice}</Text>
              {tag ? (
                <Text
                  style={{
                    color: isCorrect ? theme.success : theme.danger,
                    fontWeight: '700',
                    fontSize: 13,
                  }}
                >
                  {tag}
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
