import { Text, View } from 'react-native';

import { useTheme } from '@/theme/theme-context';

export function LoadingScreen() {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 22, fontWeight: '700' }}>
        Loading your progress
      </Text>
    </View>
  );
}
