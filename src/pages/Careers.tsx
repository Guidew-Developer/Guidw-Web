import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Rocket, Users2, Target, type LucideIcon } from "lucide-react";
import { getCareerOpenings } from "@/constants/siteContent";
import { useTranslation } from "react-i18next";
import { resolveLocale, type SupportedLocale } from "@/utils/locale";

type CareersCopy = {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  values: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
  openRolesTitle: string;
  actions: {
    viewDetails: string;
    apply: string;
  };
};

const copy: Record<SupportedLocale, CareersCopy> = {
  en: {
    hero: {
      badge: "Join The Mission",
      title: "Redefine offline skill sharing with Guidew",
      description:
        "We're bringing on designers, product minds, engineers, and local operators to serve the first 1,000+ users in Auckland and Wellington before scaling to every city."
    },
    values: [
      {
        title: "Human-centered design",
        description: "We follow travelers and providers through real scenes and build experiences that remove their pain immediately.",
        icon: Users2
      },
      {
        title: "Fast validation",
        description: "Ship the MVP in 6 months, scale to two cities in 12—small launches, constant delivery.",
        icon: Rocket
      },
      {
        title: "Trust & safety",
        description: "Identity checks, orders, and payouts are designed so every offline interaction feels secure.",
        icon: Target
      }
    ],
    openRolesTitle: "Open Roles",
    actions: {
      viewDetails: "View Details",
      apply: "Apply Now"
    }
  },
  zh: {
    hero: {
      badge: "Guidew 招募",
      title: "与 Guidew 一起重新定义线下技能共享",
      description:
        "我们需要擅长打造可信体验的设计师、产品人、工程师与本地运营专家，共同服务奥克兰与惠灵顿的 1000+ 首批用户，并将模式复制到全球。"
    },
    values: [
      {
        title: "以用户为中心",
        description: "我们观察旅行者与服务者在真实场景中的痛点，设计可以立即落地的体验。",
        icon: Users2
      },
      {
        title: "快速验证",
        description: "6 个月交付 MVP，12 个月完成双城规模化——小步快跑、持续交付。",
        icon: Rocket
      },
      {
        title: "信任与安全",
        description: "从身份认证、订单流程到支付结算，所有环节都围绕安全感设计。",
        icon: Target
      }
    ],
    openRolesTitle: "开放职位",
    actions: {
      viewDetails: "查看详情",
      apply: "申请职位"
    }
  }
};

const Careers = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = copy[locale];
  const openings = useMemo(() => getCareerOpenings(i18n.language), [i18n.language]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-brand-teal uppercase tracking-[0.3em] mb-4">{content.hero.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{content.hero.title}</h1>
            <p className="text-lg text-gray-600">{content.hero.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
            {content.values.map(({ title, description, icon: Icon }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-brand-lightGray">
                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-brand-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-brand-teal" />
              <h2 className="text-3xl font-bold text-brand-darkBlue">{content.openRolesTitle}</h2>
            </div>
            <div className="space-y-6">
              {openings.map(role => (
                <div key={role.id} className="border border-brand-lightGray rounded-2xl p-6 bg-brand-lightGray/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{role.title}</h3>
                      <p className="text-sm text-gray-500">{role.location}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {role.tags.map(tag => (
                        <span key={tag} className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-white text-brand-teal border border-brand-teal/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/careers/${role.id}`}
                      className="px-5 py-2 rounded-full bg-brand-teal text-white text-sm font-medium hover:bg-brand-teal/90 transition"
                    >
                      {content.actions.viewDetails}
                    </Link>
                    <button className="px-5 py-2 rounded-full border border-brand-teal text-brand-teal text-sm font-medium hover:bg-brand-teal/10 transition">
                      {content.actions.apply}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
