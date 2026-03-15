'use client';
import { useEffect, useState } from 'react';
import { detectLang, type ScriptLang } from '@/lib/lang-detect';

type KeyboardLang = ScriptLang | 'fr' | 'es' | 'de' | 'it' | 'pt';
const EU_LANGS = new Set(['fr', 'es', 'de', 'it', 'pt']);

// ── Korean Dubeolsik (두벌식) mapping ───────────────────────────────────────

const KO_NORMAL: Record<string, string> = {
  KeyQ: 'ㅂ', KeyW: 'ㅈ', KeyE: 'ㄷ', KeyR: 'ㄱ', KeyT: 'ㅅ',
  KeyY: 'ㅛ', KeyU: 'ㅕ', KeyI: 'ㅑ', KeyO: 'ㅐ', KeyP: 'ㅔ',
  KeyA: 'ㅁ', KeyS: 'ㄴ', KeyD: 'ㅇ', KeyF: 'ㄹ', KeyG: 'ㅎ',
  KeyH: 'ㅗ', KeyJ: 'ㅓ', KeyK: 'ㅏ', KeyL: 'ㅣ',
  KeyZ: 'ㅋ', KeyX: 'ㅌ', KeyC: 'ㅊ', KeyV: 'ㅍ',
  KeyB: 'ㅠ', KeyN: 'ㅜ', KeyM: 'ㅡ',
};

const KO_SHIFT: Record<string, string> = {
  KeyQ: 'ㅃ', KeyW: 'ㅉ', KeyE: 'ㄸ', KeyR: 'ㄲ', KeyT: 'ㅆ',
  KeyO: 'ㅒ', KeyP: 'ㅖ',
};

// Reverse lookup: jamo → { code, shift }
const JAMO_KEY_MAP: Record<string, { code: string; shift: boolean }> = {};
for (const [code, jamo] of Object.entries(KO_NORMAL)) {
  JAMO_KEY_MAP[jamo] = { code, shift: false };
}
for (const [code, jamo] of Object.entries(KO_SHIFT)) {
  JAMO_KEY_MAP[jamo] = { code, shift: true };
}

// ── Hangul decomposition ─────────────────────────────────────────────────────

const CHOSEONG  = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('');
const JUNGSEONG = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split('');
const JONGSEONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

// Compound jamo → component jamo (for multi-keystroke combos)
const COMPOUND_JAMO: Record<string, string[]> = {
  // compound jongseong (받침)
  'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
  'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
  'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'],
  'ㅀ': ['ㄹ','ㅎ'], 'ㅄ': ['ㅂ','ㅅ'],
  // compound jungseong (이중모음)
  'ㅘ': ['ㅗ','ㅏ'], 'ㅙ': ['ㅗ','ㅐ'], 'ㅚ': ['ㅗ','ㅣ'],
  'ㅝ': ['ㅜ','ㅓ'], 'ㅞ': ['ㅜ','ㅔ'], 'ㅟ': ['ㅜ','ㅣ'],
  'ㅢ': ['ㅡ','ㅣ'],
};

function expandJamo(jamo: string): string[] {
  return COMPOUND_JAMO[jamo] ?? [jamo];
}

// ── Japanese Romaji mapping (for keyboard hints) ─────────────────────────────

const KANA_ROMAJI: Record<string, string> = {
  // Digraphs (checked before singles)
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja',  'じゅ': 'ju',  'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
  'でゃ': 'dha', 'でゅ': 'dhu', 'でょ': 'dho',
  'てゃ': 'tha', 'てゅ': 'thu', 'てょ': 'tho',
  // Basic kana
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo',
  // Voiced
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'di', 'づ': 'du', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  // Small kana
  'ぁ': 'xa', 'ぃ': 'xi', 'ぅ': 'xu', 'ぇ': 'xe', 'ぉ': 'xo',
  'ゃ': 'xya', 'ゅ': 'xyu', 'ょ': 'xyo',
  // Long vowel mark
  'ー': '-',
};

interface RomajiSegment {
  kana: string;   // original kana character(s) (e.g., 'さ', 'きゃ')
  romaji: string; // romaji key sequence to type (e.g., 'sa', 'kya')
}

/** Convert Japanese text to romaji segments for keyboard hints.
 *  Uses pronunciation (furigana) for kanji targets. */
function buildRomajiSegments(text: string, pronunciation?: string): RomajiSegment[] {
  const hasKanji = /[\u4E00-\u9FFF]/.test(text);
  const source = hasKanji && pronunciation ? pronunciation : text;

  // Convert katakana to hiragana
  const hiragana = source
    .replace(/[\u30A1-\u30F6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .replace(/\u30FC/g, 'ー')
    .replace(/ /g, '')
    .normalize('NFC');

  const segments: RomajiSegment[] = [];
  let i = 0;

  while (i < hiragana.length) {
    const ch = hiragana[i];

    // Small tsu (っ) — double the next consonant
    if (ch === 'っ') {
      let doubled = '';
      if (i + 1 < hiragana.length) {
        let nextRomaji = '';
        if (i + 2 < hiragana.length) {
          const pair = hiragana[i + 1] + hiragana[i + 2];
          if (KANA_ROMAJI[pair]) nextRomaji = KANA_ROMAJI[pair];
        }
        if (!nextRomaji) nextRomaji = KANA_ROMAJI[hiragana[i + 1]] ?? '';
        doubled = nextRomaji[0] ?? '';
      }
      segments.push({ kana: 'っ', romaji: doubled });
      i++;
      continue;
    }

    // ん — context-dependent: 'nn' before vowels/y/n, 'n' before other consonants
    if (ch === 'ん') {
      let romaji = 'nn'; // default (end of string or before vowel/y/n)
      if (i + 1 < hiragana.length) {
        let nextRomaji = '';
        const nextCh = hiragana[i + 1];
        if (i + 2 < hiragana.length) {
          const pair = nextCh + hiragana[i + 2];
          if (KANA_ROMAJI[pair]) nextRomaji = KANA_ROMAJI[pair];
        }
        if (!nextRomaji) nextRomaji = KANA_ROMAJI[nextCh] ?? nextCh;
        const first = nextRomaji[0]?.toLowerCase() ?? '';
        // Before consonant (not n, y, or vowel) → single 'n' auto-confirms
        if (first && !'aiueony'.includes(first)) {
          romaji = 'n';
        }
      }
      segments.push({ kana: 'ん', romaji });
      i++;
      continue;
    }

    // Try digraph (2 chars)
    if (i + 1 < hiragana.length) {
      const pair = ch + hiragana[i + 1];
      const romaji = KANA_ROMAJI[pair];
      if (romaji) {
        segments.push({ kana: pair, romaji });
        i += 2;
        continue;
      }
    }

    // Single kana
    const romaji = KANA_ROMAJI[ch];
    if (romaji) {
      segments.push({ kana: ch, romaji });
      i++;
      continue;
    }

    // Non-kana (punctuation, kanji without pronunciation, etc.) — pass through
    segments.push({ kana: ch, romaji: ch });
    i++;
  }

  return segments;
}

// ── English shift-character mapping ──────────────────────────────────────────

const SHIFT_CHAR_MAP: Record<string, string> = {
  '!': 'Digit1', '@': 'Digit2', '#': 'Digit3', '$': 'Digit4',
  '%': 'Digit5', '^': 'Digit6', '&': 'Digit7', '*': 'Digit8',
  '(': 'Digit9', ')': 'Digit0', '_': 'Minus',  '+': 'Equal',
  '{': 'BracketLeft', '}': 'BracketRight', '|': 'Backslash',
  ':': 'Semicolon', '"': 'Quote', '<': 'Comma', '>': 'Period',
  '?': 'Slash', '~': 'Backquote',
};

// ── European keyboard layouts ────────────────────────────────────────────────
// Maps keyCode → character for each layout.  Key codes reflect physical position.

interface KeyboardLayout {
  normal: Record<string, string>;
  shift?: Record<string, string>;
}

const EU_LAYOUTS: Record<string, KeyboardLayout> = {
  // ── French AZERTY ──────────────────────────────────────────────────────────
  fr: {
    normal: {
      // Number row (unshifted = symbols on AZERTY)
      Digit1: '&', Digit2: 'é', Digit3: '"', Digit4: "'", Digit5: '(',
      Digit6: '-', Digit7: 'è', Digit8: '_', Digit9: 'ç', Digit0: 'à',
      // Letter rows (AZERTY layout on QWERTY physical keys)
      KeyQ: 'a', KeyW: 'z', KeyE: 'e', KeyR: 'r', KeyT: 't',
      KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
      KeyA: 'q', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g',
      KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l', Semicolon: 'm',
      KeyZ: 'w', KeyX: 'x', KeyC: 'c', KeyV: 'v',
      KeyB: 'b', KeyN: 'n', KeyM: ',',
      Comma: ';', Period: ':', Slash: '!',
    },
    shift: {
      Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5',
      Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
    },
  },

  // ── Spanish QWERTY ─────────────────────────────────────────────────────────
  es: {
    normal: {
      Semicolon: 'ñ', Quote: "'", BracketLeft: '`', BracketRight: '+',
      Minus: "'", Equal: '¡', Backquote: 'º',
      Slash: '-',
      // Letters identical to English QWERTY — only override changed keys
      KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't',
      KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
      KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g',
      KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
      KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v',
      KeyB: 'b', KeyN: 'n', KeyM: 'm',
    },
    shift: {
      Semicolon: 'Ñ', BracketLeft: '^', BracketRight: '*',
      Minus: '?', Equal: '¿', Backquote: 'ª',
      Digit1: '!', Digit2: '"', Digit3: '·', Digit4: '$', Digit5: '%',
      Digit6: '&', Digit7: '/', Digit8: '(', Digit9: ')', Digit0: '=',
    },
  },

  // ── German QWERTZ ──────────────────────────────────────────────────────────
  de: {
    normal: {
      KeyY: 'z', KeyZ: 'y', // Y↔Z swap
      Semicolon: 'ö', Quote: 'ä', BracketLeft: 'ü', Minus: 'ß',
      BracketRight: '+', Equal: '´', Backquote: '^',
      Slash: '-',
      // Unchanged letters
      KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't',
      KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
      KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g',
      KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
      KeyX: 'x', KeyC: 'c', KeyV: 'v',
      KeyB: 'b', KeyN: 'n', KeyM: 'm',
    },
    shift: {
      Semicolon: 'Ö', Quote: 'Ä', BracketLeft: 'Ü', Minus: '?',
      Digit1: '!', Digit2: '"', Digit3: '§', Digit4: '$', Digit5: '%',
      Digit6: '&', Digit7: '/', Digit8: '(', Digit9: ')', Digit0: '=',
    },
  },

  // ── Italian QWERTY ─────────────────────────────────────────────────────────
  it: {
    normal: {
      Semicolon: 'ò', Quote: 'à', BracketLeft: 'è', BracketRight: '+',
      Minus: "'", Equal: 'ì', Backquote: '\\',
      Backslash: 'ù', Slash: '-',
      KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't',
      KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
      KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g',
      KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
      KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v',
      KeyB: 'b', KeyN: 'n', KeyM: 'm',
    },
    shift: {
      Semicolon: 'ç', Quote: '°', BracketLeft: 'é', BracketRight: '*',
      Minus: '?', Equal: '^',
      Digit1: '!', Digit2: '"', Digit3: '£', Digit4: '$', Digit5: '%',
      Digit6: '&', Digit7: '/', Digit8: '(', Digit9: ')', Digit0: '=',
    },
  },

  // ── Portuguese QWERTY ──────────────────────────────────────────────────────
  pt: {
    normal: {
      Semicolon: 'ç', Quote: 'º', BracketLeft: '+', BracketRight: '´',
      Minus: "'", Equal: '«', Backquote: '\\',
      Backslash: '~', Slash: '-',
      KeyQ: 'q', KeyW: 'w', KeyE: 'e', KeyR: 'r', KeyT: 't',
      KeyY: 'y', KeyU: 'u', KeyI: 'i', KeyO: 'o', KeyP: 'p',
      KeyA: 'a', KeyS: 's', KeyD: 'd', KeyF: 'f', KeyG: 'g',
      KeyH: 'h', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
      KeyZ: 'z', KeyX: 'x', KeyC: 'c', KeyV: 'v',
      KeyB: 'b', KeyN: 'n', KeyM: 'm',
    },
    shift: {
      Semicolon: 'Ç', Quote: 'ª', BracketLeft: '*', BracketRight: '`',
      Minus: '?', Equal: '»',
      Digit1: '!', Digit2: '"', Digit3: '#', Digit4: '$', Digit5: '%',
      Digit6: '&', Digit7: '/', Digit8: '(', Digit9: ')', Digit0: '=',
    },
  },
};

// Pre-built reverse lookups: character → { code, shift } for each EU layout
const EU_CHAR_MAP: Record<string, Record<string, { code: string; shift: boolean }>> = {};
for (const [lang, layout] of Object.entries(EU_LAYOUTS)) {
  const map: Record<string, { code: string; shift: boolean }> = {};
  for (const [code, ch] of Object.entries(layout.normal)) {
    map[ch] = { code, shift: false };
    // Uppercase variant → same code + shift
    const upper = ch.toUpperCase();
    if (upper !== ch && upper.length === 1) map[upper] = { code, shift: true };
  }
  if (layout.shift) {
    for (const [code, ch] of Object.entries(layout.shift)) {
      map[ch] = { code, shift: true };
    }
  }
  EU_CHAR_MAP[lang] = map;
}

/** Decompose a composed Hangul syllable into keystroke jamo sequence */
function decomposeHangul(ch: string): string[] {
  const code = ch.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) {
    // Standalone jamo (e.g. ㄱ, ㅏ) — return as-is
    return [ch];
  }
  const offset = code - 0xAC00;
  const jongIdx = offset % 28;
  const jungIdx = Math.floor(offset / 28) % 21;
  const choIdx  = Math.floor(offset / (28 * 21));
  return [
    ...expandJamo(CHOSEONG[choIdx]),
    ...expandJamo(JUNGSEONG[jungIdx]),
    ...(jongIdx > 0 ? expandJamo(JONGSEONG[jongIdx]) : []),
  ];
}

/** Return ordered { code, shift } pairs for every keystroke needed to type `ch` */
function getHintKeys(ch: string, lang: KeyboardLang): { code: string; shift: boolean }[] {
  if (!ch || ch === ' ') return ch === ' ' ? [{ code: 'Space', shift: false }] : [];

  if (lang === 'ko') {
    const jamo = decomposeHangul(ch);
    return jamo.flatMap((j) => {
      const key = JAMO_KEY_MAP[j];
      return key ? [key] : [];
    });
  }

  // EU layout reverse lookup (fr, es, de, it, pt)
  const euMap = EU_CHAR_MAP[lang];
  if (euMap) {
    const hit = euMap[ch];
    if (hit) return [hit];
    // Fallback: try matching by ROWS label (for keys not in layout override)
  }

  // Shift + special character for English (!, @, #, etc.)
  if (!euMap) {
    const shiftCode = SHIFT_CHAR_MAP[ch];
    if (shiftCode) return [{ code: shiftCode, shift: true }];
  }

  // English / Latin — match by lowercase label in ROWS
  const lower = ch.toLowerCase();
  const isUpper = ch !== lower && /[A-Z]/.test(ch);
  for (const row of ROWS) {
    for (const def of row) {
      if (def.label.toLowerCase() === lower) {
        return [{ code: def.code, shift: isUpper }];
      }
    }
  }
  return [];
}

/**
 * Compute hint keys taking partial IME composition into account.
 * For Korean: finds the current target grapheme being composed and returns
 * only the remaining keystrokes (already-typed jamo are sliced off).
 * For Japanese: converts target to romaji key sequence, tracks position via
 * matched kana + trailing romaji in composition.
 */
function computeHintKeys(
  target: string, input: string, lang: KeyboardLang, pronunciation?: string,
): { code: string; shift: boolean }[] {
  // Japanese: romaji-based keyboard hints
  if (lang === 'ja') {
    const segments = buildRomajiSegments(target, pronunciation);
    const fullRomaji = segments.map((s) => s.romaji).join('');

    // Split input into confirmed kana and trailing romaji (mid-IME composition)
    const inputClean = input.replace(/ /g, '').normalize('NFC');
    // Trailing ASCII or full-width Latin = romaji still being composed
    const trailMatch = inputClean.match(/([a-zA-Z\uFF41-\uFF5A\uFF21-\uFF3A]+)$/);
    const confirmedKana = trailMatch
      ? inputClean.slice(0, -trailMatch[0].length)
      : inputClean;
    const trailingRomaji = trailMatch
      ? trailMatch[0]
          .replace(/[\uFF41-\uFF5A]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
          .replace(/[\uFF21-\uFF3A]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xFEE0))
          .toLowerCase()
      : '';

    // Convert confirmed kana to hiragana for matching
    const confirmedHira = confirmedKana
      .replace(/[\u30A1-\u30F6]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
      .normalize('NFC');

    // Match confirmed kana against target segments
    let matchedRomajiLen = 0;
    let kanaPos = 0;

    // Detect "romaji pronunciation mode": pronunciation was given as ASCII romaji,
    // so buildRomajiSegments created letter-by-letter ASCII segments (seg.kana = 'k', 'a', etc.).
    // In this mode, if the user is typing via IME, confirmedHira may contain actual kana
    // ('か') that won't match the ASCII seg.kana ('k'). Fix: convert confirmed kana back
    // to its romaji length using buildRomajiSegments(confirmedHira).
    const isRomajiPronMode = segments.length > 0 && !/[\u3040-\u30FF]/.test(segments[0].kana);

    if (isRomajiPronMode && /[\u3040-\u30FF]/.test(confirmedHira)) {
      // IME kana input with romaji pronunciation — convert kana to romaji length
      const confirmedSegs = buildRomajiSegments(confirmedHira, undefined);
      matchedRomajiLen = confirmedSegs.reduce((sum, s) => sum + s.romaji.length, 0);
    } else {
      for (const seg of segments) {
        if (kanaPos + seg.kana.length <= confirmedHira.length) {
          const inputSeg = confirmedHira.substring(kanaPos, kanaPos + seg.kana.length);
          if (inputSeg === seg.kana) {
            matchedRomajiLen += seg.romaji.length;
            kanaPos += seg.kana.length;
          } else {
            break; // mismatch — show hints for this position
          }
        } else {
          break; // input exhausted
        }
      }
    }

    // Account for trailing romaji (mid-composition keystrokes)
    const totalMatched = matchedRomajiLen + trailingRomaji.length;

    // Return remaining romaji keys as hints
    const remaining = fullRomaji.substring(totalMatched);
    const hints: { code: string; shift: boolean }[] = [];
    for (let i = 0; i < remaining.length && hints.length < 3; i++) {
      hints.push(...getHintKeys(remaining[i], 'en'));
    }
    return hints;
  }

  if (lang !== 'ko') {
    // English / other Latin: simple character index
    const targetNoSpaces = target.replace(/ /g, '');
    const inputNoSpaces  = input.replace(/ /g, '');
    const nextChar = targetNoSpaces[inputNoSpaces.length] ?? '';
    return getHintKeys(nextChar, lang);
  }

  // Korean: grapheme-aware, handles partial IME composition
  const seg = new Intl.Segmenter();
  const targetGraphemes = [...seg.segment(target.normalize('NFC'))]
    .map((s) => s.segment)
    .filter((g) => g !== ' ');
  const inputGraphemes = [...seg.segment(input.normalize('NFC'))]
    .map((s) => s.segment)
    .filter((g) => g !== ' ');

  // Count fully matched graphemes from the start
  let matchedCount = 0;
  while (
    matchedCount < targetGraphemes.length &&
    matchedCount < inputGraphemes.length &&
    targetGraphemes[matchedCount] === inputGraphemes[matchedCount]
  ) {
    matchedCount++;
  }

  // Check if last input grapheme has a batchim that belongs to the next syllable
  // e.g. "갖" when typing "가족" — strip batchim "ㅈ" → "가" matches, "ㅈ" is start of "족"
  let batchimCarry = 0;
  if (
    matchedCount < targetGraphemes.length &&
    matchedCount < inputGraphemes.length &&
    matchedCount === inputGraphemes.length - 1
  ) {
    const inputChar = inputGraphemes[matchedCount];
    const targetChar = targetGraphemes[matchedCount];
    const code = inputChar.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const jongIdx = (code - 0xAC00) % 28;
      if (jongIdx !== 0) {
        const stripped = String.fromCharCode(code - jongIdx);
        if (stripped === targetChar) {
          // Batchim jamo count carries over to the next target grapheme
          batchimCarry = expandJamo(JONGSEONG[jongIdx]).length;
          matchedCount++;
        }
      }
    }
  }

  // Next target grapheme to complete
  const currentTarget = targetGraphemes[matchedCount];
  if (!currentTarget) return [];

  // All keystrokes needed for this grapheme
  const targetKeystrokes = decomposeHangul(currentTarget).flatMap((j) => {
    const key = JAMO_KEY_MAP[j];
    return key ? [key] : [];
  });

  if (batchimCarry > 0) {
    // Batchim from previous syllable already typed as start of this one
    return targetKeystrokes.slice(batchimCarry);
  }

  // Partial composition at this position (e.g. '라' when typing '랑')
  const partialInput = inputGraphemes[matchedCount];
  if (!partialInput) {
    // Nothing started yet — all keystrokes are hints
    return targetKeystrokes;
  }

  // Number of keystrokes already pressed = jamo count in partial grapheme
  const typedJamoCount = decomposeHangul(partialInput).length;

  // Return only the remaining keystrokes
  return targetKeystrokes.slice(typedJamoCount);
}

/**
 * Build a map of keyCode → hint priority (1 = immediate next, 2 = later in sequence).
 * Shift key gets the same priority as the key that needs it.
 */
function buildHintMap(hintKeys: { code: string; shift: boolean }[]): Map<string, number> {
  const map = new Map<string, number>();
  hintKeys.forEach(({ code, shift }, i) => {
    const priority = i === 0 ? 1 : 2;
    // Don't downgrade an already-set priority
    if (!map.has(code) || map.get(code)! > priority) map.set(code, priority);
    if (shift) {
      if (!map.has('ShiftLeft')  || map.get('ShiftLeft')!  > priority) map.set('ShiftLeft',  priority);
      if (!map.has('ShiftRight') || map.get('ShiftRight')! > priority) map.set('ShiftRight', priority);
    }
  });
  return map;
}

// ── Key layout definition ───────────────────────────────────────────────────

interface KeyDef {
  code: string;
  label: string;
  w?: number;
  grow?: boolean;
}

const U = 2.1; // 1u key width in rem

const ROWS: KeyDef[][] = [
  [
    { code: 'Backquote', label: '`' },
    { code: 'Digit1', label: '1' },
    { code: 'Digit2', label: '2' },
    { code: 'Digit3', label: '3' },
    { code: 'Digit4', label: '4' },
    { code: 'Digit5', label: '5' },
    { code: 'Digit6', label: '6' },
    { code: 'Digit7', label: '7' },
    { code: 'Digit8', label: '8' },
    { code: 'Digit9', label: '9' },
    { code: 'Digit0', label: '0' },
    { code: 'Minus', label: '-' },
    { code: 'Equal', label: '=' },
    { code: 'Backspace', label: '←', w: U * 2 },
  ],
  [
    { code: 'Tab', label: 'Tab', w: U * 1.5 },
    { code: 'KeyQ', label: 'Q' },
    { code: 'KeyW', label: 'W' },
    { code: 'KeyE', label: 'E' },
    { code: 'KeyR', label: 'R' },
    { code: 'KeyT', label: 'T' },
    { code: 'KeyY', label: 'Y' },
    { code: 'KeyU', label: 'U' },
    { code: 'KeyI', label: 'I' },
    { code: 'KeyO', label: 'O' },
    { code: 'KeyP', label: 'P' },
    { code: 'BracketLeft', label: '[' },
    { code: 'BracketRight', label: ']' },
    { code: 'Backslash', label: '\\', w: U * 1.5 },
  ],
  [
    { code: 'CapsLock', label: 'Caps', w: U * 1.75 },
    { code: 'KeyA', label: 'A' },
    { code: 'KeyS', label: 'S' },
    { code: 'KeyD', label: 'D' },
    { code: 'KeyF', label: 'F' },
    { code: 'KeyG', label: 'G' },
    { code: 'KeyH', label: 'H' },
    { code: 'KeyJ', label: 'J' },
    { code: 'KeyK', label: 'K' },
    { code: 'KeyL', label: 'L' },
    { code: 'Semicolon', label: ';' },
    { code: 'Quote', label: "'" },
    { code: 'Enter', label: 'Enter', w: U * 2.25 },
  ],
  [
    { code: 'ShiftLeft', label: 'Shift', w: U * 2.25 },
    { code: 'KeyZ', label: 'Z' },
    { code: 'KeyX', label: 'X' },
    { code: 'KeyC', label: 'C' },
    { code: 'KeyV', label: 'V' },
    { code: 'KeyB', label: 'B' },
    { code: 'KeyN', label: 'N' },
    { code: 'KeyM', label: 'M' },
    { code: 'Comma', label: ',' },
    { code: 'Period', label: '.' },
    { code: 'Slash', label: '/' },
    { code: 'ShiftRight', label: 'Shift', w: U * 2.75 },
  ],
  [
    { code: 'ControlLeft', label: 'Ctrl', w: U * 1.5 },
    { code: 'AltLeft', label: 'Alt', w: U * 1.25 },
    { code: 'Space', label: 'Space', grow: true },
    { code: 'AltRight', label: 'Alt', w: U * 1.25 },
    { code: 'ControlRight', label: 'Ctrl', w: U * 1.5 },
  ],
];

const LANG_LABEL: Record<KeyboardLang, string> = {
  ko: '한국어 키보드 (두벌식)',
  ja: '日本語入力 (ローマ字)',
  zh: '中文输入 (拼音)',
  en: 'Keyboard',
  fr: 'Clavier français (AZERTY)',
  es: 'Teclado español (QWERTY)',
  de: 'Deutsche Tastatur (QWERTZ)',
  it: 'Tastiera italiana (QWERTY)',
  pt: 'Teclado português (QWERTY)',
};

// ── Component ───────────────────────────────────────────────────────────────

interface KeyProps {
  def: KeyDef;
  isPressed: boolean;
  /** 0 = not a hint, 1 = immediate next key (strong), 2 = upcoming key (faint) */
  hintPriority: number;
  primary: string;
  secondary?: string;
}

function Key({ def, isPressed, hintPriority, primary, secondary }: KeyProps) {
  // Amber intensity by priority
  const amberBg     = hintPriority === 1 ? 'rgba(255,171,0,0.18)' : 'rgba(255,171,0,0.07)';
  const amberBorder = hintPriority === 1 ? '#ffab00'               : 'rgba(255,171,0,0.45)';
  const amberColor  = hintPriority === 1 ? '#ffab00'               : 'rgba(255,171,0,0.55)';

  const bg     = isPressed ? 'var(--accent)' : hintPriority ? amberBg     : 'var(--bg)';
  const border = isPressed ? 'var(--accent)' : hintPriority ? amberBorder : 'var(--border)';
  const color  = isPressed ? '#fff'          : hintPriority ? amberColor  : 'var(--text)';

  const style: React.CSSProperties = {
    width: def.grow ? undefined : (def.w != null ? def.w + 'rem' : U + 'rem'),
    flex: def.grow ? 1 : undefined,
    height: U + 'rem',
    background: bg,
    border: '1px solid ' + border,
    color,
    transform: isPressed ? 'translateY(1px)' : 'none',
    boxShadow: isPressed
      ? 'inset 0 1px 2px rgba(0,0,0,0.2)'
      : hintPriority === 1
      ? '0 0 0 1px rgba(255,171,0,0.25)'
      : '0 1px 3px rgba(0,0,0,0.12)',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1px',
    transition: 'background 60ms, transform 60ms, box-shadow 60ms, border-color 120ms',
    cursor: 'default',
    userSelect: 'none',
  };

  return (
    <div style={style}>
      {secondary ? (
        <>
          <span style={{ fontSize: '0.85rem', lineHeight: 1, fontWeight: 600 }}>{primary}</span>
          <span style={{ fontSize: '0.55rem', lineHeight: 1, color: isPressed ? 'rgba(255,255,255,0.65)' : hintPriority ? amberColor : 'var(--muted)' }}>
            {secondary}
          </span>
        </>
      ) : (
        <span style={{ fontSize: '0.7rem', lineHeight: 1, fontWeight: hintPriority === 1 ? 700 : 500 }}>{primary}</span>
      )}
    </div>
  );
}

export function VirtualKeyboard({
  target, input, pronunciation, deckLang,
}: {
  target: string;
  input: string;
  /** Optional reading (furigana) for Japanese kanji targets */
  pronunciation?: string;
  /** Deck source language — overrides auto-detection for EU Latin-script languages */
  deckLang?: string;
}) {
  // EU languages can't be auto-detected (all Latin → 'en'), so use deckLang when available
  const lang: KeyboardLang = (deckLang && EU_LANGS.has(deckLang))
    ? (deckLang as KeyboardLang)
    : detectLang(target, pronunciation);
  const [pressed, setPressed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => setPressed((p) => new Set([...p, e.code]));
    const onUp   = (e: KeyboardEvent) => setPressed((p) => { const n = new Set(p); n.delete(e.code); return n; });
    const onBlur = () => setPressed(new Set());
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const isShift = pressed.has('ShiftLeft') || pressed.has('ShiftRight');

  // Hint highlight toggle (persisted in localStorage)
  const [showHints, setShowHints] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('vk-show-hints');
    return stored === null ? true : stored === '1';
  });
  useEffect(() => {
    localStorage.setItem('vk-show-hints', showHints ? '1' : '0');
  }, [showHints]);

  // Compute next-key hints with priority (1 = immediate, 2 = upcoming)
  // Uses grapheme-aware partial-composition logic for Korean
  const hintKeys = computeHintKeys(target, input, lang, pronunciation);
  const hintMap  = showHints ? buildHintMap(hintKeys) : new Map<string, number>();

  return (
    <div className="hidden md:flex justify-center select-none mt-3 pb-4">
      <div
        className="inline-flex flex-col items-center rounded-2xl px-5 py-4"
        style={{
          gap: '3px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div className="flex items-center justify-between w-full mb-1">
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            ⌨ {LANG_LABEL[lang]}
          </p>
          <button
            onClick={() => setShowHints((v) => !v)}
            className="flex items-center gap-1 text-xs rounded"
            style={{
              padding: '2px 6px',
              color: showHints ? '#ffab00' : 'var(--muted)',
              background: showHints ? 'rgba(255,171,0,0.1)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 150ms',
            }}
            title={showHints ? 'Hide key hints' : 'Show key hints'}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {showHints ? (
                <>
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                </>
              ) : (
                <>
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" opacity="0.3" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </>
              )}
            </svg>
          </button>
        </div>
        {ROWS.map((row, ri) => {
          // For CJK languages, hide Ctrl/Alt in the bottom row (they're never used for CJK input)
          const isCJK = lang === 'ko' || lang === 'ja' || lang === 'zh';
          const visibleRow = isCJK
            ? row.filter((d) => !['ControlLeft','ControlRight','AltLeft','AltRight'].includes(d.code))
            : row;
          const isLastRow = ri === ROWS.length - 1;
          return (
          <div key={ri} style={{ display: 'flex', gap: '3px', ...(isLastRow ? { alignSelf: 'stretch', ...(isCJK ? { paddingLeft: `${U * 2.75}rem`, paddingRight: `${U * 2.75}rem` } : {}) } : {}) }}>
            {visibleRow.map((def) => {
              const isPressed    = pressed.has(def.code);
              const hintPriority = isPressed ? 0 : (hintMap.get(def.code) ?? 0);
              let primary = def.label;
              let secondary: string | undefined;
              if (lang === 'ko') {
                const koNorm = KO_NORMAL[def.code];
                const koSh   = KO_SHIFT[def.code];
                if (isShift && koSh) {
                  primary = koSh;
                  secondary = def.label;
                } else if (koNorm) {
                  primary = koNorm;
                  secondary = def.label;
                }
              } else {
                const euLayout = EU_LAYOUTS[lang];
                if (euLayout) {
                  const norm = euLayout.normal[def.code];
                  const sh   = euLayout.shift?.[def.code];
                  if (isShift && sh) {
                    primary = sh;
                    secondary = norm ?? def.label;
                  } else if (norm && norm !== def.label.toLowerCase()) {
                    primary = norm;
                    secondary = def.label;
                  } else if (norm) {
                    primary = norm;
                  }
                }
              }
              return (
                <Key
                  key={def.code}
                  def={def}
                  isPressed={isPressed}
                  hintPriority={hintPriority}
                  primary={primary}
                  secondary={secondary}
                />
              );
            })}
          </div>
          );
        })}
      </div>
    </div>
  );
}
