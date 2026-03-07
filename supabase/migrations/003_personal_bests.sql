-- Personal Bests tracking (per user, per deck, per mode)
CREATE TABLE public.personal_bests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  deck_id UUID NOT NULL REFERENCES public.decks(id) ON DELETE CASCADE,
  mode TEXT NOT NULL,
  best_wpm REAL NOT NULL DEFAULT 0,
  best_accuracy REAL NOT NULL DEFAULT 0,
  best_composite REAL NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, deck_id, mode)
);

-- Enable RLS
ALTER TABLE public.personal_bests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own personal bests" ON public.personal_bests
  FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_personal_bests_user ON public.personal_bests(user_id);

-- Add index for date-based session queries (heatmap)
CREATE INDEX IF NOT EXISTS idx_sessions_created_date
  ON public.typing_sessions(user_id, created_at);
