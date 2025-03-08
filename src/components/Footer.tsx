
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer 
      ref={ref}
      className={`bg-gray-50 py-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-display font-bold text-rematal-dark">Rematal</span>
            <div className="h-6 w-6 rounded-full bg-rematal-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">R</span>
            </div>
          </div>
          
          <div>
            <nav className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-4 md:space-y-0">
              <a href="#problem" className="text-rematal-dark/80 hover:text-rematal-dark transition-colors">The Dilemma</a>
              <a href="#about" className="text-rematal-dark/80 hover:text-rematal-dark transition-colors">About Rematal</a>
              <a href="#how-it-works" className="text-rematal-dark/80 hover:text-rematal-dark transition-colors">How It Works</a>
              <a href="#perks" className="text-rematal-dark/80 hover:text-rematal-dark transition-colors">Benefits</a>
              <a href="#categories" className="text-rematal-dark/80 hover:text-rematal-dark transition-colors">Talent Categories</a>
            </nav>
          </div>
          
          <div className="text-sm text-rematal-gray">
            © {new Date().getFullYear()} Rematal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
