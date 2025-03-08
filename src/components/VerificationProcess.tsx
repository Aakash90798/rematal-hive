
import { useInView } from 'react-intersection-observer';
import { Pencil, Video, Rocket } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { APP_CONSTANTS } from '@/constants';

interface VerificationStepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: string;
  isActive?: boolean;
}

const VerificationStep = ({ number, title, description, icon, delay, isActive }: VerificationStepProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-8 transition-all duration-700 transform ${delay} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:shadow-xl hover:-translate-y-1 group`}
    >
      <div className="absolute -top-1 -right-2 bg-gradient-to-br from-rematal-primary to-rematal-blue w-14 h-14 max-sm:h-10 max-sm:w-10 rounded-full flex items-center justify-center text-xl max-sm:text-lg font-medium text-white shadow-md">
        {number}
      </div>
      <div className="mb-6 bg-gradient-to-br from-rematal-primary/10 to-rematal-blue/10 w-16 h-16 max-sm:w-12 max-sm:h-12 rounded-full flex items-center justify-center transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl max-sm:text-lg font-bold mb-3 group-hover:text-rematal-primary transition-colors">{title}</h3>
      <p className="text-rematal-gray text-base max-sm:text-base leading-relaxed">{description}</p>
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
      icon: <Pencil className="h-7 w-7 max-sm:h-6 max-sm:w-6 text-rematal-primary group-hover:text-rematal-blue transition-colors duration-300" />,
      delay: "delay-100"
    },
    {
      number: 2,
      title: "Video Assessment",
      description: "Help us understand your expertise, experience, and problem-solving approach so we can match you with the best-fit eCommerce & D2C projects.",
      icon: <Video className="h-7 w-7 max-sm:h-6 max-sm:w-6 text-rematal-primary group-hover:text-rematal-blue transition-colors duration-300" />,
      delay: "delay-200"
    },
    {
      number: 3,
      title: "Platform Approval",
      description: "Get approved to join the platform and start getting exclusive projects that match your expertise!",
      icon: <Rocket className="h-7 w-7 max-sm:h-6 max-sm:w-6 text-rematal-primary group-hover:text-rematal-blue transition-colors duration-300" />,
      delay: "delay-300"
    }
  ];

  return (
    <section id="process" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-rematal-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rematal-blue/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              ref={ref}
              className={`transition-all duration-700 max-md:text-center ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 max-md:w-fit mx-auto">
                Simple <span className="text-gradient bg-gradient-to-r from-rematal-primary to-rematal-blue">Verification</span> Process
              </h2>
              <p className="text-base text-rematal-gray transition-all duration-700 delay-100 mb-10 leading-relaxed max-w-xl max-md:mx-auto max-md:text-center">
                Get verified and start connecting with quality D2C brands in India. Our simple 3-step process ensures you're matched with projects that align with your expertise.
              </p>
              <Button
                className="bg-gradient-to-r from-rematal-primary to-rematal-blue hover:from-rematal-primary/90 hover:to-rematal-blue/90 text-white rounded-full px-8 py-7 max-md:px-7 max-md:py-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg max-sm:text-base max-sm:w-full"
              >
                Start your application
              </Button>
              <div className="mt-16 grid grid-cols-2 max-sm:gap-5 gap-8 text-center">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg">
                  <p className="text-2xl max-sm:text-xl font-bold bg-gradient-to-r from-rematal-primary to-rematal-blue bg-clip-text text-transparent mb-4">{APP_CONSTANTS.currFreelancersCount}+</p>
                  <p className="text-rematal-gray text-lg max-sm:text-base">Freelancers Onboarded</p>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg">
                  <p className="text-2xl max-sm:text-xl font-bold bg-gradient-to-r from-rematal-primary to-rematal-blue bg-clip-text text-transparent mb-4">100%</p>
                  <p className="text-rematal-gray text-lg max-sm:text-base">Money-Safety</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-16">
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


      </div>
    </section>
  );
};

export default VerificationProcess;
