
import { Mail, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 mt-8">
      <h3 className="text-xl font-semibold mb-3 text-rematal-dark">Need Help?</h3>
      <div className="flex items-center gap-2 text-rematal-primary mb-2">
        <Mail className="h-5 w-5" />
        <a href="mailto:support@rematal.com" className="text-rematal-primary hover:underline">
          support@rematal.com
        </a>
      </div>
      <p className="text-sm text-rematal-gray">
        We actively listen to all your emails. Feel free to reach out with any questions, feedback, or issues you encounter during the application process.
      </p>
    </div>
  );
};

export default ContactSection;
