import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DownloadApp from "@/components/DownloadApp";
import { resolveLocale } from "@/utils/locale";

const serviceLocales = ["en", "zh", "pt", "es", "fr", "he"] as const;
type ServiceLocale = (typeof serviceLocales)[number];

type ServiceTemplate = {
  title: string;
  description: string;
  location: string;
  duration: string;
  groupSize: string;
  price: number;
  currencySymbol: string;
  languages: string[];
  includedFeatures: string[];
  reviews: Array<{
    author: string;
    avatar: string;
    rating: number;
    date: string;
    text: string;
  }>;
  provider: {
    name: string;
    avatar: string;
    rating: number;
    responseTime: string;
    languages: string[];
    experience: string;
    verified: boolean;
  };
};

const providerAvatar = "https://randomuser.me/api/portraits/men/32.jpg";
const reviewAvatars = {
  sarah: "https://randomuser.me/api/portraits/women/22.jpg",
  michael: "https://randomuser.me/api/portraits/men/54.jpg"
};

const serviceCopy: Record<ServiceLocale, ServiceTemplate> = {
  en: {
    title: "Auckland laneways & izakaya storytelling",
    description:
      "Follow a bilingual concierge through Ponsonby backstreets and Britomart rooftops. We taste signature small plates, decode cultural etiquette, and map hidden art alleys that rarely show up in guidebooks. Every stop adjusts to your interests—design, pop culture, wellness, or after-dark adventures.",
    location: "Auckland, New Zealand",
    duration: "3 hours",
    groupSize: "1–5 guests",
    price: 95,
    currencySymbol: "NZ$",
    languages: ["English", "Japanese", "Mandarin"],
    includedFeatures: [
      "Personalized micro-itinerary with AI-generated notes",
      "Local food & drink recommendations for the week",
      "Hidden laneways, rooftop gardens, and gallery pop-ups",
      "Etiquette coaching for meetings and nightlife",
      "On-demand translation + emergency phrases"
    ],
    reviews: [
      {
        author: "Sarah L.",
        avatar: reviewAvatars.sarah,
        rating: 5,
        date: "2024-10-15",
        text: "Hiroshi mixed street food, indie art, and business etiquette in one evening. I felt prepared for meetings and still saw the coolest side of Auckland."
      },
      {
        author: "Michael C.",
        avatar: reviewAvatars.michael,
        rating: 4,
        date: "2024-09-28",
        text: "Great flow between hidden bars and heritage spots. The live translation during vendor visits saved us time."
      }
    ],
    provider: {
      name: "Hiroshi K.",
      avatar: providerAvatar,
      rating: 4.9,
      responseTime: "Replies within 5 min",
      languages: ["English", "Japanese", "Mandarin"],
      experience: "3 years guiding in Auckland",
      verified: true
    }
  },
  zh: {
    title: "奥克兰巷内秘境与居酒屋夜谈",
    description:
      "和双语礼宾一起穿梭 Ponsonby 小巷与 Britomart 天台，在当地人的节奏中品尝居酒屋小食、参观临时艺术展，并学习在商务、社交场合的沟通礼仪。行程可按你的兴趣实时调整：设计、流行文化、康养或夜生活都能覆盖。",
    location: "新西兰 奥克兰",
    duration: "3 小时",
    groupSize: "1-5 人",
    price: 95,
    currencySymbol: "NZ$",
    languages: ["英语", "日语", "中文"],
    includedFeatures: [
      "AI 协助生成的个性化行程卡片",
      "一周内可用的餐饮与城市推荐",
      "巷内壁画、天台花园与快闪展览",
      "商务/夜生活礼仪提醒",
      "现场翻译与应急用语同步"
    ],
    reviews: [
      {
        author: "Sarah L.",
        avatar: reviewAvatars.sarah,
        rating: 5,
        date: "2024-10-15",
        text: "Hiroshi 把街头美食、独立艺术与商务礼仪融合在一起，非常适合第一次来奥克兰的人。"
      },
      {
        author: "Michael C.",
        avatar: reviewAvatars.michael,
        rating: 4,
        date: "2024-09-28",
        text: "行程衔接顺畅，从隐蔽酒吧到历史街区都有覆盖，还帮我们现场翻译供应商沟通。"
      }
    ],
    provider: {
      name: "Hiroshi K.",
      avatar: providerAvatar,
      rating: 4.9,
      responseTime: "平均 5 分钟内回复",
      languages: ["英语", "日语", "中文"],
      experience: "在奥克兰带队 3 年",
      verified: true
    }
  },
  pt: {
    title: "Bairros escondidos de Auckland com concierge bilíngue",
    description:
      "Caminhe por ruelas de Ponsonby e terraços de Britomart ao lado de um especialista bilíngue. Degustamos petiscos autorais, revelamos como navegar em reuniões e vida noturna e mostramos galerias pop-up que não aparecem nos guias tradicionais.",
    location: "Auckland, Nova Zelândia",
    duration: "3 horas",
    groupSize: "1–5 pessoas",
    price: 95,
    currencySymbol: "NZ$",
    languages: ["Inglês", "Japonês", "Mandarim"],
    includedFeatures: [
      "Itinerário personalizado com notas geradas por IA",
      "Recomendações locais de comida e lazer para toda a semana",
      "Ruelas secretas, jardins suspensos e exposições relâmpago",
      "Coaching de etiqueta para reuniões e noite",
      "Tradução sob demanda e frases essenciais"
    ],
    reviews: [
      {
        author: "Sarah L.",
        avatar: reviewAvatars.sarah,
        rating: 5,
        date: "2024-10-15",
        text: "Hiroshi combinou comida de rua, arte indie e dicas de negócios. Saí confiante para reuniões e ainda conheci o lado descolado da cidade."
      },
      {
        author: "Michael C.",
        avatar: reviewAvatars.michael,
        rating: 4,
        date: "2024-09-28",
        text: "Ótimo equilíbrio entre bares escondidos e patrimônios históricos. A tradução ao vivo com fornecedores foi essencial."
      }
    ],
    provider: {
      name: "Hiroshi K.",
      avatar: providerAvatar,
      rating: 4.9,
      responseTime: "Responde em até 5 min",
      languages: ["Inglês", "Japonês", "Mandarim"],
      experience: "3 anos guiando em Auckland",
      verified: true
    }
  },
  es: {
    title: "Callejones e izakayas de Auckland con storytelling",
    description:
      "Sigue a un concierge bilingüe por los callejones de Ponsonby y los rooftops de Britomart. Degustamos platos pequeños de autor, desciframos la etiqueta cultural y mapeamos pasajes artísticos que rara vez aparecen en las guías. Cada parada se adapta a tus intereses: diseño, cultura pop, bienestar o aventuras nocturnas.",
    location: "Auckland, Nueva Zelanda",
    duration: "3 horas",
    groupSize: "1–5 personas",
    price: 95,
    currencySymbol: "NZ$",
    languages: ["Inglés", "Japonés", "Mandarín"],
    includedFeatures: [
      "Micro-itinerario personalizado con notas generadas por IA",
      "Recomendaciones locales de comida y ocio para toda la semana",
      "Callejones ocultos, jardines en azoteas y galerías pop-up",
      "Coaching de etiqueta para reuniones y vida nocturna",
      "Traducción on-demand + frases esenciales de emergencia"
    ],
    reviews: [
      {
        author: "Sarah L.",
        avatar: reviewAvatars.sarah,
        rating: 5,
        date: "2024-10-15",
        text: "Hiroshi mezcló street food, arte indie y etiqueta de negocios en una sola noche. Llegué lista para mis reuniones y conocí el lado más cool de Auckland."
      },
      {
        author: "Michael C.",
        avatar: reviewAvatars.michael,
        rating: 4,
        date: "2024-09-28",
        text: "Excelente balance entre bares escondidos y sitios patrimoniales. La traducción en vivo con proveedores nos ahorró tiempo."
      }
    ],
    provider: {
      name: "Hiroshi K.",
      avatar: providerAvatar,
      rating: 4.9,
      responseTime: "Responde en 5 min",
      languages: ["Inglés", "Japonés", "Mandarín"],
      experience: "3 años guiando en Auckland",
      verified: true
    }
  },
  fr: {
    title: "Ruelles d’Auckland & récits d’izakaya",
    description:
      "Suivez un concierge bilingue dans les arrière-cours de Ponsonby et sur les rooftops de Britomart. Nous goûtons des tapas signatures, décodons l’étiquette culturelle et cartographions des passages artistiques rarement listés dans les guides. Chaque arrêt s’adapte à vos centres d’intérêt : design, pop culture, bien-être ou soirées after-work.",
    location: "Auckland, Nouvelle-Zélande",
    duration: "3 heures",
    groupSize: "1–5 personnes",
    price: 95,
    currencySymbol: "NZ$",
    languages: ["Anglais", "Japonais", "Mandarin"],
    includedFeatures: [
      "Micro-itinéraire personnalisé avec notes générées par IA",
      "Recommandations locales de restos et sorties pour la semaine",
      "Ruelles cachées, jardins suspendus et pop-up galleries",
      "Coaching d’étiquette pour réunions et nightlife",
      "Traduction à la demande + phrases d’urgence"
    ],
    reviews: [
      {
        author: "Sarah L.",
        avatar: reviewAvatars.sarah,
        rating: 5,
        date: "2024-10-15",
        text: "Hiroshi a mêlé street food, art indépendant et codes business en une soirée. J’ai abordé mes réunions avec assurance tout en découvrant le côté tendance d’Auckland."
      },
      {
        author: "Michael C.",
        avatar: reviewAvatars.michael,
        rating: 4,
        date: "2024-09-28",
        text: "Très bon équilibre entre bars cachés et quartiers patrimoniaux. La traduction en temps réel lors des visites fournisseurs nous a fait gagner du temps."
      }
    ],
    provider: {
      name: "Hiroshi K.",
      avatar: providerAvatar,
      rating: 4.9,
      responseTime: "Répond sous 5 min",
      languages: ["Anglais", "Japonais", "Mandarin"],
      experience: "3 ans de guidage à Auckland",
      verified: true
    }
  },
  he: {
    title: "סיפורי סמטאות ואיזאקיה באוקלנד",
    description:
      "הצטרפו לליווי דו-לשוני דרך הסמטאות של Ponsonby והגגות של Britomart. טועמים מנות קטנות חתימתיות, לומדים קודים תרבותיים ומגלים נתיבי אמנות שלא מופיעים במדריכים. כל עצירה מתעדכנת לפי מה שמעניין אתכם—עיצוב, פופ, רווחה או חיי לילה.",
    location: "אוקלנד, ניו זילנד",
    duration: "3 שעות",
    groupSize: "1–5 משתתפים",
    price: 95,
    currencySymbol: "NZ$",
    languages: ["אנגלית", "יפנית", "סינית מנדרינית"],
    includedFeatures: [
      "מסלול מיקרו מותאם אישית עם הערות שנוצרו ב-AI",
      "המלצות אוכל ומשקאות לכל השבוע",
      "סמטאות נסתרות, גינות גג ותערוכות פופ-אפ",
      "אימון נימוסין לפגישות עסקיות וללילות",
      "תרגום מיידי + משפטי חירום"
    ],
    reviews: [
      {
        author: "Sarah L.",
        avatar: reviewAvatars.sarah,
        rating: 5,
        date: "2024-10-15",
        text: "הירושי שילב אוכל רחוב, אמנות עצמאית וטיפים לפגישות בערב אחד. הגעתי לפגישות רגועה וגם הכרתי את הצד הכי מעניין בעיר."
      },
      {
        author: "Michael C.",
        avatar: reviewAvatars.michael,
        rating: 4,
        date: "2024-09-28",
        text: "איזון מצוין בין ברים חבויים לאזורי מורשת. התרגום החי מול ספקים חסך לנו זמן."
      }
    ],
    provider: {
      name: "Hiroshi K.",
      avatar: providerAvatar,
      rating: 4.9,
      responseTime: "משיב תוך 5 דקות",
      languages: ["אנגלית", "יפנית", "סינית מנדרינית"],
      experience: "3 שנות הדרכה באוקלנד",
      verified: true
    }
  }
};

const ServiceDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const locale = resolveLocale(i18n.language);
  const localeKey: ServiceLocale =
    locale === "zh" || locale === "pt" || locale === "es" || locale === "fr" || locale === "he"
      ? (locale as ServiceLocale)
      : "en";
  const serviceTemplate = serviceCopy[localeKey];

  const service = {
    id: id || "1",
    category: "Local Experience",
    availableNow: true,
    ...serviceTemplate
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
                  alt="Auckland street" 
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1553621042-f6e147245754" 
                  alt="Auckland food" 
                  className="w-full h-24 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1" 
                  alt="Auckland garden" 
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
                <span className="text-3xl font-bold mr-2 text-brand-teal">
                  {service.currencySymbol}
                  {service.price}
                </span>
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
