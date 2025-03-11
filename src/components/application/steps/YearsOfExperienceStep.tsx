
import { Button } from '@/components/ui/button';
import { ApplicationFormState } from '@/types/form';

interface YearsOfExperienceStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
  onRejection: () => void;
}

const YearsOfExperienceStep = ({ formState, updateFormState, onRejection }: YearsOfExperienceStepProps) => {
  const experienceOptions = [
    { value: 'less than 1 yr', label: 'Less than 1 year' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: 'more than 5', label: 'More than 5 years' }
  ];

  const handleSelect = (value: 'less than 1 yr' | '1-3' | '3-5' | 'more than 5') => {
    updateFormState({ yearsOfExperience: value });
    
    if (value === 'less than 1 yr') {
      onRejection();
    } else {
      updateFormState({ currentStep: 'niches' });
    }
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
            className={
              formState.yearsOfExperience === option.value
                ? "py-6 bg-rematal-primary hover:bg-rematal-primary/90 text-white text-lg justify-start px-6"
                : "py-6 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-800 text-lg justify-start px-6"
            }
            variant={formState.yearsOfExperience === option.value ? "default" : "outline"}
            onClick={() => handleSelect(option.value as any)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default YearsOfExperienceStep;
