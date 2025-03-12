import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/ui/loading-button";

interface FormStepButtonsProps {
  onBack?: () => void;
  onContinue: () => void;
  loading?: boolean;
  disabled?: boolean;
  showBack?: boolean;
}

const FormStepButtons = ({
  onBack,
  onContinue,
  loading = false,
  disabled = false,
  showBack = true
}: FormStepButtonsProps) => {
  return (
    <div className="mt-8 flex items-center gap-4">
      {showBack && (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="h-12 w-12 p-0"
          disabled={loading}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      )}
      <LoadingButton
        type="button"
        className="flex-1 bg-rematal-primary hover:bg-rematal-primary/90 text-white py-6"
        onClick={onContinue}
        loading={loading}
        disabled={disabled}
      >
        Continue →
      </LoadingButton>
    </div>
  );
}

export default FormStepButtons; 