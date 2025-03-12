import FormField from '@/components/application/FormField';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ApplicationFormState } from '@/types/form';
import FormStepButtons from '@/components/application/FormStepButtons';
import { useState } from 'react';

interface AdditionalInfoStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const AdditionalInfoStep = ({ formState, updateFormState }: AdditionalInfoStepProps) => {
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
    setLoading(true);
    const errors: Record<string, string> = {};
    
    if (!formState.additionalInfo) {
      errors.additionalInfo = 'Please provide some additional information';
    } else if (formState.additionalInfo.length < 20) {
      errors.additionalInfo = 'Please provide more details (at least 20 characters)';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      updateFormState({ currentStep: 'referral-source' });
    }
    setLoading(false);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tell us a bit more about yourself</h2>
      
      <p className="text-gray-600 mb-8">
        Since you've selected options like "Let Rematal Decide/Others" that might need more context, please tell us a bit more about your skills, experience, tools to help us understand your profile better.
      </p>
      
      <FormField
        id="additionalInfo"
        label="Additional Information"
        required
        error={formState.errors.additionalInfo}
      >
        <Textarea
          id="additionalInfo"
          value={formState.additionalInfo}
          onChange={(e) => updateFormState({ additionalInfo: e.target.value })}
          className="min-h-[120px]"
          placeholder="Tell us more about your skills, experience, and the specific services you can provide..."
        />
      </FormField>
      
      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'tools' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={!formState.additionalInfo || formState.additionalInfo.length < 20}
      />
    </div>
  );
};

export default AdditionalInfoStep;
