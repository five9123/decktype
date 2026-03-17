'use client';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useProgress } from '@/hooks/useProgress';
import { trackEvent } from '@/lib/analytics';
import type { UserGoal, GoalType, GoalPeriod } from '@/types';

export interface GoalProgress {
  goal: UserGoal;
  current: number;
  percentage: number;
  completed: boolean;
}

interface UseGoalsResult {
  goals: UserGoal[];
  goalProgress: GoalProgress[];
  loading: boolean;
  setGoal: (type: GoalType, period: GoalPeriod, target: number) => Promise<boolean>;
  removeGoal: (goalId: string) => Promise<boolean>;
  refresh: () => void;
}

export function useGoals(): UseGoalsResult {
  const { user } = useAuth();
  const { sessions, dailyActivity } = useProgress();

  const { data: goals, loading, refresh } = useAsyncData(
    async () => {
      if (!user) return [];
      const supabase = createBrowserClient();
      const { data } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at');
      return (data as UserGoal[]) ?? [];
    },
    [user],
    { enabled: !!user },
  );

  const setGoal = async (type: GoalType, period: GoalPeriod, target: number): Promise<boolean> => {
    if (!user) return false;
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from('user_goals')
      .upsert(
        { user_id: user.id, goal_type: type, period, target_value: target, is_active: true },
        { onConflict: 'user_id,goal_type,period' },
      );
    if (!error) {
      trackEvent('goal_set', { type, period, target });
      refresh();
    }
    return !error;
  };

  const removeGoal = async (goalId: string): Promise<boolean> => {
    if (!user) return false;
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from('user_goals')
      .update({ is_active: false })
      .eq('id', goalId)
      .eq('user_id', user.id);
    if (!error) refresh();
    return !error;
  };

  // Compute progress for each goal
  const goalProgress: GoalProgress[] = (goals ?? []).map((goal) => {
    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    let relevantSessions = sessions;
    if (goal.period === 'daily') {
      relevantSessions = sessions.filter((s) => s.created_at.slice(0, 10) === today);
    } else {
      // Weekly: last 7 days
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
      relevantSessions = sessions.filter((s) => s.created_at.slice(0, 10) >= weekAgo);
    }

    let current = 0;
    if (goal.goal_type === 'sessions') {
      current = relevantSessions.length;
    } else if (goal.goal_type === 'minutes') {
      current = Math.floor(relevantSessions.reduce((sum, s) => sum + s.duration_ms, 0) / 60000);
    } else if (goal.goal_type === 'cards') {
      current = relevantSessions.reduce((sum, s) => sum + s.card_count, 0);
    }

    const percentage = Math.min(100, Math.round((current / goal.target_value) * 100));
    return { goal, current, percentage, completed: percentage >= 100 };
  });

  // Suppress unused var
  void dailyActivity;

  return { goals: goals ?? [], goalProgress, loading, setGoal, removeGoal, refresh };
}
