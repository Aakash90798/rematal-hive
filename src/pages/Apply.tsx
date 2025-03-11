
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ApplicationFormState, FormStep } from '@/types/form';
import FormProgress from '@/components/application/FormProgress';
import PersonalInfoStep from '@/components/application/steps/PersonalInfoStep';
import ExperienceCheckStep from '@/components/application/steps/ExperienceCheckStep';
import YearsOfExperienceStep from '@/components/application/steps/YearsOfExperienceStep';
import NichesStep from '@/components/application/steps/NichesStep';
import LinkedInStep from '@/components/application/steps/LinkedInStep';
import PortfolioStep from '@/components/application/steps/PortfolioStep';
import ServiceCategoryStep from '@/components/application/steps/ServiceCategoryStep';
import ServiceSubcategoriesStep from '@/components/application/steps/ServiceSubcategoriesStep';
import ToolsStep from '@/components/application/steps/ToolsStep';
import AdditionalInfoStep from '@/components/application/steps/AdditionalInfoStep';
import ReferralSourceStep from '@/components/application/steps/ReferralSourceStep';
import SuccessStep from '@/components/application/steps/SuccessStep';
import RejectionStep from '@/components/application/steps/RejectionStep';
import { checkEmailStatus, markUserAsRejected, submitApplication } from '@/services/formService';

const initialFormState: ApplicationFormState = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNo: '',
  city: '',
  hasEcommerceExperience: null,
  yearsOfExperience: null,
  selectedNicheIds: [],
  linkedinUrl: '',
  portfolioUrl: '',
  selectedServiceCategoryId: '',
  selectedSubcategoryIds: [],
  selectedToolIds: [],
  additionalInfo: '',
  referralSourceId: '',
  currentStep: 'personal-info',
  errors: {}
};

const Apply = () => {
  const [formState, setFormState] = useState<ApplicationFormState>(initialFormState);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top on step change
    window.scrollTo(0, 0);
  }, [formState.currentStep]);

  const updateFormState = (updates: Partial<ApplicationFormState>) => {
    setFormState(prev => ({
      ...prev,
      ...updates,
      errors: { ...prev.errors }
    }));
  };

  const handleBack = () => {
    // Define the steps in order
    const steps: FormStep[] = [
      'personal-info',
      'experience-check',
      'years-of-experience',
      'niches',
      'linkedin',
      'portfolio',
      'service-category',
      'service-subcategories',
      'tools',
      'additional-info',
      'referral-source'
    ];
    
    const currentIndex = steps.indexOf(formState.currentStep);
    if (currentIndex > 0) {
      updateFormState({ currentStep: steps[currentIndex - 1] });
    }
  };

  const handleRejection = async () => {
    if (formState.email) {
      // Mark the user as rejected in the database
      await markUserAsRejected(formState);
    }
    
    // Navigate to rejection step
    updateFormState({ currentStep: 'rejection' });
  };

  const handleEmailCheck = async (email: string) => {
    try {
      const { exists, recentlyRejected } = await checkEmailStatus(email);
      
      if (exists) {
        if (recentlyRejected) {
          toast({
            title: "Application Locked",
            description: "You can reapply after 90 days from your last submission.",
            variant: "destructive"
          });
          return false;
        } else {
          toast({
            title: "Application In Progress",
            description: "We're already reviewing your application.",
            variant: "default"
          });
          return false;
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error checking email status:', error);
      return true; // Allow to continue if check fails
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await submitApplication(formState);
      
      if (result.success) {
        if (result.userId) {
          setUserId(result.userId);
        }
        updateFormState({ currentStep: 'success' });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderStep = () => {
    switch (formState.currentStep) {
      case 'personal-info':
        return (
          <PersonalInfoStep 
            formState={formState} 
            updateFormState={updateFormState} 
            onEmailCheck={handleEmailCheck}
          />
        );
      case 'experience-check':
        return (
          <ExperienceCheckStep 
            formState={formState} 
            updateFormState={updateFormState} 
            onRejection={handleRejection}
          />
        );
      case 'years-of-experience':
        return (
          <YearsOfExperienceStep 
            formState={formState} 
            updateFormState={updateFormState} 
            onRejection={handleRejection}
          />
        );
      case 'niches':
        return (
          <NichesStep 
            formState={formState} 
            updateFormState={updateFormState} 
          />
        );
      case 'linkedin':
        return (
          <LinkedInStep 
            formState={formState} 
            updateFormState={updateFormState} 
          />
        );
      case 'portfolio':
        return (
          <PortfolioStep 
            formState={formState} 
            updateFormState={updateFormState} 
          />
        );
      case 'service-category':
        return (
          <ServiceCategoryStep 
            formState={formState} 
            updateFormState={updateFormState} 
          />
        );
      case 'service-subcategories':
        return (
          <ServiceSubcategoriesStep 
            formState={formState} 
            updateFormState={updateFormState} 
          />
        );
      case 'tools':
        return (
          <ToolsStep 
            formState={formState} 
            updateFormState={updateFormState} 
          />
        );
      case 'additional-info':
        return (
          <AdditionalInfoStep 
            formState={formState} 
            updateFormState={updateFormState} 
          />
        );
      case 'referral-source':
        return (
          <ReferralSourceStep 
            formState={formState} 
            updateFormState={updateFormState} 
            onSubmit={handleSubmit}
          />
        );
      case 'success':
        return (
          <SuccessStep 
            firstName={formState.firstName}
            lastName={formState.lastName}
            email={formState.email}
          />
        );
      case 'rejection':
        return <RejectionStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
          <FormProgress currentStep={formState.currentStep} />
          
          {renderStep()}
          
          {!['personal-info', 'success', 'rejection'].includes(formState.currentStep) && (
            <div className="mt-8 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apply;
