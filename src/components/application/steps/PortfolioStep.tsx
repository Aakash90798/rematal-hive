
import FormField from '@/components/application/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApplicationFormState } from '@/types/form';
import { Link2 } from 'lucide-react';

interface PortfolioStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const PortfolioStep = ({ formState, updateFormState }: PortfolioStepProps) => {
  const validateUrl = (url: string) => {
    if (!url) return false;
    
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleContinue = () => {
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
            value={formState.portfolioUrl}
            onChange={(e) => updateFormState({ portfolioUrl: e.target.value })}
            className="rounded-l-none w-full"
            placeholder="https://your-portfolio-or-github.com"
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

export default PortfolioStep;
