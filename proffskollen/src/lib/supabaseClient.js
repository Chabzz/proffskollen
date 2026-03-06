/**
 * Supabase client – import this wherever you need auth or DB access.
 *
 * Make sure REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY
 * are set in your frontend .env (Create React App) or equivalent
 * env variable prefix for your bundler (VITE_, NEXT_PUBLIC_, etc.).
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase env vars. Set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
