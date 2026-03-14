-- Add source_lang to decks for TTS language resolution
ALTER TABLE public.decks ADD COLUMN IF NOT EXISTS source_lang TEXT DEFAULT NULL;
