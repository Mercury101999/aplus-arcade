import { Pressable, Text } from 'react-native';

import { useTheme } from '@/theme/theme-context';

export function Chip({
  label,
  selected,
  onPress,
  disabled = false,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={selected ? `${label}, selected` : label}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 44,
        maxWidth: '100%',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: selected ? theme.accent : theme.line,
        backgroundColor: selected ? theme.accent : theme.surface,
        opacity: disabled ? 0.7 : pressed ? 0.88 : 1,
      })}
    >
      <Text
        style={{
          color: selected ? theme.accentText : theme.ink,
          fontWeight: '700',
          fontSize: 14,
        }}
      >
        {selected ? '✓ ' : ''}
        {label}
      </Text>
    </Pressable>
  );
}
