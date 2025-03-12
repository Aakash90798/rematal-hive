import { useState, useEffect } from 'react';
import FormField from '@/components/application/FormField';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ApplicationFormState, ReferralSource } from '@/types/form';
import { fetchReferralSources } from '@/services/formService';
import FormStepButtons from '@/components/application/FormStepButtons';

interface ReferralSourceStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
  onSubmit: () => void;
}

const ReferralSourceStep = ({ formState, updateFormState, onSubmit }: ReferralSourceStepProps) => {
  const [referralSources, setReferralSources] = useState<ReferralSource[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  useEffect(() => {
    const loadReferralSources = async () => {
      try {
        const fetchedSources = await fetchReferralSources();
        setReferralSources(fetchedSources);
      } catch (error) {
        console.error('Error loading referral sources:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadReferralSources();
  }, []);
  
  const handleSubmit = async () => {
    const errors: Record<string, string> = {};
    
    if (!formState.referralSourceId) {
      errors.referralSource = 'Please select how you heard about us';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      setSubmitting(true);
      await onSubmit();
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">How did you hear about us?</h2>
      
      <p className="text-gray-600 mb-8">
        We'd love to know how you discovered Rematal.
      </p>
      
      <FormField
        id="referralSource"
        label="Select an option"
        required
        error={formState.errors.referralSource}
      >
        {loading ? (
          <div className="py-4">Loading options...</div>
        ) : (
          <RadioGroup
            value={formState.referralSourceId}
            onValueChange={(value) => updateFormState({ referralSourceId: value })}
            className="space-y-3"
          >
            {referralSources.map((source) => (
              <div key={source.id} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50">
                <RadioGroupItem value={source.id} id={`source-${source.id}`} />
                <Label 
                  htmlFor={`source-${source.id}`}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {source.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </FormField>
      
      <FormStepButtons
        onBack={() => updateFormState({ currentStep: formState.additionalInfo ? 'additional-info' : 'tools' })}
        onContinue={handleSubmit}
        loading={submitting}
        disabled={!formState.referralSourceId}
      />
    </div>
  );
};

export default ReferralSourceStep;
