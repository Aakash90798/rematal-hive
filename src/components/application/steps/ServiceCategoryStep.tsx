
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from "lucide-react";
import { ApplicationFormState, ServiceCategory } from '@/types/form';
import { fetchServiceCategories } from '@/services/formService';
import FormStepButtons from '@/components/application/FormStepButtons';

// Constant for "Let Rematal Decide" ID
const LET_REMATAL_DECIDE_ID = "bab11423-d214-4c43-855e-94e7bfb92b38";

interface ServiceCategoryStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const ServiceCategoryStep = ({ formState, updateFormState }: ServiceCategoryStepProps) => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setDataLoading(true);
        const fetchedCategories = await fetchServiceCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setDataLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  const handleSelect = (categoryId: string) => {
    updateFormState({ selectedServiceCategoryId: categoryId });
  };

  const handleContinue = async () => {
    if (!formState.selectedServiceCategoryId) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
    
    // If "Let Rematal Decide" is selected, skip to additional info or referral source
    if (formState.selectedServiceCategoryId === LET_REMATAL_DECIDE_ID) {
      updateFormState({ 
        shouldShowAdditionalInfo: true,
        currentStep: 'additional-info'
      });
    } else {
      updateFormState({ currentStep: 'service-subcategories' });
    }
    
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select your service category</h2>
      
      <p className="text-gray-600 mb-8">
        Choose the main category that best describes your services.
      </p>
      
      <div className="grid grid-cols-1 gap-4">
        {dataLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-rematal-primary" />
          </div>
        ) : (
          categories.map((category) => (
            <Button
              key={category.id}
              type="button"
              disabled={loading || dataLoading}
              className={
                formState.selectedServiceCategoryId === category.id
                  ? "py-6 bg-rematal-primary hover:bg-rematal-primary/90 text-white text-lg justify-start px-6"
                  : "py-6 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-800 text-lg justify-start px-6"
              }
              variant={formState.selectedServiceCategoryId === category.id ? "default" : "outline"}
              onClick={() => handleSelect(category.id)}
            >
              {category.name}
            </Button>
          ))
        )}
      </div>

      <FormStepButtons
        onBack={() => updateFormState({ currentStep: 'portfolio' })}
        onContinue={handleContinue}
        loading={loading}
        disabled={!formState.selectedServiceCategoryId || dataLoading}
      />
    </div>
  );
};

export default ServiceCategoryStep;
