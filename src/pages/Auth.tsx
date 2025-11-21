import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import { useGuidew } from "@/state/GuidewProvider";
import type { CityLocation, UserRole } from "@/types/guidew";
import { createId } from "@/utils/id";
import { CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

const heroIconMap = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  pin: MapPin
} as const;

type HeroIconKey = keyof typeof heroIconMap;

const supportedAuthLocales = ["en", "zh", "pt", "es", "fr", "he", "mi"] as const;
type AuthLocale = (typeof supportedAuthLocales)[number];

type AuthCopy = {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroHighlights: Array<{ icon: HeroIconKey; title: string; description: string }>;
  stats: Array<{ value: string; label: string }>;
  testimonial: { quote: string; author: string };
  cardTitle: string;
  cardDescription: string;
  cardTags: string[];
  login: {
    trigger: string;
    emailLabel: string;
    emailPlaceholder: string;
    continueWithEmail: string;
    orDivider: string;
    google: string;
    apple: string;
    blockEyebrow: string;
    blockHeading: string;
    blockDescription: string;
    highlights: string[];
  };
  register: {
    trigger: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    roleLabel: string;
    roleUser: string;
    roleProvider: string;
    cityLabel: string;
    cities: { auckland: string; wellington: string };
    languagesLabel: string;
    languagesPlaceholder: string;
    vipText: string;
    button: string;
    blockEyebrow: string;
    blockHeading: string;
    blockDescription: string;
    highlights: string[];
  };
};

const getAuthLocale = (language?: string): AuthLocale => {
  if (!language) {
    return "en";
  }
  const normalized = language.split("-")[0]?.toLowerCase() as AuthLocale | undefined;
  if (normalized && supportedAuthLocales.includes(normalized)) {
    return normalized;
  }
  return "en";
};

const authCopy: Record<AuthLocale, AuthCopy> = {
  en: {
    heroBadge: "Guidew Privé",
    heroTitle: "Sign in to Guidew · awaken bespoke journeys",
    heroDescription:
      "Log in to orchestrate Auckland and Wellington's premium local network. AI + human concierges keep every city switch seamless.",
    heroHighlights: [
      {
        icon: "sparkles",
        title: "AI concierge orchestration",
        description: "Understands your intent before arrival and preps local matches plus itineraries."
      },
      {
        icon: "shield",
        title: "Seven-layer verified locals",
        description: "Only experts who pass ID, background, and portfolio checks join the response grid."
      },
      {
        icon: "pin",
        title: "City-to-city continuity",
        description: "One identity spans destinations so every stop delivers the same VIP context."
      }
    ],
    stats: [
      { value: "3,200+", label: "curated local experts" },
      { value: "68", label: "premium cities" },
      { value: "<5 min", label: "avg VIP response" }
    ],
    testimonial: {
      quote: "From landing in Auckland to wheels up in Wellington, Guidew kept every detail synced and calm.",
      author: "— Olivia · Private experience curator"
    },
    cardTitle: "Guidew Access",
    cardDescription: "Log in or register in one portal to manage bookings, VIP requests, and cross-city journeys.",
    cardTags: ["Last-mile concierge", "Auckland · Wellington exclusive", "VIP response < 5 min"],
    login: {
      trigger: "Login",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      continueWithEmail: "Continue with email",
      orDivider: "or",
      google: "Continue with Google",
      apple: "Continue with Apple",
      blockEyebrow: "Returning member highlight",
      blockHeading: "Stay a move ahead",
      blockDescription: "Track concierge progress, sync perks, and attach your preferences to every visit.",
      highlights: [
        "See bookings and reminders for multiple cities in a single dashboard.",
        "VIP digital concierges adjust transfers, dining, or hidden experiences in minutes.",
        "Your Guidew identity keeps bespoke treatment consistent everywhere."
      ]
    },
    register: {
      trigger: "Register",
      nameLabel: "Full name",
      namePlaceholder: "Jane Smith",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      roleLabel: "Role",
      roleUser: "I want to book services",
      roleProvider: "I want to provide services",
      cityLabel: "Primary city",
      cities: { auckland: "Auckland", wellington: "Wellington" },
      languagesLabel: "Languages",
      languagesPlaceholder: "English, Mandarin",
      vipText: "Subscribe to VIP ($9.9/month) for AI-assisted matching and zero booking fees.",
      button: "Create account",
      blockEyebrow: "New member privilege",
      blockHeading: "Unlock the Guidew private network",
      blockDescription: "Complete your profile to receive curated itineraries plus a complimentary VIP trial.",
      highlights: [
        "One registration unlocks our global network of vetted locals.",
        "VIP trial waives booking fees and delivers proactive AI matching.",
        "Finishing your dossier unlocks black-card style concierge priority."
      ]
    }
  },
  zh: {
    heroBadge: "Guidew Privé",
    heroTitle: "登录 Guidew · 唤醒高定旅程",
    heroDescription: "登录后即可串联奥克兰与惠灵顿的高端当地资源，AI + 真人礼宾让城市切换依旧从容。",
    heroHighlights: [
      {
        icon: "sparkles",
        title: "AI Concierge Orchestration",
        description: "提前解析行程意图，抵达前完成达人匹配与灵感预热。"
      },
      {
        icon: "shield",
        title: "七重认证当地网络",
        description: "只有通过身份、背景、履历审核的达人被纳入 24 小时响应体系。"
      },
      {
        icon: "pin",
        title: "City-to-city Continuity",
        description: "同一身份贯穿多个目的地，沿途礼遇始终保持一致语境。"
      }
    ],
    stats: [
      { value: "3,200+", label: "精选当地达人" },
      { value: "68", label: "高端体验城市" },
      { value: "<5 分钟", label: "平均 VIP 响应" }
    ],
    testimonial: {
      quote: "从奥克兰落地到惠灵顿登机，Guidew 始终同步行程细节，让旅程优雅而井然。",
      author: "— Olivia · 私享体验策展人"
    },
    cardTitle: "Guidew Access 门户",
    cardDescription: "在同一入口完成登录 / 注册，集中管理预约、VIP 礼遇与跨城体验。",
    cardTags: ["最后一公里礼宾", "奥克兰 · 惠灵顿专属", "VIP 响应 < 5 分钟"],
    login: {
      trigger: "登录",
      emailLabel: "邮箱",
      emailPlaceholder: "you@example.com",
      continueWithEmail: "使用邮箱继续",
      orDivider: "或",
      google: "使用 Google 登录",
      apple: "使用 Apple 登录",
      blockEyebrow: "复访会员亮点",
      blockHeading: "始终领先半步",
      blockDescription: "随时掌握礼宾进度、同步 VIP 礼遇，并让个人偏好伴随每座城市。",
      highlights: [
        "一个面板查看多城预约与提醒，不错过任何通知。",
        "VIP 数字礼宾数分钟内调整接送、餐厅或隐秘体验。",
        "Guidew 身份标签持续记录，确保定制礼遇稳定输出。"
      ]
    },
    register: {
      trigger: "注册",
      nameLabel: "姓名",
      namePlaceholder: "Jane Smith",
      emailLabel: "邮箱",
      emailPlaceholder: "you@example.com",
      roleLabel: "身份",
      roleUser: "我想预订服务",
      roleProvider: "我想提供服务",
      cityLabel: "主要城市",
      cities: { auckland: "奥克兰", wellington: "惠灵顿" },
      languagesLabel: "沟通语言",
      languagesPlaceholder: "English, Mandarin",
      vipText: "订阅 VIP（$9.9/月）享受 AI 匹配与零手续费。",
      button: "创建账户",
      blockEyebrow: "新会员尊享",
      blockHeading: "注册即刻解锁私享网络",
      blockDescription: "完成档案后，AI + 礼宾会推送首批行程灵感并奉上 VIP 试用。",
      highlights: [
        "一次注册接入全球精选当地网络，灵感即刻抵达。",
        "VIP 试用期免除手续费并提供主动匹配。",
        "完善资料可解锁黑卡等级的礼宾 Priority。"
      ]
    }
  },
  pt: {
    heroBadge: "Guidew Privé",
    heroTitle: "Faça login no Guidew · acenda viagens sob medida",
    heroDescription:
      "Entre para orquestrar a rede premium de Auckland e Wellington. Concierge humano + IA garante transições suaves entre cidades.",
    heroHighlights: [
      {
        icon: "sparkles",
        title: "Orquestração com IA",
        description: "Entende sua intenção antes do pouso e prepara matches e roteiros locais."
      },
      {
        icon: "shield",
        title: "Rede verificada em 7 camadas",
        description: "Somente especialistas aprovados em identidade, histórico e portfólio entram na escala."
      },
      {
        icon: "pin",
        title: "Continuidade entre cidades",
        description: "Uma identidade cobre vários destinos para manter o mesmo contexto VIP."
      }
    ],
    stats: [
      { value: "3,200+", label: "especialistas locais curados" },
      { value: "68", label: "cidades premium" },
      { value: "<5 min", label: "tempo médio de resposta VIP" }
    ],
    testimonial: {
      quote: "Do pouso em Auckland à decolagem em Wellington, a Guidew manteve tudo sincronizado e sereno.",
      author: "— Olivia · Curadora de experiências privadas"
    },
    cardTitle: "Guidew Access",
    cardDescription: "Faça login ou cadastre-se em um único portal para gerenciar reservas, pedidos VIP e jornadas multicidade.",
    cardTags: ["Concierge last-mile", "Exclusivo Auckland · Wellington", "Resposta VIP < 5 min"],
    login: {
      trigger: "Entrar",
      emailLabel: "Email",
      emailPlaceholder: "voce@exemplo.com",
      continueWithEmail: "Continuar com email",
      orDivider: "ou",
      google: "Continuar com Google",
      apple: "Continuar com Apple",
      blockEyebrow: "Destaque para membros",
      blockHeading: "Fique um passo à frente",
      blockDescription: "Acompanhe o concierge, sincronize benefícios e mantenha suas preferências em cada visita.",
      highlights: [
        "Visualize reservas e alertas de várias cidades num só painel.",
        "Concierges VIP digitais ajustam transfers, restaurantes ou experiências secretas em minutos.",
        "Sua identidade Guidew garante tratamento sob medida consistente."
      ]
    },
    register: {
      trigger: "Registrar",
      nameLabel: "Nome completo",
      namePlaceholder: "Joana Silva",
      emailLabel: "Email",
      emailPlaceholder: "voce@exemplo.com",
      roleLabel: "Função",
      roleUser: "Quero reservar serviços",
      roleProvider: "Quero oferecer serviços",
      cityLabel: "Cidade principal",
      cities: { auckland: "Auckland", wellington: "Wellington" },
      languagesLabel: "Idiomas",
      languagesPlaceholder: "Inglês, Mandarim",
      vipText: "Assine o VIP (US$9,9/mês) para ter matching com IA e zero taxas.",
      button: "Criar conta",
      blockEyebrow: "Benefício para novos membros",
      blockHeading: "Desbloqueie a rede privada Guidew",
      blockDescription: "Complete o perfil para receber roteiros curados e um teste VIP de cortesia.",
      highlights: [
        "Um cadastro libera acesso à nossa rede global de locais verificados.",
        "Teste VIP oferece zero taxas e matching proativo com IA.",
        "Dossiê completo garante prioridade tipo cartão black."
      ]
    }
  },
  es: {
    heroBadge: "Guidew Privé",
    heroTitle: "Inicia sesión en Guidew · enciende viajes a medida",
    heroDescription:
      "Conéctate para coordinar la red premium de Auckland y Wellington. Concierge humano + IA mantiene cada cambio de ciudad sin fricción.",
    heroHighlights: [
      {
        icon: "sparkles",
        title: "Orquestación con IA",
        description: "Comprende tu intención antes de llegar y prepara matches y rutas locales."
      },
      {
        icon: "shield",
        title: "Local experts verificados",
        description: "Solo expertos validados en identidad, antecedentes y portafolio entran al roster."
      },
      {
        icon: "pin",
        title: "Continuidad entre ciudades",
        description: "Una identidad recorre todos los destinos para mantener el mismo contexto VIP."
      }
    ],
    stats: [
      { value: "3,200+", label: "expertos locales seleccionados" },
      { value: "68", label: "ciudades premium" },
      { value: "<5 min", label: "respuesta VIP promedio" }
    ],
    testimonial: {
      quote: "Desde aterrizar en Auckland hasta despegar en Wellington, Guidew sincronizó cada detalle.",
      author: "— Olivia · Curadora de experiencias privadas"
    },
    cardTitle: "Guidew Access",
    cardDescription: "Inicia sesión o regístrate en un único portal para gestionar reservas, solicitudes VIP y viajes multicidad.",
    cardTags: ["Concierge last-mile", "Exclusivo Auckland · Wellington", "Respuesta VIP < 5 min"],
    login: {
      trigger: "Iniciar sesión",
      emailLabel: "Corlanguages electrónico",
      emailPlaceholder: "tú@ejemplo.com",
      continueWithEmail: "Continuar con corlanguages",
      orDivider: "o",
      google: "Continuar con Google",
      apple: "Continuar con Apple",
      blockEyebrow: "Beneficio para miembros que vuelven",
      blockHeading: "Mantente un paso adelante",
      blockDescription: "Sigue el progreso del concierge, sincroniza privilegios y conserva tus preferencias.",
      highlights: [
        "Consulta reservas y recordatorios de varias ciudades en un panel.",
        "Concierges digitales VIP ajustan traslados, restaurantes o planes secretos en minutos.",
        "Tu identidad Guidew asegura un trato personalizado consistente."
      ]
    },
    register: {
      trigger: "Registrarse",
      nameLabel: "Nombre completo",
      namePlaceholder: "Ana López",
      emailLabel: "Corlanguages electrónico",
      emailPlaceholder: "tú@ejemplo.com",
      roleLabel: "Rol",
      roleUser: "Quiero reservar servicios",
      roleProvider: "Quiero ofrecer servicios",
      cityLabel: "Ciudad principal",
      cities: { auckland: "Auckland", wellington: "Wellington" },
      languagesLabel: "Idiomas",
      languagesPlaceholder: "Inglés, Mandarín",
      vipText: "Suscríbete a VIP (9,9 USD/mes) para matching con IA y cero comisiones.",
      button: "Crear cuenta",
      blockEyebrow: "Bienvenida a nuevos miembros",
      blockHeading: "Desbloquea la red privada de Guidew",
      blockDescription: "Completa tu perfil y recibe las primeras ideas de itinerario más una prueba VIP.",
      highlights: [
        "Un solo registro abre la red global de locales verificados.",
        "La prueba VIP elimina comisiones y activa matching proactivo.",
        "Perfil completo desbloquea prioridad tipo tarjeta negra."
      ]
    }
  },
  fr: {
    heroBadge: "Guidew Privé",
    heroTitle: "Connectez-vous à Guidew · réveillez vos voyages sur mesure",
    heroDescription:
      "Connectez-vous pour orchestrer le réseau premium d'Auckland et Wellington. Conciergerie humaine + IA assure des transitions fluides.",
    heroHighlights: [
      {
        icon: "sparkles",
        title: "Orchestration par IA",
        description: "Anticipe vos intentions et prépare les experts et itinéraires adaptés."
      },
      {
        icon: "shield",
        title: "Experts vérifiés en sept étapes",
        description: "Seuls les talents validés (identité, historique, portfolio) rejoignent notre réseau."
      },
      {
        icon: "pin",
        title: "Continuité inter-villes",
        description: "Une identité unique couvre chaque destination pour préserver le contexte VIP."
      }
    ],
    stats: [
      { value: "3 200+", label: "experts locaux sélectionnés" },
      { value: "68", label: "villes premium" },
      { value: "<5 min", label: "réponse VIP moyenne" }
    ],
    testimonial: {
      quote: "De l'atterrissage à Auckland au décollage à Wellington, Guidew a gardé chaque détail sous contrôle.",
      author: "— Olivia · Curatrice d'expériences privées"
    },
    cardTitle: "Guidew Access",
    cardDescription: "Connectez-vous ou créez un compte pour gérer réservations, demandes VIP et trajets multi-villes.",
    cardTags: ["Conciergerie last-mile", "Exclusif Auckland · Wellington", "Réponse VIP < 5 min"],
    login: {
      trigger: "Connexion",
      emailLabel: "Email",
      emailPlaceholder: "vous@exemple.com",
      continueWithEmail: "Continuer avec l'email",
      orDivider: "ou",
      google: "Continuer avec Google",
      apple: "Continuer avec Apple",
      blockEyebrow: "Avantage membre fidèle",
      blockHeading: "Gardez une longueur d'avance",
      blockDescription: "Suivez le concierge, synchronisez vos privilèges et conservez vos préférences.",
      highlights: [
        "Consultez réservations et rappels de plusieurs villes sur un seul tableau.",
        "Les concierges VIP ajustent transferts, tables ou expériences secrètes en quelques minutes.",
        "Votre identité Guidew garantit un service sur mesure cohérent."
      ]
    },
    register: {
      trigger: "Inscription",
      nameLabel: "Nom complet",
      namePlaceholder: "Camille Bernard",
      emailLabel: "Email",
      emailPlaceholder: "vous@exemple.com",
      roleLabel: "Rôle",
      roleUser: "Je veux réserver des services",
      roleProvider: "Je veux proposer des services",
      cityLabel: "Ville principale",
      cities: { auckland: "Auckland", wellington: "Wellington" },
      languagesLabel: "Langues",
      languagesPlaceholder: "Anglais, Mandarin",
      vipText: "Souscrivez au VIP (9,9 $/mois) pour le matching IA et zéro frais.",
      button: "Créer un compte",
      blockEyebrow: "Avantage nouveau membre",
      blockHeading: "Débloquez le réseau privé Guidew",
      blockDescription: "Complétez votre profil et recevez des inspirations d'itinéraires ainsi qu'un essai VIP.",
      highlights: [
        "Une inscription ouvre la porte à notre réseau mondial vérifié.",
        "L'essai VIP supprime les frais et active un matching proactif.",
        "Profil complet = priorité conciergerie façon carte noire."
      ]
    }
  },
  he: {
    heroBadge: "Guidew Privé",
    heroTitle: "התחברו ל‑Guidew והדליקו מסעות עלית",
    heroDescription:
      "התחברות אחת מחברת אתכם לרשת הפרימיום של אוקלנד ווילינגטון. קונסיירז' אנושי + בינה מלאכותית מניעים מעבר עירוני חלק.",
    heroHighlights: [
      {
        icon: "sparkles",
        title: "תזמור קונסיירז' ב‑AI",
        description: "מבין את כוונת הנסיעה עוד לפני הנחיתה ומכין מאצ'ים ולוחות זמנים."
      },
      {
        icon: "shield",
        title: "רשת מקומיים מאומתת",
        description: "רק מומחים שעברו אימות זהות, רקע ותיק עבודות נכנסים למשמרת."
      },
      {
        icon: "pin",
        title: "רציפות בין ערים",
        description: "זהות אחת מלווה אתכם בכל יעד ושומרת על אותו הקשר VIP."
      }
    ],
    stats: [
      { value: "3,200+", label: "מומחים מקומיים נבחרים" },
      { value: "68", label: "ערי פרימיום" },
      { value: "<5 דק׳", label: "תגובה ממוצעת ל‑VIP" }
    ],
    testimonial: {
      quote: "מהנחיתה באוקלנד ועד ההמראה בוולינגטון, Guidew שמרה על כל פרט מסונכרן.",
      author: "— אוליביה · אוצרת חוויות פרטיות"
    },
    cardTitle: "Guidew Access",
    cardDescription: "התחברו או הירשמו במקום אחד כדי לנהל הזמנות, בקשות VIP וטראקים בין ערים.",
    cardTags: ["קונסיירז' קילומטר אחרון", "ייחודי לאוקלנד · וולינגטון", "תגובה ל‑VIP < 5 דק׳"],
    login: {
      trigger: "התחברות",
      emailLabel: "אימייל",
      emailPlaceholder: "you@example.com",
      continueWithEmail: "המשיכו עם אימייל",
      orDivider: "או",
      google: "המשיכו עם Google",
      apple: "המשיכו עם Apple",
      blockEyebrow: "יתרון לחוזרים",
      blockHeading: "תמיד צעד קדימה",
      blockDescription: "עקבו אחר התקדמות הקונסיירז', סנכרנו הטבות ושמרו על ההעדפות בכל יעד.",
      highlights: [
        "צפו בכל ההזמנות והתזכורות ממספר ערים בלוח אחד.",
        "קונסיירז' דיגיטלי ל‑VIP משנה הסעות, מסעדות או חוויות נסתרות תוך דקות.",
        "זהות Guidew שלכם מבטיחה יחס מותאם ועקבי."
      ]
    },
    register: {
      trigger: "הרשמה",
      nameLabel: "שם מלא",
      namePlaceholder: "Dana Levi",
      emailLabel: "אימייל",
      emailPlaceholder: "you@example.com",
      roleLabel: "תפקיד",
      roleUser: "אני רוצה להזמין שירותים",
      roleProvider: "אני רוצה להציע שירותים",
      cityLabel: "עיר ראשית",
      cities: { auckland: "אוקלנד", wellington: "וולינגטון" },
      languagesLabel: "שפות",
      languagesPlaceholder: "English, Mandarin",
      vipText: "הצטרפו ל‑VIP (‏$9.9 לחודש) לקבלת התאמות AI וללא עמלות הזמנה.",
      button: "יצירת חשבון",
      blockEyebrow: "הטבה לחברים חדשים",
      blockHeading: "פתחו את רשת היוקרה של Guidew",
      blockDescription: "השלים הפרופיל כדי לקבל השראות למסלולים וניסיון VIP ללא עלות.",
      highlights: [
        "הרשמה אחת פותחת גישה לרשת עולמית של מקומיים מאומתים.",
        "ניסיון VIP כולל התאמות AI ופטור מעמלות.",
        "פרופיל מלא מעניק קדימות בסגנון כרטיס שחור לקונסיירז'."
      ]
    }
  },

  mi: {
    heroBadge: "Ārahi ārahi",
    heroTitle: "Waitohu ki te Aratohu · ara ake i te haerenga",
    heroDescription:
      "Takiuru ki te orchestrate Auckland me te whatunga rohe o Te Whanganui-a-Tara. Ai + Ko nga Kaipupuri Tamariki Kia mau tonu nga huringa taone.",
    heroHighlights: [
      {
        icon: "sparkles",
        title: "AI Cractrice Orchecation",
        description: "Kei te maarama ki to hiahia i mua i te taenga mai me te whakaatu i nga whakataetae o te rohe me nga Iniana."
      },
      {
        icon: "shield",
        title: "E whitu-apa kua whakatauhia nga rohe",
        description: "Ko nga tohunga anake e haere ana i te ID, papamuri, me nga arowhai poroto e uru atu ana ki te raarangi whakautu."
      },
      {
        icon: "pin",
        title: "Te Taone-a-Taone",
        description: "Kotahi te tuakiri e heke ana i nga waahi ka tukuna e ia nga waahanga katoa i te horopaki vip."
      }
    ],
    stats: [
      { value: "3,200+", label: "Ko nga tohunga o te rohe" },
      { value: "68", label: "Nga taone nui" },
      { value: "<5 min", label: "Te urupare a AVG VIP" }
    ],
    testimonial: {
      quote: "Mai i te taunga i Akarana ki nga wira i Poneke, i mau tonu te kaiarahi i nga mea rereke me te marino.",
      author: "- Olivia · Kaiwhakawhanake wheako"
    },
    cardTitle: "Te uru kaha",
    cardDescription: "Takiuru ki te rehita ranei i tetahi raarangi hei whakahaere i nga pukapuka, nga tono VIP, me nga haerenga whakawhiti-taone.",
    cardTags: ["Ko te Whakataetae Tuarua", "Auckland · Wellington motuhake", "Whakautu VIP <5 min"],
    login: {
      trigger: "Takiuru",
      emailLabel: "Aiea",
      emailPlaceholder: "koe@example.com",
      continueWithEmail: "Haere tonu me te imeera",
      orDivider: "rānei",
      google: "Haere tonu me Google",
      apple: "Haere tonu me te aporo",
      blockEyebrow: "Ko te hokinga mai o te mema",
      blockHeading: "Kia noho i mua",
      blockDescription: "Aroturuki i te ahunga whakamua, te tukutahi o Synks, me te whakapiri i o hiahia ki nga haerenga katoa.",
      highlights: [
        "Tirohia nga Pukapuka me nga Whakamaumahara mo nga taone maha i roto i te papa papatohu.",
        "Ko nga kaiwhaiwhai VIP Digital e whakatikatika ana i nga whakawhitinga, kai, me nga wheako huna ranei i roto i nga meneti.",
        "Ko to tuakiri kaiarahi ka mau tonu i te rongoa o te maimoatanga i nga waahi katoa."
      ]
    },
    register: {
      trigger: "Rēhita",
      nameLabel: "Ingoa Katoa",
      namePlaceholder: "Jane Smith",
      emailLabel: "Aiea",
      emailPlaceholder: "koe@example.com",
      roleLabel: "Tūranga",
      roleUser: "Kei te hiahia au ki nga ratonga pukapuka",
      roleProvider: "Kei te hiahia au ki te whakarato ratonga",
      cityLabel: "Taone tuatahi",
      cities: { auckland: "Akarana", wellington: "Te Whanganui-a-Tara" },
      languagesLabel: "Reo",
      languagesPlaceholder: "Ingarihi, Mandarin",
      vipText: "Ohauru ki te VIP ($ 9.9 / marama) mo te utu mo te awhina me te kore utu.",
      button: "Waihangahia te Kaute",
      blockEyebrow: "Whakawhanake Mema hou",
      blockHeading: "Wewete i te whatunga tūmataiti arataki",
      blockDescription: "Whakaotihia to kōtaha kia whiwhi i nga Iti Itiera me te whakawakanga VIP.",
      highlights: [
        "Kotahi te rēhitatanga e aukati i to maatau hononga o te ao.",
        "Ko te whakawakanga o Vip te tuku i nga utu utu me te whakaatu i te rite ki a AI.",
        "Te mutunga o to kaihoahoa ka wehe i te kaupapa o te ahua pango-kāri pango."
      ]
    }
  },};

const defaultCity: CityLocation = {
  city: "Auckland",
  country: "New Zealand",
  lat: -36.8485,
  lng: 174.7633
};

const otherCity: CityLocation = {
  city: "Wellington",
  country: "New Zealand",
  lat: -41.2865,
  lng: 174.7762
};

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "register" ? "register" : "login";
  const { i18n } = useTranslation();
  const content = authCopy[getAuthLocale(i18n.language)];
  const { registerUser, signIn, upgradeVip } = useGuidew();
  const [role, setRole] = useState<UserRole>("user");
  const [city, setCity] = useState<CityLocation>(defaultCity);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState("English");
  const [subscribeVip, setSubscribeVip] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  const handleRegister = () => {
    if (!name || !email) {
      toast.error("Please provide name and email");
      return;
    }

    const userId = createId("user");

    const createdId = registerUser({
      id: userId,
      name,
      email,
      role,
      lastKnownLocation: city,
      preferredLanguages: languages
        .split(",")
        .map(value => value.trim())
        .filter(Boolean),
      verifiedLevels: ["basic"]
    });

    if (subscribeVip) {
      upgradeVip(createdId);
    }

    toast.success("Account created. Welcome to Guidew!");
    navigate(role === "provider" ? "/provider" : "/app");
  };

  const handleLogin = () => {
    if (!loginEmail) {
      toast.error("Please enter your email");
      return;
    }
    const success = signIn(loginEmail);
    if (success) {
      toast.success("Welcome back");
      navigate("/app");
    } else {
      toast.error("Account not found, please register");
    }
  };

  const handleSocial = (provider: "google" | "apple") => {
    const pseudoEmail = `${provider}_${Math.random().toString(36).slice(2, 8)}@example.com`;
    const pseudoName = provider === "google" ? "Google User" : "Apple User";
    const userId = createId("user");

    registerUser({
      id: userId,
      name: pseudoName,
      email: pseudoEmail,
      role: "user",
      lastKnownLocation: defaultCity,
      preferredLanguages: ["English"],
      verifiedLevels: ["basic"]
    });

    toast.success(`Signed in with ${provider === "google" ? "Google" : "Apple"}`);
    navigate("/app");
  };

  const handleTabChange = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (value === "register") {
      nextParams.set("tab", "register");
    } else {
      nextParams.delete("tab");
    }
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8f6ff,_#ece8ff_45%,_#fdfcfe)]">
      <Navbar />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="flex flex-col gap-8 rounded-[32px] border border-white/60 bg-white/70 p-8 sm:p-12 shadow-[0_30px_60px_rgba(16,5,48,0.15)] backdrop-blur-2xl">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit border-brand-teal/40 bg-brand-lightGray/60 text-brand-teal">
                {content.heroBadge}
              </Badge>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-brand-teal sm:text-5xl">
              {content.heroTitle}
            </h1>
            <p className="text-base leading-relaxed text-slate-600">{content.heroDescription}</p>
          </div>

          <div className="space-y-4">
            {content.heroHighlights.map(feature => {
              const Icon = heroIconMap[feature.icon];
              return (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm shadow-brand-teal/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-lightGray text-brand-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-brand-teal">{feature.title}</p>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {content.stats.map(stat => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/70 bg-white/80 p-4 text-center shadow-sm shadow-brand-teal/5"
              >
                <p className="text-2xl font-semibold text-brand-teal">{stat.value}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-brand-teal p-6 text-white shadow-lg shadow-brand-teal/30">
            <p className="text-lg leading-relaxed">{content.testimonial.quote}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.2em] text-white/80">{content.testimonial.author}</p>
          </div>
        </section>

          <Card className="h-full border border-white/70 bg-white/90 shadow-[0_30px_80px_rgba(12,8,24,0.18)] backdrop-blur-xl">
          <CardHeader className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal text-white shadow-lg shadow-brand-teal/30">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-3xl font-semibold text-brand-teal">{content.cardTitle}</CardTitle>
                <CardDescription className="text-base">{content.cardDescription}</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-medium text-brand-teal">
              {content.cardTags.map(tag => (
                <span key={tag} className="rounded-full bg-brand-lightGray/80 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{content.login.trigger}</TabsTrigger>
                <TabsTrigger value="register">{content.register.trigger}</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">{content.login.emailLabel}</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginEmail}
                      onChange={event => setLoginEmail(event.target.value)}
                      placeholder={content.login.emailPlaceholder}
                    />
                  </div>

                  <Button className="w-full" onClick={handleLogin}>
                    {content.login.continueWithEmail}
                  </Button>

                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">{content.login.orDivider}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Button variant="outline" onClick={() => handleSocial("google")}>{content.login.google}</Button>
                    <Button variant="outline" onClick={() => handleSocial("apple")}>{content.login.apple}</Button>
                  </div>
                </div>

                <div className="rounded-2xl border border-brand-teal/20 bg-gradient-to-br from-brand-lightGray via-white to-brand-lightGray p-5 shadow-lg shadow-brand-teal/10">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-teal">{content.login.blockEyebrow}</p>
                  <h4 className="mt-2 text-lg font-semibold text-brand-teal">{content.login.blockHeading}</h4>
                  <p className="text-sm text-slate-600">{content.login.blockDescription}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600">
                    {content.login.highlights.map(highlight => (
                      <li key={highlight} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-teal" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">{content.register.nameLabel}</Label>
                      <Input id="name" value={name} onChange={event => setName(event.target.value)} placeholder={content.register.namePlaceholder} />
                    </div>
                    <div>
                      <Label htmlFor="email">{content.register.emailLabel}</Label>
                      <Input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder={content.register.emailPlaceholder} />
                    </div>
                    <div>
                      <Label>{content.register.roleLabel}</Label>
                      <RadioGroup value={role} onValueChange={value => setRole(value as UserRole)} className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-2 rounded-xl border p-3 shadow-sm">
                          <RadioGroupItem value="user" id="role-user" />
                          <Label htmlFor="role-user" className="cursor-pointer">{content.register.roleUser}</Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-xl border p-3 shadow-sm">
                          <RadioGroupItem value="provider" id="role-provider" />
                          <Label htmlFor="role-provider" className="cursor-pointer">{content.register.roleProvider}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>{content.register.cityLabel}</Label>
                      <RadioGroup
                        value={city.city}
                        onValueChange={value => setCity(value === "Auckland" ? defaultCity : otherCity)}
                        className="grid grid-cols-2 gap-3"
                      >
                        <div className="flex items-center space-x-2 rounded-xl border p-3 shadow-sm">
                          <RadioGroupItem value="Auckland" id="city-akl" />
                          <Label htmlFor="city-akl" className="cursor-pointer">{content.register.cities.auckland}</Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-xl border p-3 shadow-sm">
                          <RadioGroupItem value="Wellington" id="city-wlg" />
                          <Label htmlFor="city-wlg" className="cursor-pointer">{content.register.cities.wellington}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Label htmlFor="languages">{content.register.languagesLabel}</Label>
                      <Input
                        id="languages"
                        value={languages}
                        onChange={event => setLanguages(event.target.value)}
                        placeholder={content.register.languagesPlaceholder}
                      />
                    </div>
                    <div className="flex items-center space-x-2 rounded-xl border border-dashed border-brand-teal/30 p-3">
                      <Checkbox id="vip" checked={subscribeVip} onCheckedChange={value => setSubscribeVip(Boolean(value))} />
                      <Label htmlFor="vip" className="leading-tight">
                        {content.register.vipText}
                      </Label>
                    </div>
                  </div>
                </div>

                <Button className="w-full" onClick={handleRegister}>
                  {content.register.button}
                </Button>

                <div className="rounded-2xl bg-gradient-to-br from-brand-teal to-brand-darkBlue p-5 text-white shadow-xl shadow-brand-teal/30">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{content.register.blockEyebrow}</p>
                  <h4 className="mt-2 text-lg font-semibold">{content.register.blockHeading}</h4>
                  <p className="text-sm text-white/80">{content.register.blockDescription}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white">
                    {content.register.highlights.map(highlight => (
                      <li key={highlight} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-brand-gold" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
