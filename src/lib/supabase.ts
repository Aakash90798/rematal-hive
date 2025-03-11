
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = "https://oyixojuekydwzllkwkkv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95aXhvanVla3lkd3psbGt3a2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2ODU1MTcsImV4cCI6MjA1NzI2MTUxN30.lmSu9LoMyGPDxqNlhOEERKLiZ9-COG_u2ZVAhbgr9ZM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
