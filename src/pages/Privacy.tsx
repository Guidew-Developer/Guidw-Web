import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const privacyLocales = ["en", "zh", "es", "pt", "fr", "he", "mi"] as const;
type PrivacyLocale = (typeof privacyLocales)[number];

type PrivacySection = {
  title: string;
  content: string[];
};

type PrivacyCopy = {
  badge: string;
  title: string;
  description: string;
  sections: PrivacySection[];
  footerTitle: string;
  footerDescription: string;
  lastUpdated: string;
};

const supportedPrivacyLocales = new Set<PrivacyLocale>(privacyLocales);

const getPrivacyLocale = (language?: string): PrivacyLocale => {
  if (!language) {
    return "en";
  }
  const normalized = language.split("-")[0]?.toLowerCase() as PrivacyLocale | undefined;
  if (normalized && supportedPrivacyLocales.has(normalized)) {
    return normalized;
  }
  return "en";
};

const privacyCopy: Record<PrivacyLocale, PrivacyCopy> = {
  en: {
    badge: "Privacy Policy",
    title: "Guidew Privacy Policy",
    description:
      "We draw on globally recognized privacy practices and tailor them to Guidew’s hybrid of travel coordination and in-person expertise. This policy describes the data we collect, why we use it, and the rights you can exercise.",
    sections: [
      {
        title: "1. Scope",
        content: [
          "This policy covers guidew.com, the Guidew app, APIs, offline verification, customer support, and any tools that connect travelers with local experts. By accessing or using our services, you acknowledge that this privacy policy applies to you."
        ]
      },
      {
        title: "2. Data we collect",
        content: [
          "Account & identity: name, profile photo, contact details, login credentials, language preferences, payment accounts, and for providers, professional licenses, insurance, and background checks.",
          "Trips & location: GPS, cell, or Wi-Fi signals plus requested itineraries, pickup / drop-off points, timestamps, and routes to match nearby providers and support safety features.",
          "Transactions & interactions: order history, chat transcripts, recordings, uploaded media, ratings, support tickets, and dispute evidence for risk monitoring and customer care.",
          "Device & usage: device model, OS, browser, network, app version, crash logs, and interaction data to improve performance and prevent fraud.",
          "Third-party sources: payment processors, identity-verification vendors, public databases, or social accounts (with permission) to comply with legal obligations and enhance safety."
        ]
      },
      {
        title: "3. How we use data",
        content: [
          "Deliver and improve services: register accounts, match requests, send reminders, draft agreements, settle payouts, and train AI assistants.",
          "Trust & safety: perform KYC, AML checks, background screening, live risk monitoring, emergency support, insurance filings, and investigations of suspicious activity.",
          "Communication & support: send trip updates, surveys, policy alerts, and relevant marketing which you can opt out of at any time.",
          "Research & compliance: analyze aggregated data for product insights and fulfill tax, regulatory, or auditing requirements."
        ]
      },
      {
        title: "4. How we share data",
        content: [
          "Between users and providers: once a booking is confirmed, both parties can view the information needed to complete the engagement.",
          "Vendors & partners: cloud hosting, payments, identity verification, navigation, risk, and marketing vendors get only the minimum data required under contractual safeguards.",
          "Business transitions: if Guidew enters a merger, investment, or asset transfer, personal data may be transferred but will remain protected by this policy.",
          "Legal requests: we may disclose information when required by law or to protect Guidew, our users, or the public."
        ]
      },
      {
        title: "5. Cross-border transfers",
        content: [
          "Guidew infrastructure operates globally, so your data may be processed outside your country. We rely on contractual clauses, encryption, or other safeguards to protect cross-border transfers."
        ]
      },
      {
        title: "6. Cookies and similar technology",
        content: [
          "We use cookies, pixels, SDKs, and local storage to remember preferences, keep you signed in, measure campaigns, and block suspicious traffic. You may adjust browser or device settings, though some features may not function optimally."
        ]
      },
      {
        title: "7. Retention and deletion",
        content: [
          "We keep data only as long as needed for the purpose it was collected. Trip and tax records often remain for 7 years; compliance or dispute data might be retained longer.",
          "When you request deletion or account closure, we verify your identity and process the request while isolating any data we must keep for legal reasons until the retention period expires."
        ]
      },
      {
        title: "8. Security",
        content: [
          "Guidew uses encryption, access controls, least-privilege design, audit logs, intrusion detection, secure coding, and regular penetration testing.",
          "If a data incident occurs, we will notify affected users and regulators as required and provide remediation guidance."
        ]
      },
      {
        title: "9. Your rights and choices",
        content: [
          "Manage your profile, download a copy of your data, update payment methods, adjust push or marketing preferences, and revoke location or contact permissions through the app or by contacting us.",
          "Certain records (e.g., ride receipts or dispute transcripts) may be retained to meet regulatory requirements; if we cannot complete a request, we will explain why."
        ]
      },
      {
        title: "10. Children & teens",
        content: [
          "Guidew is designed for adults. We do not knowingly collect data from minors under 18. If you believe a minor has provided data, contact us and we will take appropriate action."
        ]
      },
      {
        title: "11. Policy updates",
        content: [
          "We may modify this policy as our services or laws evolve. We will post the effective date at the top of this page and notify you in-app or via email about material changes."
        ]
      },
      {
        title: "12. Contact us",
        content: [
          "Privacy questions: privacy@guidew.com",
          "Data Protection Officer: dpo@guidew.com (Guidew Pte. Ltd., 8 Marina Boulevard, #05-02, Singapore 018981)",
          "If you reside in the EU, UK, or another jurisdiction with a data authority, you can contact them or file a complaint with us; we respond within 30 days."
        ]
      }
    ],
    footerTitle: "How do we handle privacy requests?",
    footerDescription:
      "Submit requests via privacy@guidew.com or through in-app support. We respond within 30 days and will let you know if verification or extra time is required.",
    lastUpdated: "Last updated: 6 June 2025"
  },
  zh: {
    badge: "隐私政策",
    title: "Guidew 隐私政策",
    description:
      "我们参考行业领先平台的隐私实践，并根据 Guidew 的旅行与本地技能场景做出适配。本政策说明我们收集哪些数据、为何使用以及您可以行使的权利。",
    sections: [
      {
        title: "一、政策适用范围",
        content: [
          "本政策适用于 guidew.com、Guidew App、API、客服、线下验证流程以及任何连接用户与服务者的技术工具。访问或使用这些服务即表示您接受本隐私政策。"
        ]
      },
      {
        title: "二、我们收集的数据",
        content: [
          "账号与身份：姓名、头像、联系方式、登录凭据、语言偏好、支付账户，服务者还需提供职业资质、保险及背景审查结果。",
          "行程与位置：经授权后收集 GPS、基站或 Wi-Fi 信息，以及行程起止点、请求时间、路线，用于匹配资源与保障安全。",
          "交易与互动：订单记录、聊天内容、录音、上传的媒体、评价、客服与争议信息，用于风控与客服支持。",
          "设备与使用：设备型号、操作系统、浏览器、网络、APP 版本、崩溃日志与交互数据，用于性能优化及防欺诈。",
          "第三方来源：为合规或安全目的，我们可能从支付机构、身份验证服务商、公共数据库或经您授权的社交平台获取补充信息。"
        ]
      },
      {
        title: "三、我们如何使用数据",
        content: [
          "提供与优化服务：注册账号、撮合行程、发送提醒、生成协议、结算收入，并训练匹配算法与 AI 助理。",
          "信任与安全：执行 KYC、反洗钱审查、背景调查、风险监测、紧急支援、保险报备与可疑行为调查。",
          "沟通与支持：推送订单更新、调查问卷、政策通知及可退订的营销信息。",
          "研究与合规：使用匿名化数据进行产品分析，并满足税务、监管或审计要求。"
        ]
      },
      {
        title: "四、我们如何共享数据",
        content: [
          "用户与服务者：订单确认后会互相展示履约所需的资料、评分、行程与联系方式。",
          "供应商与合作伙伴：云服务、支付、身份验证、导航、风控和营销服务商仅在签署保密协议后获取必要数据。",
          "业务变更：若发生并购、投资或资产转移，个人信息可能转移但仍受本政策保护。",
          "法律要求：根据法律、法院或监管要求，或为保护 Guidew、用户及公众安全，我们可能披露信息。"
        ]
      },
      {
        title: "五、跨境传输",
        content: [
          "Guidew 在全球部署基础设施，您的数据可能在所在国以外处理。我们会使用合同条款、加密等方式保障跨境传输的安全与合规。"
        ]
      },
      {
        title: "六、Cookies 与类似技术",
        content: [
          "我们使用 Cookies、像素、SDK 与本地存储来记住偏好、保持登录、衡量广告与阻止异常流量。您可在浏览器或设备中自行管理，但某些功能可能受限。"
        ]
      },
      {
        title: "七、数据保留与删除",
        content: [
          "我们仅在实现目的所需的最短时间内保留数据。行程与税务记录通常保存 7 年，合规或争议相关数据可能更久。",
          "当您申请删除或注销时，我们会验证身份并处理请求；需依法保留的部分将被隔离，期限届满后安全删除或匿名化。"
        ]
      },
      {
        title: "八、信息安全",
        content: [
          "Guidew 采用加密传输、分级权限、日志审计、入侵检测、安全培训与定期渗透测试等措施保护数据。",
          "若发生数据事件，我们会按法规要求通知受影响用户与监管机构，并提供整改建议。"
        ]
      },
      {
        title: "九、您的权利与选择",
        content: [
          "您可在 App 或联系客服，查看/更正资料、下载数据副本、调整支付方式、管理推送与营销偏好、撤回定位或通讯录权限。",
          "因法规需保留的记录（如行程单、争议材料）可能无法删除；若请求无法完成，我们会说明原因。"
        ]
      },
      {
        title: "十、儿童与青少年",
        content: [
          "Guidew 面向成年人，不主动收集 18 岁以下未成年人的信息。如发现未成年人提供数据，请联系我们以便采取措施。"
        ]
      },
      {
        title: "十一、政策更新",
        content: [
          "当业务或法律变化时，我们会更新本政策并在页面顶部注明生效日期，同时通过 App 或电子邮件发送重要通知。"
        ]
      },
      {
        title: "十二、联系我们",
        content: [
          "隐私邮箱：privacy@guidew.com",
          "数据保护官：dpo@guidew.com（Guidew Pte. Ltd., 8 Marina Boulevard, #05-02, Singapore 018981）",
          "如您位于欧盟、英国等地区，也可联系当地监管机构或向我们投诉，我们将在 30 天内回复。"
        ]
      }
    ],
    footerTitle: "我们如何响应您的隐私请求？",
    footerDescription: "请通过 privacy@guidew.com 或 App 内客服提交，我们将在 30 天内回复，如需额外验证或延长期限会另行说明。",
    lastUpdated: "最近更新：2025 年 6 月 6 日"
  },
  es: {
    badge: "Política de privacidad",
    title: "Política de privacidad de Guidew",
    description:
      "Nos inspiramos en políticas de privacidad reconocidas en la industria y las adaptamos al modelo híbrido de viajes y experiencias locales de Guidew. Aquí explicamos qué datos recopilamos, cómo los usamos y qué derechos tiene usted.",
    sections: [
      {
        title: "1. Alcance",
        content: [
          "Esta política cubre guidew.com, la app de Guidew, APIs, verificación fuera de línea, atención al cliente y cualquier herramienta que conecte a usuarios con proveedores. Al usar nuestros servicios, reconoce que esta política se aplica a usted."
        ]
      },
      {
        title: "2. Datos que recopilamos",
        content: [
          "Cuenta e identidad: nombre, foto, datos de contacto, credenciales de inicio de sesión, idioma, cuentas de pago y, para proveedores, licencias, seguros y verificaciones.",
          "Viajes y ubicación: señales GPS, de red celular o Wi-Fi, así como rutas, puntos de partida y llegada para emparejar a proveedores cercanos y habilitar funciones de seguridad.",
          "Transacciones e interacciones: historial de pedidos, chats, grabaciones, archivos subidos, calificaciones, tickets de soporte y material de disputas.",
          "Dispositivo y uso: modelo, sistema operativo, navegador, red, versión de la app, registros de fallos e interacción para mejorar el rendimiento y prevenir fraudes.",
          "Fuentes de terceros: procesadores de pago, servicios de verificación de identidad, bases de datos públicas o redes sociales (con su permiso) para cumplir obligaciones legales."
        ]
      },
      {
        title: "3. Cómo usamos los datos",
        content: [
          "Proporcionar y mejorar servicios: registrar cuentas, emparejar solicitudes, enviar recordatorios, generar contratos y liquidar pagos.",
          "Confianza y seguridad: KYC, revisiones AML, monitoreo en tiempo real, soporte de emergencia, informes de seguros e investigaciones.",
          "Comunicación y soporte: enviar actualizaciones, encuestas, avisos normativos y marketing opcional.",
          "Investigación y cumplimiento: analizar datos agregados y cumplir obligaciones fiscales o regulatorias."
        ]
      },
      {
        title: "4. Cómo compartimos los datos",
        content: [
          "Entre usuarios y proveedores: después de confirmar un pedido, ambos acceden a la información necesaria para cumplir el servicio.",
          "Proveedores y socios: alojamiento en la nube, pagos, verificación, mapas, riesgo y marketing solo reciben los datos mínimos bajo acuerdos de confidencialidad.",
          "Transacciones corporativas: en fusiones o ventas de activos, la información personal puede transferirse pero seguirá protegida.",
          "Requerimientos legales: podemos revelar datos cuando la ley lo exija o para proteger a Guidew, a los usuarios o al público."
        ]
      },
      {
        title: "5. Transferencias internacionales",
        content: [
          "Guidew opera infraestructura global y puede procesar datos fuera de su país. Usamos cláusulas contractuales estándar, cifrado u otras salvaguardas para proteger dichas transferencias."
        ]
      },
      {
        title: "6. Cookies y tecnologías similares",
        content: [
          "Usamos cookies, píxeles, SDK y almacenamiento local para recordar preferencias, mantener la sesión, medir campañas y bloquear tráfico sospechoso. Puede ajustar la configuración, aunque algunas funciones podrían verse afectadas."
        ]
      },
      {
        title: "7. Conservación y eliminación",
        content: [
          "Mantenemos los datos solo el tiempo necesario para cumplir su finalidad. Los registros de viajes y fiscales suelen conservarse durante 7 años; las investigaciones pueden requerir más tiempo.",
          "Si solicita eliminar datos o cerrar la cuenta, verificaremos su identidad y procesaremos la petición, aislando los datos que debamos retener legalmente."
        ]
      },
      {
        title: "8. Seguridad",
        content: [
          "Guidew aplica cifrado, controles de acceso, registros de auditoría, detección de intrusiones y pruebas de penetración periódicas.",
          "Si ocurre un incidente de seguridad, avisaremos a los usuarios y autoridades según lo requiera la ley y facilitaremos orientaciones."
        ]
      },
      {
        title: "9. Sus derechos y opciones",
        content: [
          "Desde la app o soporte puede revisar / corregir datos, descargar copias, actualizar métodos de pago, gestionar notificaciones y revocar permisos.",
          "Algunos registros (p.ej., recibos o disputas) pueden mantenerse por exigencias regulatorias; si no podemos cumplir una solicitud, lo explicaremos."
        ]
      },
      {
        title: "10. Menores",
        content: [
          "Guidew se dirige a adultos y no recopila intencionalmente datos de menores de 18 años. Si detecta que un menor nos envió datos, contáctenos."
        ]
      },
      {
        title: "11. Actualizaciones de la política",
        content: [
          "Podemos modificar esta política conforme evolucionen los servicios o las leyes. Indicaremos la fecha de vigencia y notificaremos los cambios importantes."
        ]
      },
      {
        title: "12. Contacto",
        content: [
          "Privacidad: privacy@guidew.com",
          "Delegado de protección de datos: dpo@guidew.com (Guidew Pte. Ltd., 8 Marina Boulevard, #05-02, Singapore 018981)",
          "Si reside en la UE, Reino Unido u otra jurisdicción, también puede contactar a la autoridad local o presentar una queja con nosotros; respondemos en 30 días."
        ]
      }
    ],
    footerTitle: "¿Cómo respondemos a sus solicitudes de privacidad?",
    footerDescription:
      "Envíe solicitudes a privacy@guidew.com o mediante la app. Respondemos en 30 días e informaremos si necesitamos más verificación o tiempo.",
    lastUpdated: "Última actualización: 6 de junio de 2025"
  },
  pt: {
    badge: "Política de Privacidade",
    title: "Política de privacidade da Guidew",
    description:
      "Inspiramo-nos em práticas de privacidade reconhecidas no setor e as adaptamos ao ecossistema híbrido de viagens e experiências locais da Guidew. Esta política explica quais dados coletamos, por que os usamos e quais direitos você possui.",
    sections: [
      {
        title: "1. Escopo",
        content: [
          "Cobre o site guidew.com, o aplicativo, APIs, verificações presenciais, suporte e qualquer ferramenta que conecte usuários a prestadores. Ao usar os serviços, você aceita esta política."
        ]
      },
      {
        title: "2. Dados coletados",
        content: [
          "Conta e identidade: nome, foto, contato, credenciais, idioma, contas de pagamento e, para prestadores, licenças, seguros e verificações.",
          "Viagens e localização: sinais GPS, de rede ou Wi-Fi, rotas e horários para combinar prestadores próximos e garantir segurança.",
          "Transações e interações: histórico de pedidos, chats, gravações, mídias, avaliações e registros de suporte.",
          "Dispositivo e uso: modelo, sistema, navegador, rede, versão do app e logs para otimizar desempenho e prevenir fraudes.",
          "Fontes de terceiros: processadores de pagamento, serviços de verificação ou bases públicas (com autorização)."
        ]
      },
      {
        title: "3. Uso dos dados",
        content: [
          "Entregar e aprimorar serviços: registrar contas, combinar pedidos, enviar lembretes, gerar contratos e processar pagamentos.",
          "Confiança e segurança: KYC, AML, monitoramento ativo, suporte emergencial e investigações.",
          "Comunicação e suporte: atualizações, pesquisas, alertas regulatórios e marketing opcional.",
          "Pesquisa e conformidade: análise agregada e cumprimento de obrigações fiscais ou regulatórias."
        ]
      },
      {
        title: "4. Compartilhamento",
        content: [
          "Entre usuários e prestadores: após a confirmação, ambos veem as informações necessárias para cumprir o serviço.",
          "Parceiros: nuvem, pagamentos, verificação, mapas, risco e marketing recebem apenas dados mínimos sob contratos.",
          "Transações empresariais: em fusões ou vendas, os dados continuam protegidos por esta política.",
          "Exigências legais: podemos divulgar dados para cumprir a lei ou proteger a Guidew, usuários e o público."
        ]
      },
      {
        title: "5. Transferências internacionais",
        content: [
          "Operamos infraestrutura global e podemos processar dados fora do seu país. Utilizamos cláusulas contratuais, criptografia e outras salvaguardas."
        ]
      },
      {
        title: "6. Cookies e tecnologias similares",
        content: [
          "Cookies, pixels, SDKs e armazenamento local mantêm preferências, sessões e métricas de campanhas. Você pode ajustar configurações, mas alguns recursos podem ser afetados."
        ]
      },
      {
        title: "7. Retenção e exclusão",
        content: [
          "Manteremos os dados pelo tempo necessário para cumprir a finalidade. Registros de viagens e impostos normalmente ficam por 7 anos.",
          "Ao solicitar exclusão ou encerramento da conta, verificamos sua identidade e isolamos dados que devam ser preservados por lei."
        ]
      },
      {
        title: "8. Segurança",
        content: [
          "Aplicamos criptografia, controle de acesso, auditoria, detecção de intrusão e testes periódicos.",
          "Em caso de incidente, notificamos usuários e autoridades conforme exigido."
        ]
      },
      {
        title: "9. Direitos e escolhas",
        content: [
          "Gerencie perfis, baixe dados, atualize formas de pagamento, configure notificações e revogue permissões pelo app ou suporte.",
          "Alguns registros podem ser retidos por obrigação legal; explicaremos se não pudermos atender a um pedido."
        ]
      },
      {
        title: "10. Crianças e adolescentes",
        content: [
          "A Guidew é destinada a adultos e não coleta intencionalmente dados de menores de 18 anos. Avise-nos se perceber o contrário."
        ]
      },
      {
        title: "11. Atualizações",
        content: [
          "Podemos atualizar esta política; indicaremos a data de vigência e enviaremos avisos importantes."
        ]
      },
      {
        title: "12. Contato",
        content: [
          "Privacidade: privacy@guidew.com",
          "DPO: dpo@guidew.com (Guidew Pte. Ltd., 8 Marina Boulevard, #05-02, Singapore 018981)",
          "Se estiver na UE, Reino Unido ou em outra jurisdição com autoridade de dados, também pode contatá-la. Respondemos em 30 dias."
        ]
      }
    ],
    footerTitle: "Como respondemos às solicitações de privacidade?",
    footerDescription:
      "Envie pedidos para privacy@guidew.com ou pelo app. Respondemos em até 30 dias e informamos se precisarmos de mais verificação ou tempo.",
    lastUpdated: "Última atualização: 6 de junho de 2025"
  },
  fr: {
    badge: "Politique de confidentialité",
    title: "Politique de confidentialité Guidew",
    description:
      "Nous nous inspirons de politiques de confidentialité reconnues et les adaptons à la combinaison voyages + expertise locale de Guidew. Cette page détaille les données collectées, l’usage que nous en faisons et vos droits.",
    sections: [
      {
        title: "1. Champ d’application",
        content: [
          "Cette politique couvre guidew.com, l’application, les API, les vérifications hors ligne et le support. En utilisant nos services, vous acceptez qu’elle s’applique à vous."
        ]
      },
      {
        title: "2. Données collectées",
        content: [
          "Compte et identité : nom, photo, coordonnées, identifiants, langue, comptes de paiement, ainsi que licences et assurances pour les prestataires.",
          "Trajets et localisation : signaux GPS/cellulaire/Wi-Fi, itinéraires et horaires afin d’associer les prestataires proches et de garantir la sécurité.",
          "Transactions et interactions : historique des commandes, discussions, enregistrements, médias, évaluations et échanges avec le support.",
          "Appareils et utilisation : modèle, système, navigateur, réseau, version de l’app, journaux pour optimiser les performances et prévenir la fraude.",
          "Sources tierces : processeurs de paiement, prestataires de vérification ou bases publiques, avec votre consentement."
        ]
      },
      {
        title: "3. Utilisation des données",
        content: [
          "Fournir et améliorer nos services : création de comptes, correspondance, rappels, contrats et paiements.",
          "Confiance et sécurité : KYC, lutte contre le blanchiment, surveillance en temps réel, assistance d’urgence et enquêtes.",
          "Communication et assistance : mises à jour, sondages, notifications réglementaires et marketing optionnel.",
          "Recherche et conformité : analyses agrégées et respect des obligations fiscales ou réglementaires."
        ]
      },
      {
        title: "4. Partage des données",
        content: [
          "Entre utilisateurs et prestataires : après confirmation, les informations nécessaires à la mission sont partagées.",
          "Partenaires : hébergeurs, paiements, vérification, cartographie, risque et marketing reçoivent uniquement les données minimales sous engagement contractuel.",
          "Opérations de société : en cas de fusion ou de cession, les données resteront protégées par cette politique.",
          "Exigences légales : nous pouvons divulguer des données conformément à la loi ou pour protéger Guidew, les utilisateurs et le public."
        ]
      },
      {
        title: "5. Transferts internationaux",
        content: [
          "Guidew opère mondialement ; vos données peuvent être traitées hors de votre pays. Nous utilisons des clauses contractuelles, le chiffrement ou d’autres garanties."
        ]
      },
      {
        title: "6. Cookies et technologies similaires",
        content: [
          "Nous utilisons cookies, pixels, SDK et stockage local pour mémoriser vos préférences, maintenir la session et mesurer les campagnes. Vous pouvez ajuster vos paramètres mais certaines fonctionnalités pourraient en pâtir."
        ]
      },
      {
        title: "7. Conservation et suppression",
        content: [
          "Les données sont conservées uniquement pendant la durée nécessaire. Les registres de trajets et fiscaux sont généralement gardés 7 ans.",
          "En cas de demande de suppression, nous vérifions votre identité et isolons les données qui doivent être conservées légalement."
        ]
      },
      {
        title: "8. Sécurité",
        content: [
          "Guidew applique le chiffrement, des contrôles d’accès, des journaux d’audit, la détection d’intrusions et des tests réguliers.",
          "En cas d’incident, nous informons les utilisateurs et autorités conformément aux exigences légales."
        ]
      },
      {
        title: "9. Vos droits et choix",
        content: [
          "Depuis l’app ou via le support, vous pouvez consulter/modifier vos données, télécharger une copie, mettre à jour vos paiements, gérer les notifications et retirer des autorisations.",
          "Certaines archives (reçus, litiges) peuvent être conservées pour des raisons réglementaires ; si nous ne pouvons satisfaire une demande, nous l’expliquerons."
        ]
      },
      {
        title: "10. Mineurs",
        content: [
          "Guidew s’adresse aux adultes et ne collecte pas intentionnellement de données sur les moins de 18 ans. Contactez-nous si vous pensez le contraire."
        ]
      },
      {
        title: "11. Mise à jour de la politique",
        content: [
          "Nous pouvons modifier cette politique, indiquer la date d’effet et envoyer des notifications importantes."
        ]
      },
      {
        title: "12. Nous contacter",
        content: [
          "Confidentialité : privacy@guidew.com",
          "Délégué à la protection des données : dpo@guidew.com (Guidew Pte. Ltd., 8 Marina Boulevard, #05-02, Singapore 018981)",
          "Si vous résidez dans l’UE, au Royaume-Uni ou ailleurs, vous pouvez également contacter l’autorité locale. Réponse sous 30 jours."
        ]
      }
    ],
    footerTitle: "Comment traitons-nous vos demandes de confidentialité ?",
    footerDescription:
      "Envoyez vos demandes à privacy@guidew.com ou via l’app. Nous répondons sous 30 jours et vous informons si un délai supplémentaire est requis.",
    lastUpdated: "Dernière mise à jour : 6 juin 2025"
  },
  he: {
    badge: "מדיניות פרטיות",
    title: "מדיניות הפרטיות של Guidew",
    description:
      "אנו מאמצים עקרונות הגנת פרטיות של פלטפורמות מובילות בעולם ומתאימים אותם לאופי המשולב של נסיעות ומומחיות מקומית ב‑Guidew. במסמך זה מוסבר אילו נתונים אנו אוספים, לשם מה וכיצד תוכלו לממש זכויות.",
    sections: [
      {
        title: "1. תחולה",
        content: [
          "המדיניות חלה על האתר guidew.com, האפליקציה, ממשקי API, תהליכי אימות לא מקוונים, תמיכת לקוחות וכל כלי המחבר בין משתמשים לספקים. שימוש בשירותים מהווה הסכמה למדיניות."
        ]
      },
      {
        title: "2. מידע שאנו אוספים",
        content: [
          "פרטי חשבון וזהות: שם, תמונה, פרטי קשר, אישורי כניסה, שפה מועדפת, אמצעי תשלום, ולספקים גם רישיונות מקצועיים וביטוחים.",
          "נסיעות ומיקום: נתוני GPS/סלולר/‏Wi‑Fi, נקודות יציאה ויעד, מסלולים ושעות כדי להתאים ספקים קרובים ולהפעיל מנגנוני בטיחות.",
          "עסקאות ואינטראקציות: היסטוריית הזמנות, הודעות, הקלטות, קבצים שהועלו, דירוגים, פניות תמיכה וחומרי מחלוקת.",
          "מכשיר ושימוש: דגם, מערכת הפעלה, דפדפן, רשת, גרסת אפליקציה, לוגי קריסה ונתוני שימוש לצורך אופטימיזציה ומניעת הונאות.",
          "מקורות צד שלישי: מעבדי תשלומים, שירותי אימות או מאגרי מידע ציבוריים בכפוף להרשאה."
        ]
      },
      {
        title: "3. שימוש במידע",
        content: [
          "אספקה ושיפור השירות: פתיחת חשבונות, התאמת בקשות, שליחת תזכורות, הפקת הסכמים ותשלומים.",
          "אמון ובטיחות: קיום בדיקות KYC/AML, ניטור סיכונים בזמן אמת, סיוע חירום וחקר אירועים חשודים.",
          "תקשורת ותמיכה: עדכונים על הזמנות, סקרים, הודעות מדיניות ושיווק הניתן לביטול.",
          "מחקר וציות: ניתוח נתונים מצרפיים ועמידה בדרישות מס ורגולציה."
        ]
      },
      {
        title: "4. שיתוף מידע",
        content: [
          "בין משתמשים לספקים: לאחר אישור הזמנה מוצגת לשני הצדדים האינפורמציה הנדרשת לביצוע.",
          "ספקי שירות: ענן, תשלומים, אימות, מפות, ניהול סיכונים ושיווק מקבלים רק את המידע המינימלי תחת הסכמי סודיות.",
          "עסקאות תאגידיות: במקרה של מיזוג או מכירת נכסים, המידע נותר מוגן לפי מדיניות זו.",
          "חובות משפטיות: נחשוף מידע אם החוק מחייב או כדי להגן על Guidew, המשתמשים או הציבור."
        ]
      },
      {
        title: "5. העברת נתונים מעבר לגבולות",
        content: [
          "ל‑Guidew תשתיות בינלאומיות ולכן נתוניכם עשויים לעבור למדינות אחרות. אנו מסתמכים על סעיפים חוזיים, הצפנה ואמצעי הגנה נוספים."
        ]
      },
      {
        title: "6. עוגיות וטכנולוגיות דומות",
        content: [
          "אנו משתמשים בעוגיות (Cookies), פיקסלים, SDK ואחסון מקומי לשמירת העדפות, שמירה על כניסה ומדידת קמפיינים. ניתן לשנות הגדרות, אך תפקוד מסוים עשוי להיפגע."
        ]
      },
      {
        title: "7. שמירת נתונים ומחיקה",
        content: [
          "נשמור מידע רק למשך הזמן הנדרש להשגת המטרה. רישומי נסיעות ומסים נשמרים לרוב 7 שנים.",
          "כאשר תבקשו מחיקה או סגירת חשבון נאמת את זהותכם ונטפל בבקשה; נתונים שחובה לשמור יבודדו עד תום התקופה."
        ]
      },
      {
        title: "8. אבטחת מידע",
        content: [
          "Guidew מפעילה הצפנה, בקרת גישה, לוגים, זיהוי חדירות ובדיקות חדירה תקופתיות.",
          "במקרה של אירוע אבטחה נודיע למשתמשים ולרשויות בהתאם לחוק."
        ]
      },
      {
        title: "9. זכויותיכם ובחירותיכם",
        content: [
          "באפליקציה או דרך התמיכה ניתן לעדכן נתונים, להוריד עותק, לנהל אמצעי תשלום והתראות ולהסיר הרשאות.",
          "חלק מהרישומים (למשל קבלות או מחלוקות) עשויים להישמר מכוח החוק; אם לא נוכל למלא בקשה נסביר את הסיבה."
        ]
      },
      {
        title: "10. ילדים ונוער",
        content: [
          "השירות מיועד לבגירים ואיננו אוספים במכוון מידע על קטינים מתחת לגיל 18. אם נתקלתם במידע כזה הודיעו לנו."
        ]
      },
      {
        title: "11. עדכוני המדיניות",
        content: [
          "נעדכן את המדיניות לפי הצורך ונציין את מועד התחולה בראש העמוד ונשלח התראות מהותיות."
        ]
      },
      {
        title: "12. יצירת קשר",
        content: [
          "פניות פרטיות: privacy@guidew.com",
          "קצין הגנת מידע: dpo@guidew.com (Guidew Pte. Ltd., 8 Marina Boulevard, #05-02, Singapore 018981)",
          "אם אתם כפופים לרשות הגנת הפרטיות מקומית, תוכלו לפנות גם אליה. אנו משיבים בתוך 30 יום."
        ]
      }
    ],
    footerTitle: "כיצד אנו מטפלים בבקשות פרטיות?",
    footerDescription:
      "שלחו בקשות ל‑privacy@guidew.com או דרך האפליקציה. נשיב תוך 30 יום ונעדכן אם נדרש אימות נוסף או הארכת זמן.",
    lastUpdated: "עודכן לאחרונה: 6 ביוני 2025"
  },

  mi: {
    badge: "Kaupapa here tūmataiti",
    title: "Kaupapahere Tūmataiti Aratohu",
    description:
      "Ka tuhia e matou i runga i nga whakaritenga tūmataiti kua mohio ki te arahi i te ranunga o nga mahi whakato me nga tohungatanga-a-tangata. E whakaahua ana tenei kaupapa here i nga raraunga ka kohikohia e matou, he aha te whakamahi i a maatau, me nga mana ka taea e koe te whakamahi.",
    sections: [
      {
        title: "1. Whanonga",
        content: [
          "Ko tenei kaupapa here e tuhi ana i te AratohuWhakaahua, ko te App App, APIS, te whakaotinga tuimotu, te tautoko a te kaihoko, me etahi taputapu e hono ana i nga kaihaerere me nga tohunga o te rohe. Ma te uru atu ki te whakamahi ranei i a maatau ratonga, e mohio ana koe kei te tono tenei kaupapa here ki a koe."
        ]
      },
      {
        title: "2. Raraunga Ka kohikohi matou",
        content: [
          "Pūkete me te tuakiri: Ingoa whakaahua, whakaahua whakapā, Taipitopito Whakauru, Manakohanga Reo, Nga Raarangi utu, Inihua, me nga Tirohanga ngaio.",
          "Ngaro me te Tauwāhi: GPS, Cell, Counds, Wi-Fi Sigess me nga tohu Iniana, Takahi / Tikanga-Whakaheke, me nga Rererangi kia pai ai nga waahanga Haumaru.",
          "Nga Mahi me nga Tauhokohoko: Nga Huringa Whakatau, Nga Panui Korero, Nga Raarangi Whakawhitiwhiti, Nga Tikanga, Nga Tikanga Tautoko, nga Whakaaturanga Whakahau mo te Aroturuki Mate me te Manatu Kaihoko.",
          "Pūrere me te Whakamahi: Tauira Pūrere, OS, Pūtirotiro, Putanga AP, Putanga Taakapa, me nga Raraunga Whakawhitiwhiti kia pai ake ai te mahi.",
          "Nga Raru-a-Roopu Tuarua: Nga Kaitautoko Utu, Tuakiri tuakiri, Raraunga Whakapono, Ranei ki nga Kaute Hapori (me te whakaaetanga) kia tutuki i nga herenga a-ture me te whakarei ake i te haumaru."
        ]
      },
      {
        title: "3. Me pehea te whakamahi i nga raraunga",
        content: [
          "Tukuna me te whakapai ake i nga ratonga: Rēhita nga kaute, te tono tono, te tuku whakamaharatanga, whakatau i nga utu, me te whakangungu i nga kaiawhina AI.",
          "Whakapono me te Haumaru: Mahia te KyC, tirohia te AML, te tirotiro i te matapaki, te tautoko mo te tupono, te tautoko ohorere, nga tuhinga inihua, me nga tirotirohanga o te mahi whakahiato.",
          "Whakawhitiwhiti me te Tautoko: Tukuna nga whakahoutanga haerenga, rangahau, matohi kaupapa here, me nga maakete kaupapa here ka taea e koe te whakaputa i nga wa katoa.",
          "Te Rangahau me te Whakauru: Te tātari i nga raraunga whakahiato mo nga matauranga hua me te whakatutuki i nga taake, te ture, te whakaritenga ranei."
        ]
      },
      {
        title: "4. Me pehea te tohatoha i nga raraunga",
        content: [
          "I waenga i nga kaiwhakamahi me nga kaiwhakarato: Ina whakapumautia he utu mo te utu, ka taea e nga roopu e rua te tiro i nga korero e hiahiatia ana hei whakaoti i te whakauru.",
          "Hokonga me nga hoa: Kaaahi te manaaki, nga utu, te whakaterenga tuakiri, te whakaterenga tuakiri, me nga kaihoko hokohoko anake e hiahiatia ana i raro i nga whiu kirimana.",
          "Whakawhiti Pakihi: Mena ka uru te kaiarahi ki te hanumi, te haumi, te whakawhiti ranei, te whakawhiti i nga rawa whaiaro engari ka tiakina e tenei kaupapa here.",
          "Nga tono ture: Ka taea e matou te whakaatu i nga korero ka hiahiatia e te ture, ki te tiaki i nga kaiarahi, a maatau kaiwhakamahi, te iwi whanui ranei."
        ]
      },
      {
        title: "5. Whakawhitiwhiti Whakawhitiwhiti",
        content: [
          "Ka whakahaerehia nga hanganga aratohu i te ao, no reira ka whakahaerehia pea o raraunga i waho o to whenua. Ka whakawhirinaki matou ki nga rara kirimana, whakamuna, me etahi atu tiaki hei tiaki i nga whakawhitinga-rohe whakawhiti."
        ]
      },
      {
        title: "6. pihikete me te hangarau rite",
        content: [
          "Ka whakamahia e matou nga pihikete, nga pika, nga tohu, me te rokiroki o te rohe ki te mahara ki nga manakohanga, kia haina koe i roto i, me te aukati i nga mahi whakapae. Ka taea pea e koe te whakatika i nga kaitirotiro me nga tautuhinga taputapu ranei, ahakoa kaore pea etahi waahanga e mahi pai."
        ]
      },
      {
        title: "7. Te reti me te mukunga",
        content: [
          "Ka mau tonu nga korero mo te waa anake e hiahiatia ana mo te kaupapa i kohia. E 7 tau te roa o te haerenga me nga rekoata taake; Ko te whakatutukitanga, te aukati ranei i te tautohetohe kia roa ake.",
          "Ka tono koe ki te whakakore, ki te kati ranei i to tuakiri, ka whakamatau i to tuakiri me te tukatuka i te tono me pupuri tonu e maatau nga take ture tae noa ki te mutunga o te waa pupuri."
        ]
      },
      {
        title: "8. Haumaru",
        content: [
          "Ka whakamahia e te kaiarahi whakamnryption, te whakauru ki nga mana whakahaere, nga tohu mo te tātari kaute, te kitenga whakamarumaru, te whakamahi i nga whakamatautau.",
          "Mena ka puta mai he mahinga raraunga, ka whakamohiotia atu e maatau nga kaiwhakamahi me nga kaiwhakarato e hiahiatia ana me te whakarato i nga kaiarahi whakaora."
        ]
      },
      {
        title: "9. Ko o mana me nga whiringa",
        content: [
          "Whakahaerehia to kōtaha, tango i tetahi kape o o raraunga, whakahou i nga tikanga utu, whakatika i nga tohu hokohoko, me te tango i te waahi, me te tuku ranei i a maatau.",
          "Ko etahi rekoata (e.g., eke tahua, tautohetohe ranei) ka mau tonu hei whakatutuki i nga whakaritenga whakahaere; Mena kaore e taea e taatau te whakaoti i tetahi tono, ma matou e whakamarama he aha."
        ]
      },
      {
        title: "10. Nga Tamariki me nga Taiohi",
        content: [
          "Ka hangaia he kaiarahi mo nga pakeke. Kaore matou e mohio ki te kohikohi raraunga mai i nga tamariki i raro i te 18. Mena kei te whakapono koe kua whakaratohia e te iti nga raraunga, me hono atu ki a maatau."
        ]
      },
      {
        title: "11. Whakahou Kaupapahere",
        content: [
          "Ka taea pea e maatau te whakarereke i tenei kaupapa here i te wa e puta ana a maatau ratonga, ture ranei. Ka tukuna e matou te ra whai hua i te tihi o tenei whaarangi ka whakamarama koe i roto i te-taupānga, ma te imeera mo nga huringa rauemi."
        ]
      },
      {
        title: "12. Whakapā mai",
        content: [
          "Pātai Tūmataiti: Privacy@uidew.com",
          "Kaiwhakahaere Tiaki Raraunga: DPO@Guidew.com (Arataki Pte. Ltd., 8 Marina Boulevard, # 05-02, Singapore 018981)",
          "Mena ka noho koe ki te EU, ki tetahi atu mana whakahaere me te mana raraunga, ka taea e koe te whakapā atu ki a raatau, ka tuku ranei i tetahi amuamu ki a maatau; Ka whakautu matou i roto i nga ra 30."
        ]
      }
    ],
    footerTitle: "Me pehea e whakahaere ai i nga tono tūmataiti?",
    footerDescription:
      "Tukuna nga tono ma te tuturu i te Privacy@uidew.com ranei na roto i te tautoko-a-roto. Ka whakautu matou i roto i nga ra 30 ka tuku koe kia mohio koe mehemea e hiahiatia ana te whakaotinga, te waa taapiri ranei.",
    lastUpdated: "Whakahoutanga Whakamutunga: 6 Hune 2025"
  },};

const Privacy = () => {
  const { i18n } = useTranslation();
  const content = privacyCopy[getPrivacyLocale(i18n.language)];

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">{content.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{content.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{content.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6">
            {content.sections.map(section => (
              <div key={section.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{section.title}</h2>
                <div className="space-y-3 text-gray-600 leading-relaxed">
                  {section.content.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg font-medium mb-3">{content.footerTitle}</p>
            <p className="text-white/90 mb-4">{content.footerDescription}</p>
            <p className="text-sm text-white/80">{content.lastUpdated}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
