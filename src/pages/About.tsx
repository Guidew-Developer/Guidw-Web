import { Link } from "react-router-dom";
import { Users, Shield, Sparkles, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalExpansionGlobe from "@/components/GlobalExpansionGlobe";

const aboutLocales = ["en", "zh", "pt", "es", "fr", "he"] as const;
type AboutLocale = (typeof aboutLocales)[number];

type AboutDestination = {
  label: string;
  region: string;
  description: string;
  coords: { top: string; left: string };
};

type AboutCopy = {
  badge: string;
  title: string;
  description: string;
  cta: string;
  differentiators: Array<{ title: string; description: string }>;
  growth: {
    title: string;
    description: string;
    destinations: AboutDestination[];
  };
};

const supportedAboutLocales = new Set<AboutLocale>(aboutLocales);

const getAboutLocale = (language?: string): AboutLocale => {
  if (!language) {
    return "en";
  }
  const normalized = language.split("-")[0]?.toLowerCase() as AboutLocale | undefined;
  if (normalized && supportedAboutLocales.has(normalized)) {
    return normalized;
  }
  return "en";
};

const copy = {
  en: {
    badge: "About Guidew",
    title: "Make every new city feel like home",
    description:
      "Guidew is a skills sharing platform, connecting real local experts with travelers. Whether you need a city buddy, translator, or dance coach, trusted humans are one tap away.",
    cta: "Explore our vision →",
    differentiators: [
      { title: "Beyond guides", description: "From translation and dance to itinerary design, our network spans far more than a typical tour." },
      { title: "Two-sided marketplace", description: "Anyone can become a provider, showcase proof, and set transparent hourly rates." },
      { title: "AI + VIP", description: "VIP travelers get AI concierge and zero-fee orders; VIP providers auto-accept and plan with AI." },
      { title: "Trust & safety", description: "Verified identities, certificate uploads, in-app chat, bilateral reviews, and dispute flows." }
    ],
    growth: {
      title: "Global expansion map",
      description: "We launch in Aotearoa and sweep outward, installing elite local teams country by country until Guidew feels native everywhere.",
      destinations: [
        {
          label: "Launch wave",
          region: "Aotearoa launchpad",
          description: "Auckland and Wellington prove how fast trusted humans mobilize when Guidew is in their pockets.",
          coords: { top: "74%", left: "86%" }
        },
        {
          label: "Tasman bridge",
          region: "Australia's creative capitals",
          description: "Sydney, Melbourne, and Brisbane join next, forming a seamless bridge for travelers crossing the Tasman.",
          coords: { top: "67%", left: "80%" }
        },
        {
          label: "Pacific ribbon",
          region: "Asia-Pacific icons",
          description: "Singapore, Auckland, Seoul, and Bali bring nonstop bilingual talent for premium journeys along the Pacific Rim.",
          coords: { top: "55%", left: "66%" }
        },
        {
          label: "Continental gateways",
          region: "Europe & Middle East",
          description: "London, Paris, Berlin, and Dubai host flagship squads that connect heritage cities with bold new service.",
          coords: { top: "42%", left: "50%" }
        },
        {
          label: "Americas crescendo",
          region: "North & South America",
          description: "From Vancouver to São Paulo we light up creative capitals so every arrival is greeted by local legends.",
          coords: { top: "58%", left: "30%" }
        },
        {
          label: "Global fabric",
          region: "Every major city next",
          description: "The map keeps glowing, one more country at a time, until Guidew belongs on every continent.",
          coords: { top: "35%", left: "45%" }
        }
      ]
    }
  },
  zh: {
    badge: "关于 Guidew",
    title: "让陌生城市也能拥有“本地朋友”",
    description:
      "Guidew 是一个技能共享平台，连接真实的本地专家。无论是城市陪同、翻译还是舞蹈导师，可信赖的人就在手机里。",
    cta: "深入了解我们的愿景 →",
    differentiators: [
      { title: "超越本地向导", description: "服务范围覆盖城市陪同、翻译、舞蹈教学与私人行程策划。" },
      { title: "双边市场", description: "任何人注册即可成为服务者，通过简介与证书透明展示专业度。" },
      { title: "AI 与 VIP 赋能", description: "VIP 用户享 AI 匹配、免佣；VIP 服务者享自动接单与 AI 行程。" },
      { title: "安全与合规", description: "分级认证、证书上传、评价与争议流程，保障每次线下体验。" }
    ],
    growth: {
      title: "全球扩张蓝图",
      description: "从新西兰启航，有节奏地铺设本地专家网络，一国接一国，直到地球上每座城市都能即时响应。",
      destinations: [
        {
          label: "启航波段",
          region: "新西兰起点",
          description: "以奥克兰、惠灵顿为样板，真实的本地专家随时待命。",
          coords: { top: "74%", left: "86%" }
        },
        {
          label: "跨塔斯曼桥",
          region: "澳大利亚创意城市",
          description: "悉尼、墨尔本、布里斯班陆续上线，打造横跨塔斯曼海的无缝体验。",
          coords: { top: "67%", left: "80%" }
        },
        {
          label: "太平洋光带",
          region: "亚太标志城市",
          description: "新加坡、东京、首尔、巴厘等地汇聚双语达人，点亮长程旅途。",
          coords: { top: "55%", left: "66%" }
        },
        {
          label: "大陆门户",
          region: "欧洲与中东",
          description: "伦敦、巴黎、柏林、迪拜设立旗舰团队，连结传统与新灵感。",
          coords: { top: "42%", left: "50%" }
        },
        {
          label: "美洲共振",
          region: "南北美洲",
          description: "从温哥华到圣保罗，处处都有带着当地魅力的主理人接待来访者。",
          coords: { top: "58%", left: "30%" }
        },
        {
          label: "全球织网",
          region: "下一座城市永远在路上",
          description: "地图不断点亮，Guidew 以一国接一国的节奏覆盖全球。",
          coords: { top: "35%", left: "45%" }
        }
      ]
    }
  },
  pt: {
    badge: "Sobre a Guidew",
    title: "Faça cada nova cidade parecer sua casa",
    description:
      "A Guidew é uma plataforma de compartilhamento de habilidades que conecta especialistas locais reais a viajantes. Precisa de um buddy na cidade, intérprete ou coach de dança? Pessoas confiáveis estão a um toque.",
    cta: "Conheça nossa visão →",
    differentiators: [
      { title: "Muito além de guias", description: "De tradução e dança a design de itinerários, nossa rede vai muito além de um tour tradicional." },
      { title: "Marketplace bilateral", description: "Qualquer pessoa pode virar prestadora, mostrar comprovações e definir tarifas por hora transparentes." },
      { title: "IA + VIP", description: "Viajantes VIP recebem concierge com IA e pedidos sem taxas; provedores VIP aceitam automaticamente e planejam com IA." },
      { title: "Confiança e segurança", description: "Identidades verificadas, envio de certificados, chat no app, avaliações bilaterais e fluxos de disputa." }
    ],
    growth: {
      title: "Mapa de expansão global",
      description:
        "Começamos na Aotearoa e avançamos para fora, instalando equipes locais de elite país após país até que a Guidew pareça nativa em qualquer lugar.",
      destinations: [
        {
          label: "Onda de lançamento",
          region: "Base de lançamento Aotearoa",
          description: "Auckland e Wellington mostram como especialistas confiáveis se mobilizam rápido quando têm a Guidew no bolso.",
          coords: { top: "74%", left: "86%" }
        },
        {
          label: "Ponte do Tasmânia",
          region: "Capitais criativas da Austrália",
          description: "Sydney, Melbourne e Brisbane chegam na sequência, formando uma ponte fluida para viajantes que cruzam o Mar da Tasmânia.",
          coords: { top: "67%", left: "80%" }
        },
        {
          label: "Faixa do Pacífico",
          region: "Ícones da Ásia-Pacífico",
          description: "Singapura, Auckland, Seul e Bali reúnem talentos bilíngues ininterruptos para jornadas premium pelo Pacífico.",
          coords: { top: "55%", left: "66%" }
        },
        {
          label: "Portais continentais",
          region: "Europa e Oriente Médio",
          description: "Londres, Paris, Berlim e Dubai recebem esquadrões de referência que conectam cidades históricas a novos serviços ousados.",
          coords: { top: "42%", left: "50%" }
        },
        {
          label: "Crescendo das Américas",
          region: "América do Norte e do Sul",
          description: "De Vancouver a São Paulo iluminamos capitais criativas para que cada chegada seja recebida por lendas locais.",
          coords: { top: "58%", left: "30%" }
        },
        {
          label: "Tecido global",
          region: "A próxima grande cidade",
          description: "O mapa continua brilhando, um país por vez, até que a Guidew esteja presente em todos os continentes.",
          coords: { top: "35%", left: "45%" }
        }
      ]
    }
  },
  es: {
    badge: "Acerca de Guidew",
    title: "Haz que cada ciudad nueva se sienta como casa",
    description:
      "Guidew es una plataforma de intercambio de habilidades que conecta expertos locales reales con viajeros. Necesites un acompañante urbano, un intérprete o un coach de baile, la ayuda confiable está a un toque.",
    cta: "Explora nuestra visión →",
    differentiators: [
      { title: "Más que guías", description: "De traducción y danza a diseño de itinerarios, nuestra red cubre mucho más que un tour típico." },
      { title: "Marketplace de dos lados", description: "Cualquiera puede convertirse en proveedor, mostrar comprobantes y fijar tarifas por hora transparentes." },
      { title: "IA + VIP", description: "Los viajeros VIP reciben concierge con IA y pedidos sin comisión; los proveedores VIP aceptan automáticamente y planifican con IA." },
      { title: "Confianza y seguridad", description: "Identidades verificadas, carga de certificados, chat en la app, reseñas bilaterales y flujos de disputa." }
    ],
    growth: {
      title: "Mapa de expansión global",
      description:
        "Despegamos en Aotearoa y avanzamos hacia afuera, instalando equipos locales de élite país por país hasta que Guidew se sienta nativa en todas partes.",
      destinations: [
        {
          label: "Ola de lanzamiento",
          region: "Plataforma Aotearoa",
          description: "Auckland y Wellington demuestran lo rápido que los expertos confiables se movilizan cuando llevan Guidew en el bolsillo.",
          coords: { top: "74%", left: "86%" }
        },
        {
          label: "Puente de Tasmania",
          region: "Capitales creativas de Australia",
          description: "Sídney, Melbourne y Brisbane se suman después, formando un puente fluido para quienes cruzan el Mar de Tasmania.",
          coords: { top: "67%", left: "80%" }
        },
        {
          label: "Cinta del Pacífico",
          region: "Íconos de Asia-Pacífico",
          description: "Singapur, Auckland, Seúl y Bali aportan talento bilingüe constante para viajes premium a lo largo del Pacífico.",
          coords: { top: "55%", left: "66%" }
        },
        {
          label: "Puertas continentales",
          region: "Europa y Medio Oriente",
          description: "Londres, París, Berlín y Dubái albergan escuadrones insignia que conectan ciudades patrimoniales con servicios audaces.",
          coords: { top: "42%", left: "50%" }
        },
        {
          label: "Crescendo americano",
          region: "América del Norte y del Sur",
          description: "De Vancouver a São Paulo iluminamos capitales creativas para que cada llegada sea recibida por leyendas locales.",
          coords: { top: "58%", left: "30%" }
        },
        {
          label: "Tejido global",
          region: "Cada gran ciudad que sigue",
          description: "El mapa continúa encendiéndose, país tras país, hasta que Guidew pertenezca a todos los continentes.",
          coords: { top: "35%", left: "45%" }
        }
      ]
    }
  },
  fr: {
    badge: "À propos de Guidew",
    title: "Faire de chaque nouvelle ville votre chez-vous",
    description:
      "Guidew est une plateforme de partage de compétences qui relie de véritables experts locaux aux voyageurs. Besoin d'un compagnon urbain, d'un interprète ou d'un coach de danse ? Des personnes de confiance sont à portée de main.",
    cta: "Découvrir notre vision →",
    differentiators: [
      { title: "Au-delà des guides", description: "De la traduction à la danse et au design d'itinéraires, notre réseau dépasse largement un tour classique." },
      { title: "Place de marché bilatérale", description: "Tout le monde peut devenir fournisseur, présenter ses preuves et fixer des tarifs horaires transparents." },
      { title: "IA + VIP", description: "Les voyageurs VIP obtiennent un concierge IA et des commandes sans frais ; les fournisseurs VIP acceptent automatiquement et planifient avec l'IA." },
      { title: "Confiance et sécurité", description: "Identités vérifiées, ajout de certificats, messagerie intégrée, avis bilatéraux et gestion des litiges." }
    ],
    growth: {
      title: "Carte d'expansion mondiale",
      description:
        "Nous décollons en Aotearoa et avançons vers l'extérieur, en installant des équipes locales d'élite pays après pays jusqu'à ce que Guidew paraisse native partout.",
      destinations: [
        {
          label: "Vague de lancement",
          region: "Rampe de lancement Aotearoa",
          description: "Auckland et Wellington prouvent la rapidité avec laquelle des experts de confiance se mobilisent lorsqu'ils ont Guidew en poche.",
          coords: { top: "74%", left: "86%" }
        },
        {
          label: "Pont tasmanien",
          region: "Capitales créatives d'Australie",
          description: "Sydney, Melbourne et Brisbane suivent, créant un pont fluide pour les voyageurs qui traversent la mer de Tasmanie.",
          coords: { top: "67%", left: "80%" }
        },
        {
          label: "Ruban pacifique",
          region: "Icônes Asie-Pacifique",
          description: "Singapour, Auckland, Séoul et Bali apportent un talent bilingue continu pour des voyages premium le long du Pacifique.",
          coords: { top: "55%", left: "66%" }
        },
        {
          label: "Portes continentales",
          region: "Europe & Moyen-Orient",
          description: "Londres, Paris, Berlin et Dubaï accueillent des équipes phares qui relient villes patrimoniales et services innovants.",
          coords: { top: "42%", left: "50%" }
        },
        {
          label: "Crescendo des Amériques",
          region: "Amérique du Nord et du Sud",
          description: "De Vancouver à São Paulo nous illuminons les capitales créatives pour que chaque arrivée soit accueillie par des légendes locales.",
          coords: { top: "58%", left: "30%" }
        },
        {
          label: "Tissu mondial",
          region: "Chaque grande ville suivante",
          description: "La carte continue de s'illuminer, pays après pays, jusqu'à ce que Guidew appartienne à tous les continents.",
          coords: { top: "35%", left: "45%" }
        }
      ]
    }
  },
  he: {
    badge: "אודות Guidew",
    title: "הפכו כל עיר חדשה לבית",
    description:
      "Guidew היא פלטפורמה לשיתוף כישורים שמחברת מומחים מקומיים אמיתיים למטיילים. צריכים חבר עירוני, מתרגם או מאמן ריקוד? אנשים אמינים נמצאים במרחק נגיעה.",
    cta: "גלו את החזון שלנו →",
    differentiators: [
      { title: "מעבר למדריכים", description: "מתרגום וריקוד ועד עיצוב מסלולים, הרשת שלנו רחבה הרבה יותר מסיור קלאסי." },
      { title: "שוק דו-צדדי", description: "כל אחד יכול להפוך לספק, להציג הוכחות ולהגדיר תעריפים שקופים לפי שעה." },
      { title: "בינה מלאכותית + VIP", description: "מטיילי VIP מקבלים קונסיירז' מבוסס AI והזמנות ללא עמלה; ספקי VIP נהנים מקבלה אוטומטית ותכנון מונחה AI." },
      { title: "אמון ובטיחות", description: "זהויות מאומתות, העלאת תעודות, צ'אט מובנה, ביקורות הדדיות וזרימות לטיפול במחלוקות." }
    ],
    growth: {
      title: "מפת ההתרחבות הגלובלית",
      description:
        "אנחנו יוצאים לדרך באיים של אוטארואה וממשיכים החוצה, מקימים צוותים מקומיים מובחרים מדינה אחר מדינה עד ש-Guidew תרגיש מקומית בכל מקום.",
      destinations: [
        {
          label: "גל ההשקה",
          region: "בסיס Aotearoa",
          description: "אוקלנד ווילינגטון מראות כמה מהר מומחים אמינים מתגייסים כאשר Guidew בכיס שלהם.",
          coords: { top: "74%", left: "86%" }
        },
        {
          label: "גשר טסמן",
          region: "הבירות היצירתיות של אוסטרליה",
          description: "סידני, מלבורן ובריסביין מצטרפות ויוצרות גשר רציף לנוסעים החוצים את ים טסמן.",
          coords: { top: "67%", left: "80%" }
        },
        {
          label: "סרט הפסיפיק",
          region: "איקוני אסיה-פסיפיק",
          description: "סינגפור, אוקלנד, סיאול ובאלי מספקות כישרון דו-לשוני ללא הפסקה למסעות פרימיום לאורך הפסיפיק.",
          coords: { top: "55%", left: "66%" }
        },
        {
          label: "שערים יבשתיים",
          region: "אירופה והמזרח התיכון",
          description: "לונדון, פריז, ברלין ודובאי מארחות צוותי דגל שמחברים ערי מורשת לשירות חדשני ונועז.",
          coords: { top: "42%", left: "50%" }
        },
        {
          label: "קרשנדו האמריקות",
          region: "אמריקה הצפונית והדרומית",
          description: "מוונקובר ועד סאו פאולו אנו מאירים בירות יצירתיות כך שכל הגעה תתקבל על ידי אגדות מקומיות.",
          coords: { top: "58%", left: "30%" }
        },
        {
          label: "אריג גלובלי",
          region: "כל עיר מרכזית הבאה",
          description: "המפה ממשיכה לזהור, מדינה אחר מדינה, עד ש-Guidew תהיה שייכת לכל היבשות.",
          coords: { top: "35%", left: "45%" }
        }
      ]
    }
  }
} satisfies Record<AboutLocale, AboutCopy>;

const About = () => {
  const { i18n } = useTranslation();
  const content = copy[getAboutLocale(i18n.language)];
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm tracking-widest text-brand-teal uppercase mb-4">{content.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue leading-tight mb-6">
              {content.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {content.description}
            </p>
            <div className="mt-8">
              <Link
                to="/about/vision"
                className="inline-flex items-center px-6 py-3 rounded-full bg-brand-teal text-white font-semibold hover:bg-brand-teal/90 transition"
              >
                {content.cta}
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
            {content.differentiators.map((item, index) => {
              const Icon = [Users, Sparkles, Layers, Shield][index];
              return (
                <div key={item.title} className="bg-white rounded-2xl shadow-sm p-6 border border-brand-lightGray">
                  <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center mb-4">
                    <Icon className="text-brand-teal h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden py-16 bg-[#030b1f] text-white">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <GlobalExpansionGlobe className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030b1f]/90 via-[#030b1f]/65 to-transparent" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full md:w-[70%] space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{content.badge}</p>
                <h2 className="text-3xl font-bold mt-3 mb-4">{content.growth.title}</h2>
                <p className="text-white/80 text-lg leading-relaxed">{content.growth.description}</p>
              </div>
              <div className="space-y-4">
                {content.growth.destinations.map(destination => (
                  <div
                    key={destination.label}
                    className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{destination.label}</p>
                    <p className="text-xl font-semibold mt-1">{destination.region}</p>
                    <p className="text-white/80 mt-2 text-sm leading-relaxed">{destination.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
