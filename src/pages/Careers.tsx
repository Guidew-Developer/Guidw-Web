import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Rocket, Users2, Target, Sparkles, Globe2, ShieldCheck, type LucideIcon } from "lucide-react";
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
  metricsTitle: string;
  metrics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  culture: {
    title: string;
    intro: string;
    highlights: Array<{
      title: string;
      description: string;
      icon: LucideIcon;
    }>;
  };
  perks: {
    title: string;
    items: string[];
  };
  closing: {
    title: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
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
    metricsTitle: "Guidew at a glance",
    metrics: [
      {
        value: "12+",
        label: "craft verticals",
        description: "Chefs, surf mentors, botanists, and more."
      },
      {
        value: "1K+",
        label: "beta travelers",
        description: "Already trusting our offline hosts."
      },
      {
        value: "48 hrs",
        label: "ship cycle",
        description: "From hypothesis to in-city pilots."
      },
      {
        value: "3 continents",
        label: "operator partners",
        description: "Asia-Pacific, Europe, and North America roots."
      }
    ],
    culture: {
      title: "Craft premium, high-trust encounters",
      intro: "Hospitality rituals meet product rigor—every decision keeps travelers and hosts at the table.",
      highlights: [
        {
          title: "Obsessed with details",
          description: "We critique every host script and field-test every welcome experience.",
          icon: Sparkles
        },
        {
          title: "Local-first mindset",
          description: "Regional operators lead; HQ removes roadblocks and unlocks budgets.",
          icon: Globe2
        },
        {
          title: "Safety is sacred",
          description: "Identity, payment, and review loops are verified before people meet.",
          icon: ShieldCheck
        }
      ]
    },
    perks: {
      title: "What you'll enjoy",
      items: [
        "Founding equity plus upside tied to every new city launch.",
        "Quarterly craftsmanship residencies to co-create offline sessions.",
        "Wellness and relocation stipend across Australia & New Zealand.",
        "Personal learning budget to shadow top masters in any craft we serve."
      ]
    },
    closing: {
      title: "Shape the benchmark for offline expertise",
      description: "If you love taking products into the real world, Guidew gives you a huge canvas. Write to the partners directly and let's scope your role.",
      ctaPrimary: "Talk to a Partner",
      ctaSecondary: "See Open Roles"
    },
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
    metricsTitle: "Guidew 一览",
    metrics: [
      {
        value: "12+",
        label: "线下体验品类",
        description: "覆盖主厨、冲浪导师、植物学家等真实场景。"
      },
      {
        value: "1000+",
        label: "内测旅行者",
        description: "已在奥克兰与惠灵顿信任我们的向导。"
      },
      {
        value: "48 小时",
        label: "迭代闭环",
        description: "从假设到城市内场景实验仅需两天。"
      },
      {
        value: "3 大洲",
        label: "运营合伙人背景",
        description: "团队成员来自亚太、欧洲与北美。"
      }
    ],
    culture: {
      title: "打造高端可信赖的会面",
      intro: "我们用产品方法与待客之道双重推演，确保旅行者与供给端始终坐在决策桌上。",
      highlights: [
        {
          title: "细节执念",
          description: "逐字推敲每份接待脚本、亲测每一次欢迎体验。",
          icon: Sparkles
        },
        {
          title: "本地主导",
          description: "区域运营拥有决策权，总部负责资源调度与节奏护航。",
          icon: Globe2
        },
        {
          title: "安全优先",
          description: "身份验证、支付托管与评价闭环在见面前全部完成。",
          icon: ShieldCheck
        }
      ]
    },
    perks: {
      title: "加入你将获得",
      items: [
        "创始期股权 + 与新城市上线挂钩的绩效激励。",
        "每季度线下驻地，与匠人共创体验设计。",
        "澳新地区搬迁及身心健康补贴。",
        "个人学习预算，可跟随任意品类的顶级导师。"
      ]
    },
    closing: {
      title: "一起制定线下专业服务的标准",
      description: "擅长把数字工具落地到真实场景？Guidew 会给你足够大的舞台。直接与合伙人沟通，共同定义你的角色。",
      ctaPrimary: "联系合伙人",
      ctaSecondary: "查看职位"
    },
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
        <section className="bg-gradient-to-br from-white via-brand-lightGray/30 to-brand-lightGray/60 py-16 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 right-10 w-64 h-64 bg-brand-teal/10 blur-[120px]" />
            <div className="absolute -bottom-24 left-10 w-72 h-72 bg-brand-darkBlue/10 blur-[140px]" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-brand-teal uppercase tracking-[0.3em] mb-4">{content.hero.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{content.hero.title}</h1>
            <p className="text-lg text-gray-600">{content.hero.description}</p>
          </div>
        </section>

        <section className="py-16 bg-brand-darkBlue text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-6">{content.metricsTitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {content.metrics.map(metric => (
                <div key={metric.label} className="border border-white/20 rounded-2xl p-4 backdrop-blur">
                  <p className="text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="text-sm uppercase tracking-wide text-white/70 mb-2">{metric.label}</p>
                  <p className="text-sm text-white/80">{metric.description}</p>
                </div>
              ))}
            </div>
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

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">{content.culture.title}</p>
              <p className="text-3xl font-semibold text-brand-darkBlue mb-6 leading-tight">{content.culture.intro}</p>
              <div className="space-y-5">
                {content.culture.highlights.map(({ title, description, icon: Icon }) => (
                  <div key={title} className="flex gap-4 items-start bg-brand-lightGray/60 rounded-2xl p-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      <Icon className="text-brand-teal" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-brand-darkBlue">{title}</p>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-lightGray/50 rounded-3xl p-8 border border-brand-lightGray">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.perks.title}</p>
              <ul className="space-y-4">
                {content.perks.items.map(item => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-brand-teal" />
                    <p className="text-base text-gray-700">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="open-roles" className="py-16 bg-white">
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

        <section className="py-20 bg-brand-darkBlue text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">{content.closing.title}</p>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">{content.closing.description}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:talent@guidew.com?subject=Guidew%20Careers"
                className="px-6 py-3 rounded-full bg-brand-teal text-sm font-medium hover:bg-brand-teal/90 transition"
              >
                {content.closing.ctaPrimary}
              </a>
              <a
                href="#open-roles"
                className="px-6 py-3 rounded-full border border-white/40 text-sm font-medium hover:bg-white hover:text-brand-darkBlue transition"
              >
                {content.closing.ctaSecondary}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
