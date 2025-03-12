import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ApplicationFormState } from '@/types/form';
import FormStepButtons from '@/components/application/FormStepButtons';

interface ExperienceCheckStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
  onRejection: () => Promise<void>;
}

const ExperienceCheckStep = ({ formState, updateFormState, onRejection }: ExperienceCheckStepProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>(
    formState.hasExperience === true ? 'yes' : 
    formState.hasExperience === false ? 'no' : 
    null
  );

  const handleSelect = (value: 'yes' | 'no') => {
    setSelectedOption(value);
    updateFormState({ hasExperience: value === 'yes' });
  };

  const handleContinue = async () => {
    if (!selectedOption) return;
    
    setLoading(true);
    if (selectedOption === 'no') {
      await onRejection();
    } else {
      updateFormState({ currentStep: 'years-of-experience' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Do you have experience in this field?</h2>
      
      <p className="text-gray-600 mb-8">
        We're looking for professionals with relevant experience in their domain.
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        <Button
          type="button"
          className={
            selectedOption === 'yes'
              ? "py-6 bg-rematal-primary hover:bg-rematal-primary/90 text-white text-lg justify-start px-6"
              : "py-6 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-800 text-lg justify-start px-6"
          }
          variant={selectedOption === 'yes' ? "default" : "outline"}
          onClick={() => handleSelect('yes')}
          disabled={loading}
        >
          Yes
        </Button>
        
        <Button
          type="button"
          className={
            selectedOption === 'no'
              ? "py-6 bg-rematal-primary hover:bg-rematal-primary/90 text-white text-lg justify-start px-6"
              : "py-6 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-800 text-lg justify-start px-6"
          }
          variant={selectedOption === 'no' ? "default" : "outline"}
          onClick={() => handleSelect('no')}
          disabled={loading}
        >
          No
        </Button>
      </div>

      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'personal-info' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={!selectedOption}
      />
    </div>
  );
};

export default ExperienceCheckStep;
