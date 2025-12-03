import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";
import {
  Sparkles,
  ShieldCheck,
  Languages,
  type LucideIcon
} from "lucide-react";

const vipLocales = ["en", "zh", "pt", "es", "fr", "he", "mi"] as const;
type VipLocale = (typeof vipLocales)[number];

type VipBenefit = {
  title: string;
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
    note: string;
    languagesLabel: string;
    stackLabel: string;
    stackTitle: string;
    priceTag: string;
    priceSubline: string;
  };
  traveler: VipProductDetail;
  provider: VipProductDetail;
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
      note: "Traveler VIP $9.9/mo · Provider VIP $99/mo · Cancel anytime.",
      languagesLabel: "Available in 6 languages",
      stackLabel: "VIP stack",
      stackTitle: "Separate memberships",
      priceTag: "$9.9/mo · $99/mo",
      priceSubline: "Travelers waive 15% fees · Providers unlock automation"
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
      note: "用户 VIP $9.9/月 · 服务者 VIP $99/月 · 随时可退。",
      languagesLabel: "支持 6 种语言",
      stackLabel: "VIP 组合",
      stackTitle: "双会员体系",
      priceTag: "$9.9/月 · $99/月",
      priceSubline: "用户免 15% 佣金 · 服务者获自动化与 AI 支持"
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
      note: "VIP viajante US$ 9,9/mês · VIP provedor US$ 99/mês · cancele quando quiser.",
      languagesLabel: "Disponível em 6 idiomas",
      stackLabel: "Pacote VIP",
      stackTitle: "Assinaturas distintas",
      priceTag: "US$ 9,9/mês · US$ 99/mês",
      priceSubline: "Usuários sem 15% · provedores com automação e alertas"
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
      note: "Viajeros VIP US$ 9,9/mes · Proveedores VIP US$ 99/mes · cancela cuando quieras.",
      languagesLabel: "Disponible en 6 idiomas",
      stackLabel: "Paquete VIP",
      stackTitle: "Membresías separadas",
      priceTag: "US$ 9,9/mes · US$ 99/mes",
      priceSubline: "Viajeros sin 15% · proveedores con automatización"
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
      note: "VIP voyageurs 9,9 $US/mois · VIP prestataires 99 $US/mois · résiliable à tout moment.",
      languagesLabel: "Disponible en 6 langues",
      stackLabel: "Pack VIP",
      stackTitle: "Abonnements distincts",
      priceTag: "9,9 $US/mois · 99 $US/mois",
      priceSubline: "Voyageurs sans 15 % · prestataires avec automatisation"
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
      note: "VIP למטיילים $9.9 לחודש · VIP לספקים $99 לחודש · ניתן לבטל בכל עת.",
      languagesLabel: "זמין ב‑6 שפות",
      stackLabel: "חבילת VIP",
      stackTitle: "חברויות נפרדות",
      priceTag: "$9.9 · $99 לחודש",
      priceSubline: "מטיילים בלי 15% · ספקים עם אוטומציה ו-AI"
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
    faqs: [
      { question: "האם חייבים VIP?", answer: "לא, אך הוא מבטל את ה‑15%, פותח בקשות AI וקדימות." },
      { question: "גם נותני שירות נהנים?", answer: "כן, קבלה אוטומטית ותכנון ב‑AI מיועדים רק לחברי VIP." },
      { question: "איך מצטרפים?", answer: "הורידו את האפליקציה, התחברו והפעילו VIP בכרטיסיית הארנק." }
    ],
    legal: "עסקאות ללא VIP נשארות עם עמלה של 15%. החיסכון מיועד רק למנוי הפעיל.",
    faqLabel: "שאלות נפוצות",
    faqTitle: "עיקרי ה‑VIP"
  },

  mi: {
    hero: {
      badge: "Nga mema VIP",
      title: "E rua nga arahanga VIP mo nga kaihaere me nga kaiwhakarato",
      description:
        "Ko te kaiarahi i te Komihana 15% mo nga pukapuka paerewa. Ko te Vip Theaw ($ 9.9 / Mo) Tango me te taapiri i te AI e rite ana ki te kaiwhakarato AI, $ 99 / Momathery, whakamaherea papaaho, me te tautoko i nga korero.",
      cta: "Tikiake Aratohu",
      note: "Rererangi Vip $ 9.9 / Mo · kaiwhakarato VIP $ 99 / Mo · Whakakore i nga wa katoa.",
      languagesLabel: "E waatea ana i roto i nga reo 6",
      stackLabel: "Whakaputanga VIP",
      stackTitle: "Nga mema motuhake",
      priceTag: "$ 9.9 / Mo · $ 99 / Mo",
      priceSubline: "Ka haere nga kaihaere i te 15% utu me te iriti i te aukau"
    },
    traveler: {
      title: "VIP haere",
      description: "Utu $ 9.9 / marama ki te whakarere i te 15% utu utu, korerorero ki a Ai Converiers, me te kawe i nga huarahi matua puta noa i Akarana me Poneke.",
      priceTag: "$ 9.9 / Marama",
      priceSubline: "Kaore he utu mo te utu mo te utu",
      cta: "Whakahohe i te VIP TINO",
      benefits: [
        { title: "Kaore he 15% utu utu", detail: "Ko te VIP haere a VIP te tango i te Komihana a Guidew na reira ka utua e koe anake te utu o te kaiwhakarato." },
        { title: "AI tono whakawhitiwhiti korero", detail: "Whakaahuahia o hiahia ki tetahi reo e tautokohia ana ka whiwhi tonu i nga whakataetae whakaipoipo." },
        { title: "Te Whakataetae Motuhake", detail: "Ka peke atu nga tono VIP i te waa me te aro turuki i te waa taenga mai." },
        { title: "Pōro hono", detail: "Tukuna he tohutohu, hapai i nga moni whakahoki, ka taapirihia nga UPSells me te kore e whakauru i nga korero utu." }
      ]
    },
    provider: {
      title: "Kaiwhakarato VIP",
      description: "Whakanohia te $ 99 / marama ki te tango i te Whakaaetanga Whakatau, Whakahaerehia te whakamahere i te wa, me te whakahoki i te kiritaki i te AI i te wa e noho ana koe.",
      priceTag: "$ 99 / Marama",
      priceSubline: "Whakaaetia-Aunoa · AI Mahere Whakatika i te wahanga · AI Kaihoko",
      cta: "Whakahoutanga VIP",
      benefits: [
        { title: "Nga ture-auto", detail: "Ko nga whiriwhiringa o nga whiriwhiringa e kaha ana ki te whakaae i nga mahi e tika ana kia kore rawa koe e ngaro i nga ota uara." },
        { title: "AI kaihanga i te wa", detail: "Hangaia mahere-a-waho, whakamaharatanga tiwhikete, me nga raarangi arowhai taputapu i roto i te hēkona." },
        { title: "AI Auto Tautoko-Tautoko", detail: "He kaiwhakawhiti AI whakautu ki nga whakawhitinga a nga kaihoko maha ka piki haere anake ka hiahiatia." },
        { title: "Ko nga tohu tohu a te haerenga", detail: "Ka whakatupato koe i nga taputapu VIP i te wa e pa ana te mahi i muri mai kia mau tonu ai koe i te tatauranga tika." }
      ]
    },
    faqs: [
      { question: "Kei te hiahiatia te VIP ki te pukapuka?", answer: "Kaore. Ko tetahi kaiwhakamahi kua rēhitatia ka taea e ia nga pukapuka pukapuka, engari ka tangohia e te VIP te utu 15%, ka tono i nga tono AI, me te tuku i nga tohu matua." },
      { question: "Ka awhina ano a VIP ki nga kaiwhakarato?", answer: "Ae. Ka whakamahia e nga kaiwhakarato te tango-aunoa, te waihanga i te wa whakarite, me nga tohu matohera-i rahuitia mo nga kaihanga Vip." },
      { question: "Me pehea taku hono atu?", answer: "Tap te paatene Tikiake, Waitohu, ka whakahohe i te VIP mai i te ripa Wantlet. He marama te nama me te whakakore i nga waa katoa." }
    ],
    legal: "Kei te tohe tonu te Arataki ki te utu 15% o nga whakawhitinga kore-Vip. Ka tangohia e Vip tenei utu mo te kaihauturu i te wa e utu tonu ana nga kaiwhakarato.",
    faqLabel: "FQ",
    faqTitle: "Kaupapa VIP"
  },};

const Vip = () => {
  const { i18n } = useTranslation();
  const { openDownloadDialog } = useDownloadDialog();
  const locale = getVipLocale(i18n.language);
  const content = vipCopy[locale];

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
