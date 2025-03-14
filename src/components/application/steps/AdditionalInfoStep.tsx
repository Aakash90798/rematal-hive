
import { useState, useEffect } from 'react';
import { ApplicationFormState } from '@/types/form';
import FormStepButtons from '@/components/application/FormStepButtons';
import { APP_CONSTANTS } from '@/constants';

interface AdditionalInfoStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const AdditionalInfoStep = ({ formState, updateFormState }: AdditionalInfoStepProps) => {
  const [charCount, setCharCount] = useState(0);
  const MAX_CHARS = 500;
  
  // Determine which case we're in
  const isRematalDecide = formState.selectedServiceCategoryId === APP_CONSTANTS.LET_REMATAL_DECIDE_ID;
  
  const hasOtherInSubcategories = formState.selectedSubcategoryIds.some(id => {
    const subcategory = formState.subcategoriesData?.find(sub => sub.id === id);
    return subcategory?.name.toLowerCase().includes('other');
  });
  
  const hasOtherInTools = formState.selectedToolIds.some(id => {
    const tool = formState.toolsData?.find(tool => tool.id === id);
    return tool?.name.toLowerCase().includes('other');
  });
  
  const isOtherCase = hasOtherInSubcategories || hasOtherInTools;
  
  useEffect(() => {
    setCharCount(formState.moreInfo?.length || 0);
  }, [formState.moreInfo]);
  
  const handleMoreInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      updateFormState({ moreInfo: value, errors: { moreInfo: '' } });
      setCharCount(value.length);
    }
  };
  
  const handleSkillsToolsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormState({ skillsToolsRequested: e.target.value, errors: { skillsToolsRequested: '' } });
  };
  
  const handleBack = () => {
    // Check if this is the "Let Rematal Decide" case
    if (isRematalDecide) {
      updateFormState({ currentStep: 'service-category' });
    } else {
      updateFormState({ currentStep: 'tools' });
    }
  };
  
  const handleContinue = () => {
    // Validate
    const errors: Record<string, string> = {};
    
    if (isRematalDecide && (!formState.moreInfo || formState.moreInfo.trim() === '')) {
      errors.moreInfo = 'Please tell us more about your expertise';
    }
    
    if (isOtherCase && (!formState.skillsToolsRequested || formState.skillsToolsRequested.trim() === '')) {
      errors.skillsToolsRequested = 'Please specify the other skills/tools';
    }
    
    if (Object.keys(errors).length > 0) {
      updateFormState({ errors });
      return;
    }
    
    // Clear errors and proceed
    updateFormState({ 
      errors: { moreInfo: '', skillsToolsRequested: '' },
      currentStep: 'referral-source' 
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">
          {isRematalDecide 
            ? "Tell us more about your expertise" 
            : "Tell us more about your other skills/tools"}
        </h2>
        <p className="text-gray-600 mt-2">
          {isRematalDecide 
            ? "Help us understand your experience and what you specialize in" 
            : "Didn't find what you're looking for? Let us know which skills or tools you'd like us to add in the future."}
        </p>
      </div>
      
      {isRematalDecide && (
        <div className="space-y-4">
          <div className={`form-group ${formState.errors?.moreInfo ? 'error' : ''}`}>
            <label htmlFor="moreInfo" className="block font-medium mb-2">
              Tell us more about your specific expertise and experience:
            </label>
            <textarea
              id="moreInfo"
              className={`w-full p-3 border rounded-md min-h-[150px] ${
                formState.errors?.moreInfo ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Share details about your expertise, the types of projects you've worked on, and what makes you stand out as a D2C freelancer..."
              value={formState.moreInfo || ''}
              onChange={handleMoreInfoChange}
            />
            <div className="flex justify-between text-sm mt-1">
              {formState.errors?.moreInfo ? (
                <span className="text-red-500">{formState.errors.moreInfo}</span>
              ) : (
                <span className="text-transparent">.</span>
              )}
              <span className={charCount > MAX_CHARS * 0.9 ? 'text-red-500' : 'text-gray-500'}>
                {charCount}/{MAX_CHARS}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {isOtherCase && (
        <div className="space-y-4">
          <div className={`form-group ${formState.errors?.skillsToolsRequested ? 'error' : ''}`}>
            <label htmlFor="skillsToolsRequested" className="block font-medium mb-2">
              Please specify the other skills or tools
            </label>
            <textarea
              id="skillsToolsRequested"
              className={`w-full p-3 border rounded-md min-h-[100px] ${
                formState.errors?.skillsToolsRequested ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="List the specific skills, tools, or subcategories that weren't included in our options..."
              value={formState.skillsToolsRequested || ''}
              onChange={handleSkillsToolsChange}
            />
            {formState.errors?.skillsToolsRequested && (
              <p className="text-red-500 text-sm mt-1">{formState.errors.skillsToolsRequested}</p>
            )}
          </div>
        </div>
      )}
      
      <FormStepButtons
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default AdditionalInfoStep;
