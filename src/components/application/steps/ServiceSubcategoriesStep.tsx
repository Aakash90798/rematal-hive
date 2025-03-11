
import { useState, useEffect } from 'react';
import FormField from '@/components/application/FormField';
import MultiSelect from '@/components/application/MultiSelect';
import { Button } from '@/components/ui/button';
import { ApplicationFormState, ServiceSubcategory } from '@/types/form';
import { fetchSubcategoriesForCategory } from '@/services/formService';

interface ServiceSubcategoriesStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const ServiceSubcategoriesStep = ({ formState, updateFormState }: ServiceSubcategoriesStepProps) => {
  const [subcategories, setSubcategories] = useState<ServiceSubcategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadSubcategories = async () => {
      if (!formState.selectedServiceCategoryId) {
        // If no category is selected, go back to service category step
        updateFormState({ currentStep: 'service-category' });
        return;
      }
      
      try {
        const fetchedSubcategories = await fetchSubcategoriesForCategory(formState.selectedServiceCategoryId);
        setSubcategories(fetchedSubcategories);
      } catch (error) {
        console.error('Error loading subcategories:', error);
      } finally {
        setLoading(false);
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
      updateFormState({ currentStep: 'tools' });
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select your service subcategories</h2>
      
      <p className="text-gray-600 mb-8">
        Choose up to 3 specific service areas within your selected category.
      </p>
      
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

export default ServiceSubcategoriesStep;
