import { useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Rocket, Users2, Target, Sparkles, Globe2, ShieldCheck, type LucideIcon } from "lucide-react";
import { getCareerOpenings } from "@/constants/siteContent";
import { useTranslation } from "react-i18next";
import { pickLocaleValue, resolveLocale, type SupportedLocale } from "@/utils/locale";

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

const copy: Partial<Record<SupportedLocale, CareersCopy>> = {
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
  },
  pt: {
    hero: {
      badge: "Junte-se à missão",
      title: "Redefina o compartilhamento de habilidades offline",
      description:
        "Convidamos designers, pessoas de produto, engenheiros e operadores locais para servir os primeiros 1.000+ usuários em Auckland e Wellington e consolidar a operação na Nova Zelândia."
    },
    values: [
      {
        title: "Design centrado em pessoas",
        description: "Acompanhamos viajantes e provedores em campo para criar experiências que resolvem dores na hora.",
        icon: Users2
      },
      {
        title: "Validação rápida",
        description: "MVP em 6 meses, duas cidades em 12—lançamentos pequenos e entrega constante.",
        icon: Rocket
      },
      {
        title: "Confiança e segurança",
        description: "Fluxos de identidade, pedidos e pagamentos foram desenhados para encontros presenciais impecáveis.",
        icon: Target
      }
    ],
    openRolesTitle: "Vagas abertas",
    metricsTitle: "Guidew em números",
    metrics: [
      { value: "12+", label: "verticais artesanais", description: "Chefs, mentores de surf, botânicos e muito mais." },
      { value: "1K+", label: "viajantes beta", description: "Já confiam nos nossos hosts offline." },
      { value: "48h", label: "ciclo de entrega", description: "Da hipótese ao piloto em cidades reais." },
      { value: "3 continentes", label: "parceiros operacionais", description: "Raízes na Ásia-Pacífico, Europa e América do Norte." }
    ],
    culture: {
      title: "Construa encontros premium de alta confiança",
      intro: "Rituais de hospitalidade encontram rigor de produto—cada decisão mantém viajantes e hosts à mesa.",
      highlights: [
        {
          title: "Obcecados por detalhes",
          description: "Testamos pessoalmente scripts e experiências de recepção.",
          icon: Sparkles
        },
        {
          title: "Mentalidade local-first",
          description: "Operadores regionais lideram; HQ remove bloqueios e libera orçamento.",
          icon: Globe2
        },
        {
          title: "Segurança é sagrada",
          description: "Identidade, pagamentos e avaliações são verificadas antes do encontro físico.",
          icon: ShieldCheck
        }
      ]
    },
    perks: {
      title: "Benefícios",
      items: [
        "Equity de fundadores com upside atrelado a cada cidade lançada.",
        "Residências trimestrais de craftsmanship para co-criar experiências offline.",
        "Auxílio bem-estar e relocação pela Austrália e Nova Zelândia.",
        "Orçamento para aprender com mestres em qualquer ofício que atendemos."
      ]
    },
    closing: {
      title: "Molde o padrão da expertise offline",
      description:
        "Se você ama levar produtos para o mundo físico, a Guidew oferece um canvas gigante. Escreva diretamente para os partners e vamos desenhar seu papel.",
      ctaPrimary: "Falar com um Partner",
      ctaSecondary: "Ver vagas"
    },
    actions: {
      viewDetails: "Ver detalhes",
      apply: "Candidatar-se"
    }
  },
  es: {
    hero: {
      badge: "Únete a la misión",
      title: "Redefine el intercambio de habilidades presenciales junto a Guidew",
      description:
        "Sumamos diseñadores, producto, ingeniería y operadores locales para servir a los primeros 1.000 usuarios en Auckland/Wellington antes de escalar a cada ciudad."
    },
    values: [
      {
        title: "Diseño humano",
        description: "Acompañamos a viajeros y anfitriones en situaciones reales para construir experiencias que resuelven dolores inmediatos.",
        icon: Users2
      },
      {
        title: "Validación exprés",
        description: "MVP en 6 meses, dos ciudades en 12: lanzamientos pequeños, entrega continua.",
        icon: Rocket
      },
      {
        title: "Confianza y seguridad",
        description: "Identidad, flujos de pedidos y pagos garantizan que cada encuentro offline sea seguro.",
        icon: Target
      }
    ],
    openRolesTitle: "Vacantes abiertas",
    metricsTitle: "Guidew en cifras",
    metrics: [
      { value: "12+", label: "verticales artesanales", description: "Chefs privados, mentores de surf, botánicos y más." },
      { value: "1K+", label: "viajeros beta", description: "Ya confían en nuestros anfitriones locales." },
      { value: "48 h", label: "ciclo de entrega", description: "De la hipótesis al piloto urbano en dos días." },
      { value: "3 continentes", label: "socios operadores", description: "Anclados en APAC, Europa y Norteamérica." }
    ],
    culture: {
      title: "Diseña encuentros premium y fiables",
      intro: "Rituales de hospitalidad se mezclan con rigor de producto para mantener a viajeros y hosts al centro.",
      highlights: [
        { title: "Obsesión por el detalle", description: "Probamos cada guion de bienvenida y experiencia en campo.", icon: Sparkles },
        { title: "Mentalidad local-first", description: "Los operadores regionales lideran; HQ retira bloqueos y financia.", icon: Globe2 },
        { title: "Seguridad sagrada", description: "Identidad, pago y reseñas se verifican antes del encuentro.", icon: ShieldCheck }
      ]
    },
    perks: {
      title: "Beneficios",
      items: [
        "Equity de etapa fundadora más variable ligada a cada lanzamiento.",
        "Residencias trimestrales con maestros locales para co-crear experiencias.",
        "Stipend de bienestar y relocación en Australia/Nueva Zelanda.",
        "Presupuesto personal para aprender de referentes en cada oficio."
      ]
    },
    closing: {
      title: "Define el estándar de expertise offline",
      description: "Si disfrutas llevar el producto al mundo físico, Guidew es tu lienzo. Conversemos con el equipo fundador y definamos tu rol.",
      ctaPrimary: "Hablar con un partner",
      ctaSecondary: "Ver vacantes"
    },
    actions: {
      viewDetails: "Ver detalles",
      apply: "Postular"
    }
  },
  fr: {
    hero: {
      badge: "Rejoignez Guidew",
      title: "Redéfinissez le partage de compétences offline",
      description:
        "Nous recrutons designers, produit, ingénieurs et opérateurs locaux pour servir les premiers 1 000 utilisateurs à Auckland/Wellington avant de nous étendre."
    },
    values: [
      {
        title: "Design centré humain",
        description: "Nous observons voyageurs et prestataires sur le terrain pour livrer des expériences à impact immédiat.",
        icon: Users2
      },
      {
        title: "Validation rapide",
        description: "MVP en 6 mois, deux villes en 12—mini-lancements et livraison continue.",
        icon: Rocket
      },
      {
        title: "Confiance & sûreté",
        description: "Identité, commandes et paiements protègent chaque interaction physique.",
        icon: Target
      }
    ],
    openRolesTitle: "Postes ouverts",
    metricsTitle: "Guidew en chiffres",
    metrics: [
      { value: "12+", label: "verticales artisanales", description: "Chefs privés, mentors surf, botanistes, etc." },
      { value: "1K+", label: "voyageurs bêta", description: "Ils confient déjà leurs rencontres offline à Guidew." },
      { value: "48 h", label: "cycle de livraison", description: "De l’idée au pilote terrain en deux jours." },
      { value: "3 continents", label: "partenaires opérateurs", description: "Ancrages APAC, Europe, Amérique du Nord." }
    ],
    culture: {
      title: "Imaginer des rencontres haut de gamme",
      intro: "Rituels d’hospitalité et rigueur produit gardent voyageurs et hôtes au centre des décisions.",
      highlights: [
        { title: "Goût du détail", description: "Chaque script et expérience d’accueil est testé en interne.", icon: Sparkles },
        { title: "Primauté locale", description: "Les équipes régionales mènent, le siège lève les freins.", icon: Globe2 },
        { title: "Sécurité inviolable", description: "Identité, paiements et avis sont validés avant la rencontre.", icon: ShieldCheck }
      ]
    },
    perks: {
      title: "Avantages",
      items: [
        "Equity fondatrice + bonus liés à l’ouverture de nouvelles villes.",
        "Résidences trimestrielles avec artisans pour co-créer des expériences.",
        "Budget bien-être et mobilité en Australie & Nouvelle-Zélande.",
        "Crédit formation pour apprendre auprès des meilleurs artisans."
      ]
    },
    closing: {
      title: "Fixez la nouvelle référence de l’expertise locale",
      description: "Envie de déployer un produit dans le monde réel ? Guidew vous offre un terrain immense. Contactez nos partners pour dessiner votre poste.",
      ctaPrimary: "Parler à un partner",
      ctaSecondary: "Voir les postes"
    },
    actions: {
      viewDetails: "Voir les détails",
      apply: "Postuler"
    }
  },
  he: {
    hero: {
      badge: "הצטרפו ל-Guidew",
      title: "מגדירים מחדש שיתוף כישורים בעולם הפיזי",
      description:
        "מחפשים מעצבים, מוצר, מפתחים ותפעול מקומי כדי לשרת את אלף המשתמשים הראשונים ולקחת את המודל לכל עיר."
    },
    values: [
      { title: "עיצוב מבוסס אנשים", description: "נמצאים בשטח עם משתמשים וספקים כדי לפתור כאב מיידי.", icon: Users2 },
      { title: "אימות מהיר", description: "MVP בחצי שנה, שתי ערים בשנה—השקות קטנות ורצף משלוחים.", icon: Rocket },
      { title: "אמון ובטיחות", description: "זהות, הזמנות ותשלומים נבנים כך שכל מפגש יהיה בטוח.", icon: Target }
    ],
    openRolesTitle: "תפקידים פתוחים",
    metricsTitle: "Guidew במספרים",
    metrics: [
      { value: "12+", label: "תחומי מומחיות", description: "שפים פרטיים, מדריכי גלישה, בוטנאים ועוד." },
      { value: "1K+", label: "מטיילי בטא", description: "כבר מסתמכים על רשת המארחים שלנו." },
      { value: "48 שעות", label: "מחזור אספקה", description: "מהיפותזה לפיילוט בעיר תוך יומיים." },
      { value: "3 יבשות", label: "שותפי תפעול", description: "שורשים באסיה-פסיפיק, אירופה ואמריקה." }
    ],
    culture: {
      title: "יוצרים מפגשים מדויקים ואמינים",
      intro: "טקסי אירוח מתחברים למשמעת מוצר כדי לשים את האורחים והספקים במרכז.",
      highlights: [
        { title: "אובססיה לפרטים", description: "בודקים כל תסריט קבלת פנים וכל חוויה לפני ההשקה.", icon: Sparkles },
        { title: "לוקאלי תחילה", description: "מנהלים אזוריים מובילים; HQ מסיר חסמים ומממן.", icon: Globe2 },
        { title: "הבטיחות מעל הכול", description: "זהות, תשלום ומעגל הביקורות נסגר לפני מפגש.", icon: ShieldCheck }
      ]
    },
    perks: {
      title: "מה מקבלים",
      items: [
        "אקוויטי של צוות מייסד ובונוס לפי פתיחת ערים.",
        "רזידנסי רבעוני עם מאסטרים מקומיים ליצירת חוויות.",
        "מענק רווחה ורילוקיישן באוסטרליה וניו זילנד.",
        "תקציב למידה אישי ללמוד מהטובים בכל תחום פעילות."
      ]
    },
    closing: {
      title: "מעצבים את הסטנדרט של מומחיות מקומית",
      description: "אם אתם אוהבים להוריד מוצר לקרקע, Guidew היא הבמה. דברו עם השותפים ונבנה יחד את התפקיד.",
      ctaPrimary: "דברו עם שותף",
      ctaSecondary: "ראו תפקידים"
    },
    actions: {
      viewDetails: "לפרטי התפקיד",
      apply: "הגשת מועמדות"
    }
  },

  mi: {
    hero: {
      badge: "Whakauru atu ki te Misioni",
      title: "Whakaaetia te tohatoha pukenga tuimotu me te arataki",
      description:
        "Kei te kawe tatou i nga kaihoahoa, hinengaro hinengaro, miihini, me nga kaiwhakahaere o te rohe ki te mahi i nga kaiwhakamahi tuatahi o te 1,000 ki Akarana me Poneke i mua i te taone nui."
    },
    values: [
      {
        title: "Hoahoa tangata-toto",
        description: "Ka whai tatou i nga kaihaere me nga kaiwhakarato na roto i nga tirohanga tūturu me te hanga wheako e tangohia tonu i o raatau mamae.",
        icon: Users2
      },
      {
        title: "Whakamana Tere",
        description: "Tukuna te MVP i roto i nga marama 6, te tauine ki nga taone e rua i roto i nga whakarewa 12-iti, te tuku tonu.",
        icon: Rocket
      },
      {
        title: "Whakapono me te haumaru",
        description: "Ko nga tirotirohanga tuakiri, ota, me nga utu kua hangaia kia mau tonu nga taunekeneke tuimotu.",
        icon: Target
      }
    ],
    openRolesTitle: "Nga Mahi Whakatuwhera",
    metricsTitle: "He aratohu i te tirohanga",
    metrics: [
      {
        value: "12+",
        label: "Poutati Hiko",
        description: "Chefs, kaiwhakaako ngaru, pania, me te maha atu."
      },
      {
        value: "1k +",
        label: "Haereere Beta",
        description: "Kua whakawhirinaki ki o maatau rangatira rangatira."
      },
      {
        value: "48 haora",
        label: "Huringa kaipuke",
        description: "Mai i te whakapae ki nga kaiurungi o te taone nui."
      },
      {
        value: "3 nga whenua",
        label: "hoa hoa",
        description: "Asia-Moananui-a-Kiwa, Europe, me nga pakiaka o Amerika Te Tai Tokerau."
      }
    ],
    culture: {
      title: "Te utu toi, nga tutaki tiketike-whakawhirinaki",
      intro: "Ko nga tikanga manaaki e tutuki ana i nga mahi hua - ko nga whakataunga ka mau tonu nga kaihaere me nga rangatira i te teepu.",
      highlights: [
        {
          title: "He matatau ki nga korero",
          description: "Ka whiua e tatou nga tuhinga o te ope me nga whakamatautau-whakamatautau i nga wheako manaaki.",
          icon: Sparkles
        },
        {
          title: "Te tirohanga tuatahi-tuatahi",
          description: "Ko nga kaiwhakahaere o te rohe e arahi ana; Ka whakakorea e te HQ nga RoadBlocks me nga tahua kaore e raru.",
          icon: Globe2
        },
        {
          title: "He tapu te haumaru",
          description: "Ko te tuakiri, te utu, me nga arotake arotake ka whakatauhia i mua i te hui.",
          icon: ShieldCheck
        }
      ]
    },
    perks: {
      title: "He aha taau e pai ai",
      items: [
        "Ko te Whakanohia Te Whakawhiwhinga Plusside I herea ki nga Whakaohotanga o nga Taone Nui.",
        "Ko nga toenga mahi a-waahanga mo te waa-hangai ki te hanga i nga huihuinga tuimotu.",
        "Te oranga me te heke mai i Ahitereiria me Aotearoa.",
        "Te tahua ako a te tangata ake ki te atarangi o runga ake o nga rangatira o te Matauranga e mahi ana tatou."
      ]
    },
    closing: {
      title: "Hangaia te tohu tohu mo nga tohungatanga tuimotu",
      description: "Mena e pai ana koe ki te tango hua ki te ao tūturu, ka whakawhiwhia e te kaiarahi ki a koe he pouaka nui. Tuhia ki nga hoa o nga hoa me te tuku i to mahi.",
      ctaPrimary: "Korero ki tetahi hoa",
      ctaSecondary: "Tirohia nga mahi tuwhera"
    },
    actions: {
      viewDetails: "Tirohia nga korero taipitopito",
      apply: "Tono inaianei"
    }
  },};

const Careers = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = pickLocaleValue(copy, locale);
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
