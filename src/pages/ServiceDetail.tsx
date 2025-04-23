import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  Star, 
  MessageCircle, 
  Calendar as CalendarIcon,
  Check,
  Shield
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DownloadApp from '@/components/DownloadApp';

const ServiceDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const service = {
    id: id || "1",
    title: "东京城市隐藏宝地之旅",
    provider: {
      name: "Hiroshi K.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.9,
      responseTime: "5 min",
      languages: ["Japanese", "English", "Chinese"],
      experience: "3 years",
      verified: true
    },
    description: "探索东京鲜为人知的小巷和本地特色，体验真正的日本文化。这个导览将带您穿过繁华的新宿和涩谷区的小巷，发现当地人最喜欢的餐馆、咖啡馆和商店。我们会品尝正宗的日本小吃，参观传统的日本庭院，并了解这座城市丰富的历史和文化。全程我会根据您的兴趣定制行程，确保您获得最地道的东京体验。",
    category: "Local Guide",
    price: 40,
    duration: "3小时",
    location: "东京, 日本",
    languages: ["日语", "英语", "中文"],
    groupSize: "1-5人",
    availableNow: true,
    reviews: [
      {
        author: "Sarah L.",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
        rating: 5,
        date: "2023-10-15",
        text: "Hiroshi was an amazing guide! He showed us places we would have never found on our own and was very knowledgeable about the history and culture of Tokyo."
      },
      {
        author: "Michael C.",
        avatar: "https://randomuser.me/api/portraits/men/54.jpg",
        rating: 4,
        date: "2023-09-28",
        text: "Great experience overall. We visited some amazing hidden restaurants and shops. Would highly recommend for first-time visitors to Tokyo."
      }
    ],
    availableDates: ["2023-11-10", "2023-11-11", "2023-11-12"],
    availableTimes: ["09:00", "13:00", "17:00"],
    includedFeatures: [
      "Personalized itinerary",
      "Local food recommendations",
      "Hidden spots not in guidebooks",
      "Cultural insights and history",
      "Translation assistance"
    ]
  };

  const generateAvailableDates = () => {
    const dates = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const availableDates = generateAvailableDates();
  
  const availableTimes = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 lg:py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              {service.availableNow && (
                <Badge className="mb-2 bg-green-500 hover:bg-green-600">
                  {t('serviceDetail.availableNow')}
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
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
                  <span>{service.groupSize}</span>
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 mr-2" fill="currentColor" />
                  <span>{service.provider.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26" 
                alt={service.title} 
                className="w-full rounded-lg shadow-lg mb-4 h-80 object-cover"
              />
              <div className="grid grid-cols-3 gap-2">
                <img 
                  src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc" 
                  alt="Tokyo street" 
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1553621042-f6e147245754" 
                  alt="Tokyo food" 
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1" 
                  alt="Tokyo garden" 
                  className="w-full h-24 object-cover rounded-lg"
                />
              </div>
            </div>
            
            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="details">{t('serviceDetail.tabs.details')}</TabsTrigger>
                <TabsTrigger value="reviews">{t('serviceDetail.tabs.reviews')}</TabsTrigger>
                <TabsTrigger value="provider">{t('serviceDetail.tabs.provider')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-3">{t('serviceDetail.description')}</h2>
                  <p className="text-gray-700">{service.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('serviceDetail.includes')}</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {service.includedFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">{t('serviceDetail.languages')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="bg-brand-lightGray">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <h2 className="text-xl font-semibold mb-4">{t('serviceDetail.reviews')}</h2>
                <div className="space-y-6">
                  {service.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.author}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                        <div className="ml-auto flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4 text-yellow-500" 
                              fill={i < review.rating ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="provider">
                <div className="flex items-start mb-6">
                  <Avatar className="h-16 w-16 mr-4">
                    <AvatarImage src={service.provider.avatar} />
                    <AvatarFallback>{service.provider.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center mb-1">
                      <h2 className="text-xl font-semibold mr-2">{service.provider.name}</h2>
                      {service.provider.verified && (
                        <Badge className="bg-blue-500">
                          <Shield className="h-3 w-3 mr-1" /> {t('serviceDetail.verified')}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center text-yellow-500 mb-1">
                      <Star className="h-4 w-4 mr-1" fill="currentColor" />
                      <span>{service.provider.rating}</span>
                    </div>
                    <p className="text-gray-600">{t('serviceDetail.experience')}: {service.provider.experience}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{t('serviceDetail.responseTime')}</h3>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-brand-teal" />
                      <span>{service.provider.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{t('serviceDetail.languages')}</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.provider.languages.map((language, index) => (
                        <Badge key={index} variant="outline">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="flex items-center"
                  onClick={() => console.log("Message provider")}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t('serviceDetail.messageProvider')}
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:col-span-1">
            <div className="border rounded-lg p-6 shadow-md sticky top-24">
              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold mr-2 text-brand-teal">¥{service.price}</span>
                <span className="text-gray-500">{t('serviceDetail.pricePerHour')}</span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">{t('serviceDetail.selectDate')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map((date) => {
                    const d = new Date(date);
                    const formattedDate = `${d.getDate()}/${d.getMonth() + 1}`;
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                    
                    return (
                      <button
                        key={date}
                        className={`p-2 border rounded-md text-center transition-colors ${
                          selectedDate === date 
                            ? 'bg-brand-teal text-white border-brand-teal' 
                            : 'hover:border-brand-teal'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="text-xs">{dayName}</div>
                        <div>{formattedDate}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">{t('serviceDetail.selectTime')}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      className={`p-2 border rounded-md text-center transition-colors ${
                        selectedTime === time 
                          ? 'bg-brand-teal text-white border-brand-teal' 
                          : 'hover:border-brand-teal'
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white mb-4"
                disabled={!selectedDate || !selectedTime}
              >
                {t('serviceDetail.bookNow')}
              </Button>
              
              {service.availableNow && (
                <Button 
                  variant="outline" 
                  className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                >
                  {t('serviceDetail.requestNow')}
                </Button>
              )}
              
              <div className="mt-6 text-sm text-gray-500 flex items-center justify-center">
                <Shield className="h-4 w-4 mr-2" />
                {t('serviceDetail.secureBooking')}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <DownloadApp />
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
