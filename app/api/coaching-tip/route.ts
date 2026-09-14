import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api-middleware';
import { getAiLimit, reserveAiUsage, rollbackAiUsage } from '@/lib/ai-usage';
import { AiError, aiErrorResponse, jsonCompletion } from '@/lib/openai-client';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface CoachingTipBody {
  accuracy: number;
  wpm: number;
  composite_score: number;
  errorPatterns?: { expected: string; actual: string; count: number }[];
  mode?: string;
  sourceLang?: string;
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (!authResult.user) {
    return authResult.response!;
  }
  const { user, supabase } = authResult;

  let body: CoachingTipBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Check AI quota
  const { limit, plan } = await getAiLimit(supabase, user);
  const { reservationId, used } = await reserveAiUsage(supabase, user.id, 'coaching-tip');

  if (used > limit) {
    if (reservationId) await rollbackAiUsage(supabase, reservationId);
    return NextResponse.json({ error: 'quota_exceeded', limit, plan }, { status: 429 });
  }

  const errorSummary = (body.errorPatterns ?? [])
    .slice(0, 5)
    .map((p) => `"${p.expected}" → "${p.actual}" (×${p.count})`)
    .join(', ');

  const prompt = `You are a language learning coach. A student just finished a typing practice session.

Stats: ${body.accuracy}% accuracy, ${body.wpm} WPM, score ${body.composite_score}/100.
Mode: ${body.mode ?? 'typing'}.${body.sourceLang ? ` Language: ${body.sourceLang}.` : ''}
${errorSummary ? `Common errors: ${errorSummary}.` : ''}

Give exactly 3 short, specific, actionable improvement tips. Be concise and encouraging. Format as a JSON array of strings.`;

  try {
    const { content: raw } = await jsonCompletion(prompt, { maxTokens: 300, timeoutMs: 20_000 });
    let tips: string[] = [];
    try {
      const parsed = JSON.parse(raw);
      tips = Array.isArray(parsed.tips) ? parsed.tips : Array.isArray(parsed) ? parsed : Object.values(parsed).slice(0, 3) as string[];
    } catch {
      tips = [raw];
    }

    const quotaRemaining = limit - used;
    return NextResponse.json({ tips: tips.slice(0, 3), quotaRemaining });
  } catch (err) {
    if (reservationId) await rollbackAiUsage(supabase, reservationId);
    if (err instanceof AiError) {
      const { body, init } = aiErrorResponse(err);
      return NextResponse.json(body, init);
    }
    const msg = err instanceof Error ? err.message : 'AI request failed';
    return NextResponse.json({ error: msg, code: 'UNKNOWN' }, { status: 500 });
  }
}
