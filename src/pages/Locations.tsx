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
  },
  pt: {
    hero: {
      badge: "Cidades atendidas",
      title: "Corredores ativos: Auckland & Wellington",
      description:
        "A Guidew posiciona concierges bilíngues nos dois polos da Nova Zelândia para que chegadas, tarefas, imersões e cuidados fluam sem atrito.",
      support:
        "Em cada cidade você chama em minutos equipes de aeroporto, anfitriões de bairro, curadores culturais e guardiões para missões sensíveis."
    },
    stats: [
      { value: "Dezenas", label: "Bairros mapeados entre centros, portos e subúrbios" },
      { value: "Centenas", label: "Tags de habilidades aprovadas em tradução, artes, tarefas e educação" },
      { value: "Menos de 1h", label: "Janela típica para pedidos on-demand em cada corredor" },
      { value: "Até 7 dias", label: "Liberação de ganhos após reviews mútuos confirmarem o serviço" }
    ],
    citySpotlightsSection: {
      kicker: "Inteligência das cidades",
      heading: "O que cada corredor oferece",
      description: "Escolha um corredor e veja os pontos âncora e os serviços mais buscados pelos viajantes.",
      labels: {
        anchors: "Corredores centrais",
        experiences: "Serviços assinatura"
      }
    },
    citySpotlights: [
      {
        name: "Auckland",
        intro:
          "A principal porta de entrada do país equilibra aeroportos trans-Tasmânia, hubs tech e lifestyle à beira-mar. A Guidew atua do terminal até as galerias de Parnell.",
        anchors: [
          "AKL International ↔ CBD com lounges dedicados e vagas privadas",
          "North Shore e Takapuna para bem-estar costeiro, childcare e compras essenciais",
          "Parnell, Newmarket e Wynyard Quarter para compras, visitas a labs e reuniões com investidores"
        ],
        experiences: [
          "Concierge de aeroporto com bagagem, documentos fast-track e roteamento terrestre",
          "Interpretação em night markets, tours privados em galerias e aulas relâmpago de Bachata",
          "Acompanhamento médico e onboarding universitário em mandarim, inglês ou espanhol"
        ]
      },
      {
        name: "Wellington",
        intro:
          "A capital combina governo, arte e ventos costeiros. A Guidew mantém transfers, caminhadas culturais e suporte de produção sincronizados.",
        anchors: [
          "Aeroporto ↔ Te Aro ↔ parlamento com rotas ajustadas ao clima",
          "Waterfront e Oriental Bay para passeios criativos, festivais de cinema e museus noturnos",
          "Lower Hutt, Porirua e Johnsonville para famílias em relocação e diplomatas"
        ],
        experiences: [
          "Intérpretes para conferências, redatores de briefings e anfitriões bilíngues",
          "Trilhas do porto às colinas com concierge de equipamentos e imersão em cervejas artesanais, jazz e teatro",
          "Visitas hospitalares, idas ao veterinário e burocracias consulares conduzidas por guardiões certificados"
        ]
      }
    ],
    serviceLayers: {
      kicker: "Camadas de serviço",
      heading: "O que desbloqueamos em toda cidade",
      description:
        "Independente do bairro, entregamos apoio na chegada, tradução, imersão cultural e logística de cuidado para cada reserva parecer sob medida.",
      pillars: [
        {
          icon: "plane",
          title: "Chegadas & logística",
          detail: "Recepção em aeroportos, balsas e píeres com buffers de deslocamento calculados automaticamente."
        },
        {
          icon: "landmark",
          title: "Cultura & imersão",
          detail: "Curadores revelam bairros escondidos, mercados noturnos, galerias e artes performáticas."
        },
        {
          icon: "languages",
          title: "Tradução & negócios",
          detail: "Intérpretes presenciais apoiam compras, hospitais, vistos, tribunais e reuniões de investimento."
        },
        {
          icon: "wellness",
          title: "Cuidado & guarda",
          detail: "Acompanhamento médico, realocação familiar, planos de bem-estar e check-ins de segurança."
        }
      ]
    },
    roadmapHeading: "Roteiro de expansão",
    roadmap: [
      {
        title: "Fase 1 · MVP",
        detail: "Finalizar playbooks de Auckland + Wellington e embarcar a primeira onda de usuários."
      },
      {
        title: "Fase 2 · Densificação urbana",
        detail: "Adicionar lounges de chegada, novas tags verificadas e crescimento por indicação."
      },
      {
        title: "Fase 3 · Cobertura nacional",
        detail: "Replicar o modelo em toda a Nova Zelândia para turismo, educação e bem-estar."
      },
      {
        title: "Fase 4 · Salto trans-Tasmânia",
        detail: "Ativar Sydney, Melbourne e Brisbane enquanto ampliamos a base combinada."
      },
      {
        title: "Fase 5 · Horizonte global",
        detail: "Operar de forma multilíngue na Ásia-Pacífico, Europa e Américas."
      }
    ]
  },
  es: {
    hero: {
      badge: "Ciudades de servicio",
      title: "Corredores activos: Auckland y Wellington",
      description:
        "Guidew despliega conserjes bilingües en los dos grandes hubs de Nueva Zelanda para que las llegadas, los encargos, las inmersiones culturales y las visitas de bienestar fluyan sin fricción.",
      support:
        "Cada corredor combina recibimientos en aeropuertos, solucionadores de barrio, docentes culturales y figuras de guardianía que puedes convocar en minutos."
    },
    stats: [
      { value: "Decenas", label: "Barrios activos mapeados entre CBD, puertos y suburbios" },
      { value: "Cientos", label: "Etiquetas de habilidades aprobadas en traducción, artes, encargos, bienestar y educación" },
      { value: "Menos de una hora", label: "Ventana típica de despacho para solicitudes on-demand dentro de cada corredor" },
      { value: "Menos de una semana", label: "Liberación de pagos cuando las reseñas mutuas finalizan" }
    ],
    citySpotlightsSection: {
      kicker: "Inteligencia urbana",
      heading: "Lo que ofrece cada ciudad",
      description: "Elige un corredor para entender los anclajes que cubrimos y los servicios que más confían los viajeros.",
      labels: {
        anchors: "Corredores principales",
        experiences: "Servicios distintivos"
      }
    },
    citySpotlights: [
      {
        name: "Auckland",
        intro:
          "La ciudad puerta de entrada equilibra aeropuertos trans-Tasmán, puertos tecnológicos y vida junto al mar. Guidew se extiende desde la pista hasta las galerías de Parnell.",
        anchors: [
          "Recepciones AKL International ↔ CBD con lounges dedicados y estacionamiento privado",
          "Recorridos North Shore & Takapuna para wellness costero, childcare y compras esenciales",
          "Acompañamientos en Parnell, Newmarket y Wynyard Quarter para shopping, laboratorios y visitas de inversionistas"
        ],
        experiences: [
          "Conserje de aeropuerto con manejo de equipaje, documentos fast-track y coordinación de transporte terrestre",
          "Interpretación en night markets, tours privados por galerías y clases relámpago de Bachata",
          "Acompañamiento médico y onboarding universitario ofrecidos en mandarín, inglés o español"
        ]
      },
      {
        name: "Wellington",
        intro:
          "La capital enlaza gobierno, artes y vida costera con viento. Guidew mantiene sincronizados los traslados, los paseos culturales y el soporte de producción.",
        anchors: [
          "Aeropuerto de Wellington ↔ Te Aro ↔ distrito parlamentario con rutas sensibles al clima",
          "Waterfront y Oriental Bay para caminatas creativas, festivales de cine y noches de museo",
          "Lower Hutt, Porirua y Johnsonville para familias en reubicación y diplomáticos"
        ],
        experiences: [
          "Intérpretes de conferencias, redactores de briefings y anfitriones bilingües de sala",
          "Hikes del puerto a las colinas con concierge de equipo más inmersión en cerveza artesanal, jazz y teatro",
          "Visitas hospitalarias, idas al veterinario y trámites consulares gestionados por guardianes verificados"
        ]
      }
    ],
    serviceLayers: {
      kicker: "Capas de servicio",
      heading: "Lo que desbloqueas en cada ciudad",
      description:
        "Sin importar el distrito, Guidew estandariza soporte de llegada, traducción, inmersión cultural y logística de cuidado para que cada reserva se sienta hecha a medida.",
      pillars: [
        {
          icon: "plane",
          title: "Arribos y logística",
          detail: "Meet-and-greets en aeropuertos, terminales de ferry y muelles de crucero con buffers de tiempo incluidos."
        },
        {
          icon: "landmark",
          title: "Cultura e inmersión",
          detail: "Docentes y creativos curan barrios ocultos, night markets, galerías y artes escénicas."
        },
        {
          icon: "languages",
          title: "Traducción y negocios",
          detail: "Intérpretes presenciales cubren compras, hospitales, oficinas de visa, juzgados y reuniones con inversionistas."
        },
        {
          icon: "wellness",
          title: "Cuidado y guardianía",
          detail: "Acompañamiento médico, asistencia en reubicaciones familiares, planes de bienestar y check-ins de seguridad en todos los suburbios."
        }
      ]
    },
    roadmapHeading: "Hoja de ruta de expansión",
    roadmap: [
      {
        title: "Fase 1 · MVP runway",
        detail: "Finalizar los playbooks de Auckland + Wellington e incorporar la primera ola de viajeros y anfitriones."
      },
      {
        title: "Fase 2 · Escala urbana",
        detail: "Densificar ambas ciudades con más lounges de llegada, etiquetas verificadas y crecimiento boca a boca."
      },
      {
        title: "Fase 3 · Elevación nacional",
        detail: "Extender el modelo en toda Nueva Zelanda para turismo, educación, bienestar y escenarios ejecutivos."
      },
      {
        title: "Fase 4 · Salto trans-Tasmán",
        detail: "Lanzar corredores en Sydney, Melbourne y Brisbane mientras consolida la base combinada."
      },
      {
        title: "Fase 5 · Horizonte global",
        detail: "Operar de forma multilingüe en Asia-Pacífico, Europa y las Américas."
      }
    ]
  },
  fr: {
    hero: {
      badge: "Villes desservies",
      title: "Corridors actifs : Auckland & Wellington",
      description:
        "Guidew déploie des concierges bilingues dans les deux grands hubs néo‑zélandais afin que arrivées, missions, immersions culturelles et rendez-vous bien-être se déroulent sans friction.",
      support:
        "Chaque corridor combine accueil aéroport, fixers de quartier, médiateurs culturels et rôles de garde rapprochée que l’on peut solliciter en quelques minutes."
    },
    stats: [
      { value: "Des dizaines", label: "Quartiers actifs cartographiés entre CBD, ports et banlieues" },
      { value: "Des centaines", label: "Tags de compétences validés : traduction, arts, errands, bien-être, éducation" },
      { value: "Moins d’1 h", label: "Fenêtre moyenne d’envoi pour les demandes on‑demand dans chaque corridor" },
      { value: "Moins d’une semaine", label: "Libération des paiements une fois les avis croisés publiés" }
    ],
    citySpotlightsSection: {
      kicker: "Intelligence urbaine",
      heading: "Ce que débloque chaque ville",
      description: "Choisissez un corridor pour comprendre les ancrages couverts et les services les plus sollicités.",
      labels: {
        anchors: "Corridors clés",
        experiences: "Services signature"
      }
    },
    citySpotlights: [
      {
        name: "Auckland",
        intro:
          "La porte d’entrée du pays équilibre aéroports trans-Tasman, ports tech et lifestyle côtier. Guidew s’étend de la piste aux galeries de Parnell.",
        anchors: [
          "AKL International ↔ CBD : salons d’arrivée dédiés et stationnements privés",
          "North Shore & Takapuna pour bien-être balnéaire, garde d’enfants et courses essentielles",
          "Parnell, Newmarket, Wynyard Quarter pour shopping, visites de labos et rencontres investisseurs"
        ],
        experiences: [
          "Conciergerie aéroport avec gestion bagages, documents fast-track et coordination du transport terrestre",
          "Interprétation sur les night markets, visites privées de galeries et sessions pop-up de Bachata",
          "Accompagnement médical et onboarding universitaire en mandarin, anglais ou espagnol"
        ]
      },
      {
        name: "Wellington",
        intro:
          "La capitale relie gouvernement, arts et rivage venteux. Guidew synchronise transferts, balades culturelles et support de production.",
        anchors: [
          "Aéroport de Wellington ↔ Te Aro ↔ quartier parlementaire avec itinéraires sensibles à la météo",
          "Promenades waterfront & Oriental Bay pour marches créatives, festivals de cinéma et nocturnes muséales",
          "Support à Lower Hutt, Porirua et Johnsonville pour familles relocalisées et diplomates"
        ],
        experiences: [
          "Interprètes de conférence, rédacteurs de briefings et hôtes bilingues de boardrooms",
          "Randonnées du port aux collines avec concierge matériel + immersion craft beer, jazz et théâtre",
          "Visites hospitalières, trajets vétérinaire et paperasse consulaire gérés par des gardiens vérifiés"
        ]
      }
    ],
    serviceLayers: {
      kicker: "Couches de service",
      heading: "Ce que chaque voyageur débloque",
      description:
        "Peu importe le district, Guidew standardise accueil, traduction, immersion culturelle et logistique de care afin que chaque mission paraisse sur mesure.",
      pillars: [
        {
          icon: "plane",
          title: "Arrivées & logistique",
          detail: "Meet-and-greet aux aéroports, ferries et quais de croisière avec marges de trajet intégrées."
        },
        {
          icon: "landmark",
          title: "Culture & immersion",
          detail: "Docents et créatifs révèlent quartiers cachés, marchés nocturnes, galeries et scènes vivantes."
        },
        {
          icon: "languages",
          title: "Traduction & affaires",
          detail: "Interprètes sur place pour shopping, hôpitaux, visas, tribunaux et rendez-vous investisseurs."
        },
        {
          icon: "wellness",
          title: "Care & guardianship",
          detail: "Escort médical, aide à la relocalisation familiale, planners bien-être et check-ins de sécurité."
        }
      ]
    },
    roadmapHeading: "Feuille de route d’expansion",
    roadmap: [
      {
        title: "Phase 1 · Runway MVP",
        detail: "Finaliser les playbooks Auckland + Wellington et embarquer la première vague d’utilisateurs."
      },
      {
        title: "Phase 2 · Montée en densité",
        detail: "Ajouter des lounges d’arrivée, plus de tags vérifiés et accélérer la croissance bouche-à-oreille."
      },
      {
        title: "Phase 3 · Portée nationale",
        detail: "Étendre le modèle à toute la Nouvelle-Zélande pour tourisme, éducation, bien-être et exécutifs."
      },
      {
        title: "Phase 4 · Saut trans-Tasman",
        detail: "Lancer des corridors à Sydney, Melbourne et Brisbane tout en consolidant la base combinée."
      },
      {
        title: "Phase 5 · Horizons globaux",
      detail: "Déployer des opérations multilingues en Asie-Pacifique, Europe et Amériques."
      }
    ]
  },
  he: {
    hero: {
      badge: "ערי שירות",
      title: "מסלולי השירות: אוקלנד וולינגטון",
      description:
        "Guidew מפעילה קונסיירז' דו-לשוניים בשני מרכזי העל של ניו זילנד כדי שהגעה, שליחויות, טיולי עומק וביקורי רווחה יהיו נטולי תקלות.",
      support:
        "בכל עיר משולבים קבלת פנים בשדה התעופה, מומחי שכונות, מדריכי תרבות ותפקידי השגחה משפחתיים שאפשר לזמן בתוך דקות."
    },
    stats: [
      { value: "עשרות", label: "שכונות פעילות שמחברות בין ה-CBD, הנמלים והפרברים" },
      { value: "מאות", label: "תגיות מיומנות מאושרות בתחומי תרגום, אמנות, שליחויות, בריאות וחינוך" },
      { value: "פחות משעה", label: "חלון היציאה הממוצע לבקשות מיידיות בכל מסדרון" },
      { value: "עד שבוע", label: "שחרור תשלומים לאחר ששני הצדדים מסיימים חוות דעת" }
    ],
    citySpotlightsSection: {
      kicker: "מודיעין עירוני",
      heading: "מה כל עיר מאפשרת",
      description: "בחרו במסדרון כדי לראות אילו עוגנים מכוסים ואילו שירותים מבוקשים ביותר.",
      labels: {
        anchors: "מסדרונות ליבה",
        experiences: "שירותי חתימה"
      }
    },
    citySpotlights: [
      {
        name: "Auckland",
        intro:
          "עיר הכניסה של ניו זילנד מאזנת בין שדות תעופה טרנס-טסמנים, נמלים טכנולוגיים ואורח חיים על קו המים. Guidew נמתחת מהמסלול ועד גלריות פארנל.",
        anchors: [
          "AKL International ↔ ה-CBD עם לונג'ים פרטיים וחניות ייעודיות לפגישות",
          "נסיעות ל-North Shore ו-Takapuna עבור רווחה חופית, בייביסיטר וסידורי קניות",
          "Parnell, Newmarket ו-Wynyard Quarter לליווי קניות, מעבדות וביקורי משקיעים"
        ],
        experiences: [
          "קונסיירז' בשדה עם טיפול במזוודות, fast-track במסמכים ותכנון הסעות קרקע",
          "תרגום בשווקי לילה, סיורי גלריה פרטיים ושיעורי Bachata לאורחים",
          "ליווי רפואי והכוונת סטודנטים באנגלית, מנדרינית או ספרדית"
        ]
      },
      {
        name: "Wellington",
        intro:
          "הבירה מחברת ממשל, אמנות וחיים רועשי רוח. Guidew מחזיקה את ההסעות, טיולי התרבות ותמיכת ההפקה מחוברים.",
        anchors: [
          "שדה התעופה של ולינגטון ↔ Te Aro ↔ רובע הפרלמנט עם מסלולים מותאמי מזג אוויר",
          "הטיילת ו-Oriental Bay לטיולי יצירה, פסטיבלי קולנוע ונשפי מוזיאון",
          "Lower Hutt, Porirua ו-Johnsonville למשפחות ברילוקיישן ודיפלומטים"
        ],
        experiences: [
          "מתורגמני כנסים, כותבי בריפים ומארחי חדרי ישיבות דו-לשוניים",
          "טיולי נמל-אל-ההר עם קונסיירז' ציוד יחד עם בירה, ג'אז ותיאטרון",
          "ביקורים בבתי חולים, משלוחים וטרינריים וניירת שגרירות שמנוהלים ע\"י צוותים מאומתים"
        ]
      }
    ],
    serviceLayers: {
      kicker: "שכבות שירות",
      heading: "מה כל מבקר מקבל בכל עיר",
      description:
        "לא משנה באיזה רובע אתם נמצאים, Guidew מיישרת קו סביב תמיכה בהגעה, תרגום, חוויית עומק תרבותית ולוגיסטיקה של רווחה כדי שכל הזמנה תרגיש מותאמת.",
      pillars: [
        {
          icon: "plane",
          title: "הגעה ולוגיסטיקה",
          detail: "קבלת פנים בשדות תעופה, מעגני מעבורת ונמלי קרוז עם מרווחי זמן לנסיעה."
        },
        {
          icon: "landmark",
          title: "תרבות וחוויה",
          detail: "מדריכים ואמנים חושפים שכונות נסתרות, שווקי לילה, גלריות ומופעים."
        },
        {
          icon: "languages",
          title: "תרגום ועסקים",
          detail: "מתורגמנים בשטח לקניות, בתי חולים, משרדי ויזה, בתי משפט ופגישות משקיעים."
        },
        {
          icon: "wellness",
          title: "רווחה והשגחה",
          detail: "מלווים רפואיים, סיוע לרילוקיישן משפחתי, מתכנני wellness ובדיקות בטיחות."
        }
      ]
    },
    roadmapHeading: "מפת דרכים להתרחבות השירות",
    roadmap: [
      {
        title: "שלב 1 · מסלול MVP",
        detail: "ללטש את ספרי המסדרונות באוקלנד + ולינגטון ולהצטרף עם גל המשתמשים הראשון."
      },
      {
        title: "שלב 2 · בניית צפיפות",
        detail: "להוסיף לונג'ים לקבלת פנים, עוד תגי מיומנות מאומתים ולהאיץ צמיחת word-of-mouth."
      },
      {
        title: "שלב 3 · פריסה לאומית",
        detail: "להחיל את המודל על כל ניו זילנד עבור תיירות, חינוך, בריאות והנהלות."
      },
      {
        title: "שלב 4 · גשר טרנס-טסמני",
        detail: "לפתוח מסדרונות בסידני, מלבורן ובריסביין תוך ביסוס התשתית המאוחדת."
      },
      {
        title: "שלב 5 · אופק גלובלי",
        detail: "להפעיל מרכזים רב-לשוניים באסיה-פסיפיק, אירופה ואמריקות."
      }
    ]
  },

  mi: {
    hero: {
      badge: "Nga taone nui",
      title: "Ko nga Kaiwhakahaere Ratonga: Auckland & Wellington",
      description:
        "Ko te kaiarahi i nga kairangahau reorua puta noa i nga wahanga o nga mahanga o Aotearoa, na, he haerenga, he haerenga rumaki, me nga haerenga pai.",
      support:
        "Ko nga taone katoa e whakakotahi ana i te taunga rererangi-a-a-mihi, nga kaiwhakataetae takiwa, nga mahi ahurea, me nga mahi a te kaitiaki ka taea e koe te karanga i roto i nga meneti."
    },
    stats: [
      { value: "Keretera", label: "Ko nga kaainga kaha e karapoti ana i waenga i nga CBD, nga whanga, me nga taone nui" },
      { value: "Rau", label: "Ko nga tohu pukenga e whakaaetia ana puta noa i te whakamaoritanga, nga mahi toi, nga mahi, te oranga, me te maatauranga" },
      { value: "I raro i te haora", label: "Matapihi Whakawhitiwhiti mo nga tono tono i roto i nga tono i roto i ia ara" },
      { value: "I roto i te wiki", label: "Tukunga Utu i muri i te Whakauru i nga Arotake Mutual mo te Ratonga Kua oti" }
    ],
    citySpotlightsSection: {
      kicker: "Te mohio o te taone",
      heading: "He aha ia taone nui",
      description: "Whiriwhiria te kowhatu kia mohio ai matou ki nga punga e kapi ana e matou, a ko nga momo ratonga ratonga e whakawhirinaki ana ki te nuinga.",
      labels: {
        anchors: "Nga Kaitohu Motuhake",
        experiences: "Nga Ratonga Waitohu"
      }
    },
    citySpotlights: [
      {
        name: "Akarana",
        intro:
          "Ko te taone o Gateway o Niu Tireni e aukati ana i nga taunga rererangi o te Tran-Tasman, nga whanga hangarau, me nga koiora o te wai. Ko te kaiarahi i te huarahi ki te ara ki nga papa o Parnell.",
        anchors: [
          "AKL International ↔ Ka tutaki a CBD-me-te mihi na te taenga mai me te waka rererangi motuhake",
          "Kei te rere a Te Tai Tokerau a Takapuna mo te oranga o te takutai, te tiaki tamariki, me nga mahi kai",
          "Parnell, Newmarketket, me Wynyard Quarters Collesters mo te hokohoko, Labs, me nga haerenga moni"
        ],
        experiences: [
          "Ko te whakahoahoa rererangi me nga putea putea, nga tuhinga tere-tere, me te whakahaere waka",
          "Ko te whakamaoritanga o te po-te po, haerenga motuhake, me nga akoranga pop-a-bactata mo nga manuhiri",
          "Ko te Kaihauturu Hauora me te Whare Wananga i tukuna i Mandarin, Ingarihi, Pāniora ranei"
        ]
      },
      {
        name: "Te Whanganui-a-Tara",
        intro:
          "Ko te whakapaipai a te kawanatanga, nga mahi toi, me te hau-a-roto o te takutai o te takutai. Ka mau tonu te kaiarahi, te haereere ahurea, me te tautoko whakaputa i piri tahi.",
        anchors: [
          "Wellington Rerertport ↔ Te Aro ↔ Te Aro ↔ Te Aro quronementary Whakawhitiwhiti Whakawhitiwhiti mo te Haahi-Maarama",
          "Ko te Perfront me te Orintal Bay Prosnades mo nga Walks auaha, hararei kiriata, me nga po taonga",
          "Ko te Hutt Lower, Porirua, me te tautoko a Johnsonville mo nga whanau me nga tohu"
        ],
        experiences: [
          "Nga kaiwhakamaori o te Hui, he kaituhi tuhipoka, me nga rangatira o te poari reorua",
          "Ko te Harbour-ki-Hill Hights me te Cractiverge Gral Plus Craft-Beer, Jazz, me te rumaki whare tapere",
          "Ko nga haerenga a nga hohipera, ka rere te kararehe, me te pepa pepaputanga i tukuna e nga kaitiaki"
        ]
      }
    ],
    serviceLayers: {
      kicker: "Papamahi Ratonga",
      heading: "He aha te hunga e haereere ana i nga taone katoa",
      description:
        "Ahakoa ko te rohe, ko te kaiarahi te tautoko i te taenga mai, te whakamaoritanga, te whakamahere i te ahurea, me nga tohu tiaki kia pai ai ia pukapuka.",
      pillars: [
        {
          icon: "plane",
          title: "Te taenga mai me te takiuru",
          detail: "Ka hui-hutia koe i te taunga rererangi, ngā tauranga rerenga, me ngā whakawhitinga poti kia pai ai tō taenga."
        },
        {
          icon: "landmark",
          title: "Te ahurea me te rumaki",
          detail: "Ka arahi ngā kaitautoko ki ngā kāinga toi, ngā maakete pō, me ngā ara whakaari piri tata."
        },
        {
          icon: "languages",
          title: "Translation & Pakihi",
          detail: "Ka hipoki ngā kaiwhakamaori i te hokohoko, ngā hohipera, ngā tari visa, ngā kooti, me ngā hui kaihoko."
        },
        {
          icon: "wellness",
          title: "Te tiaki me te kaitiaki",
          detail: "Ko ngā kaimahi hauora, ngā kaitautoko whānau, me ngā kaiwhakatere haumaru e tiaki ana i ngā haerenga tuawhenua."
        }
      ]
    },
    roadmapHeading: "Ratonga Whakawhanake Ratonga",
    roadmap: [
      {
        title: "Wāhanga 1 · MVP Runway",
        detail: "Whakamutua te Cordirods Pukapuka i Akarana + Te Whanganui-a-Tara me te tihi o te hunga haereere me nga mano."
      },
      {
        title: "Wāhanga 2 · Tauiwi-taone nui",
        detail: "E kii ana i nga taone e rua kia nui ake ai nga tau, nga tohu pukenga kua whakaū, me te kotahitanga o te tipu-o te reo."
      },
      {
        title: "Wāhanga 3 · Aratia te motu",
        detail: "Whakanuia te tauira puta noa i a Aotearoa, e kapi ana i te tuuruhi, te maatauranga, te oranga, me nga ahuatanga whakahaere."
      },
      {
        title: "Wāhanga 4 · Trans-Tasman Leap",
        detail: "Tuwhera Poihākena, Melbourne, me nga Kamupene Brisbane i te wa e whakauru ana i te turanga kaiwhakamahi whakakotahi."
      },
      {
        title: "Wā 5 · Nga pae o te ao",
        detail: "Ko te tuku i nga mahi maha puta noa i Ahia-Moananui a Kiwa, ko Europe, me nga Amerika."
      }
    ]
  },} as const;

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
  const localeKey =
    locale === "zh" || locale === "pt" || locale === "es" || locale === "fr" || locale === "he" || locale === "mi" ? locale : "en";
  const content = copy[localeKey];

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
