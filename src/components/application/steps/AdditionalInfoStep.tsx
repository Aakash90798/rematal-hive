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
  const MIN_CHARS = 20;

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
  
  // Determine the previous step based on selection history
  const goToPreviousStep = () => {
    const LET_REMATAL_DECIDE_ID = "bab11423-d214-4c43-855e-94e7bfb92b38";
    
    if (formState.selectedServiceCategoryId === LET_REMATAL_DECIDE_ID) {
      updateFormState({ currentStep: 'service-category' });
    } else if (formState.selectedToolIds.length > 0) {
      updateFormState({ currentStep: 'tools' });
    } else if (formState.selectedSubcategoryIds.length > 0) {
      updateFormState({ currentStep: 'service-subcategories' });
    } else {
      updateFormState({ currentStep: 'service-category' });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tell us a bit more about yourself</h2>
      
      <p className="text-gray-600 mb-8">
        Since you've selected options that might need more context, please tell us a bit more about your skills, experience, and tools to help us understand your profile better.
      </p>
      
      <FormField
        id="additionalInfo"
        label={`Additional Information (minimum ${MIN_CHARS} characters)`}
        required
        error={formState.errors.additionalInfo}
      >
        <Textarea
          id="additionalInfo"
          value={formState.additionalInfo}
          onChange={(e) => updateFormState({ additionalInfo: e.target.value })}
          className="min-h-[150px]"
          placeholder="Tell us more about your skills, experience, and the specific services you can provide..."
        />
        <div className="mt-2 text-sm text-gray-500">
          {formState.additionalInfo ? `${formState.additionalInfo.length}/${MIN_CHARS} characters` : `0/${MIN_CHARS} characters`}
        </div>
      </FormField>
      
      <FormStepButtons
        onBack={goToPreviousStep}
        onContinue={handleContinue}
        loading={loading}
        disabled={!formState.additionalInfo || formState.additionalInfo.length < MIN_CHARS}
      />
    </div>
  );
};

export default AdditionalInfoStep;
