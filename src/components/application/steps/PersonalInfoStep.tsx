
import { useState } from 'react';
import FormField from '@/components/application/FormField';
import { Input } from '@/components/ui/input';
import { ApplicationFormState } from '@/types/form';
import FormStepButtons from '@/components/application/FormStepButtons';
import { useAuth } from '@/contexts/AuthContext';

interface PersonalInfoStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
  onEmailCheck?: (email: string) => Promise<boolean>;
}

const PersonalInfoStep = ({ formState, updateFormState, onEmailCheck }: PersonalInfoStepProps) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  const validate = async () => {
    const errors: Record<string, string> = {};
    
    if (!formState.firstName) {
      errors.firstName = 'First name is required';
    }
    
    if (!formState.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formState.mobileNo) {
      errors.mobileNo = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formState.mobileNo)) {
      errors.mobileNo = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    if (!formState.city) {
      errors.city = 'City is required';
    }
    
    updateFormState({ errors });
    
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      
      // Use the authenticated user's email
      const userEmail = user?.email || '';
      
      let canProceed = true;
      if (onEmailCheck) {
        canProceed = await onEmailCheck(userEmail);
      }
      
      setLoading(false);
      
      if (canProceed) {
        // Make sure email is set in formState using the user's authenticated email
        updateFormState({ 
          email: userEmail,
          currentStep: 'experience-check' 
        });
      }
    }
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    validate();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Tell us a bit about yourself</h2>
      <div className="text-base mb-6 text-rematal-primary">ℹ️ You can only fill this form once.</div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="firstName"
            label="First Name"
            required
            error={formState.errors.firstName}
          >
            <Input
              id="firstName"
              value={formState.firstName}
              onChange={(e) => updateFormState({ firstName: e.target.value })}
              className="w-full"
              placeholder="Your first name"
            />
          </FormField>
          
          <FormField
            id="lastName"
            label="Last Name"
            required
            error={formState.errors.lastName}
          >
            <Input
              id="lastName"
              value={formState.lastName}
              onChange={(e) => updateFormState({ lastName: e.target.value })}
              className="w-full"
              placeholder="Your last name"
            />
          </FormField>
        </div>
        
        {/* Show user's email as read-only */}
        <FormField
          id="email"
          label="Email Address"
          required
        >
          <Input
            id="email"
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full bg-gray-100"
          />
        </FormField>
        
        <FormField
          id="mobileNo"
          label="Mobile Number"
          required
          error={formState.errors.mobileNo}
        >
          <div className="flex">
            <div className="w-16 flex items-center justify-center bg-gray-100 border border-r-0 rounded-l-md">
              +91
            </div>
            <Input
              id="mobileNo"
              value={formState.mobileNo}
              onChange={(e) => {
                // Allow only numbers and limit to 10 digits
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) {
                  updateFormState({ mobileNo: value });
                }
              }}
              className="rounded-l-none w-full"
              placeholder="10-digit mobile number"
            />
          </div>
        </FormField>
        
        <FormField
          id="city"
          label="City"
          required
          error={formState.errors.city}
        >
          <Input
            id="city"
            value={formState.city}
            onChange={(e) => updateFormState({ city: e.target.value })}
            className="w-full"
            placeholder="Your city"
          />
        </FormField>
        
        <div className="pt-4">
          <FormStepButtons
            showBack={false}
            onContinue={handleSubmit}
            loading={loading}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
