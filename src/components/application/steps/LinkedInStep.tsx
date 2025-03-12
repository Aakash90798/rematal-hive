import FormField from '@/components/application/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApplicationFormState } from '@/types/form';
import { Linkedin } from 'lucide-react';
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from 'react';
import FormStepButtons  from '@/components/application/FormStepButtons';
import { APP_CONSTANTS } from '@/constants';

interface LinkedInStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const LinkedInStep = ({ formState, updateFormState }: LinkedInStepProps) => {
  const [loading, setLoading] = useState(false);
  
  const validateLinkedInUrl = (url: string): boolean => {
    if (!url) return false;

    const linkedInRegex = APP_CONSTANTS.linkedInUrlRegex;

    return linkedInRegex.test(url);
};
  
  const handleContinue = async () => {
    setLoading(true);
    const errors: Record<string, string> = {};
    
    if (!formState.linkedinUrl) {
      errors.linkedin = 'LinkedIn URL is required';
    } else if (!validateLinkedInUrl(formState.linkedinUrl)) {
      errors.linkedin = "Please enter a valid LinkedIn profile URL. eg:www.linkedin.com/company/username, www.linkedin.com/in/username";
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      updateFormState({ currentStep: 'portfolio' });
    }
    setLoading(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormState({ linkedinUrl: e.target.value });
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
            value={formState.linkedinUrl || ''}
            onChange={handleChange}
            className="rounded-l-none w-full"
            placeholder="https://www.linkedin.com/in/yourprofile"
          />
        </div>
      </FormField>
      
      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'niches' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={!formState.linkedinUrl}
      />
    </div>
  );
};

export default LinkedInStep;
