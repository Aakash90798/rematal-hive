
import { useInView } from 'react-intersection-observer';
import { MessageSquare, FileText, CheckSquare, Calendar } from 'lucide-react';

const WorkroomFeature = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`flex flex-col-reverse lg:flex-row items-center gap-6 lg:gap-12 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="w-full lg:w-1/2 p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Comprehensive <span className="text-gradient">Workroom</span></h2>
        <p className="text-base md:text-lg text-rematal-gray mb-6">One central place for all project communication, files, and milestones.</p>
        
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-green rounded-full mr-3 mt-1">
              <MessageSquare className="w-4 h-4 text-rematal-green" />
            </div>
            <p className="text-sm">Real-time messaging with clients</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-green rounded-full mr-3 mt-1">
              <FileText className="w-4 h-4 text-rematal-green" />
            </div>
            <p className="text-sm">Centralized file management</p>
          </li>
          <li className="flex items-start">
            <div className="p-1 bg-rematal-light-green rounded-full mr-3 mt-1">
              <CheckSquare className="w-4 h-4 text-rematal-green" />
            </div>
            <p className="text-sm">Clear milestone tracking</p>
          </li>
        </ul>
      </div>
      
      <div className="w-full lg:w-1/2">
        <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rematal-light-green rounded-full">
              <MessageSquare className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="text-xl font-bold">Project Workroom</h3>
          </div>
          
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="bg-gray-50 p-3 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rematal-orange"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs text-gray-500">Logo Redesign Project</div>
              <div></div>
            </div>
            
            <div className="flex h-64">
              <div className="w-1/4 border-r border-gray-100 p-3">
                <div className="flex flex-col gap-3">
                  <div className="bg-gray-100 w-full h-6 rounded-md"></div>
                  <div className="bg-rematal-light-purple w-full h-6 rounded-md"></div>
                  <div className="bg-gray-100 w-full h-6 rounded-md"></div>
                  <div className="bg-gray-100 w-full h-6 rounded-md"></div>
                </div>
              </div>
              
              <div className="w-3/4 p-3 flex flex-col">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm font-medium">Project Timeline</div>
                  <Calendar className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                      <CheckSquare className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-xs">Initial Concepts</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-400 flex items-center justify-center">
                      <CheckSquare className="w-3 h-3 text-white" />
                    </div>
                    <div className="text-xs">Feedback Round</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-rematal-blue flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="text-xs">Final Refinements</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                    <div className="text-xs">Delivery</div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <div className="bg-rematal-light-purple text-rematal-blue text-xs px-3 py-1 rounded-full">Files</div>
                  <div className="bg-rematal-light-green text-rematal-green text-xs px-3 py-1 rounded-full">Messages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkroomFeature;
