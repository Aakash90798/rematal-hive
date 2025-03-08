
import { useInView } from 'react-intersection-observer';
import { Shield, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";

const EscrowPayments = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-full lg:w-1/2 order-2 lg:order-1">
        <div className="relative bg-rematal-light-purple p-5 md:p-8 rounded-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-2 bg-gradient-to-r from-rematal-orange to-rematal-blue text-white text-xs font-bold rounded-bl-lg">
            COMING SOON
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white rounded-full">
              <Shield className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="text-xl font-bold">Escrow Payments</h3>
          </div>
          
          <div className="flex items-center justify-center max-w-xs mx-auto my-8">
            <div className="relative w-full h-52">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <Lock className="w-10 h-10 text-rematal-blue" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-dashed border-white/30 rounded-full animate-spin-slow"></div>
            </div>
          </div>
          
          <p className="text-rematal-dark mb-6">Secure payment system that protects both freelancers and clients. Work with confidence knowing funds are securely held before work begins.</p>
          
          <div className="flex justify-center">
            <Button variant="outline" className="bg-white border-none shadow-sm hover:shadow hover:bg-white/90">
              Notify me when available
            </Button>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 order-1 lg:order-2 p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Guaranteed Payment <span className="text-gradient">Protection</span></h2>
        <p className="text-base md:text-lg text-rematal-gray mb-6">No more payment anxiety. Our upcoming escrow system ensures you'll always get paid for completed work.</p>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-purple rounded-full mr-3 mt-1">
              <Shield className="w-4 h-4 text-rematal-blue" />
            </div>
            <p className="text-sm">Funds verified before you start work</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-purple rounded-full mr-3 mt-1">
              <Shield className="w-4 h-4 text-rematal-blue" />
            </div>
            <p className="text-sm">Milestone-based payments for long projects</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-purple rounded-full mr-3 mt-1">
              <Shield className="w-4 h-4 text-rematal-blue" />
            </div>
            <p className="text-sm">Transparent payment process with no hidden fees</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EscrowPayments;
