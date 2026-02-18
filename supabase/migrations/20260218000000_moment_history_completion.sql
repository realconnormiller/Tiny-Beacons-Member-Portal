-- Migration: Add Tiny 3 completion columns to moment_history
-- Apply with: supabase db push
--
-- Creates moment_history if it doesn't exist yet, then adds the three
-- per-session completion timestamps used by the Tiny 3 indicator.

CREATE TABLE IF NOT EXISTS public.moment_history (
  id          uuid  PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid  NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  moment_date date  NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE (user_id, moment_date)
);

ALTER TABLE public.moment_history
  ADD COLUMN IF NOT EXISTS watched_at timestamptz,
  ADD COLUMN IF NOT EXISTS asked_at   timestamptz,
  ADD COLUMN IF NOT EXISTS prayed_at  timestamptz;

-- Enable RLS (safe to run even if already enabled)
ALTER TABLE public.moment_history ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies so this migration is re-runnable
DROP POLICY IF EXISTS "Users can view own moment history"   ON public.moment_history;
DROP POLICY IF EXISTS "Users can insert own moment history" ON public.moment_history;
DROP POLICY IF EXISTS "Users can update own moment history" ON public.moment_history;

CREATE POLICY "Users can view own moment history"
  ON public.moment_history
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own moment history"
  ON public.moment_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own moment history"
  ON public.moment_history
  FOR UPDATE
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
