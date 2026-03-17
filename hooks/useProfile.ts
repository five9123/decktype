'use client';
import { useAuth } from '@/contexts/AuthContext';
import { createBrowserClient } from '@/lib/supabase/client';
import { useAsyncData } from '@/hooks/useAsyncData';
import type { Profile } from '@/types';

interface UseProfileResult {
  profile: Profile | null;
  isPro: boolean;
  displayName: string;
  loading: boolean;
  refresh: () => void;
  updateDisplayName: (name: string) => Promise<boolean>;
}

export function useProfile(): UseProfileResult {
  const { user } = useAuth();

  const { data: profile, loading, refresh } = useAsyncData(
    async () => {
      if (!user) return null;
      const supabase = createBrowserClient();
      const { data } = await supabase
        .from('profiles')
        .select('id, email, plan, display_name, created_at')
        .eq('id', user.id)
        .single();
      return (data as Profile | null) ?? null;
    },
    [user],
    { enabled: !!user },
  );

  const updateDisplayName = async (name: string): Promise<boolean> => {
    if (!user) return false;
    const supabase = createBrowserClient();
    const { error } = await supabase
      .from('profiles')
      .update({ display_name: name.trim() })
      .eq('id', user.id);
    if (!error) refresh();
    return !error;
  };

  return {
    profile: profile ?? null,
    isPro: profile?.plan === 'pro',
    displayName: profile?.display_name ?? '',
    loading,
    refresh,
    updateDisplayName,
  };
}
