import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api-middleware';
import { getAiLimit, reserveAiUsage, rollbackAiUsage } from '@/lib/ai-usage';
import OpenAI from 'openai';

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

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0]?.message?.content ?? '{}';
    let cards: { front: string; back: string; pronunciation: string }[] = [];
    try {
      const parsed = JSON.parse(raw);
      cards = Array.isArray(parsed.cards) ? parsed.cards : [];
    } catch {
      if (reservationId) await rollbackAiUsage(supabase, reservationId);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    if (cards.length === 0) {
      if (reservationId) await rollbackAiUsage(supabase, reservationId);
      return NextResponse.json({ error: 'AI generated no cards' }, { status: 500 });
    }

    const quotaRemaining = limit - used;
    return NextResponse.json({ cards: cards.slice(0, count), quotaRemaining });
  } catch (err) {
    if (reservationId) await rollbackAiUsage(supabase, reservationId);
    const msg = err instanceof Error ? err.message : 'AI request failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
