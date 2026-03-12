import { type ScriptLang, detectLang } from './lang-detect';
import { getStopwords } from './stopwords';

export interface ExtractedWord {
  word: string;
  frequency: number;
}

const MAX_WORDS = 200;

/**
 * Extract unique words from raw text, sorted by frequency.
 * Language-aware tokenization with stopword filtering.
 */
export function extractWords(text: string, lang?: ScriptLang): { words: ExtractedWord[]; lang: ScriptLang } {
  const detectedLang = lang ?? detectLang(text);
  const tokens = tokenize(text, detectedLang);
  const stopwords = getStopwords(detectedLang);

  // Count frequencies, filtering stopwords
  const freq = new Map<string, number>();
  for (const token of tokens) {
    if (stopwords.has(token)) continue;
    if (stopwords.has(token.toLowerCase())) continue;
    freq.set(token, (freq.get(token) ?? 0) + 1);
  }

  // Sort by frequency desc, then alphabetical
  const words: ExtractedWord[] = [...freq.entries()]
    .map(([word, frequency]) => ({ word, frequency }))
    .sort((a, b) => b.frequency - a.frequency || a.word.localeCompare(b.word))
    .slice(0, MAX_WORDS);

  return { words, lang: detectedLang };
}

/**
 * Tokenize text into words based on detected language.
 */
function tokenize(text: string, lang: ScriptLang): string[] {
  switch (lang) {
    case 'ko': return tokenizeKorean(text);
    case 'ja': return tokenizeJapanese(text);
    case 'zh': return tokenizeChinese(text);
    default: return tokenizeWestern(text);
  }
}

/**
 * Western languages: split by whitespace, strip punctuation.
 */
function tokenizeWestern(text: string): string[] {
  return text
    .split(/\s+/)
    .map(w => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, '')) // strip surrounding punct
    .map(w => w.toLowerCase())
    .filter(w => w.length >= 2 && w.length <= 30)
    .filter(w => /\p{L}/u.test(w)); // must contain at least one letter
}

/**
 * Korean: split by whitespace, strip particles/suffixes with regex.
 */
function tokenizeKorean(text: string): string[] {
  // Korean particle/suffix patterns (rough stripping)
  const particlePattern = /(?:은|는|이|가|을|를|의|에|에서|으로|로|와|과|도|만|까지|부터|라|며|고|지만|에게|한테|께|보다|처럼|같이)$/;

  return text
    .split(/\s+/)
    .map(w => w.replace(/^[^\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+|[^\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]+$/g, ''))
    .filter(w => w.length >= 1 && w.length <= 30)
    .map(w => {
      // Try stripping one particle
      const stripped = w.replace(particlePattern, '');
      return stripped.length >= 1 ? stripped : w;
    })
    .filter(w => /[\uAC00-\uD7A3]/u.test(w)); // must contain Hangul syllable
}

/**
 * Japanese: extract runs of kanji(+optional hiragana suffix) or katakana.
 * Without a morphological analyzer, this is a best-effort approach.
 */
function tokenizeJapanese(text: string): string[] {
  const results: string[] = [];

  // Pattern: kanji chunk optionally followed by short hiragana (okurigana)
  const kanjiPattern = /[\u4E00-\u9FFF\u3400-\u4DBF][\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u309F]{0,4}/g;
  const katakanaPattern = /[\u30A0-\u30FF]{2,}/g;

  let m: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((m = kanjiPattern.exec(text)) !== null) {
    if (m[0].length >= 1 && m[0].length <= 20) results.push(m[0]);
  }

  // eslint-disable-next-line no-cond-assign
  while ((m = katakanaPattern.exec(text)) !== null) {
    if (m[0].length >= 2 && m[0].length <= 20) results.push(m[0]);
  }

  return results;
}

/**
 * Chinese: extract runs of CJK ideographs (2-4 chars preferred, single chars as fallback).
 */
function tokenizeChinese(text: string): string[] {
  const results: string[] = [];

  // Extract 2-4 character Chinese words
  const multiPattern = /[\u4E00-\u9FFF]{2,4}/g;
  let m: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((m = multiPattern.exec(text)) !== null) {
    results.push(m[0]);
  }

  // If very few multi-char results, also extract single chars
  if (results.length < 20) {
    const singlePattern = /[\u4E00-\u9FFF]/g;
    // eslint-disable-next-line no-cond-assign
    while ((m = singlePattern.exec(text)) !== null) {
      results.push(m[0]);
    }
  }

  return results;
}
