'use client';
import { useCallback, useRef } from 'react';
import { usePreferences } from '@/contexts/PreferencesContext';
import { initSounds, playKeystroke } from '@/lib/sounds';

/**
 * Hook for typing sound effects.
 * Returns a play function that respects user preferences.
 */
export function useSound() {
  const { soundEnabled, soundType } = usePreferences();
  const initializedRef = useRef(false);

  const play = useCallback(() => {
    if (!soundEnabled) return;

    // Initialize on first play (requires user interaction for AudioContext)
    if (!initializedRef.current) {
      initSounds();
      initializedRef.current = true;
    }

    playKeystroke(soundType);
  }, [soundEnabled, soundType]);

  return { play };
}
