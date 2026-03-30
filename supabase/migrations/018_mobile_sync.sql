-- ============================================
-- Migration 018: Mobile App Sync Support
-- ============================================
-- Adds fields and tables needed for korean-anki-mobile integration.
-- Mobile app connects to the same Supabase backend as the web app.

-- ── Cards: mobile-specific fields ──
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS audio_url TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS example_sentence TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ── Decks: updated_at for sync ──
ALTER TABLE public.decks ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- ── card_mastery: ts-fsrs compatibility fields ──
-- These complement the existing stability/difficulty/reps/lapses from migration 015.
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS state INTEGER DEFAULT 0;        -- FSRS CardState: 0=New, 1=Learning, 2=Review, 3=Relearning
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS due TIMESTAMPTZ DEFAULT now();
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS elapsed_days REAL DEFAULT 0;
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS scheduled_days REAL DEFAULT 0;
ALTER TABLE public.card_mastery ADD COLUMN IF NOT EXISTS last_review TIMESTAMPTZ;

-- ── Review logs: per-review history (for mobile granular tracking) ──
CREATE TABLE IF NOT EXISTS public.review_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,                    -- 1=Again, 2=Hard, 3=Good, 4=Easy
  state INTEGER DEFAULT 0,                    -- FSRS state after review
  due TIMESTAMPTZ NOT NULL DEFAULT now(),
  stability REAL DEFAULT 0,
  difficulty REAL DEFAULT 5.0,
  elapsed_days REAL DEFAULT 0,
  scheduled_days REAL DEFAULT 0,
  reps INTEGER DEFAULT 0,
  lapses INTEGER DEFAULT 0,
  typing_accuracy REAL DEFAULT 1.0,           -- 0.0-1.0
  response_time_ms INTEGER DEFAULT 0,
  reviewed_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for review_logs
ALTER TABLE public.review_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own review logs" ON public.review_logs
  FOR ALL USING (auth.uid() = user_id);

-- Index for querying review history by card
CREATE INDEX IF NOT EXISTS idx_review_logs_card
  ON public.review_logs(card_id, reviewed_at DESC);

-- Index for querying review history by user (recent reviews)
CREATE INDEX IF NOT EXISTS idx_review_logs_user
  ON public.review_logs(user_id, reviewed_at DESC);

-- ── Auto-update updated_at triggers ──
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Decks: auto-set updated_at on UPDATE
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_decks'
  ) THEN
    CREATE TRIGGER set_updated_at_decks
      BEFORE UPDATE ON public.decks
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at();
  END IF;
END $$;

-- Cards: auto-set updated_at on UPDATE
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_cards'
  ) THEN
    CREATE TRIGGER set_updated_at_cards
      BEFORE UPDATE ON public.cards
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at();
  END IF;
END $$;

-- ── RPC: increment card count ──
CREATE OR REPLACE FUNCTION public.increment_card_count(deck_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.decks
  SET card_count = card_count + 1, updated_at = now()
  WHERE id = deck_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── RPC: increment clone count (for gallery) ──
CREATE OR REPLACE FUNCTION public.increment_clone_count(deck_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.decks
  SET clone_count = COALESCE(clone_count, 0) + 1, updated_at = now()
  WHERE id = deck_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
