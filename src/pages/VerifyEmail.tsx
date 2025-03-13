
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";
import { useToast } from '@/hooks/use-toast';
import { resendVerificationEmail } from '@/lib/auth';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const VerifyEmail = () => {
  const userAuth = useAuth();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { state } = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  const email = state?.email || '';

  useEffect(() => {
      if (!email) {
        navigate('/login');
      }

      if (userAuth && userAuth.user?.email_confirmed_at) {
        navigate('/dashboard');
      }

  }, [email, navigate, userAuth]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;

    try {
      setLoading(true);
      const { error } = await resendVerificationEmail(email);
      if (error) {
        toast({
          title: "Failed to resend email",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Email sent",
        description: "Please check your inbox for the verification email",
      });

      setCountdown(60);
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md text-center">
          <div className="flex justify-center">
            <div className="bg-rematal-light-purple/50 p-4 rounded-full">
              <Mail className="h-16 w-16 text-rematal-blue" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-rematal-dark">Verify your email</h2>

          <div className="space-y-4">
            <p className="text-gray-600">
              We've sent a verification link to <strong>{email}</strong>
            </p>
            <div className="bg-rematal-light-green/50 p-4 rounded-lg text-left">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-rematal-green mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Please check your email and click the verification link.
                </p>
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-left">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  If you don't see the email in your inbox, please check your spam/junk folder.
                </p>
              </div>
            </div>
            <div className="white p-4 rounded-lg text-left">
              <div className="flex items-start">
                <p className="text-sm text-gray-700">
                  If this page doesn't automatically update after verfication, please try to login.
                </p>
              </div>
            </div>
            <div className="pt-4">
              <LoadingButton
                onClick={handleResendEmail}
                loading={loading}
                disabled={countdown > 0}
                className="w-full bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6"
              >
                {countdown > 0 ? `Resend email (${countdown}s)` : "Resend verification email"}
              </LoadingButton>
            </div>
            <div className="pt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full py-6">
                  Back to login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
