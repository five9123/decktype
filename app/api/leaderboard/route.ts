import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period') || 'weekly';
  const mode = searchParams.get('mode') || 'all';
  const limitParam = Math.min(Number(searchParams.get('limit') || '20'), 50);

  const supabase = await createSupabaseServer();

  // Build date filter
  let dateFilter: string | null = null;
  const now = new Date();
  if (period === 'daily') {
    dateFilter = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  } else if (period === 'weekly') {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    dateFilter = weekAgo.toISOString();
  }
  // 'alltime' = no date filter

  // Query best composite_score per user
  // We use a raw query approach via RPC, but since we don't have a DB function,
  // we'll query typing_sessions and aggregate client-side
  let query = supabase
    .from('typing_sessions')
    .select('user_id, wpm, accuracy, composite_score, mode, created_at')
    .order('composite_score', { ascending: false })
    .limit(200);

  if (dateFilter) {
    query = query.gte('created_at', dateFilter);
  }
  if (mode !== 'all') {
    query = query.eq('mode', mode);
  }

  const { data: sessions, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Deduplicate: keep best composite_score per user
  const bestByUser = new Map<string, { user_id: string; wpm: number; accuracy: number; composite_score: number }>();
  for (const s of sessions ?? []) {
    const existing = bestByUser.get(s.user_id);
    if (!existing || s.composite_score > existing.composite_score) {
      bestByUser.set(s.user_id, {
        user_id: s.user_id,
        wpm: s.wpm,
        accuracy: s.accuracy,
        composite_score: s.composite_score,
      });
    }
  }

  // Sort and limit
  const ranked = Array.from(bestByUser.values())
    .sort((a, b) => b.composite_score - a.composite_score)
    .slice(0, limitParam);

  // Fetch display names for ranked users
  const userIds = ranked.map((r) => r.user_id);
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, display_name')
    .in('id', userIds);

  const nameMap = new Map<string, string>();
  for (const p of profiles ?? []) {
    nameMap.set(p.id, p.display_name || '');
  }

  const leaderboard = ranked.map((entry, i) => ({
    rank: i + 1,
    userId: entry.user_id,
    displayName: nameMap.get(entry.user_id) || 'Anonymous Learner',
    wpm: Math.round(entry.wpm),
    accuracy: Math.round(entry.accuracy * 10) / 10,
    compositeScore: Math.round(entry.composite_score),
  }));

  return NextResponse.json({ leaderboard, period, mode });
}
