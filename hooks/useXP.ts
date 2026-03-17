'use client';
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import { xpToLevel, xpToNextLevel } from '@/lib/achievements';
import type { XPSource } from '@/types';

interface UseXPReturn {
  xp: number;
  level: number;
  progress: number;
  nextLevelXP: number;
  loading: boolean;
  awardXP: (amount: number, source: XPSource, sourceId?: string) => Promise<number>;
  refresh: () => void;
}

export function useXP(): UseXPReturn {
  const { user } = useAuth();

  const { data, loading, refresh } = useAsyncData(
    async () => {
      const supabase = createBrowserClient();
      const { data: row } = await supabase
        .from('user_xp')
        .select('total_xp, level')
        .eq('user_id', user!.id)
        .single();

      return { totalXP: row?.total_xp ?? 0, level: row?.level ?? 1 };
    },
    [user],
    { enabled: !!user },
  );

  const totalXP = data?.totalXP ?? 0;
  const level = data?.level ?? 1;
  const { nextLevelXP, progress } = xpToNextLevel(totalXP);

  const awardXP = useCallback(async (
    amount: number,
    source: XPSource,
    sourceId?: string,
  ): Promise<number> => {
    if (!user || amount <= 0) return totalXP;

    const supabase = createBrowserClient();
    const newTotal = totalXP + amount;
    const newLevel = xpToLevel(newTotal);

    // Insert XP event
    await supabase.from('xp_events').insert({
      user_id: user.id,
      amount,
      source,
      source_id: sourceId ?? null,
    });

    // Upsert user_xp
    await supabase.from('user_xp').upsert(
      {
        user_id: user.id,
        total_xp: newTotal,
        level: newLevel,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id' },
    );

    refresh();
    return newTotal;
  }, [user, totalXP, refresh]);

  return { xp: totalXP, level, progress, nextLevelXP, loading, awardXP, refresh };
}
