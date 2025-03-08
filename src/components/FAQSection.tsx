
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  toggle: () => void;
};

const FAQItem = ({ question, answer, isOpen, toggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200 last:border-0 max-w-4xl px-3 hover:bg-rematal-primary/5 transition-all duration-300">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none"
      >
        <h3 className="font-sans md:text-lg font-medium text-rematal-dark ">{question}</h3>
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white ml-4 shrink-0 transition-transform">
          {isOpen ? (
            <X size={14} className="text-rematal-dark" />
          ) : (
            <Plus size={14} className="text-rematal-dark" />
          )}
        </div>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-rematal-gray pr-8">{answer}</p>
      </div>
    </div>
  );
};

const faqData = [
  {
    question: "Who can apply for verification on Rematal?",
    answer: "Any Indian professional with experience in the D2C (Direct-to-Consumer) space can apply. This includes marketers, designers, developers, operations specialists, content creators, and more who have worked with Indian D2C brands."
  },
  {
    question: "How is Rematal different from other freelance platforms?",
    answer: "Rematal is specifically built for India's D2C ecosystem. We focus exclusively on connecting verified D2C professionals with Indian direct-to-consumer brands, ensuring more relevant opportunities and higher quality matches than general freelance platforms."
  },
  {
    question: "How long does the verification process take?",
    answer: "Typically, our verification process takes 3-5 business days from the time you submit your application. We thoroughly review your experience with Indian D2C brands to ensure quality."
  },
  {
    question: "Is there a fee to get verified on Rematal?",
    answer: "No, our verification process is completely free. We believe in creating an accessible platform for all Indian D2C professionals to showcase their expertise."
  },
  {
    question: "What types of opportunities can I find on Rematal?",
    answer: "You'll find a range of opportunities with Indian D2C brands, including full-time roles, part-time positions, project-based work, and consulting engagements across marketing, design, development, operations, and more."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white px-4">
      <div className="mx-auto max-w-4xl">
        <div 
          ref={ref}
          className={`mx-auto text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggle={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
