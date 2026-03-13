import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 60; // seconds (Vercel Pro)

// Rate limit: 5 requests per minute per IP (LLM calls cost money)
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60_000;
const MAX_INPUT_CHARS = 4000;
const MAX_TOKENS = 2000;

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

Select sentences and blank out one key vocabulary word in each. Choose words that are useful for language learners. Provide:
- sentence_with_blank: the sentence with _____ replacing the blanked word
- answer: the blanked word
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
For each exercise provide:
- sentence_with_blank: the sentence with _____ replacing one key word
- answer: the blanked word
- full_sentence: the complete original sentence
- hint: a short hint in ${LANG_NAMES[targetLang] ?? targetLang}

Return a JSON object: { "vocabulary": [...], "cloze": [...] }

Text:
"""
${text}
"""`;
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
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from OpenAI');

  const parsed = JSON.parse(content);

  return {
    vocabulary: Array.isArray(parsed.vocabulary) ? parsed.vocabulary : [],
    cloze: Array.isArray(parsed.cloze) ? parsed.cloze : [],
  };
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const { limited, resetMs } = rateLimit(`process-media:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
    if (limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(resetMs / 1000)) } },
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

    return NextResponse.json({
      vocabulary: mode === 'cloze' ? [] : result.vocabulary,
      cloze: mode === 'vocabulary' ? [] : result.cloze,
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
