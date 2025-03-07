
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <span className="text-xl font-display font-bold text-rematal-dark">Rematal</span>
          <div className="h-6 w-6 rounded-full bg-rematal-orange flex items-center justify-center">
            <span className="text-white font-bold text-xs">R</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#problem" className="text-rematal-dark/80 hover:text-rematal-dark font-medium transition-colors">Why Rematal</a>
          <a href="#how-it-works" className="text-rematal-dark/80 hover:text-rematal-dark font-medium transition-colors">How It Works</a>
          <a href="#perks" className="text-rematal-dark/80 hover:text-rematal-dark font-medium transition-colors">Benefits</a>
          <a href="#categories" className="text-rematal-dark/80 hover:text-rematal-dark font-medium transition-colors">Categories</a>
        </nav>

        <div className="hidden md:block">
          <Button className="bg-rematal-orange hover:bg-rematal-orange/90 text-white rounded-full px-6">Apply Now</Button>
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleMobileMenu} className="md:hidden text-rematal-dark">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20">
          <nav className="container-custom flex flex-col space-y-6 py-8">
            <a href="#problem" className="text-xl font-medium text-rematal-dark" onClick={() => setIsMobileMenuOpen(false)}>Why Rematal</a>
            <a href="#how-it-works" className="text-xl font-medium text-rematal-dark" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <a href="#perks" className="text-xl font-medium text-rematal-dark" onClick={() => setIsMobileMenuOpen(false)}>Benefits</a>
            <a href="#categories" className="text-xl font-medium text-rematal-dark" onClick={() => setIsMobileMenuOpen(false)}>Categories</a>
            <Button className="bg-rematal-orange hover:bg-rematal-orange/90 text-white rounded-full w-full mt-4" onClick={() => setIsMobileMenuOpen(false)}>
              Apply Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
