
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 relative overflow-hidden bg-rematal-dark/5">
      <div className="container-custom relative z-10">
        <div 
          ref={ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Showcase Your D2C Expertise?
          </h2>
          
          <p className="text-lg text-rematal-gray max-w-2xl mx-auto mb-12">
            Join India's premier verified D2C talent marketplace and connect with 
            the country's most innovative brands looking for your specific skills.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-rematal-dark hover:bg-gray-100 border border-gray-200 px-8 py-6 h-auto text-lg rounded-md">
              Hire D2C Expert
            </Button>
            
            <Button className="bg-rematal-dark hover:bg-rematal-dark/90 text-white px-8 py-6 h-auto text-lg rounded-md">
              Get Verified <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
