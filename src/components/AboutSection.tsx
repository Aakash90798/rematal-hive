
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    "Verified brands only — serious D2C clients that value quality work",
    "Escrow payment system — your money is secured before you start work",
    "Comprehensive workroom — all files, chats, and milestones in one place",
    "Merit-based reputation — every completed project builds your professional profile"
  ];

  return (
    <section id="about" className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            ref={ref}
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-rematal-light-purple rounded-full filter blur-3xl opacity-30 z-0"></div>
              <div className="relative z-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rematal-light-green p-6 rounded-xl">
                    <div className="text-4xl font-bold text-rematal-green">1+</div>
                    <div className="text-sm text-rematal-dark mt-2">Years D2C Experience Required</div>
                  </div>
                  <div className="bg-rematal-light-purple p-6 rounded-xl">
                    <div className="text-4xl font-bold text-rematal-blue">100%</div>
                    <div className="text-sm text-rematal-dark mt-2">Payment Security</div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="text-4xl font-bold text-rematal-dark">4</div>
                    <div className="text-sm text-rematal-dark mt-2">Expert Categories</div>
                  </div>
                  <div className="bg-rematal-primary/10 p-6 rounded-xl">
                    <div className="text-4xl font-bold text-rematal-primary">24/7</div>
                    <div className="text-sm text-rematal-dark mt-2">Project Tracking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet <span className="text-gradient">Rematal</span>
            </h2>
            <p className="text-lg text-rematal-gray mb-8">
              Not just another marketplace — Rematal is the platform built specifically for Indian D2C freelancers who deserve better clients, reliable payments, and professional recognition.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-rematal-green shrink-0 mt-1" />
                  <p className="ml-3 text-base text-rematal-dark">{feature}</p>
                </div>
              ))}
            </div>

            <p className="text-rematal-dark font-medium mb-6">
              With 1+ year of D2C experience? You've found your professional home.
            </p>

            <Button className="bg-rematal-primary hover:bg-rematal-primary/90 text-white rounded-full px-6">
              Join Rematal Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
