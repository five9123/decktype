'use client';
import { useEffect, useState } from 'react';

// ── Language detection ──────────────────────────────────────────────────────

type Lang = 'ko' | 'ja' | 'zh' | 'en';

function detectLang(text: string): Lang {
  if (!text) return 'en';
  const clean = text.replace(/\s/g, '');
  const total = clean.length || 1;
  const hangul = (clean.match(/[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/g) ?? []).length;
  const hirakata = (clean.match(/[\u3040-\u30FF]/g) ?? []).length;
  const hanzi = (clean.match(/[\u4E00-\u9FFF]/g) ?? []).length;
  if (hangul / total > 0.2) return 'ko';
  if (hirakata / total > 0.2) return 'ja';
  if (hanzi / total > 0.3) return 'zh';
  return 'en';
}

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
function getHintKeys(ch: string, lang: Lang): { code: string; shift: boolean }[] {
  if (!ch || ch === ' ') return ch === ' ' ? [{ code: 'Space', shift: false }] : [];

  if (lang === 'ko') {
    const jamo = decomposeHangul(ch);
    return jamo.flatMap((j) => {
      const key = JAMO_KEY_MAP[j];
      return key ? [key] : [];
    });
  }

  // English / Latin
  const lower = ch.toLowerCase();
  const isUpper = ch !== lower;
  // Match by lowercase label in ROWS
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
 */
function computeHintKeys(target: string, input: string, lang: Lang): { code: string; shift: boolean }[] {
  if (lang !== 'ko') {
    // Non-Korean: simple character index
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

const LANG_LABEL: Record<Lang, string> = {
  ko: '한국어 키보드 (두벌식)',
  ja: '日本語入力 (ローマ字)',
  zh: '中文输入 (拼音)',
  en: 'Keyboard',
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

export function VirtualKeyboard({ target, input }: { target: string; input: string }) {
  const lang = detectLang(target);
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

  // Compute next-key hints with priority (1 = immediate, 2 = upcoming)
  // Uses grapheme-aware partial-composition logic for Korean
  const hintKeys = computeHintKeys(target, input, lang);
  const hintMap  = buildHintMap(hintKeys);

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
        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>
          ⌨ {LANG_LABEL[lang]}
        </p>
        {ROWS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '3px', ...(ri === ROWS.length - 1 ? { alignSelf: 'stretch' } : {}) }}>
            {row.map((def) => {
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
        ))}
      </div>
    </div>
  );
}
