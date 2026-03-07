'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
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

  // Sort dates descending
  const dates = activities.map((a) => a.date).sort((a, b) => b.localeCompare(a));

  // Calculate current streak
  let current = 0;
  const startDate = todayDone ? today : yesterday(today);

  for (let i = 0; i < dates.length; i++) {
    const expected = addDays(startDate, -i);
    if (dates.includes(expected)) {
      current++;
    } else {
      break;
    }
  }

  // Calculate longest streak
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

function yesterday(dateStr: string): string {
  return addDays(dateStr, -1);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function useProgress(): UseProgressReturn {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<TypingSession[]>([]);
  const [dailyActivity, setDailyActivity] = useState<DailyActivity[]>([]);
  const [streak, setStreak] = useState<PracticeStreak>({ current: 0, longest: 0, todayDone: false });
  const [personalBests, setPersonalBests] = useState<PersonalBest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;

    const supabase = createBrowserClient();

    Promise.all([
      // Load all sessions (up to 500 for heatmap/charts)
      supabase
        .from('typing_sessions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500),
      // Load personal bests
      supabase
        .from('personal_bests')
        .select('*'),
    ]).then(([sessionsRes, pbRes]) => {
      if (sessionsRes.error) {
        setError(sessionsRes.error.message);
        setLoading(false);
        return;
      }

      const allSessions = (sessionsRes.data ?? []) as TypingSession[];
      setSessions(allSessions);

      // Aggregate daily activity
      const dayMap = new Map<string, { count: number; duration: number }>();
      allSessions.forEach((s) => {
        const date = s.created_at.slice(0, 10);
        const existing = dayMap.get(date) ?? { count: 0, duration: 0 };
        dayMap.set(date, {
          count: existing.count + 1,
          duration: existing.duration + s.duration_ms,
        });
      });

      const activities: DailyActivity[] = [];
      dayMap.forEach((val, date) => {
        activities.push({ date, sessionCount: val.count, totalDurationMs: val.duration });
      });
      setDailyActivity(activities);
      setStreak(computeStreak(activities));

      setPersonalBests((pbRes.data ?? []) as PersonalBest[]);
      setLoading(false);
    });
  }, [user]);

  return { sessions, dailyActivity, streak, personalBests, loading, error };
}
