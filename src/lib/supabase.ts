import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use a placeholder if keys are missing to prevent "supabaseUrl is required" crash on module load.
// The main.tsx check will ensure this is never actually used for auth if missing.
const dummyUrl = 'https://placeholder.supabase.co';
const dummyKey = 'placeholder';

export const supabase = createClient(
  supabaseUrl || dummyUrl, 
  supabaseAnonKey || dummyKey
);
