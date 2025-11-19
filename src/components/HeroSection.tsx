
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";
import { useTranslation } from "react-i18next";
import { resolveLocale, type SupportedLocale } from "@/utils/locale";

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

type HeroSlideLayout = "default" | "reverse" | "spotlight" | "immersive";

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
  layout?: HeroSlideLayout;
};

const heroSlides: Record<SupportedLocale, HeroSlide[]> = {
  en: [
    {
      id: "local-expertise",
      kicker: "Local Experts",
      title: "Local Expertise,",
      highlight: "On Demand",
      description:
        "Connect with trusted locals for city tours, translation, or skill coaching—all from a single app.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Local expert guiding tourists",
      layout: "default",
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
      id: "elite-advisors",
      kicker: "Global Advisory",
      title: "Top Experts Across Fields,",
      highlight: "Your Personal Board",
      description:
        "Spin up strategy, culture, or growth sessions with exec coaches, VC mentors, and local fixers who join your call within minutes.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Advisors meeting virtually with clients",
      layout: "reverse",
      cta: "button",
      button: {
        label: "Book a private advisor",
        to: "/discover?category=business"
      },
      badges: [
        {
          id: "badge-board-en",
          type: "info",
          title: "Strategy • Culture • Legal",
          subtitle: "Curated mentors",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-en",
          type: "info",
          title: "30 min response",
          subtitle: "24/7 timezones",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "Elite Concierge",
      title: "Live Like A Billionaire,",
      highlight: "Experts On Standby",
      description:
        "Personal sommeliers, yacht skippers, wardrobe stylists, and crisis fixers choreograph every detail across New Zealand within minutes.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Luxury concierge team planning experiences",
      layout: "spotlight",
      cta: "button",
      button: {
        label: "Unlock VIP concierge",
        to: "/discover?category=professional"
      },
      badges: [
        {
          id: "badge-luxe-team-en",
          type: "info",
          title: "Lifestyle architects",
          subtitle: "6-star concierge",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-en",
          type: "info",
          title: "15 min response",
          subtitle: "Nationwide coverage",
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
        "Download Guidew and instantly call Auckland or Wellington experts—dance coaches, language partners, or rescue teams with AI matching and VIP perks.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Downloading Guidew app on phone",
      layout: "reverse",
      cta: "button",
      button: {
        label: "Download the app",
        to: "/download"
      },
      badges: [
        {
          id: "badge-app",
          type: "info",
          title: "iOS & Android",
          subtitle: "Scan to install",
          position: "-left-3 top-1/4",
          delay: "0.5s"
        },
        {
          id: "badge-vip",
          type: "info",
          title: "VIP perks",
          subtitle: "AI itinerary assistant",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "9.9 USD/month,",
      highlight: "Unlock AI Concierge",
      description:
        "Skip the 15% hire fee, chat with AI to describe your needs, and enjoy priority matching plus auto-accept tools for providers in Auckland and Wellington.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "VIP members chatting with AI planner",
      layout: "immersive",
      cta: "button",
      button: {
        label: "Join VIP",
        to: "/vip"
      },
      badges: [
        {
          id: "badge-vip-fee-en",
          type: "info",
          title: "No 15% fee",
          subtitle: "VIP-only hires",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-en",
          type: "info",
          title: "AI concierge",
          subtitle: "Priority matching",
          position: "right-6 bottom-10",
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
        "Design your schedule and offer dance lessons, translation, or city buddies. Earn higher payouts and automate bookings with AI tools.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Creator planning routes on laptop",
      layout: "default",
      cta: "button",
      button: {
        label: "Start building",
        to: "/become-expert"
      },
      badges: [
        {
          id: "badge-impact",
          type: "info",
          title: "1M+ creators",
          subtitle: "Global network by 2026",
          position: "-left-6 top-1/3",
          delay: "0.5s"
        },
        {
          id: "badge-earning",
          type: "info",
          title: "High commission",
          subtitle: "Transparent payouts",
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
        "From bohemian rooftops to Auckland's harbour, we fly champions to your door. Learn Kiwi-flavored Bachata in two hours plus stage confidence.",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Dancers practicing Bachata with mentor",
      layout: "spotlight",
      cta: "button",
      button: {
        label: "Book a champion coach",
        to: "/discover?category=dance"
      },
      badges: [
        {
          id: "badge-stars",
          type: "info",
          title: "World champions",
          subtitle: "Bachata mentors",
          position: "-left-4 top-1/4",
          delay: "0.3s"
        },
        {
          id: "badge-sessions",
          type: "info",
          title: "40+ private sessions",
          subtitle: "Auckland & Wellington",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    }
  ],
  zh: [
    {
      id: "local-expertise",
      kicker: "Local Experts",
      title: "随叫随到的本地专家，",
      highlight: "就在手机里",
      description: "一键召唤城市陪同、翻译伙伴或技能导师，真实人脉即时响应。",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "本地专家带路",
      layout: "default",
      cta: "search",
      badges: [
        { id: "badge-location", type: "location", position: "-left-4 top-1/4", delay: "0s" },
        { id: "badge-community", type: "community", position: "right-4 bottom-1/4", delay: "2s" }
      ]
    },
    {
      id: "elite-advisors",
      kicker: "全球顾问席位",
      title: "让各领域顶级专家成为你的",
      highlight: "专属顾问",
      description:
        "无论企业战略、跨文化沟通还是海外落地，立即召集中外导师与本地 Fixer，30 分钟内一起进入你的专属会议室。",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "顾问远程会议",
      layout: "reverse",
      cta: "button",
      button: { label: "立即预约顾问", to: "/discover?category=business" },
      badges: [
        {
          id: "badge-board-zh",
          type: "info",
          title: "战略 · 文化 · 法务",
          subtitle: "一键匹配导师",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-zh",
          type: "info",
          title: "30 分钟响应",
          subtitle: "覆盖全球时区",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "奢华生活管家",
      title: "像亿万富豪一样生活，",
      highlight: "让各路专家随叫随到",
      description:
        "私人侍酒师、游艇船长、衣橱顾问与危机处理团队在新西兰全境待命，15 分钟内响应你的任何愿望。",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "奢华生活管家团队",
      layout: "spotlight",
      cta: "button",
      button: { label: "解锁奢华管家", to: "/discover?category=professional" },
      badges: [
        {
          id: "badge-luxe-team-zh",
          type: "info",
          title: "生活设计师",
          subtitle: "六星级管家团队",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-zh",
          type: "info",
          title: "15 分钟响应",
          subtitle: "覆盖全新西兰",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "download-app",
      kicker: "Guidew App",
      title: "一键下载，",
      highlight: "把灵感变成行程",
      description:
        "随时呼叫奥克兰和惠灵顿的本地专家、舞蹈导师、语言伙伴或救援团队。App 支持 AI 匹配、VIP 免佣与行程管理。",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "下载 Guidew 应用",
      layout: "reverse",
      cta: "button",
      button: { label: "立即下载 APP", to: "/download" },
      badges: [
        { id: "badge-app", type: "info", title: "iOS & Android", subtitle: "扫码即刻安装", position: "-left-3 top-1/4", delay: "0.5s" },
        { id: "badge-vip", type: "info", title: "VIP 免佣", subtitle: "AI 行程助手", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "每月 9.9 美元，",
      highlight: "解锁 AI 管家",
      description:
        "VIP 用户免 15% 平台佣金，直接用多语言 AI 描述需求并获得优先匹配；服务者可启用自动接单与 AI 行程规划，奥克兰和惠灵顿同步开放。",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "VIP 会员与 AI 规划师沟通",
      layout: "immersive",
      cta: "button",
      button: { label: "加入 VIP", to: "/vip" },
      badges: [
        {
          id: "badge-vip-fee-zh",
          type: "info",
          title: "免 15% 佣金",
          subtitle: "VIP 专享",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-zh",
          type: "info",
          title: "AI 管家",
          subtitle: "优先匹配",
          position: "right-6 bottom-10",
          delay: "2s"
        }
      ]
    },
    {
      id: "creator-network",
      kicker: "成为 Guidew 专家",
      title: "设计你的工作节奏，",
      highlight: "加入全球创作者网络",
      description: "提供舞蹈教学、翻译陪同或城市陪游等技能，享受高佣金与 AI 工具管理订单。",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "创作者计划行程",
      layout: "default",
      cta: "button",
      button: { label: "开始打造", to: "/become-expert" },
      badges: [
        { id: "badge-impact", type: "info", title: "1M+ Creators", subtitle: "2026 全球网络", position: "-left-6 top-1/3", delay: "0.5s" },
        { id: "badge-earning", type: "info", title: "高佣金回报", subtitle: "透明结算", position: "right-2 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "global-dance",
      kicker: "冠军导师随叫随到",
      title: "把世界冠军请到你家，",
      highlight: "两小时掌握 Kiwi 风味 Bachata",
      description: "从波西米亚屋顶到奥克兰海港，冠军导师手把手教舞，还帮你提升舞台表现与社交自信。",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "舞者随导师练习",
      layout: "spotlight",
      cta: "button",
      button: { label: "预约冠军导师", to: "/discover?category=dance" },
      badges: [
        { id: "badge-stars", type: "info", title: "世界冠军", subtitle: "Bachata 导师团", position: "-left-4 top-1/4", delay: "0.3s" },
        { id: "badge-sessions", type: "info", title: "每周 40+ 私教", subtitle: "奥克兰·惠灵顿", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    }
  ]
};

const badgeCopy = {
  en: {
    locationTitle: "Local Expert",
    locationDistance: "5 min away",
    communityTitle: "500+ Experts",
    communitySubtitle: "In your area"
  },
  zh: {
    locationTitle: "附近专家",
    locationDistance: "5 分钟可达",
    communityTitle: "500+ 服务者",
    communitySubtitle: "就在你身边"
  }
} as const;

const searchCopy = {
  en: {
    placeholder: "Where are you going?",
    button: "Search",
    slideLabel: "Go to slide"
  },
  zh: {
    placeholder: "想去哪里？",
    button: "搜索",
    slideLabel: "跳转到幻灯片"
  }
} as const;

type LayoutConfig = {
  container: string;
  contentWrapper: string;
  bodyCopy: string;
  ctaWrapper: string;
  imageWrapper: string;
  imageFrame: string;
  imageClass: string;
  imageGlow?: string;
};

const heroLayoutStyles: Record<HeroSlideLayout, LayoutConfig> = {
  default: {
    container: "flex w-full flex-col lg:flex-row",
    contentWrapper: "lg:w-1/2 text-center lg:text-left items-center lg:items-start mb-12 lg:mb-0",
    bodyCopy: "max-w-xl mx-auto lg:mx-0",
    ctaWrapper: "max-w-md mx-auto lg:mx-0",
    imageWrapper: "lg:w-1/2 lg:justify-end",
    imageFrame: "w-full max-w-lg",
    imageClass: "w-full rounded-xl shadow-xl h-[340px] object-cover"
  },
  reverse: {
    container: "flex w-full flex-col lg:flex-row-reverse",
    contentWrapper: "lg:w-1/2 text-center lg:text-right items-center lg:items-end mb-12 lg:mb-0",
    bodyCopy: "max-w-xl mx-auto lg:mx-0 lg:ml-auto",
    ctaWrapper: "max-w-md mx-auto lg:mx-0 lg:ml-auto",
    imageWrapper: "lg:w-1/2 lg:justify-start",
    imageFrame: "w-full max-w-lg",
    imageClass: "w-full rounded-[32px] shadow-2xl h-[360px] object-cover",
    imageGlow: "-inset-6 -z-10 bg-gradient-to-br from-brand-orange/30 via-brand-teal/20 to-brand-darkBlue/30 opacity-70 blur-3xl rounded-[40px]"
  },
  spotlight: {
    container: "grid w-full grid-cols-1 gap-10 lg:grid-cols-[0.65fr_0.35fr] lg:gap-16",
    contentWrapper:
      "order-2 lg:order-1 w-full rounded-2xl border border-white/60 bg-white/90 backdrop-blur px-8 py-10 text-left items-start shadow-2xl",
    bodyCopy: "max-w-2xl",
    ctaWrapper: "max-w-sm w-full",
    imageWrapper: "order-1 lg:order-2",
    imageFrame: "w-full max-w-xl",
    imageClass: "w-full rounded-[36px] shadow-2xl h-[380px] object-cover",
    imageGlow: "-inset-8 -z-10 bg-gradient-to-br from-brand-darkBlue/30 via-brand-teal/40 to-brand-orange/30 opacity-80 blur-3xl rounded-[48px]"
  },
  immersive: {
    container: "relative w-full min-h-[520px] flex items-center justify-center",
    contentWrapper:
      "relative z-10 w-full max-w-3xl text-center items-center rounded-[36px] border border-white/60 bg-white/90 px-10 py-12 backdrop-blur shadow-[0_45px_140px_rgba(15,23,42,0.35)]",
    bodyCopy: "max-w-2xl mx-auto",
    ctaWrapper: "w-full max-w-md mx-auto",
    imageWrapper: "absolute inset-0",
    imageFrame: "w-full h-full",
    imageClass: "w-full h-full rounded-[48px] object-cover opacity-90",
    imageGlow: "-inset-4 rounded-[50px] bg-gradient-to-r from-brand-darkBlue/60 via-brand-teal/40 to-brand-orange/40 mix-blend-multiply"
  }
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const { openDownloadDialog } = useDownloadDialog();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const slides = useMemo(() => heroSlides[locale], [locale]);
  const hasMultipleSlides = slides.length > 1;
  const extendedSlides = useMemo(() => {
    if (!slides.length) {
      return [];
    }
    if (!hasMultipleSlides) {
      return slides;
    }
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];
    return [lastSlide, ...slides, firstSlide];
  }, [slides, hasMultipleSlides]);
  const copy = searchCopy[locale];
  const badges = badgeCopy[locale];

  useEffect(() => {
    setCurrentSlide(0);
    setCarouselIndex(slides.length > 1 ? 1 : 0);
  }, [slides]);

  useEffect(() => {
    if (!hasMultipleSlides) {
      return;
    }
    const timer = setInterval(() => {
      setCarouselIndex(prev => prev + 1);
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [hasMultipleSlides, slides.length]);

  useEffect(() => {
    if (isTransitionEnabled) {
      return;
    }
    const frame = requestAnimationFrame(() => setIsTransitionEnabled(true));
    return () => cancelAnimationFrame(frame);
  }, [isTransitionEnabled]);

  const contentBaseClass =
    "w-full transition-all duration-500 min-h-[320px] flex flex-col justify-center";
  const imageBaseClass = "w-full transition-all duration-500 flex justify-center";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/discover");
  };

  const handleButtonCta = (slide: HeroSlide) => {
    // download slide marker
    if (slide.button?.to === "/download") {
      openDownloadDialog();
      return;
    }
    if (slide.button) {
      navigate(slide.button.to);
    }
  };

  const handleDotClick = (index: number) => {
    if (index === currentSlide) {
      return;
    }
    setCurrentSlide(index);
    if (hasMultipleSlides) {
      setCarouselIndex(index + 1);
    }
  };

  const handleTrackTransitionEnd = () => {
    if (!hasMultipleSlides) {
      return;
    }
    if (carouselIndex === 0) {
      setIsTransitionEnabled(false);
      setCarouselIndex(slides.length);
    } else if (carouselIndex === slides.length + 1) {
      setIsTransitionEnabled(false);
      setCarouselIndex(1);
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
              <p className="text-xs font-medium">{badges.locationTitle}</p>
              <p className="text-xs text-gray-500">{badges.locationDistance}</p>
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
              <p className="text-xs font-medium">{badges.communityTitle}</p>
              <p className="text-xs text-gray-500">{badges.communitySubtitle}</p>
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
      
      <div className="w-full pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="relative overflow-hidden">
          <div
            className={`flex ${isTransitionEnabled ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {extendedSlides.map((slide, index) => {
              const slideLayout = heroLayoutStyles[slide.layout ?? "default"];
              return (
                <div key={`${slide.id}-${index}`} className="min-w-full shrink-0">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className={`${slideLayout.container} items-center min-h-[520px]`}>
                      {/* Hero content */}
                      <div className={`${contentBaseClass} ${slideLayout.contentWrapper}`}>
                        <p className="uppercase tracking-[0.4em] text-sm text-brand-teal mb-4">{slide.kicker}</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                          {slide.title}
                          <br />
                          <span className="gradient-text">{slide.highlight}</span>
                        </h1>
                        <p className={`text-lg md:text-xl text-gray-600 mb-8 ${slideLayout.bodyCopy}`}>
                          {slide.description}
                        </p>
                        
                        {slide.cta === "search" ? (
                          <form
                            onSubmit={handleSearch}
                            className={`flex w-full flex-col sm:flex-row gap-3 ${slideLayout.ctaWrapper}`}
                          >
                            <div className="relative flex-grow">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                placeholder={copy.placeholder}
                                className="pl-10 bg-white border-gray-200 focus-visible:ring-brand-teal h-12"
                              />
                            </div>
                            <Button type="submit" className="bg-brand-teal hover:bg-brand-teal/90 h-12">
                              <Search className="mr-2 h-4 w-4" /> {copy.button}
                            </Button>
                          </form>
                        ) : (
                          <div className={`flex w-full flex-col sm:flex-row gap-3 ${slideLayout.ctaWrapper}`}>
                            <Button className="h-12 bg-brand-teal hover:bg-brand-teal/90 text-base" onClick={() => handleButtonCta(slide)}>
                              {slide.button?.label}
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Hero image */}
                      <div className={`${imageBaseClass} ${slideLayout.imageWrapper}`}>
                        <div className={`relative ${slideLayout.imageFrame}`}>
                          {slideLayout.imageGlow && (
                            <div className={`absolute ${slideLayout.imageGlow}`}></div>
                          )}
                          <img
                            src={slide.image}
                            alt={slide.imageAlt}
                            className={`${slideLayout.imageClass} animate-float`}
                          />
                          
                          {/* Floating badges */}
                          {slide.badges.map(badge => (
                            <div
                              key={`${slide.id}-${badge.id}`}
                              className={`absolute ${badge.position} bg-white p-3 rounded-lg shadow-lg animate-float`}
                              style={{ animationDelay: badge.delay }}
                            >
                              {renderBadgeContent(badge)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-2 mt-12">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                aria-label={`${copy.slideLabel} ${index + 1}`}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-10 rounded-full transition ${
                  index === currentSlide ? "bg-brand-teal" : "bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default HeroSection;
