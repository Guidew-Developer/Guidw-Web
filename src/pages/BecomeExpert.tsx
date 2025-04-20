
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { User, Globe, Star } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ 
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

const BecomeExpert: React.FC = () => {
  const features = [
    {
      icon: User,
      title: "灵活工作",
      description: "按照您的时间和舒适度提供服务"
    },
    {
      icon: Globe,
      title: "全球连接",
      description: "与来自世界各地的人分享您的技能"
    },
    {
      icon: Star,
      title: "额外收入",
      description: "通过分享您的专业知识获得报酬"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">成为Guidew专家</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            在Guidew上展示您的技能，为全球用户提供独特的本地体验
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </section>

        <section className="text-center">
          <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white px-8 py-3 text-lg">
            开始注册
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeExpert;
