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

// ── Key layout definition ───────────────────────────────────────────────────

interface KeyDef {
  code: string;
  label: string;
  /** rem width. undefined = standard 1u key */
  w?: number;
  /** if true, grows to fill available space (space bar) */
  grow?: boolean;
}

const U = 2.1; // 1u key width in rem

const ROWS: KeyDef[][] = [
  // Number row
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
  // QWERTY row
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
  // ASDF row
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
  // ZXCV row
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
  // Bottom row
  [
    { code: 'ControlLeft', label: 'Ctrl', w: U * 1.5 },
    { code: 'AltLeft', label: 'Alt', w: U * 1.25 },
    { code: 'Space', label: '', grow: true },
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

export function VirtualKeyboard({ target }: { target: string }) {
  const lang = detectLang(target);
  const [pressed, setPressed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const onDown = (e: KeyboardEvent) =>
      setPressed((p) => new Set([...p, e.code]));
    const onUp = (e: KeyboardEvent) =>
      setPressed((p) => {
        const n = new Set(p);
        n.delete(e.code);
        return n;
      });
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    // Clear all on blur to avoid stuck keys
    const onBlur = () => setPressed(new Set());
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const isShift = pressed.has('ShiftLeft') || pressed.has('ShiftRight');
  const GAP = 3; // px

  return (
    <div
      className="hidden md:flex flex-col items-center select-none"
      style={{ gap: `${GAP}px`, marginTop: '0.75rem', paddingBottom: '1rem' }}
    >
      <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>
        ⌨ {LANG_LABEL[lang]}
      </p>

      {ROWS.map((row, ri) => (
        <div key={ri} className="flex" style={{ gap: `${GAP}px` }}>
          {row.map((key) => {
            const isPressed = pressed.has(key.code);

            // Resolve label with Korean overlay
            let primary = key.label;
            let secondary: string | undefined;

            if (lang === 'ko' && (KO_NORMAL[key.code] || KO_SHIFT[key.code])) {
              const koNorm = KO_NORMAL[key.code];
              const koSh = KO_SHIFT[key.code];
              if (isShift && koSh) {
                primary = koSh;
                secondary = key.label;
              } else if (koNorm) {
                primary = koNorm;
                secondary = key.label;
              }
            }

            const style: React.CSSProperties = {
              width: key.grow ? undefined : `${key.w ?? U}rem`,
              flex: key.grow ? 1 : undefined,
              height: `${U}rem`,
              background: isPressed ? 'var(--accent)' : 'var(--surface)',
              border: `1px solid ${isPressed ? 'var(--accent)' : 'var(--border)'}`,
              color: isPressed ? '#fff' : 'var(--text)',
              transform: isPressed ? 'translateY(1px)' : 'none',
              boxShadow: isPressed
                ? 'inset 0 1px 2px rgba(0,0,0,0.2)'
                : '0 1px 3px rgba(0,0,0,0.12)',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1px',
              transition: 'background 60ms, transform 60ms, box-shadow 60ms',
              cursor: 'default',
              userSelect: 'none',
            };

            return (
              <div key={key.code} style={style}>
                {secondary ? (
                  <>
                    <span style={{ fontSize: '0.85rem', lineHeight: 1, fontWeight: 600 }}>
                      {primary}
                    </span>
                    <span
                      style={{
                        fontSize: '0.55rem',
                        lineHeight: 1,
                        color: isPressed ? 'rgba(255,255,255,0.65)' : 'var(--muted)',
                      }}
                    >
                      {secondary}
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: '0.7rem', lineHeight: 1, fontWeight: 500 }}>
                    {primary}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
