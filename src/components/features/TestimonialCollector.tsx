
import { useInView } from 'react-intersection-observer';
import { MessageCircle, Star, Quote } from 'lucide-react';

const TestimonialCollector = () => {
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
            <div className="p-3 bg-rematal-light-green rounded-full">
              <Star className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="text-xl font-bold">Client Testimonials</h3>
          </div>
          
          <div className="space-y-4">
            <div className="bg-rematal-light-green/30 p-4 rounded-lg relative">
              <Quote className="absolute top-2 right-2 w-4 h-4 text-rematal-green/20" />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rematal-green/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-rematal-green font-bold">A</span>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="font-medium mr-2">Acme D2C</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-rematal-green" fill="#10B981" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-rematal-gray">Outstanding work! Delivered our brand redesign ahead of schedule with exceptional quality.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg relative">
              <Quote className="absolute top-2 right-2 w-4 h-4 text-gray-200" />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-rematal-blue/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-rematal-blue font-bold">B</span>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <div className="font-medium mr-2">Best Beauty</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-rematal-blue" fill={i < 4 ? "#4172FF" : "none"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-rematal-gray">Great communication throughout our packaging design project. Would hire again!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 order-1 lg:order-2 p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Testimonial <span className="text-gradient">Collector</span></h2>
        <p className="text-base md:text-lg text-rematal-gray mb-6">Build your professional reputation with verified client testimonials.</p>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-green rounded-full mr-3 mt-1">
              <MessageCircle className="w-4 h-4 text-rematal-green" />
            </div>
            <p className="text-sm">Automatically request feedback after projects</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-green rounded-full mr-3 mt-1">
              <Star className="w-4 h-4 text-rematal-green" />
            </div>
            <p className="text-sm">Showcase verified client reviews</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-green rounded-full mr-3 mt-1">
              <Quote className="w-4 h-4 text-rematal-green" />
            </div>
            <p className="text-sm">Build trust with potential clients</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestimonialCollector;
