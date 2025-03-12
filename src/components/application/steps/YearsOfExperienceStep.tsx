import { Button } from '@/components/ui/button';
import { ApplicationFormState } from '@/types/form';
import { useState } from 'react';
import FormStepButtons  from '@/components/application/FormStepButtons';

interface YearsOfExperienceStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
  onRejection: () => Promise<void>;
}

const YearsOfExperienceStep = ({ formState, updateFormState, onRejection }: YearsOfExperienceStepProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    formState.yearsOfExperience || null
  );

  const experienceOptions = [
    { value: 'less than 1 yr', label: 'Less than 1 year' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: 'more than 5', label: 'More than 5 years' }
  ];

  const handleSelect = (value: string) => {
    setSelectedExperience(value);
    updateFormState({ yearsOfExperience: value });
  };

  const handleContinue = async () => {
    if (!selectedExperience) return;
    
    setLoading(true);
    if (selectedExperience === 'less than 1 yr') {
      await onRejection();
    } else {
      updateFormState({ currentStep: 'niches' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">How many years of experience do you have in this space?</h2>
      
      <p className="text-gray-600 mb-8">
        We're looking for experienced professionals who can deliver exceptional quality to our client brands.
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        {experienceOptions.map((option) => (
          <Button
            key={option.value}
            type="button"
            disabled={loading}
            className={
              selectedExperience === option.value
                ? "py-6 bg-rematal-primary hover:bg-rematal-primary/90 text-white text-lg justify-start px-6"
                : "py-6 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-800 text-lg justify-start px-6"
            }
            variant={selectedExperience === option.value ? "default" : "outline"}
            onClick={() => handleSelect(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'experience-check' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={!selectedExperience}
      />
    </div>
  );
};

export default YearsOfExperienceStep;
