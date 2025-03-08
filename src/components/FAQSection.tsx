
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const FAQSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
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

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium text-lg">{faq.question}</span>
                  <span>
                    {openIndex === index ? 
                      <Minus className="h-5 w-5 text-rematal-orange" /> : 
                      <Plus className="h-5 w-5 text-rematal-gray" />
                    }
                  </span>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 py-4' : 'max-h-0 py-0'
                  }`}
                >
                  <p className="text-rematal-gray">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
