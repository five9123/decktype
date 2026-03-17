// ── FSRS (Free Spaced Repetition Scheduler) Algorithm ──
// Simplified FSRS-5 implementation based on open-spaced-repetition/fsrs-rs
// Reference: https://github.com/open-spaced-repetition/fsrs4anki

import type { FSRSRating } from '@/types';

// FSRS state for a single card
export interface FSRSState {
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
}

// FSRS default weights (v0.4)
const W = [
  0.4072, 1.1829, 3.1262, 15.4722, 7.2102, 0.5316, 1.0651, 0.0589,
  1.5330, 0.1418, 1.0100, 1.9395, 0.1100, 0.2900, 2.2273, 0.2307,
  2.9466, 0.5140, 0.6567,
];

const DESIRED_RETENTION = 0.9;
const MAX_INTERVAL_DAYS = 365;
const MIN_INTERVAL_DAYS = 1;

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

/** Create initial FSRS state for a new card. */
export function initState(): FSRSState {
  return { stability: 0, difficulty: 5.0, reps: 0, lapses: 0 };
}

/** Calculate initial stability for a new card based on first rating. */
function initialStability(rating: FSRSRating): number {
  return Math.max(W[rating - 1], 0.1);
}

/** Calculate initial difficulty for a new card based on first rating. */
function initialDifficulty(rating: FSRSRating): number {
  return clamp(W[4] - Math.exp(W[5] * (rating - 1)) + 1, 1, 10);
}

/** Update difficulty after a review (with mean reversion). */
function nextDifficulty(d: number, rating: FSRSRating): number {
  const delta = -(W[6] * (rating - 3));
  const next = d + delta * (1 - (d - 5) * W[7]);
  return clamp(next, 1, 10);
}

/** Calculate recall probability given stability and elapsed days. */
export function retrievability(stability: number, elapsedDays: number): number {
  if (stability <= 0) return 0;
  return Math.pow(1 + elapsedDays / (9 * stability), -1);
}

/** Calculate next stability after a successful recall. */
function nextRecallStability(
  d: number, s: number, r: number, rating: FSRSRating,
): number {
  const hardPenalty = rating === 2 ? W[15] : 1;
  const easyBonus = rating === 4 ? W[16] : 1;
  return s * (
    1 +
    Math.exp(W[8]) *
    (11 - d) *
    Math.pow(s, -W[9]) *
    (Math.exp((1 - r) * W[10]) - 1) *
    hardPenalty *
    easyBonus
  );
}

/** Calculate next stability after a lapse (forgot). */
function nextForgetStability(
  d: number, s: number, r: number,
): number {
  return Math.max(
    W[11] * Math.pow(d, -W[12]) * (Math.pow(s + 1, W[13]) - 1) * Math.exp((1 - r) * W[14]),
    0.1,
  );
}

/** Convert stability to interval in days at desired retention. */
function stabilityToInterval(s: number): number {
  const interval = 9 * s * (1 / DESIRED_RETENTION - 1);
  return clamp(Math.round(interval), MIN_INTERVAL_DAYS, MAX_INTERVAL_DAYS);
}

/** Main FSRS scheduling function. */
export function schedule(
  state: FSRSState,
  rating: FSRSRating,
  elapsedDays: number,
): { nextState: FSRSState; intervalDays: number } {
  let newS: number;
  let newD: number;
  let newReps = state.reps;
  let newLapses = state.lapses;

  if (state.reps === 0) {
    // First review — use initial parameters
    newS = initialStability(rating);
    newD = initialDifficulty(rating);
    newReps = 1;
    if (rating === 1) newLapses = 1;
  } else {
    const r = retrievability(state.stability, elapsedDays);
    newD = nextDifficulty(state.difficulty, rating);
    newReps = state.reps + 1;

    if (rating === 1) {
      // Lapse (forgot)
      newS = nextForgetStability(newD, state.stability, r);
      newLapses = state.lapses + 1;
    } else {
      // Successful recall
      newS = nextRecallStability(newD, state.stability, r, rating);
    }
  }

  const intervalDays = rating === 1 ? 1 : stabilityToInterval(newS);

  return {
    nextState: {
      stability: Math.round(newS * 100) / 100,
      difficulty: Math.round(newD * 100) / 100,
      reps: newReps,
      lapses: newLapses,
    },
    intervalDays,
  };
}

/**
 * Auto-rate based on accuracy and WPM ratio.
 * Used as fallback when user doesn't manually select a difficulty rating.
 * @param accuracy - 0-100 accuracy for this card
 * @param wpmRatio - user's WPM for this card / user's average WPM (1.0 = average)
 */
export function autoRate(accuracy: number, wpmRatio: number): FSRSRating {
  if (accuracy < 60) return 1;                      // Again
  if (accuracy < 80) return 2;                      // Hard
  if (accuracy >= 95 && wpmRatio >= 1.0) return 4;  // Easy
  return 3;                                          // Good
}
