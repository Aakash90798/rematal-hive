
import { useInView } from 'react-intersection-observer';
import { Image, Layout, Eye } from 'lucide-react';

const PortfolioBuilder = () => {
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
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Professional <span className="text-gradient">Portfolio Builder</span></h2>
        <p className="text-base text-rematal-gray max-w-2xl mx-auto">Showcase your best work to attract premium D2C clients.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rematal-light-purple/20 rounded-lg p-6 text-center">
            <div className="bg-rematal-light-purple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layout className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="font-bold mb-2">Custom Templates</h3>
            <p className="text-sm text-rematal-gray">Choose from elegant, customizable portfolio templates</p>
          </div>
          
          <div className="bg-rematal-light-purple/20 rounded-lg p-6 text-center">
            <div className="bg-rematal-light-purple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="font-bold mb-2">Project Showcase</h3>
            <p className="text-sm text-rematal-gray">Highlight your best D2C work with rich media options</p>
          </div>
          
          <div className="bg-rematal-light-purple/20 rounded-lg p-6 text-center">
            <div className="bg-rematal-light-purple w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="font-bold mb-2">Client Visibility</h3>
            <p className="text-sm text-rematal-gray">Increase your visibility to attract high-quality clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
