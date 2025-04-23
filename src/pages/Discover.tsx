import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import FilterSection from '@/components/FilterSection';
import ServiceCard from '@/components/ServiceCard';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import DownloadApp from '@/components/DownloadApp';

// Sample services data (we'll keep the existing services and add a few new ones for the new categories)
const sampleServices = [
  // Use Case 1: Immediate Local Guiding Service
  {
    id: "1",
    title: "Tokyo Hidden Gems Tour",
    description: "Discover the secret spots and local favorites that most tourists never see. Perfect for your first day in the city.",
    category: "Local Guide",
    price: 40,
    rating: 4.9,
    location: "Tokyo, Japan",
    provider: {
      id: "p1",
      name: "Hiroshi K.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26"
  },
  {
    id: "2",
    title: "Barcelona Street Art Walk",
    description: "Explore Barcelona's vibrant street art scene with a local artist who knows all the best spots and stories behind the artwork.",
    category: "Local Guide",
    price: 35,
    rating: 4.8,
    location: "Barcelona, Spain",
    provider: {
      id: "p2",
      name: "Carlos M.",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1558746636-283b1d39d0e0"
  },
  
  // Use Case 2: On-Demand Language Translation
  {
    id: "3",
    title: "Business Meeting Translation",
    description: "Professional translation for your important business meetings. I'll help ensure clear communication with your international partners.",
    category: "Translation",
    price: 60,
    rating: 4.8,
    location: "Shanghai, China",
    provider: {
      id: "p3",
      name: "Li Wei",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df"
  },
  {
    id: "4",
    title: "Medical Appointment Translator",
    description: "Accompany you to medical appointments and provide accurate translation to ensure you understand everything about your health.",
    category: "Translation",
    price: 55,
    rating: 4.7,
    location: "Paris, France",
    provider: {
      id: "p4",
      name: "Sophie L.",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  
  // Use Case 3: Skill-Based Personal Development
  {
    id: "5",
    title: "Japanese Pottery Workshop",
    description: "Learn the traditional art of Japanese pottery in this hands-on workshop. Perfect for beginners looking to develop artistic skills.",
    category: "Skill Teaching",
    price: 45,
    rating: 4.9,
    location: "Kyoto, Japan",
    provider: {
      id: "p5",
      name: "Akira T.",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261"
  },
  
  // Use Case 4: Emergency Assistance
  {
    id: "6",
    title: "Emergency Tech Support",
    description: "Immediate assistance with tech problems, from phone issues to laptop emergencies. Available 24/7 for urgent situations.",
    category: "Emergency",
    price: 50,
    rating: 4.6,
    location: "New York, USA",
    provider: {
      id: "p6",
      name: "Mike R.",
      avatar: "https://randomuser.me/api/portraits/men/52.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  
  // Use Case 5: Event Planning
  {
    id: "7",
    title: "Last-Minute Event Planning",
    description: "Urgent event planning services for corporate meetings, birthdays, or special occasions. I'll handle everything on short notice.",
    category: "Events",
    price: 75,
    rating: 4.8,
    location: "London, UK",
    provider: {
      id: "p7",
      name: "Emma B.",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1511795409834-c954f0b11126"
  },
  
  // Use Case 6: Home Improvement
  {
    id: "8",
    title: "Emergency Plumbing Repair",
    description: "Immediate plumbing assistance for leaks, clogs, and other urgent home issues. Available within 30 minutes.",
    category: "Home",
    price: 65,
    rating: 4.7,
    location: "Berlin, Germany",
    provider: {
      id: "p8",
      name: "Thomas M.",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1574359435415-e51f9a3d8e33"
  },
  
  // Use Case 7: Personalized Travel
  {
    id: "9",
    title: "Authentic Food Tour",
    description: "Experience the local cuisine with a food enthusiast who knows all the hidden gems. Customized to your taste preferences.",
    category: "Food Experience",
    price: 55,
    rating: 4.9,
    location: "Bangkok, Thailand",
    provider: {
      id: "p9",
      name: "Supaporn J.",
      avatar: "https://randomuser.me/api/portraits/women/59.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
  },
  
  // Use Case 8: Professional Skill Enhancement
  {
    id: "10",
    title: "Business Strategy Workshop",
    description: "Learn essential business strategy skills from a seasoned executive. Perfect for entrepreneurs and mid-career professionals looking to advance.",
    category: "Professional Skills",
    price: 75,
    rating: 4.8,
    location: "San Francisco, USA",
    provider: {
      id: "p10",
      name: "Jonathan L.",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1521737711867-e3b97375f902"
  },
  
  // Use Case 9: Cultural Exchange and Immersion
  {
    id: "11",
    title: "Traditional Tea Ceremony",
    description: "Experience an authentic Japanese tea ceremony with a master practitioner. Learn about the philosophy, rituals, and cultural significance.",
    category: "Cultural Exchange",
    price: 45,
    rating: 4.9,
    location: "Kyoto, Japan",
    provider: {
      id: "p11",
      name: "Yuki T.",
      avatar: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1576091160399-112ba8633047"
  },
  
  // Use Case 10: Health and Wellness
  {
    id: "12",
    title: "Meditation & Stress Relief",
    description: "Immediate stress relief through guided meditation and mindfulness techniques. Perfect for busy professionals.",
    category: "Health & Wellness",
    price: 40,
    rating: 4.7,
    location: "Los Angeles, USA",
    provider: {
      id: "p12",
      name: "Anna S.",
      avatar: "https://randomuser.me/api/portraits/women/25.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
  },
  
  // Use Case 11: Pet Care
  {
    id: "13",
    title: "Emergency Pet Care",
    description: "Immediate pet sitting and care when you need it most. Experienced pet care professional available within the hour.",
    category: "Pet Care",
    price: 35,
    rating: 4.8,
    location: "Chicago, USA",
    provider: {
      id: "p13",
      name: "Robert M.",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1552053831-71594a27632d"
  },
  
  // Use Case 12: Childcare
  {
    id: "14",
    title: "Last-Minute Babysitting",
    description: "Certified childcare professional available for last-minute babysitting. Background checked and experienced with all age groups.",
    category: "Childcare",
    price: 45,
    rating: 4.9,
    location: "Boston, USA",
    provider: {
      id: "p14",
      name: "Jessica W.",
      avatar: "https://randomuser.me/api/portraits/women/37.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1560884328-3ed97526ab3c"
  },
  
  // Use Case 13: Home Organization
  {
    id: "15",
    title: "Home Decluttering Session",
    description: "Transform your living space with professional decluttering and organization. See immediate results in just a few hours.",
    category: "Home Organization",
    price: 55,
    rating: 4.7,
    location: "Seattle, USA",
    provider: {
      id: "p15",
      name: "Emily K.",
      avatar: "https://randomuser.me/api/portraits/women/19.jpg"
    },
    imageSrc: "https://images.unsplash.com/photo-1594194003472-8431a9db1818"
  }
];

// Define all service categories
const serviceCategories = [
  { id: "all", name: "All" },
  { id: "local-guide", name: "Local Guide" },
  { id: "translation", name: "Translation" },
  { id: "skill-teaching", name: "Skill Teaching" },
  { id: "emergency", name: "Emergency" },
  { id: "events", name: "Events" },
  { id: "home", name: "Home" },
  { id: "food-experience", name: "Food Experience" },
  { id: "professional-skills", name: "Professional Skills" },
  { id: "cultural-exchange", name: "Cultural Exchange" },
  { id: "health-wellness", name: "Health & Wellness" },
  { id: "pet-care", name: "Pet Care" },
  { id: "childcare", name: "Childcare" },
  { id: "home-organization", name: "Home Organization" },
  { id: "personal-shopping", name: "Personal Shopping" },
  { id: "tech-support", name: "Tech Support" }
];

const Discover: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredServices = sampleServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">{t('discover.title')}</h1>
          <p className="text-center text-gray-600 mb-8">
            {t('discover.subtitle')}
          </p>
          
          <div className="space-y-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {serviceCategories.map((category) => (
                <Badge 
                  key={category.id}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className={`px-3 py-1 cursor-pointer ${
                    selectedCategory === category.name 
                      ? "bg-brand-teal hover:bg-brand-teal/90" 
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {t(`filter.categories.${category.id.replace('-', '')}`, category.name)}
                </Badge>
              ))}
            </div>
            
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  {t('discover.noResults')}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <DownloadApp />
      
      <Footer />
    </div>
  );
};

export default Discover;
