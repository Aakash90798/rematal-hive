
import { useState, useEffect } from 'react';
import FormField from '@/components/application/FormField';
import MultiSelect from '@/components/application/MultiSelect';
import { Button } from '@/components/ui/button';
import { ApplicationFormState, ServiceSubcategory } from '@/types/form';
import { fetchSubcategoriesForCategory } from '@/services/formService';
import FormStepButtons from '@/components/application/FormStepButtons';
import { Loader2 } from "lucide-react";
import { APP_CONSTANTS } from '@/constants';

interface ServiceSubcategoriesStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const ServiceSubcategoriesStep = ({ formState, updateFormState }: ServiceSubcategoriesStepProps) => {
  const [subcategories, setSubcategories] = useState<ServiceSubcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  
  useEffect(() => {
    const loadSubcategories = async () => {
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
        const fetchedSubcategories = await fetchSubcategoriesForCategory(formState.selectedServiceCategoryId);
        setSubcategories(fetchedSubcategories);
        
        // Store subcategories data for case determination in additional info step
        updateFormState({ subcategoriesData: fetchedSubcategories });
      } catch (error) {
        console.error('Error loading subcategories:', error);
      } finally {
        setDataLoading(false);
      }
    };
    
    loadSubcategories();
  }, [formState.selectedServiceCategoryId]);
  
  const handleContinue = () => {
    const errors: Record<string, string> = {};
    
    if (formState.selectedSubcategoryIds.length === 0) {
      errors.subcategories = 'Please select at least one subcategory';
    } else if (formState.selectedSubcategoryIds.length > 3) {
      errors.subcategories = 'You can select up to 3 subcategories';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      // Check if "Other" is selected and determine if additional info is needed
      const hasOtherSelected = formState.selectedSubcategoryIds.some(id => {
        const subcategory = subcategories.find(sub => sub.id === id);
        return subcategory?.name.toLowerCase().includes('other');
      });
        
      if (hasOtherSelected) {
        updateFormState({ shouldShowAdditionalInfo: true });
      }
      
      updateFormState({ currentStep: 'tools' });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select your service subcategories</h2>
      
      <p className="text-gray-600 mb-8">
        Choose up to 3 specific service areas within your selected category.
      </p>
      
      {dataLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-rematal-primary" />
          <span className="ml-2 text-rematal-primary">Loading subcategories...</span>
        </div>
      ) : (
        <FormField
          id="subcategories"
          label="Select Subcategories"
          required
          error={formState.errors.subcategories}
        >
          <MultiSelect
            options={subcategories}
            selectedIds={formState.selectedSubcategoryIds}
            onChange={(selectedIds) => updateFormState({ selectedSubcategoryIds: selectedIds })}
            maxSelections={3}
            placeholder="Select up to 3 subcategories"
            disabled={loading}
          />
        </FormField>
      )}
      
      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'service-category' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={formState.selectedSubcategoryIds.length === 0 || dataLoading}
      />
    </div>
  );
};

export default ServiceSubcategoriesStep;
