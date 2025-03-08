
import { useInView } from 'react-intersection-observer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EscrowPayments from "./EscrowPayments";
import WorkroomFeature from "./WorkroomFeature";
import PortfolioBuilder from "./PortfolioBuilder";
import ServicePackage from "./ServicePackage";
import TestimonialCollector from "./TestimonialCollector";

const FeaturesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 
            ref={ref}
            className={`text-3xl lg:text-4xl font-bold mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Powerful Tools for <span className="text-gradient">D2C Freelancers</span>
          </h2>
          <p 
            className={`text-base text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Everything you need to succeed in the growing D2C ecosystem
          </p>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="workroom" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto mb-8 h-auto flex flex-wrap justify-center gap-2 bg-gray-100 p-2 rounded-lg">
              <TabsTrigger value="workroom" className="text-xs md:text-sm px-3 py-1.5 rounded-full data-[state=active]:bg-rematal-blue data-[state=active]:text-white">
                Workroom
              </TabsTrigger>
              <TabsTrigger value="portfolio" className="text-xs md:text-sm px-3 py-1.5 rounded-full data-[state=active]:bg-rematal-blue data-[state=active]:text-white">
                Portfolio Builder
              </TabsTrigger>
              <TabsTrigger value="services" className="text-xs md:text-sm px-3 py-1.5 rounded-full data-[state=active]:bg-rematal-blue data-[state=active]:text-white">
                Service Packages
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="text-xs md:text-sm px-3 py-1.5 rounded-full data-[state=active]:bg-rematal-blue data-[state=active]:text-white">
                Testimonials
              </TabsTrigger>
              <TabsTrigger value="escrow" className="text-xs md:text-sm px-3 py-1.5 rounded-full data-[state=active]:bg-rematal-blue data-[state=active]:text-white">
                Escrow Payments
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6 max-w-4xl mx-auto">
              <TabsContent value="workroom">
                <WorkroomFeature />
              </TabsContent>
              
              <TabsContent value="portfolio">
                <PortfolioBuilder />
              </TabsContent>
              
              <TabsContent value="services">
                <ServicePackage />
              </TabsContent>
              
              <TabsContent value="testimonials">
                <TestimonialCollector />
              </TabsContent>
              
              <TabsContent value="escrow">
                <EscrowPayments />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
