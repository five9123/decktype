'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import type { Profile } from '@/types';

interface UseProfileResult {
  profile: Profile | null;
  isPro: boolean;
  loading: boolean;
  refresh: () => void;
}

export function useProfile(): UseProfileResult {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const supabase = createBrowserClient();
    supabase
      .from('profiles')
      .select('id, email, plan, created_at')
      .eq('id', user.id)
      .single()
      .then(({ data }: { data: Profile | null }) => {
        setProfile(data);
        setLoading(false);
      });
  }, [user, tick]);

  const refresh = () => setTick((t) => t + 1);

  return {
    profile,
    isPro: profile?.plan === 'pro',
    loading,
    refresh,
  };
}
