import { useEffect, useState } from 'react';
import { useColorScheme as useReactNativeColorScheme } from 'react-native';

/**
 * Static web rendering does not know the system theme. Wait until hydration
 * before reading it so the server HTML and the first client render match.
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    // The static page is rendered as light. Read the device theme after hydration
    // so the server HTML and the first client render stay in agreement.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration flag
    setHasHydrated(true);
  }, []);

  const colorScheme = useReactNativeColorScheme();
  if (hasHydrated) return colorScheme;
  return 'light';
}
