// ── FSRS (Free Spaced Repetition Scheduler) ──
// Wrapper around ts-fsrs library for cross-platform consistency
// with korean-anki-mobile which also uses ts-fsrs.
//
// This wrapper preserves the original export interface so that
// confidence.ts and other consumers require no changes.

import { fsrs, Rating, State, type Card as FSRSCard, type Grade } from 'ts-fsrs';
import type { FSRSRating } from '@/types';

// FSRS state for a single card (kept for backward compatibility)
export interface FSRSState {
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
}

// Extended state that includes ts-fsrs fields for mobile sync
export interface FSRSStateExtended extends FSRSState {
  state: number;       // 0=New, 1=Learning, 2=Review, 3=Relearning
  due: Date;
  elapsed_days: number;
  scheduled_days: number;
  last_review?: Date;
}

// Shared FSRS instance with default parameters
const f = fsrs();

/** Create initial FSRS state for a new card. */
export function initState(): FSRSState {
  return { stability: 0, difficulty: 5.0, reps: 0, lapses: 0 };
}

/** Calculate recall probability given stability and elapsed days. */
export function retrievability(stability: number, elapsedDays: number): number {
  if (stability <= 0) return 0;
  return Math.pow(1 + elapsedDays / (9 * stability), -1);
}

/**
 * Map our 1-4 rating to ts-fsrs Grade type.
 */
function toGrade(rating: FSRSRating): Grade {
  switch (rating) {
    case 1: return Rating.Again;
    case 2: return Rating.Hard;
    case 3: return Rating.Good;
    case 4: return Rating.Easy;
    default: return Rating.Good;
  }
}

/**
 * Build a ts-fsrs Card from our FSRSState + elapsed days.
 */
function stateToCard(state: FSRSState, elapsedDays: number): FSRSCard {
  const now = new Date();
  const lastReview = new Date(now.getTime() - elapsedDays * 86400000);

  return {
    due: now,
    stability: state.stability,
    difficulty: state.difficulty || 5.0,
    elapsed_days: elapsedDays,
    scheduled_days: 0,
    learning_steps: 0,
    reps: state.reps,
    lapses: state.lapses,
    state: state.reps === 0 ? State.New : State.Review,
    last_review: state.reps === 0 ? undefined : lastReview,
  };
}

/** Main FSRS scheduling function (backward-compatible interface). */
export function schedule(
  state: FSRSState,
  rating: FSRSRating,
  elapsedDays: number,
): { nextState: FSRSState; intervalDays: number } {
  const card = stateToCard(state, elapsedDays);
  const now = new Date();
  const result = f.next(card, now, toGrade(rating));
  const nextCard = result.card;

  const intervalDays = Math.max(1, Math.round(nextCard.scheduled_days));

  return {
    nextState: {
      stability: Math.round(nextCard.stability * 100) / 100,
      difficulty: Math.round(nextCard.difficulty * 100) / 100,
      reps: nextCard.reps,
      lapses: nextCard.lapses,
    },
    intervalDays: rating === 1 ? 1 : intervalDays,
  };
}

/**
 * Extended scheduling that also returns ts-fsrs-specific fields
 * for mobile sync (state, due, elapsed_days, scheduled_days, last_review).
 */
export function scheduleExtended(
  state: FSRSState,
  rating: FSRSRating,
  elapsedDays: number,
): { nextState: FSRSStateExtended; intervalDays: number } {
  const card = stateToCard(state, elapsedDays);
  const now = new Date();
  const result = f.next(card, now, toGrade(rating));
  const nextCard = result.card;

  const intervalDays = Math.max(1, Math.round(nextCard.scheduled_days));

  return {
    nextState: {
      stability: Math.round(nextCard.stability * 100) / 100,
      difficulty: Math.round(nextCard.difficulty * 100) / 100,
      reps: nextCard.reps,
      lapses: nextCard.lapses,
      state: nextCard.state,
      due: nextCard.due,
      elapsed_days: nextCard.elapsed_days,
      scheduled_days: nextCard.scheduled_days,
      last_review: nextCard.last_review,
    },
    intervalDays: rating === 1 ? 1 : intervalDays,
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
