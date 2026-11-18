import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/theme-context';

export function Screen({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 48 }}>
        <View style={{ width: '100%', maxWidth: 760, alignSelf: 'center', gap: 16 }}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
