import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lightbulb, ShieldCheck, BarChart3, Users2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const visionCopy = {
  en: {
    hero: {
      badge: "Guidew Vision",
      title: "A living guild of locals for every journey",
      description:
        "Guidew imagines a future where every city greets you with trusted locals, AI copilots, and rituals that make offline moments feel cinematic yet safe."
    },
    pillars: {
      title: "North-star principles",
      subtitle: "Three commitments keep Guidew bold while preserving trust.",
      items: [
        {
          title: "Human-first intelligence",
          description: "Context-aware AI surfaces the right locals, while curators protect nuance, boundaries, and cultural codes."
        },
        {
          title: "Borderless craft economy",
          description: "Talented residents turn hidden skills into signature offerings with transparent briefs and elevated storytelling."
        },
        {
          title: "Calm safety net",
          description: "Identity, insurance, and dispute rituals run quietly in the background so travelers only feel calm momentum."
        }
      ]
    },
    experiences: {
      title: "Experience architecture",
      subtitle: "Each booking flows through a multi-layer stack that blends art, logistics, and emotional care.",
      items: [
        {
          label: "Strand Alpha",
          title: "Discovery rituals",
          description: "Tasteful questionnaires, vibe boards, and micro-video intros reveal what the traveler truly seeks."
        },
        {
          label: "Strand Lumen",
          title: "Co-created planning",
          description: "Providers and AI-copilots co-design itineraries that mix logistics with neighborhood-only secrets."
        },
        {
          label: "Strand Pulse",
          title: "Live-session command",
          description: "Real-time translation, safety beacons, and local SOS systems surround every meet-up."
        },
        {
          label: "Strand Echo",
          title: "Afterglow & loyalty",
          description: "Story recaps, gratitude pools, and collectible badges feed the Guidew graph for future journeys."
        }
      ],
      highlight: {
        title: "Signature concierge runway",
        text: "A dedicated Guidew squad orchestrates high-touch journeys for ambassadors, artists, and executives.",
        bullets: [
          "Pair humans and AI to brief every provider before the traveler even lands.",
          "Unlock local “backstage passes” via civic, cultural, and sports collaborators.",
          "Surface community data to prove sustainability and equitable payouts."
        ]
      }
    },
    trust: {
      title: "Trust choreography",
      subtitle: "Safety becomes an ongoing conversation with locals, travelers, and city partners.",
      items: [
        { icon: ShieldCheck, title: "Proof of character", text: "Layered verification mixes identity, craft credentials, and peer endorsements tuned to each experience." },
        { icon: Users2, title: "Reciprocal rituals", text: "Two-way reviews publish only after both voices align, with badges celebrating consistency and care." },
        { icon: BarChart3, title: "Living policy studio", text: "Risk analysts and mediators watch signals in real time, adjusting playbooks before an issue escalates." }
      ]
    },
    arcs: {
      title: "Momentum arcs",
      subtitle: "Guidew expands like a constellation—one radiant city activates the next.",
      steps: [
        {
          name: "Aurora launchpads",
          headline: "Deep roots in Aotearoa",
          copy: "Begin inside neighborhoods that celebrate craftsmanship, perfecting the duet between AI orchestration and human warmth."
        },
        {
          name: "Coastal bridges",
          headline: "Tasman to Pacific icons",
          copy: "Link creative capitals across Australia and Asia-Pacific, building bilingual strike teams who mentor the next wave of hosts."
        },
        {
          name: "Continental alliances",
          headline: "Europe, Middle East, Africa",
          copy: "Partner with cultural districts and festivals so Guidew becomes the backstage pass for globe-trotting creators."
        },
        {
          name: "Planetary residency",
          headline: "Americas and beyond",
          copy: "Anchor Guidew teams in every hemisphere, sharing playbooks so locals everywhere can turn skill into hospitality."
        }
      ],
      closing: "The finale is simple: any traveler, in any city, taps Guidew and instantly meets the right human."
    }
  },
  zh: {
    hero: {
      badge: "Guidew Vision",
      title: "让全球旅程都能召唤活力本地行会",
      description: "Guidew 期望每座城市都能以可信赖的本地专家、AI 副驾与仪式化服务，带来既有戏剧张力又足够安全的线下体验。"
    },
    pillars: {
      title: "北极星原则",
      subtitle: "三项承诺让 Guidew 在胆识与信任之间保持平衡。",
      items: [
        {
          title: "人本智能优先",
          description: "情境化 AI 负责呈现合适的本地人选，策划团队守护文化细节与界限。"
        },
        {
          title: "跨境匠人经济",
          description: "天赋居民可以把隐藏技能包装成招牌体验，透过透明的简报与叙事被世界看见。"
        },
        {
          title: "静谧安全网",
          description: "身份、保障与争议流程都在后台无声运转，让旅客只感受到稳定向前的动力。"
        }
      ]
    },
    experiences: {
      title: "体验架构",
      subtitle: "每一次下单都会通过多层服务栈，兼顾艺术性、执行力与情绪照护。",
      items: [
        {
          label: "序章",
          title: "发现仪式",
          description: "审美问答、情绪版、短视频自我介绍，帮助我们理解旅客真正的期待。"
        },
        {
          label: "光带",
          title: "共创规划",
          description: "服务者与 AI 副驾一起描绘行程，把后巷秘境与严谨排程融合。"
        },
        {
          label: "心跳",
          title: "现场指挥",
          description: "实时翻译、安全信标与本地 SOS 系统为每次线下遇见护航。"
        },
        {
          label: "余响",
          title: "回声与忠诚",
          description: "故事回顾、感谢池与收藏徽章，为下一次旅程累积社群记忆。"
        }
      ],
      highlight: {
        title: "礼宾级跑道",
        text: "专属 Guidew 团队负责高端旅程，为品牌大使、艺术家与高管量身打造体验。",
        bullets: [
          "由人工与 AI 共同完成前置简报，在旅客抵达前同步上下文。",
          "与城市、文化、体育伙伴协作，解锁独家的“后台通行证”。",
          "公开社区影响数据，兼顾可持续性与公平收益。"
        ]
      }
    },
    trust: {
      title: "信任编排",
      subtitle: "安全不仅是实名认证，更是与本地人、旅客与城市伙伴持续对话。",
      items: [
        { icon: ShieldCheck, title: "品格证明", text: "多层级验证结合身份、专业证书与同侪背书，按体验类型灵活调节。" },
        { icon: Users2, title: "互惠仪式", text: "双向评价只有在双方确认后才会公开，并以徽章嘉奖长期稳定的表现。" },
        { icon: BarChart3, title: "策略共创室", text: "风控分析师与协调员实时监听信号，在问题爆发前就调整政策与流程。" }
      ]
    },
    arcs: {
      title: "势能曲线",
      subtitle: "Guidew 像星座一样扩散，一座光芒城市会点亮下一座。",
      steps: [
        {
          name: "曙光起点",
          headline: "深扎新西兰",
          copy: "先在崇尚手艺的街区打磨 AI 与人情味的双人舞，让模板真正可复制。"
        },
        {
          name: "海岸桥梁",
          headline: "连通塔斯曼与太平洋标志城市",
          copy: "贯穿澳大利亚与亚太的创意之都，建立双语特遣队传授新一代服务者。"
        },
        {
          name: "大陆联盟",
          headline: "欧洲、中东与非洲",
          copy: "携手文化街区与艺术节，让 Guidew 成为环球创作者的后台通行证。"
        },
        {
          name: "行星常驻",
          headline: "美洲以及更远",
          copy: "在每个半球落地运营团队，分享方法论，让全球本地人都能把技能转化为待客之道。"
        }
      ],
      closing: "终局愿景很简单：任何旅客在任何城市点开 Guidew，都能瞬间遇见对的人。"
    }
  }
} as const;

const AboutVision = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = visionCopy[locale];
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="relative overflow-hidden bg-brand-darkBlue text-white py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/40 via-transparent to-brand-orange/30" />
            <div className="absolute left-1/2 top-[-10%] h-96 w-96 rounded-full bg-brand-gold/40 blur-3xl opacity-40" />
            <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-brand-teal/30 blur-3xl opacity-40" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur">
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.35em]">{content.hero.badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{content.hero.title}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {content.hero.description}
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.pillars.title}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.pillars.subtitle}</h2>
              <p className="text-gray-600">
                {locale === "en"
                  ? "We build credible, human-scale experiences first, then layer automation and growth only where it enhances care."
                  : "我们先确保体验可信、有人味，再在必要处叠加自动化与增量引擎。"}
              </p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.pillars.items.map(item => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-brand-lightGray bg-brand-lightGray/40 p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-teal/80">
                    <span className="h-2 w-2 rounded-full bg-brand-teal" />
                    {content.pillars.title}
                  </div>
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-brand-darkBlue">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-lightGray">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.experiences.title}</p>
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3">{content.experiences.subtitle}</h2>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white shadow-xl p-8 space-y-4">
                <div className="text-xs uppercase tracking-[0.35em] text-brand-gold">{content.experiences.highlight.title}</div>
                <p className="text-gray-700 leading-relaxed">{content.experiences.highlight.text}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {content.experiences.highlight.bullets.map(bullet => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-teal" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {content.experiences.items.map(item => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur hover:-translate-y-1 transition"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">{item.label}</p>
                  <h3 className="text-xl font-semibold mt-2 mb-2 text-brand-darkBlue">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.trust.title}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.trust.subtitle}</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.trust.items.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-brand-lightGray bg-brand-lightGray/50 p-6 text-left hover:shadow-md transition"
                >
                  <Icon className="h-10 w-10 text-brand-teal mb-4" />
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 bg-[#030b1f] text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 via-transparent to-brand-orange/30" />
            <div className="absolute left-1/3 top-10 h-48 w-48 bg-brand-gold/20 blur-3xl opacity-70" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-gold mb-3">{content.arcs.title}</p>
              <h2 className="text-3xl font-bold mb-4">{content.arcs.subtitle}</h2>
            </div>
            <div className="mt-12 space-y-12 relative">
              <div className="hidden md:block absolute left-4 top-0 bottom-0 w-px bg-white/20" aria-hidden />
              {content.arcs.steps.map(step => (
                <div key={step.name} className="relative md:pl-14">
                  <div className="hidden md:flex absolute left-2 top-2 h-3 w-3 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/50" />
                  <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">{step.name}</p>
                    <h3 className="text-2xl font-semibold mt-2 mb-3">{step.headline}</h3>
                    <p className="text-white/80 leading-relaxed text-sm">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-white/80 max-w-3xl text-lg">{content.arcs.closing}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutVision;
