import type { SupabaseClient, User } from '@supabase/supabase-js';
import { AI_DAILY_LIMIT_FREE, AI_DAILY_LIMIT_PRO } from '@/lib/constants';

/**
 * Get today's AI usage count for a user.
 */
export async function getDailyAiUsage(
  supabase: SupabaseClient,
  userId: string,
): Promise<number> {
  // Count rows from today (UTC day boundary)
  const todayStart = new Date();
  todayStart.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('ai_usage')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('used_at', todayStart.toISOString());

  return count ?? 0;
}

/**
 * Get the daily AI limit for a user based on their plan.
 */
export async function getAiLimit(
  supabase: SupabaseClient,
  user: User,
): Promise<{ limit: number; plan: string }> {
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single();

  const plan = profile?.plan ?? 'free';
  const limit = plan === 'pro' ? AI_DAILY_LIMIT_PRO : AI_DAILY_LIMIT_FREE;
  return { limit, plan };
}

/**
 * Check if a user can make an AI request.
 * Returns { allowed, used, limit, plan } or throws.
 */
export async function checkAiQuota(
  supabase: SupabaseClient,
  user: User,
): Promise<{ allowed: boolean; used: number; limit: number; plan: string }> {
  const [used, { limit, plan }] = await Promise.all([
    getDailyAiUsage(supabase, user.id),
    getAiLimit(supabase, user),
  ]);

  return { allowed: used < limit, used, limit, plan };
}

/**
 * Record an AI usage event.
 */
export async function recordAiUsage(
  supabase: SupabaseClient,
  userId: string,
  endpoint: string = 'process-media',
): Promise<void> {
  await supabase.from('ai_usage').insert({
    user_id: userId,
    endpoint,
  });
}

/**
 * Reserve a quota slot BEFORE calling OpenAI to prevent race conditions.
 * Insert first, then verify the count hasn't exceeded the limit.
 * Returns the reservation ID for potential rollback.
 */
export async function reserveAiUsage(
  supabase: SupabaseClient,
  userId: string,
  endpoint: string = 'process-media',
): Promise<{ reservationId: number | null; used: number }> {
  // 1. Insert a row to "reserve" the slot
  const { data: row } = await supabase
    .from('ai_usage')
    .insert({ user_id: userId, endpoint })
    .select('id')
    .single();

  // 2. Count today's total usage (including the just-inserted row)
  const used = await getDailyAiUsage(supabase, userId);

  return { reservationId: row?.id ?? null, used };
}

/**
 * Rollback a reserved AI usage slot (e.g. when quota exceeded or API call fails).
 */
export async function rollbackAiUsage(
  supabase: SupabaseClient,
  reservationId: number,
): Promise<void> {
  await supabase.from('ai_usage').delete().eq('id', reservationId);
}
