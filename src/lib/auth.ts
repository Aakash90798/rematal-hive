
import { supabase } from "./supabase";

export type AuthUser = {
  id: string;
  email: string;
  email_confirmed_at?: string | null;
};

export type UserType = 'EXPERT' | 'CLIENT' | 'ADMIN';

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`
    }
  });
  
  return { data, error };
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  return { data, error };
}

export async function signInWithLinkedIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'linkedin_oidc',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  return { data, error };
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user ? { 
    id: session.user.id, 
    email: session.user.email ?? '',
    email_confirmed_at: session.user.email_confirmed_at 
  } : null;
}

export async function resendVerificationEmail(email: string) {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`
    }
  });
  
  return { data, error };
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  return { data, error };
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  
  return { data, error };
}

export async function checkApplicationStatus(userId: string) {
  if(!userId) {
    return { status: null, rejectedDate: null };
  }

  const { data, error } = await supabase
    .from('freelancers')
    .select('application_status, last_rejected_date')
    .eq('user_id', userId)
    .single();
  
  if (error) {
    //console.error('Error checking application status:', error);
    return { status: null, rejectedDate: null };
  }
  
  return { 
    status: data?.application_status || null,
    rejectedDate: data?.last_rejected_date || null
  };
}
