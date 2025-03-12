import { useState, useEffect } from 'react';
import FormField from '@/components/application/FormField';
import MultiSelect from '@/components/application/MultiSelect';
import { Button } from '@/components/ui/button';
import { ApplicationFormState, Niche } from '@/types/form';
import { fetchNiches } from '@/services/formService';
import FormStepButtons from '@/components/application/FormStepButtons';

interface NichesStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const NichesStep = ({ formState, updateFormState }: NichesStepProps) => {
  const [niches, setNiches] = useState<Niche[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadNiches = async () => {
      try {
        const fetchedNiches = await fetchNiches();
        setNiches(fetchedNiches);
      } catch (error) {
        console.error('Error loading niches:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadNiches();
  }, []);
  
  const handleContinue = () => {
    const errors: Record<string, string> = {};
    
    if (formState.selectedNicheIds.length === 0) {
      errors.niches = 'Please select at least one niche';
    } else if (formState.selectedNicheIds.length > 5) {
      errors.niches = 'You can select up to 5 niches';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      updateFormState({ currentStep: 'linkedin' });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">What niches do you prefer working in?</h2>
      
      <p className="text-gray-600 mb-8">
        Select up to 5 industry niches that match your expertise and interests.
      </p>
      
      <FormField
        id="niches"
        label="Select Niches"
        required
        error={formState.errors.niches}
      >
        <MultiSelect
          options={niches}
          selectedIds={formState.selectedNicheIds}
          onChange={(selectedIds) => updateFormState({ selectedNicheIds: selectedIds })}
          maxSelections={5}
          placeholder="Select up to 5 niches"
          disabled={loading}
        />
      </FormField>
      
      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'years-of-experience' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={formState.selectedNicheIds.length === 0}
      />
    </div>
  );
};

export default NichesStep;
