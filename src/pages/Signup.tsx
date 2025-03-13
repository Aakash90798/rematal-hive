
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from '@/hooks/use-toast';
import { signUpWithEmail, signInWithGoogle, signInWithLinkedIn } from '@/lib/auth';
import { FaLinkedin, FaGoogle } from "react-icons/fa";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [loadingLinkedIn, setLoadingLinkedIn] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      const { data, error } = await signUpWithEmail(email, password);
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message,
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Signup successful",
        description: "Please check your email to verify your account",
      });
      
      navigate('/verify-email', { state: { email } });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoadingGoogle(true);
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast({
          title: "Google signup failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Google signup error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleLinkedInSignup = async () => {
    try {
      setLoadingLinkedIn(true);
      const { error } = await signInWithLinkedIn();
      
      if (error) {
        toast({
          title: "LinkedIn signup failed",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("LinkedIn signup error:", error);
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
            <h2 className="text-3xl font-bold text-rematal-dark">Join Rematal</h2>
            <p className="mt-2 text-sm text-rematal-gray">
              Create your account to apply as a freelancer
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <Button
              onClick={handleGoogleSignup}
              disabled={loadingGoogle}
              variant="outline"
              className="w-full py-6 relative"
            >
              {loadingGoogle ? (
                <span className="flex items-center"><span className="animate-spin mr-2">●</span> Connecting...</span>
              ) : (
                <>
                  <FaGoogle className="w-5 h-5 mr-2" />
                  Sign up with Google
                </>
              )}
            </Button>
            
            <Button
              onClick={handleLinkedInSignup}
              disabled={loadingLinkedIn}
              variant="outline"
              className="w-full py-6 relative"
            >
              {loadingLinkedIn ? (
                <span className="flex items-center"><span className="animate-spin mr-2">●</span> Connecting...</span>
              ) : (
                <>
                  <FaLinkedin className="w-5 h-5 mr-2" />
                  Sign up with LinkedIn
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
            
            <form className="space-y-4" onSubmit={handleEmailSignup}>
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="mt-1"
                  required
                />
              </div>
              
              <LoadingButton
                type="submit"
                loading={loading}
                className="w-full bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6"
              >
                Create account
              </LoadingButton>
            </form>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-rematal-gray">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-rematal-primary hover:text-rematal-primary/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
