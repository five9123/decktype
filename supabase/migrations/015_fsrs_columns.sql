-- ============================================
-- Migration 015: FSRS columns on card_mastery
-- ============================================
-- Adds FSRS (Free Spaced Repetition Scheduler) specific columns
-- to card_mastery for proper interval scheduling.
-- Existing ease_factor/next_review_at columns are retained;
-- FSRS stability/difficulty replace their scheduling role.

-- FSRS state columns
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS stability REAL NOT NULL DEFAULT 0;
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS difficulty REAL NOT NULL DEFAULT 5.0;
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS reps INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS lapses INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS last_rating INTEGER; -- 1=Again, 2=Hard, 3=Good, 4=Easy

-- Index for review dashboard: efficiently find due cards per user
CREATE INDEX IF NOT EXISTS idx_card_mastery_review_due
  ON public.card_mastery(user_id, next_review_at)
  WHERE next_review_at IS NOT NULL;
