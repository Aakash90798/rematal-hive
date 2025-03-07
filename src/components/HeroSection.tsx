
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0"></div>
      <div className="absolute top-32 -right-32 w-64 h-64 bg-rematal-light-purple rounded-full filter blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-32 -left-32 w-64 h-64 bg-rematal-light-green rounded-full filter blur-3xl opacity-50 z-0"></div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center bg-white border border-gray-100 rounded-full px-4 py-2 mb-8 shadow-sm transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <span className="bg-rematal-light-green text-rematal-green text-xs font-medium px-3 py-1 rounded-full">NEW</span>
            <span className="mx-2 text-sm font-medium">India's first dedicated D2C talent marketplace</span>
            <div className="flex -space-x-1 opacity-75">
              <div className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white"></div>
              <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="w-5 h-5 rounded-full bg-gray-400 border-2 border-white"></div>
            </div>
          </div>

          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Where D2C talent meets <span className="text-gradient">quality clients</span>
          </h1>

          <p className={`text-lg text-rematal-gray mb-8 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Rematal connects skilled D2C freelancers with verified brands, secures your payments upfront, and builds your professional reputation with every project.
          </p>

          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <Button className="bg-rematal-orange hover:bg-rematal-orange/90 text-white rounded-full px-6 py-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto">
              Join as a Freelancer <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button variant="outline" className="border-gray-200 hover:bg-gray-50 rounded-full px-6 py-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all w-full sm:w-auto">
              Looking to Hire Talent
            </Button>
          </div>

          <div className={`flex flex-col md:flex-row items-center justify-center gap-6 text-sm transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center text-rematal-gray">
              <CheckCircle size={16} className="text-rematal-green mr-2" />
              <span>Pre-vetted quality brands</span>
            </div>
            <div className="flex items-center text-rematal-gray">
              <CheckCircle size={16} className="text-rematal-green mr-2" />
              <span>Guaranteed payment via escrow</span>
            </div>
            <div className="flex items-center text-rematal-gray">
              <CheckCircle size={16} className="text-rematal-green mr-2" />
              <span>Comprehensive project tools</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
