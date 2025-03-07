
import { useInView } from 'react-intersection-observer';
import { Megaphone, Code, PenTool, Text } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  color: string;
  bgColor: string;
  delay: string;
}

const CategoryCard = ({ title, icon, skills, color, bgColor, delay }: CategoryCardProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div 
      ref={ref}
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${inView ? `opacity-100 translate-y-0 ${delay}` : 'opacity-0 translate-y-8'}`}
    >
      <div className={`${bgColor} p-6`}>
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${color} bg-white/20 backdrop-blur-sm mb-4`}>
          {icon}
        </div>
        <h3 className={`text-xl font-bold mb-1 ${color}`}>{title}</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span 
              key={i} 
              className="inline-block px-3 py-1 bg-gray-100 text-rematal-dark text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    {
      title: "Marketers",
      icon: <Megaphone className="h-5 w-5" />,
      skills: ["Paid Ads", "Email", "SEO", "Retention"],
      color: "text-pink-500",
      bgColor: "bg-pink-50"
    },
    {
      title: "Developers",
      icon: <Code className="h-5 w-5" />,
      skills: ["Shopify", "Wordpress", "Landing Page", "App Development"],
      color: "text-rematal-blue",
      bgColor: "bg-rematal-light-purple"
    },
    {
      title: "Designers",
      icon: <PenTool className="h-5 w-5" />,
      skills: ["Brand", "Logo", "UI/UX", "Creative", "Motion Graphics"],
      color: "text-rematal-orange",
      bgColor: "bg-rematal-orange/10"
    },
    {
      title: "Content Experts",
      icon: <Text className="h-5 w-5" />,
      skills: ["Copywriting", "Social Content", "Blogs", "Email Campaigns"],
      color: "text-rematal-green",
      bgColor: "bg-rematal-light-green"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            ref={ref}
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            We Are Looking For <span className="text-gradient">Top Talent</span>
          </h2>
          <p 
            className={`text-lg text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Specialized freelancers with expertise in these D2C categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              icon={category.icon}
              skills={category.skills}
              color={category.color}
              bgColor={category.bgColor}
              delay={`delay-[${(index + 1) * 100}ms]`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
