import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let active = true;
    const apply = (value: boolean) => {
      if (active) setReduced(value);
    };

    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      apply(media.matches);
      const onChange = (event: MediaQueryListEvent) => apply(event.matches);
      media.addEventListener('change', onChange);
      return () => {
        active = false;
        media.removeEventListener('change', onChange);
      };
    }

    AccessibilityInfo.isReduceMotionEnabled()
      .then(apply)
      .catch(() => apply(false));
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', apply);
    return () => {
      active = false;
      subscription.remove();
    };
  }, []);

  return reduced;
}
