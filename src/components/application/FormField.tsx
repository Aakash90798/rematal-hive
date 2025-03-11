
import React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FormField = ({ id, label, error, required = false, className, children }: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="text-base font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormField;
