'use client';
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { updateMasteryStats } from '@/lib/confidence';
import { useAsyncData } from '@/hooks/useAsyncData';
import type { CardMastery, MasteryLevel } from '@/types';

interface DeckProgress {
  learning: number;
  familiar: number;
  mastered: number;
  total: number;
}

interface UseMasteryReturn {
  masteryMap: Map<string, CardMastery>;
  loading: boolean;
  updateMastery: (cardId: string, accuracy: number, wpm: number) => Promise<MasteryLevel | null>;
  getDeckProgress: () => DeckProgress;
  userAvgWpm: number;
}

interface MasteryData {
  masteryMap: Map<string, CardMastery>;
  userAvgWpm: number;
}

/**
 * Hook to load and update card mastery data for a deck.
 */
export function useMastery(deckId: string): UseMasteryReturn {
  const { user } = useAuth();

  const { data, loading } = useAsyncData<MasteryData>(
    async () => {
      const supabase = createBrowserClient();
      const [cardsRes, sessionsRes] = await Promise.all([
        supabase.from('cards').select('id').eq('deck_id', deckId),
        supabase
          .from('typing_sessions')
          .select('wpm')
          .order('created_at', { ascending: false })
          .limit(20),
      ]);

      const cardIds = (cardsRes.data ?? []).map((c: { id: string }) => c.id);

      // Calculate user average WPM
      const sessions = sessionsRes.data ?? [];
      const avgWpm = sessions.length > 0
        ? Math.round(sessions.reduce((s: number, r: { wpm: number }) => s + r.wpm, 0) / sessions.length) || 30
        : 30;

      if (cardIds.length === 0) {
        return { masteryMap: new Map(), userAvgWpm: avgWpm };
      }

      const { data: masteryData } = await supabase
        .from('card_mastery')
        .select('*')
        .in('card_id', cardIds);

      const map = new Map<string, CardMastery>();
      (masteryData ?? []).forEach((m: CardMastery) => map.set(m.card_id, m));

      return { masteryMap: map, userAvgWpm: avgWpm };
    },
    [user, deckId],
    { enabled: !!user && !!deckId },
  );

  const masteryMap = data?.masteryMap ?? new Map<string, CardMastery>();
  const userAvgWpm = data?.userAvgWpm ?? 30;

  // Update mastery for a single card after practice
  const updateMastery = useCallback(async (
    cardId: string,
    accuracy: number,
    wpm: number,
  ): Promise<MasteryLevel | null> => {
    if (!user) return null;

    const current = masteryMap.get(cardId);
    const currentStats = current ?? {
      attempt_count: 0,
      total_correct: 0,
      avg_wpm: 0,
      avg_accuracy: 0,
      streak: 0,
      error_count: 0,
      ease_factor: 2.5,
    };

    const updated = updateMasteryStats({
      current: currentStats,
      newAccuracy: accuracy,
      newWpm: wpm,
      userAvgWpm,
    });

    const oldLevel = current?.mastery_level ?? 'learning';

    const supabase = createBrowserClient();
    const { data: upserted } = await supabase
      .from('card_mastery')
      .upsert({ user_id: user.id, card_id: cardId, ...updated }, { onConflict: 'user_id,card_id' })
      .select()
      .single();

    if (upserted && updated.mastery_level !== oldLevel) {
      return updated.mastery_level;
    }

    return null;
  }, [user, masteryMap, userAvgWpm]);

  const getDeckProgress = useCallback((): DeckProgress => {
    let learning = 0, familiar = 0, mastered = 0;
    masteryMap.forEach((m) => {
      switch (m.mastery_level) {
        case 'learning': learning++; break;
        case 'familiar': familiar++; break;
        case 'mastered': mastered++; break;
      }
    });
    return { learning, familiar, mastered, total: masteryMap.size };
  }, [masteryMap]);

  return { masteryMap, loading, updateMastery, getDeckProgress, userAvgWpm };
}
