'use client';
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { trackEvent } from '@/lib/analytics';
import type { Achievement, UserAchievement } from '@/types';

export interface AchievementContext {
  currentStreak: number;
  totalSessions: number;
  totalMastered: number;
  bestWpm: number;
  totalCardsPracticed: number;
  modesUsed: number;
}

interface UseAchievementsReturn {
  unlocked: UserAchievement[];
  loading: boolean;
  checkAndUnlock: (
    context: AchievementContext,
    awardXP: (amount: number, source: 'achievement_unlock', sourceId: string) => Promise<number>,
  ) => Promise<Achievement[]>;
  refresh: () => void;
}

export function useAchievements(): UseAchievementsReturn {
  const { user } = useAuth();

  const { data, loading, refresh } = useAsyncData<UserAchievement[]>(
    async () => {
      const supabase = createBrowserClient();
      const { data: rows } = await supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user!.id);
      return rows ?? [];
    },
    [user],
    { enabled: !!user },
  );

  const unlocked = data ?? [];

  const checkAndUnlock = useCallback(async (
    context: AchievementContext,
    awardXP: (amount: number, source: 'achievement_unlock', sourceId: string) => Promise<number>,
  ): Promise<Achievement[]> => {
    if (!user) return [];

    const unlockedIds = new Set(unlocked.map((a) => a.achievement_id));
    const newlyUnlocked: Achievement[] = [];

    for (const achievement of ACHIEVEMENTS) {
      if (unlockedIds.has(achievement.id)) continue;

      let value = 0;
      switch (achievement.category) {
        case 'streak': value = context.currentStreak; break;
        case 'sessions': value = context.totalSessions; break;
        case 'mastery': value = context.totalMastered; break;
        case 'speed': value = context.bestWpm; break;
        case 'cards': value = context.totalCardsPracticed; break;
        case 'variety': value = context.modesUsed; break;
      }

      if (value >= achievement.threshold) {
        newlyUnlocked.push(achievement);
      }
    }

    if (newlyUnlocked.length === 0) return [];

    const supabase = createBrowserClient();
    // Insert all new achievements
    await supabase.from('user_achievements').insert(
      newlyUnlocked.map((a) => ({
        user_id: user.id,
        achievement_id: a.id,
      })),
    );

    // Award XP for each achievement
    for (const a of newlyUnlocked) {
      await awardXP(a.xpReward, 'achievement_unlock', a.id);
      trackEvent('achievement_unlocked', { achievement_id: a.id, xp_reward: a.xpReward });
    }

    refresh();
    return newlyUnlocked;
  }, [user, unlocked, refresh]);

  return { unlocked, loading, checkAndUnlock, refresh };
}
