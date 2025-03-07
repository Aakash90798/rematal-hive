
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTASection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white/50"></div>
      
      <div className="container-custom relative z-10">
        <div 
          ref={ref}
          className={`relative max-w-4xl mx-auto bg-gradient-to-r from-rematal-dark to-rematal-dark/90 rounded-2xl overflow-hidden p-12 shadow-xl transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-rematal-orange/20 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rematal-blue/20 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-rematal-orange/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rematal-blue/10 rounded-full"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span>Join 500+ freelancers already on Rematal</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Your Work Deserves <span className="text-rematal-orange">Better</span>
            </h2>
            
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Stop jumping through hoops for unreliable clients. Join Rematal to work with serious brands, 
              secure guaranteed payments, and build a reputation that brings quality projects to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-rematal-orange hover:bg-rematal-orange/90 text-white rounded-full px-8 py-7 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full sm:w-auto">
                Start Your Application <ArrowRight className="ml-2" />
              </Button>
              
              <button className="text-white/90 hover:text-white font-medium flex items-center gap-2 px-6 py-2 transition-colors w-full sm:w-auto justify-center">
                Learn how it works
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
