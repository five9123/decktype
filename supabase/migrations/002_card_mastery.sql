-- Card Mastery tracking (per user, per card)
-- Stores confidence scores, mastery levels, and SRS scheduling data
CREATE TABLE public.card_mastery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  confidence REAL NOT NULL DEFAULT 0,
  mastery_level TEXT NOT NULL DEFAULT 'learning'
    CHECK (mastery_level IN ('learning', 'familiar', 'mastered')),
  attempt_count INTEGER NOT NULL DEFAULT 0,
  total_correct INTEGER NOT NULL DEFAULT 0,
  avg_wpm REAL NOT NULL DEFAULT 0,
  avg_accuracy REAL NOT NULL DEFAULT 0,
  last_wpm REAL NOT NULL DEFAULT 0,
  last_accuracy REAL NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  next_review_at TIMESTAMPTZ DEFAULT now(),
  last_practiced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, card_id)
);

-- Enable RLS
ALTER TABLE public.card_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own card mastery" ON public.card_mastery
  FOR ALL USING (auth.uid() = user_id);

-- Indexes for efficient querying
CREATE INDEX idx_card_mastery_user_card ON public.card_mastery(user_id, card_id);
CREATE INDEX idx_card_mastery_user_confidence ON public.card_mastery(user_id, confidence);
CREATE INDEX idx_card_mastery_next_review ON public.card_mastery(user_id, next_review_at);

-- Add index on card_results for faster per-card queries
CREATE INDEX IF NOT EXISTS idx_card_results_card ON public.card_results(card_id);
