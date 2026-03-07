'use client';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { updateMasteryStats } from '@/lib/confidence';
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

/**
 * Hook to load and update card mastery data for a deck.
 */
export function useMastery(deckId: string): UseMasteryReturn {
  const { user } = useAuth();
  const [masteryMap, setMasteryMap] = useState<Map<string, CardMastery>>(new Map());
  const [loading, setLoading] = useState(true);
  const [userAvgWpm, setUserAvgWpm] = useState(30); // Default average

  // Load mastery data for all cards in the deck
  useEffect(() => {
    if (!user || !deckId) return;

    const supabase = createBrowserClient();

    Promise.all([
      // Get card IDs for this deck
      supabase.from('cards').select('id').eq('deck_id', deckId),
      // Get user's average WPM from recent sessions
      supabase
        .from('typing_sessions')
        .select('wpm')
        .order('created_at', { ascending: false })
        .limit(20),
    ]).then(async ([cardsRes, sessionsRes]) => {
      const cardIds = (cardsRes.data ?? []).map((c: { id: string }) => c.id);

      // Calculate user average WPM
      const sessions = sessionsRes.data ?? [];
      if (sessions.length > 0) {
        const avg = sessions.reduce((s: number, r: { wpm: number }) => s + r.wpm, 0) / sessions.length;
        setUserAvgWpm(Math.round(avg) || 30);
      }

      if (cardIds.length === 0) {
        setLoading(false);
        return;
      }

      // Load mastery records
      const { data: masteryData } = await supabase
        .from('card_mastery')
        .select('*')
        .in('card_id', cardIds);

      const map = new Map<string, CardMastery>();
      (masteryData ?? []).forEach((m: CardMastery) => {
        map.set(m.card_id, m);
      });
      setMasteryMap(map);
      setLoading(false);
    });
  }, [user, deckId]);

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
    };

    const updated = updateMasteryStats({
      current: currentStats,
      newAccuracy: accuracy,
      newWpm: wpm,
      userAvgWpm,
    });

    const oldLevel = current?.mastery_level ?? 'learning';

    // Upsert to database
    const supabase = createBrowserClient();
    const { data } = await supabase
      .from('card_mastery')
      .upsert({
        user_id: user.id,
        card_id: cardId,
        ...updated,
      }, { onConflict: 'user_id,card_id' })
      .select()
      .single();

    if (data) {
      setMasteryMap((prev) => {
        const next = new Map(prev);
        next.set(cardId, data as CardMastery);
        return next;
      });

      // Return the level if it changed (for level-up notifications)
      if (updated.mastery_level !== oldLevel) {
        return updated.mastery_level;
      }
    }

    return null;
  }, [user, masteryMap, userAvgWpm]);

  const getDeckProgress = useCallback((): DeckProgress => {
    let learning = 0;
    let familiar = 0;
    let mastered = 0;

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
