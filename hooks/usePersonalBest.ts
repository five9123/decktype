'use client';
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import type { PracticeMode } from '@/types';

interface PBRecord {
  type: 'wpm' | 'accuracy' | 'composite';
  oldValue: number;
  newValue: number;
}

interface UsePersonalBestReturn {
  checkAndUpdate: (
    deckId: string,
    mode: PracticeMode,
    wpm: number,
    accuracy: number,
    compositeScore: number,
  ) => Promise<PBRecord[]>;
}

export function usePersonalBest(): UsePersonalBestReturn {
  const { user } = useAuth();

  const checkAndUpdate = useCallback(async (
    deckId: string,
    mode: PracticeMode,
    wpm: number,
    accuracy: number,
    compositeScore: number,
  ): Promise<PBRecord[]> => {
    if (!user) return [];

    const supabase = createBrowserClient();

    // Fetch existing PB for this deck+mode
    const { data: existing } = await supabase
      .from('personal_bests')
      .select('*')
      .eq('deck_id', deckId)
      .eq('mode', mode)
      .single();

    const records: PBRecord[] = [];

    const oldWpm = existing?.best_wpm ?? 0;
    const oldAcc = existing?.best_accuracy ?? 0;
    const oldComposite = existing?.best_composite ?? 0;

    if (wpm > oldWpm) {
      records.push({ type: 'wpm', oldValue: Math.round(oldWpm), newValue: Math.round(wpm) });
    }
    if (accuracy > oldAcc) {
      records.push({ type: 'accuracy', oldValue: Math.round(oldAcc), newValue: Math.round(accuracy) });
    }
    if (compositeScore > oldComposite) {
      records.push({ type: 'composite', oldValue: Math.round(oldComposite), newValue: Math.round(compositeScore) });
    }

    if (records.length > 0) {
      await supabase
        .from('personal_bests')
        .upsert({
          user_id: user.id,
          deck_id: deckId,
          mode,
          best_wpm: Math.max(wpm, oldWpm),
          best_accuracy: Math.max(accuracy, oldAcc),
          best_composite: Math.max(compositeScore, oldComposite),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,deck_id,mode' });
    }

    return records;
  }, [user]);

  return { checkAndUpdate };
}
