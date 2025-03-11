
export type FormStep = 
  | 'personal-info'
  | 'experience-check'
  | 'years-of-experience'
  | 'niches'
  | 'linkedin'
  | 'portfolio'
  | 'service-category'
  | 'service-subcategories'
  | 'tools'
  | 'additional-info'
  | 'referral-source'
  | 'success'
  | 'rejection';

export interface ApplicationFormState {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  city: string;
  
  // Experience
  hasEcommerceExperience: boolean | null;
  yearsOfExperience: 'less than 1 yr' | '1-3' | '3-5' | 'more than 5' | null;
  
  // Skills and Experience
  selectedNicheIds: string[];
  linkedinUrl: string;
  portfolioUrl: string;
  selectedServiceCategoryId: string;
  selectedSubcategoryIds: string[];
  selectedToolIds: string[];
  
  // Additional info if "other" is selected
  additionalInfo: string;
  
  // Referral source
  referralSourceId: string;
  
  // Current step
  currentStep: FormStep;
  
  // Error tracking
  errors: Record<string, string>;
}

export interface Niche {
  id: string;
  name: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
}

export interface ServiceSubcategory {
  id: string;
  name: string;
}

export interface Tool {
  id: string;
  name: string;
}

export interface ReferralSource {
  id: string;
  name: string;
}

export interface ServiceCategoryWithRelations extends ServiceCategory {
  subcategories: ServiceSubcategory[];
  tools: Tool[];
}
