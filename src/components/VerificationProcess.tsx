
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const VerificationProcess = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="verification" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div 
          ref={ref}
          className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Verification Process</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-sm relative">
                <div className="absolute -right-3 -top-3 bg-rematal-green/10 text-rematal-green font-bold text-lg h-10 w-10 rounded-full flex items-center justify-center">1</div>
                <div className="flex items-start">
                  <div className="bg-rematal-light-green p-3 rounded-lg mr-4">
                    <span className="text-2xl">✏️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Apply</h3>
                    <p className="text-rematal-gray">Fill out our application form with your professional details and D2C experience.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm relative">
                <div className="absolute -right-3 -top-3 bg-rematal-green/10 text-rematal-green font-bold text-lg h-10 w-10 rounded-full flex items-center justify-center">2</div>
                <div className="flex items-start">
                  <div className="bg-rematal-light-purple p-3 rounded-lg mr-4">
                    <span className="text-2xl">🎥</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Video Assessment</h3>
                    <p className="text-rematal-gray">Help us understand your expertise, experience, and problem-solving approach so we can match you with the best-fit eCommerce & D2C projects.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm relative">
                <div className="absolute -right-3 -top-3 bg-rematal-green/10 text-rematal-green font-bold text-lg h-10 w-10 rounded-full flex items-center justify-center">3</div>
                <div className="flex items-start">
                  <div className="bg-rematal-orange/10 p-3 rounded-lg mr-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Platform Approval</h3>
                    <p className="text-rematal-gray">Get approved to join the platform and start getting exclusive projects that match your expertise!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-rematal-dark rounded-xl p-6 md:p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Why Freelancers Love Us</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-rematal-green text-2xl font-bold">40%</p>
                  <p className="text-sm text-white/80">Less Effort</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-rematal-green text-2xl font-bold">2.8x</p>
                  <p className="text-sm text-white/80">More Income</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <p className="text-white/90">No bidding wars or endless proposals.</p>
                <p className="text-white/90">Work with brands that match your expertise and niche.</p>
                <p className="text-white/90">Focus on your expertise, not the job hunt.</p>
              </div>
              
              <Button className="bg-rematal-green hover:bg-rematal-green/90 text-white shadow-lg w-full">
                Start your application <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="flex justify-between mt-6 text-sm text-white/70">
                <p>875+ Freelancers Onboarded</p>
                <p>100% Money-Safety</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerificationProcess;
