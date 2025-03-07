
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PerksSection from "@/components/PerksSection";
import CategoriesSection from "@/components/CategoriesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full">
      {isLoading ? (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-rematal-orange/30 border-t-rematal-orange animate-spin mb-4"></div>
            <span className="text-lg font-display font-medium">Loading Rematal...</span>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <ProblemSection />
            <AboutSection />
            <HowItWorksSection />
            <PerksSection />
            <CategoriesSection />
            <CTASection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
