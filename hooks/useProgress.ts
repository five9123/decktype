'use client';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import type { DailyActivity, PracticeStreak, PersonalBest, TypingSession } from '@/types';

interface UseProgressReturn {
  sessions: TypingSession[];
  dailyActivity: DailyActivity[];
  streak: PracticeStreak;
  personalBests: PersonalBest[];
  loading: boolean;
  error: string;
}

function computeStreak(activities: DailyActivity[]): PracticeStreak {
  if (activities.length === 0) return { current: 0, longest: 0, todayDone: false };

  const today = new Date().toISOString().slice(0, 10);
  const todayDone = activities.some((a) => a.date === today);

  const dates = activities.map((a) => a.date).sort((a, b) => b.localeCompare(a));

  let current = 0;
  const startDate = todayDone ? today : addDays(today, -1);
  for (let i = 0; i < dates.length; i++) {
    if (dates.includes(addDays(startDate, -i))) {
      current++;
    } else {
      break;
    }
  }

  let longest = 0;
  let streak = 1;
  const sorted = [...dates].sort();
  for (let i = 1; i < sorted.length; i++) {
    if (addDays(sorted[i - 1], 1) === sorted[i]) {
      streak++;
    } else {
      longest = Math.max(longest, streak);
      streak = 1;
    }
  }
  longest = Math.max(longest, streak);

  return { current, longest, todayDone };
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

interface ProgressData {
  sessions: TypingSession[];
  dailyActivity: DailyActivity[];
  streak: PracticeStreak;
  personalBests: PersonalBest[];
}

const DEFAULT_STREAK: PracticeStreak = { current: 0, longest: 0, todayDone: false };

export function useProgress(): UseProgressReturn {
  const { user } = useAuth();

  const { data, loading, error } = useAsyncData<ProgressData>(
    async () => {
      const supabase = createBrowserClient();
      const [sessionsRes, pbRes] = await Promise.all([
        supabase
          .from('typing_sessions')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500),
        supabase.from('personal_bests').select('*'),
      ]);

      if (sessionsRes.error) throw new Error(sessionsRes.error.message);

      const allSessions = (sessionsRes.data ?? []) as TypingSession[];

      const dayMap = new Map<string, { count: number; duration: number }>();
      allSessions.forEach((s) => {
        const date = s.created_at.slice(0, 10);
        const existing = dayMap.get(date) ?? { count: 0, duration: 0 };
        dayMap.set(date, { count: existing.count + 1, duration: existing.duration + s.duration_ms });
      });

      const dailyActivity: DailyActivity[] = [];
      dayMap.forEach((val, date) => {
        dailyActivity.push({ date, sessionCount: val.count, totalDurationMs: val.duration });
      });

      return {
        sessions: allSessions,
        dailyActivity,
        streak: computeStreak(dailyActivity),
        personalBests: (pbRes.data ?? []) as PersonalBest[],
      };
    },
    [user],
    { enabled: !!user },
  );

  return {
    sessions: data?.sessions ?? [],
    dailyActivity: data?.dailyActivity ?? [],
    streak: data?.streak ?? DEFAULT_STREAK,
    personalBests: data?.personalBests ?? [],
    loading,
    error,
  };
}
