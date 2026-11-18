import { createContext, useContext, type ReactNode } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { palettes, type Palette } from './palette';

const ThemeContext = createContext<Palette>(palettes.light);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();
  const palette = scheme === 'dark' ? palettes.dark : palettes.light;
  return <ThemeContext.Provider value={palette}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Palette {
  return useContext(ThemeContext);
}
