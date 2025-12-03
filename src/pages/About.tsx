import { Link } from "react-router-dom";
import { Users, Shield, Sparkles, Layers, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const aboutLocales = ["en", "zh", "pt", "es", "fr", "he", "mi"] as const;
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
  story: {
    heading: string;
    subheading: string;
    paragraphs: string[];
  };
  stats: Array<{ value: string; label: string }>;
  differentiators: Array<{ title: string; description: string }>;
  principles: {
    heading: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
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

const copy: Record<AboutLocale, AboutCopy> = {
  en: {
    badge: "About Guidew",
    title: "Make every new city feel like home",
    description:
      "Guidew is a skills sharing platform, connecting real local experts with travelers. Whether you need a city buddy, translator, or dance coach, trusted humans are one tap away.",
    cta: "Explore our vision →",
    story: {
      heading: "The operating system for in-person guidance",
      subheading: "We build corridors where bilingual fixers, cultural docents, and wellness guardians move like an elite hospitality team.",
      paragraphs: [
        "Auckland and Wellington taught us that premium arrivals need more than cars—they demand humans who can translate culture, healthcare, rituals, and business etiquette on the fly.",
        "Guidew embeds with iwi leaders, galleries, hospitals, universities, and startups so every recommendation is co-designed with the community that hosts it.",
        "Our promise is to blend human warmth with rigorous logistics: Stripe-backed payments, NDAs, AI planners, and real-time monitoring keep every last mile on script."
      ]
    },
    stats: [
      { value: "7 languages", label: "Product available in English, 中文, Português, Español, Français, עברית, Te Reo Māori" },
      { value: "15% aligned", label: "Platform commission reinvested into trust, insurance, and live operations" },
      { value: "24/7 corridors", label: "Airports, harbors, clinics, universities, and creative districts stay covered" },
      { value: "Dual VIP tiers", label: "Guest + provider memberships unlock AI concierges and automation" }
    ],
    differentiators: [
      { title: "Beyond guides", description: "From translation and dance to itinerary design, our network spans far more than a typical tour." },
      { title: "Two-sided marketplace", description: "Anyone can become a provider, showcase proof, and set transparent hourly rates." },
      { title: "AI + VIP", description: "VIP travelers get AI concierge and zero-fee orders; VIP providers auto-accept and plan with AI." },
      { title: "Trust & safety", description: "Verified identities, certificate uploads, in-app chat, bilateral reviews, and dispute flows." }
    ],
    principles: {
      heading: "Field principles",
      description: "Each Guidew corridor is run like a members-only operations lounge where proof, culture, and care guide every interaction.",
      items: [
        { title: "Proof before promotion", description: "Providers publish documents, certifications, and story-driven bios before appearing in search." },
        { title: "Respect for place", description: "Cultural custodians co-create immersion routes so revenue returns to artists, iwi, and educators." },
        { title: "AI as co-pilot", description: "Automation drafts itineraries, translations, and travel buffers while humans deliver the final mile." },
        { title: "Wellness-grade care", description: "Background checks, penalty logic, and live support keep medical visits and family relocations safe." }
      ]
    },
    growth: {
      title: "Local corridors",
      description: "Our focus is depth in Aotearoa: reliable teams in Auckland and Wellington delivering trusted in-person help.",
      destinations: []
    }
  },
  pt: {
    badge: "Sobre a Guidew",
    title: "Faça cada cidade nova parecer lar",
    description:
      "A Guidew é uma plataforma de compartilhamento de habilidades que conecta especialistas locais reais a viajantes. Seja para ter um parceiro de cidade, um intérprete ou um coach de dança, pessoas confiáveis estão a um toque.",
    cta: "Conheça nossa visão →",
    story: {
      heading: "O sistema operacional do acompanhamento presencial",
      subheading: "Criamos corredores onde fixers bilíngues, guias culturais e guardiões de bem-estar atuam como uma equipe de hospitalidade de elite.",
      paragraphs: [
        "Auckland e Wellington mostraram que uma chegada premium exige mais do que carros: ela pede humanos capazes de traduzir cultura, saúde, rituais e etiqueta de negócios em tempo real.",
        "A Guidew se integra a líderes iwi, galerias, hospitais, universidades e startups para que cada recomendação seja co-desenhada com a comunidade anfitriã.",
        "Nosso compromisso é unir calor humano e logística rigorosa: pagamentos via Stripe, NDAs, planejadores com IA e monitoramento em tempo real mantêm cada última milha sob controle."
      ]
    },
    stats: [
      { value: "7 idiomas", label: "Produto disponível em English, 中文, Português, Español, Français, עברית, Te Reo Māori" },
      { value: "15% reinvestidos", label: "Comissão da plataforma retorna para confiança, seguros e operações ao vivo" },
      { value: "Corredores 24/7", label: "Aeroportos, portos, clínicas, universidades e distritos criativos têm cobertura" },
      { value: "VIP duplo", label: "Assinaturas para usuários e provedores liberam concierge com IA e automação" }
    ],
    differentiators: [
      { title: "Muito além de guias", description: "De tradução e dança a design de itinerários, nossa rede cobre bem mais do que um tour comum." },
      { title: "Marketplace bilateral", description: "Qualquer pessoa pode virar provedora, exibir provas e definir tarifas horárias transparentes." },
      { title: "IA + VIP", description: "Viajantes VIP recebem concierge com IA e pedidos sem taxa; provedores VIP usam autoaceite e planners inteligentes." },
      { title: "Confiança e segurança", description: "Identidades verificadas, upload de certificados, chat interno, avaliações bilaterais e fluxo de disputas." }
    ],
    principles: {
      heading: "Princípios em campo",
      description: "Cada corredor Guidew funciona como um lounge operacional para membros, onde prova, cultura e cuidado guiam cada interação.",
      items: [
        { title: "Prova antes da vitrine", description: "Provedores publicam documentos, certificações e bios narrativas antes de aparecerem na busca." },
        { title: "Respeito ao lugar", description: "Guardas culturais co-criam rotas imersivas para que a receita retorne a artistas, iwi e educadores." },
        { title: "IA como copiloto", description: "Automação redige itinerários, traduções e buffers de deslocamento enquanto humanos entregam o toque final." },
        { title: "Cuidado nível wellness", description: "Checagens de antecedentes, lógica de penalidades e suporte ao vivo protegem visitas médicas e mudanças em família." }
      ]
    },
    growth: {
      title: "Corredores locais",
      description: "Focamos em equipes confiáveis em Auckland e Wellington, entregando apoio presencial com qualidade consistente.",
      destinations: []
    }
  },
  zh: {
    badge: "关于 Guidew",
    title: "让陌生城市也能拥有“本地朋友”",
    description:
      "Guidew 是一个技能共享平台，连接真实的本地专家。无论是城市陪同、翻译还是舞蹈导师，可信赖的人就在手机里。",
    cta: "深入了解我们的愿景 →",
    story: {
      heading: "线下陪伴的操作系统",
      subheading: "我们在每条走廊部署双语 Fixer、文化策展人与康养守护者，像豪华酒店的机动团队一样运行。",
      paragraphs: [
        "在奥克兰与惠灵顿，我们发现高端旅途不只是车和酒店，更需要随时能翻译文化、医疗和商务礼仪的人。",
        "Guidew 与部族领袖、艺术馆、医院、大学与创业社区共创，确保每一条体验路径都与当地利益相关者共赢。",
        "Stripe 支付、NDA、AI 规划与实时监控，让我们把人情味与强大的执行力结合在一起。"
      ]
    },
    stats: [
      { value: "7 种语言", label: "界面已支持 English、中文、Português、Español、Français、עברית、Te Reo Māori" },
      { value: "15% 再投入", label: "平台佣金用于信任体系、保险与线下运维" },
      { value: "全天候走廊", label: "机场、港口、诊所、大学与创意街区都有覆盖" },
      { value: "双重 VIP", label: "普通用户与服务者分别拥有 AI 礼宾与自动化工具" }
    ],
    differentiators: [
      { title: "超越本地向导", description: "服务范围覆盖城市陪同、翻译、舞蹈教学与私人行程策划。" },
      { title: "双边市场", description: "任何人注册即可成为服务者，通过简介与证书透明展示专业度。" },
      { title: "AI 与 VIP 赋能", description: "VIP 用户享 AI 匹配、免佣；VIP 服务者享自动接单与 AI 行程。" },
      { title: "安全与合规", description: "分级认证、证书上传、评价与争议流程，保障每次线下体验。" }
    ],
    principles: {
      heading: "运营信条",
      description: "每条 Guidew 走廊都像会员制指挥中心，以上线前的证明、对文化的尊重与全程守护为准绳。",
      items: [
        { title: "先有证明再上架", description: "服务者必须上传身份、资质与故事化介绍，才能出现在搜索结果中。" },
        { title: "尊重当地文化", description: "与 iwi 族群、艺术家与教育者共创路线，让收入回流当地生态。" },
        { title: "AI 作为副驾驶", description: "让 AI 自动生成行程、翻译与路程缓冲，人类专注最后一公里的体验。" },
        { title: "康养级守护", description: "背景调查、处罚体系与实时客服，让就医或搬家等场景更安心。" }
      ]
    },
    growth: {
      title: "本地走廊",
      description: "我们专注于奥克兰与惠灵顿的可靠团队，提供稳妥的线下陪伴与在地支持。",
      destinations: []
    }
  },
  es: {
    badge: "Acerca de Guidew",
    title: "Haz que cada ciudad nueva se sienta como casa",
    description:
      "Guidew es una plataforma de intercambio de habilidades que conecta expertos locales reales con viajeros. Necesites un acompañante urbano, un intérprete o un coach de baile, la ayuda confiable está a un toque.",
    cta: "Explora nuestra visión →",
    story: {
      heading: "El sistema operativo de la guía presencial",
      subheading: "Construimos corredores donde fixers bilingües, curadores culturales y guardianes de bienestar operan como un equipo de hospitalidad de élite.",
      paragraphs: [
        "En Auckland y Wellington comprobamos que un viaje premium requiere algo más que transporte: se necesitan personas capaces de traducir cultura, salud y protocolo ejecutivo al instante.",
        "Co-diseñamos con líderes iwi, galerías, hospitales, universidades y startups para que cada experiencia regrese valor a la comunidad que la hospeda.",
        "Pagos con Stripe, NDAs, planeación con IA y monitoreo en vivo hacen que el calor humano conviva con procesos impecables."
      ]
    },
    stats: [
      { value: "7 idiomas", label: "Disponible en English, 中文, Português, Español, Français, עברית, Te Reo Māori" },
      { value: "15% reinvertido", label: "La comisión se destina a confianza, seguros y operaciones en campo" },
      { value: "Corredores 24/7", label: "Aeropuertos, puertos, clínicas, universidades y distritos creativos bajo cobertura" },
      { value: "Doble VIP", label: "Membresías para huéspedes y proveedores liberan concierge con IA y automatización" }
    ],
    differentiators: [
      { title: "Más que guías", description: "De traducción y danza a diseño de itinerarios, nuestra red cubre mucho más que un tour típico." },
      { title: "Marketplace de dos lados", description: "Cualquiera puede convertirse en proveedor, mostrar comprobantes y fijar tarifas por hora transparentes." },
      { title: "IA + VIP", description: "Los viajeros VIP reciben concierge con IA y pedidos sin comisión; los proveedores VIP aceptan automáticamente y planifican con IA." },
      { title: "Confianza y seguridad", description: "Identidades verificadas, carga de certificados, chat en la app, reseñas bilaterales y flujos de disputa." }
    ],
    principles: {
      heading: "Principios de campo",
      description: "Cada corredor Guidew funciona como un lounge operativo privado donde la evidencia, la cultura y el cuidado dirigen cada acción.",
      items: [
        { title: "Prueba antes de promocionar", description: "Los proveedores publican documentos, certificaciones y relatos antes de aparecer en las búsquedas." },
        { title: "Respeto al territorio", description: "Custodios culturales co-crean recorridos para que los ingresos regresen a artistas, iwi y educadores." },
        { title: "IA como copiloto", description: "La automatización genera itinerarios, traducciones y buffers de traslado mientras las personas entregan el tramo final." },
        { title: "Cuidado de grado wellness", description: "Controles de antecedentes, penalizaciones y soporte en vivo protegen visitas médicas y mudanzas familiares." }
      ]
    },
    growth: {
      title: "Corredores locales",
      description: "Nos enfocamos en equipos confiables en Auckland y Wellington para ofrecer ayuda presencial segura.",
      destinations: []
    }
  },
  fr: {
    badge: "À propos de Guidew",
    title: "Faire de chaque nouvelle ville votre chez-vous",
    description:
      "Guidew est une plateforme de partage de compétences qui relie de véritables experts locaux aux voyageurs. Besoin d'un compagnon urbain, d'un interprète ou d'un coach de danse ? Des personnes de confiance sont à portée de main.",
    cta: "Découvrir notre vision →",
    story: {
      heading: "Le système opérationnel de l'accompagnement humain",
      subheading: "Nous créons des corridors où des fixers bilingues, des curateurs culturels et des gardiens du bien-être œuvrent comme une équipe d'hospitalité sur-mesure.",
      paragraphs: [
        "À Auckland et Wellington nous avons compris qu'un voyage haut de gamme nécessite bien plus qu'un chauffeur : il faut des personnes capables de traduire culture, santé et protocole d'affaires en temps réel.",
        "Guidew co-construit avec les leaders iwi, les galeries, les hôpitaux, les universités et les startups afin que chaque expérience bénéficie aux communautés hôtes.",
        "Paiements Stripe, NDA, planification par IA et monitoring en direct mêlent chaleur humaine et exactitude opérationnelle."
      ]
    },
    stats: [
      { value: "7 langues", label: "Disponible en English, 中文, Português, Español, Français, עברית, Te Reo Māori" },
      { value: "15 % réinvestis", label: "Commission dédiée à la confiance, aux assurances et aux opérations terrain" },
      { value: "Corridors 24/7", label: "Aéroports, ports, cliniques, universités et quartiers créatifs couverts" },
      { value: "VIP double", label: "Adhésions voyageurs + prestataires avec concierge IA et automatisation" }
    ],
    differentiators: [
      { title: "Au-delà des guides", description: "De la traduction à la danse et au design d'itinéraires, notre réseau dépasse largement un tour classique." },
      { title: "Place de marché bilatérale", description: "Tout le monde peut devenir fournisseur, présenter ses preuves et fixer des tarifs horaires transparents." },
      { title: "IA + VIP", description: "Les voyageurs VIP obtiennent un concierge IA et des commandes sans frais ; les fournisseurs VIP acceptent automatiquement et planifient avec l'IA." },
      { title: "Confiance et sécurité", description: "Identités vérifiées, ajout de certificats, messagerie intégrée, avis bilatéraux et gestion des litiges." }
    ],
    principles: {
      heading: "Principes de terrain",
      description: "Chaque corridor Guidew fonctionne comme un lounge d'opérations privé où priment preuve, culture et soin.",
      items: [
        { title: "La preuve avant la mise en avant", description: "Les prestataires publient documents, certifications et récits avant d'apparaître dans la recherche." },
        { title: "Respect des territoires", description: "Des gardiens culturels co-dessinent les parcours afin que les revenus retournent aux artistes, iwi et enseignants." },
        { title: "IA copilote", description: "L'automatisation génère itinéraires, traductions et marges de déplacement pendant que l'humain assure la dernière touche." },
        { title: "Soin de niveau bien-être", description: "Vérifications, logique de pénalités et support en direct sécurisent visites médicales et relocalisations." }
      ]
    },
    growth: {
      title: "Corridors locaux",
      description: "Nous nous concentrons sur des équipes fiables à Auckland et Wellington pour offrir un accompagnement présentiel serein.",
      destinations: []
    }
  },
  he: {
    badge: "אודות Guidew",
    title: "הפכו כל עיר חדשה לבית",
    description:
      "Guidew היא פלטפורמה לשיתוף כישורים שמחברת מומחים מקומיים אמיתיים למטיילים. צריכים חבר עירוני, מתרגם או מאמן ריקוד? אנשים אמינים נמצאים במרחק נגיעה.",
    cta: "גלו את החזון שלנו →",
    story: {
      heading: "מערכת ההפעלה של הליווי האנושי",
      subheading: "אנחנו מפעילים מסדרונות שבהם פיקסרים דו-לשוניים, אוצרים תרבותיים ומלווים בתחום הבריאות עובדים כמו צוות אירוח יוקרתי.",
      paragraphs: [
        "באוקלנד ווילינגטון למדנו שחוויית פרימיום דורשת הרבה מעבר להסעה – צריך אנשים שמתרגמים תרבות, בריאות וכללי עסקים תוך כדי תנועה.",
        "Guidew משתפת פעולה עם מנהיגי iwi, גלריות, בתי חולים, אוניברסיטאות וסטארט-אפים כדי שכל מסלול יחזיר ערך לקהילה מארחת.",
        "תשלומי Stripe, הסכמי סודיות, תכנון מונחה AI ומעקב חי מחברים חמימות אנושית עם ביצוע מדויק."
      ]
    },
    stats: [
      { value: "7 שפות", label: "English, 中文, Português, Español, Français, עברית, Te Reo Māori זמינות כבר היום" },
      { value: "15% מושקעים חזרה", label: "העמלה ממומנת מחדש באמון, ביטוח ותפעול שטח" },
      { value: "מסדרונות סביב השעון", label: "נמלים, שדות תעופה, מרפאות, קמפוסים ומחוזות יצירתיים תמיד מכוסים" },
      { value: "מוצר VIP כפול", label: "מנויים לנוסעים ולספקים מספקים Concierge AI ואוטומציה" }
    ],
    differentiators: [
      { title: "מעבר למדריכים", description: "מתרגום וריקוד ועד עיצוב מסלולים, הרשת שלנו רחבה הרבה יותר מסיור קלאסי." },
      { title: "שוק דו-צדדי", description: "כל אחד יכול להפוך לספק, להציג הוכחות ולהגדיר תעריפים שקופים לפי שעה." },
      { title: "בינה מלאכותית + VIP", description: "מטיילי VIP מקבלים קונסיירז' מבוסס AI והזמנות ללא עמלה; ספקי VIP נהנים מקבלה אוטומטית ותכנון מונחה AI." },
      { title: "אמון ובטיחות", description: "זהויות מאומתות, העלאת תעודות, צ'אט מובנה, ביקורות הדדיות וזרימות לטיפול במחלוקות." }
    ],
    principles: {
      heading: "עקרונות השטח",
      description: "כל מסדרון של Guidew מתופעל כמו לאונג' פרטי שבו הוכחות, תרבות ודאגה אישית מובילים את ההחלטות.",
      items: [
        { title: "הוכחה לפני קידום", description: "ספקים מציגים מסמכים, הסמכות וסיפור אישי עוד לפני שהם מופיעים בחיפוש." },
        { title: "כבוד למקום", description: "שומרי תרבות משתפים פעולה בעיצוב החוויה כך שהכנסות חוזרות לאמנים, iwi ומחנכים." },
        { title: "AI כטייס משנה", description: "האוטומציה מייצרת מסלולים, תרגומים ומרווחי תנועה בעוד בני האדם מספקים את המגע האחרון." },
        { title: "רמת טיפול Wellness", description: "בדיקות רקע, מנגנון ענישה ותמיכה חיה מגנים על ביקורים רפואיים והעברות משפחתיות." }
      ]
    },
    growth: {
      title: "מסדרונות מקומיים",
      description: "אנחנו מתמקדים בצוותים אמינים באוקלנד ובוולינגטון כדי לספק ליווי אנושי אמין.",
      destinations: []
    }
  },

  mi: {
    badge: "Mo te aratohu",
    title: "Hangaia nga taone hou kia rite ki te kaainga",
    description:
      "Ko te Aratohu he papanga tiritiri mohio, honohono nga tohunga tūturu me nga kaihaerere. Ahakoa e hiahia ana koe ki te hoa rangatira, ki te kaiwhakamaori, ki te kaiako kanikani ranei, ko te tangata pono ko te tap ke atu.",
    cta: "Tirohia te tirohanga →",
    story: {
      heading: "Te punaha whakahaere mo te aratohu i roto i te tangata",
      subheading: "Ka hangahia e matou nga kaiwhakawhitiwhiti i nga kaikorero reorua, ko nga atua ahurea, me nga kaitiaki o te oranga me te roopu roopu manaaki.",
      paragraphs: [
        "Akarana me Wellington i ako ki a matou ko nga huihuinga utu nui atu i nga motuka - e tono ana ratou ki te tangata ka taea te whakamaori i te ahurea, te tikanga, me te mahi pakihi, me nga mahi pakihi i runga i te rere.",
        "I whakairihia e te kaiarahi nga rangatira o te iwi, ara, hohipera, whare wananga, me te whakaohooho i te taha o te hapori e manaaki ana i te hapori.",
        "Ko ta tatou kupu whakaari ko te whakakotahi i te mahana o te tangata me te utu nui o te tangata: Nga utu-a-ringa, ndas, AI nga mahere, me nga mahi tirotiro i nga ra whakamutunga katoa i runga i nga tuhinga."
      ]
    },
    stats: [
      { value: "7 ngā reo", label: "Hua e wātea ana i te reo Ingarihi, 中文, Português, Español, Français, עברית, Te Reo Māori" },
      { value: "15% i hainatia", label: "I tukuna e te Komihana a te Komihana ki te whakawhirinaki, inihua, me nga mahi ora" },
      { value: "24/7 nga Kari", label: "Ko nga taunga rererangi, nga whanga, nga haumanu, whare wānanga, me nga rohe auaha e hipoki ana" },
      { value: "Ko nga tiera vip rua", label: "Manuhiri + Kaiwhakarato Kaituku Ka Wewete AI Whakataetae me te Aunoa" }
    ],
    differentiators: [
      { title: "I tua atu o nga kaiarahi", description: "Mai i te whakamaoritanga me te Kanikani ki te hoahoa whakahoahoa, ko ta maatau whatunga tuuturu nui atu i te haerenga angamaheni." },
      { title: "Te maakete e rua-taha", description: "Ka taea e tetahi te waiho hei kaiwhakarato, whakaaturanga whakaatu, me te whakarite i nga reiti mo te haora mo te haora." },
      { title: "AI + VIP", description: "Ko nga kaihaerere VIP kia kaha te here me nga ota kore-utu; Ko nga kaiwhakarato VIP e whakaae ana ki te whakamahere me te mahere AI." },
      { title: "Whakapono me te haumaru", description: "Nga tuakiri kua whakaūngia, tukuatu tiwhikete, korero i roto i-taupānga, arotake Filateral, me nga raru e rere ana." }
    ],
    principles: {
      heading: "Ngā mātāpono mara",
      description: "Ko ia aratohu aratohu e whakahaerehia ana he mema - ko nga mahi noa kei hea te taunakitanga, te ahurea, me te arahi i nga taunekeneke katoa.",
      items: [
        { title: "Tuhinga o mua", description: "Ka whakaputa nga tuhinga ki te whakaputa tuhinga, tohu tohu, me te BIOS-peia i mua i te rapu." },
        { title: "Te whakaute i te waahi", description: "Ko nga huarahi rumaki tahi-hanga i nga huarahi rumaki kua kore e hoki mai nga moni ki nga kaitoi, iwi, me nga kaiwhakaako." },
        { title: "Ai hei co-part", description: "Tauira Automation Iniana, whakamaoritanga, me nga kaikiri haere i te wa e tukuna ai e te tangata te maero whakamutunga." },
        { title: "Te tiakitanga o te oranga", description: "Tirohanga Papamuri, Te whiu whiu, me te tautoko ora kia mau tonu nga haerenga hauora me nga nekehanga o te whanau." }
      ]
    },
    growth: {
      title: "Ngā ara ā-rohe",
      description: "E arotahi ana mātou ki ngā tīma whakawhirinaki ki Tāmaki Makaurau me Pōneke kia noho haumaru te tautoko ā-tangata.",
      destinations: []
    }
  },} satisfies Record<AboutLocale, AboutCopy>;

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

        <section className="py-16 bg-gradient-to-b from-white via-brand-lightGray/30 to-brand-lightGray">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-2 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-3">{content.badge}</p>
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.story.heading}</h2>
                <p className="text-lg text-gray-600 leading-relaxed">{content.story.subheading}</p>
              </div>
              <div className="space-y-4">
                {content.story.paragraphs.map(paragraph => (
                  <div key={paragraph} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-brand-teal/10 flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{paragraph}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-brand-darkBlue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {content.stats.map(stat => (
              <div key={stat.label} className="border border-white/15 rounded-2xl p-6 bg-white/5">
                <p className="text-3xl font-semibold mb-2">{stat.value}</p>
                <p className="text-sm text-white/80 leading-relaxed">{stat.label}</p>
              </div>
            ))}
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

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-3">{content.badge}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.principles.heading}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{content.principles.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.principles.items.map(item => (
                <div key={item.title} className="rounded-3xl border border-brand-lightGray bg-gradient-to-br from-white to-brand-lightGray/30 p-6 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="h-10 w-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-brand-teal" />
                    </span>
                    <h3 className="text-xl font-semibold text-brand-darkBlue">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
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

export default About;
