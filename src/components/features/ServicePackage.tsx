
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
      className={`flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-12 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-full lg:w-1/2 p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Service <span className="text-gradient">Package Builder</span></h2>
        <p className="text-base md:text-lg text-rematal-gray mb-6">Create clear service offerings that clients can easily understand and purchase.</p>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="p-1 bg-rematal-orange/20 rounded-full mr-3 mt-1">
              <Package className="w-4 h-4 text-rematal-orange" />
            </div>
            <p className="text-sm">Structure your services into tiered packages</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-orange/20 rounded-full mr-3 mt-1">
              <Tag className="w-4 h-4 text-rematal-orange" />
            </div>
            <p className="text-sm">Set transparent pricing for all offerings</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-orange/20 rounded-full mr-3 mt-1">
              <Layers className="w-4 h-4 text-rematal-orange" />
            </div>
            <p className="text-sm">Clarify deliverables and turnaround times</p>
          </li>
        </ul>
      </div>
      
      <div className="w-full lg:w-1/2">
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rematal-orange/20 rounded-full">
              <Package className="w-6 h-6 text-rematal-orange" />
            </div>
            <h3 className="text-xl font-bold">Service Packages</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="font-medium text-center mb-2">Basic</div>
              <div className="text-center text-rematal-orange font-bold text-xl mb-4">₹4,999</div>
              <div className="space-y-2">
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-orange/20 flex-shrink-0"></div>
                  <span>3 Concepts</span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-orange/20 flex-shrink-0"></div>
                  <span>1 Revision</span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-orange/20 flex-shrink-0"></div>
                  <span>5 Day Delivery</span>
                </div>
              </div>
            </div>
            
            <div className="bg-rematal-light-purple p-4 rounded-xl border border-rematal-blue/20">
              <div className="font-medium text-center mb-2">Standard</div>
              <div className="text-center text-rematal-blue font-bold text-xl mb-4">₹9,999</div>
              <div className="space-y-2">
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-blue/20 flex-shrink-0"></div>
                  <span>5 Concepts</span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-blue/20 flex-shrink-0"></div>
                  <span>3 Revisions</span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-blue/20 flex-shrink-0"></div>
                  <span>3 Day Delivery</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="font-medium text-center mb-2">Premium</div>
              <div className="text-center text-rematal-green font-bold text-xl mb-4">₹19,999</div>
              <div className="space-y-2">
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-green/20 flex-shrink-0"></div>
                  <span>Unlimited Concepts</span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-green/20 flex-shrink-0"></div>
                  <span>Unlimited Revisions</span>
                </div>
                <div className="text-xs flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rematal-green/20 flex-shrink-0"></div>
                  <span>1 Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePackage;
