
import { Button } from '@/components/ui/button';
import { ApplicationFormState } from '@/types/form';
import { useState } from 'react';

interface ExperienceCheckStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
  onRejection: () => Promise<void>;
}

const ExperienceCheckStep = ({ formState, updateFormState, onRejection }: ExperienceCheckStepProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleYes = () => {
    setIsLoading(true);
    updateFormState({ hasEcommerceExperience: true, currentStep: 'years-of-experience' });
    setIsLoading(false);
  };

  const handleNo = async () => {
    setIsLoading(true);
    updateFormState({ hasEcommerceExperience: false });
    await onRejection();
    setIsLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Have you worked with e-commerce brands before?</h2>
      
      <p className="text-gray-600 mb-8">
        Rematal connects skilled freelancers with quality D2C e-commerce brands.
        Prior experience working with online brands is essential.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          type="button"
          className="py-8 bg-rematal-primary hover:bg-rematal-primary/90 text-white text-lg"
          onClick={handleYes}
          disabled={isLoading}
        >
          Yes
        </Button>
        
        <Button
          type="button"
          className="py-8 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-800 text-lg"
          variant="outline"
          onClick={handleNo}
          disabled={isLoading}
        >
          No
        </Button>
      </div>
    </div>
  );
};

export default ExperienceCheckStep;
