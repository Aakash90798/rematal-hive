
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

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
          <div className="absolute top-0 left-0 w-64 h-64 bg-rematal-orange/20 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-rematal-blue/20 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-20"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-rematal-orange/10 rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rematal-blue/10 rounded-full"></div>
          
          <div className="relative z-10 md:flex gap-8 items-center">
            <div className="md:w-3/5 mb-8 md:mb-0 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                <span>Join 500+ freelancers already on Rematal</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
                Your Work Deserves <span className="text-rematal-orange">Better</span>
              </h2>
              
              <p className="text-lg text-white/80 mb-6 max-w-xl">
                Stop jumping through hoops for unreliable clients. Join Rematal to work with serious brands, 
                secure guaranteed payments, and build a reputation.
              </p>
              
              <ul className="space-y-2 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center text-white/90">
                    <CheckCircle className="h-5 w-5 mr-2 text-rematal-orange flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="md:w-2/5 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold mb-4 text-white">Start Your Journey Today</h3>
              <p className="text-white/80 mb-6">
                Join our community of specialized D2C experts and get connected with quality clients
              </p>
              
              <div className="space-y-3">
                <Button className="bg-rematal-orange hover:bg-rematal-orange/90 text-white rounded-full px-6 py-6 text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all w-full">
                  Start Your Application <ArrowRight className="ml-2" />
                </Button>
                
                <button className="text-white/90 hover:text-white font-medium flex items-center justify-center gap-2 px-6 py-2 transition-colors w-full">
                  Learn how it works
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
