import { NextResponse } from 'next/server';
import { checkRateLimit, requireAuth } from '@/lib/api-middleware';
import { getAiLimit, reserveAiUsage, rollbackAiUsage } from '@/lib/ai-usage';
import { LANG_NAMES, AI_DAILY_LIMIT_PRO } from '@/lib/constants';
import { AiError, aiErrorResponse, jsonCompletion } from '@/lib/openai-client';

export const runtime = 'nodejs';
export const maxDuration = 60; // seconds (Vercel Pro)

// Rate limit: 5 requests per minute per IP (LLM calls cost money)
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000;
const MAX_INPUT_CHARS = 8000;
const MAX_TOKENS = 4096;

interface VocabItem {
  word: string;
  translation: string;
  pronunciation: string;
  context: string;
}

interface ClozeItem {
  sentence_with_blank: string;
  answer: string;
  full_sentence: string;
  hint: string;
}

interface ProcessMediaBody {
  text?: string;
  sourceLang?: string;
  targetLang?: string;
  mode?: 'vocabulary' | 'cloze' | 'both';
  maxWords?: number;
}

function buildVocabularyPrompt(text: string, sourceLang: string, targetLang: string, maxWords: number): string {
  return `You are a language learning assistant. Given the following text in ${LANG_NAMES[sourceLang] ?? sourceLang}, extract the ${maxWords} most important vocabulary words for a ${LANG_NAMES[targetLang] ?? targetLang} speaker learning ${LANG_NAMES[sourceLang] ?? sourceLang}.

For each word, provide:
- word: the word in ${LANG_NAMES[sourceLang] ?? sourceLang}
- translation: translation in ${LANG_NAMES[targetLang] ?? targetLang}
- pronunciation: romanized pronunciation (romaji for Japanese, pinyin for Chinese, romanization for Korean, IPA-like for others)
- context: a short example sentence from or inspired by the source text containing this word

Return a JSON object: { "vocabulary": [ { "word": "...", "translation": "...", "pronunciation": "...", "context": "..." } ] }

Text:
"""
${text}
"""`;
}

function buildClozePrompt(text: string, sourceLang: string, targetLang: string, maxCloze: number): string {
  return `You are a language learning assistant. Given the following text in ${LANG_NAMES[sourceLang] ?? sourceLang}, create ${maxCloze} fill-in-the-blank exercises for a ${LANG_NAMES[targetLang] ?? targetLang} speaker.

Select sentences and blank out one key vocabulary word in each. Choose words that are useful for language learners.

IMPORTANT: The blank _____ must replace the ENTIRE word, not part of it. Never split a word and leave partial characters outside the blank.
- WRONG: "변함_____지." (answer: "없지") — "지" is left outside the blank
- CORRECT: "변함_____." (answer: "없지") — the full word "없지" is blanked
- WRONG: "하늘을 _____보면." (answer: "바라보면") — "보면" is left outside
- CORRECT: "하늘을 _____." (answer: "바라보면") — the full word is blanked

Provide:
- sentence_with_blank: the sentence with _____ replacing the COMPLETE blanked word (no leftover characters)
- answer: the blanked word (must be a complete word)
- full_sentence: the complete original sentence
- hint: a short hint in ${LANG_NAMES[targetLang] ?? targetLang} (translation or definition of the blanked word)

Return a JSON object: { "cloze": [ { "sentence_with_blank": "...", "answer": "...", "full_sentence": "...", "hint": "..." } ] }

Text:
"""
${text}
"""`;
}

function buildBothPrompt(text: string, sourceLang: string, targetLang: string, maxWords: number, maxCloze: number): string {
  return `You are a language learning assistant. Given the following text in ${LANG_NAMES[sourceLang] ?? sourceLang}, create learning materials for a ${LANG_NAMES[targetLang] ?? targetLang} speaker.

Task 1: Extract the ${maxWords} most important vocabulary words.
For each word provide:
- word: the word in ${LANG_NAMES[sourceLang] ?? sourceLang}
- translation: translation in ${LANG_NAMES[targetLang] ?? targetLang}
- pronunciation: romanized pronunciation
- context: a short example sentence from or inspired by the source text

Task 2: Create ${maxCloze} fill-in-the-blank exercises.
IMPORTANT: The blank _____ must replace the ENTIRE word, not part of it. Never split a word and leave partial characters outside the blank.
- WRONG: "변함_____지." → CORRECT: "변함_____."
- WRONG: "하늘을 _____보면." → CORRECT: "하늘을 _____."
For each exercise provide:
- sentence_with_blank: the sentence with _____ replacing the COMPLETE blanked word (no leftover characters)
- answer: the blanked word (must be a complete word)
- full_sentence: the complete original sentence
- hint: a short hint in ${LANG_NAMES[targetLang] ?? targetLang}

Return a JSON object: { "vocabulary": [...], "cloze": [...] }

Text:
"""
${text}
"""`;
}

/**
 * Attempt to repair truncated JSON from OpenAI (e.g. when finish_reason is "length").
 * Closes unclosed strings, arrays, and objects so JSON.parse can succeed.
 */
function repairJSON(raw: string): unknown | null {
  // First try parsing as-is
  try { return JSON.parse(raw); } catch { /* continue */ }

  let s = raw.trim();

  // If truncated mid-string, close the string
  // Count unescaped quotes — if odd, close the open string
  let inString = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\') { i++; continue; }
    if (s[i] === '"') inString = !inString;
  }
  if (inString) s += '"';

  // Remove trailing comma (invalid JSON)
  s = s.replace(/,\s*$/, '');

  // Close open brackets/braces
  const stack: string[] = [];
  inString = false;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '\\' && inString) { i++; continue; }
    if (s[i] === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (s[i] === '{') stack.push('}');
    else if (s[i] === '[') stack.push(']');
    else if (s[i] === '}' || s[i] === ']') stack.pop();
  }
  // Remove any trailing comma before we close
  s = s.replace(/,\s*$/, '');
  while (stack.length > 0) s += stack.pop();

  try { return JSON.parse(s); } catch { return null; }
}

async function callOpenAI(prompt: string): Promise<{ vocabulary: VocabItem[]; cloze: ClozeItem[] }> {
  // Retries (429/5xx/timeouts, exponential backoff + Retry-After) and error
  // classification live in lib/openai-client.ts.
  const { content, truncated: wasTruncated } = await jsonCompletion(prompt, {
    maxTokens: MAX_TOKENS,
    temperature: 0.3,
    timeoutMs: 55_000,
  });

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Response was likely truncated — try to repair
    const repaired = repairJSON(content);
    if (!repaired || typeof repaired !== 'object') {
      throw new AiError(
        'MALFORMED_JSON',
        wasTruncated
          ? 'AI response was too long and got cut off. Try reducing max words count.'
          : 'AI returned invalid JSON. Please try again.',
        502,
      );
    }
    parsed = repaired as Record<string, unknown>;
  }

  return {
    vocabulary: Array.isArray(parsed.vocabulary) ? parsed.vocabulary : [],
    cloze: Array.isArray(parsed.cloze) ? parsed.cloze : [],
  };
}

export async function POST(req: Request) {
  try {
    // Rate limiting (per-IP, first line of defense)
    const rateLimitRes = checkRateLimit(req, 'process-media', RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
    if (rateLimitRes) return rateLimitRes;

    // Authentication required — AI calls cost money
    const { user, supabase, response: authError } = await requireAuth();
    if (authError) {
      return NextResponse.json(
        { error: 'Sign in required to use AI features', code: 'AUTH_REQUIRED', vocabulary: [], cloze: [] },
        { status: 401 },
      );
    }

    // Get user plan limits (Free: 3/day, Pro: 50/day)
    const { limit, plan } = await getAiLimit(supabase, user);

    // Reserve a quota slot BEFORE calling OpenAI (prevents race conditions)
    const { reservationId, used } = await reserveAiUsage(supabase, user.id, 'process-media');

    // Check if reservation exceeded the limit
    if (used > limit) {
      // Rollback the reservation
      if (reservationId) await rollbackAiUsage(supabase, reservationId);
      return NextResponse.json(
        {
          error: plan === 'free'
            ? `Free plan: ${limit} AI requests per day. Upgrade to Pro for ${AI_DAILY_LIMIT_PRO} daily requests.`
            : `Daily AI limit reached (${limit}). Resets at midnight UTC.`,
          code: 'QUOTA_EXCEEDED',
          used: used - 1, // subtract the rolled-back reservation
          limit,
          plan,
          vocabulary: [],
          cloze: [],
        },
        { status: 429 },
      );
    }

    const body = (await req.json()) as ProcessMediaBody;
    const { text, sourceLang, targetLang, mode = 'both', maxWords = 30 } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      if (reservationId) await rollbackAiUsage(supabase, reservationId);
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }
    if (!sourceLang || !targetLang) {
      if (reservationId) await rollbackAiUsage(supabase, reservationId);
      return NextResponse.json({ error: 'sourceLang and targetLang are required' }, { status: 400 });
    }

    // Truncate to limit token usage
    const truncated = text.slice(0, MAX_INPUT_CHARS);
    const clampedMax = Math.min(Math.max(maxWords, 5), 50);
    const maxCloze = Math.min(Math.ceil(clampedMax / 2), 20);

    let prompt: string;
    if (mode === 'vocabulary') {
      prompt = buildVocabularyPrompt(truncated, sourceLang, targetLang, clampedMax);
    } else if (mode === 'cloze') {
      prompt = buildClozePrompt(truncated, sourceLang, targetLang, maxCloze);
    } else {
      prompt = buildBothPrompt(truncated, sourceLang, targetLang, clampedMax, maxCloze);
    }

    let result;
    try {
      result = await callOpenAI(prompt);
    } catch (err) {
      // Rollback reservation on OpenAI failure (don't count failed attempts)
      if (reservationId) await rollbackAiUsage(supabase, reservationId);
      throw err;
    }

    return NextResponse.json({
      vocabulary: mode === 'cloze' ? [] : result.vocabulary,
      cloze: mode === 'vocabulary' ? [] : result.cloze,
      quota: { used, limit },
    });
  } catch (err) {
    // Return a stable error code + empty arrays so the UI can fall back gracefully
    if (err instanceof AiError) {
      const { body, init } = aiErrorResponse(err, { vocabulary: [], cloze: [] });
      return NextResponse.json(body, init);
    }
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message, code: 'UNKNOWN', vocabulary: [], cloze: [] }, { status: 500 });
  }
}
