-- Ensure (user_id, moment_id) unique constraint exists so we can upsert
-- Tiny 3 completion rows by those two columns. The table already exists
-- in production; this only adds the constraint if it is missing.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'moment_history_user_moment_unique'
      AND conrelid = 'public.moment_history'::regclass
  ) THEN
    ALTER TABLE public.moment_history
      ADD CONSTRAINT moment_history_user_moment_unique UNIQUE (user_id, moment_id);
  END IF;
END;
$$;
