-- Community deck gallery: public decks, likes, clones, display names

-- profiles: display_name for public attribution
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS display_name TEXT DEFAULT '';

-- decks: public sharing fields
ALTER TABLE public.decks ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE public.decks ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE public.decks ADD COLUMN IF NOT EXISTS like_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.decks ADD COLUMN IF NOT EXISTS clone_count INTEGER NOT NULL DEFAULT 0;
ALTER TABLE public.decks ADD COLUMN IF NOT EXISTS original_deck_id UUID REFERENCES public.decks(id) ON DELETE SET NULL;

-- deck_likes table
CREATE TABLE IF NOT EXISTS public.deck_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  deck_id UUID NOT NULL REFERENCES public.decks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, deck_id)
);

-- RLS: decks — own + public read
DROP POLICY IF EXISTS "Users own decks" ON public.decks;
CREATE POLICY "Users own decks" ON public.decks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public decks readable" ON public.decks FOR SELECT USING (is_public = true);

-- RLS: cards — own + public deck read
DROP POLICY IF EXISTS "Users access own cards" ON public.cards;
CREATE POLICY "Users access own cards" ON public.cards FOR ALL USING (deck_id IN (SELECT id FROM public.decks WHERE user_id = auth.uid()));
CREATE POLICY "Public deck cards readable" ON public.cards FOR SELECT USING (deck_id IN (SELECT id FROM public.decks WHERE is_public = true));

-- RLS: profiles — own + public read (display_name)
DROP POLICY IF EXISTS "Users own profiles" ON public.profiles;
CREATE POLICY "Users own profiles" ON public.profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Public profile read" ON public.profiles FOR SELECT USING (true);

-- deck_likes RLS
ALTER TABLE public.deck_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own likes" ON public.deck_likes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Public read likes" ON public.deck_likes FOR SELECT USING (true);

-- Trigger: auto-update like_count on decks
CREATE OR REPLACE FUNCTION update_deck_like_count() RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.decks SET like_count = like_count + 1 WHERE id = NEW.deck_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.decks SET like_count = like_count - 1 WHERE id = OLD.deck_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_deck_like_change AFTER INSERT OR DELETE ON public.deck_likes
  FOR EACH ROW EXECUTE FUNCTION update_deck_like_count();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_decks_public ON public.decks(is_public, published_at DESC) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_decks_public_likes ON public.decks(is_public, like_count DESC) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_deck_likes_deck ON public.deck_likes(deck_id);
CREATE INDEX IF NOT EXISTS idx_deck_likes_user ON public.deck_likes(user_id);
