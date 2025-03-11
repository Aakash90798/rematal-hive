
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ApplicationFormState, ServiceCategory } from '@/types/form';
import { fetchServiceCategories } from '@/services/formService';

interface ServiceCategoryStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const ServiceCategoryStep = ({ formState, updateFormState }: ServiceCategoryStepProps) => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await fetchServiceCategories();
        setCategories(result.map(cat => ({ id: cat.id, name: cat.name })));
      } catch (error) {
        console.error('Error loading service categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);
  
  const handleSelect = (categoryId: string) => {
    updateFormState({ 
      selectedServiceCategoryId: categoryId,
      // Reset subcategories and tools when changing category
      selectedSubcategoryIds: [],
      selectedToolIds: [],
      currentStep: 'service-subcategories'
    });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select your service category</h2>
      
      <p className="text-gray-600 mb-8">
        Choose the primary service category that best describes your expertise.
      </p>
      
      {loading ? (
        <div className="py-10 text-center">
          <p>Loading categories...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              type="button"
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
          ))}
        </div>
      )}
      
      {formState.errors.serviceCategory && (
        <p className="mt-2 text-sm text-red-500">{formState.errors.serviceCategory}</p>
      )}
    </div>
  );
};

export default ServiceCategoryStep;
