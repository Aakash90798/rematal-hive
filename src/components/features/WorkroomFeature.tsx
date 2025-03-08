
import { useInView } from 'react-intersection-observer';
import { MessageSquare, FileText, CheckSquare } from 'lucide-react';

const WorkroomFeature = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
    >
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Comprehensive <span className="text-gradient">Workroom</span></h2>
        <p className="text-base text-rematal-gray max-w-2xl mx-auto">One central place for all project communication, files, and milestones.</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-rematal-primary/5 rounded-lg p-6 text-center">
            <div className="bg-rematal-primary/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="font-bold mb-2">Real-time Messaging</h3>
            <p className="text-sm text-rematal-gray">Direct communication with clients in one secure workspace</p>
          </div>
          
          <div className="bg-rematal-primary/5 rounded-lg p-6 text-center">
            <div className="bg-rematal-primary/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="font-bold mb-2">File Management</h3>
            <p className="text-sm text-rematal-gray">All project files organized in one central location</p>
          </div>
          
          <div className="bg-rematal-primary/5 rounded-lg p-6 text-center">
            <div className="bg-rematal-primary/15 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckSquare className="w-6 h-6 text-rematal-green" />
            </div>
            <h3 className="font-bold mb-2">Milestone Tracking</h3>
            <p className="text-sm text-rematal-gray">Track progress with clear milestones and deadlines</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkroomFeature;
