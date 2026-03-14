import { NextResponse } from 'next/server';
import { checkRateLimit, requireAuth } from '@/lib/api-middleware';
import { checkAiQuota, recordAiUsage } from '@/lib/ai-usage';

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

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  ko: 'Korean',
  ja: 'Japanese',
  zh: 'Chinese',
  es: 'Spanish',
  fr: 'French',
};

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
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      max_tokens: MAX_TOKENS,
      temperature: 0.3,
    }),
    signal: AbortSignal.timeout(55_000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => 'unknown error');
    throw new Error(`OpenAI API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const choice = data?.choices?.[0];
  const content = choice?.message?.content;
  if (!content) throw new Error('Empty response from OpenAI');

  const wasTruncated = choice.finish_reason === 'length';

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(content);
  } catch {
    // Response was likely truncated — try to repair
    const repaired = repairJSON(content);
    if (!repaired || typeof repaired !== 'object') {
      throw new Error(
        wasTruncated
          ? 'AI response was too long and got cut off. Try reducing max words count.'
          : 'AI returned invalid JSON. Please try again.',
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

    // Daily quota check (Free: 3/day, Pro: 50/day)
    const quota = await checkAiQuota(supabase, user);
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: quota.plan === 'free'
            ? `Free plan: ${quota.limit} AI requests per day. Upgrade to Pro for ${quota.limit * 16}+ daily requests.`
            : `Daily AI limit reached (${quota.limit}). Resets at midnight UTC.`,
          code: 'QUOTA_EXCEEDED',
          used: quota.used,
          limit: quota.limit,
          plan: quota.plan,
          vocabulary: [],
          cloze: [],
        },
        { status: 429 },
      );
    }

    const body = (await req.json()) as ProcessMediaBody;
    const { text, sourceLang, targetLang, mode = 'both', maxWords = 30 } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }
    if (!sourceLang || !targetLang) {
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

    const result = await callOpenAI(prompt);

    // Record successful usage AFTER the call succeeds (don't count failed attempts)
    await recordAiUsage(supabase, user.id, 'process-media');

    return NextResponse.json({
      vocabulary: mode === 'cloze' ? [] : result.vocabulary,
      cloze: mode === 'vocabulary' ? [] : result.cloze,
      quota: { used: quota.used + 1, limit: quota.limit },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';

    // Return partial success with error info so UI can fallback
    if (message.includes('OPENAI_API_KEY')) {
      return NextResponse.json({ error: 'AI processing is not configured', vocabulary: [], cloze: [] }, { status: 503 });
    }

    return NextResponse.json({ error: message, vocabulary: [], cloze: [] }, { status: 500 });
  }
}
