import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';
import { createSupabaseServer } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

/**
 * Checks the rate limit for the given key and window.
 * Returns a 429 NextResponse if limited, or null if the request may proceed.
 */
export function checkRateLimit(
  req: Request,
  key: string,
  max: number,
  windowMs: number,
): NextResponse | null {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const { limited, resetMs } = rateLimit(`${key}:${ip}`, max, windowMs);
  if (!limited) return null;
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': String(Math.ceil(resetMs / 1000)) } },
  );
}

type AuthSuccess = { user: User; supabase: SupabaseClient; response: null };
type AuthFailure = { user: null; supabase: null; response: NextResponse };

/**
 * Verifies the caller is authenticated via Supabase.
 * Returns the user + supabase client on success, or a 401 NextResponse on failure.
 * The supabase client is returned so callers don't need a second createSupabaseServer() call.
 */
export async function requireAuth(): Promise<AuthSuccess | AuthFailure> {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { user: null, supabase: null, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { user, supabase: supabase as SupabaseClient, response: null };
}
