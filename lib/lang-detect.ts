export type ScriptLang = 'ko' | 'ja' | 'zh' | 'en';

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
  // If the text is pure CJK, check the hint (e.g. pronunciation field) for kana
  if (hanzi > 0 && hint) {
    const hintKana = (hint.match(/[\u3040-\u30FF]/g) ?? []).length;
    if (hintKana > 0) return 'ja';
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
