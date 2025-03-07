
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { AlertCircle } from 'lucide-react';

const ProblemCard = ({ title, delay }: { title: string; delay: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${inView ? `opacity-100 translate-y-0 ${delay}` : 'opacity-0 translate-y-8'}`}
    >
      <div className="flex items-start">
        <div className="shrink-0">
          <AlertCircle className="h-6 w-6 text-rematal-orange" />
        </div>
        <p className="ml-3 text-base font-medium text-rematal-dark">{title}</p>
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
    "Tired of chasing late payments?",
    "Fed up with unreliable clients disappearing mid-project?",
    "Sick of building trust from scratch with every new client?",
    "Hate bidding wars against low-quality freelancers who undercharge?"
  ];

  return (
    <section id="problem" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 
            ref={ref}
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Your Problem
          </h2>
          <p className={`text-lg text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
            We understand the challenges you face as a D2C freelancer in India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard 
              key={index} 
              title={problem} 
              delay={`delay-[${(index + 1) * 100}ms]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
