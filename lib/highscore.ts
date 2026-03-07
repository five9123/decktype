import { ACCURACY_WEIGHT, SPEED_WEIGHT, MAX_WPM_FOR_SCORE } from '@/lib/constants';

/** Composite score: accuracy-weighted with WPM bonus (0-100 scale) */
export function computeCompositeScore(accuracy: number, wpm: number): number {
  const normalizedWpm = Math.min(wpm / MAX_WPM_FOR_SCORE, 1) * 100;
  return Math.round(accuracy * ACCURACY_WEIGHT + normalizedWpm * SPEED_WEIGHT);
}
