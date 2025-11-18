
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";

type HeroBadge =
  | {
      id: string;
      type: "location" | "community";
      position: string;
      delay: string;
    }
  | {
      id: string;
      type: "info";
      title: string;
      subtitle: string;
      position: string;
      delay: string;
    };

type HeroSlide = {
  id: string;
  kicker: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: "search" | "button";
  button?: {
    label: string;
    to: string;
  };
  badges: HeroBadge[];
};

const slides: HeroSlide[] = [
  {
    id: "local-expertise",
    kicker: "Local Experts",
    title: "Local Expertise,",
    highlight: "On Demand",
    description:
      "Connect with local experts who provide personalized services - from city guides and translators to skill instructors, all at your fingertips.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Local expert guiding tourists",
    cta: "search",
    badges: [
      {
        id: "badge-location",
        type: "location",
        position: "-left-4 top-1/4",
        delay: "0s"
      },
      {
        id: "badge-community",
        type: "community",
        position: "right-4 bottom-1/4",
        delay: "2s"
      }
    ]
  },
  {
    id: "download-app",
    kicker: "Guidew App",
    title: "Turn Moments Into",
    highlight: "Local Magic",
    description:
      "一键下载 Guidew App，随时呼叫奥克兰和惠灵顿的本地专家、舞蹈导师、语言伙伴或救援团队。App 内支持 AI 智能匹配、VIP 免佣和行程管理。",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Downloading Guidew app on phone",
    cta: "button",
    button: {
      label: "立即下载 APP",
      to: "/download"
    },
    badges: [
      {
        id: "badge-app",
        type: "info",
        title: "iOS & Android",
        subtitle: "扫码即刻安装",
        position: "-left-3 top-1/4",
        delay: "0.5s"
      },
      {
        id: "badge-vip",
        type: "info",
        title: "VIP 免佣",
        subtitle: "AI 行程助手",
        position: "right-4 bottom-1/3",
        delay: "2s"
      }
    ]
  },
  {
    id: "creator-network",
    kicker: "Become a Guidew Expert",
    title: "Create Your Own Work,",
    highlight: "Join 1M+ Job Creators",
    description:
      "设计你的专属职业节奏，提供舞蹈教学、翻译陪同或城市陪游等技能服务。Guidew 让你享受高佣金，并用 AI 工具管理订单。",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Creator planning routes on laptop",
    cta: "button",
    button: {
      label: "开始打造",
      to: "/become-expert"
    },
    badges: [
      {
        id: "badge-impact",
        type: "info",
        title: "1M+ Creators",
        subtitle: "Global network by 2026",
        position: "-left-6 top-1/3",
        delay: "0.5s"
      },
      {
        id: "badge-earning",
        type: "info",
        title: "高佣金回报",
        subtitle: "透明结算",
        position: "right-2 bottom-1/3",
        delay: "2s"
      }
    ]
  },
  {
    id: "global-dance",
    kicker: "Dance Legends On Call",
    title: "Invite World Champions,",
    highlight: "Master Bachata In NZ",
    description:
      "从盛开的波西米亚到奥克兰的海港，我们把国际冠军请到你家门口。跟随他们在两小时内掌握 Kiwi 风味的 Bachata，顺便学习舞台表现与社交自信。",
    image:
      "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Dancers practicing Bachata with mentor",
    cta: "button",
    button: {
      label: "预约冠军导师",
      to: "/discover?category=dance"
    },
    badges: [
      {
        id: "badge-stars",
        type: "info",
        title: "世界冠军",
        subtitle: "Bachata导师团",
        position: "-left-4 top-1/4",
        delay: "0.3s"
      },
      {
        id: "badge-sessions",
        type: "info",
        title: "每周 40+ 私教",
        subtitle: "奥克兰 & 惠灵顿",
        position: "right-4 bottom-1/3",
        delay: "2s"
      }
    ]
  }
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { openDownloadDialog } = useDownloadDialog();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = useMemo(() => slides[currentSlide], [currentSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/discover");
  };

  const handleButtonCta = () => {
    // download slide marker
    if (activeSlide.button?.to === "/download") {
      openDownloadDialog();
      return;
    }
    if (activeSlide.button) {
      navigate(activeSlide.button.to);
    }
  };

  const renderBadgeContent = (badge: HeroBadge) => {
    switch (badge.type) {
      case "location":
        return (
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium">Local Expert</p>
              <p className="text-xs text-gray-500">5 min away</p>
            </div>
          </div>
        );
      case "community":
        return (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-white h-6 w-6">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white h-6 w-6">
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium">500+ Experts</p>
              <p className="text-xs text-gray-500">In your area</p>
            </div>
          </div>
        );
      case "info":
        return (
          <div className="flex items-center">
            <div className="bg-brand-teal/10 p-2 rounded-full">
              <Briefcase className="h-4 w-4 text-brand-teal" />
            </div>
            <div className="ml-2">
              <p className="text-xs font-semibold text-brand-darkBlue">{badge.title}</p>
              <p className="text-xs text-gray-500">{badge.subtitle}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-lightGray to-white -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="flex flex-col lg:flex-row items-center min-h-[520px]">
          {/* Hero content */}
          <div
            className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 transition-all duration-500 min-h-[320px] flex flex-col justify-center"
            key={activeSlide.id}
          >
            <p className="uppercase tracking-[0.4em] text-sm text-brand-teal mb-4">{activeSlide.kicker}</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {activeSlide.title}
              <br />
              <span className="gradient-text">{activeSlide.highlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              {activeSlide.description}
            </p>
            
            {activeSlide.cta === "search" ? (
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Where are you going?"
                    className="pl-10 bg-white border-gray-200 focus-visible:ring-brand-teal h-12"
                  />
                </div>
                <Button type="submit" className="bg-brand-teal hover:bg-brand-teal/90 h-12">
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <Button className="h-12 bg-brand-teal hover:bg-brand-teal/90 text-base" onClick={handleButtonCta}>
                  {activeSlide.button?.label}
                </Button>
              </div>
            )}
          </div>
          
          {/* Hero image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative transition-all duration-500" key={`${activeSlide.id}-image`}>
            <img
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              className="w-full max-w-lg rounded-xl shadow-xl animate-float object-cover h-[340px]"
            />
            
            {/* Floating badges */}
            {activeSlide.badges.map(badge => (
              <div
                key={badge.id}
                className={`absolute ${badge.position} bg-white p-3 rounded-lg shadow-lg animate-float`}
                style={{ animationDelay: badge.delay }}
              >
                {renderBadgeContent(badge)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-12">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-10 rounded-full transition ${
                index === currentSlide ? "bg-brand-teal" : "bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default HeroSection;
