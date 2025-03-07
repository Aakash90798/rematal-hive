
import { useInView } from 'react-intersection-observer';
import { CircleCheck, MessageSquare, Wallet, FileCheck, Trophy, CornerRightDown } from 'lucide-react';

const StepCard = ({ 
  number, 
  title, 
  description, 
  icon, 
  delay 
}: { 
  number: number; 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  delay: string;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`flex transition-all duration-700 ${delay} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="mr-4 flex flex-col items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-rematal-orange text-white font-bold text-lg">
          {number}
        </div>
        {number < 6 && <div className="w-0.5 h-full bg-gray-200 mt-2"></div>}
      </div>
      <div className="flex-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start">
          <div className="shrink-0 mr-4">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">{title}</h3>
            <p className="text-rematal-gray">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      title: "Apply & Get Vetted",
      description: "Submit your portfolio and D2C experience for review by our team",
      icon: <CircleCheck className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Build Your Profile",
      description: "Showcase your best D2C work, services, and specializations",
      icon: <FileCheck className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Connect With Brands",
      description: "Start receiving project opportunities from verified D2C companies",
      icon: <CornerRightDown className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Collaborate Seamlessly",
      description: "Manage projects in our dedicated workroom with all tools in one place",
      icon: <MessageSquare className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Get Paid Securely",
      description: "Work with confidence knowing funds are in escrow before you start",
      icon: <Wallet className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Grow Your Reputation",
      description: "Build your professional standing with each successful project",
      icon: <Trophy className="h-6 w-6 text-rematal-blue" />
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={ref}
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Your Journey to <span className="text-gradient">Better Work</span>
          </h2>
          <p 
            className={`text-lg text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            A straightforward process designed for serious D2C professionals
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              icon={step.icon}
              delay={`delay-[${(index + 1) * 100}ms]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
