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

export interface ApplicationFormState {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  city: string;
  hasExperience: boolean | null;
  yearsOfExperience: string | null;
  selectedNicheIds: string[];
  linkedinUrl: string;
  portfolioUrl: string;
  selectedServiceCategoryId: string;
  selectedSubcategoryIds: string[];
  selectedToolIds: string[];
  additionalInfo: string;
  moreInfo: string;
  skillsToolsRequested: string;
  referralSourceId: string;
  currentStep: FormStep;
  errors: Record<string, string>;
  shouldShowAdditionalInfo: boolean;
  toolsData: Tool[];
  subcategoriesData: ServiceSubcategory[];
}
