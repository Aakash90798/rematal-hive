
import { useInView } from 'react-intersection-observer';
import { Shield, Lock, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const EscrowPayments = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Guaranteed Payment <span className="text-gradient">Protection</span></h2>
        <p className="text-base text-rematal-gray max-w-2xl mx-auto">No more payment anxiety. Our upcoming escrow system ensures you'll always get paid for completed work.</p>
        <div className="inline-block bg-gradient-to-r from-rematal-primary to-rematal-blue text-white text-xs font-bold px-3 py-1 rounded-full mt-4">
          COMING SOON
        </div>
      </div>
      
      <div className="bg-rematal-light-purple/30 rounded-xl shadow-sm p-6 md:p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="bg-rematal-light-purple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="font-bold mb-2">Verified Funds</h3>
            <p className="text-sm text-rematal-gray">Funds are secured before you start your work</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="bg-rematal-light-purple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="font-bold mb-2">Milestone Payments</h3>
            <p className="text-sm text-rematal-gray">Get paid in stages for long-term projects</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="bg-rematal-light-purple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="font-bold mb-2">No Hidden Fees</h3>
            <p className="text-sm text-rematal-gray">Transparent payment process from start to finish</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="bg-white border-none shadow-sm hover:shadow hover:bg-white/90">
            <AlertCircle className="w-4 h-4 mr-2" />
            Notify me when available
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EscrowPayments;
