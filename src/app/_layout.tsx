import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoadingScreen } from '@/components/loading-screen';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ProgressProvider, useProgress } from '@/state/progress-context';
import { ThemeProvider, useTheme } from '@/theme/theme-context';

import '../global.css';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProgressProvider>
          <RootNavigator />
        </ProgressProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const theme = useTheme();
  const scheme = useColorScheme();
  const reduced = useReducedMotion();
  const { ready } = useProgress();

  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => undefined);
  }, [ready]);

  if (!ready) return <LoadingScreen />;

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: reduced ? 'none' : 'fade',
          contentStyle: { backgroundColor: theme.bg },
        }}
      />
    </>
  );
}
