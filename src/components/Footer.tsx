
import { useInView } from 'react-intersection-observer';
import { Mail } from 'lucide-react';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer 
      ref={ref}
      id="contact"
      className={`bg-gradient-to-r from-gray-50 to-white/50 py-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container-custom">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-rematal-dark">Contact Us</h2>
          <div className="flex items-center gap-2 text-rematal-primary">
            <Mail className="h-5 w-5" />
            <a href="mailto:support@rematal.com" className="text-rematal-primary hover:underline">
              support@rematal.com
            </a>
          </div>
          <p className="text-center mt-4 max-w-lg text-rematal-gray">
            We actively listen to all your emails and encourage you to send us your problems, feedback, and feature requests.
            We're committed to making Rematal better with your input.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 border-t border-gray-200 pt-6">
          <div className="text-sm text-rematal-gray">
            © {new Date().getFullYear()} Rematal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
