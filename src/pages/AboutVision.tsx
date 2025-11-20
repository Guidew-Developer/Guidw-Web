import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lightbulb, ShieldCheck, BarChart3, Users2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const visionCopy = {
  en: {
    hero: {
      badge: "Guidew Vision",
      title: "A living guild of locals for every journey",
      description:
        "Guidew imagines a future where every city greets you with trusted locals, AI copilots, and rituals that make offline moments feel cinematic yet safe."
    },
    manifesto: ["Local guilds deserve world-class tooling.", "Every corridor must create cultural and economic returns for its hosts.", "Automation is valuable only when it amplifies human care."],
    pillars: {
      title: "North-star principles",
      subtitle: "Three commitments keep Guidew bold while preserving trust.",
      description: "We build credible, human-scale experiences first, then layer automation and growth only where it enhances care.",
      items: [
        {
          title: "Human-first intelligence",
          description: "Context-aware AI surfaces the right locals, while curators protect nuance, boundaries, and cultural codes."
        },
        {
          title: "Borderless craft economy",
          description: "Talented residents turn hidden skills into signature offerings with transparent briefs and elevated storytelling."
        },
        {
          title: "Calm safety net",
          description: "Identity, insurance, and dispute rituals run quietly in the background so travelers only feel calm momentum."
        }
      ]
    },
    experiences: {
      title: "Experience architecture",
      subtitle: "Each booking flows through a multi-layer stack that blends art, logistics, and emotional care.",
      items: [
        {
          label: "Strand Alpha",
          title: "Discovery rituals",
          description: "Tasteful questionnaires, vibe boards, and micro-video intros reveal what the traveler truly seeks."
        },
        {
          label: "Strand Lumen",
          title: "Co-created planning",
          description: "Providers and AI-copilots co-design itineraries that mix logistics with neighborhood-only secrets."
        },
        {
          label: "Strand Pulse",
          title: "Live-session command",
          description: "Real-time translation, safety beacons, and local SOS systems surround every meet-up."
        },
        {
          label: "Strand Echo",
          title: "Afterglow & loyalty",
          description: "Story recaps, gratitude pools, and collectible badges feed the Guidew graph for future journeys."
        }
      ],
      highlight: {
        title: "Signature concierge runway",
        text: "A dedicated Guidew squad orchestrates high-touch journeys for ambassadors, artists, and executives.",
        bullets: [
          "Pair humans and AI to brief every provider before the traveler even lands.",
          "Unlock local “backstage passes” via civic, cultural, and sports collaborators.",
          "Surface community data to prove sustainability and equitable payouts."
        ]
      }
    },
    labs: {
      title: "Innovation ateliers",
      subtitle: "Four labs accelerate Guidew's future corridors.",
      cards: [
        {
          name: "Atlas Studio",
          focus: "City intelligence",
          copy: "Combines satellite data, cultural calendars, and resident councils to pick the next Guidew neighborhoods."
        },
        {
          name: "Pulse Lab",
          focus: "Safety telemetry",
          copy: "Builds multilingual safety chatbots, biometric opt-ins, and weather-aware routing for live sessions."
        },
        {
          name: "Embers Residency",
          focus: "Culture co-creation",
          copy: "Commissions artists, healers, and coaches to co-design rituals that travelers replay long after the trip."
        },
        {
          name: "Guildworks",
          focus: "Provider prosperity",
          copy: "Tests pricing ladders, instant payout rails, and achievement quests that lift hosts into full-time creators."
        }
      ]
    },
    trust: {
      title: "Trust choreography",
      subtitle: "Safety becomes an ongoing conversation with locals, travelers, and city partners.",
      items: [
        { icon: ShieldCheck, title: "Proof of character", text: "Layered verification mixes identity, craft credentials, and peer endorsements tuned to each experience." },
        { icon: Users2, title: "Reciprocal rituals", text: "Two-way reviews publish only after both voices align, with badges celebrating consistency and care." },
        { icon: BarChart3, title: "Living policy studio", text: "Risk analysts and mediators watch signals in real time, adjusting playbooks before an issue escalates." }
      ]
    },
    arcs: {
      title: "Momentum arcs",
      subtitle: "Guidew expands like a constellation—one radiant city activates the next.",
      steps: [
        {
          name: "Aurora launchpads",
          headline: "Deep roots in Aotearoa",
          copy: "Begin inside neighborhoods that celebrate craftsmanship, perfecting the duet between AI orchestration and human warmth."
        },
        {
          name: "Coastal bridges",
          headline: "Tasman to Pacific icons",
          copy: "Link creative capitals across Australia and Asia-Pacific, building bilingual strike teams who mentor the next wave of hosts."
        },
        {
          name: "Continental alliances",
          headline: "Europe, Middle East, Africa",
          copy: "Partner with cultural districts and festivals so Guidew becomes the backstage pass for globe-trotting creators."
        },
        {
          name: "Planetary residency",
          headline: "Americas and beyond",
          copy: "Anchor Guidew teams in every hemisphere, sharing playbooks so locals everywhere can turn skill into hospitality."
        }
      ],
      closing: "The finale is simple: any traveler, in any city, taps Guidew and instantly meets the right human."
    },
    leadership: {
      title: "Leadership covenants",
      subtitle: "Every Guidew leader signs onto these promises before launching a corridor.",
      statements: [
        { heading: "Care before scale", body: "We pause launches if we cannot guarantee bilingual care crews, wellness coverage, and dispute response." },
        { heading: "Open hand economics", body: "We publish payout splits, community reinvestment, and impact reports so locals see real value." },
        { heading: "Shared authorship", body: "City partners, iwi leaders, and independents co-own the playbooks—no copy-paste rollouts without consent." }
      ]
    }
  },
  zh: {
    hero: {
      badge: "Guidew Vision",
      title: "让全球旅程都能召唤活力本地行会",
      description: "Guidew 期望每座城市都能以可信赖的本地专家、AI 副驾与仪式化服务，带来既有戏剧张力又足够安全的线下体验。"
    },
    manifesto: ["本地行会需要世界级工具。", "每条走廊都要为在地社群创造文化与经济回报。", "自动化的价值在于放大人情味。"],
    pillars: {
      title: "北极星原则",
      subtitle: "三项承诺让 Guidew 在胆识与信任之间保持平衡。",
      description: "我们先确保体验可信、有人味，再在必要处叠加自动化与增量引擎。",
      items: [
        {
          title: "人本智能优先",
          description: "情境化 AI 负责呈现合适的本地人选，策划团队守护文化细节与界限。"
        },
        {
          title: "跨境匠人经济",
          description: "天赋居民可以把隐藏技能包装成招牌体验，透过透明的简报与叙事被世界看见。"
        },
        {
          title: "静谧安全网",
          description: "身份、保障与争议流程都在后台无声运转，让旅客只感受到稳定向前的动力。"
        }
      ]
    },
    experiences: {
      title: "体验架构",
      subtitle: "每一次下单都会通过多层服务栈，兼顾艺术性、执行力与情绪照护。",
      items: [
        {
          label: "序章",
          title: "发现仪式",
          description: "审美问答、情绪版、短视频自我介绍，帮助我们理解旅客真正的期待。"
        },
        {
          label: "光带",
          title: "共创规划",
          description: "服务者与 AI 副驾一起描绘行程，把后巷秘境与严谨排程融合。"
        },
        {
          label: "心跳",
          title: "现场指挥",
          description: "实时翻译、安全信标与本地 SOS 系统为每次线下遇见护航。"
        },
        {
          label: "余响",
          title: "回声与忠诚",
          description: "故事回顾、感谢池与收藏徽章，为下一次旅程累积社群记忆。"
        }
      ],
      highlight: {
        title: "礼宾级跑道",
        text: "专属 Guidew 团队负责高端旅程，为品牌大使、艺术家与高管量身打造体验。",
        bullets: [
          "由人工与 AI 共同完成前置简报，在旅客抵达前同步上下文。",
          "与城市、文化、体育伙伴协作，解锁独家的“后台通行证”。",
          "公开社区影响数据，兼顾可持续性与公平收益。"
        ]
      }
    },
    labs: {
      title: "创新工坊",
      subtitle: "四个实验室驱动 Guidew 未来的走廊。",
      cards: [
        {
          name: "Atlas Studio",
          focus: "城市情报",
          copy: "汇聚卫星数据、文化日历与居民议会，挑选下一批 Guidew 街区。"
        },
        {
          name: "Pulse Lab",
          focus: "安全遥测",
          copy: "研发多语言安全助手、生物识别自愿机制与天气感知路由。"
        },
        {
          name: "Embers Residency",
          focus: "文化共创",
          copy: "与艺术家、疗愈师、教练共创仪式化体验，让旅客回味无穷。"
        },
        {
          name: "Guildworks",
          focus: "服务者成长",
          copy: "测试分层定价、即时结算与成就任务，帮助服务者转型为全职创作者。"
        }
      ]
    },
    trust: {
      title: "信任编排",
      subtitle: "安全不仅是实名认证，更是与本地人、旅客与城市伙伴持续对话。",
      items: [
        { icon: ShieldCheck, title: "品格证明", text: "多层级验证结合身份、专业证书与同侪背书，按体验类型灵活调节。" },
        { icon: Users2, title: "互惠仪式", text: "双向评价只有在双方确认后才会公开，并以徽章嘉奖长期稳定的表现。" },
        { icon: BarChart3, title: "策略共创室", text: "风控分析师与协调员实时监听信号，在问题爆发前就调整政策与流程。" }
      ]
    },
    arcs: {
      title: "势能曲线",
      subtitle: "Guidew 像星座一样扩散，一座光芒城市会点亮下一座。",
      steps: [
        {
          name: "曙光起点",
          headline: "深扎新西兰",
          copy: "先在崇尚手艺的街区打磨 AI 与人情味的双人舞，让模板真正可复制。"
        },
        {
          name: "海岸桥梁",
          headline: "连通塔斯曼与太平洋标志城市",
          copy: "贯穿澳大利亚与亚太的创意之都，建立双语特遣队传授新一代服务者。"
        },
        {
          name: "大陆联盟",
          headline: "欧洲、中东与非洲",
          copy: "携手文化街区与艺术节，让 Guidew 成为环球创作者的后台通行证。"
        },
        {
          name: "行星常驻",
          headline: "美洲以及更远",
          copy: "在每个半球落地运营团队，分享方法论，让全球本地人都能把技能转化为待客之道。"
        }
      ],
      closing: "终局愿景很简单：任何旅客在任何城市点开 Guidew，都能瞬间遇见对的人。"
    },
    leadership: {
      title: "领导承诺",
      subtitle: "每位 Guidew 负责人在开城前必须签署的三条誓言。",
      statements: [
        { heading: "先关怀后扩张", body: "若无法确保双语关怀团队、康养保障与争议响应，就暂停上线。" },
        { heading: "开放式经济", body: "公开分润比例、社区再投入与影响力数据，让本地人看见真实价值。" },
        { heading: "共著手册", body: "城市伙伴、iwi 社群与独立服务者共同写作手册，拒绝未经允许的复制粘贴。"
        }
      ]
    }
  },
  pt: {
    hero: {
      badge: "Visão Guidew",
      title: "Uma guilda viva de locais para cada jornada",
      description:
        "Imaginamos um futuro em que cada cidade recebe viajantes com talentos confiáveis, copilotos de IA e rituais que tornam o offline seguro e memorável."
    },
    manifesto: [
      "Guildas locais merecem ferramentas de nível mundial.",
      "Todo corredor precisa gerar retorno cultural e econômico para quem o abriga.",
      "Automação só vale quando amplifica o cuidado humano."
    ],
    pillars: {
      title: "Princípios norteadores",
      subtitle: "Três compromissos mantêm a Guidew ousada sem abrir mão da confiança.",
      description: "Construímos experiências confiáveis e humanas antes de aplicar automação e crescimento onde isso amplia o cuidado.",
      items: [
        {
          title: "Inteligência centrada em pessoas",
          description: "IA contextual sugere o local certo, enquanto curadores protegem nuances, limites e códigos culturais."
        },
        {
          title: "Economia artesanal sem fronteiras",
          description: "Moradores talentosos transformam habilidades escondidas em ofertas assinadas com briefings claros e storytelling."
        },
        {
          title: "Rede de segurança serena",
          description: "Identidade, seguros e rituais de disputa funcionam em silêncio para que viajantes sintam apenas calma em movimento."
        }
      ]
    },
    experiences: {
      title: "Arquitetura de experiência",
      subtitle: "Cada reserva percorre uma pilha que mistura arte, logística e cuidado emocional.",
      items: [
        {
          label: "Strand Alpha",
          title: "Rituais de descoberta",
          description: "Questionários cuidadosos, moodboards e microvídeos revelam o que o viajante realmente busca."
        },
        {
          label: "Strand Lumen",
          title: "Planejamento co-criado",
          description: "Mestres locais e IA desenham itinerários que unem segredos de bairro à execução impecável."
        },
        {
          label: "Strand Pulse",
          title: "Comando em tempo real",
          description: "Tradução instantânea, beacons de segurança e sistemas SOS locais protegem cada encontro."
        },
        {
          label: "Strand Echo",
          title: "Memórias e lealdade",
          description: "Recaps, pools de gratidão e badges colecionáveis alimentam o gráfico Guidew para viagens futuras."
        }
      ],
      highlight: {
        title: "Runway concierge signature",
        text: "Uma célula dedicada da Guidew orquestra jornadas de alto toque para embaixadores, artistas e executivos.",
        bullets: [
          "Alinhamos humanos e IA para briefar cada provedor antes do pouso.",
          "Liberamos “backstage passes” via parceiros cívicos, culturais e esportivos.",
          "Compartilhamos dados comunitários para provar sustentabilidade e distribuição justa."
        ]
      }
    },
    labs: {
      title: "Ateliês de inovação",
      subtitle: "Quatro laboratórios aceleram os corredores do futuro.",
      cards: [
        {
          name: "Atlas Studio",
          focus: "Inteligência de cidade",
          copy: "Combina dados de satélite, calendários culturais e conselhos locais para escolher os próximos bairros Guidew."
        },
        {
          name: "Pulse Lab",
          focus: "Telemetria de segurança",
          copy: "Cria chatbots multilíngues, opt-ins biométricos e rotas sensíveis ao clima."
        },
        {
          name: "Embers Residency",
          focus: "Cocriação cultural",
          copy: "Comissiona artistas, terapeutas e mentores para desenhar rituais que permanecem na memória."
        },
        {
          name: "Guildworks",
          focus: "Prosperidade dos provedores",
          copy: "Testa escadas de preço, pagamentos instantâneos e jornadas de conquistas para elevar anfitriões."
        }
      ]
    },
    trust: {
      title: "Coreografia da confiança",
      subtitle: "Segurança vira conversa contínua com locais, viajantes e parceiros públicos.",
      items: [
        { icon: ShieldCheck, title: "Prova de caráter", text: "Vários níveis de verificação misturam identidade, credenciais e endossos de pares." },
        { icon: Users2, title: "Rituais recíprocos", text: "Avaliações só ficam públicas quando ambos enviam, com badges celebrando consistência." },
        { icon: BarChart3, title: "Estúdio vivo de políticas", text: "Analistas acompanham sinais em tempo real e ajustam playbooks antes de virarem crises." }
      ]
    },
    arcs: {
      title: "Arcos de impulso",
      subtitle: "Expandimos como constelação—uma cidade luminosa ativa a próxima.",
      steps: [
        {
          name: "Aurora launchpads",
          headline: "Raízes profundas na Aotearoa",
          copy: "Começamos em bairros que celebram o artesanato, equilibrando orquestração de IA e calor humano."
        },
        {
          name: "Coastal bridges",
          headline: "Tasman até ícones do Pacífico",
          copy: "Conectamos capitais criativas na Austrália e Ásia-Pacífico, formando equipes bilíngues que mentoram a próxima geração."
        },
        {
          name: "Continental alliances",
          headline: "Europa, Oriente Médio e África",
          copy: "Firmamos parcerias com distritos culturais e festivais, transformando a Guidew no backstage dos criadores globais."
        },
        {
          name: "Planetary residency",
          headline: "Américas e além",
          copy: "Instalamos squads em todos os hemisférios e compartilhamos playbooks para que locais convertam talento em hospitalidade."
        }
      ],
      closing: "O objetivo é simples: qualquer viajante, em qualquer cidade, toca Guidew e encontra a pessoa certa instantaneamente."
    },
    leadership: {
      title: "Pactos de liderança",
      subtitle: "Cada líder Guidew assina estes compromissos antes de abrir um corredor.",
      statements: [
        { heading: "Cuidado antes da escala", body: "Pausamos lançamentos se não conseguimos garantir equipes bilíngues, cobertura de bem-estar e resposta rápida a disputas." },
        { heading: "Economia de mão aberta", body: "Publicamos divisões de payout, reinvestimento comunitário e relatórios de impacto para que os locais enxerguem valor real." },
        { heading: "Autoria compartilhada", body: "Parceiros municipais, lideranças iwi e independentes coescrevem os playbooks—nada de copiar sem consentimento." }
      ]
    }
  },
  es: {
    hero: {
      badge: "Visión Guidew",
      title: "Una cofradía viva de locales para cada viaje",
      description:
        "Guidew imagina un futuro donde cada ciudad te recibe con personas confiables, copilotos de IA y rituales que vuelven cada momento offline cinematográfico y seguro."
    },
    manifesto: ["Las cofradías locales merecen herramientas de clase mundial.", "Cada corredor debe generar retornos culturales y económicos para sus anfitriones.", "La automatización solo importa cuando amplifica el cuidado humano."],
    pillars: {
      title: "Principios guía",
      subtitle: "Tres compromisos mantienen a Guidew audaz sin perder la confianza.",
      description: "Primero diseñamos experiencias confiables y humanas; la automatización y el crecimiento llegan solo cuando elevan el cuidado.",
      items: [
        {
          title: "Inteligencia centrada en personas",
          description: "La IA contextual sugiere al experto correcto mientras curadores protegen matices, límites y códigos culturales."
        },
        {
          title: "Economía artesanal sin fronteras",
          description: "Los residentes convierten talentos ocultos en ofertas emblemáticas gracias a briefs transparentes y storytelling elevado."
        },
        {
          title: "Red de seguridad serena",
          description: "Identidad, seguros y rituales de disputa operan en silencio para que los viajeros solo sientan calma en movimiento."
        }
      ]
    },
    experiences: {
      title: "Arquitectura de experiencia",
      subtitle: "Cada reserva fluye por una pila que mezcla arte, logística y contención emocional.",
      items: [
        {
          label: "Strand Alpha",
          title: "Rituales de descubrimiento",
          description: "Cuestionarios delicados, tableros de inspiración y microvideos revelan lo que la persona realmente busca."
        },
        {
          label: "Strand Lumen",
          title: "Planificación co-creada",
          description: "Proveedores y copilotos de IA diseñan itinerarios que combinan logística con secretos que solo vive el vecindario."
        },
        {
          label: "Strand Pulse",
          title: "Comando en vivo",
          description: "Traducción en tiempo real, balizas de seguridad y sistemas SOS locales arropan cada encuentro."
        },
        {
          label: "Strand Echo",
          title: "Memoria y lealtad",
          description: "Relatos posteriores, pools de gratitud e insignias coleccionables alimentan el grafo Guidew para futuros viajes."
        }
      ],
      highlight: {
        title: "Pista concierge insignia",
        text: "Un escuadrón dedicado de Guidew orquesta viajes de alto contacto para embajadores, artistas y ejecutivos.",
        bullets: ["Combinamos humanos e IA para preparar a cada proveedor antes del aterrizaje.", "Abrimos “pases backstage” junto a aliados cívicos, culturales y deportivos.", "Mostramos datos comunitarios que prueban sostenibilidad y pagos equitativos."]
      }
    },
    labs: {
      title: "Ateliers de innovación",
      subtitle: "Cuatro laboratorios aceleran los futuros corredores Guidew.",
      cards: [
        {
          name: "Atlas Studio",
          focus: "Inteligencia urbana",
          copy: "Cruza datos satelitales, calendarios culturales y consejos vecinales para elegir los próximos barrios Guidew."
        },
        {
          name: "Pulse Lab",
          focus: "Telemetría de seguridad",
          copy: "Crea chatbots multilingües, opt-ins biométricos y rutas sensibles al clima para sesiones en vivo."
        },
        {
          name: "Embers Residency",
          focus: "Cocreación cultural",
          copy: "Comisiona artistas, sanadores y coaches para diseñar rituales que los viajeros reviven una y otra vez."
        },
        {
          name: "Guildworks",
          focus: "Prosperidad de proveedores",
          copy: "Prueba escaleras de precios, pagos instantáneos y misiones de logros que convierten anfitriones en creadores de tiempo completo."
        }
      ]
    },
    trust: {
      title: "Coreografía de confianza",
      subtitle: "La seguridad es una conversación continua con locales, viajeros y alianzas ciudadanas.",
      items: [
        { icon: ShieldCheck, title: "Prueba de carácter", text: "Capas de verificación mezclan identidad, credenciales y avales de pares adaptados a cada experiencia." },
        { icon: Users2, title: "Rituales recíprocos", text: "Las reseñas bilaterales se publican solo cuando ambas voces se alinean; las insignias celebran consistencia y cuidado." },
        { icon: BarChart3, title: "Estudio vivo de políticas", text: "Analistas y mediadores monitorean señales en tiempo real y ajustan los playbooks antes de que escalen." }
      ]
    },
    arcs: {
      title: "Arcos de momentum",
      subtitle: "Guidew se expande como una constelación: una ciudad radiante activa la siguiente.",
      steps: [
        {
          name: "Aurora launchpads",
          headline: "Raíces profundas en Aotearoa",
          copy: "Comenzamos en barrios que celebran la maestría, afinando el dúo entre orquestación de IA y calidez humana."
        },
        {
          name: "Coastal bridges",
          headline: "Del Tasman a íconos del Pacífico",
          copy: "Conectamos capitales creativas de Australia y Asia-Pacífico, formando equipos bilingües que mentorean a la próxima generación de hosts."
        },
        {
          name: "Continental alliances",
          headline: "Europa, Medio Oriente y África",
          copy: "Nos aliamos con distritos culturales y festivales para que Guidew sea el pase backstage de los creadores globales."
        },
        {
          name: "Planetary residency",
          headline: "Américas y más allá",
          copy: "Instalamos equipos Guidew en cada hemisferio y compartimos playbooks para que locales conviertan habilidades en hospitalidad."
        }
      ],
      closing: "El desenlace es claro: cualquier viajero, en cualquier ciudad, abre Guidew y encuentra al humano correcto al instante."
    },
    leadership: {
      title: "Pactos de liderazgo",
      subtitle: "Cada líder de Guidew firma estas promesas antes de abrir un corredor.",
      statements: [
        { heading: "Cuidado antes de escalar", body: "Pausamos lanzamientos si no podemos garantizar equipos bilingües, cobertura de bienestar y respuesta ágil a disputas." },
        { heading: "Economía de mano abierta", body: "Publicamos reparto de pagos, reinversión comunitaria e informes de impacto para que los locales vean valor real." },
        { heading: "Autoría compartida", body: "Aliados municipales, líderes iwi e independientes coescriben los playbooks; nada se copia sin consentimiento." }
      ]
    }
  },
  fr: {
    hero: {
      badge: "Vision Guidew",
      title: "Une guilde vivante de locaux pour chaque voyage",
      description:
        "Guidew imagine un futur où chaque ville vous accueille avec des talents de confiance, des copilotes IA et des rituels qui transforment chaque moment offline en scène mémorable mais sûre."
    },
    manifesto: ["Les guildes locales méritent des outils de classe mondiale.", "Chaque corridor doit générer des retombées culturelles et économiques pour ses hôtes.", "L’automatisation n’a de valeur que si elle amplifie le soin humain."],
    pillars: {
      title: "Principes directeurs",
      subtitle: "Trois engagements maintiennent Guidew audacieux tout en préservant la confiance.",
      description: "Nous concevons d’abord des expériences crédibles et humaines, puis nous n’ajoutons l’automatisation et la croissance que lorsqu’elles renforcent le soin apporté.",
      items: [
        {
          title: "Intelligence centrée sur l’humain",
          description: "Une IA contextuelle suggère les bons locaux tandis que des curateurs protègent nuances, limites et codes culturels."
        },
        {
          title: "Économie artisanale sans frontières",
          description: "Les habitants transforment des talents cachés en offres signature grâce à des briefs transparents et un storytelling valorisant."
        },
        {
          title: "Réseau de sécurité serein",
          description: "Identité, assurance et rituels de résolution fonctionnent en coulisses pour que les voyageurs ne ressentent qu’un mouvement calme."
        }
      ]
    },
    experiences: {
      title: "Architecture d’expérience",
      subtitle: "Chaque réservation traverse une pile mêlant art, logistique et soin émotionnel.",
      items: [
        {
          label: "Strand Alpha",
          title: "Rituels de découverte",
          description: "Questionnaires fins, moodboards et micro‑vidéos révèlent ce que le voyageur recherche vraiment."
        },
        {
          label: "Strand Lumen",
          title: "Planification co‑créée",
          description: "Prestataires et copilotes IA dessinent des itinéraires mêlant secrets de quartier et précision logistique."
        },
        {
          label: "Strand Pulse",
          title: "Commandement en direct",
          description: "Traduction en temps réel, balises de sécurité et SOS locaux enveloppent chaque rencontre."
        },
        {
          label: "Strand Echo",
          title: "Souvenir & loyauté",
          description: "Récits, pools de gratitude et badges collectionnables alimentent le graphe Guidew pour les prochains voyages."
        }
      ],
      highlight: {
        title: "Piste concierge signature",
        text: "Une escouade Guidew dédiée orchestre les voyages haute couture d’ambassadeurs, d’artistes et de dirigeants.",
        bullets: [
          "Humains et IA briefent chaque prestataire avant même l’atterrissage du voyageur.",
          "Des partenariats civiques, culturels et sportifs ouvrent des “backstage passes” exclusifs.",
          "Des données communautaires prouvent durabilité et partage équitable des revenus."
        ]
      }
    },
    labs: {
      title: "Ateliers d’innovation",
      subtitle: "Quatre laboratoires accélèrent les corridors de demain.",
      cards: [
        {
          name: "Atlas Studio",
          focus: "Intelligence urbaine",
          copy: "Croise données satellites, calendriers culturels et conseils citoyens pour choisir les prochains quartiers Guidew."
        },
        {
          name: "Pulse Lab",
          focus: "Télémétrie sécurité",
          copy: "Conçoit des chatbots multilingues, des opt-in biométriques et des itinéraires sensibles à la météo pour les sessions live."
        },
        {
          name: "Embers Residency",
          focus: "Co‑création culturelle",
          copy: "Commande artistes, guérisseurs et coachs pour imaginer des rituels qui restent en mémoire."
        },
        {
          name: "Guildworks",
          focus: "Prospérité des prestataires",
          copy: "Teste des grilles tarifaires, des rails de paiement instantané et des quêtes de succès qui font des hôtes des créateurs à plein temps."
        }
      ]
    },
    trust: {
      title: "Chorégraphie de confiance",
      subtitle: "La sécurité devient une conversation continue avec locaux, voyageurs et villes partenaires.",
      items: [
        { icon: ShieldCheck, title: "Preuve de caractère", text: "Des couches de vérification mêlent identité, certificats et recommandations pair-à-pair adaptées à chaque expérience." },
        { icon: Users2, title: "Rituels réciproques", text: "Les avis bilatéraux ne sont publiés qu’une fois les deux voix alignées, avec des badges célébrant constance et soin." },
        { icon: BarChart3, title: "Studio politique vivant", text: "Analystes risques et médiateurs surveillent les signaux en direct et ajustent nos playbooks avant qu’un problème n’escalade." }
      ]
    },
    arcs: {
      title: "Arcs de momentum",
      subtitle: "Guidew se déploie comme une constellation : une ville rayonnante en active une autre.",
      steps: [
        {
          name: "Aurora launchpads",
          headline: "Racines profondes en Aotearoa",
          copy: "Ancrer des quartiers célébrant l’artisanat et perfectionner le duo orchestration IA + chaleur humaine."
        },
        {
          name: "Coastal bridges",
          headline: "De la Tasmanie aux icônes du Pacifique",
          copy: "Relier des capitales créatives d’Australie et d’Asie-Pacifique, former des équipes bilingues qui mentorent la prochaine vague d’hôtes."
        },
        {
          name: "Continental alliances",
          headline: "Europe, Moyen-Orient, Afrique",
          copy: "S’allier à des districts culturels et festivals pour faire de Guidew le backstage des créateurs globe-trotters."
        },
        {
          name: "Planetary residency",
          headline: "Amériques et au-delà",
          copy: "Installer des squads Guidew sur chaque hémisphère et partager nos playbooks pour que les talents locaux deviennent hospitalité."
        }
      ],
      closing: "L’objectif est simple : n’importe quel voyageur, dans n’importe quelle ville, ouvre Guidew et rencontre instantanément la bonne personne."
    },
    leadership: {
      title: "Pactes de leadership",
      subtitle: "Chaque leader Guidew signe ces promesses avant d’ouvrir un corridor.",
      statements: [
        { heading: "Le soin avant l’échelle", body: "Nous suspendons un lancement si nous ne pouvons garantir équipes bilingues, couverture bien-être et réponse aux litiges." },
        { heading: "Économie main ouverte", body: "Nous publions répartition des paiements, réinvestissement communautaire et rapports d’impact pour que les locaux voient la valeur réelle." },
        { heading: "Auteur collectif", body: "Collectivités, leaders iwi et indépendants coécrivent les playbooks—jamais de déploiement copié-collé sans consentement." }
      ]
    }
  },
  he: {
    hero: {
      badge: "חזון Guidew",
      title: "גילד חי של מקומיים לכל מסע",
      description:
        "Guidew מדמיינת עתיד שבו כל עיר מקבלת אתכם עם אנשים מקומיים אמינים, טייסי משנה מבוססי AI וטקסים שהופכים כל מפגש פיזי לקולנועי ובטוח."
    },
    manifesto: ["לגילדות מקומיות מגיעים כלים ברמה עולמית.", "כל מסדרון חייב להחזיר ערך תרבותי וכלכלי למארחים.", "אוטומציה חשובה רק כשהיא מגבירה את הדאגה האנושית."],
    pillars: {
      title: "עקרונות כוכב הצפון",
      subtitle: "שלושה מחויבויות משאירים את Guidew אמיצה תוך שמירה על אמון.",
      description: "אנחנו בונים קודם כל חוויות אמינות בקנה מידה אנושי, ואז מוסיפים אוטומציה וצמיחה רק במקום שמחזק את הטיפול.",
      items: [
        {
          title: "בינה אנושית תחילה",
          description: "AI מודעת הקשר מציעה את המומחה המקומי המדויק, בעוד אוצרים מגנים על ניואנסים, גבולות וקודים תרבותיים."
        },
        {
          title: "כלכלת מלאכה ללא גבולות",
          description: "תושבים מוכשרים הופכים כישרונות חבויים להצעות חתימה בעזרת בריפים שקופים וסיפור מותג מרומם."
        },
        {
          title: "רשת ביטחון רגועה",
          description: "זהויות, ביטוחים וטקסי פתרון מחלוקות פועלים בשקט מאחורי הקלעים כדי שהמטייל ירגיש רק תנופה מתמשכת."
        }
      ]
    },
    experiences: {
      title: "ארכיטקטורת חוויה",
      subtitle: "כל הזמנה עוברת שכבות שמחברות אומנות, לוגיסטיקה ואמפתיה.",
      items: [
        {
          label: "Strand Alpha",
          title: "טקסי גילוי",
          description: "שאלונים מדויקים, לוחות השראה וסרטונים קצרים חושפים מה המטייל באמת מחפש."
        },
        {
          label: "Strand Lumen",
          title: "תכנון משותף",
          description: "ספקים ו-AI משתפים פעולה בבניית מסלולים שמחברים לוגיסטיקה עם סודות שאפשר למצוא רק בשכונה."
        },
        {
          label: "Strand Pulse",
          title: "פיקוד בזמן אמת",
          description: "תרגום חי, משואות בטיחות ומערכות SOS מקומיות עוטפות כל מפגש."
        },
        {
          label: "Strand Echo",
          title: "זיכרון ונאמנות",
          description: "סיפורי סיכום, בריכות תודה ותגים אספניים מזינים את גרף Guidew למסע הבא."
        }
      ],
      highlight: {
        title: "מסלול קונסיירז' חתימתי",
        text: "צוות Guidew ייעודי מתזמר מסעות בעלי מגע גבוה עבור שגרירים, אמנים ומנהלים.",
        bullets: [
          "מאחדים בני אדם ו-AI כדי לתדרך כל ספק עוד לפני שהמטייל נוחת.",
          "פותחים “כרטיסי מאחורי הקלעים” דרך שותפים אזרחיים, תרבותיים וספורטיביים.",
          "מציגים דאטה קהילתי שמוכיח קיימות וחלוקה הוגנת."
        ]
      }
    },
    labs: {
      title: "מעבדות חדשנות",
      subtitle: "ארבע סדנאות מאיצות את המסדרונות הבאים של Guidew.",
      cards: [
        {
          name: "Atlas Studio",
          focus: "מודיעין עירוני",
          copy: "משלב נתוני לוויין, לוחות שנה תרבותיים ומועצות תושבים כדי לבחור את השכונות הבאות."
        },
        {
          name: "Pulse Lab",
          focus: "טלמטריית בטיחות",
          copy: "בונה צ'אטבוטים רב-לשוניים, opt-in ביומטרי וניווט מודע מזג אוויר לפגישות חיות."
        },
        {
          name: "Embers Residency",
          focus: "שותפות תרבותית",
          copy: "מזמין אמנים, מרפאים ומאמנים כדי לעצב טקסים שהמטיילים ירצו לשחזר שוב."
        },
        {
          name: "Guildworks",
          focus: "שגשוג ספקים",
          copy: "מנסה סולמות תמחור, מסילות תשלום מיידי ואתגרי הישג שמקדמים מארחים לעשייה במשרה מלאה."
        }
      ]
    },
    trust: {
      title: "כוריאוגרפיית אמון",
      subtitle: "הבטיחות היא שיחה מתמשכת עם מקומיים, מטיילים ושותפי עיר.",
      items: [
        { icon: ShieldCheck, title: "הוכחת אופי", text: "שכבות אימות משלבות זהות, תעודות והמלצות עמיתים המותאמות לכל חוויה." },
        { icon: Users2, title: "טקסים הדדיים", text: "ביקורות דו-צדדיות מתפרסמות רק אחרי ששני הקולות הושלמו, עם תגי הערכה על עקביות ודאגה." },
        { icon: BarChart3, title: "סטודיו מדיניות חי", text: "אנליסטים ומגשרים צופים בסיגנלים בזמן אמת ומעדכנים נהלים לפני שהבעיה מסלימה." }
      ]
    },
    arcs: {
      title: "קשתות תאוצה",
      subtitle: "Guidew מתרחבת כמו קונסטלציה—עיר זוהרת אחת מפעילה את הבאה.",
      steps: [
        {
          name: "Aurora launchpads",
          headline: "שורשים עמוקים באאוטארואה",
          copy: "מתחילים בשכונות שמכבדות מלאכה ומזקקים את הדואט בין אוטומציית AI לחום אנושי."
        },
        {
          name: "Coastal bridges",
          headline: "מתעלת טסמן אל אייקוני הפסיפיק",
          copy: "מחברים בירות יצירתיות ברחבי אוסטרליה ואסיה-פסיפיק ומקימים צוותים דו-לשוניים שמנחים את הדור הבא של המארחים."
        },
        {
          name: "Continental alliances",
          headline: "אירופה, המזרח התיכון ואפריקה",
          copy: "משתפים פעולה עם מחוזות תרבות ופסטיבלים כך ש-Guidew הופכת לכרטיס מאחורי הקלעים של יוצרי העולם."
        },
        {
          name: "Planetary residency",
          headline: "האמריקות ומה שמעבר",
          copy: "מעגנים צוותי Guidew בכל חצי כדור ומשתפים playbooks כדי שכל כישרון מקומי יהפוך לאירוח."
        }
      ],
      closing: "המטרה פשוטה: כל מטייל, בכל עיר, פותח את Guidew ופוגש מיידית את האדם המדויק."
    },
    leadership: {
      title: "אמנות ההנהגה",
      subtitle: "כל מוביל/ה ב-Guidew חותם/ת על ההבטחות האלה לפני פתיחת מסדרון.",
      statements: [
        { heading: "דאגה לפני סקייל", body: "נעצור השקה אם אין לנו צוותי טיפול דו-לשוניים, כיסוי רווחה ותגובה מהירה לסכסוכים." },
        { heading: "כלכלה פתוחה", body: "נפרסם חלוקות תשלום, השקעה מחדש ומדדי השפעה כדי שהקהילה תראה את הערך האמיתי." },
        { heading: "מחברות משותפת", body: "שותפי עיר, מנהיגי iwi ויוצרים עצמאיים כותבים יחד את ספרי ההפעלה—אף פעם לא מעתיקים בלי הסכמה." }
      ]
    }
  }
} as const;

const AboutVision = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const localeKey =
    (locale === "zh" || locale === "pt" || locale === "es" || locale === "fr" || locale === "he" ? locale : "en") as keyof typeof visionCopy;
  const content = visionCopy[localeKey];
  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="relative overflow-hidden bg-brand-darkBlue text-white py-24">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/40 via-transparent to-brand-orange/30" />
            <div className="absolute left-1/2 top-[-10%] h-96 w-96 rounded-full bg-brand-gold/40 blur-3xl opacity-40" />
            <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-brand-teal/30 blur-3xl opacity-40" />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur">
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs uppercase tracking-[0.35em]">{content.hero.badge}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{content.hero.title}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
              {content.hero.description}
            </p>
          </div>
        </section>

        <section className="py-12 bg-brand-lightGray">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              {content.manifesto.map(statement => (
                <div key={statement} className="rounded-3xl border border-white/60 bg-white p-6 shadow-sm">
                  <div className="text-xs uppercase tracking-[0.35em] text-brand-teal mb-3">Manifesto</div>
                  <p className="text-brand-darkBlue font-semibold leading-relaxed">{statement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.pillars.title}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.pillars.subtitle}</h2>
              <p className="text-gray-600">{content.pillars.description}</p>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.pillars.items.map(item => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-brand-lightGray bg-brand-lightGray/40 p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-brand-teal/80">
                    <span className="h-2 w-2 rounded-full bg-brand-teal" />
                    {content.pillars.title}
                  </div>
                  <h3 className="text-xl font-semibold mt-4 mb-2 text-brand-darkBlue">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-brand-lightGray">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.experiences.title}</p>
                <h2 className="text-3xl font-bold text-brand-darkBlue mb-3">{content.experiences.subtitle}</h2>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white shadow-xl p-8 space-y-4">
                <div className="text-xs uppercase tracking-[0.35em] text-brand-gold">{content.experiences.highlight.title}</div>
                <p className="text-gray-700 leading-relaxed">{content.experiences.highlight.text}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {content.experiences.highlight.bullets.map(bullet => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-brand-teal" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {content.experiences.items.map(item => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-sm backdrop-blur hover:-translate-y-1 transition"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">{item.label}</p>
                  <h3 className="text-xl font-semibold mt-2 mb-2 text-brand-darkBlue">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.labs.title}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.labs.subtitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.labs.cards.map(card => (
                <div
                  key={card.name}
                  className="rounded-3xl border border-brand-lightGray bg-brand-lightGray/40 p-6 shadow-sm hover:-translate-y-1 transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-gold">{card.name}</p>
                    <span className="text-sm font-medium text-brand-darkBlue">{card.focus}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">{card.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.trust.title}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.trust.subtitle}</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {content.trust.items.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-brand-lightGray bg-brand-lightGray/50 p-6 text-left hover:shadow-md transition"
                >
                  <Icon className="h-10 w-10 text-brand-teal mb-4" />
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-2">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 bg-[#030b1f] text-white">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 via-transparent to-brand-orange/30" />
            <div className="absolute left-1/3 top-10 h-48 w-48 bg-brand-gold/20 blur-3xl opacity-70" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-gold mb-3">{content.arcs.title}</p>
              <h2 className="text-3xl font-bold mb-4">{content.arcs.subtitle}</h2>
            </div>
            <div className="mt-12 space-y-12 relative">
              <div className="hidden md:block absolute left-4 top-0 bottom-0 w-px bg-white/20" aria-hidden />
              {content.arcs.steps.map(step => (
                <div key={step.name} className="relative md:pl-14">
                  <div className="hidden md:flex absolute left-2 top-2 h-3 w-3 rounded-full bg-brand-gold shadow-lg shadow-brand-gold/50" />
                  <div className="rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur">
                    <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">{step.name}</p>
                    <h3 className="text-2xl font-semibold mt-2 mb-3">{step.headline}</h3>
                    <p className="text-white/80 leading-relaxed text-sm">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-12 text-white/80 max-w-3xl text-lg">{content.arcs.closing}</p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-3">{content.leadership.title}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.leadership.subtitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {content.leadership.statements.map(statement => (
                <div key={statement.heading} className="rounded-3xl border border-brand-lightGray bg-brand-lightGray/40 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-3">{statement.heading}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{statement.body}</p>
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

export default AboutVision;
