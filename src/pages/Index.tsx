
import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import FeaturesSection from "@/components/features/FeaturesSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import "../styles/animations.css";

const Index = () => {

  // Clean up body overflow when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
          <Navbar />
          <main className="overflow-x-hidden">
            <HeroSection />
            <ProblemSection />
            <FeaturesSection />
            <FAQSection />
            <CTASection />
          </main>
          <Footer />
    </div>
  );
};

export default Index;
