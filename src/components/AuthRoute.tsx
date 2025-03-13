
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

interface AuthRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireEmailVerification?: boolean;
}

const AuthRoute = ({ 
  children, 
  requireAuth = true,
  requireEmailVerification = true
}: AuthRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rematal-primary"></div>
      </div>
    );
  }

  // If authentication is required and user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  // If email verification is required and the user is logged in but email is not verified
  if (requireAuth && requireEmailVerification && user) {
    // Use getSession() to check if email is verified
    const checkEmailVerification = async () => {
      const { data } = await supabase.auth.getSession();
      return data?.session?.user?.email_confirmed_at;
    };
    
    // This is a workaround for now - checking session synchronously
    // Ideally this would be handled with a proper hook or context
    if (!user.email_confirmed_at) {
      return <Navigate to="/verify-email" state={{ email: user.email }} replace />;
    }
  }

  return <>{children}</>;
};

export default AuthRoute;
