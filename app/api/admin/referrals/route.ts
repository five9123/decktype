import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { requireAuth } from '@/lib/api-middleware';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? '';

export async function GET(_request: NextRequest) {
  // Require auth
  const { user, response: authError } = await requireAuth();
  if (authError) return authError;

  // Require admin email
  if (!ADMIN_EMAIL || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createSupabaseAdmin();

  // Fetch referral codes with conversion counts
  const { data: codes, error } = await supabase
    .from('referral_codes')
    .select('id, code, influencer_name, discount_pct, active, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  // Count conversions per code
  const { data: conversions } = await supabase
    .from('referral_conversions')
    .select('referral_code_id');

  const countMap: Record<string, number> = {};
  (conversions ?? []).forEach(c => {
    countMap[c.referral_code_id] = (countMap[c.referral_code_id] ?? 0) + 1;
  });

  const rows = (codes ?? []).map(c => ({
    ...c,
    conversion_count: countMap[c.id] ?? 0,
  }));

  return NextResponse.json({ rows });
}
