import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cookieLocales = ["en", "zh", "es", "pt", "fr", "he", "mi"] as const;
type CookieLocale = (typeof cookieLocales)[number];

type CookieSection = {
  title: string;
  description?: string;
  bullets: string[];
};

type CookieCopy = {
  badge: string;
  title: string;
  description: string;
  sections: CookieSection[];
  preferenceTitle: string;
  preferenceDescription: string;
  lastUpdated: string;
};

const supportedCookieLocales = new Set<CookieLocale>(cookieLocales);

const getCookieLocale = (language?: string): CookieLocale => {
  if (!language) {
    return "en";
  }
  const normalized = language.split("-")[0]?.toLowerCase() as CookieLocale | undefined;
  if (normalized && supportedCookieLocales.has(normalized)) {
    return normalized;
  }
  return "en";
};

const cookieCopy: Record<CookieLocale, CookieCopy> = {
  en: {
    badge: "Cookie Policy",
    title: "Guidew Cookie Policy",
    description:
      "This policy explains how Guidew uses cookies and similar technologies to keep our products reliable, secure, and personalized across every market we serve.",
    sections: [
      {
        title: "1. Why Guidew uses cookies",
        description:
          "Cookies capture technical signals that help us support individuals and enterprise clients with consistent quality on every device.",
        bullets: [
          "Maintain core functionality: keep you signed in, remember security verification, and sync Guidew Workspace across devices.",
          "Protect the platform: block spam sign-ups, prevent fraudulent payments, and detect unusual traffic.",
          "Optimize performance: understand page loads, service searches, and booking flows so we can improve reliability.",
          "Personalize experience: remember language, preferred cities, frequently used expert categories, and in-progress projects."
        ]
      },
      {
        title: "2. Types of cookies we place",
        description: "We follow widely used cookie categories and only activate optional ones when you grant consent:",
        bullets: [
          "Strictly necessary: keep accounts authenticated, restore sessions, process payments, and perform safety checks. These cannot be turned off.",
          "Functional: remember language choices, interface themes, or roles (for example, enterprise admin or supplier).",
          "Performance & analytics: measure visits, feature engagement, campaign impact, and conversion.",
          "Advertising & third parties: enabled only with consent to show Guidew campaigns, partner offers, or retargeting."
        ]
      },
      {
        title: "3. Third parties and Guidew ecosystem partners",
        description:
          "We collaborate with external providers under strict contracts so the Guidew experience stays complete and compliant.",
        bullets: [
          "Analytics vendors such as Google Analytics or Mixpanel reveal product usage trends under confidentiality safeguards.",
          "Payments and risk partners rely on essential cookies to detect fraud and settle transactions.",
          "Advertising measurement partners deploy pixels only after you authorize marketing cookies.",
          "Integration partners (calendars, video, CRM) will highlight whenever their widgets need additional cookies."
        ]
      },
      {
        title: "4. Device identifiers and similar technology",
        description:
          "Beyond browser cookies we also use device identifiers, SDKs, pixels, and local storage to connect sessions on different endpoints.",
        bullets: [
          "Mobile device identifiers keep sign-in status synchronized across iOS and Android.",
          "Pixels and SDKs help us track engagement between Guidew Guides and enterprise clients.",
          "Local storage caches recently viewed markets, maps, or localization resources to reduce load time."
        ]
      },
      {
        title: "5. How to manage or refuse cookies",
        bullets: [
          "Browser controls: clear or block cookies via Chrome, Safari, Edge, or another browser.",
          "Mobile OS settings: both iOS and Android let you reset advertising IDs or limit personalized ads.",
          "Guidew preference center: we are rolling out an industry-standard panel so you can adjust anything beyond strictly necessary cookies.",
          "Marketing opt-out: unsubscribe links in email footers or the Guidew notification center update marketing choices without affecting essential cookies."
        ]
      },
      {
        title: "6. Data retention and security",
        bullets: [
          "Cookies are deleted or anonymized after their purpose is fulfilled and are stored no longer than 13 months.",
          "Aggregated analytics derived from cookies are used for trend insights without revealing personal identities.",
          "We apply encryption, access controls, and auditing to protect cookies and related logs."
        ]
      },
      {
        title: "7. Updates and contact",
        description:
          "We update this policy when we launch new functionality or adopt new measurement technology.",
        bullets: [
          "When changes are significant we notify affected users in-product or via email.",
          "Questions about cookies can be sent to privacy@guidew.app or submitted through the Guidew help center."
        ]
      }
    ],
    preferenceTitle: "Cookie preferences",
    preferenceDescription:
      "Guidew is rolling out an industry-standard visual preference center. To manage permissions immediately or submit a privacy request, email privacy@guidew.app.",
    lastUpdated: "Last updated: 6 June 2025"
  },
  zh: {
    badge: "Cookie 政策",
    title: "Guidew Cookie 政策",
    description:
      "本政策借鉴全球领先平台的 Cookie 管理实践，解释 Guidew 如何在多端产品中部署 Cookie 与类似技术，以保障可靠、安全且具备个性化体验。",
    sections: [
      {
        title: "1. Guidew 为什么使用 Cookie",
        description:
          "Cookie 帮助我们在全球范围内确保 Guidew 产品安全、快捷并保持一致体验。它们记录必要的技术信息，使我们能够提供面向个人顾问与企业客户的专业服务。",
        bullets: [
          "维持核心功能：保持登录、记住安全验证、在多设备间同步 Guidew Workspace。",
          "保护平台：阻止垃圾注册、预防欺诈交易并检测异常流量。",
          "优化产品：了解页面加载、服务搜索与预约行为，帮助我们持续提升性能。",
          "个性化体验：记住语言、偏好城市、常用专家类别以及正在跟进的项目。"
        ]
      },
      {
        title: "2. 我们放置的 Cookie 类型",
        description: "参照行业通行的分类方法，我们将 Cookie 按以下几类管理，并在需要时征求您的同意：",
        bullets: [
          "必要型：保持登录、处理支付、会话恢复与安全校验，无法被关闭。",
          "功能型：记住语言、配色方案、角色身份（例如企业管理员或供应商）。",
          "性能与分析：衡量访问量、功能使用、营销活动效果与转化。",
          "广告与第三方：仅在获得同意后启用，用于展示 Guidew 活动、合作伙伴优惠或再营销。"
        ]
      },
      {
        title: "3. 第三方与 Guidew 生态合作伙伴",
        description:
          "为了提供完整体验，我们会在严格的合同条款下与外部服务商协作，确保合规与安全。",
        bullets: [
          "分析技术：使用如 Google Analytics、Mixpanel 等工具洞察产品使用趋势。",
          "支付与风控：支付合作方通过必要 Cookie 识别风险并完成结算。",
          "广告衡量：仅当您授权后，广告服务商才能设置像素以衡量活动成效。",
          "集成伙伴：嵌入第三方日历、视频会议或 CRM 时，我们会提示额外 Cookie 的用途。"
        ]
      },
      {
        title: "4. 设备标识符与类似技术",
        description:
          "除了浏览器 Cookie，我们还会使用设备标识符、SDK、像素和本地存储，以匹配不同终端上的会话。",
        bullets: [
          "移动设备标识符帮助我们在 iOS/Android 应用之间同步授权状态。",
          "像素与 SDK 用来衡量 Guidew Guide（专家）与企业客户之间的互动。",
          "本地存储会缓存最近访问的市场、地图或翻译资源，减少重复加载。"
        ]
      },
      {
        title: "5. 如何管理或拒绝 Cookie",
        bullets: [
          "浏览器设置：可通过 Chrome、Safari、Edge 等隐私设置清除或阻止 Cookie。",
          "移动操作系统：iOS 与 Android 均提供重置广告标识符或关闭个性化广告的入口。",
          "Guidew 偏好中心：我们正在上线行业标准的偏好面板，帮助您调整非必要 Cookie。",
          "营销退订：通过邮件页脚或 Guidew 通知中心中的退订按钮更新营销偏好，不会影响必要 Cookie。"
        ]
      },
      {
        title: "6. 数据保留与安全",
        bullets: [
          "Cookie 会在实现用途后删除或匿名化，最长保留 13 个月，并会定期复审。",
          "汇总后的统计数据仅用于趋势分析，不会披露个人可识别信息。",
          "我们通过加密、访问控制与审计流程保护 Cookie 与相关日志。"
        ]
      },
      {
        title: "7. 政策更新与联系方式",
        description:
          "当我们上线新功能、进入新地区或采用新测量技术时，会同步更新本政策并标注生效日期。",
        bullets: [
          "重大更新时，我们会在产品内弹窗或通过电子邮件通知相关用户。",
          "如对 Cookie 的使用方式有疑问，请联系 privacy@guidew.app 或通过 Guidew 客服中心提交请求。"
        ]
      }
    ],
    preferenceTitle: "Cookie 偏好",
    preferenceDescription: "Guidew 正在逐步上线行业标准的可视化偏好中心。若需立即管理权限或提交隐私请求，请发送邮件至 privacy@guidew.app。",
    lastUpdated: "最近更新：2025 年 6 月 6 日"
  },
  es: {
    badge: "Política de cookies",
    title: "Política de cookies de Guidew",
    description:
      "Esta política describe cómo Guidew utiliza cookies y tecnologías similares para mantener nuestros productos confiables, seguros y personalizados en cada mercado.",
    sections: [
      {
        title: "1. Por qué Guidew utiliza cookies",
        description:
          "Las cookies capturan señales técnicas que necesitamos para atender a viajeros individuales y clientes corporativos con una calidad constante.",
        bullets: [
          "Mantener funciones esenciales: conservar la sesión iniciada, recordar verificaciones de seguridad y sincronizar Guidew Workspace entre dispositivos.",
          "Proteger la plataforma: bloquear registros de spam, prevenir pagos fraudulentos y detectar tráfico inusual.",
          "Optimizar el rendimiento: comprender cargas de página, búsquedas y reservas para mejorar la confiabilidad.",
          "Personalizar la experiencia: recordar idioma, ciudades preferidas, categorías de expertos frecuentes y proyectos en curso."
        ]
      },
      {
        title: "2. Tipos de cookies que usamos",
        description: "Seguimos las categorías aceptadas por la industria y solo activamos las opcionales con su consentimiento:",
        bullets: [
          "Estrictamente necesarias: mantienen la autenticación, restauran sesiones, procesan pagos y ejecutan controles de seguridad. No se pueden desactivar.",
          "Funcionales: recuerdan idioma, temas de interfaz o roles (por ejemplo, administrador corporativo o proveedor).",
          "Rendimiento y analítica: miden visitas, interacción con funciones, campañas y conversiones.",
          "Publicidad y terceros: se habilitan únicamente con consentimiento para mostrar campañas de Guidew, ofertas de socios o remarketing."
        ]
      },
      {
        title: "3. Terceros y socios del ecosistema",
        description:
          "Trabajamos con proveedores externos bajo contratos estrictos para mantener la experiencia Guidew completa y conforme a las normas.",
        bullets: [
          "Herramientas de analítica como Google Analytics o Mixpanel nos muestran tendencias de uso bajo acuerdos de confidencialidad.",
          "Socios de pagos y riesgo dependen de cookies esenciales para detectar fraude y liquidar transacciones.",
          "Socios de medición publicitaria solo despliegan píxeles después de que usted autorice las cookies de marketing.",
          "Socios de integración (calendarios, video, CRM) indicarán cuando sus widgets requieran cookies adicionales."
        ]
      },
      {
        title: "4. Identificadores de dispositivo y tecnologías similares",
        description:
          "Además de las cookies del navegador, usamos identificadores de dispositivo, SDK, píxeles y almacenamiento local para conectar sesiones en distintos puntos de acceso.",
        bullets: [
          "Los identificadores móviles mantienen sincronizado el estado de inicio de sesión entre iOS y Android.",
          "Los píxeles y SDK nos ayudan a medir la interacción entre los Guides de Guidew y los clientes empresariales.",
          "El almacenamiento local guarda mercados, mapas o recursos vistos recientemente para reducir los tiempos de carga."
        ]
      },
      {
        title: "5. Cómo administrar o rechazar cookies",
        bullets: [
          "Navegador: borre o bloquee cookies desde la configuración de Chrome, Safari, Edge u otros navegadores.",
          "Sistema operativo móvil: tanto iOS como Android permiten restablecer el ID de publicidad o desactivar anuncios personalizados.",
          "Centro de preferencias Guidew: estamos lanzando un panel estándar para ajustar cualquier cookie que no sea estrictamente necesaria.",
          "Cancelación de marketing: los enlaces para darse de baja en correos o en el centro de notificaciones de Guidew actualizan sus elecciones sin afectar las cookies esenciales."
        ]
      },
      {
        title: "6. Conservación y seguridad de los datos",
        bullets: [
          "Las cookies se eliminan o anonimizan cuando cumplen su propósito y nunca se conservan por más de 13 meses.",
          "Los análisis agregados derivados de cookies se usan para obtener tendencias sin exponer identidades personales.",
          "Aplicamos cifrado, controles de acceso y auditorías para proteger las cookies y los registros relacionados."
        ]
      },
      {
        title: "7. Actualizaciones y contacto",
        description:
          "Actualizamos esta política al lanzar nuevas funciones, entrar en nuevas regiones o adoptar tecnologías de medición.",
        bullets: [
          "Cuando los cambios sean importantes, notificaremos a los usuarios afectados dentro del producto o por correo electrónico.",
          "Para consultas, escriba a privacy@guidew.app o abra un ticket en el centro de ayuda de Guidew."
        ]
      }
    ],
    preferenceTitle: "Preferencias de cookies",
    preferenceDescription:
      "Guidew está desplegando un centro visual de preferencias conforme al estándar de la industria. Para gestionar permisos de inmediato o enviar una solicitud de privacidad, escriba a privacy@guidew.app.",
    lastUpdated: "Última actualización: 6 de junio de 2025"
  },
  pt: {
    badge: "Política de cookies",
    title: "Política de cookies da Guidew",
    description:
      "Esta política explica como a Guidew utiliza cookies e tecnologias semelhantes para manter nossos produtos confiáveis, seguros e personalizados em todos os mercados.",
    sections: [
      {
        title: "1. Por que a Guidew usa cookies",
        description:
          "As cookies capturam sinais técnicos que permitem atender viajantes e clientes corporativos com qualidade consistente em qualquer dispositivo.",
        bullets: [
          "Manter funções essenciais: manter sua sessão ativa, lembrar verificações de segurança e sincronizar o Guidew Workspace entre dispositivos.",
          "Proteger a plataforma: bloquear cadastros de spam, evitar pagamentos fraudulentos e detectar tráfego incomum.",
          "Otimizar o desempenho: entender carregamentos de página, buscas e reservas para aprimorar a confiabilidade.",
          "Personalizar a experiência: lembrar idioma, cidades preferidas, categorias de especialistas frequentes e projetos em andamento."
        ]
      },
      {
        title: "2. Tipos de cookies que usamos",
        description: "Seguimos categorias amplamente adotadas no setor e só ativamos as opcionais com o seu consentimento:",
        bullets: [
          "Estritamente necessárias: mantêm a autenticação, restauram sessões, processam pagamentos e executam verificações de segurança. Não podem ser desativadas.",
          "Funcionais: lembram escolhas de idioma, temas de interface ou papéis (como administrador corporativo ou fornecedor).",
          "Desempenho e análise: medem visitas, uso de recursos, campanhas e conversões.",
          "Publicidade e terceiros: habilitadas apenas com consentimento para mostrar campanhas da Guidew, ofertas de parceiros ou remarketing."
        ]
      },
      {
        title: "3. Terceiros e parceiros do ecossistema Guidew",
        description:
          "Colaboramos com provedores externos sob contratos rígidos para manter a experiência Guidew completa e em conformidade.",
        bullets: [
          "Ferramentas de análise como Google Analytics ou Mixpanel mostram tendências de uso sob acordos de confidencialidade.",
          "Parceiros de pagamento e risco dependem de cookies essenciais para detectar fraude e liquidar transações.",
          "Parceiros de mensuração publicitária só instalam pixels após você autorizar cookies de marketing.",
          "Parceiros de integração (calendários, vídeo, CRM) indicarão quando seus widgets precisarem de cookies adicionais."
        ]
      },
      {
        title: "4. Identificadores de dispositivo e tecnologias semelhantes",
        description:
          "Além das cookies do navegador, usamos identificadores de dispositivo, SDKs, pixels e armazenamento local para conectar sessões em diferentes pontos de acesso.",
        bullets: [
          "Identificadores móveis mantêm o status de login sincronizado entre iOS e Android.",
          "Pixels e SDKs ajudam a medir o engajamento entre os Guides da Guidew e clientes corporativos.",
          "O armazenamento local guarda mercados, mapas ou recursos de idioma recém-acessados para reduzir o tempo de carregamento."
        ]
      },
      {
        title: "5. Como gerenciar ou recusar cookies",
        bullets: [
          "Navegador: limpe ou bloqueie cookies nas configurações do Chrome, Safari, Edge ou outro navegador.",
          "Sistema operacional móvel: iOS e Android permitem redefinir o ID de publicidade ou limitar anúncios personalizados.",
          "Centro de preferências Guidew: estamos lançando um painel padrão para ajustar todas as cookies não essenciais.",
          "Descadastro de marketing: links nos rodapés de e-mails ou no centro de notificações da Guidew atualizam preferências sem afetar cookies essenciais."
        ]
      },
      {
        title: "6. Retenção e segurança de dados",
        bullets: [
          "As cookies são excluídas ou anonimizadas após cumprirem sua finalidade e ficam armazenadas por, no máximo, 13 meses.",
          "Os dados agregados derivados das cookies são usados para análises de tendência sem revelar identidades.",
          "Aplicamos criptografia, controles de acesso e auditorias para proteger as cookies e os logs associados."
        ]
      },
      {
        title: "7. Atualizações e contato",
        description:
          "Atualizamos esta política quando lançamos novos recursos, entramos em novas regiões ou adotamos tecnologias de medição.",
        bullets: [
          "Em caso de mudanças relevantes, notificaremos os usuários afetados no produto ou por e-mail.",
          "Envie perguntas sobre cookies para privacy@guidew.app ou abra um chamado no centro de ajuda da Guidew."
        ]
      }
    ],
    preferenceTitle: "Preferências de cookies",
    preferenceDescription:
      "A Guidew está implementando gradualmente um centro visual de preferências alinhado ao padrão do setor. Para gerenciar permissões imediatamente ou enviar uma solicitação de privacidade, escreva para privacy@guidew.app.",
    lastUpdated: "Última atualização: 6 de junho de 2025"
  },
  fr: {
    badge: "Politique relative aux cookies",
    title: "Politique de cookies de Guidew",
    description:
      "Cette politique explique comment Guidew utilise les cookies et technologies similaires afin d’assurer des expériences fiables, sécurisées et personnalisées sur tous les marchés.",
    sections: [
      {
        title: "1. Pourquoi Guidew utilise des cookies",
        description:
          "Les cookies enregistrent des signaux techniques qui nous permettent d’accompagner voyageurs et entreprises avec une qualité homogène sur tous les appareils.",
        bullets: [
          "Maintenir les fonctions essentielles : garder votre session active, mémoriser les vérifications de sécurité et synchroniser Guidew Workspace entre les appareils.",
          "Protéger la plateforme : bloquer les inscriptions frauduleuses, prévenir les paiements illicites et détecter le trafic anormal.",
          "Optimiser la performance : comprendre les chargements de pages, recherches de services et réservations afin d’améliorer la fiabilité.",
          "Personnaliser l’expérience : retenir la langue, les villes favorites, les catégories d’experts fréquentes et les projets en cours."
        ]
      },
      {
        title: "2. Types de cookies utilisés",
        description: "Nous suivons les catégories largement reconnues dans le secteur et n’activons les cookies optionnels qu’avec votre consentement :",
        bullets: [
          "Strictement nécessaires : maintenir l’authentification, restaurer les sessions, traiter les paiements et effectuer les contrôles de sécurité. Ils ne peuvent pas être désactivés.",
          "Fonctionnels : mémoriser les choix de langue, les thèmes d’interface ou les rôles (administrateur entreprise, fournisseur, etc.).",
          "Performance et analyse : mesurer les visites, l’usage des fonctionnalités, l’impact des campagnes et les conversions.",
          "Publicité et tiers : activés uniquement avec consentement pour diffuser des campagnes Guidew, des offres partenaires ou du reciblage."
        ]
      },
      {
        title: "3. Partenaires tiers et écosystème Guidew",
        description:
          "Nous collaborons avec des prestataires externes soumis à des obligations contractuelles strictes pour offrir une expérience complète et conforme.",
        bullets: [
          "Outils d’analyse comme Google Analytics ou Mixpanel qui fournissent des tendances d’usage sous clauses de confidentialité.",
          "Partenaires paiements et risques qui s’appuient sur les cookies essentiels pour détecter la fraude et régler les transactions.",
          "Partenaires de mesure publicitaire qui n’installent des pixels qu’après votre autorisation des cookies marketing.",
          "Partenaires d’intégration (calendriers, visioconférence, CRM) qui précisent lorsque leurs widgets nécessitent des cookies supplémentaires."
        ]
      },
      {
        title: "4. Identifiants d’appareil et technologies similaires",
        description:
          "En plus des cookies navigateur, nous utilisons des identifiants d’appareil, SDK, pixels et stockage local pour relier les sessions sur divers terminaux.",
        bullets: [
          "Les identifiants mobiles maintiennent l’état de connexion synchronisé entre iOS et Android.",
          "Les pixels et SDK mesurent l’engagement entre les Guides Guidew et les clients entreprises.",
          "Le stockage local conserve les marchés, cartes ou ressources linguistiques récemment consultés afin de réduire les temps de chargement."
        ]
      },
      {
        title: "5. Gérer ou refuser les cookies",
        bullets: [
          "Navigateurs : effacez ou bloquez les cookies via Chrome, Safari, Edge ou tout autre navigateur.",
          "Systèmes mobiles : iOS et Android permettent de réinitialiser l’identifiant publicitaire ou de limiter les publicités personnalisées.",
          "Centre de préférences Guidew : nous déployons un panneau conforme aux standards du secteur pour ajuster toutes les cookies non essentielles.",
          "Désinscription marketing : les liens en bas des e-mails ou dans le centre de notifications Guidew mettent à jour vos préférences sans affecter les cookies essentiels."
        ]
      },
      {
        title: "6. Conservation et sécurité des données",
        bullets: [
          "Les cookies sont supprimés ou anonymisés une fois leur finalité atteinte et sont conservés au maximum 13 mois.",
          "Les analyses agrégées issues des cookies servent uniquement à comprendre les tendances sans révéler d’identités.",
          "Nous appliquons chiffrement, contrôles d’accès et audits pour protéger les cookies et les journaux associés."
        ]
      },
      {
        title: "7. Mises à jour et contact",
        description:
          "Cette politique est mise à jour lors du lancement de nouvelles fonctionnalités ou de l’adoption de nouvelles technologies de mesure.",
        bullets: [
          "En cas de changements importants, nous avertissons les utilisateurs concernés dans l’application ou par e-mail.",
          "Pour toute question, écrivez à privacy@guidew.app ou contactez le centre d’assistance Guidew."
        ]
      }
    ],
    preferenceTitle: "Préférences en matière de cookies",
    preferenceDescription:
      "Guidew déploie progressivement un centre visuel de préférences conforme aux normes du secteur. Pour gérer immédiatement vos autorisations ou envoyer une demande de confidentialité, contactez privacy@guidew.app.",
    lastUpdated: "Dernière mise à jour : 6 juin 2025"
  },
  he: {
    badge: "מדיניות Cookie",
    title: "מדיניות העוגיות של Guidew",
    description:
      "מסמך זה מסביר כיצד Guidew עושה שימוש בעוגיות ובטכנולוגיות דומות כדי להבטיח חוויה אמינה, מאובטחת ומותאמת אישית בכל שוק שבו אנו פועלים.",
    sections: [
      {
        title: "1. מדוע Guidew עושה שימוש בעוגיות",
        description:
          "העוגיות שומרות אותות טכניים שעוזרים לנו לתמוך בנוסעים ובארגונים באותה רמת שירות בכל מכשיר.",
        bullets: [
          "שמירת פעולות ליבה: להשאיר אתכם מחוברים, לזכור אימותי אבטחה ולסנכרן את Guidew Workspace בין מכשירים.",
          "הגנה על הפלטפורמה: חסימת הרשמות ספאם, מניעת תשלומים הונאתיים וזיהוי תעבורה חריגה.",
          "אופטימיזציה של הביצועים: ניתוח זמני טעינה, חיפושי שירות והזמנות כדי לשפר את האמינות.",
          "התאמה אישית: זכירת שפה, ערים מועדפות, קטגוריות מומחים נפוצות ופרויקטים שנמצאים בטיפול."
        ]
      },
      {
        title: "2. סוגי העוגיות שאנו מציבים",
        description: "אנו מסתמכים על קטגוריות המקובלות בתעשייה ומפעילים עוגיות רשות רק לאחר קבלת הסכמה:",
        bullets: [
          "חיוניות בהחלט: שומרות על אימות המשתמש, משחזרות סשנים, מעבדות תשלומים ומבצעות בדיקות בטיחות. לא ניתן לכבות אותן.",
          "תפקודיות: זוכרות בחירות שפה, ערכות נושא או תפקידים (למשל מנהל ארגוני או ספק).",
          "ביצועים וניתוח: מודדות ביקורים, שימוש בפיצ'רים, השפעת קמפיינים והמרות.",
          "פרסום וצדדים שלישיים: מופעלות רק בהסכמה כדי להציג קמפיינים של Guidew, הצעות שותפים או רימרקטינג."
        ]
      },
      {
        title: "3. צדדים שלישיים ושותפי האקוסיסטם",
        description:
          "אנו עובדים עם ספקים חיצוניים תחת הסכמים מחמירים כדי לשמור על חוויית Guidew שלמה ותואמת דרישות רגולטוריות.",
        bullets: [
          "כלי אנליטיקה כמו Google Analytics או Mixpanel מציגים מגמות שימוש תחת חובות סודיות.",
          "שותפי תשלומים וניהול סיכונים מסתמכים על עוגיות חיוניות כדי לזהות הונאות ולהשלים עסקאות.",
          "שותפי מדידת פרסום מציבים פיקסלים רק לאחר שאתם מאשרים עוגיות שיווק.",
          "שותפי אינטגרציה (יומנים, וידאו, CRM) יבליטו כאשר הווידג'טים שלהם זקוקים לעוגיות נוספות."
        ]
      },
      {
        title: "4. מזהי מכשיר וטכנולוגיות דומות",
        description:
          "מעבר לעוגיות דפדפן אנו משתמשים גם במזהי מכשיר, SDKs, פיקסלים ואחסון מקומי כדי לחבר סשנים בין נקודות קצה שונות.",
        bullets: [
          "מזהים במכשירים ניידים שומרים על מצב הכניסה מסונכרן בין iOS ל‑Android.",
          "פיקסלים ו‑SDKs מסייעים לנו למדוד מעורבות בין Guides של Guidew ללקוחות עסקיים.",
          "אחסון מקומי שומר שווקים, מפות או משאבי שפה שנצפו לאחרונה כדי לצמצם זמני טעינה."
        ]
      },
      {
        title: "5. איך לנהל או לסרב לעוגיות",
        bullets: [
          "דפדפנים: מחקו או חסמו עוגיות דרך Chrome,‏ Safari,‏ Edge או דפדפן אחר.",
          "מערכות הפעלה ניידות: גם iOS וגם Android מאפשרות לאפס מזהה פרסום או להגביל מודעות מותאמות אישית.",
          "מרכז ההעדפות של Guidew: אנו משיקים לוח בקרה התואם לסטנדרט התעשייה כדי לנהל כל עוגיה שאינה חיונית.",
          "ביטול שיווק: קישורי הסרה בתחתית האימיילים או במרכז ההתראות של Guidew יעדכנו את העדפות השיווק בלי להשפיע על העוגיות החיוניות."
        ]
      },
      {
        title: "6. שמירת נתונים ואבטחה",
        bullets: [
          "עוגיות נמחקות או עוברות אנונימיזציה לאחר מילוי מטרתן ונשמרות לכל היותר 13 חודשים.",
          "נתוני אנליטיקה מצטברים משמשים להבנת מגמות ללא חשיפת זהויות אישיות.",
          "אנו מפעילים הצפנה, בקרות גישה וביקורות כדי להגן על העוגיות ועל הלוגים הקשורים אליהן."
        ]
      },
      {
        title: "7. עדכונים ויצירת קשר",
        description:
          "נעדכן את המדיניות כאשר נציג יכולות חדשות, נכנס לאזורים נוספים או נאמץ טכנולוגיות מדידה חדשות.",
        bullets: [
          "במקרה של שינוי מהותי נודיע למשתמשים הרלוונטיים בתוך המוצר או בדוא״ל.",
          "שאלות ניתן לשלוח ל‑privacy@guidew.app או למלא דרך מרכז העזרה של Guidew."
        ]
      }
    ],
    preferenceTitle: "העדפות Cookie",
    preferenceDescription:
      "Guidew משיקה בהדרגה מרכז חזותי לניהול העדפות בהתאם לסטנדרט התעשייה. לניהול מיידי של ההרשאות או להגשת בקשת פרטיות, שלחו הודעה ל‑privacy@guidew.app.",
    lastUpdated: "עודכן לאחרונה: 6 ביוני 2025"
  },

  mi: {
    badge: "Kaupapahere Kuki",
    title: "Kaupapahere Kuki Aihikini",
    description:
      "E whakamāramahia ana e tenei kaupapa here te whakamahi i nga pihikete me nga hangarau rite ki te pupuri i a tatou hua, kia mau ki nga maakete katoa e mahi ana tatou.",
    sections: [
      {
        title: "1. He aha te take e whakamahi ai te kaiarahi i nga pihikete",
        description:
          "Ko nga pihikete e hopu ana i nga tohu hangarau hei awhina i a maatau ki te tautoko i nga taangata takitahi me nga kaihoko umanga me te kounga rite tonu mo nga taputapu katoa.",
        bullets: [
          "Kia mau ki te mahi matua: kia haina koe i roto i, kia mahara koe ki te whakamana haumarutanga, me te tukutahi me nga mahi mo nga taputapu.",
          "Tiakina te Pūrere: Aukati i nga hainatanga SPAM, aukati i nga utu tinihanga, ka kitea nga whakawhitinga rereke.",
          "Whakapiki i te mahinga: Me mohio ki nga tohu whaarangi, rapunga ratonga, me nga haerenga mai i te wa e pai ake ai te whakapai ake.",
          "Akoranga Whaiaro: Kia maumahara ki te reo, pai ake nga taone, whakamahia nga waahanga tohunga, me nga kaupapa kei te haere whakamua."
        ]
      },
      {
        title: "2. Nga momo momo pihikete e tuu ana matou",
        description: "Ka whai maatau i nga waahanga pihikete e whakamahia ana me te whakahohe noa i nga whiringa kaare koe i te whakaaetanga:",
        bullets: [
          "E tika ana: Kia mau ki nga kaute kua whakamanahia, ka whakahoki mai i nga huihuinga, nga utu tukatuka, me te mahi i nga arowhai haumaru. Kaore e taea te whakaweto.",
          "Mahi: Ma te mahara ki nga whiringa reo, nga kaupapa atanga, nga mahi ranei (hei tauira, te kaiwhakahaere umanga, te kaiwhakarato ranei).",
          "Te Mahi me te Tātari: Te ine i nga haerenga, te whakauru i te whakauru, te paanga o te whakatairanga, me te hurihanga.",
          "Pānuitanga me te tuatoru: Whakahohehia anake me te whakaaetanga ki te whakaatu i nga kaupapa arataki, tuku hoa, he whakahoki ranei."
        ]
      },
      {
        title: "3. nga tuatoru me nga kaiarahi aiao e whai ake ana",
        description:
          "Ka mahi tahi matou me nga kaiwhakarato o-waho i raro i nga kirimana kaha kia mau tonu te wheako aratohu me te whakatutuki.",
        bullets: [
          "Ko nga kaihoko a te tātari penei i te Google tātaritanga, i te ranunga ranunga ranei e whakaatu ana i nga tikanga whakamahi hua i raro i nga whakamarumaru matatau.",
          "Ko nga utu me nga hoa tupono ka whakawhirinaki ki nga pihikete tino nui hei tirotiro i nga tinihanga me nga whakawhitinga whakatika.",
          "Ko nga kaihaka mehua inenga e whakaatu ana i nga pika anake i muri i a koe e whakamana ana i nga pihikete hokohoko.",
          "Ko nga hoa whakauru (Maramataka, Videos, Videos, Videom, CRM) ka whakaatu i nga wa e hiahia ana a raatau taha ki te pihikete."
        ]
      },
      {
        title: "4. Ko nga tohu o te taputapu me te hangarau rite",
        description:
          "I tua atu i nga pihikete Matapihi Ka whakamahia hoki e matou nga tohu tautuhi taputapu, taapiri, pikika, me te rokiroki o te rohe ki te hono i nga huihuinga ki nga waahanga rereke.",
        bullets: [
          "Ka kitea e nga Kaitohu Pūrere Mobile te pupuri i te mana whakahaere i te IOS me te Android.",
          "Ka awhina nga pika me nga SDKs ki a maatau ki te whaiwhai i waenga i nga kaiarahi arataki me nga kiritaki hinonga.",
          "Ko nga kaakaro rokiroki o te rohe i tata nei nga maakete i tata nei, mahere, mahere rauemi ranei hei whakaiti i te waa kawenga."
        ]
      },
      {
        title: "5. Me pehea te whakahaere i nga pihikete ranei",
        bullets: [
          "Nga Mana Whiriwhiringa: Whakakore, poraka ranei i nga pihikete ma Chrome, Safari, taha, tetahi atu tirotiro ranei.",
          "Tautuhinga OS Mobile: E rua iOS me te Android kia tautuhi ano i nga ID whakatairanga, ki te aukati i nga panui kua tohua ranei.",
          "Pouaka Whakaari Manakohanga: Kei te huri haere maatau i tetahi papa paerewa-a-umanga kia taea ai e koe te whakatika i etahi atu pihikete e tika ana.",
          "Te Hokohoko Hokohoko: Hono Whakauru i nga Kaipupuri Emailmera, i nga whiringa hokohoko ranei o te Whare Whakatuturutanga Whakapaipai me te kore e pa ki nga pihikete nui."
        ]
      },
      {
        title: "6. Te pupuri raraunga me te haumaru",
        bullets: [
          "Ka whakakorea te pihikete, i muri ranei i muri i te whakatutukitanga o ta raatau kaupapa, a kaore e roa atu i te 13 marama.",
          "Ko nga tātaritanga whakahiatotanga i ahu mai i nga pihikete e whakamahia ana mo nga tirohanga a te maarama me te kore e whakaatu i nga tuakiri whaiaro.",
          "Ka tono mātou i te whakamunatanga, te uru ki nga whakahaere, me te tirotiro ki te tiaki i nga pihikete me nga raarangi e pa ana."
        ]
      },
      {
        title: "7. Nga whakahoutanga me te whakapā atu",
        description:
          "Ka whakahou matou i tenei kaupapa here i te wa e whakarewahia ana e matou nga mahi hou, ka whakawhānuihia ki nga rohe hou, ki te whakamahi ranei i te hangarau mehua hou.",
        bullets: [
          "I te mea he nui te rereketanga o te huringa kua pa ki nga kaiwhakamahi i roto i te hua, ma te imeera ranei.",
          "Ko nga paatai ​​mo nga pihikete ka taea te tuku ki te brivacy@guidew.App ranei i tukuna mai i te pokapū awhina awhina."
        ]
      }
    ],
    preferenceTitle: "Pihikete Kuki",
    preferenceDescription:
      "Kei te hurihuri te kaiarahi i tetahi pokapū manakohanga-a-tinana. Hei whakahaere i nga whakaaetanga tonu ka tuku ranei i tetahi tono tūmataiti, tuku tūmataiti, emainacy.guidew.app.",
    lastUpdated: "Whakahoutanga Whakamutunga: 6 Hune 2025"
  },};

const Cookies = () => {
  const { i18n } = useTranslation();
  const activeLocale = getCookieLocale(i18n.language);
  const content = cookieCopy[activeLocale];

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">{content.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{content.title}</h1>
            <p className="text-lg text-gray-600">{content.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {content.sections.map(section => (
              <div key={section.title} className="bg-white rounded-2xl p-6 border border-brand-lightGray shadow-sm">
                <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{section.title}</h2>
                {section.description && <p className="text-gray-600 mb-4">{section.description}</p>}
                <ul className="space-y-3 text-gray-600">
                  {section.bullets.map(text => (
                    <li key={text}>• {text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg font-semibold mb-3">{content.preferenceTitle}</p>
            <p className="text-white/90 mb-6">{content.preferenceDescription}</p>
            <p className="text-sm text-white/80">{content.lastUpdated}</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
