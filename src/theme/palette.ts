export type ColorSchemeName = 'light' | 'dark';

export interface Palette {
  scheme: ColorSchemeName;
  bg: string;
  surface: string;
  surfaceAlt: string;
  ink: string;
  muted: string;
  line: string;
  accent: string;
  accentText: string;
  success: string;
  successBg: string;
  danger: string;
  dangerBg: string;
  gold: string;
  goldBg: string;
  focus: string;
}

export const palettes: Record<ColorSchemeName, Palette> = {
  light: {
    scheme: 'light',
    bg: '#F3EFE6',
    surface: '#FFFCF7',
    surfaceAlt: '#E5F3F1',
    ink: '#1C1915',
    muted: '#4A453C',
    line: '#D4CBBC',
    accent: '#0C5C56',
    accentText: '#FFFFFF',
    success: '#0D5A32',
    successBg: '#E3F6EA',
    danger: '#8B1D2C',
    dangerBg: '#FDECEE',
    gold: '#6F4500',
    goldBg: '#FFF1CC',
    focus: '#0A4C96',
  },
  dark: {
    scheme: 'dark',
    bg: '#101418',
    surface: '#1B222C',
    surfaceAlt: '#14302C',
    ink: '#F6F2EA',
    muted: '#D4CBBE',
    line: '#3A4656',
    accent: '#8EE6D8',
    accentText: '#06211E',
    success: '#B7F6D1',
    successBg: '#123528',
    danger: '#FFD0D6',
    dangerBg: '#411C24',
    gold: '#F6D48A',
    goldBg: '#3C2E14',
    focus: '#B9D7FF',
  },
};

export function contrastRatio(foreground: string, background: string): number {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

function relativeLuminance(hex: string): number {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((start) => {
    const channel = Number.parseInt(value.slice(start, start + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
