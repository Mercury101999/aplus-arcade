import { contrastRatio, palettes } from '@/theme/palette';

const pairs = [
  ['ink', 'bg'],
  ['ink', 'surface'],
  ['muted', 'bg'],
  ['muted', 'surface'],
  ['accentText', 'accent'],
  ['success', 'successBg'],
  ['danger', 'dangerBg'],
  ['gold', 'goldBg'],
] as const;

describe('theme contrast', () => {
  it.each(['light', 'dark'] as const)('%s text pairs meet WCAG AA', (scheme) => {
    const palette = palettes[scheme];
    for (const [foreground, background] of pairs) {
      expect(contrastRatio(palette[foreground], palette[background])).toBeGreaterThanOrEqual(4.5);
    }
    expect(contrastRatio(palette.focus, palette.bg)).toBeGreaterThanOrEqual(3);
  });
});
