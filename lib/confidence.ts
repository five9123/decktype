// ── Confidence Scoring & SRS Interval Calculator ──

import type { MasteryLevel } from '@/types';

const DECAY_FACTOR = 0.7; // Exponential decay for weighting recent attempts

/**
 * Calculate confidence score (0-100) for a card.
 *
 * Components:
 * - Accuracy score (0-50): weighted average of recent accuracies with exponential decay
 * - Speed score (0-30): based on WPM relative to user's average
 * - Consistency score (0-20): from streak length and attempt count
 */
export function calculateConfidence(params: {
  recentAccuracies: number[];  // most recent first, 0-100
  recentWpms: number[];        // most recent first
  userAvgWpm: number;          // user's overall average WPM
  attemptCount: number;
  streak: number;              // consecutive correct attempts
}): number {
  const { recentAccuracies, recentWpms, userAvgWpm, attemptCount, streak } = params;

  if (attemptCount === 0) return 0;

  // 1. Accuracy component (0-50 points)
  let accScore = 0;
  if (recentAccuracies.length > 0) {
    let weightedSum = 0;
    let weightTotal = 0;
    for (let i = 0; i < Math.min(recentAccuracies.length, 10); i++) {
      const weight = Math.pow(DECAY_FACTOR, i);
      weightedSum += recentAccuracies[i] * weight;
      weightTotal += weight;
    }
    accScore = (weightedSum / weightTotal / 100) * 50;
  }

  // 2. Speed component (0-30 points)
  let speedScore = 0;
  if (recentWpms.length > 0 && userAvgWpm > 0) {
    let weightedSum = 0;
    let weightTotal = 0;
    for (let i = 0; i < Math.min(recentWpms.length, 10); i++) {
      const weight = Math.pow(DECAY_FACTOR, i);
      weightedSum += recentWpms[i] * weight;
      weightTotal += weight;
    }
    const avgWpm = weightedSum / weightTotal;
    // Score based on how close to or above user's average WPM
    const speedRatio = Math.min(avgWpm / userAvgWpm, 1.5);
    speedScore = (speedRatio / 1.5) * 30;
  }

  // 3. Consistency component (0-20 points)
  const streakBonus = Math.min(streak / 5, 1) * 10; // Max 10 pts at 5+ streak
  const attemptBonus = Math.min(attemptCount / 10, 1) * 10; // Max 10 pts at 10+ attempts
  const consistencyScore = streakBonus + attemptBonus;

  return Math.round(Math.min(accScore + speedScore + consistencyScore, 100));
}

/**
 * Determine mastery level from confidence score.
 */
export function getMasteryLevel(confidence: number): MasteryLevel {
  if (confidence >= 75) return 'mastered';
  if (confidence >= 40) return 'familiar';
  return 'learning';
}

/**
 * Calculate next review time using SM-2 inspired algorithm.
 * Uses ease_factor for per-card difficulty adaptation.
 */
export function calculateNextReview(_confidence: number, streak: number, easeFactor: number = 2.5): Date {
  const now = new Date();
  const MAX_INTERVAL_DAYS = 30;

  let intervalMinutes: number;
  if (streak <= 0) {
    intervalMinutes = 1; // Just failed: review immediately
  } else if (streak === 1) {
    intervalMinutes = 10; // First correct: 10 minutes
  } else if (streak === 2) {
    intervalMinutes = 60 * 24; // Second correct: 1 day
  } else {
    // streak 3+: grow by ease_factor, capped at MAX_INTERVAL_DAYS
    const prevDays = Math.pow(easeFactor, streak - 3); // exponential growth from 1 day base
    const days = Math.min(prevDays * easeFactor, MAX_INTERVAL_DAYS);
    intervalMinutes = Math.round(days * 60 * 24);
  }

  return new Date(now.getTime() + intervalMinutes * 60 * 1000);
}

/**
 * Adjust ease factor based on accuracy (SM-2 inspired).
 * Higher accuracy → higher ease (longer intervals), lower accuracy → lower ease (shorter intervals).
 */
export function adjustEaseFactor(currentEase: number, accuracy: number): number {
  const MIN_EASE = 1.3;
  let delta = 0;
  if (accuracy >= 95) delta = 0.15;
  else if (accuracy >= 80) delta = 0;
  else if (accuracy >= 60) delta = -0.15;
  else delta = -0.30;
  return Math.max(currentEase + delta, MIN_EASE);
}

/**
 * Calculate updated mastery stats after a practice attempt.
 */
export function updateMasteryStats(params: {
  current: {
    attempt_count: number;
    total_correct: number;
    avg_wpm: number;
    avg_accuracy: number;
    streak: number;
    error_count: number;
    ease_factor?: number;
  };
  newAccuracy: number;  // 0-100
  newWpm: number;
  userAvgWpm: number;
}) {
  const { current, newAccuracy, newWpm, userAvgWpm } = params;
  const isCorrect = newAccuracy >= 80; // Consider >= 80% accuracy as "correct"

  const attemptCount = current.attempt_count + 1;
  const totalCorrect = current.total_correct + (isCorrect ? 1 : 0);
  const streak = isCorrect ? current.streak + 1 : 0;
  const errorCount = current.error_count + (isCorrect ? 0 : 1);

  // Running average
  const avgAccuracy = ((current.avg_accuracy * current.attempt_count) + newAccuracy) / attemptCount;
  const avgWpm = ((current.avg_wpm * current.attempt_count) + newWpm) / attemptCount;

  // Build recent arrays for confidence calculation (we only have current + aggregates)
  // Use the new value as most recent, avg as historical
  const recentAccuracies = [newAccuracy];
  const recentWpms = [newWpm];
  if (current.attempt_count > 0) {
    recentAccuracies.push(current.avg_accuracy);
    recentWpms.push(current.avg_wpm);
  }

  const confidence = calculateConfidence({
    recentAccuracies,
    recentWpms,
    userAvgWpm,
    attemptCount,
    streak,
  });

  const masteryLevel = getMasteryLevel(confidence);
  const easeFactor = adjustEaseFactor(current.ease_factor ?? 2.5, newAccuracy);
  const nextReviewAt = calculateNextReview(confidence, streak, easeFactor);

  return {
    confidence,
    mastery_level: masteryLevel,
    attempt_count: attemptCount,
    total_correct: totalCorrect,
    avg_wpm: Math.round(avgWpm * 10) / 10,
    avg_accuracy: Math.round(avgAccuracy * 10) / 10,
    last_wpm: newWpm,
    last_accuracy: newAccuracy,
    streak,
    error_count: errorCount,
    ease_factor: Math.round(easeFactor * 100) / 100,
    next_review_at: nextReviewAt.toISOString(),
    last_practiced_at: new Date().toISOString(),
  };
}
