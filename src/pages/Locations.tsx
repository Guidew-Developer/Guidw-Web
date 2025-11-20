import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Navigation, Globe2, CheckCircle2, Plane, Landmark, Languages, HeartPulse } from "lucide-react";
import { getCityProfiles } from "@/constants/siteContent";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const copy = {
  en: {
    hero: {
      badge: "Service cities",
      title: "Service corridors: Auckland & Wellington",
      description:
        "Guidew deploys bilingual concierges across New Zealand's twin hubs so arrivals, errands, immersion tours, and wellness visits stay seamless.",
      support:
        "Every service city blends airport meet-and-greet, neighborhood fixers, cultural docents, and guardianship roles you can summon within minutes."
    },
    stats: [
      { value: "Dozens", label: "Active neighborhoods mapped between CBDs, harbors, and suburbs" },
      { value: "Hundreds", label: "Skill tags approved across translation, arts, errands, wellness, and education" },
      { value: "Under an hour", label: "Typical dispatch window for on-demand requests inside each corridor" },
      { value: "Within a week", label: "Payout release after mutual reviews wrap for a completed service" }
    ],
    citySpotlightsSection: {
      kicker: "City intelligence",
      heading: "What each city unlocks",
      description: "Select a corridor to understand the anchors we cover and the types of services travelers rely on most.",
      labels: {
        anchors: "Core corridors",
        experiences: "Signature services"
      }
    },
    citySpotlights: [
      {
        name: "Auckland",
        intro:
          "New Zealand's gateway city balances trans-Tasman airports, tech harbors, and waterfront lifestyles. Guidew stretches from the runway to Parnell galleries.",
        anchors: [
          "AKL International ↔ CBD meet-and-greets via dedicated arrival lounges and private parking",
          "North Shore & Takapuna runs for beachside wellness, childcare, and grocery errands",
          "Parnell, Newmarket, and Wynyard Quarter escorts for shopping, labs, and investor visits"
        ],
        experiences: [
          "Airport concierge with baggage handling, fast-track documents, and ground transport routing",
          "Night-market interpreting, private gallery tours, and Bachata pop-up lessons for guests",
          "Medical escort and university onboarding delivered in Mandarin, English, or Spanish"
        ]
      },
      {
        name: "Wellington",
        intro:
          "The capital links government, arts, and wind-swept coastal life. Guidew keeps transfers, culture walks, and production support stitched together.",
        anchors: [
          "Wellington Airport ↔ Te Aro ↔ parliamentary quarter transfers with weather-aware routing",
          "Waterfront & Oriental Bay promenades for creative walks, film festivals, and museum nights",
          "Lower Hutt, Porirua, and Johnsonville support for relocating families and diplomats"
        ],
        experiences: [
          "Conference interpreters, briefing note writers, and bilingual boardroom hosts",
          "Harbor-to-hill hikes with gear concierge plus craft-beer, jazz, and theatre immersion",
          "Hospital visits, veterinary runs, and embassy paperwork handled by vetted guardians"
        ]
      }
    ],
    serviceLayers: {
      kicker: "Service layers",
      heading: "What travelers unlock in every city",
      description:
        "Regardless of the district, Guidew standardizes arrival support, translation, cultural immersion, and care logistics so each booking feels bespoke.",
      pillars: [
        {
          icon: "plane",
          title: "Arrivals & logistics",
          detail: "Meet-and-greets at airports, ferry terminals, and cruise berths with travel-time buffers baked in."
        },
        {
          icon: "landmark",
          title: "Culture & immersion",
          detail: "Docents and creatives curate hidden neighborhoods, night markets, galleries, and performing arts."
        },
        {
          icon: "languages",
          title: "Translation & business",
          detail: "On-site interpreters cover shopping, hospitals, visa offices, courts, and investor meetings."
        },
        {
          icon: "wellness",
          title: "Care & guardianship",
          detail: "Medical escorts, family relocation helpers, wellness planners, and safety check-ins across suburbs."
        }
      ]
    },
    roadmapHeading: "Service expansion roadmap",
    roadmap: [
      {
        title: "Phase 1 · MVP runway",
        detail: "Finalize corridor playbooks in Auckland + Wellington and onboard the first wave of travelers and hosts."
      },
      {
        title: "Phase 2 · City scale-up",
        detail: "Densify both cities with more arrival lounges, verified skill tags, and word-of-mouth growth."
      },
      {
        title: "Phase 3 · Nationwide lift",
        detail: "Extend the model across New Zealand, covering tourism, education, wellness, and executive scenarios."
      },
      {
        title: "Phase 4 · Trans-Tasman leap",
        detail: "Launch Sydney, Melbourne, and Brisbane corridors while compounding the combined user base."
      },
      {
        title: "Phase 5 · Global horizons",
        detail: "Deploy multilingual operations across Asia-Pacific, Europe, and the Americas."
      }
    ]
  },
  zh: {
    hero: {
      badge: "服务城市",
      title: "服务走廊：奥克兰与惠灵顿",
      description:
        "Guidew 目前在新西兰两大枢纽城市部署双语礼宾，覆盖接送、代办、文化体验与康养陪护等线下服务。",
      support: "每一条城市走廊都可随时呼叫机场接机、街区向导、文化策展人与守护陪行角色，几分钟内即可响应。"
    },
    stats: [
      { value: "数十个", label: "贯穿两座城市 CBD、港口与郊区的活跃街区" },
      { value: "上百个", label: "已通过审核的技能标签，涵盖翻译、艺术、代办、康养与教育" },
      { value: "约半小时内", label: "同城即时需求的平均派单时间" },
      { value: "约一周", label: "服务完成并互评后钱包释放的结算周期" }
    ],
    citySpotlightsSection: {
      kicker: "城市情报",
      heading: "每座城市能解锁什么",
      description: "了解各个走廊覆盖的交通枢纽与旅客常用的服务类型，选择最契合的落地方式。",
      labels: {
        anchors: "核心走廊",
        experiences: "代表性服务"
      }
    },
    citySpotlights: [
      {
        name: "奥克兰",
        intro: "这座门户城市横跨跨塔斯曼航班、科技港口与海滨生活，Guidew 从跑道延伸到 Parnell 画廊。",
        anchors: [
          "奥克兰国际机场 ↔ 市中心：专属接待休息室与私人物流车位",
          "北岸 & Takapuna：海岸康养、儿童看护与日常采买",
          "Parnell、Newmarket、Wynyard Quarter：高端购物、实验室参访与投资人拜访"
        ],
        experiences: [
          "机场礼宾协助行李、通关文件与地面交通安排",
          "夜市口译、私人画廊夜间参观与 Bachata 音乐舞蹈快闪体验",
          "提供普通话 / 英语 / 西语的就医陪同与大学报到服务"
        ]
      },
      {
        name: "惠灵顿",
        intro: "首都兼具政务、文化与海岸生活，Guidew 负责衔接交通、文化漫步与制作支持。",
        anchors: [
          "惠灵顿机场 ↔ Te Aro ↔ 国会区：根据天气实时规划接驳线路",
          "海滨 & Oriental Bay：创意步行、电影节与博物馆夜场",
          "Lower Hutt、Porirua、Johnsonville：家族搬迁与外交人员的生活圈"
        ],
        experiences: [
          "会议口译、简报笔记撰写以及双语董事会议主持",
          "港湾到山脊的徒步向导，配套装备管家与精酿 / 爵士 / 剧场沉浸",
          "医院探视、宠物医院奔波与使馆文件代办，由经过核验的守护者执行"
        ]
      }
    ],
    serviceLayers: {
      kicker: "服务层级",
      heading: "在每个城市都能享受到的能力",
      description: "无论身处哪个街区，Guidew 都把接送、翻译、文化体验与守护支持标准化，让每次预约都像定制旅程。",
      pillars: [
        {
          icon: "plane",
          title: "抵达与交通",
          detail: "机场、轮渡与邮轮码头的一对一接送，并自动计算路程缓冲时间。"
        },
        {
          icon: "landmark",
          title: "文化与体验",
          detail: "策展人和文化向导带你走进隐秘街区、夜市、画廊与表演艺术。"
        },
        {
          icon: "languages",
          title: "翻译与商务",
          detail: "现场翻译覆盖购物、医院、签证、法务与投资会议等高频场景。"
        },
        {
          icon: "wellness",
          title: "照护与守护",
          detail: "医疗陪护、家庭搬迁助手、康养规划与各街区的安全探访。"
        }
      ]
    },
    roadmapHeading: "服务扩张路线图",
    roadmap: [
      { title: "阶段 1 · MVP 启动", detail: "完善奥克兰与惠灵顿的双城运营，迎来首批走廊用户。" },
      { title: "阶段 2 · 城市深化", detail: "提升两城密度，扩充接机休息室与技能标签体系，带动口碑增长。" },
      { title: "阶段 3 · 全国跃迁", detail: "复制至新西兰主要地区，覆盖旅游、教育、康养与商务等多种场景。" },
      { title: "阶段 4 · 跨塔斯曼拓展", detail: "启动悉尼、墨尔本与布里斯班走廊，扩大联合用户规模。" },
      { title: "阶段 5 · 全球布局", detail: "面向亚太、欧洲与美洲展开多语言运营。" }
    ]
  }
} as const;

const serviceLayerIconMap = {
  plane: Plane,
  landmark: Landmark,
  languages: Languages,
  wellness: HeartPulse
} as const;

const Locations = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const profiles = useMemo(() => getCityProfiles(i18n.language), [i18n.language]);
  const content = copy[locale];

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm tracking-widest text-brand-teal uppercase mb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {content.hero.badge}
            </p>
            <h1 className="text-4xl font-bold text-brand-darkBlue mb-4">{content.hero.title}</h1>
            <p className="text-lg text-gray-600 max-w-4xl mb-6">{content.hero.description}</p>
            <p className="text-base text-gray-500 max-w-3xl italic">{content.hero.support}</p>
          </div>
        </section>

        <section className="bg-brand-darkBlue text-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {content.stats.map(stat => (
              <div key={stat.label} className="border border-white/10 rounded-2xl p-6 bg-white/5">
                <p className="text-3xl font-semibold mb-2">{stat.value}</p>
                <p className="text-sm text-white/70 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {profiles.map(city => (
              <Link 
                to={`/locations/${city.id}`}
                key={city.id} 
                className="bg-white rounded-2xl p-8 shadow-sm border border-brand-lightGray hover:-translate-y-1 transition transform"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold">{city.name}</h3>
                  <span className="text-xs uppercase tracking-wide text-brand-teal bg-brand-teal/10 px-3 py-1 rounded-full">
                    {city.focus}
                  </span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{city.description}</p>
                <div className="space-y-2">
                  {city.stats.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-brand-darkBlue">
                      <Navigation className="h-4 w-4 text-brand-teal" />
                      {item}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.citySpotlightsSection.kicker}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.citySpotlightsSection.heading}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{content.citySpotlightsSection.description}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {content.citySpotlights.map(city => (
                <div
                  key={city.name}
                  className="rounded-3xl border border-brand-lightGray bg-gradient-to-br from-white to-brand-lightGray/40 p-8 shadow-sm"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-2">{content.hero.badge}</p>
                      <h3 className="text-2xl font-semibold text-brand-darkBlue">{city.name}</h3>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{city.intro}</p>
                  <div className="grid gap-6 md:grid-cols-2 mt-8">
                    <div>
                      <p className="text-sm uppercase tracking-widest text-brand-teal">{content.citySpotlightsSection.labels.anchors}</p>
                      <div className="space-y-3 mt-3">
                        {city.anchors.map(anchor => (
                          <div key={anchor} className="flex items-start gap-3 text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-brand-teal shrink-0 mt-1" />
                            <p className="leading-relaxed">{anchor}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest text-brand-darkBlue">{content.citySpotlightsSection.labels.experiences}</p>
                      <div className="space-y-3 mt-3">
                        {city.experiences.map(experience => (
                          <div key={experience} className="flex items-start gap-3 text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-1" />
                            <p className="leading-relaxed">{experience}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-darkBlue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-sm tracking-[0.6em] uppercase text-brand-gold/80 mb-4">{content.serviceLayers.kicker}</p>
              <h2 className="text-4xl font-semibold mb-4">{content.serviceLayers.heading}</h2>
              <p className="text-white/80 text-lg leading-relaxed">{content.serviceLayers.description}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {content.serviceLayers.pillars.map(pillar => {
                const Icon = serviceLayerIconMap[pillar.icon as keyof typeof serviceLayerIconMap];
                return (
                  <div key={pillar.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-12 w-12 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-xl font-semibold">{pillar.title}</h3>
                    </div>
                    <p className="text-white/80 leading-relaxed">{pillar.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe2 className="h-6 w-6" />
              <h2 className="text-3xl font-bold">{content.roadmapHeading}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.roadmap.map(step => (
                <div key={step.title} className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <p className="text-sm uppercase tracking-wider text-white/80 mb-2">{step.title}</p>
                  <p className="text-white/90">{step.detail}</p>
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

export default Locations;
