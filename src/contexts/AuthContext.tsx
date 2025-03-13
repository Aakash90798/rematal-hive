
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, AuthUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  checkSession: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error checking auth session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check for session on initial load
    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? '',
            email_confirmed_at: session.user.email_confirmed_at
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};
