
import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EmailCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
}

const EmailCollectionDialog = ({ open, onOpenChange, feature }: EmailCollectionDialogProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Notification Set!",
        description: `We'll notify you as soon as ${feature} is available.`,
      });
      onOpenChange(false);
      setEmail('');
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="relative">
          <button 
            onClick={() => onOpenChange(false)} 
            className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-xl font-bold">Get Notified</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-rematal-gray mb-4">
            Be the first to know when our {feature} feature launches. We'll send you a notification as soon as it's available.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-rematal-dark mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rematal-blue focus:border-transparent"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-rematal-blue hover:bg-rematal-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Notify Me'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCollectionDialog;
