
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SuccessStepProps {
  firstName: string;
  lastName: string;
  email: string;
}

const SuccessStep = ({ firstName, lastName, email }: SuccessStepProps) => {
  const handleContinueToStep2 = () => {
    // Create the URL with the user's information
    const hirevireUrl = `https://app.hirevire.com/applications/3776ece3-0688-4024-b666-e1e689cd9ce7?first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}`;
    
    // Open in a new tab
    window.open(hirevireUrl, '_blank');
  };
  
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <CheckCircle size={60} className="text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Application Received!</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <p className="text-lg mb-6">
          This is super simple — we've pre-recorded a few questions for you. All you need to do is click the button and record your answers on video.
        </p>
        
        <Button
          type="button"
          className="w-full bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6 text-lg"
          onClick={handleContinueToStep2}
        >
          Go to Step 2 →
        </Button>
      </div>
      
      <p className="text-gray-600">
        Thank you for applying to join Rematal. We'll review your application and get back to you soon.
      </p>
    </div>
  );
};

export default SuccessStep;
