export type ScriptLang = 'ko' | 'ja' | 'zh' | 'en';

/** Shared Unicode range regexes for script detection (also used by wpm.ts) */
export const CJK_RANGE = /[\u4E00-\u9FFF\u3400-\u4DBF\u3040-\u309F\u30A0-\u30FF]/g;
export const HANGUL_RANGE = /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/g;
export const LATIN_RANGE = /[A-Za-z\u00C0-\u024F\u0400-\u04FF]/g;

/** Check if a Latin-script string looks like Chinese pinyin (vs Japanese romaji).
 *  Pinyin indicators: tone marks (āáǎà, ēéěè, ...) or tone numbers (ma1, shi4),
 *  and common pinyin-only consonant clusters (zh, ch, sh, x before i/u). */
function isPinyin(s: string): boolean {
  if (!s) return false;
  // Tone mark vowels (unique to pinyin romanization)
  if (/[\u0101\u00e1\u01ce\u00e0\u0113\u00e9\u011b\u00e8\u012b\u00ed\u01d0\u00ec\u014d\u00f3\u01d2\u00f2\u016b\u00fa\u01d4\u00f9\u01d6\u01d8\u01da\u01dc]/.test(s)) return true;
  // Tone numbers at the end of syllables (e.g. "ma1", "shi4")
  if (/[a-zA-Z][1-4]/.test(s)) return true;
  // Common pinyin-only initials before vowels (zh, ch, sh, x before i/u)
  if (/(?:^|\s)(?:zh|ch|sh)[aeiou]/i.test(s)) return true;
  if (/(?:^|\s)x[iu]/i.test(s)) return true;
  return false;
}

/** Detect the dominant script/language of a text string.
 *  hint: optional auxiliary text (e.g. pronunciation) used to resolve ambiguity
 *  between Japanese kanji and Chinese hanzi. */
export function detectLang(text: string, hint?: string): ScriptLang {
  if (!text) return 'en';
  const clean = text.replace(/\s/g, '');
  const total = clean.length || 1;
  const hangul = (clean.match(/[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/g) ?? []).length;
  const hirakata = (clean.match(/[\u3040-\u30FF]/g) ?? []).length;
  const hanzi = (clean.match(/[\u4E00-\u9FFF]/g) ?? []).length;
  if (hangul / total > 0.2) return 'ko';
  // Any hiragana/katakana → definitely Japanese
  if (hirakata > 0) return 'ja';
  // If the text contains CJK ideographs, check the hint to disambiguate
  if (hanzi > 0 && hint) {
    const hintKana = (hint.match(/[\u3040-\u30FF]/g) ?? []).length;
    if (hintKana > 0) return 'ja';
    // If hint is Latin script, check if it's pinyin (→ Chinese) or romaji (→ Japanese)
    const hintLatin = hint.replace(/[\s\d.,;:!?'"()\-/]/g, '');
    if (hintLatin.length > 0 && /^[a-zA-Z\u0100-\u01DC]+$/.test(hintLatin)) {
      return isPinyin(hint) ? 'zh' : 'ja';
    }
  }
  if (hanzi / total > 0.3) return 'zh';
  return 'en';
}

/** Map script language to Web Speech API BCP-47 language tag */
export function langToTTSCode(lang: ScriptLang): string {
  const map: Record<ScriptLang, string> = {
    ko: 'ko-KR',
    ja: 'ja-JP',
    zh: 'zh-CN',
    en: 'en-US',
  };
  return map[lang];
}
