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

export function useTyping(target: string): UseTypingReturn {
  const [input, setInput] = useState('');
  const startTimeRef = useRef<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
  const charStates: CharState[] = targetGraphemes.map((char) => {
    if (char === ' ') return { char, status: 'correct' as CharStatus };
    const status: CharStatus =
      nonSpaceIdx >= inputGraphemes.length
        ? 'idle'
        : inputGraphemes[nonSpaceIdx] === char
        ? 'correct'
        : 'incorrect';
    nonSpaceIdx++;
    return { char, status };
  });

  // Extra graphemes typed beyond target length
  if (inputGraphemes.length > targetGraphemesNoSpaces.length) {
    inputGraphemes.slice(targetGraphemesNoSpaces.length).forEach((c) =>
      charStates.push({ char: c, status: 'extra' })
    );
  }

  // Accuracy using grapheme counts
  const correctCount = targetGraphemesNoSpaces.filter(
    (g, i) => i < inputGraphemes.length && inputGraphemes[i] === g
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
