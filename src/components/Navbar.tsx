
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Logo from './Logo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  
  // Determine if we're on a page where we shouldn't show certain nav items
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/verify-email';

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

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleMobileNavClick();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white border-b border-gray-200 shadow-md max-sm:py-1 py-2' : 'bg-transparent max-sm:py-2 py-3'}`}>
      <div className="container-custom flex items-center justify-between">
        <Logo/>

        <nav className="hidden lg:flex items-center space-x-8">
          {!isAuthPage && (
            <>
              <a href="/#problem" className="text-rematal-dark/70 hover:text-rematal-dark font-medium transition-colors">Why Rematal</a>
              <a href="/#features" className="text-rematal-dark/70 hover:text-rematal-dark font-medium transition-colors">Features</a>
              <a href="/#process" className="text-rematal-dark/70 hover:text-rematal-dark font-medium transition-colors">Process</a>
              <a href="/#faq" className="text-rematal-dark/70 hover:text-rematal-dark font-medium transition-colors">FAQs</a>
              <a href="/#contact" className="text-rematal-dark/70 hover:text-rematal-dark font-medium transition-colors">Contact</a>
            </>
          )}
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <>
              <Button variant="outline" className="rounded-full px-6" asChild>
                <Link to="/dashboard">
                  <User size={18} className="mr-2" />
                  Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              {!isAuthPage && (
                <Button variant="outline" className="rounded-full px-6" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
              {!user && !isAuthPage && (
                <Button className="bg-rematal-primary hover:bg-rematal-primary/90 text-white rounded-full px-6">
                  <Link to="/apply">Apply Now</Link>
                </Button>
              )}
            </>
          )}
        </div>

        <button
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white text-rematal-dark z-[60]"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - updated to make buttons full width */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-white pt-20 overflow-y-auto flex flex-col w-full">
          <div className="container-custom flex-1 flex flex-col w-full">
            <nav className="flex flex-col space-y-5 py-6 w-full">
              {!isAuthPage && (
                <>
                  <a
                    href="/#problem"
                    className="p-4 rounded-lg bg-gray-50 text-lg font-medium text-rematal-dark block w-full text-center"
                    onClick={handleMobileNavClick}
                  >
                    Why Rematal
                  </a>
                  <a
                    href="/#features"
                    className="p-4 rounded-lg bg-gray-50 text-lg font-medium text-rematal-dark block w-full text-center"
                    onClick={handleMobileNavClick}
                  >
                    Features
                  </a>
                  <a
                    href="/#process"
                    className="p-4 rounded-lg bg-gray-50 text-lg font-medium text-rematal-dark block w-full text-center"
                    onClick={handleMobileNavClick}
                  >
                    Process
                  </a>
                  <a
                    href="/#faq"
                    className="p-4 rounded-lg bg-gray-50 text-lg font-medium text-rematal-dark block w-full text-center"
                    onClick={handleMobileNavClick}
                  >
                    FAQs
                  </a>
                  <a
                    href="/#contact"
                    className="p-4 rounded-lg bg-gray-50 text-lg font-medium text-rematal-dark block w-full text-center"
                    onClick={scrollToContact}
                  >
                    Contact
                  </a>
                </>
              )}
              
              <div className="pt-4 w-full space-y-3">
                {user ? (
                  <Button
                    className="bg-rematal-primary hover:bg-rematal-primary/90 text-white rounded-full w-full py-6 text-lg"
                    onClick={handleMobileNavClick}
                    asChild
                  >
                    <Link to="/dashboard" className="w-full block">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    {!isAuthPage && (
                      <Button
                        variant="outline"
                        className="w-full py-6 text-lg rounded-full text-rematal-primary"
                        onClick={handleMobileNavClick}
                        asChild
                      >
                        <Link to="/login" className="w-full block">Login</Link>
                      </Button>
                    )}
                    {!isAuthPage && (
                      <Button
                        className="bg-rematal-primary hover:bg-rematal-primary/90 text-white rounded-full w-full py-6 text-lg"
                        onClick={handleMobileNavClick}
                        asChild
                      >
                        <Link to="/apply" className="w-full block">Apply Now</Link>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
