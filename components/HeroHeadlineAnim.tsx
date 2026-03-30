'use client';
import { useEffect, useRef, useState } from 'react';

interface Props {
  line1: string;
  line2: string;
  line1Style?: React.CSSProperties;
  line2Style?: React.CSSProperties;
}

type Line1Phase = 'cursor' | 'ctrl-v' | 'pasted' | 'fading' | 'done';

function isLatin(c: string) { return /[a-zA-ZÀ-ÿ]/.test(c); }
function isCJK(c: string) { return /[\u3040-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(c); }

export function HeroHeadlineAnim({ line1, line2, line1Style, line2Style }: Props) {
  const [l1Phase, setL1Phase] = useState<Line1Phase>('cursor');
  const [showBadge, setShowBadge] = useState(false);
  const [l2Chars, setL2Chars] = useState(0);
  const [l2Started, setL2Started] = useState(false);
  const [cursorOn, setCursorOn] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const add = (delay: number, fn: () => void) => {
      timersRef.current.push(setTimeout(fn, delay));
    };

    // Line 1: cursor blinks → Ctrl+V badge → text pastes in
    // t=0: cursor already blinking on line 1 (initial state)
    add(500,  () => { setL1Phase('ctrl-v'); setShowBadge(true); });   // badge appears
    add(700,  () => setL1Phase('pasted'));                             // text appears
    add(1500, () => { setL1Phase('done'); setShowBadge(false); setCursorOn(true); }); // move to line 2

    // Start typing line 2
    add(1600, () => setL2Started(true));

    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  // Typing effect for line 2
  useEffect(() => {
    if (!l2Started || l2Chars >= line2.length) return;

    const prev = l2Chars > 0 ? line2[l2Chars - 1] : '';
    let delay = 50 + Math.random() * 40;

    // Pause after punctuation
    if (prev === ',' || prev === '、' || prev === '，') delay += 220;
    else if (prev === '.' || prev === '。' || prev === '?' || prev === '！' || prev === '!') delay += 340;
    else if (prev === ' ') {
      // Pause when switching between scripts (e.g., Korean → English)
      const beforeWord = line2.slice(0, l2Chars).trimEnd().slice(-1);
      const afterWord = line2.slice(l2Chars).trimStart()[0] ?? '';
      if (
        (isLatin(beforeWord) && isCJK(afterWord)) ||
        (isCJK(beforeWord) && isLatin(afterWord))
      ) {
        delay += 140;
      }
    }

    const t = setTimeout(() => setL2Chars((c) => c + 1), delay);
    return () => clearTimeout(t);
  }, [l2Started, l2Chars, line2]);

  const l2Done = l2Chars >= line2.length;

  // Line 1 visual states
  const l1TextVisible = l1Phase === 'pasted' || l1Phase === 'fading' || l1Phase === 'done';
  const l1ShowCursor = l1Phase === 'cursor' || l1Phase === 'ctrl-v';
  const l1Bg =
    l1Phase === 'pasted'
      ? 'rgba(99,102,241,0.22)'
      : l1Phase === 'fading'
      ? 'rgba(99,102,241,0.10)'
      : 'transparent';

  return (
    <h1 className="font-bold leading-tight mb-6" style={{ wordBreak: 'keep-all' }}>
      {/* Line 1: copy-paste animation */}
      <span
        className="block relative"
        style={{ ...line1Style, minHeight: '1.2em' }}
      >
        {l1TextVisible ? (
          <span
            style={{
              display: 'inline',
              borderRadius: '6px',
              padding: '2px 6px',
              margin: '0 -6px',
              background: l1Bg,
              transition: 'background 0.55s ease',
            }}
          >
            {line1}
          </span>
        ) : (
          /* Blinking cursor before paste */
          <span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '0.82em',
              background: l1ShowCursor ? 'currentColor' : 'transparent',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}

        {/* Keyboard shortcut badge */}
        {showBadge && (
          <span
            style={{
              position: 'absolute',
              top: '-2.6rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 12px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 10,
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--text)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <kbd
              style={{
                padding: '2px 6px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 5,
                fontSize: '0.68rem',
                fontFamily: 'inherit',
              }}
            >
              Ctrl
            </kbd>
            <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>+</span>
            <kbd
              style={{
                padding: '2px 8px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: 5,
                fontSize: '0.68rem',
                fontFamily: 'inherit',
              }}
            >
              V
            </kbd>
          </span>
        )}
      </span>

      {/* Line 2: typing animation */}
      <span className="block" style={{ ...line2Style, minHeight: '1.2em' }}>
        {line2.slice(0, l2Chars)}
        {cursorOn && !l2Done && (
          <span
            style={{
              display: 'inline-block',
              width: '3px',
              height: '0.82em',
              background: 'currentColor',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}
      </span>
    </h1>
  );
}
