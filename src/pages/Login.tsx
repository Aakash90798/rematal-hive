
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from '@/hooks/use-toast';
import { signInWithEmail, signInWithGoogle, signInWithLinkedIn } from '@/lib/auth';
import { FaLinkedin } from "react-icons/fa";
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import NavbarInner from '@/components/NavbarInner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // If user is already logged in and email is verified, redirect to dashboard
    if (user && user.email_confirmed_at) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await signInWithEmail(email, password);
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in",
      });
      
      if (data.user?.email_confirmed_at) {
        navigate('/dashboard');
      } else {
        // If email is not verified, redirect to verify email page
        navigate('/verify-email', { state: { email: data.user?.email } });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoadingGoogle(true);
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast({
          title: "Google login failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      setLoadingLinkedIn(true);
      const { error } = await signInWithLinkedIn();
      
      if (error) {
        toast({
          title: "LinkedIn login failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("LinkedIn login error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoadingLinkedIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavbarInner />
      <div className="flex-1 pt-10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          {user && (
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-center">
              <p className="text-sm text-blue-800">
                You are logged in as <strong>{user.email}</strong>
              </p>
              <Button 
                variant="link" 
                onClick={() => navigate('/dashboard')}
                className="text-blue-600 p-0 h-auto text-sm"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-rematal-dark">Welcome back</h2>
            <p className="mt-2 text-sm text-rematal-gray">
              Log in to continue to your account
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <Button
              onClick={handleGoogleLogin}
              disabled={loadingGoogle}
              variant="outline"
              className="w-full py-6 relative"
            >
              {loadingGoogle ? (
                <span className="flex items-center"><span className="animate-spin mr-2">●</span> Connecting...</span>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Continue with Google
                </>
              )}
            </Button>
            
            <Button
              onClick={handleLinkedInLogin}
              disabled={loadingLinkedIn}
              variant="outline"
              className="w-full py-6 relative"
            >
              {loadingLinkedIn ? (
                <span className="flex items-center"><span className="animate-spin mr-2">●</span> Connecting...</span>
              ) : (
                <>
                  <FaLinkedin color="#0077B5" className="w-5 h-5 mr-2" />
                  Continue with LinkedIn
                </>
              )}
            </Button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={handleEmailLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="mt-1"
                  required
                />
              </div>
              
              <LoadingButton
                type="submit"
                loading={loading}
                className="w-full bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6"
              >
                Log in
              </LoadingButton>
            </form>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-rematal-gray">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-rematal-primary hover:text-rematal-primary/80">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
