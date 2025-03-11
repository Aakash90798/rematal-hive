
import { useState, useEffect } from 'react';
import FormField from '@/components/application/FormField';
import MultiSelect from '@/components/application/MultiSelect';
import { Button } from '@/components/ui/button';
import { ApplicationFormState, Tool } from '@/types/form';
import { fetchToolsForCategory } from '@/services/formService';

interface ToolsStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const ToolsStep = ({ formState, updateFormState }: ToolsStepProps) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadTools = async () => {
      if (!formState.selectedServiceCategoryId) {
        // If no category is selected, go back to service category step
        updateFormState({ currentStep: 'service-category' });
        return;
      }
      
      try {
        const fetchedTools = await fetchToolsForCategory(formState.selectedServiceCategoryId);
        setTools(fetchedTools);
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadTools();
  }, [formState.selectedServiceCategoryId]);
  
  const handleContinue = () => {
    const errors: Record<string, string> = {};
    
    if (formState.selectedToolIds.length === 0) {
      errors.tools = 'Please select at least one tool';
    } else if (formState.selectedToolIds.length > 5) {
      errors.tools = 'You can select up to 5 tools';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      // Check if "Other" is selected in any of the previous steps
      const needsAdditionalInfo = 
        formState.selectedNicheIds.includes('other') || 
        formState.selectedServiceCategoryId === 'other' ||
        formState.selectedSubcategoryIds.includes('other') ||
        formState.selectedToolIds.includes('other');
      
      if (needsAdditionalInfo) {
        updateFormState({ currentStep: 'additional-info' });
      } else {
        updateFormState({ currentStep: 'referral-source' });
      }
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select the tools you're proficient with</h2>
      
      <p className="text-gray-600 mb-8">
        Choose up to 5 tools or technologies you regularly use in your work.
      </p>
      
      <FormField
        id="tools"
        label="Select Tools"
        required
        error={formState.errors.tools}
      >
        <MultiSelect
          options={tools}
          selectedIds={formState.selectedToolIds}
          onChange={(selectedIds) => updateFormState({ selectedToolIds: selectedIds })}
          maxSelections={5}
          placeholder="Select up to 5 tools"
          disabled={loading}
        />
      </FormField>
      
      <div className="mt-8">
        <Button
          type="button"
          className="w-full bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6"
          onClick={handleContinue}
          disabled={loading}
        >
          Continue →
        </Button>
      </div>
    </div>
  );
};

export default ToolsStep;
