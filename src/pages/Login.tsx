
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from '@/hooks/use-toast';
import { signInWithEmail, signInWithGoogle, signInWithLinkedIn } from '@/lib/auth';
import { GitHub, Mail, Google, Linkedin } from 'lucide-react'; 
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      
      navigate('/apply');
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-rematal-dark">Welcome back</h2>
            <p className="mt-2 text-sm text-rematal-gray">
              Sign in to continue to your account
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
                  <Google className="w-5 h-5 mr-2" />
                  Sign in with Google
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
                  <Linkedin className="w-5 h-5 mr-2" />
                  Sign in with LinkedIn
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
                Sign in
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
