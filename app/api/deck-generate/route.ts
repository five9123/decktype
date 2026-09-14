import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api-middleware';
import { getAiLimit, reserveAiUsage, rollbackAiUsage } from '@/lib/ai-usage';
import { AiError, aiErrorResponse, jsonCompletion } from '@/lib/openai-client';

export const runtime = 'nodejs';
export const maxDuration = 30;

interface GenerateBody {
  topic: string;
  targetLang: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  cardCount: number;
}

export async function POST(req: NextRequest) {
  const authResult = await requireAuth();
  if (!authResult.user) return authResult.response!;
  const { user, supabase } = authResult;

  let body: GenerateBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { topic, targetLang, level, cardCount } = body;
  if (!topic || !targetLang || !level) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const count = Math.min(Math.max(cardCount || 10, 5), 30);

  // Check AI quota
  const { limit, plan } = await getAiLimit(supabase, user);
  const { reservationId, used } = await reserveAiUsage(supabase, user.id, 'deck-generation');

  if (used > limit) {
    if (reservationId) await rollbackAiUsage(supabase, reservationId);
    return NextResponse.json({ error: 'quota_exceeded', limit, plan }, { status: 429 });
  }

  const prompt = `Generate exactly ${count} vocabulary flashcards for a ${level} learner studying ${targetLang}.
Topic: ${topic}.

Return a JSON object with key "cards", an array of objects. Each object must have:
- "front": the word or short phrase in ${targetLang}
- "back": the English translation
- "pronunciation": romanized pronunciation (romaji for Japanese, pinyin for Chinese, romanization for Korean, etc.)

Rules:
- Order cards from easier to harder
- Keep phrases short (1-4 words)
- Include practical, commonly used vocabulary
- No duplicate words
- Pronunciation must be accurate romanization`;

  try {
    const { content: raw } = await jsonCompletion(prompt, { maxTokens: 2000, timeoutMs: 25_000 });
    let cards: { front: string; back: string; pronunciation: string }[] = [];
    try {
      const parsed = JSON.parse(raw);
      cards = Array.isArray(parsed.cards) ? parsed.cards : [];
    } catch {
      throw new AiError('MALFORMED_JSON', 'AI returned a malformed response. Please try again.', 502);
    }

    if (cards.length === 0) {
      throw new AiError('EMPTY_RESPONSE', 'AI generated no cards. Try a different topic.', 502);
    }

    const quotaRemaining = limit - used;
    return NextResponse.json({ cards: cards.slice(0, count), quotaRemaining });
  } catch (err) {
    // Don't charge quota for failed attempts
    if (reservationId) await rollbackAiUsage(supabase, reservationId);
    if (err instanceof AiError) {
      const { body, init } = aiErrorResponse(err);
      return NextResponse.json(body, init);
    }
    const msg = err instanceof Error ? err.message : 'AI request failed';
    return NextResponse.json({ error: msg, code: 'UNKNOWN' }, { status: 500 });
  }
}
