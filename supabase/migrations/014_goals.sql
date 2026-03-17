-- User goals for daily/weekly practice targets

CREATE TABLE IF NOT EXISTS public.user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  goal_type TEXT NOT NULL CHECK (goal_type IN ('sessions', 'minutes', 'cards')),
  target_value INTEGER NOT NULL,
  period TEXT NOT NULL DEFAULT 'daily' CHECK (period IN ('daily', 'weekly')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, goal_type, period)
);

ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users own goals" ON public.user_goals FOR ALL USING (auth.uid() = user_id);
CREATE INDEX IF NOT EXISTS idx_user_goals_user ON public.user_goals(user_id);
