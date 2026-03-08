-- Enhanced Learning: typed text capture + SRS ease factor

-- Add typed text capture to card_results for error analysis
ALTER TABLE public.card_results ADD COLUMN typed_text TEXT DEFAULT '';
ALTER TABLE public.card_results ADD COLUMN target_text TEXT DEFAULT '';

-- Add ease factor to card_mastery for SM-2 inspired scheduling
ALTER TABLE public.card_mastery ADD COLUMN ease_factor REAL NOT NULL DEFAULT 2.5;
