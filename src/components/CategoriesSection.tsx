
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Megaphone, Code, PenTool, Text } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const CategoriesSection = () => {
  const [activeTab, setActiveTab] = useState("marketing");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const categories = [
    {
      id: "marketing",
      title: "Marketing",
      icon: <Megaphone className="h-5 w-5" />,
      color: "text-pink-500",
      hoverColor: "group-hover:text-pink-600",
      bgColor: "bg-pink-50",
      activeBgColor: "bg-pink-100",
      borderColor: "border-pink-200",
      skills: ["Paid Social & Search", "Email Marketing", "SEO Strategy", "Customer Retention"]
    },
    {
      id: "development",
      title: "Development",
      icon: <Code className="h-5 w-5" />,
      color: "text-rematal-blue",
      hoverColor: "group-hover:text-blue-600",
      bgColor: "bg-rematal-light-purple",
      activeBgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      skills: ["Shopify Customization", "WooCommerce", "Landing Pages", "Custom Apps"]
    },
    {
      id: "design",
      title: "Design",
      icon: <PenTool className="h-5 w-5" />,
      color: "text-rematal-orange",
      hoverColor: "group-hover:text-orange-600",
      bgColor: "bg-rematal-orange/10",
      activeBgColor: "bg-orange-100",
      borderColor: "border-orange-200",
      skills: ["Brand Identity", "UI/UX Design", "Product Photography", "Motion Graphics"]
    },
    {
      id: "content",
      title: "Content",
      icon: <Text className="h-5 w-5" />,
      color: "text-rematal-green",
      hoverColor: "group-hover:text-green-600",
      bgColor: "bg-rematal-light-green",
      activeBgColor: "bg-green-100",
      borderColor: "border-green-200",
      skills: ["Product Copywriting", "Social Content", "Email Sequences", "Brand Storytelling"]
    }
  ];

  return (
    <section id="categories" className="py-12 md:py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 
            ref={ref}
            className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Talent We're <span className="text-gradient">Looking For</span>
          </h2>
          <p 
            className={`text-base text-rematal-gray transition-all duration-700 delay-100 ${inView ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
          >
            Specialized experts for D2C brands
          </p>
        </div>

        <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Tabs defaultValue="marketing" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="w-full flex flex-wrap justify-center mb-6 bg-transparent space-y-0 p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className={cn(
                    "group relative flex items-center justify-center py-2 px-3 m-1 rounded-lg transition-all",
                    "data-[state=active]:shadow-md data-[state=active]:transform data-[state=active]:-translate-y-1",
                    "border hover:border-gray-200",
                    activeTab === category.id ? `${category.activeBgColor} ${category.borderColor}` : "bg-white"
                  )}
                >
                  <span className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg mr-2",
                    category.bgColor,
                    "transition-all duration-300"
                  )}>
                    <span className={`${category.color} ${category.hoverColor}`}>
                      {category.icon}
                    </span>
                  </span>
                  <span className={cn(
                    "font-medium text-sm",
                    activeTab === category.id ? category.color : "text-gray-700",
                    "group-hover:text-gray-900 transition-colors"
                  )}>
                    {category.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {categories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="p-0 m-0 outline-none focus:outline-none"
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {category.skills.map((skill, index) => (
                        <div 
                          key={index}
                          className="relative bg-gray-50 rounded-lg p-4 transition-all hover:shadow-md hover:-translate-y-1"
                        >
                          <div className={`absolute top-0 right-0 w-2 h-2 rounded-full ${category.activeBgColor} m-2`}></div>
                          <h5 className="font-medium mb-1">{skill}</h5>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
