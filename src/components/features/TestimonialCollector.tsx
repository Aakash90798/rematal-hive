
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
      className={`transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Testimonial <span className="text-gradient">Collector</span></h2>
        <p className="text-base text-rematal-gray max-w-2xl mx-auto">Build your professional reputation with verified client testimonials.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rematal-light-green/20 rounded-lg p-6 text-center">
            <div className="bg-rematal-light-green w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="font-bold mb-2">Feedback Requests</h3>
            <p className="text-sm text-rematal-gray">Automatically request feedback after completed projects</p>
          </div>
          
          <div className="bg-rematal-light-green/20 rounded-lg p-6 text-center">
            <div className="bg-rematal-light-green w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="font-bold mb-2">Verified Reviews</h3>
            <p className="text-sm text-rematal-gray">Display authenticated client reviews and ratings</p>
          </div>
          
          <div className="bg-rematal-light-green/20 rounded-lg p-6 text-center">
            <div className="bg-rematal-light-green w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="font-bold mb-2">Trust Building</h3>
            <p className="text-sm text-rematal-gray">Establish credibility with potential clients</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCollector;
