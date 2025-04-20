
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/FilterSection';
import ServiceCard from '@/components/ServiceCard';

// 示例服务数据
const sampleServices = [
  {
    id: "1",
    title: "东京隐藏景点探索之旅",
    description: "发现游客罕至的东京秘境，体验地道的日本文化。适合想要深入了解东京的旅行者。",
    category: "城市向导",
    price: 40,
    rating: 4.9,
    location: "东京, 日本",
    provider: {
      id: "p1",
      name: "佐藤浩",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26"
  },
  {
    id: "2",
    title: "商务会议翻译服务",
    description: "专业的商务会议翻译服务，确保您与国际伙伴的顺畅沟通。",
    category: "翻译服务",
    price: 60,
    rating: 4.8,
    location: "上海, 中国",
    provider: {
      id: "p2",
      name: "李梅",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df"
  },
  {
    id: "3",
    title: "韩式料理制作体验",
    description: "学习制作正宗的韩式料理，从食材选择到最终摆盘的完整体验。",
    category: "美食探索",
    price: 45,
    rating: 4.7,
    location: "首尔, 韩国",
    provider: {
      id: "p3",
      name: "金智秀",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
  }
];

const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const filteredServices = sampleServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === '全部' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">发现服务</h1>
          
          <div className="space-y-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <FilterSection 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Discover;
