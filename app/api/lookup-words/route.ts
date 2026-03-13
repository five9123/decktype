import { NextResponse } from 'next/server';
import { romanize } from '@/lib/romanize';
import type { ScriptLang } from '@/lib/lang-detect';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const MAX_WORDS = 50;
const BATCH_CONCURRENCY = 5;
const DELAY_MS = 200;
// Rate limit: 20 requests per minute per IP
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW = 60_000;

interface LookupResult {
  word: string;
  meaning: string;
  pronunciation: string;
}

/**
 * Language code mapping for MyMemory API (BCP-47 style).
 */
const LANG_CODES: Record<string, string> = {
  ko: 'ko',
  ja: 'ja',
  zh: 'zh-CN',
  en: 'en',
  es: 'es',
  fr: 'fr',
};

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const { limited, resetMs } = rateLimit(`lookup-words:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
    if (limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(resetMs / 1000)) } },
      );
    }

    const body = await req.json();
    const { words, sourceLang, targetLang } = body as {
      words?: string[];
      sourceLang?: string;
      targetLang?: string;
    };

    if (!words || !Array.isArray(words) || words.length === 0) {
      return NextResponse.json({ error: 'words array is required' }, { status: 400 });
    }
    if (!sourceLang || !targetLang) {
      return NextResponse.json({ error: 'sourceLang and targetLang are required' }, { status: 400 });
    }

    const src = LANG_CODES[sourceLang] ?? sourceLang;
    const tgt = LANG_CODES[targetLang] ?? targetLang;
    const validScriptLangs: ScriptLang[] = ['ko', 'ja', 'zh', 'en'];
    const scriptLang: ScriptLang = validScriptLangs.includes(sourceLang as ScriptLang)
      ? (sourceLang as ScriptLang)
      : 'en';
    const batch = words.slice(0, MAX_WORDS);

    // Process in parallel with limited concurrency
    const results: LookupResult[] = [];
    for (let i = 0; i < batch.length; i += BATCH_CONCURRENCY) {
      const chunk = batch.slice(i, i + BATCH_CONCURRENCY);
      const chunkResults = await Promise.all(
        chunk.map(word => lookupWord(word, src, tgt, scriptLang))
      );
      results.push(...chunkResults);

      // Rate limit between batches
      if (i + BATCH_CONCURRENCY < batch.length) {
        await new Promise(r => setTimeout(r, DELAY_MS));
      }
    }

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function lookupWord(
  word: string,
  src: string,
  tgt: string,
  scriptLang: ScriptLang,
): Promise<LookupResult> {
  const pronunciation = romanize(word, scriptLang);

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${src}|${tgt}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

    if (!res.ok) {
      return { word, meaning: '', pronunciation };
    }

    const data = await res.json();
    const translation = data?.responseData?.translatedText;

    // Validate: skip if translation is same as input (no real translation)
    if (!translation || translation.toLowerCase() === word.toLowerCase()) {
      return { word, meaning: '', pronunciation };
    }

    // Skip MyMemory error messages
    if (typeof translation === 'string' && translation.startsWith('MYMEMORY WARNING')) {
      return { word, meaning: '', pronunciation };
    }

    return { word, meaning: translation, pronunciation };
  } catch {
    return { word, meaning: '', pronunciation };
  }
}
