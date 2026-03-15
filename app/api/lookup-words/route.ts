import { NextResponse } from 'next/server';
import { romanize } from '@/lib/romanize';
import type { ScriptLang } from '@/lib/lang-detect';
import { checkRateLimit } from '@/lib/api-middleware';
import { LANG_CODES_BCP47 } from '@/lib/constants';

export const runtime = 'nodejs';

const MAX_WORDS = 50;
const BATCH_CONCURRENCY = 5;
const DELAY_MS = 200;

// Simple LRU translation cache (module-level, survives across requests)
const MAX_CACHE = 2000;
const translationCache = new Map<string, { meaning: string }>();
function getCached(key: string) { return translationCache.get(key); }
function setCache(key: string, value: { meaning: string }) {
  if (translationCache.size >= MAX_CACHE) {
    // Delete oldest entry (first key)
    const first = translationCache.keys().next().value;
    if (first !== undefined) translationCache.delete(first);
  }
  translationCache.set(key, value);
}
// Rate limit: 20 requests per minute per IP
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW = 60_000;

interface LookupResult {
  word: string;
  meaning: string;
  pronunciation: string;
}

// LANG_CODES_BCP47 imported from @/lib/constants

export async function POST(req: Request) {
  try {
    // Rate limiting
    const rateLimitRes = checkRateLimit(req, 'lookup-words', RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
    if (rateLimitRes) return rateLimitRes;

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

    const src = LANG_CODES_BCP47[sourceLang] ?? sourceLang;
    const tgt = LANG_CODES_BCP47[targetLang] ?? targetLang;
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
  const cacheKey = `${word}:${src}:${tgt}`;
  const cached = getCached(cacheKey);
  if (cached) return { word, meaning: cached.meaning, pronunciation };

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

    setCache(cacheKey, { meaning: translation });
    return { word, meaning: translation, pronunciation };
  } catch {
    return { word, meaning: '', pronunciation };
  }
}
