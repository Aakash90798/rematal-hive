
import { useInView } from 'react-intersection-observer';
import { Shield, CreditCard, Users, Award } from 'lucide-react';

const PerkCard = ({ 
  title, 
  description, 
  icon, 
  delay 
}: { 
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
      className={`bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${inView ? `opacity-100 translate-y-0 ${delay}` : 'opacity-0 translate-y-8'}`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-rematal-light-purple mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-rematal-gray">{description}</p>
    </div>
  );
};

const PerksSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const perks = [
    {
      title: "Verified Badge",
      description: "Proof you're vetted and trusted by the Rematal community",
      icon: <Shield className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Payment Security",
      description: "No chasing payments — our escrow system protects your money",
      icon: <CreditCard className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Direct Access to Top D2C Brands",
      description: "No middlemen, no begging for work — connect directly",
      icon: <Users className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Public Reputation",
      description: "Your Rematal profile becomes your career passport",
      icon: <Award className="h-6 w-6 text-rematal-blue" />
    }
  ];

  return (
    <section id="perks" className="py-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={ref}
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            What Perks Do Freelancers <span className="text-gradient">Get?</span>
          </h2>
          <p 
            className={`text-lg text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Benefits that set Rematal apart from generic freelance platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, index) => (
            <PerkCard
              key={index}
              title={perk.title}
              description={perk.description}
              icon={perk.icon}
              delay={`delay-[${(index + 1) * 100}ms]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerksSection;
