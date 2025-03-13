
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { signOut, checkApplicationStatus } from '@/lib/auth';
import { User, LogOut, FileText, Clock, Check, X } from 'lucide-react';
import Footer from '@/components/Footer';
import NavbarInner from '@/components/NavbarInner';
import { APP_CONSTANTS } from '@/constants';

const Dashboard = () => {
  const { user } = useAuth();
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [rejectedDate, setRejectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      if (user) {
        const { status, rejectedDate } = await checkApplicationStatus(user.id);
        setApplicationStatus(status);
        setRejectedDate(rejectedDate);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchApplicationStatus, 1500);

    return () => clearTimeout(timer);
  }, [user]);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await signOut();
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        });
        navigate('/');
      } catch (error) {
        console.error("Error signing out:", error);
        toast({
          title: "Error",
          description: "Failed to sign out",
          variant: "destructive"
        });
      }
    }
  };
  
  const calculateDaysRemaining = () => {
    if (!rejectedDate) return 0;
    
    const rejected = new Date(rejectedDate);
    const now = new Date();
    const ninetyDaysLater = new Date(rejected);
    ninetyDaysLater.setDate(ninetyDaysLater.getDate() + 90);
    
    const daysRemaining = Math.ceil((ninetyDaysLater.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return daysRemaining > 0 ? daysRemaining : 0;
  };
  
  if (!user) {
    return null; // This should be handled by the AuthRoute component
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavbarInner />
      <div className="flex-1 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-rematal-dark">Your Dashboard</h1>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-gray-50 text-rose-500 hover:text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-rematal-dark mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-rematal-primary" />
                  Your Information
                </h2>
                
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-lg font-medium text-rematal-dark mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-rematal-primary" />
                  Application Status
                </h2>
                
                {loading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin inline-block h-6 w-6 border-2 border-t-rematal-primary border-rematal-primary/20 rounded-full"></div>
                    <p className="mt-2 text-gray-500">Loading your application status...</p>
                  </div>
                ) : (
                  <>
                    {!applicationStatus && (
                      <div>
                        <p className="text-gray-600 mb-4">You haven't applied as a freelancer yet.</p>
                        <Button 
                          asChild
                          className="bg-rematal-primary hover:bg-rematal-primary/90 text-white"
                        >
                          <Link to="/apply">Start your application</Link>
                        </Button>
                      </div>
                    )}
                    
                    {applicationStatus === 'PENDING' && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Application In Review</p>
                            <p className="text-sm text-gray-700 mt-1">
                              Your application is currently being reviewed by our team. We'll notify you by email once it's processed.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {applicationStatus === 'DONE_STEP_1' && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Step 1 Completed</p>
                            <p className="text-sm text-gray-700 mt-1">
                              You've completed step 1 of your application. Please proceed to step 2 to complete your application process.
                            </p>
                            <Button 
                              asChild
                              className="bg-rematal-primary hover:bg-rematal-primary/90 text-white mt-4"
                            >
                              <Link to={{ 
                                pathname: "/apply", 
                                search: "?step=video-interview" 
                              }}>Go to Step 2</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {applicationStatus === 'APPROVED' && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Application Approved</p>
                            <p className="text-sm text-gray-700 mt-1">
                              Congratulations! Your application has been approved. You're now part of the Rematal freelancer community.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {applicationStatus === 'REJECTED' && (
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-start">
                          <X className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-800">Application Not Approved</p>
                            {calculateDaysRemaining() > 0 ? (
                              <p className="text-sm text-gray-700 mt-1">
                                Unfortunately, your application wasn't approved. You can reapply after {calculateDaysRemaining()} days.
                              </p>
                            ) : (
                              <div>
                                <p className="text-sm text-gray-700 mt-1">
                                  You can now reapply as the 90-day waiting period has passed.
                                </p>
                                <Button 
                                  asChild
                                  className="bg-rematal-primary hover:bg-rematal-primary/90 text-white mt-4"
                                >
                                  <Link to="/apply">Reapply now</Link>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
