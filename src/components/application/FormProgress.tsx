
import React from 'react';
import { FormStep } from '@/types/form';

const stepOrder: FormStep[] = [
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

interface FormProgressProps {
  currentStep: FormStep;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep }) => {
  // Don't show progress for success or rejection pages
  if (currentStep === 'success' || currentStep === 'rejection') {
    return null;
  }
  
  const currentIndex = stepOrder.indexOf(currentStep);
  const progress = Math.max(0, Math.min(100, (currentIndex / (stepOrder.length - 1)) * 100));
  
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2 text-xs">
        <span className="font-medium">Application Progress</span>
        <span className="text-gray-500">{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-rematal-primary rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FormProgress;
