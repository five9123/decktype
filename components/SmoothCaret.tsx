'use client';
import { useEffect, useState, useRef, type RefObject } from 'react';

interface SmoothCaretProps {
  /** Ref to the container element wrapping all character <span> elements */
  containerRef: RefObject<HTMLDivElement | null>;
  /** Index of the current input position (number of typed graphemes) */
  position: number;
  /** Whether typing is complete (hides caret) */
  hidden?: boolean;
}

export function SmoothCaret({ containerRef, position, hidden }: SmoothCaretProps) {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(0);
  const [ready, setReady] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (hidden) return;

    const update = () => {
      const container = containerRef.current;
      if (!container) return;

      const chars = container.querySelectorAll<HTMLSpanElement>('[data-char]');
      if (chars.length === 0) return;

      const containerRect = container.getBoundingClientRect();

      if (position < chars.length) {
        // Position before the current character
        const charRect = chars[position].getBoundingClientRect();
        setLeft(charRect.left - containerRect.left);
        setTop(charRect.top - containerRect.top);
        setHeight(charRect.height);
      } else if (chars.length > 0) {
        // Position after the last character
        const lastRect = chars[chars.length - 1].getBoundingClientRect();
        setLeft(lastRect.right - containerRect.left);
        setTop(lastRect.top - containerRect.top);
        setHeight(lastRect.height);
      }

      setReady(true);
    };

    // Use rAF for smooth updates
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [containerRef, position, hidden]);

  if (hidden || !ready) return null;

  return (
    <span
      className="smooth-caret"
      style={{ left, top, height }}
    />
  );
}
