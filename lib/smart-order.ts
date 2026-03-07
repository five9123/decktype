// ── Smart Card Ordering for SRS-based Practice ──

import type { Card, CardMastery } from '@/types';

/**
 * Orders cards for smart review mode.
 *
 * Priority:
 * 1. Cards past their next_review_at time (lowest confidence first)
 * 2. Cards never practiced (interleaved with due cards)
 * 3. Cards not yet due (soonest due first)
 * 4. 10% random positions for variety
 */
export function smartOrder(
  cards: Card[],
  masteryMap: Map<string, CardMastery>,
  now: Date = new Date(),
): Card[] {
  if (cards.length === 0) return [];

  const due: Card[] = [];
  const unpracticed: Card[] = [];
  const notYetDue: Card[] = [];

  for (const card of cards) {
    const mastery = masteryMap.get(card.id);
    if (!mastery) {
      unpracticed.push(card);
    } else if (new Date(mastery.next_review_at) <= now) {
      due.push(card);
    } else {
      notYetDue.push(card);
    }
  }

  // Sort due cards by confidence ascending (weakest first)
  due.sort((a, b) => {
    const ma = masteryMap.get(a.id);
    const mb = masteryMap.get(b.id);
    return (ma?.confidence ?? 0) - (mb?.confidence ?? 0);
  });

  // Sort not-yet-due by next_review_at ascending (soonest first)
  notYetDue.sort((a, b) => {
    const ma = masteryMap.get(a.id);
    const mb = masteryMap.get(b.id);
    const timeA = ma ? new Date(ma.next_review_at).getTime() : 0;
    const timeB = mb ? new Date(mb.next_review_at).getTime() : 0;
    return timeA - timeB;
  });

  // Interleave unpracticed cards with due cards
  const primary: Card[] = [];
  let dueIdx = 0;
  let unpIdx = 0;

  while (dueIdx < due.length || unpIdx < unpracticed.length) {
    // Add 2 due cards, then 1 unpracticed (interleave pattern)
    if (dueIdx < due.length) {
      primary.push(due[dueIdx++]);
    }
    if (dueIdx < due.length) {
      primary.push(due[dueIdx++]);
    }
    if (unpIdx < unpracticed.length) {
      primary.push(unpracticed[unpIdx++]);
    }
  }

  // Combine: primary cards first, then not-yet-due
  const result = [...primary, ...notYetDue];

  // Apply 10% random shuffle: swap ~10% of positions with random positions
  const swapCount = Math.max(1, Math.floor(result.length * 0.1));
  for (let i = 0; i < swapCount; i++) {
    const idx1 = Math.floor(Math.random() * result.length);
    const idx2 = Math.floor(Math.random() * result.length);
    [result[idx1], result[idx2]] = [result[idx2], result[idx1]];
  }

  return result;
}
