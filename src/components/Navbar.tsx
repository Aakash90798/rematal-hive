
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
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleMobileNavClick = () => {
    // Close the menu
    setIsMobileMenuOpen(false);
    // Enable scrolling again
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-2xl font-display font-medium text-rematal-dark">rematal</span>
          <span className="text-2xl font-display font-medium text-rematal-primary">*</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#problem" className="text-rematal-dark/80 hover:text-rematal-dark font-medium transition-colors">Why Rematal</a>
          <a href="#features" className="text-rematal-dark/80 hover:text-rematal-dark font-medium transition-colors">Features</a>
        </nav>

        <div className="hidden md:block">
          <Button className="bg-rematal-primary hover:bg-rematal-primary/90 text-white rounded-full px-6">Apply Now</Button>
        </div>

        {/* Mobile menu button - increased z-index to ensure it's always clickable */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm text-rematal-dark z-[60]"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation - improved positioning, z-index and styling */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[55] bg-white pt-20 overflow-y-auto flex flex-col">
          <div className="container-custom flex-1 flex flex-col">
            <nav className="flex flex-col space-y-5 py-6">
              <a 
                href="#problem" 
                className="p-4 rounded-lg bg-gray-50 text-lg font-medium text-rematal-dark w-full text-center" 
                onClick={handleMobileNavClick}
              >
                Why Rematal
              </a>
              <a 
                href="#features" 
                className="p-4 rounded-lg bg-gray-50 text-lg font-medium text-rematal-dark w-full text-center" 
                onClick={handleMobileNavClick}
              >
                Features
              </a>
              <div className="pt-4 w-full">
                <Button 
                  className="bg-rematal-primary hover:bg-rematal-primary/90 text-white rounded-full w-full py-6 text-lg" 
                  onClick={handleMobileNavClick}
                >
                  Apply Now
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
