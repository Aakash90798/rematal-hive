
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = "https://oyixojuekydwzllkwkkv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95aXhvanVla3lkd3psbGt3a2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2ODU1MTcsImV4cCI6MjA1NzI2MTUxN30.lmSu9LoMyGPDxqNlhOEERKLiZ9-COG_u2ZVAhbgr9ZM";

// Create a Supabase client with the Database type
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export TypeScript types for our database tables
export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string | null;
  city: string | null;
  referral_source_id: string | null;
  created_at: string;
};

export type Freelancer = {
  id: string;
  user_id: string;
  years_of_experience: string;
  linkedin_url: string | null;
  portfolio_url: string | null;
  has_ecommerce_experience: boolean;
  last_rejected_date: string | null;
  video_interview_response_id: string | null;
  created_at: string;
};

export type Niche = {
  id: string;
  name: string;
  created_at?: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  created_at?: string;
};

export type ServiceSubcategory = {
  id: string;
  name: string;
  created_at?: string;
};

export type Tool = {
  id: string;
  name: string;
  created_at?: string;
};

export type ReferralSource = {
  id: string;
  name: string;
  created_at?: string;
};

export type VideoInterviewResponse = {
  id: string;
  about_freelancer: string | null;
  recent_experience: string | null;
  challenge_solved: string | null;
  what_seperates_avg: string | null;
  created_at: string;
};
