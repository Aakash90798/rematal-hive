
import { useInView } from 'react-intersection-observer';
import { Package, Tag, Layers } from 'lucide-react';

const ServicePackage = () => {
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
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Service <span className="text-gradient">Package Builder</span></h2>
        <p className="text-base text-rematal-gray max-w-2xl mx-auto">Create clear service offerings that clients can easily understand.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rematal-primary/5 rounded-lg p-6 text-center">
            <div className="bg-rematal-primary/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-rematal-primary" />
            </div>
            <h3 className="font-bold mb-2">Tiered Packages</h3>
            <p className="text-sm text-rematal-gray">Structure services into basic, standard, and premium tiers</p>
          </div>
          
          <div className="bg-rematal-primary/5 rounded-lg p-6 text-center">
            <div className="bg-rematal-primary/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-6 h-6 text-rematal-primary" />
            </div>
            <h3 className="font-bold mb-2">Clear Pricing</h3>
            <p className="text-sm text-rematal-gray">Set transparent pricing for all service offerings</p>
          </div>
          
          <div className="bg-rematal-primary/5 rounded-lg p-6 text-center">
            <div className="bg-rematal-primary/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-rematal-primary" />
            </div>
            <h3 className="font-bold mb-2">Delivery Timeline</h3>
            <p className="text-sm text-rematal-gray">Specify clear deliverables and turnaround times</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePackage;
