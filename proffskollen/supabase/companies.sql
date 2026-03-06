-- ============================================================
-- Companies table – run this in the Supabase SQL Editor
-- ============================================================

-- 1. Create the companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users (id) ON DELETE CASCADE NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  status      TEXT DEFAULT 'verified' NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- 3. Policy: users can only read their own company row
CREATE POLICY "Users can read own company"
  ON public.companies
  FOR SELECT
  USING (auth.uid() = user_id);

-- 4. (Optional) Index for fast lookups by user_id
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON public.companies (user_id);
