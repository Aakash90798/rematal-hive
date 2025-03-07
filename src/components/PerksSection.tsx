
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
      title: "Verified Professional Status",
      description: "Earn a trusted badge that signals your expertise to premium clients",
      icon: <Shield className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Financial Protection",
      description: "Our escrow system ensures you always get paid for completed work",
      icon: <CreditCard className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Premium Client Access",
      description: "Connect directly with serious D2C brands seeking quality talent",
      icon: <Users className="h-6 w-6 text-rematal-blue" />
    },
    {
      title: "Reputation Passport",
      description: "Build a verified track record that attracts better opportunities",
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
            Benefits That <span className="text-gradient">Matter</span>
          </h2>
          <p 
            className={`text-lg text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Real advantages that transform how you work in the D2C ecosystem
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
