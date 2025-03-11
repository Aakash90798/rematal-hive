
import { XCircle } from 'lucide-react';

const RejectionStep = () => {
  return (
    <div className="text-center py-8">
      <div className="flex justify-center mb-6">
        <div className="bg-red-100 p-4 rounded-full">
          <XCircle size={60} className="text-red-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Thank You for Showing Interest</h2>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <p className="text-lg mb-6">
          However, Rematal is only for experts with more than 1 year of experience working with e-commerce/D2C brands.
        </p>
        
        <p className="text-gray-600">
          You can reapply after 90 days if you gain more relevant experience in the meantime.
        </p>
      </div>
      
      <p className="text-gray-600">
        We appreciate your interest in Rematal and wish you the best in your career journey.
      </p>
    </div>
  );
};

export default RejectionStep;
