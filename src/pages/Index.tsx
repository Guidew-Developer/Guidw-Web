import { useState } from "react";
import { MapPin, Globe, Languages, Music, Book, Coffee, Camera, Utensils, ChevronRight, AlertTriangle, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const featuredServices = {
  en: [
    {
      id: "1",
      title: "Local City Tour with Hidden Gems",
      description: "Discover secret spots and local favorites perfect for your first day in town.",
      category: "City Guide",
      price: 40,
      rating: 4.9,
      location: "Auckland, New Zealand",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=987&q=80"
    },
    {
      id: "2",
      title: "Business Meeting Translation Services",
      description: "Professional interpretation so every cross-border meeting stays clear and confident.",
      category: "Translation",
      price: 60,
      rating: 4.8,
      location: "Wellington, New Zealand",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "3",
      title: "Salsa Dance Introduction & Practice",
      description: "Learn salsa fundamentals with a champion instructor—no experience needed.",
      category: "Dance",
      price: 35,
      rating: 4.7,
      location: "Queenstown, New Zealand",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=2070&q=80"
    }
  ],
  zh: [
    {
      id: "1",
      title: "本地城市隐藏宝地之旅",
      description: "第一天就跟随本地达人，走进只属于当地人的秘境。",
      category: "城市向导",
      price: 40,
      rating: 4.9,
      location: "奥克兰，新西兰",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=987&q=80"
    },
    {
      id: "2",
      title: "商务会议口译服务",
      description: "专业译员陪同跨境会议，让每一句话都准确无误。",
      category: "翻译服务",
      price: 60,
      rating: 4.8,
      location: "惠灵顿，新西兰",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: "3",
      title: "萨尔萨入门私教",
      description: "两小时掌握基础步伐与节奏，冠军导师亲自带练。",
      category: "舞蹈",
      price: 35,
      rating: 4.7,
      location: "皇后镇，新西兰",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=2070&q=80"
    }
  ]
} as const;

const testimonials = {
  en: [
    {
      content:
        "Landing in Auckland with zero contacts, Guidew introduced me to underground jazz bars and a Bachata crew. Two weeks later I was greeting everyone in Māori and felt like a local.",
      author: { name: "Lily West", title: "London · Weekend dancer", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
    },
    {
      content:
        "Moving to Wellington for a game studio, I needed a social jumpstart. Guidew matched me with a translation buddy who taught Kiwi business etiquette by day and introduced me to tech meetups by night.",
      author: { name: "Mateo Rivera", title: "Mexico · Founder", avatar: "https://randomuser.me/api/portraits/men/54.jpg" }
    },
    {
      content:
        "During Queenstown's ski season, a local coach from Guidew took me to hidden Māori workshops and alpaca farms. I finally felt the soul of New Zealand.",
      author: { name: "Ava Nguyen", title: "Vietnam · Adventurer", avatar: "https://randomuser.me/api/portraits/women/29.jpg" }
    }
  ],
  zh: [
    {
      content:
        "第一次踏上奥克兰，我一个朋友都没有。Guidew 的专家带我夜访地下爵士俱乐部，还介绍我加入 Bachata 社团，两周后用毛利语问候所有人。",
      author: { name: "Lily West", title: "来自伦敦 · 周末舞者", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
    },
    {
      content:
        "我搬到惠灵顿创办游戏工作室，社交圈一片空白。Guidew 帮我找到翻译兼 City Buddy，白天教我 Kiwi 式商务礼仪，晚上直接带进科技圈。",
      author: { name: "Mateo Rivera", title: "来自墨西哥 · 创业者", avatar: "https://randomuser.me/api/portraits/men/54.jpg" }
    },
    {
      content:
        "在皇后镇滑雪季，Guidew 让我认识热爱毛利文化的教练。她带我拜访部落工坊，还推荐驼羊牧场里的即兴舞会，我终于感受到新西兰的灵魂。",
      author: { name: "Ava Nguyen", title: "来自越南 · 冒险爱好者", avatar: "https://randomuser.me/api/portraits/women/29.jpg" }
    }
  ]
} as const;

const copy = {
  en: {
    notice:
      "This site is a demo for research. Please do not register, pay, or rely on the data—everything is mock content.",
    noticeButton: "Got it",
    categories: {
      badge: "Diverse Expertise",
      title: "What kind of help do you need?",
      description:
        "From city guides and language assistance to specialized skills, find trusted experts anywhere.",
      cards: [
        { title: "City Guides", description: "Hidden gems and custom tours.", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "Translation Services", description: "Break barriers with interpreters on demand.", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "Cultural Experiences", description: "Immerse yourself in local traditions.", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "Skill Instruction", description: "Learn cooking, music, dance, and more.", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "View all categories"
    },
    featured: {
      badge: "Top Picks",
      title: "Featured Services",
      description: "Explore our most-loved services from top-rated locals.",
      cta: "Explore all services"
    },
    howItWorks: {
      badge: "Simple Process",
      title: "How It Works",
      description: "Connect with local expertise in three easy steps.",
      steps: [
        { title: "Discover", description: "Browse services near you or your destination.", icon: MapPin },
        { title: "Book", description: "Choose a time and confirm instantly.", icon: Calendar },
        { title: "Experience", description: "Meet your expert and enjoy personalized help.", icon: Coffee }
      ],
      cta: "Learn more about the process"
    },
    testimonials: {
      badge: "User Stories",
      title: "What Our Users Say",
      description: "Travelers and locals share how Guidew transformed their trips."
    },
    cta: {
      title: "Ready to experience local expertise?",
      description: "Join thousands of travelers and locals connecting through Guidew.",
      find: "Find an Expert",
      become: "Become an Expert"
    }
  },
  zh: {
    notice: "当前网站仍处于研发阶段，仅用于演示。请勿注册、支付或依据页面信息做实际决策，所有数据为模拟内容。",
    noticeButton: "我已了解",
    categories: {
      badge: "多元技能",
      title: "需要什么帮助？",
      description: "从城市陪同、语言协助到专业技能，在任何地方找到可信赖的专家。",
      cards: [
        { title: "城市向导", description: "发现隐藏景点与专属行程。", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "翻译服务", description: "实时翻译，跨语言零障碍。", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "文化体验", description: "沉浸式感受本地传统。", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "技能教学", description: "烹饪、舞蹈、音乐等定制课程。", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "查看全部类别"
    },
    featured: {
      badge: "精选推荐",
      title: "热门服务",
      description: "探索来自全球顶级本地专家的热门体验。",
      cta: "查看更多服务"
    },
    howItWorks: {
      badge: "三步即可",
      title: "Guidew 如何运作",
      description: "三步连接本地专家，享受个性化体验。",
      steps: [
        { title: "发现", description: "浏览附近或目的地的服务。", icon: MapPin },
        { title: "预订", description: "选择时间地点，一键确认。", icon: Calendar },
        { title: "体验", description: "线下见面，享受专属陪伴。", icon: Coffee }
      ],
      cta: "了解完整流程"
    },
    testimonials: {
      badge: "用户故事",
      title: "真实反馈",
      description: "旅行者与本地人分享他们与 Guidew 的故事。"
    },
    cta: {
      title: "准备好体验本地服务了吗？",
      description: "加入数千名旅行者和当地人，通过 Guidew 连接真实帮助。",
      find: "寻找专家",
      become: "成为专家"
    }
  }
} as const;

const Index = () => {
  const [showNotice, setShowNotice] = useState(true);
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = copy[locale];
  const services = featuredServices[locale];
  const stories = testimonials[locale];

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
                <p>{content.notice}</p>
              </div>
              <button
                onClick={() => setShowNotice(false)}
                className="text-xs font-semibold uppercase tracking-wide text-brand-teal hover:underline"
              >
                {content.noticeButton}
              </button>
            </div>
          </div>
        )}

        <HeroSection />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.categories.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.categories.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.categories.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.categories.cards.map(card => (
                <CategoryCard key={card.title} {...card} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/discover" className="inline-block">
                <Button variant="outline" className="group">
                  {content.categories.cta} <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.featured.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.featured.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.featured.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/discover" className="inline-block">
                <Button className="bg-brand-teal hover:bg-brand-teal/90">{content.featured.cta}</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.howItWorks.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.howItWorks.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.howItWorks.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {content.howItWorks.steps.map(step => (
                <div key={step.title} className="text-center">
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/how-it-works" className="inline-block">
                <Button variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white">
                  {content.howItWorks.cta}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.testimonials.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.testimonials.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.testimonials.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stories.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{content.cta.title}</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{content.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="inline-flex justify-center">
                <Button className="bg-white text-brand-teal hover:bg-white/90">{content.cta.find}</Button>
              </Link>
              <Link to="/become-expert" className="inline-flex justify-center">
                <Button
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-brand-teal"
                >
                  {content.cta.become}
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

export default Index;
