import FormField from '@/components/application/FormField';
import { Input } from '@/components/ui/input';
import { ApplicationFormState } from '@/types/form';
import { Link2 } from 'lucide-react';
import { useState } from 'react';
import  FormStepButtons from '@/components/application/FormStepButtons';
import { APP_CONSTANTS } from '@/constants';

interface PortfolioStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const PortfolioStep = ({ formState, updateFormState }: PortfolioStepProps) => {
  const [loading, setLoading] = useState(false);
  
  const validateUrl = (url: string) => {
    if (!url) return false;
  
      const urlRegex = APP_CONSTANTS.normalUrlRegex;
  
      return urlRegex.test(url);
  };
  
  const handleContinue = async () => {
    setLoading(true);
    const errors: Record<string, string> = {};
    
    if (!formState.portfolioUrl) {
      errors.portfolio = 'Portfolio/GitHub URL is required';
    } else if (!validateUrl(formState.portfolioUrl)) {
      errors.portfolio = 'Please enter a valid URL';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      updateFormState({ currentStep: 'service-category' });
    }
    setLoading(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    updateFormState({ 
      portfolioUrl: newUrl,
      errors: validateUrl(newUrl) ? {portfolio:''} : formState.errors,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Share your portfolio or GitHub</h2>
      
      <p className="text-gray-600 mb-8">
        We'd like to see examples of your work. Share a link to your portfolio, GitHub, Behance, or any other platform where we can view your work.
      </p>
      
      <FormField
        id="portfolio"
        label="Portfolio URL"
        required
        error={formState.errors.portfolio}
      >
        <div className="flex">
          <div className="w-12 flex items-center justify-center bg-gray-800 text-white border border-r-0 rounded-l-md">
            <Link2 size={20} />
          </div>
          <Input
            id="portfolio"
            value={formState.portfolioUrl || ''}
            onChange={handleChange}
            className="rounded-l-none w-full"
            placeholder="https://your-portfolio-or-github.com"
          />
        </div>
      </FormField>
      
      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'linkedin' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={!formState.portfolioUrl}
      />
    </div>
  );
};

export default PortfolioStep;
