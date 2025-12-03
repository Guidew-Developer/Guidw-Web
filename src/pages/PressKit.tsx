import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Download, Image, FileText, Video } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const localeKeys = ["en", "zh", "pt", "es", "fr", "he", "mi"] as const;
type PressKitLocale = (typeof localeKeys)[number];

type Asset = {
  icon: typeof Image;
  title: string;
  description: string;
  link: string;
};

type PressKitCopy = {
  hero: {
    badge: string;
    title: string;
    description: string;
  };
  assets: Asset[];
  downloadLabel: string;
  cta: {
    heading: string;
    description: string;
    email: string;
    back: string;
  };
};

const copy: Record<PressKitLocale, PressKitCopy> = {
  en: {
    hero: {
      badge: "Media Kit",
      title: "Download Guidew brand assets",
      description: "We curated logos, one-pagers, and app screens so media stories and partners can stay on-brand instantly."
    },
    assets: [
      {
        icon: Image,
        title: "Brand logos",
        description: "Primary/secondary Guidew logos plus clear-space rules and gradient wordmark.",
        link: "/APP_LOGO.jpeg"
      },
      {
        icon: FileText,
        title: "Product overview",
        description: "Mission, business model, city roadmap, and feature snapshot in a single doc.",
        link: "#"
      },
      {
        icon: Video,
        title: "App interface shots",
        description: "High-resolution screens of Home, Discover, How it Works, and Download modules.",
        link: "#"
      }
    ],
    downloadLabel: "Download",
    cta: {
      heading: "Need interviews or more assets?",
      description: "Contact our media team—responses arrive within 24 hours with tailored data or visuals.",
      email: "press@guidew.app",
      back: "Return to Press page"
    }
  },
  zh: {
    hero: {
      badge: "Media Kit",
      title: "下载 Guidew 品牌素材",
      description: "我们准备了 LOGO、产品简介与应用截图，方便媒体报道与合作伙伴宣传使用。"
    },
    assets: [
      {
        icon: Image,
        title: "品牌标识",
        description: "包含 APP LOGO、渐变字标、常规/反白版本及安全留白说明。",
        link: "/APP_LOGO.jpeg"
      },
      {
        icon: FileText,
        title: "产品概览",
        description: "介绍 Guidew 定位、商业模式、城市运营计划与核心功能。",
        link: "#"
      },
      {
        icon: Video,
        title: "应用界面快照",
        description: "首页、Discover、How it Works 与 APP 下载模块的高分辨率截图。",
        link: "#"
      }
    ],
    downloadLabel: "下载",
    cta: {
      heading: "需要采访或更多素材？",
      description: "请联系我们的媒体团队，我们会在 24 小时内响应请求。",
      email: "press@guidew.app",
      back: "返回 Press 页面"
    }
  },
  pt: {
    hero: {
      badge: "Kit de mídia",
      title: "Baixe os assets oficiais da Guidew",
      description: "Disponibilizamos logos, ficha do produto e telas do app para agilizar matérias e ativações com parceiros."
    },
    assets: [
      {
        icon: Image,
        title: "Identidade visual",
        description: "Logo principal/secundário, versão em gradiente e guia de espaçamento seguro.",
        link: "/APP_LOGO.jpeg"
      },
      {
        icon: FileText,
        title: "Visão do produto",
        description: "Resumo sobre posicionamento, modelo de negócios, plano de cidades e recursos-chave.",
        link: "#"
      },
      {
        icon: Video,
        title: "Capturas do app",
        description: "Screens em alta de Home, Discover, How it Works e módulos de download.",
        link: "#"
      }
    ],
    downloadLabel: "Baixar",
    cta: {
      heading: "Precisa de entrevistas ou materiais extras?",
      description: "Fale com nosso time de imprensa e receba respostas personalizadas em até 24 horas.",
      email: "press@guidew.app",
      back: "Voltar para a página Press"
    }
  },
  es: {
    hero: {
      badge: "Media Kit",
      title: "Descarga los recursos oficiales de Guidew",
      description: "Reunimos logotipos, fichas de producto y pantallas de la app para que la prensa y los socios activen la marca en segundos."
    },
    assets: [
      {
        icon: Image,
        title: "Logotipos y marca",
        description: "Versiones primaria/secundaria, palabra en degradé y guía de espacio seguro.",
        link: "/APP_LOGO.jpeg"
      },
      {
        icon: FileText,
        title: "Resumen del producto",
        description: "Propósito, modelo operativo, hoja de ruta de ciudades y funciones principales en un documento.",
        link: "#"
      },
      {
        icon: Video,
        title: "Capturas de la app",
        description: "Pantallas en alta resolución de Home, Discover, How it Works y módulos de descarga.",
        link: "#"
      }
    ],
    downloadLabel: "Descargar",
    cta: {
      heading: "¿Necesitas entrevistas o más materiales?",
      description: "Escríbenos: el equipo de prensa responde en menos de 24 horas con datos o visuales a medida.",
      email: "press@guidew.app",
      back: "Volver a la página de prensa"
    }
  },
  fr: {
    hero: {
      badge: "Kit média",
      title: "Téléchargez les assets officiels de Guidew",
      description: "Logos, fiches produit et écrans d’app : tout est prêt pour vos articles et activations partenaires."
    },
    assets: [
      {
        icon: Image,
        title: "Logos & identité",
        description: "Versions primaire/secondaire, mot-symbole dégradé et règles de zone de protection.",
        link: "/APP_LOGO.jpeg"
      },
      {
        icon: FileText,
        title: "Fiche produit",
        description: "Mission, modèle économique et aperçu des fonctionnalités clés.",
        link: "#"
      },
      {
        icon: Video,
        title: "Captures d’écran",
        description: "Visuels haute résolution des modules Home, Discover, How it Works et Download.",
        link: "#"
      }
    ],
    downloadLabel: "Télécharger",
    cta: {
      heading: "Besoin d’interviews ou de visuels supplémentaires ?",
      description: "Écrivez-nous : l’équipe média répond en moins de 24 h avec données ou assets adaptés.",
      email: "press@guidew.app",
      back: "Revenir à la page Presse"
    }
  },
  he: {
    hero: {
      badge: "ערכת מדיה",
      title: "הורידו את נכסי המותג של Guidew",
      description: "אספנו לוגואים, דף מוצר ומסכי אפליקציה כדי שלכתבות ושותפויות יהיה מיתוג מדויק מהשנייה הראשונה."
    },
    assets: [
      {
        icon: Image,
        title: "לוגואים רשמיים",
        description: "גרסאות ראשית/משנית, מילה מדורגת וכללי מרווח בטוח.",
        link: "/APP_LOGO.jpeg"
      },
      {
        icon: FileText,
        title: "תקציר מוצר",
        description: "חזון, מודל עסקי, מפת ערים ותצלום פיצ'רים במסמך אחד.",
        link: "#"
      },
      {
        icon: Video,
        title: "מסכי אפליקציה",
        description: "צילומי מסך ברזולוציה גבוהה של Home, Discover, How it Works ומודולי ההורדה.",
        link: "#"
      }
    ],
    downloadLabel: "הורדה",
    cta: {
      heading: "צריכים ראיונות או חומר נוסף?",
      description: "צרו קשר עם צוות המדיה שלנו ונחזיר תשובה עד 24 שעות עם נתונים או ויזואלים מותאמים.",
      email: "press@guidew.app",
      back: "חזרה לעמוד התקשורת"
    }
  },

  mi: {
    hero: {
      badge: "Pouaka Media",
      title: "Tikiake Griseps waitohu waitohu",
      description: "Ko nga waitohu a te hunga he logos, kotahi-pagers, me nga mata o te taupānga kia noho tonu nga korero me nga hoa mahi."
    },
    assets: [
      {
        icon: Image,
        title: "Nga waitohu waitohu",
        description: "Ko nga waitohu a te kura tuatahi / tuaruatanga me nga ture maamaa me nga tikanga o te Wordwant Gradient.",
        link: "/App_logo.jpeg"
      },
      {
        icon: FileText,
        title: "He tirohanga hua",
        description: "Misioni, tauira pakihi, Taone Taone, me te whakaatu i te snapshot i roto i te doc kotahi.",
        link: null
      },
      {
        icon: Video,
        title: "App Apiti Panui",
        description: "Ko nga mata o te taumira teitei o te kainga, kitea, me pehea te mahi, me te tango i nga waahanga.",
        link: null
      }
    ],
    downloadLabel: "Tango",
    cta: {
      heading: "Me whai uiui, nui ake ranei nga rawa?",
      description: "Whakapā atu ki ta maatau roopu korero a Media i roto i nga haora 24 me nga raraunga kua rite ki nga korero.",
      email: "press@guidew.app",
      back: "Hoki atu ki te whārangi Press"
    }
  },};

const PressKit = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const localeKey: PressKitLocale =
    locale === "zh" || locale === "pt" || locale === "es" || locale === "fr" || locale === "he" || locale === "mi"
      ? (locale as PressKitLocale)
      : "en";
  const content = copy[localeKey];
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">{content.hero.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{content.hero.title}</h1>
            <p className="text-lg text-gray-600">{content.hero.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
            {content.assets.map(asset => {
              const Icon = asset.icon;
              return (
                <div key={asset.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-brand-teal h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{asset.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{asset.description}</p>
                  <a
                    href={asset.link}
                    className="inline-flex items-center gap-2 text-brand-teal font-semibold text-sm"
                    download={asset.link !== "#" ? true : undefined}
                  >
                    <Download className="h-4 w-4" />
                    {content.downloadLabel}
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-semibold mb-3">{content.cta.heading}</p>
            <p className="text-white/90 mb-6">{content.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${content.cta.email}`} className="px-6 py-3 rounded-full bg-white text-brand-teal font-semibold">
                {content.cta.email}
              </a>
              <Link to="/press" className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold">
                {content.cta.back}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PressKit;
