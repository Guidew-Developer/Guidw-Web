
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, User } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  // TODO: Replace with actual service data from backend/props
  const service = {
    title: "东京城市隐藏宝地之旅",
    provider: {
      name: "Hiroshi K.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.9
    },
    description: "探索东京鲜为人知的小巷和本地特色，体验真正的日本文化",
    price: 40,
    duration: "3小时",
    location: "东京, 日本"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26" 
              alt={service.title} 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
            
            <div className="flex items-center mb-4">
              <img 
                src={service.provider.avatar} 
                alt={service.provider.name} 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="font-semibold">{service.provider.name}</h3>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 mr-1" fill="currentColor" />
                  {service.provider.rating}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{service.description}</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-brand-teal" />
                <span>{service.location}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-brand-teal" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-brand-teal" />
                <span>个人或小组</span>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold mr-4 text-brand-teal">¥{service.price}</span>
              <span className="text-gray-500">每人</span>
            </div>

            <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white">
              立即预订
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

import { Star } from 'lucide-react';
export default ServiceDetail;
