import { CJK_RANGE, HANGUL_RANGE, LATIN_RANGE } from '@/lib/lang-detect';

type Script = 'cjk' | 'hangul' | 'latin';

function detectScripts(text: string): Set<Script> {
  const scripts = new Set<Script>();
  if (CJK_RANGE.test(text)) scripts.add('cjk');
  // Reset lastIndex after test()
  CJK_RANGE.lastIndex = 0;
  if (HANGUL_RANGE.test(text)) scripts.add('hangul');
  HANGUL_RANGE.lastIndex = 0;
  if (LATIN_RANGE.test(text)) scripts.add('latin');
  LATIN_RANGE.lastIndex = 0;
  return scripts;
}

/**
 * Multi-language WPM calculation.
 * - CJK (Japanese/Chinese): 1 character = 1 word unit
 * - Hangul (Korean): 1 syllable block = 1 word unit
 * - Latin/Cyrillic: standard 5 chars = 1 word
 */
export function calculateMultiLangWpm(text: string, elapsedMs: number): number {
  if (elapsedMs <= 0 || text.length === 0) return 0;

  const scripts = detectScripts(text);
  let wordUnits = 0;

  if (scripts.has('cjk')) {
    const matches = text.match(CJK_RANGE);
    CJK_RANGE.lastIndex = 0;
    wordUnits += matches?.length ?? 0;
  }

  if (scripts.has('hangul')) {
    const matches = text.match(HANGUL_RANGE);
    HANGUL_RANGE.lastIndex = 0;
    wordUnits += matches?.length ?? 0;
  }

  if (scripts.has('latin')) {
    // Remove CJK and Hangul, count remaining Latin/Cyrillic chars
    const latinText = text
      .replace(CJK_RANGE, '')
      .replace(HANGUL_RANGE, '')
      .replace(/\s/g, '');
    CJK_RANGE.lastIndex = 0;
    HANGUL_RANGE.lastIndex = 0;
    wordUnits += Math.ceil(latinText.length / 5);
  }

  // If no known script detected, fall back to 5-char word counting
  if (wordUnits === 0) {
    wordUnits = Math.ceil(text.replace(/\s/g, '').length / 5);
  }

  return (wordUnits / elapsedMs) * 60000;
}
