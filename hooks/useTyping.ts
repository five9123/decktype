'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { calculateMultiLangWpm } from '@/lib/wpm';
import type { CharStatus, CharState } from '@/types';

interface UseTypingReturn {
  input: string;
  charStates: CharState[];
  isCorrect: boolean;
  isComplete: boolean;
  wpm: number | null;
  accuracy: number | null;
  elapsedSeconds: number;
  handleInput: (val: string) => void;
  reset: () => void;
}

// Korean syllable: strip batchim (final consonant) to get base syllable
// e.g. "셋" (ㅅ+ㅔ+ㅅ) → "세" (ㅅ+ㅔ), used during IME composition
function stripBatchim(char: string): string | null {
  const code = char.charCodeAt(0);
  if (code >= 0xAC00 && code <= 0xD7A3) {
    const final = (code - 0xAC00) % 28;
    if (final !== 0) return String.fromCharCode(code - final);
  }
  return null;
}

export function useTyping(target: string): UseTypingReturn {
  const [input, setInput] = useState('');
  const startTimeRef = useRef<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset on target change (useEffect ensures clean lifecycle — no render-time bailouts
  // that can leave stale DOM values visible during IME transitions)
  useEffect(() => {
    setInput('');
    startTimeRef.current = null;
    setElapsedSeconds(0);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, [target]);

  // NFC normalize for consistent Unicode comparison (works for any language)
  const normalizedTarget = target.normalize('NFC');
  const targetNoSpaces = normalizedTarget.replace(/ /g, '');

  // Start timer on first non-empty input (robust for IME / multi-char first event)
  useEffect(() => {
    if (input.length > 0 && startTimeRef.current === null) {
      const now = performance.now();
      startTimeRef.current = now;
      timerRef.current = setInterval(() => {
        setElapsedSeconds(Math.floor((performance.now() - (startTimeRef.current ?? now)) / 1000));
      }, 1000);
    }
  }, [input]);

  const inputNoSpaces = input.normalize('NFC').replace(/ /g, '');
  const isComplete = inputNoSpaces.length > 0 && inputNoSpaces === targetNoSpaces;

  // Stop timer on completion
  useEffect(() => {
    if (isComplete && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isComplete]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Split by grapheme cluster (handles Thai combining marks, emoji, Arabic, etc.)
  const segmenter = new Intl.Segmenter();
  const targetGraphemes = [...segmenter.segment(normalizedTarget)].map((s) => s.segment);
  const inputGraphemes = [...segmenter.segment(inputNoSpaces)].map((s) => s.segment);
  const targetGraphemesNoSpaces = targetGraphemes.filter((g) => g !== ' ');

  // Per-grapheme status — spaces in target are always auto-correct
  let nonSpaceIdx = 0;
  const lastInputIdx = inputGraphemes.length - 1;
  const charStates: CharState[] = targetGraphemes.map((char) => {
    if (char === ' ') return { char, status: 'correct' as CharStatus };
    const idx = nonSpaceIdx;
    nonSpaceIdx++;
    if (idx >= inputGraphemes.length) return { char, status: 'idle' as CharStatus };
    if (inputGraphemes[idx] === char) return { char, status: 'correct' as CharStatus };
    // During Korean IME composition, the last grapheme may have an extra batchim
    // e.g. typing "세상": intermediate "셋" = 세 + ㅅ batchim → strip to match "세"
    if (idx === lastInputIdx) {
      const base = stripBatchim(inputGraphemes[idx]);
      if (base === char) return { char, status: 'correct' as CharStatus };
    }
    return { char, status: 'incorrect' as CharStatus };
  });

  // Extra graphemes typed beyond target length
  if (inputGraphemes.length > targetGraphemesNoSpaces.length) {
    inputGraphemes.slice(targetGraphemesNoSpaces.length).forEach((c) =>
      charStates.push({ char: c, status: 'extra' })
    );
  }

  // Accuracy using grapheme counts (with Korean IME batchim tolerance for last char)
  const correctCount = targetGraphemesNoSpaces.filter(
    (g, i) => {
      if (i >= inputGraphemes.length) return false;
      if (inputGraphemes[i] === g) return true;
      if (i === lastInputIdx) {
        const base = stripBatchim(inputGraphemes[i]);
        if (base === g) return true;
      }
      return false;
    }
  ).length;
  const totalCompared = Math.max(inputGraphemes.length, targetGraphemesNoSpaces.length);
  // Return null before typing starts so UI can show "--"
  const accuracy = inputGraphemes.length === 0
    ? null
    : Math.round((correctCount / totalCompared) * 100);

  // WPM: use correctly typed graphemes joined back to string
  const correctText = targetGraphemesNoSpaces.slice(0, correctCount).join('');
  const wpm = startTimeRef.current !== null
    ? (() => {
        const ms = performance.now() - startTimeRef.current;
        return ms > 0 ? Math.round(calculateMultiLangWpm(correctText, ms)) : 0;
      })()
    : null; // null = not started yet

  const handleInput = useCallback((val: string) => {
    const graphemeLen = [...new Intl.Segmenter().segment(val.replace(/ /g, ''))].length;
    if (graphemeLen <= targetGraphemesNoSpaces.length + 5) setInput(val);
  }, [targetGraphemesNoSpaces.length]);

  const reset = useCallback(() => {
    setInput('');
    startTimeRef.current = null;
    setElapsedSeconds(0);
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  return {
    input, charStates,
    isCorrect: isComplete, isComplete,
    wpm, accuracy, elapsedSeconds,
    handleInput, reset,
  };
}
