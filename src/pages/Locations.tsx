import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Navigation, Globe2 } from "lucide-react";
import { getCityProfiles } from "@/constants/siteContent";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const copy = {
  en: {
    hero: {
      badge: "Guidew Locations",
      title: "Starting in Auckland and Wellington",
      description:
        "Guidew focuses on the last mile between airports, ports, convention centers, and local culture. We partner with cultural groups and travel ecosystems to build trustworthy offline networks."
    },
    roadmapHeading: "Global expansion roadmap",
    roadmap: [
      { title: "Auckland & Wellington", detail: "0-12 months: build premium supply, verify providers, polish VIP tools." },
      { title: "New Zealand nationwide", detail: "Year 2: expand to Queenstown, Christchurch, more tourism and education hubs." },
      { title: "Australia & Pacific", detail: "25 months+: land in Sydney, Melbourne, Brisbane, serving trans-Tasman travelers." },
      { title: "Global cities", detail: "Year 5: roll out multi-language ops across Asia, Europe, and the Americas." }
    ]
  },
  zh: {
    hero: {
      badge: "Guidew Locations",
      title: "从奥克兰与惠灵顿启程",
      description:
        "Guidew 专注机场、港口、会展中心与本地文化之间的“最后一公里”体验。我们与文化机构、创业社区和旅行生态合作，打造可信的线下网络。"
    },
    roadmapHeading: "全球扩张路线图",
    roadmap: [
      { title: "奥克兰 & 惠灵顿", detail: "0-12 个月专注构建高质量供给，认证服务者，打磨 VIP 功能。" },
      { title: "新西兰全国", detail: "第 2 年拓展皇后镇、基督城等地，覆盖旅游、教育、医疗等场景。" },
      { title: "澳大利亚 & 太平洋", detail: "25 个月后落地悉尼、墨尔本与布里斯班，对接澳纽客群。" },
      { title: "全球主要城市", detail: "第 5 年起提供多语言版本，复制至亚洲、欧洲与美洲枢纽。" }
    ]
  }
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
            <p className="text-lg text-gray-600 max-w-4xl">{content.hero.description}</p>
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
