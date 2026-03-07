-- DeckType Initial Schema
-- Run this in Supabase SQL Editor

-- Profiles (linked to Supabase Auth)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Decks
CREATE TABLE public.decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  card_count INTEGER DEFAULT 0,
  note_type TEXT DEFAULT 'Basic',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Cards
CREATE TABLE public.cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deck_id UUID NOT NULL REFERENCES public.decks(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  extra TEXT DEFAULT '',
  note_type TEXT DEFAULT 'Basic',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Typing Sessions
CREATE TABLE public.typing_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  deck_id UUID NOT NULL REFERENCES public.decks(id) ON DELETE CASCADE,
  wpm REAL NOT NULL,
  accuracy REAL NOT NULL,
  composite_score REAL NOT NULL,
  card_count INTEGER NOT NULL,
  duration_ms INTEGER NOT NULL,
  mode TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Per-card Results
CREATE TABLE public.card_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.typing_sessions(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  wpm REAL NOT NULL,
  accuracy REAL NOT NULL,
  time_ms INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.typing_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own profiles" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users own decks" ON public.decks
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own cards" ON public.cards
  FOR ALL USING (
    deck_id IN (SELECT id FROM public.decks WHERE user_id = auth.uid())
  );

CREATE POLICY "Users own sessions" ON public.typing_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users own card results" ON public.card_results
  FOR ALL USING (
    session_id IN (SELECT id FROM public.typing_sessions WHERE user_id = auth.uid())
  );

-- Indexes
CREATE INDEX idx_decks_user ON public.decks(user_id);
CREATE INDEX idx_cards_deck ON public.cards(deck_id);
CREATE INDEX idx_sessions_user ON public.typing_sessions(user_id, created_at DESC);
CREATE INDEX idx_card_results_session ON public.card_results(session_id);

-- Free plan limit: 3 decks
CREATE OR REPLACE FUNCTION check_deck_limit()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT plan FROM public.profiles WHERE id = NEW.user_id) = 'free'
     AND (SELECT count(*) FROM public.decks WHERE user_id = NEW.user_id) >= 3 THEN
    RAISE EXCEPTION 'Free plan limited to 3 decks';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_deck_limit
  BEFORE INSERT ON public.decks
  FOR EACH ROW EXECUTE FUNCTION check_deck_limit();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
