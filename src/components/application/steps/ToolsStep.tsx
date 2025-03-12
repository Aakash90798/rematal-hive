
import { useState, useEffect } from 'react';
import FormField from '@/components/application/FormField';
import MultiSelect from '@/components/application/MultiSelect';
import { ApplicationFormState, Tool } from '@/types/form';
import { fetchToolsForCategory } from '@/services/formService';
import FormStepButtons from '@/components/application/FormStepButtons';
import { Loader2 } from "lucide-react";
import { APP_CONSTANTS } from '@/constants';

interface ToolsStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const ToolsStep = ({ formState, updateFormState }: ToolsStepProps) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  useEffect(() => {
    const loadTools = async () => {
      if (!formState.selectedServiceCategoryId) {
        // If no category is selected, go back to service category step
        updateFormState({ currentStep: 'service-category' });
        return;
      }
      
      // Skip this step if "Let Rematal Decide" is selected
      if (formState.selectedServiceCategoryId === APP_CONSTANTS.LET_REMATAL_DECIDE_ID) {
        updateFormState({ 
          currentStep: 'additional-info',
          shouldShowAdditionalInfo: true
        });
        return;
      }
      
      try {
        setDataLoading(true);
        const fetchedTools = await fetchToolsForCategory(formState.selectedServiceCategoryId);
        setTools(fetchedTools);
        
        // Store tools data for case determination in additional info step
        updateFormState({ toolsData: fetchedTools });
      } catch (error) {
        console.error('Error loading tools:', error);
      } finally {
        setDataLoading(false);
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
      // Check if "Other" is selected and determine if additional info is needed
      const hasOtherSelected = formState.selectedToolIds.some(id => {
        const tool = tools.find(tool => tool.id === id);
        return tool?.name.toLowerCase().includes('other');
      });
        
      if (hasOtherSelected) {
        updateFormState({ shouldShowAdditionalInfo: true });
      }
      
      if (formState.shouldShowAdditionalInfo) {
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
      
      {dataLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-rematal-primary" />
          <span className="ml-2 text-rematal-primary">Loading tools...</span>
        </div>
      ) : (
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
      )}
      
      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'service-subcategories' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={formState.selectedToolIds.length === 0 || dataLoading}
      />
    </div>
  );
};

export default ToolsStep;
