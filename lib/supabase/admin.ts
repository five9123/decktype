import { createClient } from '@supabase/supabase-js';

/**
 * Supabase admin client using service role key.
 * Bypasses RLS — only use in server-side API routes (e.g. webhooks).
 * Never expose to the client.
 */
export function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error('Missing Supabase admin credentials');
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
