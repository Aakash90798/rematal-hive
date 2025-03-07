
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20">
      <div className="container-custom">
        <div 
          ref={ref}
          className={`relative max-w-4xl mx-auto bg-rematal-dark rounded-2xl overflow-hidden text-white p-12 shadow-xl transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-rematal-orange/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rematal-blue/20 rounded-full filter blur-3xl opacity-30"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your Work Deserves Better
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Stop jumping through hoops for unreliable clients. Join Rematal to work with serious brands, secure guaranteed payments, and build a reputation that brings quality projects to your doorstep.
            </p>
            <Button className="bg-rematal-orange hover:bg-rematal-orange/90 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              Start Your Application <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
