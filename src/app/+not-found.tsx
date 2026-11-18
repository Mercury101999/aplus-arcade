import { useRouter } from 'expo-router';
import { Text } from 'react-native';

import { Button } from '@/components/button';
import { Screen } from '@/components/screen';
import { useTheme } from '@/theme/theme-context';

export default function NotFound() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Screen>
      <Text accessibilityRole="header" style={{ color: theme.ink, fontSize: 32, fontWeight: '700' }}>
        That page is not in the arcade
      </Text>
      <Text style={{ color: theme.muted }}>The link does not match a study screen.</Text>
      <Button label="Back home" onPress={() => router.replace('/')} />
    </Screen>
  );
}
