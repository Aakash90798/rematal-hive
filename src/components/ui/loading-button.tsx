import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "@radix-ui/react-button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
}

export function LoadingButton({ 
  loading = false, 
  disabled,
  children,
  className,
  ...props 
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn("relative", className)}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
} 