-- 011: Update free tier deck limit from 1 to 3
-- Matches updated client constant FREE_DECK_LIMIT = 3

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
