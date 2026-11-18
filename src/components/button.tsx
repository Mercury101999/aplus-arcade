import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme/theme-context';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityHint,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const background =
    variant === 'primary' ? theme.accent : variant === 'danger' ? theme.dangerBg : 'transparent';
  const color =
    variant === 'primary' ? theme.accentText : variant === 'danger' ? theme.danger : theme.ink;
  const borderColor = variant === 'secondary' ? theme.line : variant === 'danger' ? theme.danger : 'transparent';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          minHeight: 48,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 14,
          borderWidth: variant === 'primary' ? 0 : 2,
          borderColor,
          backgroundColor: background,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.45 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      <Text style={{ color, fontSize: 16, fontWeight: '700', textAlign: 'center' }}>{label}</Text>
    </Pressable>
  );
}
