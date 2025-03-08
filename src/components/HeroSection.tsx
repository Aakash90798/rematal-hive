
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import bgImage from '../assets/bg-checkboxes.png';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative pt-32 pb-20 overflow-hidden min-h-[80vh] flex flex-col justify-center mt-[60px]"
    style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 z-0"></div>
      <div className="absolute top-32 -right-32 w-64 h-64 bg-rematal-light-purple rounded-full filter blur-3xl opacity-50 z-0"></div>
      <div className="absolute bottom-32 -left-32 w-64 h-64 bg-rematal-light-green rounded-full filter blur-3xl opacity-50 z-0"></div>

      <div className="container-custom relative z-10 h-fit">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`mb-4 inline-flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <span className="mx-2 text-sm font-medium">India's First D2C Talent Marketplace</span>
          </div>
          <h1 className={`text-[38px] md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Where D2C talent meets <span className="text-gradient">quality clients</span>
          </h1>

          <p className={`text-2xl max-md:text-xl max-sm:text-lg text-rematal-gray mb-16 max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            Get verified. Connect with top D2C brands. Elevate your career.
          </p>

          <div className={`flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            {/* <Button variant="outline" className="border-gray-200 hover:bg-gray-50 text-[1em] rounded-full px-6 py-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all w-full sm:w-auto">
              Looking to Hire Talent
            </Button> */}
            <Button className="bg-rematal-primary hover:bg-rematal-primary/90 text-white text-[1em] rounded-full px-6 py-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto">
              Join as a Freelancer <ArrowRight size={16} className="ml-2" />
            </Button>

          </div>

          <div className={`max-md:hidden flex flex-col md:flex-row items-center justify-center gap-6 text-sm transition-all duration-700 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center text-rematal-gray">
              <CheckCircle size={16} className="text-rematal-green mr-2" />
              <span>Pre-vetted quality brands</span>
            </div>
            <div className="flex items-center text-rematal-gray">
              <CheckCircle size={16} className="text-rematal-green mr-2" />
              <span>Comprehensive project tools</span>
            </div>
            <div className="flex items-center text-rematal-gray">
              <CheckCircle size={16} className="text-rematal-green mr-2" />
              <span>Guaranteed payment via escrow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
