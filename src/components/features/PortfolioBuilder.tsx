
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
      className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-12 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-full lg:w-1/2 order-2 lg:order-1">
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rematal-light-purple rounded-full">
              <Layout className="w-6 h-6 text-rematal-blue" />
            </div>
            <h3 className="text-xl font-bold">Portfolio Showcase</h3>
          </div>
          
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-gray-50 to-rematal-light-purple">
            <div className="grid grid-cols-2 gap-3 p-4">
              <div className="col-span-2">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <div className="font-medium">My Portfolio</div>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="w-full h-24 bg-gray-100 rounded-md flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-300" />
                  </div>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-full h-16 bg-rematal-light-green rounded-md flex items-center justify-center">
                    <Image className="w-4 h-4 text-rematal-green" />
                  </div>
                </div>
              </div>
              
              <div className="col-span-1">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-full h-16 bg-rematal-light-purple rounded-md flex items-center justify-center">
                    <Image className="w-4 h-4 text-rematal-blue" />
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 flex justify-end">
                <div className="px-4 py-2 bg-rematal-orange text-white text-xs rounded-full">
                  Build Your Portfolio
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 order-1 lg:order-2 p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Professional <span className="text-gradient">Portfolio Builder</span></h2>
        <p className="text-base md:text-lg text-rematal-gray mb-6">Showcase your best work to attract premium D2C clients with an elegant portfolio.</p>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-purple rounded-full mr-3 mt-1">
              <Layout className="w-4 h-4 text-rematal-blue" />
            </div>
            <p className="text-sm">Customizable portfolio templates</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-purple rounded-full mr-3 mt-1">
              <Image className="w-4 h-4 text-rematal-blue" />
            </div>
            <p className="text-sm">Highlight your best D2C projects</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-purple rounded-full mr-3 mt-1">
              <Eye className="w-4 h-4 text-rematal-blue" />
            </div>
            <p className="text-sm">Attract more high-quality clients</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
