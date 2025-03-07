
import { useInView } from 'react-intersection-observer';
import { AlertTriangle, Clock, Unplug, DollarSign } from 'lucide-react';

const ProblemCard = ({ 
  title, 
  delay, 
  icon: Icon,
  color
}: { 
  title: string; 
  delay: string;
  icon: React.ElementType;
  color: string;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 border-l-4 ${color} shadow-lg hover:shadow-xl transition-all duration-500 transform ${inView ? `opacity-100 translate-y-0 ${delay}` : 'opacity-0 translate-y-8'} hover:-translate-y-2`}
    >
      <div className="flex items-start space-x-4">
        <div className={`shrink-0 p-3 rounded-full ${color.replace('border-l-4', 'bg')}/10`}>
          <Icon className={`h-6 w-6 ${color.replace('border-l-4', 'text')}`} />
        </div>
        <p className="text-lg font-medium text-rematal-dark">{title}</p>
      </div>
    </div>
  );
};

const ProblemSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const problems = [
    {
      title: "Chasing clients for payments that never seem to arrive?",
      icon: DollarSign,
      color: "border-l-rematal-orange"
    },
    {
      title: "Tired of clients who vanish mid-project without notice?",
      icon: Unplug,
      color: "border-l-red-500"
    },
    {
      title: "Exhausted from rebuilding trust with each new client?",
      icon: Clock,
      color: "border-l-purple-500"
    },
    {
      title: "Frustrated competing with low-quality freelancers who undercut rates?",
      icon: AlertTriangle,
      color: "border-l-rematal-blue"
    }
  ];

  return (
    <section id="problem" className="py-24 relative overflow-hidden">
      {/* Background elements for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rematal-orange/5 rounded-full filter blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-3 py-1 bg-rematal-light-purple rounded-full text-rematal-blue text-sm font-medium mb-4">
            THE STRUGGLE IS REAL
          </div>
          
          <h2 
            ref={ref}
            className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            The Freelancer's <span className="text-gradient font-extrabold">Dilemma</span>
          </h2>
          
          <p className={`text-xl text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            If you're nodding your head to these pain points, you're not alone.
            <br />Every D2C freelancer in India has been there.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <ProblemCard 
              key={index} 
              title={problem.title} 
              icon={problem.icon}
              color={problem.color}
              delay={`delay-[${(index + 1) * 150}ms]`}
            />
          ))}
        </div>
        
        {/* Call to action for added emphasis */}
        <div className={`text-center mt-12 transition-all duration-700 delay-[600ms] ${inView ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-lg text-rematal-dark font-medium">
            Ready to leave these problems behind? <span className="text-rematal-orange">That's why we built Rematal.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
