import { useState } from "react";
import { MapPin, Globe, Languages, Music, Book, Coffee, Camera, Utensils, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Link } from "react-router-dom";

// Sample data for services
const featuredServices = [
  {
    id: "1",
    title: "Local City Tour with Hidden Gems",
    description: "Discover the secret spots and local favorites that most tourists never see. Perfect for your first day in the city.",
    category: "City Guide",
    price: 40,
    rating: 4.9,
    location: "Tokyo, Japan",
    provider: {
      id: "p1",
      name: "Hiroshi K.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
  },
  {
    id: "2",
    title: "Business Meeting Translation Services",
    description: "Professional translation for your important business meetings. I'll help ensure clear communication with your international partners.",
    category: "Translation",
    price: 60,
    rating: 4.8,
    location: "Shanghai, China",
    provider: {
      id: "p2",
      name: "Mei L.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "3",
    title: "Salsa Dance Introduction & Practice",
    description: "Learn the basics of salsa dancing with a professional instructor. No experience needed, just bring your enthusiasm!",
    category: "Dance",
    price: 35,
    rating: 4.7,
    location: "Barcelona, Spain",
    provider: {
      id: "p3",
      name: "Carlos M.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1504609813442-a9924e2e9429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
];

// Sample testimonials
const testimonials = [
  {
    content:
      "第一次踏上奥克兰，我一个朋友都没有。Guidew 的专家不仅带我夜访地下爵士俱乐部，还介绍我加入了当地 Bachata 社团。两周后我在派对上用毛利语问候每个人，大家都以为我是土生土长的新西兰人。",
    author: {
      name: "Lily West",
      title: "来自伦敦 · 周末舞者",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  },
  {
    content:
      "我搬到惠灵顿创办游戏工作室，社交圈一片空白。Guidew 帮我找到了专属翻译兼 City Buddy——白天教我 Kiwi 式英语和商务礼仪，晚上直接把我带进最潮的科技创业聚会，第二天就接到了第一笔合作。",
    author: {
      name: "Mateo Rivera",
      title: "来自墨西哥 · 创业者",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    }
  },
  {
    content:
      "在皇后镇滑雪季，我通过 Guidew 认识了一位热爱毛利文化的滑雪教练。她带我拜访了隐秘的部落工坊，教我用本地口音介绍自己，还推荐了驼羊牧场里的即兴舞蹈 Jam。那一刻我知道，我真正找到了新西兰的灵魂。",
    author: {
      name: "Ava Nguyen",
      title: "来自越南 · 冒险爱好者",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    }
  }
];

const Index = () => {
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {showNotice && (
          <div className="bg-white border-b border-amber-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-brand-darkBlue">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertTriangle className="h-6 w-6 text-brand-orange" />
                </div>
                <p>
                  当前网站仍处于研发与评估阶段，仅用于演示。请勿注册、支付或依据页面信息做实际决策，所有数据均为模拟内容，敬请谅解。
                </p>
              </div>
              <button
                onClick={() => setShowNotice(false)}
                className="text-xs font-semibold uppercase tracking-wide text-brand-teal hover:underline"
              >
                我已了解
              </button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <HeroSection />
        
        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                Diverse Expertise
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What kind of help do you need?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From city guides and language assistance to specialized skills and local experiences, find experts in any field, anywhere.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <CategoryCard 
                title="City Guides" 
                description="Discover hidden gems and local hotspots with personalized city tours."
                icon={MapPin}
                color="bg-brand-teal"
                route="/discover?category=city-guides"
              />
              <CategoryCard 
                title="Translation Services" 
                description="Break language barriers with on-demand translation assistance."
                icon={Languages}
                color="bg-brand-orange"
                route="/discover?category=translation"
              />
              <CategoryCard 
                title="Cultural Experiences" 
                description="Immerse yourself in authentic local traditions and customs."
                icon={Globe}
                color="bg-purple-500"
                route="/discover?category=cultural-experiences"
              />
              <CategoryCard 
                title="Skill Instruction" 
                description="Learn new skills from local experts, from cooking to crafts."
                icon={Book}
                color="bg-blue-500"
                route="/discover?category=skill-instruction"
              />
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/discover" className="inline-block">
                <Button variant="outline" className="group">
                  View all categories <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Featured Services Section */}
        <section className="py-16 bg-brand-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                Top Picks
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our most popular services from top-rated local experts around the world.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map(service => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/discover" className="inline-block">
                <Button className="bg-brand-teal hover:bg-brand-teal/90">
                  Explore all services
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                Simple Process
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with local expertise in just a few simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-brand-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Discover</h3>
                <p className="text-gray-600">
                  Browse services and experts in your destination or current location.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-brand-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Book</h3>
                <p className="text-gray-600">
                  Choose your preferred time and date, then book instantly.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coffee className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Experience</h3>
                <p className="text-gray-600">
                  Meet your local expert and enjoy a personalized experience.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/how-it-works" className="inline-block">
                <Button variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white">
                  Learn more about the process
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-brand-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                User Stories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from travelers and locals who have connected through our platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备好体验本地专家服务了吗？
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              加入数千名旅行者和当地人，通过Guidew连接个性化服务。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="inline-flex justify-center">
                <Button className="bg-white text-brand-teal hover:bg-white/90">
                  Find an Expert
                </Button>
              </Link>
              <Link to="/become-expert" className="inline-flex justify-center">
                <Button
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-brand-teal"
                >
                  Become an Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

import { Calendar } from "lucide-react";

export default Index;
