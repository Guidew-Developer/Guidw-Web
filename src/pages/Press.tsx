import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Megaphone, Newspaper, PhoneCall, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const copy = {
  en: {
    hero: {
      badge: "Press & Media",
      title: "Guidew news and media materials",
      description:
        "Guidew is building a global local-skill network. Learn about our mission, tech stack, and milestones."
    },
    highlights: [
      { label: "15% platform fee", detail: "Transparent structure that rewards long-term collaboration." },
      { label: "$9.9 VIP", detail: "AI matching, zero-fee orders, and priority routing for power users." },
      { label: "Dual-app experience", detail: "Travelers and providers enjoy tailored interfaces and features." }
    ],
    notes: [
      {
        title: "Product stage",
        content: "MVP focuses on Auckland/Wellington with 1,000 beta users, scaling to 5-10k within 12 months."
      },
      {
        title: "Typical scenarios",
        content: "City buddies, translation, on-demand lessons, outdoor guiding, and event support with trustworthy offline help."
      },
      {
        title: "Tech highlights",
        content: "AI recommendations, auto-accept, itinerary planning, chat, wallet, and map/list toggles."
      }
    ],
    cta: {
      title: "Media interviews & partnerships",
      description:
        "Request city data, VIP growth plans, AI roadmap, or global expansion insights. We respond within 24 hours.",
      email: "hello@guidew.com",
      kit: "Download media kit"
    }
  },
  zh: {
    hero: {
      badge: "Press & Media",
      title: "Guidew 最新动态与媒体资料",
      description: "Guidew 正在搭建全球化本地技能网络，欢迎了解我们的使命、技术路线与阶段性成果。"
    },
    highlights: [
      { label: "15% 平台佣金", detail: "透明的交易结构，鼓励服务者和用户长期合作。" },
      { label: "9.9 美元 VIP", detail: "提供 AI 匹配、免佣订单与优先分发，让高频用户更放心。" },
      { label: "双应用体验", detail: "普通用户与服务提供者拥有不同的核心界面与功能集合。" }
    ],
    notes: [
      { title: "产品阶段", content: "MVP 聚焦奥克兰与惠灵顿，目标 1,000 名测试用户；12 个月扩展到 5,000-10,000 名种子用户。" },
      { title: "典型场景", content: "陌生城市陪同、商务翻译、课程上门、户外指南、活动协助等，强调线下可信赖的陪伴服务。" },
      { title: "技术亮点", content: "AI 智能推荐、自动接单、行程规划、聊天与钱包系统、地图与列表自由切换。" }
    ],
    cta: {
      title: "媒体采访与合作",
      description: "欢迎索取城市运营数据、VIP 计划、AI 赋能方案与全球扩张路线，我们将在 24 小时内响应。",
      email: "hello@guidew.com",
      kit: "下载媒体资料"
    }
  }
} as const;

const Press = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = copy[locale];
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 text-brand-teal uppercase tracking-[0.2em] text-xs mb-4">
              <Megaphone className="h-4 w-4" />
              {content.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{content.hero.title}</h1>
            <p className="text-lg text-gray-600">{content.hero.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {content.highlights.map(item => (
              <div key={item.label} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                <p className="text-sm uppercase text-brand-teal mb-2">{item.label}</p>
                <p className="text-gray-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {content.notes.map(note => (
              <div key={note.title} className="border border-brand-lightGray rounded-2xl p-6 bg-brand-lightGray/40">
                <h3 className="text-xl font-semibold mb-3 text-brand-darkBlue">{note.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{note.content}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Newspaper className="h-7 w-7" />
              {content.cta.title}
            </h2>
            <p className="text-white/90 mb-6">{content.cta.description}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="mailto:hello@guidew.com" className="px-6 py-3 bg-white text-brand-teal rounded-full font-semibold">
                <PhoneCall className="inline-block mr-2 h-4 w-4" />
                {content.cta.email}
              </a>
              <Link to="/press/kit" className="px-6 py-3 border border-white/60 rounded-full text-white font-semibold">
                <Globe className="inline-block mr-2 h-4 w-4" />
                {content.cta.kit}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Press;
