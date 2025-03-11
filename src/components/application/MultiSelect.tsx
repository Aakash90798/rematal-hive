
import { useState, useRef, useEffect } from 'react';
import { CheckIcon, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  maxSelections?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const MultiSelect = ({
  options,
  selectedIds,
  onChange,
  maxSelections,
  placeholder = 'Select options',
  disabled = false,
  className,
  error
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOptions = options.filter(option => selectedIds.includes(option.id));
  const canSelectMore = !maxSelections || selectedIds.length < maxSelections;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleOption = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(selectedId => selectedId !== id));
    } else if (canSelectMore) {
      onChange([...selectedIds, id]);
    }
  };
  
  const removeOption = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onChange(selectedIds.filter(selectedId => selectedId !== id));
  };
  
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div
        className={cn(
          "min-h-10 w-full flex items-center flex-wrap gap-1 p-2 border rounded-md cursor-pointer",
          isOpen && "ring-2 ring-rematal-primary",
          error && "border-red-500",
          disabled && "bg-gray-100 cursor-not-allowed opacity-70",
          "border-input bg-background hover:bg-accent hover:text-accent-foreground"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedOptions.length > 0 ? (
          selectedOptions.map(option => (
            <div 
              key={option.id}
              className="flex items-center gap-1 py-0.5 px-2 bg-rematal-light-purple text-rematal-primary rounded"
            >
              <span className="text-sm">{option.name}</span>
              {!disabled && (
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-rematal-dark" 
                  onClick={(e) => removeOption(e, option.id)}
                />
              )}
            </div>
          ))
        ) : (
          <span className="text-gray-500 px-2">{placeholder}</span>
        )}
        
        <div className="ml-auto flex items-center">
          {maxSelections && (
            <span className="text-xs text-gray-500 mr-2">
              {selectedIds.length}/{maxSelections}
            </span>
          )}
          <ChevronDown size={16} className={cn("transition-transform", isOpen && "rotate-180")} />
        </div>
      </div>
      
      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map(option => {
            const isSelected = selectedIds.includes(option.id);
            return (
              <div
                key={option.id}
                className={cn(
                  "px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-gray-100",
                  isSelected ? "bg-rematal-light-purple text-rematal-primary" : "",
                  !isSelected && !canSelectMore && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => (!isSelected && !canSelectMore) ? null : toggleOption(option.id)}
              >
                <span>{option.name}</span>
                {isSelected && <CheckIcon size={16} />}
              </div>
            );
          })}
          
          {options.length === 0 && (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          )}
        </div>
      )}
      
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MultiSelect;
