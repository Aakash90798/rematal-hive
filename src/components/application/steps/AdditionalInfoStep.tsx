
import FormField from '@/components/application/FormField';
import { Textarea } from '@/components/ui/textarea';
import { ApplicationFormState } from '@/types/form';
import FormStepButtons from '@/components/application/FormStepButtons';
import { useState, useEffect } from 'react';
import { APP_CONSTANTS } from '@/constants';

interface AdditionalInfoStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
}

const AdditionalInfoStep = ({ formState, updateFormState }: AdditionalInfoStepProps) => {
  const [loading, setLoading] = useState(false);
  const MIN_CHARS = 20;
  const [infoCase, setInfoCase] = useState<'case1' | 'case2' | 'case3' | null>(null);

  // Determine which case applies
  useEffect(() => {
    const isRematalDecide = formState.selectedServiceCategoryId === APP_CONSTANTS.LET_REMATAL_DECIDE_ID;
    
    const hasOtherInTools = formState.selectedToolIds.some(id => {
      // Check if the tool name contains "other"
      const toolName = formState.toolsData?.find(tool => tool.id === id)?.name.toLowerCase();
      return toolName?.includes('other');
    });
    
    const hasOtherInSubcategories = formState.selectedSubcategoryIds.some(id => {
      // Check if the subcategory name contains "other"
      const subcategoryName = formState.subcategoriesData?.find(sub => sub.id === id)?.name.toLowerCase();
      return subcategoryName?.includes('other');
    });
    
    const hasOther = hasOtherInTools || hasOtherInSubcategories;
    
    if (isRematalDecide && hasOther) {
      setInfoCase('case3');
    } else if (isRematalDecide) {
      setInfoCase('case1');
    } else if (hasOther) {
      setInfoCase('case2');
    } else {
      // This should not happen as this step should only be shown in one of the 3 cases
      setInfoCase(null);
    }
  }, [formState.selectedServiceCategoryId, formState.selectedToolIds, formState.selectedSubcategoryIds, formState.toolsData, formState.subcategoriesData]);

  const handleContinue = () => {
    setLoading(true);
    const errors: Record<string, string> = {};
    
    if (infoCase === 'case1' || infoCase === 'case3') {
      if (!formState.moreInfo) {
        errors.moreInfo = 'Please tell us more about your skills and services';
      } else if (formState.moreInfo.length < MIN_CHARS) {
        errors.moreInfo = `Please provide more details (at least ${MIN_CHARS} characters)`;
      }
    }
    
    if (infoCase === 'case2' || infoCase === 'case3') {
      if (!formState.skillsToolsRequested) {
        errors.skillsToolsRequested = 'Please tell us what skills or tools you found missing';
      } else if (formState.skillsToolsRequested.length < MIN_CHARS) {
        errors.skillsToolsRequested = `Please provide more details (at least ${MIN_CHARS} characters)`;
      }
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      updateFormState({ currentStep: 'referral-source' });
    }
    setLoading(false);
  };
  
  // Determine the previous step based on selection history
  const goToPreviousStep = () => {
    if (formState.selectedServiceCategoryId === APP_CONSTANTS.LET_REMATAL_DECIDE_ID) {
      updateFormState({ currentStep: 'service-category' });
    } else if (formState.selectedToolIds.length > 0) {
      updateFormState({ currentStep: 'tools' });
    } else if (formState.selectedSubcategoryIds.length > 0) {
      updateFormState({ currentStep: 'service-subcategories' });
    } else {
      updateFormState({ currentStep: 'service-category' });
    }
  };
  
  if (!infoCase) return null;
  
  return (
    <div>
      {infoCase === 'case1' && (
        <>
          <h2 className="text-2xl font-bold mb-6">Tell Us About Your Skills</h2>
          
          <p className="text-gray-600 mb-8">
            As you've chosen to let Rematal determine the best service category for you, please tell us more about your expertise and experience. This will help us match you with the most suitable opportunities.
          </p>
          
          <FormField
            id="moreInfo"
            label={`Tell us about your skills and experience (${formState.moreInfo?.length || 0}/${MIN_CHARS}+ characters)`}
            required
            error={formState.errors.moreInfo}
          >
            <Textarea
              id="moreInfo"
              value={formState.moreInfo || ''}
              onChange={(e) => updateFormState({ moreInfo: e.target.value })}
              className="min-h-[150px]"
              placeholder="Please describe your professional experience, key skills, and the types of services you can provide..."
            />
          </FormField>
        </>
      )}
      
      {infoCase === 'case2' && (
        <>
          <h2 className="text-2xl font-bold mb-6">Additional Skills & Tools</h2>
          
          <p className="text-gray-600 mb-8">
            We noticed you selected "Other" in the previous steps. Please tell us about the specific skills or tools you're proficient with that weren't listed in our options.
          </p>
          
          <FormField
            id="skillsToolsRequested"
            label={`Your additional skills and tools (${formState.skillsToolsRequested?.length || 0}/${MIN_CHARS}+ characters)`}
            required
            error={formState.errors.skillsToolsRequested}
          >
            <Textarea
              id="skillsToolsRequested"
              value={formState.skillsToolsRequested || ''}
              onChange={(e) => updateFormState({ skillsToolsRequested: e.target.value })}
              className="min-h-[150px]"
              placeholder="Please describe the specific skills, tools, or technologies you're proficient with that weren't listed..."
            />
          </FormField>
        </>
      )}
      
      {infoCase === 'case3' && (
        <>
          <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Your Skills & Experience</h3>
              <p className="text-gray-600 mb-6">
                As you've chosen to let Rematal determine the best service category for you, please tell us more about your expertise and experience.
              </p>
              
              <FormField
                id="moreInfo"
                label={`Tell us about your skills and experience (${formState.moreInfo?.length || 0}/${MIN_CHARS}+ characters)`}
                required
                error={formState.errors.moreInfo}
              >
                <Textarea
                  id="moreInfo"
                  value={formState.moreInfo || ''}
                  onChange={(e) => updateFormState({ moreInfo: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Please describe your professional experience, key skills, and the types of services you can provide..."
                />
              </FormField>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Additional Skills & Tools</h3>
              <p className="text-gray-600 mb-6">
                We noticed you selected "Other" in the previous steps. Please tell us about any specific skills or tools you're proficient with that weren't listed.
              </p>
              
              <FormField
                id="skillsToolsRequested"
                label={`Your additional skills and tools (${formState.skillsToolsRequested?.length || 0}/${MIN_CHARS}+ characters)`}
                required
                error={formState.errors.skillsToolsRequested}
              >
                <Textarea
                  id="skillsToolsRequested"
                  value={formState.skillsToolsRequested || ''}
                  onChange={(e) => updateFormState({ skillsToolsRequested: e.target.value })}
                  className="min-h-[150px]"
                  placeholder="Please describe the specific skills, tools, or technologies you're proficient with that weren't listed..."
                />
              </FormField>
            </div>
          </div>
        </>
      )}
      
      <FormStepButtons
        onBack={goToPreviousStep}
        onContinue={handleContinue}
        loading={loading}
        disabled={
          (infoCase === 'case1' && (!formState.moreInfo || formState.moreInfo.length < MIN_CHARS)) ||
          (infoCase === 'case2' && (!formState.skillsToolsRequested || formState.skillsToolsRequested.length < MIN_CHARS)) ||
          (infoCase === 'case3' && (
            !formState.moreInfo || 
            formState.moreInfo.length < MIN_CHARS || 
            !formState.skillsToolsRequested || 
            formState.skillsToolsRequested.length < MIN_CHARS
          ))
        }
      />
    </div>
  );
};

export default AdditionalInfoStep;
