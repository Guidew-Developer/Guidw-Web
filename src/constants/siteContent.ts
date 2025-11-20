import { pickLocaleValue, resolveLocale, type SupportedLocale } from "@/utils/locale";

export interface CityProfile {
  id: string;
  name: string;
  description: string;
  stats: string[];
  focus: string;
  hero: {
    headline: string;
    subtext: string;
  };
  experiences: string[];
  logistics: string[];
}

export interface CareerOpening {
  id: string;
  title: string;
  location: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
}

export interface BlogPost {
  id: string;
  icon: "map" | "language" | "music" | "compass";
  iconLabel: string;
  title: string;
  date: string;
  summary: string;
  sections: Array<{
    heading: string;
    content: string;
  }>;
}

const cityProfiles: Partial<Record<SupportedLocale, CityProfile[]>> = {
  en: [
    {
      id: "auckland",
      name: "Auckland",
      description:
        "New Zealand's largest international hub that covers airport transfers, CBD hosting, and island adventures for travelers who expect both efficiency and memorable moments.",
      stats: ["On-demand local guides", "Multilingual translators", "Air, land & sea experiences"],
      focus: "MVP focus city",
      hero: {
        headline: "From the Sky Tower to the coastline, a trusted local expert is always on call.",
        subtext:
          "Typical requests: business interpretation, team city walks, Waiheke winery day trips, and cross-cultural etiquette coaching."
      },
      experiences: [
        "After landing at Auckland Airport, summon a bilingual expert to help with car rentals, hotel check-in, and errands.",
        "Want to dive into the nightlife? Book local musicians or dance coaches to guide you through bars while teaching the latest moves.",
        "Visiting tech teams can reserve industry consultants for startup ecosystem tours or investor briefings."
      ],
      logistics: [
        "Coverage radius: providers can set a 15–20 km range and Guidew automatically reminds them about travel time for the next order.",
        "Payment: Visa/Mastercard and Stripe are supported now, with Apple Pay/Google Pay launching later.",
        "VIP perks: automatic matching, AI itinerary planning, and concierge support for frequent travelers."
      ]
    },
    {
      id: "wellington",
      name: "Wellington",
      description:
        "The cultural and film capital of New Zealand that spotlights specialty coffee, creative workshops, and professional meeting support.",
      stats: ["Cultural curation", "Conference support", "Outdoor guiding"],
      focus: "First expansion city",
      hero: {
        headline: "Experience art, film, and nature in the windy city—without losing momentum.",
        subtext:
          "Typical requests: film industry tours, simultaneous interpretation for conferences, curated nature walks, and specialty coffee routes."
      },
      experiences: [
        "Film professionals can tour Miramar studios with local producers and see the industry backstage.",
        "Freelancers book coffee masters to design tasting walks that map Wellington's signature flavors.",
        "Outdoor lovers find guides who know Wairarapa and Kāpiti Coast to plan train-plus-hike day trips."
      ],
      logistics: [
        "Compact terrain allows providers to switch orders frequently; Guidew pushes travel and weather alerts in real time.",
        "Government and enterprise events create a steady demand for multilingual interpretation and note-taking services.",
        "Uploading certificates and portfolios helps providers build trust quickly and win more bookings."
      ]
    }
  ],
  pt: [
    {
      id: "auckland",
      name: "Auckland",
      description:
        "O maior hub internacional da Nova Zelândia, cobrindo traslados aeroportuários, acompanhamentos no CBD e aventuras insulares para viajantes que exigem eficiência e memórias marcantes.",
      stats: ["Guias locais sob demanda", "Tradutores multilíngues", "Experiências aéreas, terrestres e marítimas"],
      focus: "Cidade foco do MVP",
      hero: {
        headline: "Do Sky Tower ao litoral, sempre existe um especialista local confiável de prontidão.",
        subtext:
          "Pedidos típicos: interpretação corporativa, caminhadas urbanas para equipes, day trip em vinícolas de Waiheke e coaching de etiqueta intercultural."
      },
      experiences: [
        "Assim que pousar no Aeroporto de Auckland, convoque um especialista bilíngue para ajudar com aluguel de carro, check-in no hotel e tarefas imediatas.",
        "Quer explorar a noite local? Reserve músicos ou coaches de dança que acompanham pelos bares enquanto ensinam os passos mais recentes.",
        "Equipes de tecnologia em visita podem reservar consultores para tours pelo ecossistema de startups ou briefings com investidores."
      ],
      logistics: [
        "Raio de cobertura: provedores definem 15–20 km e a Guidew lembra automaticamente o tempo de deslocamento antes da próxima reserva.",
        "Pagamento: Visa/Mastercard e Stripe já estão disponíveis, com Apple Pay/Google Pay chegando em seguida.",
        "Benefícios VIP: matching automático, planejamento de itinerário com IA e concierge dedicado para viajantes frequentes."
      ]
    },
    {
      id: "wellington",
      name: "Wellington",
      description:
        "A capital cultural e cinematográfica da Nova Zelândia, com destaque para cafés especiais, workshops criativos e suporte profissional a eventos.",
      stats: ["Curadoria cultural", "Suporte para conferências", "Guias outdoor"],
      focus: "Primeira cidade de expansão",
      hero: {
        headline: "Viva arte, cinema e natureza na windy city sem perder o ritmo.",
        subtext:
          "Pedidos típicos: tours na indústria do cinema, interpretação simultânea para conferências, caminhadas guiadas e rotas de cafés especiais."
      },
      experiences: [
        "Profissionais do audiovisual podem visitar os estúdios de Miramar com produtores locais e conhecer os bastidores da indústria.",
        "Freelancers contratam mestres de café para criar roteiros de degustação que mapeiam os sabores assinatura de Wellington.",
        "Amantes de natureza encontram guias que dominam Wairarapa e Kāpiti Coast para planejar day trips combinando trem e trilhas."
      ],
      logistics: [
        "O relevo compacto permite que provedores alternem pedidos com frequência; a Guidew envia alertas de viagem e clima em tempo real.",
        "Eventos governamentais e corporativos sustentam a demanda por interpretação multilíngue e suporte em reuniões.",
        "Uploads de certificados e portfólios ajudam a construir confiança rapidamente e conquistar mais reservas."
      ]
    }
  ],
  es: [
    {
      id: "auckland",
      name: "Auckland",
      description:
        "El mayor hub internacional de Nueva Zelanda cubre traslados aeroportuarios, anfitriones en el CBD y aventuras insulares para viajeros que exigen eficiencia y recuerdos memorables.",
      stats: ["Guías locales on-demand", "Traductores multilingües", "Experiencias aéreas, terrestres y marítimas"],
      focus: "Ciudad foco del MVP",
      hero: {
        headline: "De la Sky Tower a la costa, siempre hay un experto local listo para responder.",
        subtext:
          "Pedidos típicos: interpretación corporativa, caminatas urbanas para equipos, day trips a viñas en Waiheke y coaching de etiqueta intercultural."
      },
      experiences: [
        "Apenas aterrices en Auckland Airport, convoca a un experto bilingüe para ayudarte con el alquiler de auto, el check-in del hotel y las diligencias inmediatas.",
        "¿Quieres explorar la noche? Reserva músicos locales o coaches de baile que te guían por los bares mientras enseñan los pasos más recientes.",
        "Los equipos tech en visita pueden agendar consultores para tours por el ecosistema startup o sesiones con inversionistas."
      ],
      logistics: [
        "Radio de cobertura: los proveedores fijan 15–20 km y Guidew les recuerda el tiempo de traslado antes del siguiente pedido.",
        "Pagos: hoy admitimos Visa/Mastercard y Stripe; Apple Pay y Google Pay se suman en próximas fases.",
        "Perks VIP: matching automático, planificación de itinerarios con IA y concierge para viajeros frecuentes."
      ]
    },
    {
      id: "wellington",
      name: "Wellington",
      description:
        "La capital cultural y cinematográfica del país resalta café de especialidad, talleres creativos y soporte profesional para reuniones.",
      stats: ["Curaduría cultural", "Soporte para conferencias", "Guía al aire libre"],
      focus: "Primera ciudad de expansión",
      hero: {
        headline: "Experimenta arte, cine y naturaleza en la ciudad ventosa sin perder ritmo.",
        subtext:
          "Pedidos típicos: recorridos por la industria audiovisual, interpretación simultánea para conferencias, caminatas guiadas y rutas de café de especialidad."
      },
      experiences: [
        "Profesionales del cine pueden visitar los estudios de Miramar junto a productores locales y conocer el backstage.",
        "Freelancers reservan maestros del café para diseñar caminatas de cata con los sabores icónicos de Wellington.",
        "Los amantes del aire libre encuentran guías que conocen Wairarapa y Kāpiti Coast para organizar day trips que combinan tren y caminatas."
      ],
      logistics: [
        "El terreno compacto permite alternar pedidos con rapidez; Guidew envía alertas de viaje y clima en tiempo real.",
        "Eventos gubernamentales y corporativos sostienen la demanda de interpretación multilingüe y toma de notas.",
        "Subir certificados y portafolios ayuda a los proveedores a generar confianza y ganar más reservas."
      ]
    }
  ],
  fr: [
    {
      id: "auckland",
      name: "Auckland",
      description:
        "Plus grand hub international de Nouvelle-Zélande, couvrant transferts aéroport, accompagnement en centre-ville et escapades insulaires pour les voyageurs exigeant efficacité et souvenirs marquants.",
      stats: ["Guides locaux à la demande", "Interprètes multilingues", "Expériences air, terre et mer"],
      focus: "Ville focus MVP",
      hero: {
        headline: "Du Sky Tower au littoral, un expert local fiable reste disponible en permanence.",
        subtext:
          "Demandes typiques : interprétation business, balades urbaines pour équipes, escapades viticoles à Waiheke et coaching d’étiquette interculturelle."
      },
      experiences: [
        "Dès l’atterrissage à l’aéroport d’Auckland, convoquez un expert bilingue pour gérer location de voiture, check-in hôtel et premières courses.",
        "Envie de nightlife ? Réservez musiciens ou coaches de danse qui vous accompagnent dans les bars tout en enseignant les derniers pas.",
        "Les équipes tech en visite réservent des consultants pour des immersions dans l’écosystème startup ou des briefings investisseurs."
      ],
      logistics: [
        "Rayon de couverture : les prestataires paramètrent 15–20 km et Guidew leur rappelle automatiquement le temps de trajet avant la prochaine mission.",
        "Paiement : Visa/Mastercard et Stripe sont disponibles, Apple Pay / Google Pay arrivent ensuite.",
        "Avantages VIP : matching automatique, itinéraires IA et concierge pour voyageurs fréquents."
      ]
    },
    {
      id: "wellington",
      name: "Wellington",
      description:
        "Capitale culturelle et cinématographique du pays, mettant en avant cafés de spécialité, ateliers créatifs et support professionnel aux réunions.",
      stats: ["Curations culturelles", "Support conférence", "Guides plein air"],
      focus: "Première ville d’expansion",
      hero: {
        headline: "Vivez art, cinéma et nature dans la ville du vent sans perdre votre rythme.",
        subtext:
          "Demandes typiques : visites de l’industrie film, interprétation simultanée, randonnées guidées et routes cafés signatures."
      },
      experiences: [
        "Les professionnels du cinéma visitent les studios de Miramar avec des producteurs locaux pour découvrir les coulisses.",
        "Freelances et teams créatives réservent des maîtres du café pour cartographier les saveurs emblématiques de Wellington.",
        "Amateurs de plein air trouvent des guides maîtrisant Wairarapa et Kāpiti Coast pour planifier des day trips train + randonnée."
      ],
      logistics: [
        "Terrain compact = changements de missions rapides ; Guidew diffuse alertes trafic et météo en temps réel.",
        "Évènements gouvernementaux et corporate créent une demande continue d’interprétation multilingue et de prise de notes.",
        "Publier certificats et portfolios aide les prestataires à bâtir la confiance et décrocher plus de réservations."
      ]
    }
  ],
  zh: [
    {
      id: "auckland",
      name: "Auckland",
      description:
        "新西兰最大的国际枢纽，覆盖机场接驳、CBD 商务陪同与海岛探险，适合对效率和精彩体验都有要求的旅客。",
      stats: ["实时本地向导", "多语言翻译", "海陆空混合体验"],
      focus: "MVP 阶段重点城市",
      hero: {
        headline: "从天空塔到海岸线，一位可信赖的本地专家随时待命。",
        subtext: "典型需求：商务会议口译、团队城市散步、怀赫科岛酒庄一日游、跨文化社交礼仪培训。"
      },
      experiences: [
        "旅客抵达奥克兰机场后，可立即在 Guidew 上呼叫双语专家协助办理租车与酒店入住。",
        "想体验奥克兰夜生活？选择当地音乐人或舞蹈老师，带你逛酒吧并学习最新舞步。",
        "科技公司访客能预约行业顾问，安排本地创业生态参访或投资考察。"
      ],
      logistics: [
        "距离限制：服务者可以设置 15-20 公里活动范围，系统自动提醒下一单交通时间。",
        "支付方式：支持 Visa/Mastercard 与 Stripe 快捷支付，后续将接入 Apple Pay/Google Pay。",
        "VIP 专属：自动接单、AI 行程规划和专属客服，为高频旅客提供稳定体验。"
      ]
    },
    {
      id: "wellington",
      name: "Wellington",
      description: "新西兰文化与电影工业中心，聚焦精品咖啡、创意工作坊与专业会议支持。",
      stats: ["文化策展", "专业会议支持", "户外徒步引导"],
      focus: "首批扩展城市",
      hero: {
        headline: "在风之都体验艺术、电影与自然的多重灵感。",
        subtext: "典型需求：电影产业探访、会展同步口译、自然徒步规划、精品咖啡文化体验。"
      },
      experiences: [
        "电影从业者可预约当地制作人，参观 Miramar 片厂并了解行业幕后。",
        "自由职业者可邀请咖啡师做城市咖啡品鉴路线，探索风味地图。",
        "户外玩家能找到熟悉怀拉拉帕与卡皮蒂海岸的向导，定制徒步+火车一日游。"
      ],
      logistics: [
        "地形紧凑，服务者可以高频切换订单，Guidew 自动提醒交通时间与天气变化。",
        "众多政府与企业会议，多语言同步口译与会议记录服务需求旺盛。",
        "通过上传证书和作品，服务者可快速建立行业信任并获得更多订单。"
      ]
    }
  ],
  he: [
    {
      id: "auckland",
      name: "Auckland",
      description:
        "המרכז הבינלאומי הגדול של ניו זילנד מכסה הסעות שדה, ליווי ב-CBD והרפתקאות איים עבור מבקרים שמבקשים גם יעילות וגם רגעים בלתי נשכחים.",
      stats: ["מדריכים מקומיים לפי דרישה", "מתורגמנים רב-לשוניים", "חוויות אוויר·יבשה·ים"],
      focus: "עיר MVP",
      hero: {
        headline: "מה-Sky Tower ועד קו החוף מחכה מומחה מקומי מוכח.",
        subtext:
          "בקשות נפוצות: תרגום עסקי, סיורי צוות בעיר, טיולי יקבים ל-Waiheke ואימון נימוסין בין-תרבותי."
      },
      experiences: [
        "מיד לאחר הנחיתה ב-Auckland Airport ניתן להזעיק מומחה דו-לשוני שיטפל בהשכרת רכב, בצ'ק-אין ובמשימות מיידיות.",
        "רוצים לחוות את חיי הלילה? הזמינו מוזיקאים או מדריכי ריקוד מקומיים שמלווים אתכם בברים ומלמדים את הצעדים החמים.",
        "צוותי טכנולוגיה אורחים יכולים להזמין יועצים לסיורי אקו-סיסטם או לתדרוכי משקיעים."
      ],
      logistics: [
        "רדיוס כיסוי: נותני שירות מגדירים 15–20 ק\"מ ו-Guidew מזכירה אוטומטית את זמן הנסיעה להזמנה הבאה.",
        "תשלום: Visa/Mastercard ו-Stripe זמינים כבר עכשיו, Apple Pay ו-Google Pay מצטרפים בשלבים הבאים.",
        "הטבות VIP: התאמות אוטומטיות, תכנון מסלולי AI ותמיכת קונסיירז' לנסיעות חוזרות."
      ]
    },
    {
      id: "wellington",
      name: "Wellington",
      description:
        "בירת התרבות והקולנוע של ניו זילנד שמדגישה קפה specialty, סדנאות יצירתיות ותמיכה מקצועית בישיבות.",
      stats: ["אוצרות תרבות", "תמיכת כנסים", "הדרכת שטח"],
      focus: "עיר ההתרחבות הראשונה",
      hero: {
        headline: "חוו אומנות, קולנוע וטבע בעיר הרוח בלי לאבד קצב.",
        subtext:
          "בקשות נפוצות: סיורי תעשיית קולנוע, פרשנות סימולטנית לכנסים, הליכות טבע מודרכות ומסלולי קפה ייחודיים."
      },
      experiences: [
        "אנשי קולנוע יכולים לבקר בסטודיוני Miramar עם מפיקים מקומיים ולהכיר את מאחורי הקלעים.",
        "פרילנסרים וקבוצות יצירה מזמינים מאסטרים של קפה כדי לבנות מסלולי טעימה שמדגישים את טעמי ולינגטון.",
        "חובבי טבע מוצאים מדריכים שמכירים את Wairarapa ואת Kāpiti Coast ומתכננים day trip שמשלב רכבת והליכה."
      ],
      logistics: [
        "הטופוגרפיה הקומפקטית מאפשרת להחליף הזמנות במהירות; Guidew שולחת התראות נסיעה ומזג אוויר בזמן אמת.",
        "אירועים ממשלתיים ותאגידיים יוצרים ביקוש מתמשך לפרשנות רב-לשונית ולכתיבת פרוטוקולים.",
        "העלאת תעודות ופורטפוליו מסייעת לבנות אמון ולהגדיל את קצב ההזמנות."
      ]
    }
  ],
};

const careerOpenings: Partial<Record<SupportedLocale, CareerOpening[]>> = {
  en: [
    {
      id: "senior-product-designer",
      title: "Senior Product Designer",
      location: "Auckland / Remote NZ",
      tags: ["Design System", "Service Blueprint"],
      description:
        "Shape cross-language, multi-role experiences and define the information architecture for both traveler and provider apps.",
      responsibilities: [
        "Partner with product and operations to map real user journeys and service blueprints.",
        "Build a design system that supports multiple languages, color palettes, and dark mode.",
        "Prototype and run usability tests to keep our 6-month MVP plan on track."
      ],
      requirements: [
        "5+ years crafting mobile and web experiences for consumer or marketplace products.",
        "Hands-on experience with maps, lists, messaging, or other complex UI surfaces.",
        "Comfort working in English or Chinese; knowledge of the NZ travel market is a plus."
      ],
      perks: [
        "Equity plus remote-friendly work style",
        "Ownership of product experience decisions with the founding team",
        "Annual travel stipend to explore the Guidew network"
      ]
    },
    {
      id: "full-stack-engineer",
      title: "Full-stack Engineer",
      location: "Wellington / Remote NZ",
      tags: ["React", "Node.js", "Map SDK"],
      description:
        "Build the dual map/list discovery experience, order orchestration logic, and payments/wallet systems.",
      responsibilities: [
        "Ship a synchronized map + list interface that streams provider locations and filters.",
        "Develop order matching, auto-accept logic, and AI itinerary planning APIs.",
        "Maintain payments, wallet, subscription, and commission safety."
      ],
      requirements: [
        "Proficient with React, TypeScript, Node.js, and modern tooling like Vite or Next.js.",
        "Experience with maps/location, real-time communication, or payments.",
        "Champion code quality and observability in fast-paced environments."
      ],
      perks: [
        "Remote-first with quarterly in-person meetups",
        "Input on core technical architecture",
        "Annual learning budget for conferences or courses"
      ]
    },
    {
      id: "city-operations-lead",
      title: "City Operations Lead",
      location: "Auckland",
      tags: ["Supply Growth", "Community"],
      description:
        "Grow the local provider base and establish certification and training playbooks across categories like dance, translation, and outdoor adventures.",
      responsibilities: [
        "Design supply growth plans and create certification, training, and incentive programs.",
        "Partner with tourism, education, and event organizations to diversify services.",
        "Use data to improve response efficiency and user satisfaction."
      ],
      requirements: [
        "3+ years in local services, mobility, or market operations with team leadership experience.",
        "Deep understanding of Auckland's cultural resources and tourism ecosystem.",
        "Execution-driven communicator who can turn strategy into action."
      ],
      perks: [
        "Co-build the city operations model with the founders",
        "Flexible working plus city exploration stipend",
        "Pathways to global expansion opportunities"
      ]
    }
  ],
  pt: [
    {
      id: "senior-product-designer",
      title: "Senior Product Designer",
      location: "Auckland / Remoto NZ",
      tags: ["Design System", "Service Blueprint"],
      description:
        "Modele experiências multilíngues e multirrol e defina a arquitetura de informação dos apps para viajantes e provedores.",
      responsibilities: [
        "Trabalhar com produto e operações para mapear jornadas reais e service blueprints completos.",
        "Construir um design system que suporte múltiplos idiomas, paletas e modos claro/escuro.",
        "Prototipar, testar e iterar rápido para manter o plano de MVP de 6 meses no ritmo certo."
      ],
      requirements: [
        "5+ anos criando experiências mobile ou web para produtos consumer ou marketplaces.",
        "Vivência prática com superfícies complexas como mapas, listas, mensagens ou dashboards.",
        "Conforto colaborando em inglês ou chinês; conhecimento do mercado de viagens NZ é diferencial."
      ],
      perks: [
        "Equity e modelo remoto-amigável",
        "Autonomia em decisões de produto ao lado do time fundador",
        "Bolsa anual para explorar a rede Guidew"
      ]
    },
    {
      id: "full-stack-engineer",
      title: "Full-stack Engineer",
      location: "Wellington / Remoto NZ",
      tags: ["React", "Node.js", "Map SDK"],
      description:
        "Construa a experiência combinada de mapa/lista, a orquestração de pedidos e os sistemas de pagamentos e carteira.",
      responsibilities: [
        "Entregar uma interface sincronizada de mapa + lista com streaming da localização dos provedores e filtros.",
        "Desenvolver matching, lógica de autoaceite e APIs de planejamento com IA.",
        "Manter pagamentos, carteira, assinaturas e comissões seguros e observáveis."
      ],
      requirements: [
        "Proficiência em React, TypeScript, Node.js e ferramentas modernas como Vite ou Next.js.",
        "Experiência com mapas/localização, comunicação em tempo real ou pagamentos.",
        "Defender qualidade de código, testes e monitoramento em ambientes acelerados."
      ],
      perks: [
        "Remote-first com encontros presenciais trimestrais",
        "Influência direta nas decisões de arquitetura",
        "Bolsa anual para cursos, conferências e certificações"
      ]
    },
    {
      id: "city-operations-lead",
      title: "City Operations Lead",
      location: "Auckland",
      tags: ["Supply Growth", "Community"],
      description:
        "Expanda a base local de provedores e estabeleça playbooks de certificação e treinamento em categorias como dança, tradução e aventuras outdoor.",
      responsibilities: [
        "Desenhar planos de crescimento de oferta e criar programas de certificação, treinamento e incentivos.",
        "Firmar parcerias com turismo, educação e eventos para diversificar os serviços disponíveis.",
        "Usar dados para melhorar velocidade de resposta e satisfação dos usuários."
      ],
      requirements: [
        "3+ anos em serviços locais, mobilidade ou operações de marketplace com experiência liderando equipe.",
        "Conhecimento profundo dos recursos culturais de Auckland e do ecossistema turístico.",
        "Comunicador orientado à execução que transforma estratégia em ações concretas."
      ],
      perks: [
        "Cocriar o modelo operacional com os fundadores",
        "Trabalho flexível com subsídio para explorar a cidade",
        "Caminhos abertos para oportunidades de expansão global"
      ]
    }
  ],
  es: [
    {
      id: "senior-product-designer",
      title: "Senior Product Designer",
      location: "Auckland / Remoto NZ",
      tags: ["Design System", "Service Blueprint"],
      description:
        "Diseña experiencias multilenguaje y multiroles, definiendo la arquitectura de información tanto para el app de viajeros como para el de proveedores.",
      responsibilities: [
        "Trabajar con producto y operaciones para mapear journeys reales y service blueprints completos.",
        "Construir un design system que soporte idiomas, paletas y modos claro/oscuro.",
        "Prototipar y ejecutar pruebas de usabilidad para mantener el plan MVP de 6 meses en ritmo."
      ],
      requirements: [
        "5+ años creando experiencias móviles o web para productos consumer o marketplaces.",
        "Experiencia directa con superficies complejas como mapas, listas, mensajería o dashboards.",
        "Comodidad colaborando en inglés o chino; conocer el mercado turístico de NZ es un plus."
      ],
      perks: [
        "Equity y esquema remoto-amigable",
        "Propiedad sobre decisiones de experiencia junto al equipo fundador",
        "Stipend anual para explorar la red Guidew"
      ]
    },
    {
      id: "full-stack-engineer",
      title: "Full-stack Engineer",
      location: "Wellington / Remoto NZ",
      tags: ["React", "Node.js", "Map SDK"],
      description:
        "Construye la experiencia combinada mapa/lista, la lógica de orquestación de pedidos y los sistemas de pagos y wallet.",
      responsibilities: [
        "Entregar una interfaz sincronizada mapa + lista que transmita ubicaciones y filtros en tiempo real.",
        "Desarrollar matching de órdenes, lógica de autoaceptación y APIs de planificación con IA.",
        "Mantener pagos, wallet, suscripciones y comisiones con foco en seguridad."
      ],
      requirements: [
        "Dominio de React, TypeScript, Node.js y herramientas modernas como Vite o Next.js.",
        "Experiencia con mapas/locación, comunicación en tiempo real o pagos.",
        "Impulso por la calidad de código y la observabilidad en entornos ágiles."
      ],
      perks: [
        "Remoto-first con encuentros presenciales trimestrales",
        "Participación directa en arquitectura técnica central",
        "Bolsa anual para conferencias o cursos"
      ]
    },
    {
      id: "city-operations-lead",
      title: "City Operations Lead",
      location: "Auckland",
      tags: ["Supply Growth", "Community"],
      description:
        "Haz crecer la red de proveedores locales y establece manuales de certificación y entrenamiento en categorías como danza, traducción y aventura.",
      responsibilities: [
        "Diseñar planes de crecimiento de oferta y crear programas de certificación, formación e incentivos.",
        "Asociarte con turismo, educación y eventos para diversificar los servicios disponibles.",
        "Usar datos para mejorar tiempos de respuesta y satisfacción de usuarios."
      ],
      requirements: [
        "3+ años en servicios locales, movilidad u operaciones de mercado con experiencia liderando equipos.",
        "Entendimiento profundo de los recursos culturales de Auckland y su ecosistema turístico.",
        "Comunicador orientado a la ejecución capaz de convertir estrategia en acciones concretas."
      ],
      perks: [
        "Cocrear el modelo operativo de la ciudad junto a los fundadores",
        "Trabajo flexible más stipend para explorar la ciudad",
        "Ruta hacia oportunidades de expansión global"
      ]
    }
  ],
  zh: [
    {
      id: "senior-product-designer",
      title: "Senior Product Designer",
      location: "Auckland / Remote NZ",
      tags: ["Design System", "Service Blueprint"],
      description: "打造跨语言、多角色的端到端体验，定义普通用户与服务者双应用的信息架构。",
      responsibilities: [
        "与产品和运营团队合作，绘制用户旅程与服务蓝图，拆解真实线下场景。",
        "建立设计系统，适配多语言、多品牌色彩模式与暗色主题。",
        "使用原型与可用性测试快速迭代，确保 6 个月 MVP 目标落地。"
      ],
      requirements: [
        "5 年以上移动与 Web 端体验设计经验，擅长消费级或双边市场产品。",
        "具备地图、列表、即时通讯等复杂界面设计经验。",
        "能用英文或中文进行跨职能协作，了解新西兰出行/旅游市场更佳。"
      ],
      perks: [
        "股权与远程友好工作模式",
        "产品体验决策权，直接与创始团队协作",
        "年度出行补贴，体验 Guidew 服务网络"
      ]
    },
    {
      id: "full-stack-engineer",
      title: "Full-stack Engineer",
      location: "Wellington / Remote NZ",
      tags: ["React", "Node.js", "Map SDK"],
      description: "负责地图浏览/列表模式的搜索体验、订单撮合逻辑、支付与钱包体系。",
      responsibilities: [
        "实现地图 + 列表双模式，支持实时服务者位置与筛选条件。",
        "构建订单撮合、自动接单与 AI 行程规划等核心后台能力。",
        "维护支付、钱包、佣金与订阅的结算安全性。"
      ],
      requirements: [
        "熟悉 React、TypeScript、Node.js，了解 Vite 或 Next.js 等现代框架。",
        "具备地图/定位、实时通信或支付相关开发经验。",
        "重视代码质量与可观测性，能支撑快速迭代的创业节奏。"
      ],
      perks: ["远程优先，团队季度聚会", "技术选型参与权，搭建核心架构", "年度培训预算，支持行业会议与课程"]
    },
    {
      id: "city-operations-lead",
      title: "City Operations Lead",
      location: "Auckland",
      tags: ["Supply Growth", "Community"],
      description: "拓展本地服务者，在舞蹈、翻译、户外等垂直领域建立认证与培训流程。",
      responsibilities: [
        "制定服务者增长计划，建立认证、培训与激励体系。",
        "与旅游、教育、活动机构合作，丰富特色服务供给。",
        "通过数据洞察优化抢单效率与用户满意度。"
      ],
      requirements: [
        "3 年以上本地生活、出行或市场运营经验，有团队管理经历。",
        "熟悉奥克兰及周边的文化资源与旅游生态。",
        "强执行力与沟通能力，能将战略拆解为可落实的动作。"
      ],
      perks: ["与创始团队共建城市运营模型", "弹性办公 + 城市探索补贴", "对接全球拓展机会"]
    }
  ],
  he: [
    {
      id: "senior-product-designer",
      title: "מעצב/ת מוצר בכיר/ה",
      location: "אוקלנד / עבודה היברידית בניו זילנד",
      tags: ["Design System", "Service Blueprint"],
      description:
        "לעצב חוויות רב־לשוניות ורב־תפקידיות ולהגדיר את ארכיטקטורת המידע של אפליקציות המטיילים והספקים בו זמנית.",
      responsibilities: [
        "לעבוד עם מוצר ואופרציה כדי למפות מסעות משתמש אמיתיים ולבנות service blueprints מלאים.",
        "להוביל מערכת עיצוב שתומכת בריבוי שפות, ערכות צבע ומצב כהה.",
        "לתכנן אב-טיפוס ולהריץ מבחני שימושיות שמחזיקים את תכנית ה-MVP לחצי השנה הקרובה בקצב הנכון."
      ],
      requirements: [
        "5+ שנות ניסיון בעיצוב חוויות מובייל או ווב למוצרים צרכניים או מרקטפלייס.",
        "ניסיון מעשי בממשקים מורכבים כמו מפות, רשימות, מסרים או משטחי נתונים עשירים.",
        "יכולת לעבוד באנגלית או בסינית; היכרות עם שוק התיירות הניו-זילנדי נחשבת יתרון."
      ],
      perks: [
        "אופציות ותצורת עבודה מרחוק גמישה",
        "שותפות בהכרעות חוויית מוצר לצד הצוות המייסד",
        "מענק נסיעות שנתי להיכרות עם רשת Guidew"
      ]
    },
    {
      id: "full-stack-engineer",
      title: "מהנדס/ת פול-סטאק",
      location: "וולינגטון / עבודה היברידית בניו זילנד",
      tags: ["React", "Node.js", "Map SDK"],
      description:
        "לבנות את חוויית הגילוי המשולבת מפה+רשימה, את לוגיקת האופרציה של הזמנות ואת מערכות התשלומים והארנק.",
      responsibilities: [
        "למסור ממשק מסונכרן של מפה + רשימה שמציג מיקומי ספקים ופילטרים בזמן אמת.",
        "לפתח התאמת הזמנות, לוגיקת auto-accept ו-APIs לתכנון מסלולי AI.",
        "לתחזק את מערכות התשלומים, הארנק, המנויים והעמלות בצורה מאובטחת ושקופה."
      ],
      requirements: [
        "שליטה ב-React, TypeScript, Node.js וכלי בילד מודרניים כמו Vite או Next.js.",
        "ניסיון עם מפות/מיקום, תקשורת בזמן אמת או תשלומים.",
        "מחויבות לאיכות קוד, תצפיות ואוטומציה בסביבות מהירות."
      ],
      perks: [
        "Remote-first עם מפגשי צוות רבעוניים",
        "השפעה על הארכיטקטורה הטכנולוגית המרכזית",
        "תקציב למידה שנתי לכנסים או קורסים"
      ]
    },
    {
      id: "city-operations-lead",
      title: "מנהלת/ת תפעול עיר",
      location: "אוקלנד",
      tags: ["Supply Growth", "Community"],
      description:
        "להגדיל את קהילת הספקים המקומית ולהקים ספרי הדרכה לאישורים ולהכשרות בקטגוריות כמו ריקוד, תרגום והרפתקאות שטח.",
      responsibilities: [
        "לבנות תכניות צמיחת היצע ולגבש מסלולי הסמכה, הכשרה ותמריצים.",
        "לשתף פעולה עם גורמי תיירות, חינוך ואירועים כדי להרחיב את סל השירותים.",
        "להשתמש בנתונים כדי לשפר זמני תגובה וחוויית המשתמשים."
      ],
      requirements: [
        "3+ שנות ניסיון בתפעול שירותים מקומיים, מוביליטי או מרקטפלייס כולל הובלת צוות.",
        "היכרות עמוקה עם המשאבים התרבותיים והאקוסיסטם התיירותי של אוקלנד.",
        "מנהיג/ה hands-on שמתרגם/ת אסטרטגיה לביצוע בשטח."
      ],
      perks: [
        "עבודה ישירה עם המייסדים על מודל התפעול העירוני",
        "גמישות בעבודה ומענק לחקר העיר",
        "מסלול צמיחה להזדמנויות התרחבות גלובליות"
      ]
    }
  ]
};

const blogPosts: Partial<Record<SupportedLocale, BlogPost[]>> = {
  en: [
    {
      id: "local-skill-network",
      icon: "map",
      iconLabel: "Local Insight",
      title: "Why Travelers Need Local Skill Networks More Than Ever",
      date: "2024-12-12",
      summary:
        "From touchdown to hidden gems, Guidew connects travelers with locals to solve the last-mile gap, surface verifiable expertise, and unlock authentic experiences.",
      sections: [
        {
          heading: "The Last Mile in a Strange City",
          content:
            "Transport and hotels are solved, but the first 72 hours determine how a trip feels. Guidew lets you summon locals for language help, cultural decoding, and human support the moment you arrive. Instead of doom-scrolling unrelated reviews, you select a mission—airport escort, hospital visit, maker tour—and receive a shortlist of verified humans within minutes."
        },
        {
          heading: "Two-sided Network Effects",
          content:
            "Providers upload credentials, proof, and portfolios to build trust. Users leave reviews, tip, and join VIP subscriptions, creating incentives for more experts to join. Each completed order feeds a quality graph that exposes availability, response time, and transparent pricing to the next traveler."
        },
        {
          heading: "The Power of AI + Humans",
          content:
            "AI parses requests, tags intents, and does matchmaking, but the service happens offline through people. Guidew keeps technology in the background as the connector while humans own empathy, improvisation, and cultural fluency."
        },
        {
          heading: "What Travelers Actually Request",
          content:
            "Top categories include airport concierge, urgent translation for clinics, curated experiences for kids, and pop-up creator sessions. A typical brief might be \"Need a bilingual driver to pick up parents, set up SIM cards, and schedule a grocery run.\" We tag these jobs and surface modular packages like errands, cultural escort, or VIP nightlife."
        },
        {
          heading: "Designing Trust for Local Experts",
          content:
            "Experts build service cards with time, price, and requirements, then attach proof: certificates, video intros, liability coverage, and community references. Guidew reminds them to refresh documents every 90 days and rewards consistent acceptance rates with instant payouts and higher ranking."
        },
        {
          heading: "Blueprint for City Operations",
          content:
            "Each city is seeded with at least 30 reliable providers across translation, concierge, cultural experiences, wellness, and mobility. Local partners—language schools, dance studios, tourism boards—act as verification hubs. Once supply density crosses three experts per square kilometer in downtown areas, we unlock VIP subscriptions and cross-city reservations."
        },
        {
          heading: "Where We're Taking It Next",
          content:
            "The same playbook expands to Sydney, Singapore, and Osaka. We are shipping multilingual AI intake forms, deeper insurance coverage, and API hooks for airlines, real-estate agents, and relocation firms so a traveler can land anywhere in APAC and ping the nearest Guidew squad for instant human logistics."
        }
      ]
    },
    {
      id: "vip-translation",
      icon: "language",
      iconLabel: "VIP Features",
      title: "VIP Translation Subscription: Instant Cross-language Support",
      date: "2024-11-28",
      summary:
        "VIP users can call certified translators anytime for medical visits, meetings, and errands while enjoying AI intent intake, concierge routing, and zero booking fees—a single membership that replaces ad-hoc messaging groups.",
      sections: [
        {
          heading: "Why $9.9/Month Matters",
          content:
            "VIP users skip commissions and describe their needs in one sentence or by uploading a photo of paperwork. AI rewrites the brief, highlights jargon, and recommends the right translator, guide, or bilingual driver within 60 seconds."
        },
        {
          heading: "Priority Matching",
          content:
            "Requests surface to top providers based on proximity, skills, compliance records, and recent availability. VIP orders tap into a faster routing lane with automated reminders so translators can accept without refreshing the app."
        },
        {
          heading: "Safety & Compliance",
          content:
            "All translators pass identity and professional verification, and can upload certificates plus background checks. Enterprise clients can request NDAs or HIPAA-like confidentiality agreements that auto-attach to every VIP order."
        },
        {
          heading: "Use Cases Our VIPs Trigger",
          content:
            "Common flows: hospital intake with simultaneous note taking, investment tours with whisper interpretation, parent-teacher meetings, and last-minute contract reviews. VIP mode stores preferences—dialect, tone, or domain knowledge—so future jobs reuse the same crew."
        },
        {
          heading: "Provider Requirements & Tooling",
          content:
            "Translators sync Google or Outlook calendars, define hourly slots, and can opt into auto-accept for recurring clients. Guidew reminds them to update certificates every 6 months and offers AI draft replies for sensitive situations like medical emergencies."
        },
        {
          heading: "Billing, Compliance, and Privacy",
          content:
            "Receipts arrive instantly with categorized expense codes for visa applications or insurance claims. Chat transcripts, audio snippets, and signed documents remain encrypted; users can request deletion or export per jurisdiction rules."
        },
        {
          heading: "Roadmap: Beyond Translation",
          content:
            "Next up: instant voice cloning for outbound calls, shared glossaries for corporate teams, and bundled mobility services so the same translator can book rides or check in at embassies. VIP tiers will expand to cover relocation and legal concierge support."
        }
      ]
    },
    {
      id: "wellington-bachata",
      icon: "music",
      iconLabel: "Community Story",
      title: "Finding a Bachata Coach in Wellington Takes One Tap",
      date: "2024-11-02",
      summary:
        "A dance fan shares how she booked a local instructor through Guidew and turned her apartment into a pop-up studio, revealing how the local skill network handles matching, space prep, payments, and community follow-ups.",
      sections: [
        {
          heading: "How the Request Started",
          content:
            "The user simply wrote \"I want a Bachata lesson this weekend, preferably at home.\" She added context about her living room size, experience level, and music preferences. Within eight minutes, Guidew surfaced three vetted dancers plus add-on options like bringing mirrors or audio gear."
        },
        {
          heading: "What Providers Show",
          content:
            "Dancers upload teaching clips, credentials, dance crew affiliations, and rates so users understand their style and professionalism instantly. Availability calendars display which evenings they travel across Te Aro, Mount Cook, or online, and response-time streaks reassure newcomers."
        },
        {
          heading: "Offline Magic",
          content:
            "One-on-one lessons paired with local music recommendations became more than a class—it turned into a cultural exchange. The coach curated warm-ups inspired by Wellington street performances and wrapped with a playlist of emerging Chilean DJs."
        },
        {
          heading: "Coordinating the Session",
          content:
            "Guidew shared a checklist covering floor space, ventilation, and neighbors. The coach dropped a pin for arrival, used in-app messaging for elevator access, and logged a pre-lesson safety brief covering hydration and stretching."
        },
        {
          heading: "Pricing, Tipping, and Extras",
          content:
            "The base fee was $95 NZD for 90 minutes, plus an optional $20 equipment kit with speakers and portable mirrors. Payment cleared automatically after the coach marked the session complete, and the user tipped 15% with a quick note highlighting the bilingual instruction."
        },
        {
          heading: "Impact for Local Providers",
          content:
            "Dancers treat Guidew as a storefront: they list duet or group packages, connect Stripe for weekly payouts, and unlock badges for punctuality. Successful sessions feed a highlight reel that helps them sell choreography services to events and weddings."
        },
        {
          heading: "Community Ripple Effects",
          content:
            "After the lesson, the user joined a Guidew chat thread where locals share upcoming socials, costume rentals, and studio recommendations. The coach now hosts a monthly rooftop class sourced entirely from similar Guidew requests."
        }
      ]
    },
    {
      id: "provider-branding",
      icon: "compass",
      iconLabel: "Provider Playbook",
      title: "How Providers Use Guidew to Build Personal Brands",
      date: "2024-10-15",
      summary:
        "Showcase proof, certificates, audio/video work, auto-accept VIP orders, and use AI itineraries to build a trusted digital storefront that functions like a mini agency with payouts, analytics, and community referrals.",
      sections: [
        {
          heading: "Designing Your Digital Storefront",
          content:
            "Every profile starts with a headline that describes the mission: bilingual concierge, cultural curator, wellness escort. Providers choose a hero image, list service radius, languages, equipment, and safety certifications so travelers understand exactly who will show up."
        },
        {
          heading: "Proof Wins Bookings",
          content:
            "Detailed bios, certificate walls, service videos, and transparent pricing determine whether travelers trust you enough to book. Providers pin credentials (NAATI, first-aid, hospitality), upload short reels, and add testimonials pulled from past Guidew orders."
        },
        {
          heading: "Packages, Pricing, and Upsells",
          content:
            "You can bundle services such as 90-minute translation plus errands, or two-hour nightlife escort with transport add-ons. Add-ons include gear rental, rush fees, or VIP-only perks like itinerary editing. Transparent tiers reduce haggling and increase conversion."
        },
        {
          heading: "Automation & AI",
          content:
            "VIP providers auto-accept trusted clients, plan routes with AI, and keep calendars synced via Google or Outlook so double bookings disappear. Intake forms auto-summarize traveler needs into professional proposals that are ready to send."
        },
        {
          heading: "Reputation Loops",
          content:
            "Badges, ratings, response-time streaks, and \"last active\" stamps help providers steadily accumulate trust capital. Highlight reels stitch together photos, audio, or feedback quotes for social proof that the next traveler can skim in seconds."
        },
        {
          heading: "Business Engine",
          content:
            "Stripe or local bank payouts run weekly with instant payout boosts unlocked through verification. Dashboards expose top request types, repeat-client rate, tip averages, and cancellations so providers can tweak offerings or staffing."
        },
        {
          heading: "Growth Roadmap",
          content:
            "Upcoming drops include video consultations, templated marketing pages, and partner campaigns with tourism boards. Providers can opt into co-branded experiences or retail collabs to expand beyond single bookings."
        }
      ]
    }
  ],
  pt: [
    {
      id: "local-skill-network",
      icon: "map",
      iconLabel: "Visão Local",
      title: "Por que viajantes precisam de redes locais de habilidades como nunca",
      date: "2024-12-12",
      summary:
        "Do pouso aos segredos escondidos, a Guidew conecta viajantes a especialistas locais para fechar a lacuna da última milha, revelar expertise verificável e destravar experiências autênticas.",
      sections: [
        {
          heading: "A última milha em uma cidade desconhecida",
          content:
            "Transporte e hotel podem estar resolvidos, mas as primeiras 72 horas definem o humor da viagem. A Guidew permite convocar locais para apoio linguístico, decodificação cultural e acolhimento humano assim que você desembarca. Em vez de vasculhar reviews aleatórios, basta escolher uma missão—acompanhamento no aeroporto, visita ao hospital, tour maker—e receber em minutos uma lista de pessoas verificadas."
        },
        {
          heading: "Efeitos de rede bidirecionais",
          content:
            "Provedores enviam credenciais, provas e portfólios para construir confiança. Usuários avaliam, dão gorjeta e entram no VIP, criando incentivo para mais especialistas entrarem. Cada pedido concluído alimenta um grafo de qualidade que torna visíveis disponibilidade, tempo de resposta e preços transparentes para o próximo viajante."
        },
        {
          heading: "A força da IA + pessoas",
          content:
            "IA interpreta solicitações, etiqueta intenções e sugere correspondências, mas o serviço acontece offline, entre pessoas. A Guidew mantém a tecnologia como fio condutor, enquanto humanos trazem empatia, improviso e fluência cultural."
        },
        {
          heading: "O que os viajantes realmente pedem",
          content:
            "Categorias líderes incluem concierge no aeroporto, tradução urgente em clínicas, experiências para crianças e sessões pop-up com creators. Um briefing comum: \"Preciso de um motorista bilíngue para buscar meus pais, configurar SIM cards e organizar compras.\" Nós etiquetamos esses jobs e oferecemos pacotes modulares como tarefas, escolta cultural ou noite VIP."
        },
        {
          heading: "Desenhando confiança para especialistas locais",
          content:
            "Especialistas montam cards de serviço com duração, preço e requisitos, anexando provas como certificados, vídeos de apresentação, seguros e referências comunitárias. A Guidew lembra de atualizar documentos a cada 90 dias e recompensa taxas de aceitação consistentes com pagamentos instantâneos e melhor ranqueamento."
        },
        {
          heading: "Blueprint operacional por cidade",
          content:
            "Cada cidade começa com ao menos 30 provedores confiáveis em tradução, concierge, experiências culturais, bem-estar e mobilidade. Parceiros locais—escolas de idiomas, estúdios de dança, órgãos de turismo—atuam como hubs de verificação. Assim que a densidade passa de três especialistas por quilômetro quadrado no centro, liberamos assinaturas VIP e reservas intercidade."
        },
        {
          heading: "Próximos destinos",
          content:
            "O mesmo playbook vai para Sydney, Cingapura e Osaka. Estamos lançando formulários de intake multilíngues com IA, seguros mais robustos e integrações com companhias aéreas, imobiliárias e empresas de relocação para que qualquer viajante no APAC acione a equipe Guidew mais próxima para logística humana instantânea."
        }
      ]
    },
    {
      id: "vip-translation",
      icon: "language",
      iconLabel: "Recursos VIP",
      title: "Assinatura VIP de tradução: suporte instantâneo entre idiomas",
      date: "2024-11-28",
      summary:
        "VIPs podem acionar tradutores certificados a qualquer hora para consultas médicas, reuniões e tarefas, aproveitando intake com IA, roteamento concierge e zero taxas de contratação—uma única assinatura substitui grupos improvisados de mensagem.",
      sections: [
        {
          heading: "Por que US$ 9,9/mês faz diferença",
          content:
            "VIPs pulam a comissão, descrevem a necessidade em uma frase ou enviam foto do documento. A IA reescreve o briefing, destaca jargões e recomenda o tradutor, guia ou motorista bilíngue ideal em até 60 segundos."
        },
        {
          heading: "Correspondência prioritária",
          content:
            "Pedidos aparecem para provedores com base em proximidade, habilidades, histórico de compliance e disponibilidade recente. Ordens VIP entram em uma fila mais rápida com lembretes automáticos para que tradutores aceitem sem precisar atualizar o app."
        },
        {
          heading: "Segurança e conformidade",
          content:
            "Todos os tradutores passam por verificação de identidade e credenciais e podem enviar certificados + antecedentes. Clientes corporativos solicitam NDAs ou acordos de confidencialidade, que são anexados automaticamente a cada pedido VIP."
        },
        {
          heading: "Casos de uso acionados pelos VIPs",
          content:
            "Fluxos frequentes: admissão em hospital com anotações simultâneas, tours de investimento com interpretação sussurrada, reuniões escola-pais e revisão urgente de contratos. O modo VIP salva preferências—dialeto, tom, domínio—para que as próximas demandas reutilizem a mesma equipe."
        },
        {
          heading: "Ferramentas e requisitos do provedor",
          content:
            "Tradutores sincronizam calendários Google ou Outlook, definem blocos por hora e podem ativar autoaceite para clientes recorrentes. A Guidew lembra de renovar certificados a cada 6 meses e oferece respostas sugeridas por IA para situações sensíveis, como emergências médicas."
        },
        {
          heading: "Faturamento, compliance e privacidade",
          content:
            "Recibos chegam instantaneamente com códigos de despesa para vistos ou seguros. Conversas, áudio e documentos assinados ficam criptografados; usuários podem solicitar exclusão ou exportação conforme as regras de cada jurisdição."
        },
        {
          heading: "Roteiro: além da tradução",
          content:
            "Próximas entregas: clonagem de voz instantânea para ligações, glossários compartilhados para times corporativos e combos de mobilidade para que o mesmo tradutor reserve transporte ou faça check-in em embaixadas. Planos VIP vão cobrir relocação e concierge jurídico."
        }
      ]
    },
    {
      id: "wellington-bachata",
      icon: "music",
      iconLabel: "História da Comunidade",
      title: "Encontrar um professor de Bachata em Wellington leva um toque",
      date: "2024-11-02",
      summary:
        "Uma fã de dança conta como reservou uma instrutora local via Guidew e transformou seu apartamento em estúdio pop-up, mostrando como a rede lida com matching, preparo do espaço, pagamentos e vida comunitária.",
      sections: [
        {
          heading: "Como o pedido nasceu",
          content:
            "Ela escreveu “Quero aula de Bachata neste fim de semana, de preferência em casa”, adicionou metragem da sala, nível técnico e playlist favorita. Em oito minutos surgiram três dançarinos aprovados, com opcionais como levar espelho ou equipamento de som."
        },
        {
          heading: "O que os provedores exibem",
          content:
            "Dançarinos sobem clipes de aula, certificados, coletivos aos quais pertencem e tabela de preços, permitindo entender estilo e profissionalismo rapidamente. Agendas mostram noites em que atendem Te Aro, Mount Cook ou on-line, e séries de tempo de resposta tranquilizam novos alunos."
        },
        {
          heading: "Magia offline",
          content:
            "Aula individual mais indicações musicais virou intercâmbio cultural. A coach planejou aquecimentos inspirados em performances de rua em Wellington e fechou com playlist de DJs chilenos emergentes."
        },
        {
          heading: "Coordenando a sessão",
          content:
            "A Guidew compartilhou um checklist de piso, ventilação e vizinhos. A instrutora fixou o ponto de chegada, usou o chat para liberar o elevador e deixou registrado um briefing de segurança com hidratação e alongamentos."
        },
        {
          heading: "Preço, gorjeta e extras",
          content:
            "A base foi NZ$ 95 por 90 minutos, com kit opcional de NZ$ 20 (som + espelho portátil). O pagamento foi liberado automaticamente após o término e a usuária adicionou 15% de gorjeta agradecendo a condução bilíngue."
        },
        {
          heading: "Impacto para os provedores locais",
          content:
            "Dançarinos tratam a Guidew como vitrine: anunciam pacotes duo ou em grupo, conectam Stripe para receber semanalmente e desbloqueiam badges de pontualidade. Aulas bem-sucedidas viram reels curtos que ajudam a vender coreografias para eventos e casamentos."
        },
        {
          heading: "Ondas na comunidade",
          content:
            "Depois da aula, ela entrou em um grupo Guidew com agendas de bailes, aluguel de figurinos e indicações de estúdios. A instrutora hoje conduz uma aula mensal na laje abastecida apenas por pedidos semelhantes da plataforma."
        }
      ]
    },
    {
      id: "provider-branding",
      icon: "compass",
      iconLabel: "Playbook do Provedor",
      title: "Como provedores usam a Guidew para construir marcas pessoais",
      date: "2024-10-15",
      summary:
        "Exiba provas, certificados e portfólios em áudio/vídeo, aceite pedidos VIP automaticamente e combine itinerários com IA para manter uma vitrine confiável, com pagamentos, analytics e indicações concentrados em um só lugar.",
      sections: [
        {
          heading: "Desenhando sua vitrine digital",
          content:
            "Todo perfil começa com uma frase-missão: concierge bilíngue, curadoria cultural, acompanhamento wellness. Provedores escolhem imagem hero, raio de atendimento, idiomas, equipamentos e certificações para que o viajante saiba exatamente quem chegará."
        },
        {
          heading: "Prova gera conversão",
          content:
            "Bios completas, mural de certificados, vídeos de serviço e preços claros determinam confiança. Provedores fixam credenciais (NAATI, primeiros socorros, hotelaria), sobem reels curtos e inserem depoimentos de pedidos anteriores."
        },
        {
          heading: "Pacotes e upsells",
          content:
            "Combine, por exemplo, 90 minutos de tradução + tarefas ou 2 horas de night tour com transporte adicional. Extras incluem aluguel de equipamentos, taxa de urgência ou perks VIP como edição de itinerário, diminuindo barganhas."
        },
        {
          heading: "Automação e IA",
          content:
            "VIPs podem ativar autoaceite para clientes confiáveis, planejar rotas com IA e sincronizar agendas com Google/Outlook para evitar choques. Formulários comprimem os pedidos em propostas profissionais prontas para envio."
        },
        {
          heading: "Ciclo de reputação",
          content:
            "Badges, notas, streaks de resposta e status “online recentemente” acumulam capital de confiança. Highlights costuram fotos, áudios ou citações para que o próximo viajante entenda em segundos o estilo do serviço."
        },
        {
          heading: "Motor do negócio",
          content:
            "Pagamentos via Stripe ou bancos locais ocorrem semanalmente, com opção de saque instantâneo após verificações extras. Dashboards mostram tipos de pedido, taxa de clientes recorrentes, média de gorjetas e cancelamentos para orientar decisões."
        },
        {
          heading: "Mapa de crescimento",
          content:
            "Em breve: consultorias por vídeo, páginas de marketing prontas e campanhas com boards de turismo. Provedores podem aderir a experiências co-branded ou collabs com varejo para estender o negócio além dos pedidos individuais."
        }
      ]
    }
  ],
  es: [
    {
      id: "local-skill-network",
      icon: "map",
      iconLabel: "Perspectiva local",
      title: "Por qué los viajeros necesitan redes de habilidades locales más que nunca",
      date: "2024-12-12",
      summary:
        "Desde el aterrizaje hasta los tesoros escondidos, Guidew conecta a los viajeros con locales para cerrar la brecha de la última milla, mostrar pericia verificable y desbloquear experiencias auténticas.",
      sections: [
        {
          heading: "El último kilómetro en una ciudad desconocida",
          content:
            "El transporte y el hotel pueden estar resueltos, pero las primeras 72 horas determinan cómo se siente un viaje. Guidew te deja convocar locales para ayuda lingüística, decodificación cultural y soporte humano apenas llegas. En lugar de leer reseñas irrelevantes, eliges una misión—escolta en aeropuerto, visita a hospital, tour maker—y recibes en minutos una lista de personas verificadas."
        },
        {
          heading: "Efectos de red bidireccionales",
          content:
            "Los proveedores suben credenciales, pruebas y portafolios para construir confianza. Los usuarios dejan reseñas, dan propina y se suscriben al plan VIP, creando incentivos para que más expertos se unan. Cada pedido completado alimenta un grafo de calidad que muestra disponibilidad, tiempos de respuesta y precios transparentes al siguiente viajero."
        },
        {
          heading: "El poder de la IA + las personas",
          content:
            "La IA analiza solicitudes, etiqueta intenciones y realiza el matching, pero el servicio sucede offline entre humanos. Guidew mantiene la tecnología en segundo plano como conector mientras las personas aportan empatía, improvisación y fluidez cultural."
        },
        {
          heading: "Lo que realmente se solicita",
          content:
            "Las categorías líderes incluyen concierge de aeropuerto, traducción urgente en clínicas, experiencias para niños y sesiones pop-up con creadores. Un brief típico: \"Necesito un conductor bilingüe que recoja a mis padres, configure las SIM y haga una compra rápida.\" Etiquetamos estos trabajos y mostramos paquetes modulares como diligencias, escolta cultural o nightlife VIP."
        },
        {
          heading: "Diseñar confianza para expertos locales",
          content:
            "Los especialistas crean cards con duración, precio y requisitos, adjuntando certificados, videos, coberturas de responsabilidad y referencias comunitarias. Guidew les recuerda renovar documentos cada 90 días y recompensa tasas de aceptación consistentes con pagos instantáneos y mejor ranking."
        },
        {
          heading: "Plano operativo para cada ciudad",
          content:
            "Cada ciudad arranca con al menos 30 proveedores confiables en traducción, concierge, experiencias culturales, bienestar y movilidad. Aliados locales—escuelas de idiomas, estudios de danza, oficinas de turismo—actúan como nodos de verificación. Cuando la densidad supera tres expertos por km² en áreas céntricas, activamos suscripciones VIP y reservas entre ciudades."
        },
        {
          heading: "Hacia dónde vamos",
          content:
            "El mismo playbook se expande a Sídney, Singapur y Osaka. Estamos lanzando formularios de intake con IA, coberturas de seguro más profundas e integraciones con aerolíneas, inmobiliarias y firmas de relocación para que cualquier viajero en APAC pueda contactar al escuadrón Guidew más cercano y coordinar logística humana al instante."
        }
      ]
    },
    {
      id: "vip-translation",
      icon: "language",
      iconLabel: "Funciones VIP",
      title: "Suscripción VIP de traducción: soporte instantáneo entre idiomas",
      date: "2024-11-28",
      summary:
        "Los usuarios VIP pueden contactar traductores certificados en cualquier momento para citas médicas, reuniones y diligencias, con intake asistido por IA, ruteo concierge y cero tasas de contratación—una única membresía reemplaza grupos improvisados de chat.",
      sections: [
        {
          heading: "Por qué USD 9,9/mes marca la diferencia",
          content:
            "Los VIP omiten comisiones y describen su necesidad en una frase o subiendo foto del documento. La IA reescribe el brief, resalta jerga y recomienda al traductor, guía o conductor bilingüe ideal en menos de 60 segundos."
        },
        {
          heading: "Emparejamiento prioritario",
          content:
            "Las solicitudes aparecen primero para proveedores cercanos con habilidades, historiales de cumplimiento y disponibilidad reciente. Las órdenes VIP entran en un carril rápido con recordatorios automáticos, permitiendo aceptar sin refrescar la app."
        },
        {
          heading: "Seguridad y cumplimiento",
          content:
            "Todos los traductores pasan verificaciones de identidad y credenciales, y pueden subir certificados y antecedentes. Clientes enterprise solicitan NDAs o acuerdos tipo HIPAA que se adjuntan automáticamente a cada pedido VIP."
        },
        {
          heading: "Casos de uso que activan nuestros VIP",
          content:
            "Flujos frecuentes: admisión en hospitales con toma de notas, tours de inversión con interpretación susurrada, reuniones padres-colegio y revisiones de contratos de último minuto. El modo VIP guarda preferencias—dialecto, tono, dominio—para reutilizar al mismo equipo."
        },
        {
          heading: "Requisitos y herramientas para proveedores",
          content:
            "Los traductores sincronizan calendarios Google u Outlook, definen bloques por hora y pueden activar autoaceptación para clientes recurrentes. Guidew recuerda renovar certificados cada 6 meses y ofrece respuestas sugeridas por IA para escenarios sensibles como emergencias médicas."
        },
        {
          heading: "Facturación, cumplimiento y privacidad",
          content:
            "Los recibos llegan al instante con códigos de gasto para visas o seguros. Chats, audios y documentos firmados permanecen cifrados; los usuarios pueden solicitar eliminación o exportación según la normativa de cada jurisdicción."
        },
        {
          heading: "Hoja de ruta: más allá de la traducción",
          content:
            "Próximos lanzamientos: clonación de voz instantánea para llamadas, glosarios compartidos para equipos corporativos y bundles de movilidad para que el mismo traductor reserve traslados o gestione check-ins en embajadas. Los planes VIP cubrirán relocación y concierge legal."
        }
      ]
    },
    {
      id: "wellington-bachata",
      icon: "music",
      iconLabel: "Historia de comunidad",
      title: "Encontrar una coach de Bachata en Wellington toma un toque",
      date: "2024-11-02",
      summary:
        "Una fan de la danza cuenta cómo reservó a una instructora local a través de Guidew y convirtió su departamento en un estudio pop-up, mostrando cómo la red maneja el matching, la preparación del espacio, los pagos y el seguimiento con la comunidad.",
      sections: [
        {
          heading: "Cómo nació la solicitud",
          content:
            "La usuaria escribió: “Quiero una clase de Bachata este fin de semana, ojalá en casa”. Agregó los metros de su sala, nivel de experiencia y playlist favorita. En ocho minutos aparecieron tres bailarines verificados más extras como llevar espejos o equipo de sonido."
        },
        {
          heading: "Lo que muestran los proveedores",
          content:
            "Los bailarines suben clips de clases, credenciales, colectivos a los que pertenecen y tarifas para que el estilo y profesionalismo se entiendan al instante. Los calendarios muestran en qué noches cubren Te Aro, Mount Cook o sesiones online, y las rachas de respuesta tranquilizan a nuevos alumnos."
        },
        {
          heading: "Magia offline",
          content:
            "La clase individual más recomendaciones musicales se transformó en intercambio cultural. La coach diseñó calentamientos inspirados en performances callejeras de Wellington y cerró con una playlist de DJs chilenos emergentes."
        },
        {
          heading: "Coordinando la sesión",
          content:
            "Guidew compartió una checklist sobre espacio, ventilación y vecinos. La coach fijó un pin para la llegada, usó el chat in-app para acceso al ascensor y registró un briefing de seguridad previo con hidratación y estiramientos."
        },
        {
          heading: "Precios, propinas y extras",
          content:
            "La base fue de NZD $95 por 90 minutos, más un kit opcional de $20 con parlantes y espejos portátiles. El pago se liberó automáticamente después de que la coach marcó la sesión como completa y la usuaria dejó una propina del 15% destacando la instrucción bilingüe."
        },
        {
          heading: "Impacto para proveedores locales",
          content:
            "Los bailarines ven a Guidew como su vitrina: listan paquetes dúo o grupales, conectan Stripe para pagos semanales y desbloquean badges de puntualidad. Las sesiones exitosas alimentan un highlight reel que les ayuda a vender coreografías para eventos y bodas."
        },
        {
          heading: "Efecto multiplicador en la comunidad",
          content:
            "Tras la clase, la usuaria entró a un hilo de Guidew donde locales comparten socials, renta de vestuario y recomendaciones de estudios. La coach ahora lidera una clase mensual en rooftop nutrida completamente por solicitudes similares."
        }
      ]
    },
    {
      id: "provider-branding",
      icon: "compass",
      iconLabel: "Manual para proveedores",
      title: "Cómo los proveedores usan Guidew para construir marca personal",
      date: "2024-10-15",
      summary:
        "Muestra pruebas, certificados y piezas audiovisuales, activa autoaceptación VIP y usa itinerarios con IA para convertir tu perfil en una tienda confiable con pagos, analítica y referidos comunitarios.",
      sections: [
        {
          heading: "Diseñar tu vitrina digital",
          content:
            "Cada perfil inicia con una declaración de misión: concierge bilingüe, curador cultural, escolta de bienestar. Los proveedores eligen imagen principal, definen radio de servicio, idiomas, equipamiento y certificaciones de seguridad para que el viajero sepa quién llegará."
        },
        {
          heading: "La prueba gana reservas",
          content:
            "Biografías detalladas, muros de certificados, videos y precios transparentes determinan si el viajero confía lo suficiente como para reservar. Los proveedores fijan credenciales (NAATI, primeros auxilios, hospitalidad), suben reels cortos y adjuntan testimonios de pedidos previos."
        },
        {
          heading: "Paquetes, precios y upsells",
          content:
            "Puedes combinar 90 minutos de traducción con diligencias o dos horas de nightlife con transporte adicional. También se pueden sumar rentas de equipo, cargos express o perks VIP como edición de itinerarios. Escalas claras reducen la negociación y elevan la conversión."
        },
        {
          heading: "Automatización e IA",
          content:
            "Los proveedores VIP autoaceptan clientes de confianza, planifican rutas con IA y mantienen calendarios sincronizados para evitar dobles reservas. Los formularios de intake convierten las necesidades del viajero en propuestas profesionales listas para enviar."
        },
        {
          heading: "Bucles de reputación",
          content:
            "Badges, calificaciones, rachas de respuesta y sellos de \"última conexión\" ayudan a acumular capital de confianza. Los highlight reels combinan fotos, audio o citas para ofrecer prueba social que cualquier viajero puede revisar en segundos."
        },
        {
          heading: "Motor de negocio",
          content:
            "Pagos vía Stripe o bancos locales se procesan semanalmente, con boosts instantáneos tras verificaciones adicionales. Los tableros muestran tipos de pedidos líderes, tasa de clientes recurrentes, promedio de propinas y cancelaciones para optimizar ofertas o staffing."
        },
        {
          heading: "Hoja de ruta de crecimiento",
          content:
            "Se aproximan consultas en video, páginas de marketing plantilladas y campañas con oficinas de turismo. Los proveedores pueden postularse a experiencias co-brandeadas o colaboraciones retail para ampliar ingresos más allá de una sola reserva."
        }
      ]
    }
  ],
  fr: [
    {
      id: "local-skill-network",
      icon: "map",
      iconLabel: "Regards locaux",
      title: "Pourquoi les voyageurs ont plus que jamais besoin de réseaux d'experts locaux",
      date: "2024-12-12",
      summary:
        "De la piste aux pépites cachées, Guidew relie les voyageurs aux habitants pour combler la dernière ligne droite, exposer une expertise vérifiable et débloquer des expériences authentiques.",
      sections: [
        {
          heading: "La dernière ligne droite dans une ville inconnue",
          content:
            "Transports et hôtels sont réglés, mais les 72 premières heures dictent le ressenti du séjour. Guidew permet de convoquer des locaux pour l'aide linguistique, le décodage culturel et le soutien humain dès l'arrivée. Plutôt que de faire défiler des avis hors sujet, il suffit de choisir une mission—escorte aéroport, visite hospitalière, tour maker—et de recevoir en quelques minutes une liste courte de profils vérifiés."
        },
        {
          heading: "Des effets de réseau bilatéraux",
          content:
            "Les prestataires ajoutent diplômes, preuves et portfolios pour construire la confiance. Les utilisateurs laissent des avis, des pourboires et basculent vers l'abonnement VIP, ce qui incite davantage d'experts à rejoindre la plateforme. Chaque commande terminée alimente un graphe de qualité qui expose disponibilité, vitesse de réponse et tarification transparente au voyageur suivant."
        },
        {
          heading: "La force du duo IA + humains",
          content:
            "L'IA analyse les demandes, tague les intentions et orchestre le matching, mais la prestation s'exécute hors ligne par des personnes. Guidew garde la technologie en coulisse comme connecteur, tandis que les humains apportent empathie, improvisation et fluence culturelle."
        },
        {
          heading: "Ce que demandent réellement les voyageurs",
          content:
            "Les catégories phares couvrent concierge aéroport, traduction urgente pour cliniques, expériences sur mesure pour enfants et sessions pop-up avec des créateurs. Un brief type : \"Besoin d'un chauffeur bilingue pour récupérer mes parents, configurer les SIM et planifier une course supermarché.\" Nous taguons ces missions et proposons des packages modulaires comme services d'appoint, escorte culturelle ou nightlife VIP."
        },
        {
          heading: "Concevoir la confiance des experts locaux",
          content:
            "Les experts créent des fiches avec durée, prix et prérequis, puis joignent des preuves : certificats, vidéos d'intro, couvertures d'assurance et références communautaires. Guidew leur rappelle de rafraîchir leurs documents tous les 90 jours et récompense les taux d'acceptation stables via des paiements instantanés et un meilleur classement."
        },
        {
          heading: "Plan opérationnel par ville",
          content:
            "Chaque ville démarre avec au moins 30 prestataires fiables en traduction, concierge, expériences culturelles, bien-être et mobilité. Les partenaires locaux—écoles de langues, studios de danse, offices de tourisme—servent de hubs de vérification. Quand la densité dépasse trois experts par km² dans les centres, nous déverrouillons l'abonnement VIP et les réservations inter-villes."
        },
        {
          heading: "Nos prochaines destinations",
          content:
            "Le même playbook se déploie à Sydney, Singapour et Osaka. Nous livrons des formulaires d'intake IA multilingues, des couvertures d'assurance renforcées et des API pour compagnies aériennes, agences immobilières ou cabinets de relocation afin qu'un voyageur puisse atterrir partout en APAC et solliciter instantanément l'escouade Guidew la plus proche."
        }
      ]
    },
    {
      id: "vip-translation",
      icon: "language",
      iconLabel: "Fonctionnalités VIP",
      title: "Abonnement VIP Traduction : assistance instantanée multilingue",
      date: "2024-11-28",
      summary:
        "Les membres VIP peuvent appeler des traducteurs certifiés à toute heure pour des visites médicales, réunions ou tâches en profitant d'un intake IA, d'un routage concierge et de zéro commission—un seul abonnement remplace les groupes de messagerie improvisés.",
      sections: [
        {
          heading: "Pourquoi 9,9 $/mois change la donne",
          content:
            "Les VIP ne paient pas de frais par commande et décrivent leur besoin en une phrase ou via une photo du document. L'IA reformule le brief, souligne le jargon et recommande le traducteur, guide ou chauffeur bilingue adéquat en moins de 60 secondes."
        },
        {
          heading: "Priorité au matching",
          content:
            "Les requêtes apparaissent d'abord chez les prestataires les plus proches disposant des compétences, dossiers de conformité et disponibilités adéquats. Les commandes VIP empruntent une voie rapide avec rappels automatisés pour que les traducteurs acceptent sans rafraîchir l'application."
        },
        {
          heading: "Sécurité et conformité",
          content:
            "Tous les traducteurs passent des vérifications d'identité et de compétences, peuvent importer certificats et contrôles d'antécédents. Les clients entreprise exigent NDAs ou clauses de confidentialité comparables au HIPAA, automatiquement jointes à chaque mission VIP."
        },
        {
          heading: "Cas d'usage déclenchés par nos VIP",
          content:
            "Scénarios fréquents : admission hospitalière avec prise de notes en direct, visites d'investisseurs avec interprétation chuchotée, réunions parents-professeurs ou relectures de contrats de dernière minute. Le mode VIP mémorise dialecte, ton et secteur préféré pour réutiliser l'équipe idéale."
        },
        {
          heading: "Outils et exigences côté prestataires",
          content:
            "Les traducteurs synchronisent leurs calendriers Google ou Outlook, paramètrent les créneaux horaires et peuvent activer l'auto-acceptation pour les clients récurrents. Guidew rappelle de renouveler les certificats tous les six mois et propose des réponses suggérées par IA pour les situations sensibles comme les urgences médicales."
        },
        {
          heading: "Facturation et confidentialité",
          content:
            "Les justificatifs arrivent instantanément avec les codes nécessaires aux visas ou assurances. Chats, audios et documents signés restent chiffrés; les utilisateurs peuvent demander suppression ou export conformément à chaque juridiction."
        },
        {
          heading: "Feuille de route au-delà de la traduction",
          content:
            "À venir : clonage vocal temps réel, glossaires partagés pour équipes corporate et packages « traduction + mobilité » afin de réserver un trajet ou une démarche consulaire en même temps. L'offre VIP s'étendra aux services de relocation et d'accompagnement juridique."
        }
      ]
    },
    {
      id: "wellington-bachata",
      icon: "music",
      iconLabel: "Récit de communauté",
      title: "Trouver un coach de Bachata à Wellington en un clic",
      date: "2024-11-02",
      summary:
        "Une passionnée raconte comment elle a réservé une prof locale via Guidew et transformé son salon en studio pop-up, révélant comment le réseau gère matching, préparation de l'espace, paiements et suivi communautaire.",
      sections: [
        {
          heading: "Comment la demande a démarré",
          content:
            "Elle a écrit « Je voudrais un cours de Bachata ce week-end, idéalement à domicile », puis a précisé la surface du salon, son niveau et sa playlist préférée. En huit minutes, trois danseurs vérifiés sont apparus, avec des options comme apporter un miroir ou du matériel audio."
        },
        {
          heading: "Ce que montrent les prestataires",
          content:
            "Les coachs publient extraits vidéo, certificats, collectifs auxquels ils appartiennent et grilles tarifaires pour que les utilisateurs évaluent style et professionnalisme instantanément. Les agendas indiquent les soirées où ils couvrent Te Aro, Mount Cook ou les sessions en ligne, et les séries de réponse rassurent les nouveaux élèves."
        },
        {
          heading: "Magie hors ligne",
          content:
            "Le cours individuel enrichi de recommandations musicales locales s'est transformé en échange culturel. La coach a imaginé des échauffements inspirés des performances de rue de Wellington puis a conclu avec une playlist de DJ chiliens émergents."
        },
        {
          heading: "Coordination de la séance",
          content:
            "Guidew a partagé une checklist incluant sol, ventilation et voisinage. La coach a déposé un repère pour l'arrivée, utilisé la messagerie pour l'accès à l'ascenseur et enregistré un briefing sécurité couvrant hydratation et étirements."
        },
        {
          heading: "Tarifs, pourboires et options",
          content:
            "La base était de 95 NZD pour 90 minutes, avec un kit optionnel à 20 NZD comprenant enceintes et miroirs portables. Le paiement a été libéré automatiquement une fois la séance clôturée et l'utilisatrice a ajouté 15 % de pourboire pour remercier l'accompagnement bilingue."
        },
        {
          heading: "Impact pour les talents locaux",
          content:
            "Les danseurs considèrent Guidew comme une vitrine : ils listent des packs duo ou groupe, connectent Stripe pour des versements hebdo et débloquent des badges de ponctualité. Chaque réussite alimente un highlight reel qui les aide à vendre des chorégraphies pour événements ou mariages."
        },
        {
          heading: "Ondes communautaires",
          content:
            "Après le cours, l'utilisatrice a rejoint un fil Guidew où l'on partage soirées, location de costumes et recommandations de studios. La coach anime désormais un cours rooftop mensuel composé uniquement de demandes similaires issues de la plateforme."
        }
      ]
    },
    {
      id: "provider-branding",
      icon: "compass",
      iconLabel: "Manuel prestataire",
      title: "Comment les prestataires utilisent Guidew pour bâtir leur marque personnelle",
      date: "2024-10-15",
      summary:
        "Exposez preuves, certificats et portfolios audio/vidéo, activez l'auto-acceptation VIP et servez-vous des itinéraires IA pour maintenir une vitrine de confiance qui centralise paiements, analytics et recommandations.",
      sections: [
        {
          heading: "Concevoir sa vitrine numérique",
          content:
            "Chaque profil commence par un pitch : concierge bilingue, curateur culturel, accompagnant bien-être. Les prestataires choisissent une image, précisent rayon, langues, équipements et certifications de sécurité afin que les voyageurs sachent exactement qui arrive."
        },
        {
          heading: "La preuve déclenche la réservation",
          content:
            "Bio détaillée, murs de certificats, vidéos de service et prix transparents conditionnent la confiance. Les prestataires mettent en avant NAATI, premiers secours, expérience hôtelière, ajoutent de courts reels et des témoignages issus d'anciens mandats Guidew."
        },
        {
          heading: "Packages, tarifs et ventes additionnelles",
          content:
            "Combinez par exemple 90 minutes de traduction + commissions ou deux heures d'escorte nightlife avec transport inclus. Les options couvrent location d'équipement, frais d'urgence ou privilèges VIP comme l'édition d'itinéraires. Des paliers clairs réduisent la négociation et améliorent la conversion."
        },
        {
          heading: "Automatisation et IA",
          content:
            "Les VIP auto-acceptent leurs clients de confiance, planifient les trajets avec de l'IA et gardent calendriers Google/Outlook synchronisés pour éviter les doubles réservations. Les formulaires d'intake synthétisent automatiquement le besoin en une proposition prête à envoyer."
        },
        {
          heading: "Boucles de réputation",
          content:
            "Badges, notes, séries de réponse et mention \"vu récemment\" aident à accumuler du capital confiance. Les highlight reels assemblent photos, audio et citations pour offrir une preuve sociale que le prochain voyageur parcourt en quelques secondes."
        },
        {
          heading: "Moteur business",
          content:
            "Les virements Stripe ou bancaires partent chaque semaine, avec bonus d'instant payout après vérifications. Les tableaux de bord exposent principaux types de demandes, taux de récurrence, moyenne des pourboires et raisons d'annulation pour ajuster l'offre."
        },
        {
          heading: "Feuille de route de croissance",
          content:
            "À venir : consultations vidéo, pages marketing prêtes à l'emploi et campagnes avec offices de tourisme. Les prestataires pourront rejoindre des expériences co-brandées ou des collabs retail pour dépasser la logique d'une simple réservation."
        }
      ]
    }
  ],
  zh: [
    {
      id: "local-skill-network",
      icon: "map",
      iconLabel: "Local Insight",
      title: "为什么旅客比以往更需要本地技能网络",
      date: "2024-12-12",
      summary: "从机场落地到隐藏景点，Guidew 将旅客与可信赖的本地专家连接起来，补齐最后一公里，让真实体验成为城市标配。",
      sections: [
        {
          heading: "陌生城市的“最后一公里”",
          content:
            "传统旅行产品解决的是交通与住宿，但真正影响体验的是抵达后的 72 小时。Guidew 通过即时召唤本地专家，让旅客在语言、文化、交通上都能得到人性的帮助。不必在无关评论里反复筛选，只需选择一个“任务”——机场陪同、医院陪诊、创客工坊参观——系统就会在几分钟内推送已验证的服务者清单。"
        },
        {
          heading: "双边网络效应",
          content:
            "服务者上传证明、证书与作品，形成可信赖的供给。用户通过评价、VIP 订阅和小费机制，激励更多人加入生态。每次完成的订单都会更新质量图谱，让下一位旅客可以直观看到服务者的可预约时间、响应速度与价格区间。"
        },
        {
          heading: "AI + 人的组合",
          content:
            "AI 用于需求理解、意图标签与匹配，真正的服务仍由人在线下完成。Guidew 让技术退到幕后担任连接者，把同理心、即兴应对和文化翻译留给人类专家。"
        },
        {
          heading: "旅客真实的下单场景",
          content:
            "最常见的需求包括机场管家、就医陪同翻译、亲子策展体验、短时创作课堂等。典型文案是“需要双语司机接父母，顺便买 SIM 卡并采购生活用品”。我们为这些任务打上“差事、文化陪同、VIP 夜生活”等标签，再以模块化套餐呈现。"
        },
        {
          heading: "为服务者设计信任机制",
          content:
            "专家可以创建包含时长、价格、注意事项的服务卡片，并附上证明文件：资格证书、自我介绍视频、保险与社群推荐。Guidew 每 90 天提醒他们更新资料，并通过即时结算、排序加权奖励稳定接单表现。"
        },
        {
          heading: "城市运营蓝图",
          content:
            "每个城市至少要铺设 30 位在翻译、礼宾、文化体验、康养与交通领域可靠的服务者。我们与语言学校、舞蹈工作室、旅游局等本地伙伴合作完成认证。当 CBD 区域的供给密度达到每平方公里 3 名以上专家后，就会开放 VIP 订阅与跨城预订功能。"
        },
        {
          heading: "下一步拓展方向",
          content:
            "同样的打法将扩展到悉尼、新加坡和大阪。我们正在推出多语言 AI 取单表、进阶保险方案，以及面向航空公司、房产中介、搬迁机构的 API。未来旅客在亚太任意城市落地时，都能即时召唤最近的 Guidew 队伍完成“人类物流”。"
        }
      ]
    },
    {
      id: "vip-translation",
      icon: "language",
      iconLabel: "VIP Features",
      title: "VIP 翻译订阅：跨语言沟通的即时解决方案",
      date: "2024-11-28",
      summary: "VIP 用户可随时召唤专业翻译陪同就医、开会或办事，配套 AI 需求采集、礼宾式调度与免佣权益，一个会员取代零散的微信群与临时联系人。",
      sections: [
        {
          heading: "9.9 美元/月的价值",
          content: "VIP 用户在下单时免佣，可通过一句话或上传材料照片描述需求，AI 会自动润色要点、标注术语，并在 60 秒内推荐最合适的翻译、陪同或双语司机。"
        },
        {
          heading: "优先匹配机制",
          content: "系统根据服务者的里程半径、技能标签、合规记录与实时空闲情况排序。VIP 订单进入专属信道并自动发送提醒，翻译无需频繁刷新即可接单。"
        },
        {
          heading: "安全合规保障",
          content: "所有翻译服务者需通过身份与专业认证，可上传证书与背景调查结果。企业用户还能附加 NDA 或医疗隐私协议，每一笔 VIP 订单都会自动携带。"
        },
        {
          heading: "VIP 用户最常触发的场景",
          content:
            "典型流程包括医院陪诊与同步记录、投资考察耳语翻译、家长会陪同、临时合同查阅等。VIP 档案会保存口音偏好、沟通语气与行业背景，让后续任务可以直接复用熟悉的服务团队。"
        },
        {
          heading: "服务者的准入与工具",
          content:
            "翻译可同步 Google/Outlook 日历、设置小时档期，并为固定客户开启自动接单。Guidew 每 6 个月提醒更新资质，还提供 AI 回复模板，帮助在医疗等敏感情境下快速沟通。"
        },
        {
          heading: "计费、合规与隐私",
          content:
            "系统即时生成分类账单，满足签证或保险报销所需的费用科目。聊天记录、语音片段与签署文件都经过加密，用户可依照所在地区法规申请导出或删除。"
        },
        {
          heading: "超越翻译的路线图",
          content:
            "下一阶段将上线电话即时语音克隆、企业共享术语表以及“翻译 + 出行”组合服务，让同一位翻译支持预约交通或办理领事手续。VIP 将扩展到搬迁与法律陪同等更复杂的场景。"
        }
      ]
    },
    {
      id: "wellington-bachata",
      icon: "music",
      iconLabel: "Community Story",
      title: "在惠灵顿寻找 Bachata 老师，只需一键",
      date: "2024-11-02",
      summary: "真实案例分享：舞蹈爱好者如何通过 Guidew 找到本地老师，把客厅改造成快闪教室，并了解平台在匹配、空间准备、支付与社群运营上的细节。",
      sections: [
        {
          heading: "需求是如何发出的",
          content:
            "用户写下\"周末想学 Bachata，最好能上门\"，并补充了客厅面积、舞蹈基础与偏好音乐。8 分钟内就收到 3 位舞者的推荐，还能选择是否携带镜子或音响等加购服务。"
        },
        {
          heading: "服务者的门面",
          content:
            "舞者会上传教学短片、证书、所在舞团与收费标准，方便用户快速了解风格与专业度。行程表显示他们可覆盖 Te Aro、Mount Cook 以及线上课程，响应速度和准时徽章也公开展示。"
        },
        {
          heading: "线下体验的魅力",
          content:
            "一对一教学加上本地音乐推荐，让课程变成文化交流。老师安排灵感来自惠灵顿街头表演的热身动作，并精选智利 DJ 的播放列表串起整堂课。"
        },
        {
          heading: "课程协同与安全提示",
          content:
            "Guidew 提供空间检查清单，包括地板、通风与邻里沟通。老师提前在地图中标注抵达路线，通过站内信获取电梯权限，并在课程前完成拉伸与补水提示。"
        },
        {
          heading: "价格、小费与增值选项",
          content:
            "基础费用为 95 新西兰元/90 分钟，可加购 20 新西兰元的音响+便携镜组合。课程完成后系统自动结算，用户附赠 15% 小费并留言感谢老师的双语讲解。"
        },
        {
          heading: "对本地舞者的价值",
          content:
            "舞者把 Guidew 视为数字门店：能上架双人或小组套餐、绑定 Stripe 获取周结，并通过准时和高评分解锁徽章。成功案例会生成高光片段，帮助他们拓展婚礼或活动编舞订单。"
        },
        {
          heading: "社群的连锁效应",
          content:
            "课程结束后，用户被邀请加入 Guidew 舞蹈群，接收社交舞会、服装租借与练习室推荐。老师也开设了每月一次的 Rooftop 课程，学员几乎都来自类似的 Guidew 请求。"
        }
      ]
    },
    {
      id: "provider-branding",
      icon: "compass",
      iconLabel: "Provider Playbook",
      title: "服务者如何利用 Guidew 建立个人品牌",
      date: "2024-10-15",
      summary:
        "展示服务证明、证书、音视频作品，配自动接单、AI 行程规划与结算分析，将 Guidew 打造成集门店、客服与代理公司于一体的个人品牌基地。",
      sections: [
        {
          heading: "搭建数字门店",
          content:
            "从一句使命宣言开始：双语礼宾、文化策展、康养陪护……服务者可选择主图、可服务半径、语言能力、装备与安全认证，帮助旅客第一时间判断匹配度。"
        },
        {
          heading: "证明即转化率",
          content:
            "详细自我介绍、证书墙、服务短片与透明价格，是赢得信任的关键。服务者会固定展示翻译资格、急救证、酒店背景等证明，并嵌入过往订单的精选评价。"
        },
        {
          heading: "套餐与增值组合",
          content:
            "可以组合 90 分钟翻译 + 差事，或 2 小时夜生活陪同 + 交通加购等套餐。还可提供设备租赁、加急费或 VIP 限定权益，让价格层级更清晰、成交更顺畅。"
        },
        {
          heading: "AI 与自动化的力量",
          content:
            "VIP 服务者可为信任客户开启自动接单，使用 AI 规划路线，并与 Google/Outlook 同步日程杜绝撞单。AI 会把旅客需求压缩成专业提案，随时可发出。"
        },
        {
          heading: "口碑循环",
          content:
            "徽章、评分、响应速度连胜、最近在线时间等指标持续累积信任。高光集锦会把照片、音频或用户引用整合在一起，让下一位旅客数秒内感知真实体验。"
        },
        {
          heading: "业务引擎",
          content:
            "通过 Stripe 或本地银行周结，完成额外验证后还能触发即时结算。仪表盘展示热门需求类型、复购率、小费均值与取消原因，便于迭代产品或团队排班。"
        },
        {
          heading: "成长路线图",
          content:
            "即将上线的视频咨询、模板化营销页与目的地联合活动。服务者可报名与旅游局或零售品牌共创体验，把 Guidew 订单延伸到更多线下合作。"
        }
      ]
    }
  ],
  he: [
    {
      id: "local-skill-network",
      icon: "map",
      iconLabel: "תובנות מקומיות",
      title: "למה מטיילים צריכים רשתות מומחים מקומיים יותר מאי פעם",
      date: "2024-12-12",
      summary:
        "מהנחיתה ועד הפינות הנסתרות, Guidew מחברת מטיילים למומחים מקומיים, סוגרת את פער הקילומטר האחרון, מציגה מומחיות מאומתת ומייצרת חוויה אותנטית ובטוחה.",
      sections: [
        {
          heading: "הקילומטר האחרון בעיר זרה",
          content:
            "טיסות ומלונות נפתרים מראש, אבל 72 השעות הראשונות קובעות אם הנסיעה תרגיש בטוחה ויעילה. Guidew מאפשרת להזעיק בני אדם מקומיים לתרגום, ליווי תרבותי ולעזרה אנושית מיד כשנוחתים. במקום לדפדף בביקורות לא רלוונטיות, מגדירים משימה—הסעת שדה, ביקור בבית חולים, טיול יוצרנים—ומקבלים תוך דקות רשימה קצרה של אנשים מאומתים."
        },
        {
          heading: "אפקטי רשת דו-צדדיים",
          content:
            "ספקים מעלים תעודות, הוכחות ופורטפוליו כדי לצבור אמון. משתמשים משאירים חוות דעת, טיפים ומצטרפים ל-VIP, מה שיוצר תמריץ לעוד מומחים להצטרף. כל הזמנה שהושלמה מזינה גרף איכות שמציג זמינות, זמן תגובה ותמחור שקוף למטייל הבא."
        },
        {
          heading: "כוחם של AI + בני אדם",
          content:
            "ה-AI מנתח בקשות, מתייג כוונות ומציע התאמות, אך השירות עצמו קורה בין אנשים בעולם הפיזי. Guidew משאירה את הטכנולוגיה מאחורי הקלעים בתור המתווך, בזמן שהמומחים מביאים אמפתיה, אלתור ושטף תרבותי."
        },
        {
          heading: "מה מטיילים באמת מבקשים",
          content:
            "הקטגוריות המובילות כוללות קונסיירז' בשדה התעופה, תרגום דחוף למרפאות, חוויות לילדים וסשנים עם יוצרים מקומיים. בריף קלאסי: \"צריך נהג דו-לשוני שיאסוף את ההורים, יפתח כרטיסי SIM וידאג לקניות.\" אנחנו מתייגים את המשימות ומציעים חבילות מודולריות כמו סידורים, ליווי תרבותי או VIP nightlife."
        },
        {
          heading: "מעצבים אמון למומחים מקומיים",
          content:
            "המומחים בונים כרטיסי שירות עם משך, מחיר ודרישות, ומצרפים הוכחות: תעודות, סרטוני היכרות, ביטוחים והמלצות קהילה. Guidew מזכירה לרענן מסמכים כל 90 יום ומתגמלת שיעורי קבלה יציבים בעזרת תשלומים מיידיים ודירוג גבוה יותר."
        },
        {
          heading: "תוכנית פעולה עירונית",
          content:
            "כל עיר מתחילה עם לפחות 30 ספקים אמינים בתחומי תרגום, קונסיירז', חוויות תרבות, וולנס ותנועה. שותפים מקומיים—בתי ספר לשפות, סטודיואים למחול, לשכות תיירות—משמשים כתחנות אימות. כשהצפיפות מגיעה לשלושה מומחים לכל קמ\"ר במרכזים, נפתחים מנויי VIP והזמנות בין ערים."
        },
        {
          heading: "לאן אנחנו הולכים מכאן",
          content:
            "אותו פלייבוק מתגלגל לסידני, סינגפור ואוסקה. אנחנו משיקים טפסי intake רב-לשוניים, הרחבות ביטוח ו-API לשותפים כמו חברות תעופה, סוכנויות נדל\"ן וחברות Relocation כדי שכל מטייל ב-APAC יוכל לאתר מיד את צוות Guidew הקרוב."
        }
      ]
    },
    {
      id: "vip-translation",
      icon: "language",
      iconLabel: "יכולות VIP",
      title: "מנוי VIP לתרגום: תמיכה רב-לשונית מיידית",
      date: "2024-11-28",
      summary:
        "חברי VIP יכולים לקרוא למתרגמים מוסמכים לכל ביקור רפואי, פגישה או שליחות, להיעזר ב-AI לאיסוף הכוונה, ברוטינג קונסיירז' ולחסוך עמלות הזמנה—חברות אחת שמחליפה קבוצות וואטסאפ מאולתרות.",
      sections: [
        {
          heading: "למה 9.9 דולר לחודש משמעותיים",
          content:
            "משתמשי VIP מדלגים על עמלות: הם מתארים את הצורך במשפט אחד או מעלים תמונה של המסמך, וה-AI מנסח את הבריף מחדש, מדגיש מונחים ומציע מתרגם, מדריך או נהג דו-לשוני מתאים ב־60 שניות."
        },
        {
          heading: "התאמה בעדיפות",
          content:
            "הבקשות מוצגות תחילה לספקים המתאימים ביותר לפי קרבה, מיומנויות, רקורד ציות וזמינות עדכנית. הזמנות VIP מקבלות מסלול הפצה מהיר עם תזכורות אוטומטיות, כך שהמתרגמים לא צריכים לרענן את האפליקציה."
        },
        {
          heading: "בטיחות וציות",
          content:
            "כל המתרגמים עוברים אימות זהות והסמכה מקצועית ויכולים להעלות תעודות ובדיקות רקע. לקוחות ארגוניים מוסיפים NDA או הסכמי סודיות דמויי HIPAA שמצורפים אוטומטית להזמנה."
        },
        {
          heading: "שימושים שה-VIP מפעילים",
          content:
            "מסלולים שכיחים: קבלת מטופלים בבית חולים עם רישום מקביל, סיורי משקיעים עם פרשנות לחש, פגישות הורים-מורים ובדיקות חוזים ברגע האחרון. מצב VIP שומר העדפות—דיאלקט, טון, תחום—כדי שהמשימות הבאות יחוברו שוב לאותה נבחרת."
        },
        {
          heading: "דרישות וכלי עבודה לספקים",
          content:
            "מתרגמים מסנכרנים יומני Google/Outlook, מקצים בלוקים לפי שעה ויכולים להפעיל auto-accept ללקוחות חוזרים. Guidew מזכירה לחדש תעודות כל חצי שנה ומציעה טיוטות תשובה מבוססות AI למצבים רגישים כמו חירום רפואי."
        },
        {
          heading: "חיוב, תאימות ופרטיות",
          content:
            "קבלות מגיעות מיידית עם קטגוריות הוצאה לויזות או ביטוח. צ'אטים, אודיו ומסמכים חתומים מוצפנים, והמשתמשים יכולים לבקש מחיקה או יצוא לפי רגולציית המקום."
        },
        {
          heading: "מפת דרכים מעבר לתרגום",
          content:
            "בקרוב: שכפול קול לשיחות יוצאות, גלוסרי משותף לצוותים ארגוניים וחבילות \"תרגום + מוביליטי\" שבהן אותו מתרגם מזמין נסיעה או משלים הליך קונסולרי. מנויי VIP יורחבו גם לשירותי Relocation וקונסיירז' משפטי."
        }
      ]
    },
    {
      id: "wellington-bachata",
      icon: "music",
      iconLabel: "סיפור קהילה",
      title: "למצוא מאמן Bachata בוולינגטון בלחיצה אחת",
      date: "2024-11-02",
      summary:
        "חובבת ריקוד מספרת איך הזמינה מדריכה מקומית דרך Guidew והפכה את הסלון לסטודיו פופ-אפ, תוך חשיפת הדרך שבה הרשת מטפלת במאצ'ינג, בהכנת המרחב, בתשלומים ובחיי הקהילה.",
      sections: [
        {
          heading: "איך הבקשה התחילה",
          content:
            "היא כתבה \"מחפשת שיעור Bachata בסופ\"ש, עדיף בבית\" והוסיפה גודל סלון, ניסיון מוזיקלי ופלייליסט אהוב. בתוך שמונה דקות עלו שלוש רקדניות מאומתות עם אפשרויות כמו הבאת מראה או ציוד סאונד."
        },
        {
          heading: "מה נותני השירות מציגים",
          content:
            "הרקדניות מעלות קליפים מהשיעורים, תעודות, חברות בקבוצות ריקוד וטבלאות מחירים כדי שהמשתמשות יבינו מיד את הסגנון והמקצועיות. יומני הזמינות מראים באילו ערבים הן מגיעות ל-Te Aro, Mount Cook או מעבירות שיעור אונליין, וסדרות זמן התגובה מרגיעות לקוחות חדשים."
        },
        {
          heading: "הקסם של האופליין",
          content:
            "השיעור האישי יחד עם המלצות מוזיקה מקומיות הפכו למפגש תרבות. המאמנת שילבה חימום בהשראת הופעות רחוב בוולינגטון וסיימה עם פלייליסט של די.ג'ייז צ'יליאנים עולים."
        },
        {
          heading: "תיאום השיעור",
          content:
            "Guidew סיפקה צ'ק-ליסט של רצפה, אוורור ושכנים. המאמנת שלחה נקודת ציון להגעה, השתמשה בצ'אט כדי לפתוח את המעלית ותיעדה תדריך בטיחות מוקדם עם המלצות הידרציה ומתיחות."
        },
        {
          heading: "מחיר, טיפ ואקסטרות",
          content:
            "העלות הבסיסית הייתה ‎95‎‏ NZD ל־90 דקות, עם חבילת ציוד אופציונלית ב־20‏ NZD (רמקולים + מראות ניידות). התשלום שוחרר אוטומטית לאחר סימון השלמת השיעור, והמשתמשת הוסיפה טיפ של ‎15‎% על ההדרכה הדו-לשונית."
        },
        {
          heading: "הערך עבור הרקדניות",
          content:
            "הרקדניות מתייחסות ל-Guidew כאל חנות דיגיטלית: הן מציעות חבילות זוגיות או קבוצתיות, מחברות Stripe לשכר שבועי ומרוויחות תגי דיוק. שיעורים מוצלחים נכנסים ל-highlight reel שמסייע למכור כוריאוגרפיות לאירועים ולחתונות."
        },
        {
          heading: "אפקטים בקהילה",
          content:
            "אחרי השיעור הוזמנה הלקוחות לקבוצת Guidew עם לוחות אירועים, השכרת תלבושות והמלצות אולפנים. המאמנת מפעילה כיום שיעור Rooftop חודשי שמגיע כולו מבקשות דומות בפלטפורמה."
        }
      ]
    },
    {
      id: "provider-branding",
      icon: "compass",
      iconLabel: "מדריך לספקים",
      title: "איך ספקים בונים מותג אישי בעזרת Guidew",
      date: "2024-10-15",
      summary:
        "הציגו הוכחות, תעודות ועבודות אודיו/וידאו, הפעילו auto-accept ל-VIP ושענו על בריפים עם AI כדי להפוך את Guidew לחנות הדיגיטלית המאובטחת שמרכזת תשלומים, אנליטיקות והמלצות.",
      sections: [
        {
          heading: "מעצבים חזית דיגיטלית",
          content:
            "כל פרופיל נפתח במשפט מיקוד: קונסיירז' דו-לשוני, אוצר תרבות, מלווה וולנס. בוחרים תמונה מובילה, מגדירים רדיוס שירות, שפות, ציוד ותעודות בטיחות כדי שהמטייל יבין בדיוק מי יגיע."
        },
        {
          heading: "ההוכחה מביאה את ההזמנה",
          content:
            "ביוגרפיה מפורטת, קיר תעודות, סרטוני שירות ותמחור שקוף הם מפתח לאמון. ספקים מצמידים הסמכות כמו NAATI או הכשרה רפואית, מעלים Reel קצר ומשלבים ציטוטים מהזמנות קודמות."
        },
        {
          heading: "חבילות, תמחור ואפסלים",
          content:
            "אפשר לאגד 90 דקות תרגום + שליחויות או שעתיים nightlife עם תוספות תחבורה. תוספים כוללים השכרת ציוד, תעריף דחוף או פרקי VIP כמו עריכת מסלולים. מדרג ברור מפחית מו\"מ ומעלה אחוזי המרה."
        },
        {
          heading: "אוטומציה ו-AI",
          content:
            "ספקי VIP מפעילים auto-accept ללקוחות אמינים, מתכננים מסלולים עם AI ושומרים על יומנים מסונכרנים כדי להימנע מהתנגשויות. טפסי intake מתורגמים אוטומטית להצעות מקצועיות שמוכנות לשליחה."
        },
        {
          heading: "לולאות מוניטין",
          content:
            "תגים, דירוגים, רצף תגובה וחותמת \"נראה לאחרונה\" בונים הון אמון לאורך זמן. Highlight reels תופרים יחד תמונות, אודיו או ציטוטים כך שהמטייל הבא מזהה בתוך שניות את טיב החוויה."
        },
        {
          heading: "מנוע עסקי",
          content:
            "תשלומי Stripe או העברות בנקאיות יוצאים שבועית, עם שדרוג לתשלום מיידי לאחר השלמת אימותים. דשבורדים מציגים סוגי בקשות מובילות, שיעור חזרה, ממוצע טיפים וסיבות ביטול כדי לדייק את ההיצע."
        },
        {
          heading: "מפת צמיחה",
          content:
            "בדרך: ייעוצים בווידאו, דפי שיווק מובנים וקמפיינים משותפים עם לשכות תיירות. ספקים יכולים להירשם לשיתופי פעולה עם מותגים או קמעונאים ולהרחיב הכנסות מעבר להזמנה בודדת."
        }
      ]
    }
  ]
};

const resolveCollection = <T,>(collection: Partial<Record<SupportedLocale, T>>, language: string): T =>
  pickLocaleValue(collection, resolveLocale(language));

export const getCityProfiles = (language: string) => resolveCollection(cityProfiles, language);
export const getCareerOpenings = (language: string) => resolveCollection(careerOpenings, language);
export const getBlogPosts = (language: string) => resolveCollection(blogPosts, language);
