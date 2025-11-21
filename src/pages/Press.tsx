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
  },
  pt: {
    hero: {
      badge: "Imprensa & Mídia",
      title: "Materiais e novidades da Guidew",
      description: "A Guidew está construindo uma rede global de talentos locais. Conheça nossa missão, tecnologia e marcos de crescimento."
    },
    highlights: [
      { label: "15% de comissão", detail: "Estrutura transparente que premia parcerias de longo prazo." },
      { label: "VIP por US$ 9,9", detail: "Matching com IA, pedidos sem taxa e prioridade no roteamento." },
      { label: "Experiência dupla", detail: "Aplicativos separados garantem fluxos sob medida para viajantes e provedores." }
    ],
    notes: [
      {
        title: "Estágio do produto",
        content: "Foco inicial em Auckland/Wellington com 1.000 usuários beta, escalando para 5–10 mil em 12 meses."
      },
      {
        title: "Cenários comuns",
        content: "Companhias de cidade, tradução, aulas on-demand, guias outdoor e apoio a eventos com confiança offline."
      },
      {
        title: "Destaques técnicos",
        content: "Recomendações com IA, autoaceite, planejamento de itinerário, chat, carteira e visualização mapa/lista."
      }
    ],
    cta: {
      title: "Entrevistas e parcerias",
      description: "Solicite dados das cidades, roadmap de VIP, planos de IA ou visão de expansão global. Respondemos em até 24 horas.",
      email: "hello@guidew.com",
      kit: "Baixar press kit"
    }
  },
  es: {
    hero: {
      badge: "Prensa y medios",
      title: "Noticias y materiales de Guidew",
      description: "Guidew construye una red global de talentos locales. Conoce nuestra misión, tecnología y próximos hitos."
    },
    highlights: [
      { label: "15% de comisión", detail: "Estructura transparente que recompensa la colaboración a largo plazo." },
      { label: "$9.9 VIP", detail: "Matching con IA, pedidos sin comisión y prioridad en el ruteo para power users." },
      { label: "Experiencia dual", detail: "Aplicaciones separadas ofrecen interfaces hechas a medida para viajeros y proveedores." }
    ],
    notes: [
      {
        title: "Etapa del producto",
        content: "El MVP cubre Auckland/Wellington con 1.000 betatesters y escala a 5–10k usuarios en 12 meses."
      },
      {
        title: "Casos típicos",
        content: "Compañeros de ciudad, traducción, clases on-demand, guías outdoor y apoyo a eventos con respaldo offline."
      },
      {
        title: "Claves tecnológicas",
        content: "Recomendaciones con IA, autoaceptación, planeación de itinerarios, chat, wallet y modos mapa/lista."
      }
    ],
    cta: {
      title: "Entrevistas y alianzas",
      description: "Solicita datos de ciudades, planes VIP, roadmap de IA o expansión internacional. Respondemos en 24 h.",
      email: "hello@guidew.com",
      kit: "Descargar media kit"
    }
  },
  fr: {
    hero: {
      badge: "Presse & Médias",
      title: "Actualités et dossiers Guidew",
      description: "Guidew bâtit un réseau mondial d’experts locaux. Découvrez notre mission, notre pile technologique et nos jalons."
    },
    highlights: [
      { label: "15 % de commission", detail: "Modèle transparent qui favorise les collaborations durables." },
      { label: "VIP à 9,9 $", detail: "Matching IA, commandes sans frais et priorisation des utilisateurs intensifs." },
      { label: "Expérience double", detail: "Applications dédiées pour voyageurs et prestataires avec parcours adaptés." }
    ],
    notes: [
      {
        title: "Phase produit",
        content: "Le MVP se concentre sur Auckland/Wellington avec 1 000 bêta-testeurs et passe à 5–10 k en 12 mois."
      },
      {
        title: "Scénarios typiques",
        content: "Accompagnement urbain, traduction, cours à la demande, guidage outdoor et support événementiel fiable."
      },
      {
        title: "Points techniques",
        content: "Reco IA, auto-acceptation, planification d’itinéraires, chat, wallet et bascule carte/liste."
      }
    ],
    cta: {
      title: "Interviews et partenariats",
      description: "Demandez des données ville, plans VIP, feuille de route IA ou insights d’expansion. Réponse sous 24 h.",
      email: "hello@guidew.com",
      kit: "Télécharger le kit média"
    }
  },
  he: {
    hero: {
      badge: "תקשורת ועיתונות",
      title: "חדשות וחומרי מדיה של Guidew",
      description: "Guidew בונה רשת כישורים מקומית ברחבי העולם. קבלו מידע על החזון, הטכנולוגיה והיעדים שלנו."
    },
    highlights: [
      { label: "15% עמלת פלטפורמה", detail: "מודל שקוף שמתגמל שיתופי פעולה מתמשכים." },
      { label: "$9.9 VIP", detail: "התאמה בינה מלאכותית, הזמנות ללא עמלה ומסלולי עדיפות למשתמשי VIP." },
      { label: "שתי אפליקציות ייעודיות", detail: "ממשקים מותאמים בנפרד לנוסעים ולספקים." }
    ],
    notes: [
      {
        title: "שלב מוצר",
        content: "ה-MVP פעיל באוקלנד/וולינגטון עם 1,000 בטאיסטים ומתרחב ל-5–10 אלף משתמשים ב-12 חודשים."
      },
      {
        title: "תרחישים נפוצים",
        content: "חבר מקומי, תרגום, שיעורים אישיים, ליווי בשטח ותמיכה באירועים עם ביטחון Offline."
      },
      {
        title: "נקודות טכנולוגיות",
        content: "המלצות AI, קבלת הזמנות אוטומטית, תכנון מסלולים, צ’אט, ארנק ומצב מפה/רשימה."
      }
    ],
    cta: {
      title: "ראיונות ושותפויות מדיה",
      description: "בקשו נתוני עיר, תכניות VIP, מפת דרכים של AI או תובנות התרחבות. נשיב בתוך 24 שעות.",
      email: "hello@guidew.com",
      kit: "הורד ערכת מדיה"
    }
  },

  mi: {
    hero: {
      badge: "Press & Media",
      title: "He Aratohu me nga Rauemi Panui",
      description:
        "Kei te hanga te kaiarahi i tetahi whatunga pukenga a-rohe. Kia mohio ki ta maatau misioni, hangarau hangarau, me nga tohu."
    },
    highlights: [
      { label: "15% utu mo te papa", detail: "Te hanganga marama e whai ana i te mahi tahi i te wa roa." },
      { label: "$ 9.9 VIP", detail: "AI ōrite, nga whakahau utu-kore, me nga tikanga matua mo nga kaiwhakamahi mana." },
      { label: "Wheako takirua", detail: "He pai ki nga kaiwhaiwhai me nga kaiwhakarato nga hononga papa me nga ahuatanga." }
    ],
    notes: [
      {
        title: "Te atamira hua",
        content: "Kei te arotahi a MVP ki a Akarana / Te Whanganui-a-Tara me nga kaiwhakamahi Beta 1,000, e pa ana ki te 5-10k i roto i te 12 marama."
      },
      {
        title: "Nga ahuatanga angamaheni",
        content: "Ko nga taone o taone, whakamaoritanga, i runga i nga akoranga, te kaiarahi i waho, me te tautoko i nga huihuinga me te awhina awhina."
      },
      {
        title: "Nga tohu hangarau hangarau",
        content: "AI Taunakitanga, Whakawhiti-Aunoa, whakamahere i te wa, korerorero, putea, me te mahere mahere / raarangi."
      }
    ],
    cta: {
      title: "He uiui me nga whakahoahoa",
      description:
        "Tono raraunga City, mahere tipu tipu, ai te ara rori, i nga tirohanga nui o te ao. Ka whakautu matou i roto i nga haora 24.",
      email: "hello@guidew.com",
      kit: "Tangohia te kete pāpāho"
    }
  },} as const;

const Press = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const localeKey = (locale in copy ? locale : "en") as keyof typeof copy;
  const content = copy[localeKey];
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
