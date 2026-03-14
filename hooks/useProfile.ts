'use client';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import type { Profile } from '@/types';

interface UseProfileResult {
  profile: Profile | null;
  isPro: boolean;
  loading: boolean;
  refresh: () => void;
}

export function useProfile(): UseProfileResult {
  const { user } = useAuth();

  const { data: profile, loading, refresh } = useAsyncData(
    async () => {
      if (!user) return null;
      const supabase = createBrowserClient();
      const { data } = await supabase
        .from('profiles')
        .select('id, email, plan, created_at')
        .eq('id', user.id)
        .single();
      return (data as Profile | null) ?? null;
    },
    [user],
    { enabled: !!user },
  );

  return {
    profile: profile ?? null,
    isPro: profile?.plan === 'pro',
    loading,
    refresh,
  };
}
