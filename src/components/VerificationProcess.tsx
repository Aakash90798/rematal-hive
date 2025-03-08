
import { useInView } from 'react-intersection-observer';
import { Pencil, Video, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface VerificationStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
}

const VerificationStep = ({ number, title, description, icon, delay }: VerificationStepProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref} 
      className={`relative bg-white rounded-xl shadow-sm p-6 transition-all duration-700 ${delay} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="absolute -top-4 -right-4 bg-rematal-light-green text-rematal-green w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
        {number}
      </div>
      <div className="mb-4 bg-rematal-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-rematal-gray text-sm">{description}</p>
    </div>
  );
};

const VerificationProcess = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      number: 1,
      title: "Apply",
      description: "Fill out our application form with your professional details and D2C experience.",
      icon: <Pencil className="h-6 w-6 text-rematal-primary" />,
      delay: "delay-100"
    },
    {
      number: 2,
      title: "Video Assessment",
      description: "Help us understand your expertise, experience, and problem-solving approach so we can match you with the best-fit eCommerce & D2C projects.",
      icon: <Video className="h-6 w-6 text-rematal-primary" />,
      delay: "delay-200"
    },
    {
      number: 3,
      title: "Platform Approval",
      description: "Get approved to join the platform and start getting exclusive projects that match your expertise!",
      icon: <Rocket className="h-6 w-6 text-rematal-primary" />,
      delay: "delay-300"
    }
  ];

  return (
    <section id="verification-process" className="py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50"></div>
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div 
              ref={ref}
              className={`transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Simple <span className="text-gradient">Verification</span> Process
              </h2>
              <p className="text-lg text-rematal-gray mb-8">
                Get verified and start connecting with quality D2C brands in India. Our simple 3-step process ensures you're matched with projects that align with your expertise.
              </p>
              <Button className="bg-rematal-primary hover:bg-rematal-primary/90 text-white rounded-full px-6 py-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                Start your application
              </Button>
            </div>
          </div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <VerificationStep 
                key={index}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                delay={step.delay}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-rematal-primary mb-2">875+</p>
            <p className="text-rematal-gray">Freelancers Onboarded</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-3xl font-bold text-rematal-primary mb-2">100%</p>
            <p className="text-rematal-gray">Money-Safety</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationProcess;
