import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";
import {
  Sparkles,
  ShieldCheck,
  CalendarClock,
  Zap,
  Languages,
  MessageCircle,
  CheckCircle2,
  type LucideIcon
} from "lucide-react";

const vipLocales = ["en", "zh", "pt", "es", "fr", "he"] as const;
type VipLocale = (typeof vipLocales)[number];

type VipBenefit = {
  title: string;
  detail: string;
};

type VipMilestone = {
  phase: string;
  target: string;
  detail: string;
};

type VipFaq = {
  question: string;
  answer: string;
};

type VipProductDetail = {
  title: string;
  description: string;
  benefits: VipBenefit[];
  priceTag: string;
  priceSubline: string;
  cta: string;
};

type VipCopy = {
  hero: {
    badge: string;
    title: string;
    description: string;
    cta: string;
    secondaryCta: string;
    note: string;
    languagesLabel: string;
    stackLabel: string;
    stackTitle: string;
  };
  traveler: VipProductDetail;
  provider: VipProductDetail;
  timeline: {
    title: string;
    description: string;
    milestones: VipMilestone[];
  };
  faqs: VipFaq[];
  legal: string;
  faqLabel: string;
  faqTitle: string;
};

const supportedVipLocales = new Set<VipLocale>(vipLocales);

const getVipLocale = (language?: string): VipLocale => {
  if (!language) return "en";
  const normalized = language.split("-")[0]?.toLowerCase() as VipLocale | undefined;
  if (normalized && supportedVipLocales.has(normalized)) {
    return normalized;
  }
  return "en";
};

const vipCopy: Record<VipLocale, VipCopy> = {
  en: {
    hero: {
      badge: "VIP Memberships",
      title: "Two VIP tracks for travelers and providers",
      description:
        "Guidew collects a 15% commission on standard bookings. Traveler VIP ($9.9/mo) removes it and adds AI matching, while Provider VIP ($99/mo) unlocks automation, itinerary planning, and AI chat support.",
      cta: "Download Guidew",
      secondaryCta: "See roadmap",
      note: "Traveler VIP $9.9/mo · Provider VIP $99/mo · Cancel anytime.",
      languagesLabel: "Available in 6 languages",
      stackLabel: "VIP stack",
      stackTitle: "Separate memberships"
    },
    traveler: {
      title: "Traveler VIP",
      description: "Pay $9.9/month to waive the 15% booking fee, chat with AI concierges, and get priority routing across Auckland and Wellington.",
      priceTag: "$9.9 / month",
      priceSubline: "No booking fees · AI conversations · Priority matching",
      cta: "Activate traveler VIP",
      benefits: [
        { title: "No 15% hire fee", detail: "Traveler VIP removes Guidew's commission so you pay only the provider's hourly rate." },
        { title: "AI conversation requests", detail: "Describe your needs in any supported language and receive curated matches instantly." },
        { title: "Priority matching", detail: "VIP requests jump the queue with proactive arrival-time monitoring." },
        { title: "Connected wallet", detail: "Send tips, handle refunds, and add upsells without re-entering payment info." }
      ]
    },
    provider: {
      title: "Provider VIP",
      description: "Invest $99/month to automate order acceptance, run AI itinerary planning, and let AI handle routine client replies while you stay on the move.",
      priceTag: "$99 / month",
      priceSubline: "Auto-accept · AI itinerary planning · AI customer replies",
      cta: "Upgrade provider VIP",
      benefits: [
        { title: "Auto-accept rules", detail: "Preset filters approve relevant jobs instantly so you never miss high-value orders." },
        { title: "AI itinerary builder", detail: "Generate transport-aware plans, certificate reminders, and equipment checklists in seconds." },
        { title: "AI auto-support", detail: "An AI concierge answers frequent customer chats and escalates only when needed." },
        { title: "Travel buffer alerts", detail: "VIP tools warn you when the next job is too far so you keep a perfect reliability score." }
      ]
    },
    timeline: {
      title: "Rollout roadmap",
      description: "Guidew ships VIP in waves so trust, liquidity, and multilingual tooling scale together.",
      milestones: [
        { phase: "Phase 1 · Early runway", target: "First wave in Auckland & Wellington", detail: "Hundreds of pioneers use AI concierge and fee waivers to validate the model." },
        { phase: "Phase 2 · Momentum", target: "Several thousand testers", detail: "Broader pilots unlock advanced filters, chat automations, and richer calendars." },
        { phase: "Phase 3 · Nationwide", target: "Tens of thousands across NZ", detail: "Full-country coverage with proactive protection and elite creator tiers." },
        { phase: "Phase 4 · Across the Tasman", target: "Australian creative capitals", detail: "Cities like Sydney, Melbourne, and Brisbane adopt the same VIP fabric." },
        { phase: "Phase 5 · Global era", target: "Additional continents", detail: "International rollout with localized payments and cultural playbooks." }
      ]
    },
    faqs: [
      { question: "Is VIP required to book?", answer: "No. Any registered user can book services, but VIP removes the 15% fee, unlocks AI requests, and offers priority matching." },
      { question: "Does VIP also help providers?", answer: "Yes. Providers use auto-accept, AI itinerary drafting, and buffer alerts—features reserved for VIP creators." },
      { question: "How do I join?", answer: "Tap the download button, sign in, and enable VIP from the wallet tab. Billing is monthly and you can cancel anytime." }
    ],
    legal: "Guidew continues to charge 15% of every non-VIP transaction. VIP removes this fee for the subscriber while still compensating providers fairly.",
    faqLabel: "FAQ",
    faqTitle: "VIP basics"
  },
  zh: {
    hero: {
      badge: "VIP 会员",
      title: "用户 VIP 与 服务者 VIP 分别进阶",
      description: "Guidew 普通订单需收取 15% 佣金。用户 VIP（$9.9/月）免佣并支持 AI 对话下单；服务者 VIP（$99/月）解锁自动接单、AI 行程与 AI 客户服务。",
      cta: "下载 Guidew",
      secondaryCta: "查看路线图",
      note: "用户 VIP $9.9/月 · 服务者 VIP $99/月 · 随时可退。",
      languagesLabel: "支持 6 种语言",
      stackLabel: "VIP 组合",
      stackTitle: "双会员体系"
    },
    traveler: {
      title: "用户 VIP",
      description: "每月 9.9 美元，免除 15% 佣金并由 AI 礼宾在奥克兰与惠灵顿数分钟内完成匹配。",
      priceTag: "$9.9 / 月",
      priceSubline: "免 15% 佣金 · AI 对话 · 优先匹配",
      cta: "开通用户 VIP",
      benefits: [
        { title: "下单免佣", detail: "只需支付服务者的标价，平台 15% 佣金由用户 VIP 直接免除。" },
        { title: "AI 对话下单", detail: "AI 支持中文、英文、葡语、西语、法语、希伯来语，1 句话描述即可推荐人选。" },
        { title: "优先匹配", detail: "VIP 需求排序靠前，并会主动提醒交通时间是否足够。" },
        { title: "钱包联动", detail: "无需重复输入支付信息即可打赏、退款或购买关联增值服务。" }
      ]
    },
    provider: {
      title: "服务者 VIP",
      description: "每月 99 美元即可让自动接单、AI 行程规划与 AI 客服为你打前站，专注线下履约。",
      priceTag: "$99 / 月",
      priceSubline: "自动接单 · AI 行程 · AI 客服",
      cta: "升级服务者 VIP",
      benefits: [
        { title: "自动接单", detail: "按照日程、服务范围或订单价位设定规则，符合条件即自动接受。" },
        { title: "AI 行程助手", detail: "秒级生成交通规划、证书提示与装备清单。" },
        { title: "AI 客服应答", detail: "AI 帮你回复常见问题，并在需要人工时立即提醒。" },
        { title: "行程缓冲提醒", detail: "当下一单距离过远时提前提醒，保持完美履约率。" }
      ]
    },
    timeline: {
      title: "分阶段路线图",
      description: "Guidew 以波次形式推出 VIP，平衡信任、供给与多语言工具。",
      milestones: [
        { phase: "阶段一 · 启动期", target: "奥克兰与惠灵顿首批种子用户", detail: "数百名先锋体验 AI 管家与免佣机制。" },
        { phase: "阶段二 · 扩张期", target: "数千名测试者", detail: "逐步开放高级筛选、聊天自动化与更多日历能力。" },
        { phase: "阶段三 · 全国期", target: "遍布新西兰的用户群", detail: "全国覆盖并加强风控与高阶创作者体系。" },
        { phase: "阶段四 · 跨海期", target: "澳大利亚主要城市", detail: "悉尼、墨尔本、布里斯班等城市同步继承 VIP 能力。" },
        { phase: "阶段五 · 全球期", target: "更多国家与语种", detail: "进入国际市场并适配本地支付与文化指南。" }
      ]
    },
    faqs: [
      { question: "不买 VIP 也能下单吗？", answer: "可以。所有注册用户都能下单，但 VIP 免佣、支持 AI 描述需求，并享受优先匹配。" },
      { question: "VIP 对服务者有用吗？", answer: "有。VIP 服务者可使用自动接单、AI 行程、缓冲提醒等高级工具。" },
      { question: "如何加入 VIP？", answer: "点击下载按钮登录 App，在钱包页开启 VIP，按月计费，随时可取消。" }
    ],
    legal: "非 VIP 订单仍收取 15% 平台佣金；VIP 仅对订阅者免除该费用，服务者收益保持透明。",
    faqLabel: "常见问题",
    faqTitle: "VIP 核心信息"
  },
  pt: {
    hero: {
      badge: "VIP",
      title: "Dois planos VIP sob medida",
      description: "A Guidew cobra 15% nos pedidos padrão. VIP viajante (US$ 9,9/mês) remove a taxa e libera pedidos via IA; VIP provedor (US$ 99/mês) ativa aceite automático, roteiros e suporte com IA.",
      cta: "Baixar Guidew",
      secondaryCta: "Ver roadmap",
      note: "VIP viajante US$ 9,9/mês · VIP provedor US$ 99/mês · cancele quando quiser.",
      languagesLabel: "Disponível em 6 idiomas",
      stackLabel: "Pacote VIP",
      stackTitle: "Assinaturas distintas"
    },
    traveler: {
      title: "VIP viajante",
      description: "Pague US$ 9,9/mês para eliminar a taxa de 15%, conversar com a IA e receber matching prioritário em Auckland e Wellington.",
      priceTag: "US$ 9,9 / mês",
      priceSubline: "Sem taxa de 15% · pedidos IA · prioridade",
      cta: "Ativar VIP viajante",
      benefits: [
        { title: "Sem taxa de reserva", detail: "A assinatura cobre os 15% da Guidew, então você paga apenas o valor definido pelo provedor." },
        { title: "Pedidos em conversa", detail: "Explique em PT, EN, 中文, ES, FR ou HE e a IA encontra humanos confiáveis." },
        { title: "Prioridade", detail: "Chamados VIP ficam no topo e recebem alertas proativos de deslocamento." },
        { title: "Carteira conectada", detail: "Gorjetas, reembolsos e upsells sem reinserir cartão." }
      ]
    },
    provider: {
      title: "VIP provedor",
      description: "Por US$ 99/mês você automatiza aceite, gera roteiros por IA e deixa um concierge virtual responder clientes enquanto está em campo.",
      priceTag: "US$ 99 / mês",
      priceSubline: "Aceite automático · roteiros IA · suporte IA",
      cta: "Atualizar para VIP provedor",
      benefits: [
        { title: "Aceite automático", detail: "Filtros por agenda e localização aprovam pedidos lucrativos sem tocar no telefone." },
        { title: "Roteiros por IA", detail: "Planos com transporte, lembretes de certificados e checklist aparecem em segundos." },
        { title: "Suporte com IA", detail: "Respostas automáticas cuidam das perguntas frequentes e escalam só o essencial." },
        { title: "Alertas de deslocamento", detail: "Receba avisos quando o próximo serviço estiver longe demais para chegar no horário." }
      ]
    },
    timeline: {
      title: "Roteiro de expansão",
      description: "Implementamos o VIP em ondas para equilibrar confiança, oferta e idiomas.",
      milestones: [
        { phase: "Fase 1 · Lançamento", target: "Primeira leva em Auckland/Wellington", detail: "Centenas de pioneiros validam concierge bilíngue e pedidos sem taxa." },
        { phase: "Fase 2 · Tração", target: "Alguns milhares de testers", detail: "Pilotos maiores liberam filtros avançados e automações de chat." },
        { phase: "Fase 3 · Nacional", target: "Dezenas de milhares na Nova Zelândia", detail: "Cobertura ampla com proteção proativa e níveis de criadores." },
        { phase: "Fase 4 · Ponte do Tasmânia", target: "Principais cidades australianas", detail: "Sydney, Melbourne e Brisbane recebem a mesma camada VIP." },
        { phase: "Fase 5 · Global", target: "Novos continentes", detail: "Expansão internacional com pagamentos locais e playbooks culturais." }
      ]
    },
    faqs: [
      { question: "Preciso ser VIP para usar?", answer: "Não, mas VIP remove a taxa de 15%, libera pedidos por IA e prioridade." },
      { question: "Provedor também ganha?", answer: "Sim. Ferramentas de autoaceite, itinerários por IA e alertas são exclusivas do VIP." },
      { question: "Como entrar?", answer: "Baixe o app, faça login e ative VIP na aba carteira. Cancele quando quiser." }
    ],
    legal: "Pedidos fora do VIP continuam com 15% de comissão. O VIP elimina essa taxa apenas para o assinante.",
    faqLabel: "Dúvidas frequentes",
    faqTitle: "Essenciais do VIP"
  },
  es: {
    hero: {
      badge: "VIP",
      title: "Dos VIP distintos para viajeros y proveedores",
      description: "Guidew cobra 15% en pedidos estándar. El VIP de viajeros (US$ 9,9/mes) elimina la comisión y agrega pedidos por IA; el VIP de proveedores (US$ 99/mes) ofrece autoaceptación, itinerarios IA y soporte automatizado.",
      cta: "Descargar Guidew",
      secondaryCta: "Ver hoja de ruta",
      note: "Viajeros VIP US$ 9,9/mes · Proveedores VIP US$ 99/mes · cancela cuando quieras.",
      languagesLabel: "Disponible en 6 idiomas",
      stackLabel: "Paquete VIP",
      stackTitle: "Membresías separadas"
    },
    traveler: {
      title: "VIP viajeros",
      description: "Por US$ 9,9/mes eliminas la comisión del 15%, describes necesidades por IA y recibes matching prioritario en Auckland y Wellington.",
      priceTag: "US$ 9,9 / mes",
      priceSubline: "Sin comisión · pedidos IA · prioridad",
      cta: "Activar VIP viajeros",
      benefits: [
        { title: "Sin comisión", detail: "Pagas únicamente la tarifa del proveedor; los 15% quedan cubiertos por la membresía." },
        { title: "Pedidos conversacionales", detail: "Habla en ES, EN, 中文, PT, FR o HE y la IA recomienda humanos verificados." },
        { title: "Prioridad", detail: "Tus solicitudes pasan al frente y reciben avisos de tránsito antes de cada servicio." },
        { title: "Billetera integrada", detail: "Propinas y reembolsos sin volver a ingresar tus datos." }
      ]
    },
    provider: {
      title: "VIP proveedores",
      description: "Invierte US$ 99/mes para aceptar pedidos automáticamente, crear itinerarios con IA y dejar que un asistente virtual responda consultas frecuentes.",
      priceTag: "US$ 99 / mes",
      priceSubline: "Autoaceptación · itinerarios IA · soporte IA",
      cta: "Actualizar VIP proveedores",
      benefits: [
        { title: "Autoaceptación", detail: "Filtros por agenda, zona y precio aseguran que solo apruebes pedidos relevantes." },
        { title: "Itinerarios IA", detail: "Planifica transporte, recordatorios y listas en segundos." },
        { title: "Soporte IA", detail: "Un concierge responde preguntas comunes y escala cuando la conversación exige humanos." },
        { title: "Alertas de traslado", detail: "Recibe avisos si el siguiente servicio queda demasiado lejos para llegar a tiempo." }
      ]
    },
    timeline: {
      title: "Hoja de ruta",
      description: "El VIP avanza por oleadas para sostener confianza, liquidez y soporte multilingüe.",
      milestones: [
        { phase: "Fase 1 · Lanzamiento", target: "Primera ola en Auckland/Wellington", detail: "Cientos de pioneros prueban el concierge bilingüe y las órdenes sin comisión." },
        { phase: "Fase 2 · Impulso", target: "Varios miles de testers", detail: "Pilotos más amplios habilitan filtros nuevos y automatizaciones." },
        { phase: "Fase 3 · Nacional", target: "Decenas de miles en Nueva Zelanda", detail: "Cobertura total con protección proactiva y niveles élite." },
        { phase: "Fase 4 · Cruce del Tasman", target: "Principales ciudades australianas", detail: "Sydney, Melbourne y Brisbane heredan la misma infraestructura VIP." },
        { phase: "Fase 5 · Global", target: "Más continentes", detail: "Despliegue internacional con pagos locales y manuales culturales." }
      ]
    },
    faqs: [
      { question: "¿Es obligatorio VIP?", answer: "No, pero elimina el 15%, habilita pedidos por IA y da prioridad." },
      { question: "¿Los proveedores ganan algo?", answer: "Sí, las herramientas de autoaceptación y planes con IA son exclusivas del VIP." },
      { question: "¿Cómo me uno?", answer: "Descarga la app, inicia sesión y activa VIP en la billetera; cancela cuando quieras." }
    ],
    legal: "Las órdenes sin VIP mantienen la tarifa del 15%; el beneficio solo aplica al suscriptor.",
    faqLabel: "Preguntas frecuentes",
    faqTitle: "Fundamentos del VIP"
  },
  fr: {
    hero: {
      badge: "VIP",
      title: "Deux offres VIP distinctes",
      description: "Guidew facture 15 % sur les commandes classiques. Le VIP voyageurs (9,9 $US/mois) supprime ces frais et ajoute les demandes IA ; le VIP prestataires (99 $US/mois) offre acceptation auto, itinéraires IA et support automatisé.",
      cta: "Télécharger Guidew",
      secondaryCta: "Voir la feuille de route",
      note: "VIP voyageurs 9,9 $US/mois · VIP prestataires 99 $US/mois · résiliable à tout moment.",
      languagesLabel: "Disponible en 6 langues",
      stackLabel: "Pack VIP",
      stackTitle: "Abonnements distincts"
    },
    traveler: {
      title: "VIP voyageurs",
      description: "Pour 9,9 $US/mois, supprimez les 15 % de commission, décrivez vos besoins à l'IA et obtenez un matching prioritaire à Auckland et Wellington.",
      priceTag: "9,9 $US / mois",
      priceSubline: "Zéro commission · demandes IA · priorité",
      cta: "Activer le VIP voyageurs",
      benefits: [
        { title: "Zéro commission", detail: "Vous ne payez que le tarif horaire du prestataire ; Guidew absorbe les 15 %." },
        { title: "Demandes conversationnelles", detail: "Décrivez en FR, EN, 中文, PT, ES ou HE et l'IA sélectionne les bons experts." },
        { title: "Priorité", detail: "Vos requêtes passent en tête et reçoivent des alertes trafic proactives." },
        { title: "Portefeuille connecté", detail: "Pourboires et remboursements sans ressaisir vos cartes." }
      ]
    },
    provider: {
      title: "VIP prestataires",
      description: "Pour 99 $US/mois, automatisez l'acceptation, générez des itinéraires avec IA et laissez un assistant virtuel répondre aux clients récurrents.",
      priceTag: "99 $US / mois",
      priceSubline: "Acceptation auto · itinéraires IA · support IA",
      cta: "Passer en VIP prestataire",
      benefits: [
        { title: "Acceptation automatiques", detail: "Filtres par agenda, zone et prix acceptent instantanément les missions pertinentes." },
        { title: "Itinéraires IA", detail: "Plans transport, rappels de certificats et checklists générés en quelques secondes." },
        { title: "Support IA", detail: "Un concierge virtuel répond aux questions fréquentes et vous alerte si nécessaire." },
        { title: "Alertes trajet", detail: "Soyez averti si le prochain service est trop éloigné pour arriver à l'heure." }
      ]
    },
    timeline: {
      title: "Feuille de route",
      description: "Le VIP se déploie par vagues pour équilibrer confiance, offre et support multilingue.",
      milestones: [
        { phase: "Phase 1 · Lancement", target: "Première vague à Auckland/Wellington", detail: "Quelques centaines de pionniers valident le concierge bilingue et les commandes sans commission." },
        { phase: "Phase 2 · Accélération", target: "Plusieurs milliers de testeurs", detail: "Pilotes élargis débloquent filtres avancés et automatisations." },
        { phase: "Phase 3 · National", target: "Dizaines de milliers en Nouvelle-Zélande", detail: "Couverture totale avec protection proactive et niveaux créateurs." },
        { phase: "Phase 4 · Pont trans-Tasman", target: "Grandes villes australiennes", detail: "Sydney, Melbourne et Brisbane reprennent la même infrastructure VIP." },
        { phase: "Phase 5 · Global", target: "Nouveaux continents", detail: "Déploiement international avec paiements locaux et guides culturels." }
      ]
    },
    faqs: [
      { question: "Le VIP est-il obligatoire ?", answer: "Non, mais il supprime les 15 %, débloque les demandes IA et la priorité." },
      { question: "Les prestataires en profitent-ils ?", answer: "Oui, l'auto-acceptation et les plans IA sont réservés aux VIP." },
      { question: "Comment rejoindre ?", answer: "Téléchargez l'app, connectez-vous puis activez VIP dans le portefeuille." }
    ],
    legal: "Les commandes hors VIP restent soumises à 15 % de commission. Le VIP supprime ces frais pour l'abonné.",
    faqLabel: "FAQ",
    faqTitle: "Notions clés VIP"
  },
  he: {
    hero: {
      badge: "חברות VIP",
      title: "שני מסלולי VIP נפרדים",
      description: "ב‑Guidew נגבית עמלת 15% בהזמנות רגילות. VIP למטיילים (‏$9.9 לחודש) מבטל את העמלה ומוסיף התאמות AI; VIP לספקים (‏$99 לחודש) מספק קבלה אוטומטית, מסלולי AI ותמיכת צ'אט אוטומטית.",
      cta: "הורידו את Guidew",
      secondaryCta: "צפו במפת הדרכים",
      note: "VIP למטיילים $9.9 לחודש · VIP לספקים $99 לחודש · ניתן לבטל בכל עת.",
      languagesLabel: "זמין ב‑6 שפות",
      stackLabel: "חבילת VIP",
      stackTitle: "חברויות נפרדות"
    },
    traveler: {
      title: "VIP למטיילים",
      description: "ב‑$9.9 לחודש מבטלים את עמלת ה‑15%, שולחים בקשות בשפה החביבה עליכם ומקבלים התאמות עם קדימות באוקלנד ובוולינגטון.",
      priceTag: "$9.9 / חודש",
      priceSubline: "ללא עמלה · בקשות AI · קדימות",
      cta: "הפעילו VIP למטיילים",
      benefits: [
        { title: "ללא עמלה", detail: "משלמים רק את מחיר השעה של הספק – Guidew מוותרת על 15%." },
        { title: "בקשות בשיחה", detail: "נסחו בעברית, אנגלית, 中文, פורטוגזית, ספרדית או צרפתית וה‑AI יביא אנשים אמינים." },
        { title: "התאמה עם קדימות", detail: "בקשות VIP מטופלות ראשונות וכוללות מעקב אחר זמני הגעה." },
        { title: "ארנק מחובר", detail: "טיפים, החזרים ושירותים משלימים ללא הקלדת הכרטיס מחדש." }
      ]
    },
    provider: {
      title: "VIP לספקים",
      description: "ב‑$99 לחודש מקבלים קבלה אוטומטית, תכנון מסלולים ב‑AI ומענה אוטומטי ללקוחות – כך אפשר להתרכז בשטח.",
      priceTag: "$99 / חודש",
      priceSubline: "קבלה אוטומטית · מסלולי AI · תמיכה אוטומטית",
      cta: "שדרגו ל‑VIP ספקים",
      benefits: [
        { title: "קבלה אוטומטית", detail: "חוקי זמינות, אזור ותעריף מאשרים עבודות נכונות מייד." },
        { title: "מסלולים ב‑AI", detail: "תכנון נסיעות, תזכורות להסמכות ורשימות ציוד תוך שניות." },
        { title: "תמיכת AI", detail: "קונסיירז' וירטואלי עונה לשאלות שחוזרות ומתריע כאשר צריך התערבות ידנית." },
        { title: "התראות מרחק", detail: "קבלו התרעה אם השירות הבא רחוק מדי כדי להגיע בזמן." }
      ]
    },
    timeline: {
      title: "מפת דרכים",
      description: "השקה מדורגת מאפשרת איזון בין אמון, היצע ותמיכה רב־לשונית.",
      milestones: [
        { phase: "שלב 1 · השקה", target: "הגל הראשון באוקלנד ווולינגטון", detail: "כמה מאות חלוצים בודקים קונסיירז' דו־לשוני והזמנות ללא עמלה." },
        { phase: "שלב 2 · האצה", target: "אלפי נסיינים", detail: "פיילוטים רחבים מוסיפים מסננים מתקדמים ואוטומציה בצ'אט." },
        { phase: "שלב 3 · ארצי", target: "עשרות אלפים ברחבי ניו זילנד", detail: "כיסוי מלא עם הגנות פרואקטיביות ומסלולי יוצרים." },
        { phase: "שלב 4 · מעבר לטסמן", target: "ערי מפתח באוסטרליה", detail: "סידני, מלבורן ובריסביין מאמצות את אותה שכבת VIP." },
        { phase: "שלב 5 · גלובלי", target: "יבשות נוספות", detail: "פריסה בינלאומית עם תשלומים מקומיים ומדריכי תרבות." }
      ]
    },
    faqs: [
      { question: "האם חייבים VIP?", answer: "לא, אך הוא מבטל את ה‑15%, פותח בקשות AI וקדימות." },
      { question: "גם נותני שירות נהנים?", answer: "כן, קבלה אוטומטית ותכנון ב‑AI מיועדים רק לחברי VIP." },
      { question: "איך מצטרפים?", answer: "הורידו את האפליקציה, התחברו והפעילו VIP בכרטיסיית הארנק." }
    ],
    legal: "עסקאות ללא VIP נשארות עם עמלה של 15%. החיסכון מיועד רק למנוי הפעיל.",
    faqLabel: "שאלות נפוצות",
    faqTitle: "עיקרי ה‑VIP"
  }
};

const Vip = () => {
  const { i18n } = useTranslation();
  const { openDownloadDialog } = useDownloadDialog();
  const locale = getVipLocale(i18n.language);
  const content = vipCopy[locale];

  const travelerIconMap = useMemo(() => [Sparkles, MessageCircle, Zap, CheckCircle2], []);
  const providerIconMap = useMemo(() => [ShieldCheck, Zap, CalendarClock, CheckCircle2], []);
  const heroProducts = useMemo(
    () =>
      [
        {
          ...content.traveler,
          icon: Sparkles as LucideIcon,
          accent: "text-brand-teal"
        },
        {
          ...content.provider,
          icon: ShieldCheck as LucideIcon,
          accent: "text-brand-darkBlue"
        }
      ],
    [content]
  );

  return (
    <div className="bg-gradient-to-b from-white via-brand-lightGray/30 to-white min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="uppercase tracking-[0.3em] text-brand-teal text-sm font-semibold">
              {content.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mt-4 mb-4">
              {content.hero.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{content.hero.description}</p>
            <p className="text-2xl font-semibold text-brand-darkBlue">{content.hero.priceTag}</p>
            <p className="text-sm text-gray-500 mb-8">{content.hero.priceSubline}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={openDownloadDialog} className="h-12 px-6 bg-brand-teal hover:bg-brand-teal/90 text-base">
                {content.hero.cta}
              </Button>
              <Button variant="secondary" className="h-12 px-6" asChild>
                <a href="#timeline">{content.hero.secondaryCta}</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <Languages className="h-5 w-5 text-brand-teal" />
              <span>{content.hero.languagesLabel}</span>
              <span className="text-gray-400">•</span>
              <span>{content.hero.note}</span>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-brand-teal">{content.hero.stackLabel}</p>
                <h3 className="text-2xl font-semibold">{content.hero.stackTitle}</h3>
              </div>
              <Sparkles className="text-brand-orange" />
            </div>
            <div className="space-y-6">
              {heroProducts.map(product => {
                const Icon = product.icon;
                return (
                  <div key={product.title} className="border border-slate-100 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-brand-darkBlue/70">{product.title}</p>
                        <p className="text-xl font-semibold text-brand-darkBlue">{product.priceTag}</p>
                        <p className="text-sm text-gray-500">{product.priceSubline}</p>
                      </div>
                      <div className={`h-10 w-10 rounded-2xl bg-brand-lightGray/60 flex items-center justify-center ${product.accent}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      {product.benefits.slice(0, 2).map(benefit => (
                        <div key={benefit.title} className="rounded-xl bg-brand-lightGray/40 p-3">
                          <p className="text-sm font-semibold text-brand-darkBlue">{benefit.title}</p>
                          <p className="text-xs text-gray-600">{benefit.detail}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-brand-teal hover:bg-brand-teal/90" onClick={openDownloadDialog}>
                      {product.cta}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-brand-teal" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-teal/70">{content.traveler.title}</p>
                <h2 className="text-2xl font-semibold">{content.traveler.description}</h2>
              </div>
            </div>
            <p className="text-xl font-semibold text-brand-darkBlue">{content.traveler.priceTag}</p>
            <p className="text-sm text-gray-500 mb-4">{content.traveler.priceSubline}</p>
            <Button className="mb-6 bg-brand-teal hover:bg-brand-teal/90" onClick={openDownloadDialog}>
              {content.traveler.cta}
            </Button>
            <div className="space-y-4">
              {content.traveler.benefits.map(benefit => (
                <div key={benefit.title} className="border border-brand-teal/10 rounded-2xl p-4">
                  <p className="font-semibold text-brand-darkBlue">{benefit.title}</p>
                  <p className="text-sm text-gray-600">{benefit.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-brand-darkBlue" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-darkBlue/70">{content.provider.title}</p>
                <h2 className="text-2xl font-semibold">{content.provider.description}</h2>
              </div>
            </div>
            <p className="text-xl font-semibold text-brand-darkBlue">{content.provider.priceTag}</p>
            <p className="text-sm text-gray-500 mb-4">{content.provider.priceSubline}</p>
            <Button className="mb-6 bg-brand-darkBlue hover:bg-brand-darkBlue/90" onClick={openDownloadDialog}>
              {content.provider.cta}
            </Button>
            <div className="space-y-4">
              {content.provider.benefits.map((benefit, index) => {
                const Icon = providerIconMap[index % providerIconMap.length];
                return (
                  <div key={benefit.title} className="flex gap-4 border border-brand-darkBlue/10 rounded-2xl p-4">
                    <div className="h-10 w-10 rounded-2xl bg-brand-darkBlue/10 flex items-center justify-center text-brand-darkBlue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-darkBlue">{benefit.title}</p>
                      <p className="text-sm text-gray-600">{benefit.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="timeline" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal">{content.timeline.title}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-darkBlue">{content.timeline.description}</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {content.timeline.milestones.map(milestone => (
              <div key={milestone.phase} className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 space-y-3">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-orange">{milestone.phase}</p>
                <h3 className="text-xl font-semibold text-brand-darkBlue">{milestone.target}</h3>
                <p className="text-sm text-gray-600">{milestone.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal">{content.faqLabel}</p>
            <h2 className="text-3xl font-semibold text-brand-darkBlue">{content.faqTitle}</h2>
          </div>
          <div className="space-y-6">
            {content.faqs.map(item => (
              <div key={item.question} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <p className="font-semibold text-lg text-brand-darkBlue">{item.question}</p>
                <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-6 text-center">{content.legal}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Vip;
