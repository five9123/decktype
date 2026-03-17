import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/admin';
import { checkRateLimit } from '@/lib/api-middleware';

export async function POST(request: NextRequest) {
  // Rate limit: 10 requests per minute per IP
  const limited = checkRateLimit(request, 'referral-validate', 10, 60_000);
  if (limited) return limited;

  const { code } = await request.json() as { code?: string };
  if (!code || typeof code !== 'string') {
    return NextResponse.json({ valid: false });
  }

  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from('referral_codes')
    .select('code, influencer_name, discount_pct')
    .eq('code', code.toUpperCase().trim())
    .eq('active', true)
    .single();

  if (!data) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({
    valid: true,
    code: data.code,
    influencer_name: data.influencer_name,
    discount_pct: data.discount_pct,
  });
}
