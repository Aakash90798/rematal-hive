
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer 
      ref={ref}
      className={`bg-gradient-to-r from-gray-50 to-white/50 py-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="text-sm text-rematal-gray">
            © {new Date().getFullYear()} Rematal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
