
import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import "../styles/animations.css";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Reduced loading time
    return () => clearTimeout(timer);
  }, []);

  // Clean up body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      {isLoading ? (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-rematal-primary/30 border-t-rematal-primary animate-spin mb-4"></div>
            <span className="text-lg font-display font-medium">Loading Rematal...</span>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="overflow-x-hidden">
            <HeroSection />
            <ProblemSection />
            <AboutSection />
            <FeaturesSection />
            <CTASection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
