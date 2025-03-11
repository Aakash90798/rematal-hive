
import FormField from '@/components/application/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApplicationFormState } from '@/types/form';
import { Linkedin } from 'lucide-react';

interface LinkedInStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const LinkedInStep = ({ formState, updateFormState }: LinkedInStepProps) => {
  const validateLinkedInUrl = (url: string) => {
    if (!url) return false;
    
    // Basic validation for LinkedIn URLs
    return url.includes('linkedin.com');
  };
  
  const handleContinue = () => {
    const errors: Record<string, string> = {};
    
    if (!formState.linkedinUrl) {
      errors.linkedin = 'LinkedIn URL is required';
    } else if (!validateLinkedInUrl(formState.linkedinUrl)) {
      errors.linkedin = 'Please enter a valid LinkedIn URL';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      updateFormState({ currentStep: 'portfolio' });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Share your LinkedIn profile</h2>
      
      <p className="text-gray-600 mb-8">
        Your professional profile helps us understand your background and experience.
      </p>
      
      <FormField
        id="linkedin"
        label="LinkedIn URL"
        required
        error={formState.errors.linkedin}
      >
        <div className="flex">
          <div className="w-12 flex items-center justify-center bg-[#0077b5] text-white border border-r-0 rounded-l-md">
            <Linkedin size={20} />
          </div>
          <Input
            id="linkedin"
            value={formState.linkedinUrl}
            onChange={(e) => updateFormState({ linkedinUrl: e.target.value })}
            className="rounded-l-none w-full"
            placeholder="https://www.linkedin.com/in/yourprofile"
          />
        </div>
      </FormField>
      
      <div className="mt-8">
        <Button
          type="button"
          className="w-full bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6"
          onClick={handleContinue}
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default LinkedInStep;
