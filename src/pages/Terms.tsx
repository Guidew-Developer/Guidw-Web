import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const termsLocales = ["en", "zh", "es", "pt", "fr", "he"] as const;
type TermsLocale = (typeof termsLocales)[number];

type TermsSection = {
  title: string;
  content: string[];
};

type TermsCopy = {
  badge: string;
  title: string;
  description: string;
  sections: TermsSection[];
  languagePrompt: string;
  lastUpdated: string;
  updateNotice: string;
};

const supportedTermsLocales = new Set<TermsLocale>(termsLocales);

const getTermsLocale = (language?: string): TermsLocale => {
  if (!language) {
    return "en";
  }
  const normalized = language.split("-")[0]?.toLowerCase() as TermsLocale | undefined;
  if (normalized && supportedTermsLocales.has(normalized)) {
    return normalized;
  }
  return "en";
};

const termsCopy: Record<TermsLocale, TermsCopy> = {
  en: {
    badge: "Terms of Service",
    title: "Guidew Terms of Service",
    description:
      "These terms mirror the structure of leading mobility marketplaces and adapt it for Guidew's blend of travel, safety, and local expertise. Please review them carefully before requesting or providing services on Guidew.",
    languagePrompt: "View this page in:",
    sections: [
      {
        title: "1. Contract relationship",
        content: [
          "These Guidew Terms of Service (the \"Terms\") form a legally binding agreement between you—whether an individual traveler, a provider, or someone acting on behalf of an organization—and Guidew and its affiliated entities.",
          "By accessing or using guidew.com, the Guidew app, or any related services, you acknowledge that you have read, understood, and agree to be bound by the Terms and by any policies that Guidew may update from time to time, including our Privacy Policy."
        ]
      },
      {
        title: "2. Guidew platform services",
        content: [
          "Guidew provides technology tools that connect users seeking local experiences, travel support, or in-person skills with independent providers. We enable matching, messaging, scheduling, payments, and safety tooling—but we do not create, control, or deliver the services themselves.",
          "Unless we explicitly state otherwise in writing, Guidew does not employ, manage, or assume responsibility for providers' conduct; every reservation represents a separate agreement between user and provider."
        ]
      },
      {
        title: "3. Accounts and eligibility",
        content: [
          "By creating a Guidew account you confirm that you are at least 18 years old and have the legal capacity to contract. If you use Guidew on behalf of a business or organization, you must be authorized to bind that entity.",
          "Guidew may, at any time, require you to complete identity verification, background screening, or credential reviews; failure to comply may result in account suspension or termination.",
          "You are responsible for safeguarding your login credentials and for all activity that occurs under your account. Notify us promptly if you suspect unauthorized access."
        ]
      },
      {
        title: "4. User and provider obligations",
        content: [
          "Users must ensure that the requested activities are lawful, safe, and compliant with local regulations, and must share accurate preferences, schedules, and prerequisites with providers.",
          "Providers must be truthful about their skills, certifications, availability, and pricing before accepting an order; services must be delivered as described and may not be subcontracted without consent.",
          "Both parties agree to use Guidew's in-app messaging and documentation tools to record critical information and to provide feedback or evidence within the required timelines."
        ]
      },
      {
        title: "5. Fees, payments, and taxes",
        content: [
          "Unless Guidew communicates otherwise in writing, users must pay the full estimated amount through Guidew's payment system at the time of booking; providers may withdraw earnings only after services are completed and successfully verified.",
          "Guidew may charge technology service fees, transaction fees, subscriptions, or other surcharges to users and/or providers, all of which will be disclosed on checkout screens and order summaries.",
          "We may use third-party payment processors, and you authorize Guidew to submit payment instructions on your behalf for both charges and payouts.",
          "Providers are solely responsible for reporting and paying applicable taxes; Guidew may withhold or report amounts if the law requires."
        ]
      },
      {
        title: "6. Cancellations, refunds, and disputes",
        content: [
          "Users may cancel more than 24 hours before the scheduled start without penalty; cancellations between 24 hours and 3 hours before the start may incur up to 50% of the order value; cancellations within 3 hours or no-shows may be charged in full.",
          "If a provider cancels or fails to appear, Guidew may issue refunds, travel credits, or help rematch the user; repeated violations can trigger suspension or permanent removal from the platform.",
          "Disputes must be submitted through the Guidew app within 7 days after the service ends, with supporting evidence such as chat transcripts, media, or receipts.",
          "Guidew may impose remedies that include refunds, partial payouts, withholding funds, or other adjustments we deem appropriate after reviewing the dispute."
        ]
      },
      {
        title: "7. Content and intellectual property",
        content: [
          "The Guidew services, website, software, trademarks, and all related intellectual property belong to Guidew or its licensors, and you receive only a limited, revocable, non-transferable license to use them in accordance with these Terms.",
          "Content that you submit, such as text, images, credentials, or reviews, remains yours, but you grant Guidew a worldwide, royalty-free, sublicensable license to host, use, reproduce, or distribute that content to operate, improve, and market the services.",
          "You must not copy, reverse engineer, modify, or attempt to extract the source code of our systems, nor may you use Guidew's brand assets without prior written permission."
        ]
      },
      {
        title: "8. Safety and compliance",
        content: [
          "Guidew may require additional vetting for sensitive services such as home access, childcare, medical support, or any category we deem high-risk, which can include interviews, document uploads, or third-party checks.",
          "You are responsible for complying with all laws, permits, professional standards, and insurance requirements that apply where the service takes place.",
          "We may suspend or terminate accounts and cooperate with regulators or law enforcement if we detect illegal, fraudulent, or unsafe conduct."
        ]
      },
      {
        title: "9. Privacy and data handling",
        content: [
          "By using Guidew you consent to the collection, use, sharing, and storage of your data as outlined in the Guidew Privacy Policy, including identity information, location data, payment information, and communications.",
          "We may share data with service providers, partners, or authorities when needed for service delivery, risk management, support, or compliance, while applying commercially reasonable safeguards."
        ]
      },
      {
        title: "10. Disclaimers",
        content: [
          "Guidew provides the platform on an 'as is' basis and makes no representations or warranties, express or implied, regarding uninterrupted access, error-free performance, or whether the services will meet your expectations.",
          "We do not guarantee any provider's background, qualifications, legality, or the outcome of interactions between users and providers."
        ]
      },
      {
        title: "11. Limitation of liability",
        content: [
          "To the fullest extent permitted by law, Guidew and its officers, directors, employees, and partners shall not be liable for any indirect, incidental, punitive, or consequential damages arising out of or related to your use of the services.",
          "Guidew's aggregate liability for direct damages is limited to the amounts you paid to Guidew for the specific services at issue during the six months preceding the claim."
        ]
      },
      {
        title: "12. Indemnification",
        content: [
          "You agree to indemnify and hold harmless Guidew and its affiliates from any claims, losses, liabilities, and expenses (including reasonable attorney fees) arising from your breach of these Terms, violation of the law, or infringement of third-party rights."
        ]
      },
      {
        title: "13. Governing law and dispute resolution",
        content: [
          "These Terms are governed by the laws of Singapore, without regard to its conflict-of-law rules.",
          "Any dispute or claim will be finally resolved through arbitration administered by the Singapore International Arbitration Centre (SIAC) in English, and the award may be enforced in any court with jurisdiction."
        ]
      },
      {
        title: "14. Changes to these Terms",
        content: [
          "Guidew may modify these Terms from time to time. We will note the effective date on this page and may notify you via email or in-app notices for material changes.",
          "If you continue to access or use Guidew after new Terms become effective, you are deemed to accept them; if you disagree, you should stop using the services and close your account."
        ]
      },
      {
        title: "15. Contact us",
        content: [
          "If you have questions about these Terms or the Guidew services, contact support@guidew.com or visit https://www.guidew.com/help for additional support options."
        ]
      }
    ],
    lastUpdated: "Last updated: 6 June 2025",
    updateNotice:
      "Guidew continually iterates our technology, operations, and safety playbooks. The latest version of these Terms will always be posted on guidew.com/terms and material updates may also be delivered via email or in-product notifications."
  },
  zh: {
    badge: "服务条款",
    title: "Guidew 服务条款",
    description:
      "本条款参考了行业头部出行平台的标准架构，并根据 Guidew 结合差旅、安全与本地技能的业务特性进行优化。请在请求或提供任何 Guidew 服务前完整阅读。",
    languagePrompt: "请选择查看语言：",
    sections: [
      {
        title: "1. 合同关系",
        content: [
          "本《Guidew 服务条款》（以下简称“条款”）是您（无论是旅行用户、服务者，或代表机构使用）与 Guidew 及其关联公司的具有法律约束力的协议。",
          "访问或使用 guidew.com、Guidew App 或任何相关服务，即表示您已阅读、理解并同意受本条款以及 Guidew 不时更新的所有政策（包括《隐私政策》）约束。"
        ]
      },
      {
        title: "2. Guidew 平台服务",
        content: [
          "Guidew 提供撮合、沟通、排期、支付与安全工具，帮助需要本地体验、差旅协助或线下技能的用户与独立服务者建立联系；我们并非直接提供这些服务。",
          "除非另有书面说明，Guidew 不雇佣、不管理也不对服务者的行为承担代理责任，每一份订单均是用户与服务者之间的独立协议。"
        ]
      },
      {
        title: "3. 账户与资格",
        content: [
          "创建 Guidew 账号即代表您已年满 18 周岁并具备完全民事行为能力；若您代表企业或组织使用服务，也需获得该实体的正式授权。",
          "Guidew 可在任何时间要求您完成身份核验、背景审查或资质复核；若拒绝配合，账号可能被暂停或终止。",
          "您须妥善保管登录凭证，对账号下的所有行为承担责任；一旦发现异常登录，应立即告知我们。"
        ]
      },
      {
        title: "4. 用户与服务者义务",
        content: [
          "用户应确保所请求的活动合法、安全并符合当地监管要求，并向服务者提供准确的偏好、时间安排与必要前提。",
          "服务者在接单前必须如实披露技能、证书、可用性与定价；必须按照描述履约，不得未经同意转包。",
          "双方需使用 Guidew 内置通信与记录工具保存关键信息，并按规定时间提供反馈或佐证。"
        ]
      },
      {
        title: "5. 费用、支付与税务",
        content: [
          "除非 Guidew 另行说明，用户需在下单时通过 Guidew 支付系统一次性支付全部预估金额；服务完成并通过核验后，服务者方可提现收入。",
          "Guidew 可能向用户和/或服务者收取技术服务费、交易费、订阅费或其他附加费用，所有费用都会在结算页或订单详情中清晰展示。",
          "我们可能使用第三方支付机构，您授权 Guidew 代表您发起扣款与付款指令。",
          "服务者须自行申报并缴纳适用税费；在法律要求的情况下，Guidew 可能会代为预扣或上报。"
        ]
      },
      {
        title: "6. 取消、退款与争议",
        content: [
          "用户在服务开始 24 小时前取消可获全额退款；距开始 24 小时至 3 小时取消，可能扣除最多 50% 的订单金额；少于 3 小时取消或缺席，可能扣除全部费用。",
          "若服务者取消或未按时到场，Guidew 可向用户提供退款、代金券或协助重新匹配；多次违规会导致账号被暂停甚至永久下架。",
          "任何争议需在服务结束 7 天内通过 Guidew App 提交，并附上聊天记录、照片或收据等证据。",
          "Guidew 将根据调查结果采取相应措施，包括退款、部分结算、冻结款项或我们认为合理的其他调整。"
        ]
      },
      {
        title: "7. 内容与知识产权",
        content: [
          "Guidew 的网站、软件、商标及相关知识产权均归 Guidew 或其许可方所有，您仅获得一项可撤销、不可转让的有限使用许可。",
          "您在平台发布的文字、图片、资质或评价仍归您所有，但您授予 Guidew 全球范围内免费的可再授权许可，用于运营、改进与推广服务。",
          "您不得复制、逆向工程、修改或尝试导出系统源代码，也不得未经书面许可使用 Guidew 品牌资产。"
        ]
      },
      {
        title: "8. 安全与合规",
        content: [
          "对于入户、儿童照护、医疗支持等敏感服务，Guidew 可要求额外的安全审核，包括访谈、资料上传或第三方审查。",
          "您有责任遵守服务所在地的法律、许可要求、行业标准与保险义务。",
          "一旦发现违法、欺诈或危害安全的行为，我们有权暂停或终止账号，并与监管或执法机构合作。"
        ]
      },
      {
        title: "9. 隐私与数据处理",
        content: [
          "使用 Guidew 即表示您同意按照《Guidew 隐私政策》收集、使用、共享与存储您的数据，包括身份、定位、支付信息与交流记录。",
          "我们可能在服务交付、风控、客服或合规需要时，与合作伙伴或主管单位共享必要数据，并采取合理的安全措施。"
        ]
      },
      {
        title: "10. 免责声明",
        content: [
          "Guidew 按“现状”提供平台，不对持续可用性、无错误或完全符合您期望作出明示或默示保证。",
          "我们不对任何服务者的背景、资质、合法性或用户与服务者互动的结果作保证。"
        ]
      },
      {
        title: "11. 责任限制",
        content: [
          "在法律允许的最大范围内，Guidew 及其管理人员、员工与合作伙伴不对因使用服务引发的任何间接、附带、惩罚性或后果性损害承担责任。",
          "Guidew 因直接损害需要承担的累计赔偿责任，以您在相关争议发生前 6 个月内向 Guidew 支付的费用为上限。"
        ]
      },
      {
        title: "12. 赔偿",
        content: [
          "如因您违反本条款、违法或侵害第三方权利而引发索赔，您同意赔偿 Guidew 及关联公司，并使其免受损失（包括合理律师费）。"
        ]
      },
      {
        title: "13. 适用法律与争议解决",
        content: [
          "本条款受新加坡法律管辖，并依其解释，不考虑法律冲突原则。",
          "任何争议均提交新加坡国际仲裁中心（SIAC）以英文仲裁，裁决为终局并可在具备管辖权的法院执行。"
        ]
      },
      {
        title: "14. 条款更新",
        content: [
          "Guidew 可不定期更新本条款，并在此页面标注生效日期；重大变更也可能通过邮件或站内通知告知您。",
          "若您在新条款生效后继续使用 Guidew，即视为接受更新；如不同意，应停止使用并关闭账号。"
        ]
      },
      {
        title: "15. 联系我们",
        content: [
          "如对本条款或 Guidew 服务有疑问，请发送邮件至 support@guidew.com，或访问 https://www.guidew.com/help 获取更多帮助渠道。"
        ]
      }
    ],
    lastUpdated: "更新日期：2025 年 6 月 6 日",
    updateNotice:
      "Guidew 将持续迭代技术、运营与安全体系。最新版条款始终发布在 guidew.com/terms，重大更新也会通过邮件或站内通知提醒您关注。"
  },
  es: {
    badge: "Términos de servicio",
    title: "Términos de servicio de Guidew",
    description:
      "Estos términos siguen la estructura de las principales plataformas de movilidad y se adaptan al enfoque híbrido de viajes y experiencia local de Guidew. Léelos detenidamente antes de solicitar o prestar servicios en Guidew.",
    languagePrompt: "Ver esta página en:",
    sections: [
      {
        title: "1. Relación contractual",
        content: [
          "Estos Términos de servicio de Guidew (los \"Términos\") constituyen un acuerdo jurídicamente vinculante entre usted—ya sea viajero, proveedor o representante de una organización—y Guidew y sus entidades afiliadas.",
          "Al acceder o usar guidew.com, la app de Guidew o cualquier servicio relacionado, usted reconoce que ha leído, comprendido y acepta quedar sujeto a los Términos y a las políticas que Guidew pueda actualizar periódicamente, incluida la Política de Privacidad."
        ]
      },
      {
        title: "2. Servicios de la plataforma Guidew",
        content: [
          "Guidew ofrece herramientas tecnológicas que conectan a usuarios que buscan experiencias locales, apoyo de viaje o habilidades presenciales con proveedores independientes; facilitamos el emparejamiento, la mensajería, la programación, los pagos y las funciones de seguridad, pero no creamos ni prestamos los servicios.",
          "Salvo que lo indiquemos expresamente por escrito, Guidew no emplea ni dirige a los proveedores ni asume responsabilidad por su conducta; cada reserva es un acuerdo independiente entre usuario y proveedor."
        ]
      },
      {
        title: "3. Cuentas y elegibilidad",
        content: [
          "Al crear una cuenta Guidew confirma que tiene al menos 18 años y capacidad legal para contratar; si usa Guidew en nombre de una empresa u organización, debe contar con autorización para obligarla.",
          "Guidew puede exigirle en cualquier momento verificaciones de identidad, revisiones de antecedentes o comprobación de credenciales; si no coopera, su cuenta puede suspenderse o cancelarse.",
          "Usted es responsable de proteger sus credenciales de acceso y de toda actividad realizada desde su cuenta; avísenos de inmediato si sospecha un acceso no autorizado."
        ]
      },
      {
        title: "4. Obligaciones de usuarios y proveedores",
        content: [
          "Los usuarios deben garantizar que las actividades solicitadas sean legales, seguras y conformes con la normativa local, y compartir con el proveedor preferencias, horarios y requisitos exactos.",
          "Los proveedores deben describir con veracidad sus habilidades, certificaciones, disponibilidad y precios antes de aceptar una orden; deben prestar el servicio según lo acordado y no pueden subcontratar sin consentimiento.",
          "Ambas partes se comprometen a usar las herramientas de mensajería y registro dentro de Guidew para documentar información crítica y aportar comentarios o pruebas dentro de los plazos establecidos."
        ]
      },
      {
        title: "5. Tarifas, pagos e impuestos",
        content: [
          "Salvo comunicación distinta de Guidew, los usuarios deben pagar el importe total estimado a través del sistema de pagos de Guidew al momento de reservar; los proveedores sólo podrán retirar sus ganancias tras completar el servicio y superar las verificaciones correspondientes.",
          "Guidew puede cobrar comisiones tecnológicas, tarifas de transacción, suscripciones u otros recargos a usuarios y/o proveedores, los cuales se mostrarán claramente en la pantalla de pago y en el resumen del pedido.",
          "Podemos utilizar procesadores de pago externos y usted autoriza a Guidew a enviar instrucciones de cobros y pagos en su nombre.",
          "Los proveedores son los únicos responsables de declarar y pagar los impuestos aplicables; Guidew podrá retener o reportar importes cuando así lo exija la ley."
        ]
      },
      {
        title: "6. Cancelaciones, reembolsos y disputas",
        content: [
          "Los usuarios pueden cancelar sin penalización con más de 24 horas de anticipación; las cancelaciones entre 24 y 3 horas antes del inicio pueden generar un cargo de hasta el 50 % del valor del pedido; si cancelan con menos de 3 horas o no se presentan, se podrá cobrar el total.",
          "Si un proveedor cancela o no se presenta, Guidew podrá emitir reembolsos, créditos de viaje o ayudar a reasignar la experiencia; las reincidencias pueden derivar en suspensión o baja permanente de la plataforma.",
          "Las disputas deben enviarse mediante la app de Guidew dentro de los 7 días posteriores al servicio, adjuntando evidencia como chats, archivos multimedia o recibos.",
          "Tras analizar la disputa, Guidew puede aplicar soluciones como reembolsos, pagos parciales, retención de fondos u otros ajustes apropiados."
        ]
      },
      {
        title: "7. Contenido y propiedad intelectual",
        content: [
          "Los servicios, sitios web, software, marcas y demás propiedad intelectual de Guidew pertenecen a Guidew o a sus licenciantes; usted recibe una licencia limitada, revocable y no transferible para utilizarlos conforme a estos Términos.",
          "El contenido que usted envíe—textos, imágenes, credenciales o reseñas—sigue siendo suyo, pero otorga a Guidew una licencia mundial, gratuita y sublicenciable para alojarlo, usarlo, reproducirlo o distribuirlo con el fin de operar, mejorar y promocionar los servicios.",
          "No debe copiar, realizar ingeniería inversa, modificar ni intentar extraer el código fuente de nuestros sistemas, ni utilizar los elementos de marca de Guidew sin autorización escrita previa."
        ]
      },
      {
        title: "8. Seguridad y cumplimiento",
        content: [
          "Guidew puede requerir verificaciones adicionales para servicios sensibles como accesos a domicilios, cuidado infantil, apoyo médico o cualquier categoría considerada de alto riesgo, lo que puede incluir entrevistas, carga de documentos o verificaciones externas.",
          "Usted es responsable de cumplir con todas las leyes, permisos, normas profesionales y requisitos de seguro aplicables en el lugar donde se presta el servicio.",
          "Podemos suspender o cancelar cuentas y cooperar con autoridades si detectamos conductas ilegales, fraudulentas o inseguras."
        ]
      },
      {
        title: "9. Privacidad y datos",
        content: [
          "Al usar Guidew usted consiente la recopilación, uso, intercambio y almacenamiento de sus datos conforme a la Política de Privacidad de Guidew, incluyendo información de identidad, ubicación, pagos y comunicaciones.",
          "Podemos compartir datos con proveedores de servicios, socios o autoridades cuando sea necesario para la prestación del servicio, la gestión de riesgos, la asistencia o el cumplimiento, aplicando medidas de seguridad comercialmente razonables."
        ]
      },
      {
        title: "10. Descargos de responsabilidad",
        content: [
          "Guidew ofrece la plataforma “tal cual” y no otorga declaraciones ni garantías, expresas o implícitas, sobre disponibilidad continua, ausencia de errores o adecuación a sus expectativas.",
          "No garantizamos los antecedentes, calificaciones, legalidad ni resultados de la interacción entre usuarios y proveedores."
        ]
      },
      {
        title: "11. Limitación de responsabilidad",
        content: [
          "En la máxima medida permitida por la ley, Guidew y sus directivos, empleados y socios no serán responsables por daños indirectos, incidentales, punitivos o consecuentes derivados del uso de los servicios.",
          "La responsabilidad total de Guidew por daños directos se limita a los montos que usted pagó a Guidew por los servicios en disputa durante los seis meses anteriores a la reclamación."
        ]
      },
      {
        title: "12. Indemnización",
        content: [
          "Usted acepta indemnizar y eximir de responsabilidad a Guidew y sus afiliadas frente a reclamaciones, pérdidas, responsabilidades y costos (incluidos honorarios razonables de abogados) derivados de su incumplimiento de estos Términos, de la ley o de derechos de terceros."
        ]
      },
      {
        title: "13. Ley aplicable y resolución de disputas",
        content: [
          "Estos Términos se rigen por las leyes de Singapur, sin considerar sus normas sobre conflicto de leyes.",
          "Toda controversia se resolverá definitivamente mediante arbitraje administrado por el Singapore International Arbitration Centre (SIAC) en inglés, y el laudo podrá ejecutarse en cualquier tribunal competente."
        ]
      },
      {
        title: "14. Cambios en los Términos",
        content: [
          "Guidew puede modificar estos Términos periódicamente. Indicaremos la fecha de vigencia en esta página y podremos notificarle por correo electrónico o dentro del producto cuando se trate de cambios importantes.",
          "Si continúa usando Guidew después de que entren en vigor los nuevos Términos, se considerará que los acepta; si no está de acuerdo, debe dejar de usar el servicio y cerrar su cuenta."
        ]
      },
      {
        title: "15. Contáctenos",
        content: [
          "Si tiene preguntas sobre estos Términos o sobre los servicios de Guidew, escriba a support@guidew.com o visite https://www.guidew.com/help para acceder a nuestros canales de soporte."
        ]
      }
    ],
    lastUpdated: "Última actualización: 6 de junio de 2025",
    updateNotice:
      "Guidew mejora continuamente su tecnología, operaciones y estándares de seguridad. La versión más reciente de estos Términos estará disponible en guidew.com/terms y podremos avisarle por correo electrónico o notificaciones en la app cuando haya cambios relevantes."
  },
  pt: {
    badge: "Termos de Serviço",
    title: "Termos de serviço da Guidew",
    description:
      "Estes termos seguem a estrutura adotada por marketplaces líderes de mobilidade e foram adaptados ao modelo híbrido de viagens e expertise local da Guidew. Leia-os com atenção antes de solicitar ou oferecer serviços na plataforma.",
    languagePrompt: "Ver esta página em:",
    sections: [
      {
        title: "1. Relação contratual",
        content: [
          "Estes Termos de Serviço da Guidew (os \"Termos\") constituem um acordo juridicamente vinculante entre você—seja viajante, prestador ou representante de uma organização—e a Guidew e suas afiliadas.",
          "Ao acessar ou usar o site guidew.com, o app da Guidew ou qualquer serviço relacionado, você declara que leu, entendeu e concorda em cumprir os Termos e as políticas que a Guidew possa atualizar periodicamente, inclusive a Política de Privacidade."
        ]
      },
      {
        title: "2. Serviços da plataforma Guidew",
        content: [
          "A Guidew fornece ferramentas tecnológicas que conectam usuários em busca de experiências locais, apoio de viagem ou habilidades presenciais a prestadores independentes; disponibilizamos recursos de correspondência, mensagens, agendamento, pagamentos e segurança, mas não criamos nem executamos os serviços.",
          "Salvo indicação escrita em contrário, a Guidew não emprega, não gerencia nem assume responsabilidade pela conduta dos prestadores; cada reserva constitui um acordo independente entre usuário e prestador."
        ]
      },
      {
        title: "3. Contas e elegibilidade",
        content: [
          "Ao criar uma conta Guidew, você confirma que tem pelo menos 18 anos e capacidade legal para contratar; se utilizar a Guidew em nome de uma empresa ou organização, deve estar autorizado a vinculá-la.",
          "A Guidew pode solicitar, a qualquer momento, verificação de identidade, checagem de antecedentes ou revisão de credenciais; a recusa pode resultar na suspensão ou encerramento da conta.",
          "Você é responsável por proteger suas credenciais de acesso e por toda atividade realizada em sua conta; avise-nos imediatamente caso suspeite de uso não autorizado."
        ]
      },
      {
        title: "4. Obrigações de usuários e prestadores",
        content: [
          "Os usuários devem garantir que as atividades solicitadas sejam legais, seguras e conformes às normas locais, compartilhando com o prestador preferências, agenda e requisitos precisos.",
          "Os prestadores precisam divulgar com honestidade suas habilidades, certificações, disponibilidade e preços antes de aceitar uma solicitação; devem executar o serviço conforme descrito e não podem subcontratar sem consentimento.",
          "Ambas as partes concordam em usar as ferramentas internas da Guidew para registrar informações essenciais e fornecer feedback ou evidências dentro dos prazos definidos."
        ]
      },
      {
        title: "5. Taxas, pagamentos e tributos",
        content: [
          "Salvo orientação diferente da Guidew, os usuários devem pagar o valor total estimado por meio do sistema de pagamentos da Guidew no momento da reserva; os prestadores só podem sacar ganhos após a conclusão do serviço e a respectiva verificação.",
          "A Guidew pode cobrar taxas de tecnologia, transação, assinatura ou outros acréscimos dos usuários e/ou prestadores, todos exibidos com transparência na tela de checkout e no resumo do pedido.",
          "Podemos utilizar processadores de pagamento terceiros, e você autoriza a Guidew a enviar instruções de cobranças e repasses em seu nome.",
          "Os prestadores são totalmente responsáveis por declarar e recolher os tributos aplicáveis; quando exigido por lei, a Guidew poderá reter ou reportar valores."
        ]
      },
      {
        title: "6. Cancelamentos, reembolsos e disputas",
        content: [
          "Usuários podem cancelar sem multa com mais de 24 horas de antecedência; cancelamentos entre 24 e 3 horas do início podem gerar a cobrança de até 50% do valor; cancelamentos em menos de 3 horas ou ausências poderão ser cobrados integralmente.",
          "Se um prestador cancelar ou não comparecer, a Guidew poderá conceder reembolsos, créditos de viagem ou auxiliar na realocação; reincidências podem resultar em suspensão ou exclusão definitiva.",
          "Disputas devem ser abertas pelo app da Guidew em até 7 dias após o término do serviço, anexando provas como conversas, mídias ou recibos.",
          "Após revisar a disputa, a Guidew poderá aplicar medidas como reembolsos, pagamentos parciais, retenção de valores ou outros ajustes apropriados."
        ]
      },
      {
        title: "7. Conteúdo e propriedade intelectual",
        content: [
          "Os serviços, sites, softwares, marcas e demais propriedades intelectuais da Guidew pertencem à Guidew ou a seus licenciadores; você recebe apenas uma licença limitada, revogável e intransferível para usá-los conforme estes Termos.",
          "O conteúdo que você enviar—textos, imagens, certificados ou avaliações—continua sendo seu, mas você concede à Guidew uma licença mundial, gratuita e sublicenciável para hospedar, usar, reproduzir ou distribuir esse conteúdo a fim de operar, aprimorar e promover os serviços.",
          "É proibido copiar, fazer engenharia reversa, modificar ou tentar extrair o código-fonte dos nossos sistemas, bem como utilizar ativos de marca da Guidew sem autorização escrita prévia."
        ]
      },
      {
        title: "8. Segurança e conformidade",
        content: [
          "A Guidew pode exigir verificações adicionais para serviços sensíveis, como acesso domiciliar, cuidado infantil, suporte médico ou qualquer categoria considerada de alto risco, incluindo entrevistas, uploads de documentos ou verificações de terceiros.",
          "Você é responsável por cumprir todas as leis, licenças, normas profissionais e exigências de seguro aplicáveis ao local da prestação do serviço.",
          "Podemos suspender ou encerrar contas e cooperar com autoridades caso detectemos condutas ilegais, fraudulentas ou inseguras."
        ]
      },
      {
        title: "9. Privacidade e dados",
        content: [
          "Ao utilizar a Guidew, você consente com a coleta, uso, compartilhamento e armazenamento de seus dados conforme descrito na Política de Privacidade da Guidew, incluindo informações de identidade, localização, pagamento e comunicações.",
          "Podemos compartilhar dados com provedores de serviços, parceiros ou autoridades sempre que necessário para entrega do serviço, gestão de riscos, suporte ou conformidade, adotando salvaguardas comercialmente razoáveis."
        ]
      },
      {
        title: "10. Isenções de responsabilidade",
        content: [
          "A Guidew oferece a plataforma no estado em que se encontra ('as is') e não dá garantias, expressas ou implícitas, sobre disponibilidade contínua, ausência de erros ou adequação às suas expectativas.",
          "Não garantimos os antecedentes, qualificações, legalidade nem os resultados das interações entre usuários e prestadores."
        ]
      },
      {
        title: "11. Limitação de responsabilidade",
        content: [
          "Na máxima medida permitida pela lei, a Guidew e seus diretores, colaboradores e parceiros não serão responsáveis por danos indiretos, incidentais, punitivos ou consequenciais decorrentes do uso dos serviços.",
          "A responsabilidade total da Guidew por danos diretos fica limitada aos valores que você pagou à Guidew pelos serviços em questão nos seis meses anteriores à reclamação."
        ]
      },
      {
        title: "12. Indenização",
        content: [
          "Você concorda em indenizar e isentar a Guidew e suas afiliadas de quaisquer reclamações, perdas, responsabilidades e despesas (inclusive honorários advocatícios razoáveis) decorrentes de violação destes Termos, da lei ou de direitos de terceiros."
        ]
      },
      {
        title: "13. Lei aplicável e resolução de disputas",
        content: [
          "Estes Termos são regidos pelas leis de Cingapura, sem considerar suas normas sobre conflito de leis.",
          "Qualquer disputa será resolvida de forma definitiva por arbitragem administrada pelo Singapore International Arbitration Centre (SIAC), em inglês, e a sentença arbitral poderá ser executada em qualquer tribunal competente."
        ]
      },
      {
        title: "14. Alterações dos Termos",
        content: [
          "A Guidew pode atualizar estes Termos periodicamente, indicando a data de vigência nesta página e, em caso de alterações relevantes, enviando avisos por e-mail ou dentro do produto.",
          "Ao continuar usando a Guidew após a vigência de novos Termos, você demonstra aceite; se não concordar, deve interromper o uso e encerrar sua conta."
        ]
      },
      {
        title: "15. Fale conosco",
        content: [
          "Em caso de dúvidas sobre estes Termos ou sobre os serviços da Guidew, envie um e-mail para support@guidew.com ou visite https://www.guidew.com/help para conhecer outros canais de suporte."
        ]
      }
    ],
    lastUpdated: "Última atualização: 6 de junho de 2025",
    updateNotice:
      "A Guidew aprimora continuamente sua tecnologia, operações e protocolos de segurança. A versão vigente destes Termos sempre estará em guidew.com/terms e mudanças relevantes poderão ser comunicadas por e-mail ou notificações no app."
  },
  fr: {
    badge: "Conditions d'utilisation",
    title: "Conditions d'utilisation de Guidew",
    description:
      "Ces conditions s'inspirent de la structure adoptée par les principales plateformes de mobilité et sont adaptées à l'offre hybride de voyages et d'expertise locale de Guidew. Merci de les lire attentivement avant de demander ou de proposer un service via Guidew.",
    languagePrompt: "Consultez cette page en :",
    sections: [
      {
        title: "1. Relation contractuelle",
        content: [
          "Les présentes Conditions d'utilisation de Guidew (les \"Conditions\") constituent un accord juridiquement contraignant entre vous — qu'il s'agisse d'un voyageur, d'un prestataire ou d'un représentant d'organisation — et Guidew ainsi que ses sociétés affiliées.",
          "En accédant ou en utilisant guidew.com, l'application Guidew ou tout service associé, vous reconnaissez avoir lu, compris et accepté d'être lié par les Conditions ainsi que par les politiques susceptibles d'être mises à jour par Guidew, y compris notre Politique de confidentialité."
        ]
      },
      {
        title: "2. Services de la plateforme Guidew",
        content: [
          "Guidew fournit des outils technologiques qui mettent en relation les utilisateurs recherchant des expériences locales, une assistance voyage ou des compétences en présentiel avec des prestataires indépendants. Nous facilitons la mise en relation, la messagerie, la planification, les paiements et les dispositifs de sécurité, mais nous ne créons ni n'exécutons les services.",
          "Sauf indication écrite contraire, Guidew n'emploie pas, ne dirige pas et n'assume pas la responsabilité de la conduite des prestataires ; chaque réservation constitue un accord distinct entre l'utilisateur et le prestataire."
        ]
      },
      {
        title: "3. Comptes et éligibilité",
        content: [
          "En créant un compte Guidew, vous confirmez avoir au moins 18 ans et la capacité juridique de contracter ; si vous utilisez Guidew pour une entreprise ou une organisation, vous devez être habilité à l'engager.",
          "Guidew peut à tout moment vous demander de réaliser des vérifications d'identité, des contrôles d'antécédents ou des revues de certifications ; un refus peut entraîner la suspension ou la fermeture du compte.",
          "Vous êtes responsable de la protection de vos identifiants et de toute activité effectuée via votre compte ; avertissez-nous immédiatement en cas d'accès non autorisé."
        ]
      },
      {
        title: "4. Obligations des utilisateurs et des prestataires",
        content: [
          "Les utilisateurs doivent s'assurer que les activités demandées sont légales, sûres et conformes aux réglementations locales, et communiquer aux prestataires des informations précises sur leurs préférences, leurs horaires et leurs exigences.",
          "Les prestataires doivent communiquer de manière honnête leurs compétences, leurs certifications, leur disponibilité et leurs tarifs avant d'accepter une commande ; ils doivent fournir la prestation telle que décrite et ne peuvent pas la sous-traiter sans consentement.",
          "Les deux parties s'engagent à utiliser les outils de messagerie et de documentation intégrés de Guidew pour consigner les informations essentielles et fournir des retours ou des preuves dans les délais requis."
        ]
      },
      {
        title: "5. Frais, paiements et fiscalité",
        content: [
          "Sauf communication écrite différente, les utilisateurs doivent payer le montant estimé intégral via le système de paiement Guidew au moment de la réservation ; les prestataires ne peuvent retirer leur rémunération qu'après réalisation du service et validation.",
          "Guidew peut facturer des frais de technologie, de transaction, d'abonnement ou d'autres surcharges aux utilisateurs et/ou aux prestataires, lesquels seront affichés clairement sur les écrans de paiement et les résumés de commande.",
          "Nous pouvons recourir à des prestataires de paiement tiers, et vous autorisez Guidew à envoyer en votre nom des instructions de débit ou de versement.",
          "Les prestataires sont seuls responsables de la déclaration et du paiement des taxes applicables ; Guidew peut retenir ou déclarer certains montants si la loi l'exige."
        ]
      },
      {
        title: "6. Annulations, remboursements et litiges",
        content: [
          "Les utilisateurs peuvent annuler sans frais plus de 24 heures avant l'heure prévue ; entre 24 et 3 heures, des frais pouvant atteindre 50 % du montant peuvent s'appliquer ; en deçà de 3 heures ou en cas d'absence, la totalité peut être facturée.",
          "Si un prestataire annule ou ne se présente pas, Guidew peut accorder un remboursement, un avoir voyage ou aider à rematcher l'utilisateur ; des violations répétées peuvent entraîner une suspension ou une exclusion définitive de la plateforme.",
          "Toute contestation doit être soumise via l'application Guidew dans les 7 jours suivant la prestation, accompagnée d'éléments probants tels que conversations, médias ou reçus.",
          "Après examen, Guidew peut appliquer des mesures telles que remboursements, paiements partiels, gel de fonds ou autres ajustements jugés appropriés."
        ]
      },
      {
        title: "7. Contenus et propriété intellectuelle",
        content: [
          "Les services, le site, les logiciels, les marques et la propriété intellectuelle associés à Guidew appartiennent à Guidew ou à ses concédants ; vous bénéficiez exclusivement d'une licence limitée, révocable et non transférable pour les utiliser conformément aux présentes Conditions.",
          "Les contenus que vous publiez — textes, images, justificatifs, avis — restent votre propriété, mais vous accordez à Guidew une licence mondiale, gratuite et sublicenciable pour les héberger, les utiliser, les reproduire ou les distribuer afin d'exploiter, d'améliorer et de promouvoir les services.",
          "Il est interdit de copier, désosser, modifier ou tenter d'extraire le code source de nos systèmes, tout comme d'utiliser les éléments de marque de Guidew sans autorisation écrite."
        ]
      },
      {
        title: "8. Sécurité et conformité",
        content: [
          "Guidew peut exiger des contrôles supplémentaires pour les services sensibles tels que l'accès domiciliaire, la garde d'enfants, l'assistance médicale ou toute catégorie jugée à haut risque, ce qui peut inclure entretiens, dépôt de documents ou vérifications tierces.",
          "Vous devez respecter toutes les lois, licences, normes professionnelles et obligations d'assurance applicables au lieu de la prestation.",
          "Nous pouvons suspendre ou fermer des comptes et coopérer avec les autorités si nous détectons des comportements illégaux, frauduleux ou dangereux."
        ]
      },
      {
        title: "9. Confidentialité et données",
        content: [
          "En utilisant Guidew, vous consentez à la collecte, l'utilisation, le partage et le stockage de vos données tels que décrits dans la Politique de confidentialité de Guidew, y compris les informations d'identité, de localisation, de paiement et de communication.",
          "Nous pouvons partager des données avec des prestataires de services, partenaires ou autorités lorsque cela est nécessaire pour la fourniture du service, la gestion des risques, l'assistance ou la conformité, tout en appliquant des mesures de sécurité raisonnables."
        ]
      },
      {
        title: "10. Avertissements",
        content: [
          "Guidew fournit sa plateforme « en l'état » et n'offre aucune garantie expresse ou implicite quant à l'accès ininterrompu, à l'absence d'erreurs ou à l'adéquation du service à vos attentes.",
          "Nous ne garantissons pas les antécédents, qualifications, légalité ni les résultats des interactions entre utilisateurs et prestataires."
        ]
      },
      {
        title: "11. Limitation de responsabilité",
        content: [
          "Dans la limite maximale permise par la loi, Guidew ainsi que ses dirigeants, employés et partenaires ne sauraient être tenus responsables des dommages indirects, accessoires, punitifs ou consécutifs découlant de l'utilisation des services.",
          "La responsabilité cumulée de Guidew pour les dommages directs est limitée aux montants que vous avez payés à Guidew pour les services concernés au cours des six mois précédant la réclamation."
        ]
      },
      {
        title: "12. Indemnisation",
        content: [
          "Vous acceptez d'indemniser et de dégager Guidew et ses affiliées de toute réclamation, perte, responsabilité ou dépense (y compris les honoraires raisonnables d'avocat) résultant de votre violation des présentes Conditions, de la loi ou des droits de tiers."
        ]
      },
      {
        title: "13. Droit applicable et résolution des litiges",
        content: [
          "Les présentes Conditions sont régies par les lois de Singapour, sans tenir compte de ses règles de conflit de lois.",
          "Tout différend sera définitivement réglé par arbitrage administré par le Singapore International Arbitration Centre (SIAC) en anglais, et la décision pourra être exécutée par tout tribunal compétent."
        ]
      },
      {
        title: "14. Modifications des Conditions",
        content: [
          "Guidew peut modifier périodiquement ces Conditions. La date de prise d'effet sera mentionnée sur cette page et des notifications pourront être envoyées par e-mail ou au sein de l'application en cas de changement important.",
          "Le fait de continuer à utiliser Guidew après l'entrée en vigueur de nouvelles Conditions vaut acceptation ; si vous refusez, vous devez cesser d'utiliser les services et fermer votre compte."
        ]
      },
      {
        title: "15. Nous contacter",
        content: [
          "Pour toute question concernant ces Conditions ou les services Guidew, écrivez à support@guidew.com ou rendez-vous sur https://www.guidew.com/help pour connaître nos canaux d'assistance."
        ]
      }
    ],
    lastUpdated: "Dernière mise à jour : 6 juin 2025",
    updateNotice:
      "Guidew améliore en continu sa technologie, ses opérations et ses protocoles de sécurité. La version la plus récente de ces Conditions est disponible sur guidew.com/terms et pourra également vous être communiquée par e-mail ou notification intégrée."
  },
  he: {
    badge: "תנאי שימוש",
    title: "תנאי השירות של Guidew",
    description:
      "מסמך זה מאמץ את המבנה של תנאי השירות של פלטפורמות מובילות ומותאם לסל השירותים של Guidew בעולם הנסיעות והליווי המקומי. קראו אותו במלואו לפני שאתם מבקשים או מספקים שירות ב‑Guidew.",
    languagePrompt: "הציגו את העמוד בשפה:",
    sections: [
      {
        title: "1. מערכת יחסים חוזית",
        content: [
          "תנאי השירות של Guidew (\"התנאים\") מהווים הסכם מחייב מבחינה משפטית ביניכם—בין אם אתם נוסעים, נותני שירות או נציגי ארגון—לבין Guidew וחברות הבנות שלה.",
          "בשימוש ב‑guidew.com, באפליקציית Guidew או בכל שירות קשור אתם מצהירים שקראתם, הבנתם והסכמתם לתנאים ולמדיניות שנעדכן מעת לעת, לרבות מדיניות הפרטיות."
        ]
      },
      {
        title: "2. שירותי הפלטפורמה של Guidew",
        content: [
          "Guidew מספקת כלים טכנולוגיים שמחברים משתמשים המחפשים חוויות מקומיות, תמיכת נסיעות או מיומנויות פרונטליות עם נותני שירות עצמאיים. אנו מאפשרים התאמה, הודעות, תיאום, תשלום ומנגנוני בטיחות, אך איננו יוצרים או מספקים את השירותים עצמם.",
          "אלא אם צוין אחרת בכתב, Guidew אינה מעסיקה, מנהלת או נושאת באחריות להתנהגות נותני השירות; כל הזמנה היא הסכם נפרד בין המשתמש לנותן השירות."
        ]
      },
      {
        title: "3. חשבונות וזכאות",
        content: [
          "פתיחת חשבון Guidew מהווה הצהרה שאתם בני 18 ומעלה ובעלי כשירות משפטית להתקשר בחוזה. אם אתם משתמשים ב‑Guidew בשם חברה או ארגון, עליכם להיות מוסמכים לחייב את הישות.",
          "Guidew רשאית בכל עת לדרוש אימות זהות, בדיקות רקע או בחינת הסמכות; אי־שיתוף פעולה עלול להוביל להשעיה או לסגירת החשבון.",
          "אתם אחראים לשמור על פרטי ההתחברות ולכל פעילות המבוצעת בחשבונכם; הודיעו לנו מיידית אם זיהיתם שימוש בלתי מורשה."
        ]
      },
      {
        title: "4. חובות משתמשים ונותני שירות",
        content: [
          "משתמשים חייבים לוודא שהפעילות המבוקשת חוקית, בטוחה ותואמת לרגולציה המקומית, ולספק לנותן השירות העדפות, לו\"ז ודרישות מדויקים.",
          "נותני שירות חייבים למסור אמת לגבי מיומנויותיהם, תעודותיהם, זמינותם ותמחורם לפני קבלת הזמנה; עליהם לבצע את השירות כפי שתואר ואסור להם להעבירו לצד שלישי ללא הסכמה.",
          "שני הצדדים מתחייבים להשתמש בכלי התקשורת והדוקומנטציה המובנים של Guidew כדי לתעד מידע מהותי ולהגיש משוב או ראיות במסגרת הזמנים שנקבעו."
        ]
      },
      {
        title: "5. עמלות, תשלומים ומסים",
        content: [
          "למעט אם Guidew הודיעה אחרת בכתב, משתמשים חייבים לשלם את הסכום המוערך במלואו באמצעות מערכת התשלומים של Guidew בעת ההזמנה; נותני שירות יכולים למשוך את הכנסותיהם רק לאחר השלמת השירות ואישורו.",
          "Guidew רשאית לגבות דמי שירות טכנולוגיים, עמלות עסקה, מנויים או חיובים נוספים מהמשתמשים ו/או נותני השירות, וכולם יוצגו בבירור במסכי התשלום ובסיכומי ההזמנה.",
          "אנו עשויים להשתמש במעבדי תשלומים חיצוניים, ואתם מסמיכים את Guidew למסור בשמכם הוראות גבייה ותשלום.",
          "נותני שירות אחראים בלעדית לדיווח ולתשלום המסים החלים; Guidew עשויה לנכות או לדווח סכומים אם החוק מחייב זאת."
        ]
      },
      {
        title: "6. ביטולים, החזרים ומחלוקות",
        content: [
          "משתמשים רשאים לבטל ללא קנס עד 24 שעות לפני תחילת השירות; ביטול בין 24 ל‑3 שעות עשוי לחייב עד 50% מערך ההזמנה; ביטול בפחות מ‑3 שעות או אי־הגעה עשויים להביא לחיוב מלא.",
          "אם נותן השירות מבטל או אינו מופיע, Guidew רשאית להעניק החזרים, זיכויי נסיעה או לסייע במציאת החלפה; הפרות חוזרות עלולות להוביל להשעיה או להסרה קבועה.",
          "יש להגיש מחלוקות דרך אפליקציית Guidew בתוך 7 ימים לאחר סיום השירות, בצירוף ראיות כמו תכתובות, מדיה או קבלות.",
          "לאחר בחינת המחלוקת רשאית Guidew להורות על החזר, תשלום חלקי, הקפאת כספים או כל התאמה אחרת שתיחשב מתאימה."
        ]
      },
      {
        title: "7. תוכן וקניין רוחני",
        content: [
          "השירותים, האתר, התוכנה, סימני המסחר וכל זכויות הקניין הרוחני של Guidew שייכים ל‑Guidew או לבעלי הרישיון שלה, ואתם מקבלים רישיון מוגבל, ניתן לביטול ואינו ניתן להעברה לשימוש בהתאם לתנאים.",
          "התוכן שאתם מפרסמים—טקסטים, תמונות, אסמכתאות או ביקורות—נשאר בבעלותכם, אך אתם מעניקים ל‑Guidew רישיון עולמי, חינמי ובר־רישיון־משנה לאחסן, להשתמש, לשכפל או להפיץ אותו לצורך הפעלת השירותים, שיפורם ושיווקם.",
          "אסור להעתיק, לבצע הנדסה לאחור, לשנות או לנסות לחלץ את קוד המקור של מערכותינו, ואסור להשתמש בנכסי המותג של Guidew ללא היתר בכתב."
        ]
      },
      {
        title: "8. בטיחות وציות",
        content: [
          "Guidew רשאית לדרוש בדיקות נוספות עבור שירותים רגישים כגון כניסה לבתים, טיפול בילדים, תמיכה רפואית או קטגוריה אחרת שתימצא בסיכון גבוה, לרבות ראיונות, העלאת מסמכים או בדיקות צד שלישי.",
          "אתם אחראים לעמידה בכל החוקים, הרישיונות, הסטנדרטים המקצועיים ודרישות הביטוח החלים במקום מתן השירות.",
          "נוכל להשעות או לסגור חשבונות ולשתף פעולה עם רשויות כשאנחנו מזהים פעילות בלתי חוקית, תרמיתית או מסוכנת."
        ]
      },
      {
        title: "9. פרטיות וטיפול במידע",
        content: [
          "באמצעות Guidew אתם מסכימים לאיסוף, שימוש, שיתוף ואחסון המידע שלכם כפי שמפורט במדיניות הפרטיות של Guidew, לרבות פרטי זיהוי, מיקום, תשלומים ותקשורת.",
          "נוכל לשתף נתונים עם ספקי שירות, שותפים או רשויות כאשר הדבר נחוץ לביצוע השירות, לניהול סיכונים, לתמיכה או לציות, תוך יישום אמצעי אבטחה סבירים."
        ]
      },
      {
        title: "10. הצהרות וכתבי ויתור",
        content: [
          "Guidew מספקת את הפלטפורמה במתכונת 'כפי שהיא' ואינה נותנת מצגים או אחריות, מפורשים או משתמעים, לגבי זמינות רציפה, ביצועים ללא שגיאות או התאמה מלאה לציפיותיכם.",
          "איננו מבטיחים את הרקע, ההסמכות, החוקיות או תוצאות האינטראקציות בין משתמשים לנותני שירות."
        ]
      },
      {
        title: "11. הגבלת אחריות",
        content: [
          "במידה המרבית שהחוק מאפשר, Guidew ונושאי המשרה, העובדים והשותפים שלה אינם אחראים לכל נזק עקיף, משני, עונשי או תוצאתי הנובע משימושכם בשירותים.",
          "האחריות המצטברת של Guidew לנזקים ישירים מוגבלת לסכומים ששילמתם ל‑Guidew עבור השירותים הרלוונטיים במהלך ששת החודשים שקדמו לתביעה."
        ]
      },
      {
        title: "12. שיפוי",
        content: [
          "הנכם מתחייבים לשפות ולהגן על Guidew ועל החברות הקשורות לה מפני תביעות, הפסדים, אחריויות והוצאות (כולל שכר טרחת עורכי דין סביר) הנובעים מהפרת התנאים, מהפרת הדין או מפגיעה בזכויות צד שלישי."
        ]
      },
      {
        title: "13. דין חל ויישוב מחלוקות",
        content: [
          "התנאים כפופים לחוקי סינגפור ומתפרשים לפיהם, ללא תחולה של כללי ברירת הדין.",
          "כל מחלוקת תיושב באמצעות בוררות של Singapore International Arbitration Centre (SIAC) באנגלית, ופסק הבוררות יהיה סופי וניתן לאכיפה בכל בית משפט מוסמך."
        ]
      },
      {
        title: "14. שינויי תנאים",
        content: [
          "Guidew רשאית לעדכן מעת לעת את התנאים. נציין את מועד התחולה בעמוד זה ונוכל לשלוח הודעות בדוא\"ל או בתוך המוצר לגבי שינויים מהותיים.",
          "המשך שימושכם ב‑Guidew לאחר כניסת תנאים מעודכנים לתוקף מהווה קיבול; אם אינכם מסכימים, עליכם להפסיק להשתמש בשירות ולסגור את החשבון."
        ]
      },
      {
        title: "15. יצירת קשר",
        content: [
          "לשאלות בנוגע לתנאים או לשירותי Guidew, כתבו ל‑support@guidew.com או היכנסו ל‑https://www.guidew.com/help לקבלת ערוצי תמיכה נוספים."
        ]
      }
    ],
    lastUpdated: "עודכן לאחרונה: 6 ביוני 2025",
    updateNotice:
      "Guidew ממשיכה לפתח את הטכנולוגיה, התפעול והפרוטוקולים הבטיחותיים שלה. הגרסה העדכנית של התנאים זמינה תמיד ב‑guidew.com/terms, וייתכן שנשלח הודעות דוא\"ל או התראות במוצר לגבי שינויים מהותיים."
  }
} as const;

const Terms = () => {
  const { i18n } = useTranslation();
  const activeLocale = getTermsLocale(i18n.language);
  const content = termsCopy[activeLocale];

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-4">{content.badge}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-6">{content.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {content.description}
            </p>
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

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-medium mb-3">{content.lastUpdated}</p>
            <p className="text-white/90">
              {content.updateNotice}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
