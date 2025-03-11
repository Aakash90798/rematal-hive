
import { useState } from 'react';
import FormField from '@/components/application/FormField';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ApplicationFormState } from '@/types/form';

interface PersonalInfoStepProps {
  formState: ApplicationFormState;
  updateFormState: (updates: Partial<ApplicationFormState>) => void;
  onEmailCheck: (email: string) => Promise<boolean>;
}

const PersonalInfoStep = ({ formState, updateFormState, onEmailCheck }: PersonalInfoStepProps) => {
  const [loading, setLoading] = useState(false);
  
  const validate = async () => {
    const errors: Record<string, string> = {};
    
    if (!formState.firstName) {
      errors.firstName = 'First name is required';
    }
    
    if (!formState.lastName) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formState.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Please enter a valid email address';
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
      const canProceed = await onEmailCheck(formState.email);
      setLoading(false);
      
      if (canProceed) {
        updateFormState({ currentStep: 'experience-check' });
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validate();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tell us a bit about yourself</h2>
      
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
        
        <FormField
          id="email"
          label="Email Address"
          required
          error={formState.errors.email}
        >
          <Input
            id="email"
            type="email"
            value={formState.email}
            onChange={(e) => updateFormState({ email: e.target.value })}
            className="w-full"
            placeholder="your.email@example.com"
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
          <Button
            type="submit"
            className="w-full bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6"
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Continue →'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoStep;
