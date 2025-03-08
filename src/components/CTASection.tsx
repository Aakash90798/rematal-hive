
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { APP_CONSTANTS } from "@/constants";

const CTASection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const benefits = [
    "Secure guaranteed payments",
    "Work with serious D2C brands only",
    "Build a reputation that brings quality work",
    "Collaborative community of experts"
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white/50"></div>
      
      <div className="container-custom relative z-10">
        <div 
          ref={ref}
          className={`relative max-w-4xl mx-auto bg-gradient-to-r from-rematal-dark to-rematal-dark/90 rounded-2xl overflow-hidden p-8 md:p-12 shadow-xl transition-all duration-700 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-rematal-primary/20 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rematal-blue/20 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-rematal-primary/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rematal-blue/10 rounded-full"></div>
          
          <div className="relative z-10 md:flex gap-8 items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span>Join {APP_CONSTANTS.currFreelancersCount}+ freelancers already on Rematal</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Your Work Deserves <span className="text-rematal-primary">Better</span>
              </h2>
              
              <p className="text-lg text-white/80 mb-6 max-w-xl">
              Join India's premier verified D2C talent marketplace and connect with the country's most innovative brands looking for your specific skills.
              </p>
              
            </div>
            
            <div className="md:w-2/5 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              
              <div className="space-y-3 text-center">
                <Button className="mb-5 bg-rematal-primary hover:bg-rematal-primary/90 text-white text-[1em] rounded-full px-6 py-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full">
                  Start Your Application
                </Button>
                <a href="#process" className="text-white/80 hover:text-white text-[0.8em] transition-colors">Learn how it works →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
