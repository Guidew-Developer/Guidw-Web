
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Calendar, Coffee } from 'lucide-react';

const StepCard: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ 
  icon: Icon, 
  title, 
  description 
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md text-center">
    <div className="mx-auto mb-4 w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center">
      <Icon className="h-8 w-8 text-brand-teal" />
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: MapPin,
      title: "发现",
      description: "浏览并搜索本地专家服务"
    },
    {
      icon: Calendar,
      title: "预订",
      description: "选择您喜欢的时间和专家"
    },
    {
      icon: Coffee,
      title: "体验",
      description: "享受个性化的本地服务"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Guidew如何工作</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            通过三个简单的步骤，连接您与本地专家，获得独特的个性化体验
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              icon={step.icon} 
              title={step.title} 
              description={step.description} 
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
