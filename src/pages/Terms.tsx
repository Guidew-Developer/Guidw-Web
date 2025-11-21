import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Clock, Wallet2, MessageCircle } from "lucide-react";

const termsLocales = ["en", "zh", "es", "pt", "fr", "he", "mi"] as const;
type TermsLocale = (typeof termsLocales)[number];

type TermsSection = {
  title: string;
  content: string[];
};

type TermsHighlight = {
  title: string;
  description: string;
};

type TermsObligationColumn = {
  label: string;
  items: string[];
};

type TermsFAQ = {
  question: string;
  answer: string;
};

type TermsCopy = {
  badge: string;
  title: string;
  description: string;
  sections: TermsSection[];
  languagePrompt: string;
  lastUpdated: string;
  updateNotice: string;
  commitments: {
    heading: string;
    description: string;
    items: TermsHighlight[];
  };
  obligations: {
    heading: string;
    description: string;
    columns: TermsObligationColumn[];
  };
  faq: {
    heading: string;
    description: string;
    items: TermsFAQ[];
  };
  support: {
    heading: string;
    contact: string;
    secondary: string;
    note: string;
  };
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
    commitments: {
      heading: "What you can expect from Guidew",
      description: "We combine legal rigor with human-centric hospitality so travelers, families, and providers operate confidently.",
      items: [
        { title: "Safety-by-design", description: "Identity checks, NDA options, travel-time buffers, and dispute workflows protect every offline experience." },
        { title: "Transparent economics", description: "Pricing, platform fees, VIP subscriptions, and payout schedules are visible before you confirm an order." },
        { title: "Community accountability", description: "Mutual reviews, certificate uploads, and achievement badges keep reputations accurate and current." },
        { title: "AI + human support", description: "Automated briefs, itinerary builders, and concierge teams stand by across time zones." }
      ]
    },
    obligations: {
      heading: "Your responsibilities at a glance",
      description: "Use this checklist whenever you switch between requester and provider roles.",
      columns: [
        {
          label: "When you're requesting services",
          items: [
            "Confirm that the activity is lawful and that you hold any required permits or insurance.",
            "Share precise locations, time ranges, accessibility info, and cultural or medical sensitivities.",
            "Pay deposits or full balances through Guidew before service begins and use in-app chat for updates.",
            "Log feedback or disputes within 7 days so our team can intervene if needed."
          ]
        },
        {
          label: "When you're providing services",
          items: [
            "Keep skills, certificates, and minimum booking rules accurate and visible in your profile.",
            "Arrive with enough buffer time; notify the client inside the app if delays occur.",
            "Use Guidew's payment rails only—no off-platform invoicing for the same booking.",
            "Respect privacy: store NDAs, recordings, or itinerary files only where Guidew allows."
          ]
        }
      ]
    },
    faq: {
      heading: "Frequently asked compliance questions",
      description: "These quick answers summarize common policies; the detailed clauses below still govern.",
      items: [
        {
          question: "Can I negotiate or modify pricing outside Guidew?",
          answer:
            "You can discuss scope inside the Guidew chat, but every confirmed change must be reflected in the in-app order so taxes, insurance, and payouts stay accurate."
        },
        {
          question: "What happens if travel delays impact my booking?",
          answer:
            "Notify the other party immediately via chat. Guidew may adjust or waive penalties when verified disruptions such as weather or airline issues occur, but documentation is required."
        },
        {
          question: "How do I escalate a safety concern?",
          answer:
            "Use the in-app safety button or email safety@guidew.com with order references, evidence, and any urgent needs. We collaborate with local authorities when required."
        }
      ]
    },
    support: {
      heading: "Need legal or operational support?",
      contact: "Email: legal@guidew.com",
      secondary: "Hotline (24/7): +64 (21) 513-258",
      note: "For product feedback or accessibility requests, reach out via help.guidew.com so we can route you to the correct team."
    },
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
          "Unless we explicitly state otherwise in writing, Guidew does not employ, manage, or assume responsibility for providers' conduct; every reservation represents a separate agreement between user and provider.",
          "The first release of Guidew focuses on Auckland and Wellington. Phase-by-phase, we target 1,000 MVP testers in the first six months, 5,000–10,000 users by month 12, 100,000 New Zealand users by month 24, expansion into Australia with a cumulative 200,000 users after month 25, and multilingual global coverage beginning in year five."
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
          "Every provider profile must list each service, its hourly price, the minimum number of billable hours, applicable tags, and proof of ability (photos, videos, or certifications). Certain categories—such as home access, childcare, or medical support—require enhanced verification (for example criminal background checks or professional licenses).",
          "Both parties agree to use Guidew's in-app messaging and documentation tools to record critical information and to provide feedback or evidence within the required timelines. Registered users may upgrade to provider status at sign-up or later inside the account settings, and only logged-in users may request or supply services.",
          "Provider dashboards include four primary tabs (Claim, Front Desk, Orders, My Account); claim mode surfaces live requests and a single-tap \"Claim\" button. Auto-accept, AI itinerary builders, and AI customer-support responders are exclusive to VIP providers. Requesters access Recommended, Discover (map/list), Plan, and My Account tabs to browse nearby providers, run calendar views, manage wallets, and launch chats."
        ]
      },
      {
        title: "5. Fees, payments, and taxes",
        content: [
          "Unless Guidew communicates otherwise in writing, users must pay the full estimated amount through Guidew's payment system at the time of booking; Guidew holds funds in escrow and releases provider payouts seven (7) days after the service is marked complete and no disputes are pending.",
          "Guidew may charge technology service fees, transaction fees, subscriptions, or other surcharges to users and/or providers, all of which will be disclosed on checkout screens and order summaries.",
          "Guidew's core marketplace fee equals fifteen percent (15%) of each successful transaction. VIP subscriptions are separate products: requesters may purchase VIP for USD 9.90 per month to eliminate per-request hiring fees, unlock AI drafting of service briefs, and receive priority matching; providers may opt into Guidew VIP for USD 99 per month to access auto-accept, AI itinerary generation, AI chat handling, and expanded travel-range alerts.",
          "We may use third-party payment processors, including Stripe for the MVP, and you authorize Guidew to submit payment instructions on your behalf for both charges and payouts. Apple Pay and Google Pay will be added in later phases.",
          "Providers are solely responsible for reporting and paying applicable taxes; Guidew may withhold or report amounts if the law requires. Tips paid by requesters prior to submitting a review are treated as additional revenue and disbursed after the same seven-day hold.",
          "Users must pay for any ancillary items (tickets, fuel, tolls, rentals) that are not explicitly included in a provider's quoted rate. Providers must clearly state whether their prices include those pass-through costs."
        ]
      },
      {
        title: "6. Cancellations, refunds, and disputes",
        content: [
          "Users may cancel more than three (3) hours before the service start without penalty and receive a full refund. If a user cancels between three (3) hours and one (1) hour before the start, Guidew charges the order and allocates fifty percent (50%) to the user as a refund, twenty-five percent (25%) to the provider, and retains fifteen percent (15%) as the platform fee. Cancellations inside one (1) hour or after the start provide no refund to the user unless both parties mutually agree to cancel, in which case the user receives eighty-five percent (85%) and Guidew retains fifteen percent (15%).",
          "If a provider cancels between one (1) and three (3) hours prior, Guidew refunds the user one hundred percent (100%) and issues the provider one (1) penalty point; cancellations inside one (1) hour create two (2) penalty points; cancellations after the scheduled start create four (4) penalty points; and no-shows create six (6) penalty points. Guidew may suspend or permanently remove providers who accumulate excessive points.",
          "When services start, providers must remain on site (or online) for the booked duration even if the requester is late or absent. If the provider fails to appear, Guidew refunds the user in full. If the requester fails to appear, the booking remains payable and the provider still earns the contracted payout after the seven-day hold.",
          "Disputes must be submitted through the Guidew app within seven (7) days after the service ends, with supporting evidence such as chat transcripts, media, receipts, or itinerary documents. Guidew may impose remedies that include refunds, partial payouts, withholding funds, tipping reversals, or any other adjustments we deem appropriate after reviewing the dispute.",
          "After each service, both parties may submit mutually dependent reviews: requesters select \"worth it\" or \"not worth it\" and describe reasons, providers choose \"willing to serve again\" or \"prefer not to serve again\" with explanations, and optional tips can be left before submitting feedback. Reviews become visible only after both parties submit or three (3) days elapse without a dispute."
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
          "You are responsible for complying with all laws, permits, professional standards, and insurance requirements that apply where the service takes place. Providers must keep their location settings current so Guidew can calculate travel buffers and push reminders ahead of the next booking; VIP providers may configure extended activity zones and proactive alerts when upcoming services risk lateness.",
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
    commitments: {
      heading: "Guidew 提供的保障",
      description: "我们用严密的合规体系配合具有温度的服务体验，让旅客与服务者都能放心合作。",
      items: [
        { title: "安全优先", description: "身份核验、NDA 选项、路程缓冲与争议流程共同护航每一次线下体验。" },
        { title: "价格透明", description: "价格、平台费、VIP 订阅与结算节奏全程可见，确认前一目了然。" },
        { title: "社区共治", description: "互评体系、证书上传与成就徽章确保每个履历都保持可信且实时。" },
        { title: "AI + 人工支持", description: "AI 简报、行程助手与跨时区客服共同在线，随时提供指引。" }
      ]
    },
    obligations: {
      heading: "角色切换速查表",
      description: "无论是下单还是接单，请遵循以下要点。",
      columns: [
        {
          label: "作为用户",
          items: [
            "确认活动合法合规，并自备必要许可或保险。",
            "提供准确的地点、时间区间、无障碍需求及文化或医疗敏感信息。",
            "在服务开始前通过 Guidew 完成支付，并使用站内聊天更新行程。",
            "在 7 天内提交反馈或争议，便于我们介入处理。"
          ]
        },
        {
          label: "作为服务者",
          items: [
            "保持技能、证书、最低预定时长等信息实时更新。",
            "预留足够交通缓冲；若延迟需在 App 内告知用户。",
            "仅使用 Guidew 支付渠道，不得线下另行收费结算。",
            "尊重隐私，仅在 Guidew 允许的范围内存储 NDA、录音或行程文件。"
          ]
        }
      ]
    },
    faq: {
      heading: "常见合规问题",
      description: "以下解答帮助你快速理解重点条款，详细规则以正式条款为准。",
      items: [
        {
          question: "能否在 Guidew 之外重新议价？",
          answer: "可以在站内聊天讨论服务范围，但任何变更都必须同步更新订单，以便税费、保险与结算正确记录。"
        },
        {
          question: "旅途延误影响订单怎么办？",
          answer: "请立即在聊天中通知对方。若有天气、航班等可验证因素，Guidew 可酌情减免罚金，但需提供凭证。"
        },
        {
          question: "如何上报安全事件？",
          answer: "请使用 App 内的安全入口，或发送邮件至 safety@guidew.com，附上订单信息与证据，必要时我们会协同当地机构处理。"
        }
      ]
    },
    support: {
      heading: "需要法律或运营支持？",
      contact: "邮箱：legal@guidew.com",
      secondary: "24/7 热线：+64 (21) 513-258",
      note: "如需产品反馈或无障碍支持，请前往 help.guidew.com，我方会转交至对应团队。"
    },
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
          "除非另有书面说明，Guidew 不雇佣、不管理也不对服务者的行为承担代理责任，每一份订单均是用户与服务者之间的独立协议。",
          "Guidew 将分阶段扩张：首发 6 个月以内完成 MVP 并在奥克兰、惠灵顿招募 1,000 名测试用户；第 6-12 个月拓展至 5,000-10,000 名本地用户；第 13-24 个月覆盖新西兰 100,000 名用户；第 25 个月起进入澳大利亚并累计 200,000 名用户；第 5 年开始走向国际并提供多语言能力。"
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
          "每位服务者必须在档案中列出可提供的服务、每小时价格、最低可接受时长、服务标签，并上传展示实力的照片、视频或证书。入户、儿童照护、医疗等敏感类别需要额外的身份验证或背景审查。",
          "所有注册用户都可以在初始注册或后续账户设置中申请成为服务者；只有已登录的用户才能发布需求或接受订单，双方都需通过站内聊天与记录工具留存关键沟通并在期限内提交反馈或证据。",
          "服务者工作台包括“抢单”“门面”“订单”“我的”四个主界面：抢单模式展示实时需求与巨大的“抢”按钮；VIP 可额外启用自动接单、AI 行程生成、AI 客服与超距提醒。普通用户端包含“推荐”“浏览（地图/列表）”“计划”“我的”等标签，可探索附近服务、通过日历查看未来行程、管理钱包与发起聊天。"
        ]
      },
      {
        title: "5. 费用、支付与税务",
        content: [
          "除非 Guidew 另行说明，用户需在下单时通过 Guidew 支付系统一次性支付全部预估金额；平台托管该笔资金，在服务完成且无争议后七（7）天将款项释放给服务者。",
          "Guidew 针对每一成功订单收取 15% 的平台佣金，并可能按需收取技术服务费、交易费或其他附加费用，所有费用都会在结算页面或订单详情中明确显示。",
          "VIP 订阅分为普通用户版（9.9 美元/月，提供免雇佣费、AI 需求草拟、优先匹配等权益）与服务者版（99 美元/月，提供自动接单、AI 行程生成、AI 客服、远距提醒等功能）。",
          "Guidew 当前通过 Stripe 处理收付款，未来将依阶段支持 Apple Pay 与 Google Pay；您授权 Guidew 代表您发起扣款、退款或打款指令。",
          "服务者须自行申报并缴纳适用税费；若法律要求，Guidew 可执行代扣、申报或冻结。用户在提交评价前支付的小费视为额外收入，亦会在七天后随同订单款项一并结算。",
          "除非服务者在报价中明确包含，否则用户需承担旅途中产生的门票、燃油、租车、通行费等成本；服务者也必须在价格说明中标注是否包含上述费用。"
        ]
      },
      {
        title: "6. 取消、退款与争议",
        content: [
          "用户在服务开始 3 小时前取消可获全额退款；距开始 3-1 小时取消时，平台会按 50% 退还给用户、25% 支付给服务者、15% 作为平台费；少于 1 小时取消或服务开始后取消将不再退款，除非双方协商一致，此时用户可拿回 85%、平台保留 15%。",
          "服务者若在开始前 1-3 小时取消，用户获得 100% 退款且服务者记 1 个惩罚点；不足 1 小时记 2 点；开始后取消记 4 点；缺席记 6 点。惩罚点累计过多将触发账号暂停或永久封禁。",
          "服务开始后，即便用户迟到或未出现，服务者仍需留在现场（或线上）直至预定时段结束方可领取报酬；若服务者缺席，用户获得全额退款。",
          "任何争议需在服务结束 7 天内通过 App 提交，并附上聊天记录、媒体、收据或行程文件等证据。Guidew 可视情况作出退款、部分结算、冻结小费或其他调整。",
          "服务完成后双方可互评：用户选择“值得/不值得”并可在提交前支付小费；服务者选择“愿意再次服务/不愿意”并说明原因。只有双方都提交或 3 天内无人发起争议，评价内容才会公开。"
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
          "您有责任遵守服务所在地的法律、许可要求、行业标准与保险义务，并保持定位与行程提醒设置实时有效，以便平台根据下一单自动推送出发提醒；VIP 服务者可配置更大的活动范围与延迟预警。",
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
    commitments: {
      heading: "Lo que garantiza Guidew",
      description: "Unimos cumplimiento estricto y hospitalidad humana para que usuarios y proveedores operen con confianza en cada ciudad.",
      items: [
        { title: "Seguridad diseñada", description: "Verificaciones de identidad, NDAs opcionales, márgenes de traslado y flujos de disputa protegen cada encuentro presencial." },
        { title: "Economía transparente", description: "Precios, tarifas de plataforma, suscripciones VIP y calendarios de pago son visibles antes de confirmar." },
        { title: "Responsabilidad comunitaria", description: "Reseñas mutuas, carga de certificados y distintivos de logros mantienen las reputaciones actualizadas." },
        { title: "IA + soporte humano", description: "Briefings automáticos, planificadores con IA y equipos de concierge cubren múltiples husos horarios." }
      ]
    },
    obligations: {
      heading: "Checklist rápido de responsabilidades",
      description: "Consulte este cuadro cada vez que cambie de rol.",
      columns: [
        {
          label: "Cuando solicitas servicios",
          items: [
            "Confirma que la actividad es legal y que cuentas con licencias o seguros necesarios.",
            "Comparte ubicaciones precisas, ventanas horarias, necesidades de accesibilidad y cualquier sensibilidad cultural o médica.",
            "Paga anticipos o saldos completos a través de Guidew antes de que inicie el servicio y utiliza el chat interno para actualizar al proveedor.",
            "Envía comentarios o disputas dentro de los 7 días para que podamos intervenir si fuera necesario."
          ]
        },
        {
          label: "Cuando prestas servicios",
          items: [
            "Mantén tus habilidades, certificados y reglas mínimas de reserva actualizadas en el perfil.",
            "Llega con suficiente margen de traslado y avisa en la app si surge un retraso.",
            "Utiliza exclusivamente los canales de pago de Guidew; no emitas facturas fuera de la plataforma para la misma orden.",
            "Respeta la privacidad: guarda NDAs, grabaciones o itinerarios solo en los espacios permitidos por Guidew."
          ]
        }
      ]
    },
    faq: {
      heading: "Preguntas frecuentes de cumplimiento",
      description: "Respuestas breves; las cláusulas completas siguen más abajo.",
      items: [
        {
          question: "¿Puedo renegociar precios fuera de Guidew?",
          answer: "Puedes ajustar el alcance en el chat, pero toda modificación confirmada debe reflejarse en la orden oficial para mantener impuestos, seguros y pagos correctos."
        },
        {
          question: "¿Qué sucede si un retraso de viaje afecta mi reserva?",
          answer: "Informa de inmediato por el chat. Guidew podrá ajustar o eximir penalidades cuando existan pruebas de clima, aerolíneas u otros factores inevitables."
        },
        {
          question: "¿Cómo escalo un problema de seguridad?",
          answer: "Usa el botón de seguridad en la app o escribe a safety@guidew.com con el número de pedido y evidencia; colaboramos con autoridades locales cuando corresponde."
        }
      ]
    },
    support: {
      heading: "¿Necesitas soporte legal u operativo?",
      contact: "Correo: legal@guidew.com",
      secondary: "Línea 24/7: +64 (21) 513-258",
      note: "Para comentarios de producto o accesibilidad visita help.guidew.com y te conectaremos con el equipo adecuado."
    },
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
          "Salvo que lo indiquemos expresamente por escrito, Guidew no emplea ni dirige a los proveedores ni asume responsabilidad por su conducta; cada reserva es un acuerdo independiente entre usuario y proveedor.",
          "La primera versión pública se centra en Auckland y Wellington: aspiramos a 1.000 testers en los primeros seis meses, 5.000‑10.000 usuarios antes de cumplir 12 meses, 100.000 usuarios neozelandeses antes de los 24 meses, expansión a Australia con 200.000 usuarios acumulados a partir del mes 25 y, en el quinto año, despliegues globales multilingües."
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
          "Cada perfil de proveedor debe enumerar los servicios ofrecidos, el precio por hora, el mínimo de horas aceptadas, las etiquetas relevantes y las evidencias de experiencia (fotos, videos o certificados). Las categorías sensibles como acceso al hogar, cuidado infantil o apoyo médico requieren verificaciones adicionales como antecedentes penales o licencias profesionales.",
          "Cualquier usuario registrado puede solicitar ser proveedor durante el alta inicial o desde la sección “Mi cuenta”; únicamente los usuarios autenticados pueden solicitar u ofrecer servicios, y ambas partes deben usar los registros internos para conservar comunicaciones y aportar evidencia dentro de los plazos.",
          "La app del proveedor incluye cuatro pestañas principales (Reclamar, Escaparate, Órdenes, Mi cuenta); el modo Reclamar muestra demandas en tiempo real y un gran botón para aceptar. El auto‑aceptar, los itinerarios generados por IA y el soporte IA solo están disponibles para proveedores VIP. El frente de usuario incluye Recomendar, Descubrir (mapa/lista), Plan y Mi cuenta para explorar servicios cercanos, revisar calendarios, gestionar la billetera y abrir chats."
        ]
      },
      {
        title: "5. Tarifas, pagos e impuestos",
        content: [
          "Salvo comunicación distinta de Guidew, los usuarios pagan el importe total estimado al momento de reservar; el monto queda en custodia y sólo se libera al proveedor siete (7) días después de que el servicio se marque como completo y no existan disputas.",
          "Guidew aplica una comisión del quince por ciento (15%) sobre cada transacción exitosa y puede añadir cargos tecnológicos o de procesamiento, todos visibles en el checkout y en el resumen del pedido.",
          "Las suscripciones VIP son productos independientes: los usuarios pueden pagar USD 9,90/mes para eliminar cargos por contratación, acceder a redacción de briefs con IA y recibir prioridad de emparejamiento; los proveedores pueden pagar USD 99/mes para habilitar auto‑aceptación, itinerarios con IA, atención automática y alertas de cobertura ampliada.",
          "Actualmente utilizamos Stripe como procesador de pagos y usted autoriza a Guidew a emitir cargos, reembolsos y pagos en su nombre; Apple Pay y Google Pay se integrarán en fases posteriores.",
          "Los proveedores son responsables de reportar y pagar los impuestos correspondientes; Guidew puede retener o informar montos cuando la ley lo exija. Las propinas que el usuario deja antes de publicar su reseña se consideran ingresos adicionales y siguen el mismo ciclo de liberación de siete días.",
          "Salvo que el proveedor indique expresamente lo contrario, el usuario debe cubrir gastos adicionales como entradas, combustible, peajes o alquileres; el proveedor también debe aclarar en su tarifa si dichos costos están incluidos."
        ]
      },
      {
        title: "6. Cancelaciones, reembolsos y disputas",
        content: [
          "Los usuarios pueden cancelar sin penalización con más de tres (3) horas de anticipación; entre tres (3) y una (1) hora antes, Guidew liquida la orden y distribuye 50 % al usuario, 25 % al proveedor y 15 % a la plataforma; dentro de la última hora o después del inicio no hay reembolso salvo acuerdo mutuo (en cuyo caso el usuario recibe 85 % y la plataforma 15 %).",
          "Si un proveedor cancela entre una (1) y tres (3) horas antes, el usuario recibe el 100 % y el proveedor acumula un punto de penalización; cancelar dentro de la última hora suma dos puntos; cancelar tras la hora pactada suma cuatro; no presentarse suma seis. Guidew puede suspender o dar de baja a quienes acumulen demasiados puntos.",
          "Una vez iniciado el servicio, el proveedor debe permanecer en el lugar (o conectado) durante la duración acordada aunque el usuario llegue tarde o no asista; si el proveedor no se presenta, el usuario recibe el 100 % del pago. Si el usuario no llega, el servicio sigue siendo cobrable y se libera al proveedor tras el periodo de custodia.",
          "Las disputas deben enviarse en la app dentro de los siete (7) días posteriores al servicio e incluir chats, archivos multimedia, recibos o documentos de itinerario. Guidew puede emitir reembolsos, pagos parciales, retenciones de propinas u otros ajustes tras revisar la evidencia.",
          "Después del servicio, ambas partes pueden dejar evaluaciones vinculadas: el usuario marca “vale la pena” o “no vale la pena” (y puede dejar propina antes de enviar), mientras que el proveedor elige “volvería a atender” o “prefiero no repetir”. Las reseñas se publican solo cuando ambos califican o cuando pasan tres (3) días sin disputas."
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
          "Usted es responsable de cumplir con todas las leyes, permisos, normas profesionales y requisitos de seguro aplicables en el lugar donde se presta el servicio, así como de mantener actualizado su posicionamiento para que la plataforma pueda calcular tiempos de traslado y enviar recordatorios antes de cada servicio; los proveedores VIP pueden configurar zonas ampliadas y alertas de posible retraso.",
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
    commitments: {
      heading: "O que garantimos aos parceiros Guidew",
      description: "Combinamos rigor jurídico com hospitalidade humana para que hóspedes e prestadores atuem com confiança em qualquer cidade.",
      items: [
        { title: "Segurança desde o desenho", description: "Verificação de identidade, NDAs opcionais, buffers de deslocamento e fluxos de disputa protegem cada encontro presencial." },
        { title: "Economia transparente", description: "Preços, taxas da plataforma, assinaturas VIP e cronogramas de pagamento aparecem antes da confirmação." },
        { title: "Responsabilidade comunitária", description: "Avaliações mútuas, envio de certificados e selos de conquistas mantêm reputações sempre atualizadas." },
        { title: "IA + suporte humano", description: "Briefings automáticos, planners com IA e concierge em múltiplos fusos garantem cobertura contínua." }
      ]
    },
    obligations: {
      heading: "Checklist rápido de responsabilidades",
      description: "Consulte esta lista sempre que alternar entre usuário e prestador.",
      columns: [
        {
          label: "Quando você contrata serviços",
          items: [
            "Confirme que a atividade é legal e possua licenças ou seguros exigidos.",
            "Compartilhe locais exatos, intervalos de horário, requisitos de acessibilidade e sensibilidades médicas ou culturais.",
            "Pague depósitos ou valores integrais via Guidew antes do início e use o chat interno para atualizações.",
            "Registre feedback ou disputas em até 7 dias para que possamos intervir se necessário."
          ]
        },
        {
          label: "Quando você presta serviços",
          items: [
            "Mantenha habilidades, certificados e regras mínimas de reserva atualizados no perfil.",
            "Chegue com margem de deslocamento e avise no app caso haja atrasos.",
            "Utilize apenas os meios de pagamento da Guidew—sem cobrança fora da plataforma para o mesmo pedido.",
            "Respeite a privacidade: armazene NDAs, gravações ou itinerários somente nos canais aprovados pela Guidew."
          ]
        }
      ]
    },
    faq: {
      heading: "Perguntas frequentes de compliance",
      description: "Respostas rápidas—os detalhes oficiais permanecem nas seções abaixo.",
      items: [
        {
          question: "Posso renegociar valores fora da Guidew?",
          answer: "Você pode alinhar escopo via chat interno, mas toda mudança confirmada deve ser refletida no pedido oficial para manter impostos, seguros e repasses corretos."
        },
        {
          question: "E se um atraso de viagem afetar minha reserva?",
          answer: "Notifique a outra parte imediatamente. A Guidew pode ajustar ou isentar penalidades quando houver documentação sobre clima, companhias aéreas ou outros fatores inevitáveis."
        },
        {
          question: "Como escalar uma questão de segurança?",
          answer: "Use o botão de segurança no app ou envie e-mail para safety@guidew.com com o número do pedido e evidências; acionamos autoridades locais quando necessário."
        }
      ]
    },
    support: {
      heading: "Precisa de suporte jurídico ou operacional?",
      contact: "E-mail: legal@guidew.com",
      secondary: "Linha 24/7: +64 (21) 513-258",
      note: "Para feedback de produto ou acessibilidade, utilize help.guidew.com para encaminharmos ao time correto."
    },
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
          "Salvo indicação escrita em contrário, a Guidew não emprega, não gerencia nem assume responsabilidade pela conduta dos prestadores; cada reserva constitui um acordo independente entre usuário e prestador.",
          "O roadmap prevê: 1.000 usuários beta em seis meses para o MVP em Auckland e Wellington; 5-10 mil usuários até o 12º mês; 100 mil usuários neozelandeses até o mês 24; expansão para a Austrália com 200 mil usuários acumulados após o mês 25; e, a partir do quinto ano, rollout internacional com suporte multilíngue."
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
          "Todo perfil de prestador deve listar os serviços oferecidos, preço por hora, número mínimo de horas, tags de especialidade e materiais que comprovem a competência (fotos, vídeos ou certificados). Serviços sensíveis como acesso a residências, cuidado infantil ou suporte médico podem exigir autenticações adicionais, incluindo antecedentes criminais.",
          "Após concluir o cadastro básico, qualquer usuário pode solicitar o status de prestador; apenas contas autenticadas podem pedir ou oferecer serviços. Ambas as partes devem usar o chat interno e os registros do app para documentar conversas e enviar evidências dentro dos prazos.",
          "A navegação do prestador inclui as abas “Roubar Pedido”, “Vitrine”, “Pedidos” e “Minha Conta”; o modo de captura mostra demandas em tempo real e um grande botão de aceite. Recursos como autoaceitação, itinerários e atendimento por IA, bem como alertas avançados de deslocamento, são exclusivos do VIP. Do lado do usuário, as abas “Recomendar”, “Descobrir (mapa/lista)”, “Planos” e “Minha Conta” permitem explorar serviços próximos, visualizar o calendário, gerenciar a carteira e iniciar conversas."
        ]
      },
      {
        title: "5. Taxas, pagamentos e tributos",
        content: [
          "Salvo orientação diferente, o usuário paga o valor total estimado no momento da reserva; o montante fica em custódia e só é liberado ao prestador sete (7) dias depois que o serviço é concluído e não há disputas.",
          "A Guidew recolhe 15% de comissão sobre cada transação e pode adicionar taxas tecnológicas ou de processamento visíveis no checkout e no resumo do pedido.",
          "As assinaturas VIP são produtos separados: usuários pagam USD 9,90/mês para remover taxas de contratação, gerar briefs com IA e receber prioridade; prestadores pagam USD 99/mês para ativar autoaceite, roteiros por IA, atendimento automatizado e alertas de alcance ampliado.",
          "Atualmente utilizamos o Stripe como processador e você autoriza a Guidew a executar cobranças, reembolsos e repasses; Apple Pay e Google Pay serão adicionados em fases posteriores.",
          "Prestadores são responsáveis por declarar e recolher tributos; quando exigido por lei, a Guidew pode reter ou reportar valores. Gorjetas pagas antes da avaliação são tratadas como receita adicional e seguem o mesmo cronograma de sete dias.",
          "Exceto se o prestador indicar explicitamente, o usuário deve arcar com ingressos, combustível, pedágios, aluguel de veículos ou quaisquer custos de itinerário; o prestador deve deixar claro se tais despesas já estão embutidas na tarifa."
        ]
      },
      {
        title: "6. Cancelamentos, reembolsos e disputas",
        content: [
          "Usuários podem cancelar sem multa até três (3) horas antes do início; entre três (3) e uma (1) hora, cobramos a ordem e distribuímos 50% ao usuário, 25% ao prestador e 15% à plataforma; dentro da última hora ou após o início não há reembolso, salvo acordo mútuo (usuário recebe 85% e a plataforma retém 15%).",
          "Se o prestador cancelar entre uma (1) e três (3) horas antes, o usuário recebe 100% e o prestador acumula 1 ponto de penalidade; dentro de uma hora acumula 2 pontos; cancelar após o horário marcado gera 4 pontos; falta injustificada gera 6 pontos. Pontuações elevadas podem levar à suspensão ou remoção definitiva.",
          "Com o serviço em andamento, o prestador deve permanecer no local (ou online) até o final, mesmo que o usuário se atrase ou não apareça; se o prestador faltar, o usuário recebe reembolso integral. Se o usuário não aparecer, a cobrança permanece válida e a liberação ocorre após o período de custódia.",
          "Disputas precisam ser abertas no app em até sete (7) dias após o término, anexando chats, mídias, recibos ou documentos de itinerário. A Guidew poderá emitir reembolsos, pagamentos parciais, reter gorjetas ou aplicar outros ajustes conforme a análise.",
          "Após o serviço, ambos podem enviar avaliações vinculadas: o usuário escolhe “vale a pena” ou “não vale” (e pode deixar gorjeta antes de enviar); o prestador seleciona “voltaria a atender” ou “prefiro não repetir”. As avaliações só ficam públicas quando ambos respondem ou quando se passam três (3) dias sem disputas."
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
          "Você é responsável por cumprir todas as leis, licenças, normas profissionais e exigências de seguro aplicáveis ao local da prestação e por manter seu posicionamento atualizado para que a plataforma calcule buffers de deslocamento e envie lembretes antes da próxima sessão; prestadores VIP podem configurar áreas de atuação maiores e alertas automáticos de possível atraso.",
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
    commitments: {
      heading: "Ce que Guidew garantit",
      description: "Nous allions une conformité stricte et une hospitalité humaine afin que voyageurs et prestataires collaborent sereinement.",
      items: [
        { title: "Sécurité intégrée", description: "Vérifications d'identité, NDA en option, marges de déplacement et procédures de litige couvrent chaque mission sur le terrain." },
        { title: "Transparence économique", description: "Tarifs, frais de plateforme, abonnements VIP et calendriers de versement sont affichés avant confirmation." },
        { title: "Responsabilité collective", description: "Avis bilatéraux, dépôts de certificats et badges de réussite maintiennent les réputations à jour." },
        { title: "IA + assistance humaine", description: "Briefings automatisés, planification par IA et concierges multilingues sont disponibles en continu." }
      ]
    },
    obligations: {
      heading: "Rappel express des obligations",
      description: "Référez-vous à ce tableau lorsque vous changez de rôle.",
      columns: [
        {
          label: "En tant qu'utilisateur",
          items: [
            "Vérifiez que l'activité est légale et détenez les licences ou assurances nécessaires.",
            "Partagez des adresses précises, créneaux horaires, besoins d'accessibilité et sensibilités culturelles ou médicales.",
            "Réglez les acomptes ou montants complets via Guidew avant le début et utilisez la messagerie pour toute mise à jour.",
            "Soumettez retours ou litiges sous 7 jours afin que nous puissions intervenir rapidement."
          ]
        },
        {
          label: "En tant que prestataire",
          items: [
            "Maintenez vos compétences, certificats et règles de réservation à jour sur votre profil.",
            "Anticipez les temps de trajet et prévenez dans l'app en cas de retard.",
            "Utilisez exclusivement les paiements Guidew—pas de facturation hors plateforme pour la même mission.",
            "Respectez la confidentialité : stockez NDA, enregistrements ou itinéraires uniquement via les outils approuvés."
          ]
        }
      ]
    },
    faq: {
      heading: "Questions fréquentes de conformité",
      description: "Ces réponses n'exonèrent pas de la lecture intégrale des clauses ci-dessous.",
      items: [
        {
          question: "Puis-je renégocier hors de la plateforme ?",
          answer: "Vous pouvez ajuster le périmètre via la messagerie, mais toute modification fermement validée doit apparaître dans la commande officielle pour garantir taxes, assurances et paiements."
        },
        {
          question: "Que faire en cas de retard de voyage ?",
          answer: "Avertissez votre interlocuteur immédiatement. Guidew peut réduire ou annuler des pénalités si des preuves (météo, compagnies aériennes, etc.) sont fournies."
        },
        {
          question: "Comment signaler une urgence de sécurité ?",
          answer: "Utilisez le bouton de sécurité intégré ou écrivez à safety@guidew.com avec le numéro de commande et les éléments justificatifs ; nous travaillons avec les autorités locales si nécessaire."
        }
      ]
    },
    support: {
      heading: "Besoin d'aide juridique ou opérationnelle ?",
      contact: "Email : legal@guidew.com",
      secondary: "Hotline 24/7 : +64 (21) 513-258",
      note: "Pour vos retours produit ou besoins d'accessibilité, contactez help.guidew.com afin d'être redirigé vers l'équipe adéquate."
    },
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
          "Sauf indication écrite contraire, Guidew n'emploie pas, ne dirige pas et n'assume pas la responsabilité de la conduite des prestataires ; chaque réservation constitue un accord distinct entre l'utilisateur et le prestataire.",
          "Notre feuille de route prévoit 1 000 bêta‑testeurs à Auckland/Wellington dans les six premiers mois, 5 000 à 10 000 utilisateurs avant le douzième mois, 100 000 utilisateurs néo‑zélandais avant le vingt‑quatrième mois, une expansion en Australie avec 200 000 utilisateurs cumulés après le mois 25, puis un déploiement international multilingue à partir de la cinquième année."
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
          "Chaque profil prestataire doit détailler les services proposés, le tarif horaire, le minimum de réservation, les tags pertinents et des justificatifs (photos, vidéos, certificats). Les catégories sensibles comme l'accès domiciliaire, la garde d'enfants ou le soutien médical exigent des vérifications renforcées telles que des extraits de casier judiciaire.",
          "Tout utilisateur inscrit peut demander le statut prestataire lors de l'onboarding ou plus tard dans l'espace compte ; seuls les utilisateurs connectés peuvent publier ou accepter des commandes. Les parties doivent utiliser la messagerie intégrée pour conserver les preuves et soumettre retours ou pièces dans les délais.",
          "L'interface prestataire se compose des onglets Prise, Vitrine, Commandes et Mon Compte ; le mode Prise affiche les demandes en temps réel avec un bouton unique pour accepter. L'auto-acceptation, les itinéraires générés par IA et l'assistance IA sont réservés aux VIP. Côté utilisateur, les onglets Recommandé, Découvrir (carte/liste), Plan et Mon Compte permettent d'explorer les profils, consulter son calendrier, gérer son portefeuille et lancer des chats."
        ]
      },
      {
        title: "5. Frais, paiements et fiscalité",
        content: [
          "Sauf mention contraire, l'utilisateur règle la totalité estimée lors de la réservation ; les fonds restent en séquestre et ne sont libérés qu'après sept (7) jours, une fois le service validé et sans litige en cours.",
          "Guidew prélève une commission de quinze pour cent (15 %) sur chaque transaction réussie et peut ajouter des frais techniques ou de traitement, clairement indiqués au moment du paiement.",
          "Les abonnements VIP sont distincts : côté voyageurs, 9,90 USD/mois donnent accès à l'absence de frais de recrutement, à la rédaction de briefs via IA et au matching prioritaire ; côté prestataires, 99 USD/mois débloquent l'auto-acceptation, les itinéraires générés par IA, l'assistance automatisée et des alertes de rayon étendu.",
          "Nous utilisons Stripe pour encaisser et verser les paiements ; vous autorisez Guidew à initier débits, remboursements et virements en votre nom. Apple Pay et Google Pay seront intégrés lors des phases ultérieures.",
          "Les prestataires sont seuls responsables de la déclaration fiscale ; Guidew peut retenir ou signaler certains montants si la loi l'exige. Les pourboires laissés avant la publication d'un avis sont traités comme des revenus additionnels et suivent le même délai de sept jours.",
          "Sauf mention explicite du prestataire, les frais annexes (billets, carburant, péages, location) restent à la charge de l'utilisateur ; le prestataire doit préciser si ces coûts sont inclus dans son tarif."
        ]
      },
      {
        title: "6. Annulations, remboursements et litiges",
        content: [
          "Les utilisateurs peuvent annuler sans frais plus de trois (3) heures avant le début ; entre trois (3) et une (1) heure, la commande est débitée puis répartie à 50 % pour l'utilisateur, 25 % pour le prestataire et 15 % pour Guidew ; en deçà d'une heure ou après le démarrage, aucun remboursement n'est accordé sauf annulation conjointe (85 % pour l'utilisateur, 15 % pour la plateforme).",
          "Si un prestataire annule entre une (1) et trois (3) heures, l'utilisateur est remboursé intégralement et le prestataire reçoit un point de pénalité ; une annulation à moins d'une heure ajoute deux points ; après l'heure prévue, quatre points ; une absence complète, six points. Une accumulation excessive peut mener à une suspension ou une exclusion.",
          "Une fois la prestation commencée, le prestataire doit rester sur place (ou en ligne) jusqu'à la fin, même si le client est en retard ou absent ; en cas de no-show prestataire, l'utilisateur est remboursé à 100 %. Si le client ne se présente pas, la commande reste due et sera libérée après le délai de sept jours.",
          "Les contestations doivent être déposées dans l'app dans les sept (7) jours avec conversations, médias, reçus ou documents d'itinéraire. Guidew peut décider de remboursements, paiements partiels, retenues de pourboires ou autres mesures appropriées.",
          "Après chaque service, les évaluations sont croisées : l'utilisateur choisit “valait le coup” ou “ne valait pas”, peut laisser un pourboire avant de soumettre ; le prestataire sélectionne “prêt à servir à nouveau” ou “préfère ne pas recommencer”. Les avis ne deviennent publics qu'une fois les deux parties publiées ou passé un délai de trois (3) jours sans litige."
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
          "Vous devez respecter toutes les lois, licences, normes professionnelles et obligations d'assurance applicables au lieu de la prestation et maintenir vos informations de localisation à jour afin que la plateforme calcule les marges de déplacement et envoie des rappels proactifs ; les prestataires VIP peuvent configurer des zones élargies et des alertes de risque de retard.",
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
    commitments: {
      heading: "מה Guidew מתחייבת לספק",
      description: "אנחנו משלבים סטנדרט משפטי קפדני עם אנושיות, כדי שמשתמשים וספקים ירגישו בטוחים בכל עיר.",
      items: [
        { title: "בטיחות כברירת מחדל", description: "אימותי זהות, אפשרות להסכמי NDA, מרווחי נסיעה ותהליכי מחלוקת מגנים על כל מפגש פיזי." },
        { title: "כלכלה שקופה", description: "תעריפים, עמלות פלטפורמה, מנויי VIP ולוחות זמנים לתשלומים גלויים לפני אישור הזמנה." },
        { title: "אחריות קהילתית", description: "ביקורות הדדיות, העלאת תעודות ותגי הישגים משקפים מוניטין עדכני." },
        { title: "בינה + צוות אנושי", description: "בריפים אוטומטיים, תכנון בעזרת AI וצוותי קונסיירז' רב-לשוניים זמינים מסביב לשעון." }
      ]
    },
    obligations: {
      heading: "תזכורת קצרה לאחריות הצדדים",
      description: "בדקו את הרשימה בכל פעם שאתם מחליפים תפקיד.",
      columns: [
        {
          label: "כאשר אתם מזמינים שירות",
          items: [
            "וודאו שהפעילות חוקית ושברשותכם רישיונות או ביטוחים נדרשים.",
            "שתפו מיקומים מדויקים, חלונות זמן, צרכי נגישות וכל רגישות תרבותית או רפואית.",
            "שלמו מקדמות או סכומים מלאים דרך Guidew לפני תחילת השירות והיעזרו בצ'אט לעדכונים.",
            "שלחו משוב או תלונה בתוך 7 ימים כדי שנוכל לסייע במידת הצורך."
          ]
        },
        {
          label: "כאשר אתם מספקים שירות",
          items: [
            "עדכנו כל העת כישורים, תעודות וכללי הזמנה מינימליים בפרופיל.",
            "הגיעו עם מרווח הולם והתעדכנו באפליקציה אם קיים עיכוב.",
            "השתמשו רק במנגנוני התשלום של Guidew—אין לחייב מחוץ לפלטפורמה עבור אותה הזמנה.",
            "כבדו פרטיות: אחסנו NDA, הקלטות או מסמכי מסלול רק בערוצים המאושרים על ידינו."
          ]
        }
      ]
    },
    faq: {
      heading: "שאלות נפוצות בנושא ציות",
      description: "תקציר נקודות עיקריות—הנוסח המחייב נמצא בסעיפים המלאים.",
      items: [
        {
          question: "האם ניתן לשנות מחיר מחוץ ל‑Guidew?",
          answer: "ניתן לדון בהיקף בצ'אט, אך כל שינוי מאושר חייב להופיע בהזמנה באפליקציה כדי לשמור על עמידה במסים, ביטוחים ותשלומים."
        },
        {
          question: "מה קורה אם איחור בטיסה משפיע על השירות?",
          answer: "עדכנו מיד דרך הצ'אט. Guidew עשויה להפחית או לבטל קנסות כאשר מוצגות הוכחות לעיכובים בלתי נשלטים כמו מזג אוויר או חברת תעופה."
        },
        {
          question: "איך מדווחים על חשש בטיחותי?",
          answer: "השתמשו בכפתור הבטיחות באפליקציה או שלחו מייל ל‑safety@guidew.com עם מספר הזמנה וראיות נוספות; נפעל יחד עם הרשויות המקומיות לפי הצורך."
        }
      ]
    },
    support: {
      heading: "צריכים סיוע משפטי או תפעולי?",
      contact: "אימייל: legal@guidew.com",
      secondary: "קו חירום 24/7: ‎+64 (21) 513-258",
      note: "לפידבק מוצרי או בקשות נגישות, פנו ל‑help.guidew.com ונפנה אתכם לצוות הרלוונטי."
    },
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
          "אלא אם צוין אחרת בכתב, Guidew אינה מעסיקה, מנהלת או נושאת באחריות להתנהגות נותני השירות; כל הזמנה היא הסכם נפרד בין המשתמש לנותן השירות.",
          "המהדורה הראשונה מתמקדת באוקלנד ובוולינגטון: היעד הוא 1,000 בודקי MVP בתוך שישה חודשים, 5,000‑10,000 משתמשים עד חודש 12, מאה אלף משתמשים בניו זילנד עד חודש 24, כניסה לאוסטרליה וצמיחה ל‑200,000 משתמשים מצטברים לאחר חודש 25 ובשנה החמישית יציאה גלובלית עם תמיכה רב־לשונית."
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
          "כל פרופיל ספק חייב לפרט אילו שירותים מוצעים, מחיר לשעה, מינימום הזמנה, תגיות שירות והוכחות יכולת כגון תמונות, וידאו או תעודות. שירותים רגישים כמו כניסה לבית, טיפול בילדים או תמיכה רפואית עשויים לדרוש אימותים מתקדמים לרבות הצגת רישום פלילי נקי.",
          "כל משתמש רשום יכול להגיש בקשה להפוך לספק במהלך ההרשמה או מאוחר יותר דרך ניהול החשבון; רק משתמשים מחוברים רשאים להגיש בקשות או לקבל הזמנות, ושני הצדדים מחויבים להשתמש בצ\"אט ובכלי התיעוד של Guidew כדי לשמור מידע ולהגיש משוב או ראיות בזמן.",
          "ממשק הספק כולל ארבע לשוניות עיקריות—מצב \"抢\"/קליימינג, חזית (门面), הזמנות ו\"החשבון שלי\"—כאשר מצב הקליימינג מציג דרישות בזמן אמת וכפתור ענק לקבלת המשימה. קבלה אוטומטית, בניית מסלולים ב‑AI ושירות לקוחות אוטומטי זמינים רק לחברי VIP. בצד המשתמש קיימות הלשוניות “מומלץ”, “עיון (מפה/רשימה)”, “תכנון” ו“החשבון שלי” כדי לחפש נותני שירות קרובים, לראות לוח שנה, לנהל את הארנק ולפתוח שיחות."
        ]
      },
      {
        title: "5. עמלות, תשלומים ומסים",
        content: [
          "למעט אם Guidew הודיעה אחרת בכתב, המשתמש משלם את מלוא הסכום בעת ההזמנה; הכסף מוחזק בנאמנות ומשתחרר לנותן השירות רק שבעה (7) ימים לאחר סיום השירות ובכפוף להיעדר מחלוקות.",
          "Guidew גובה עמלת פלטפורמה של 15% מכל עסקה מוצלחת ויכולה להוסיף דמי שירות או עמלות עיבוד נוספים, המוצגים בצורה שקופה במסכי התשלום.",
          "מנויי VIP הם מוצרים נפרדים: משתמשים משלמים ‎9.9‎ דולר לחודש ומקבלים פטור מעמלות גיוס, ניסוח דרישות בעזרת AI והתאמה מועדפת; נותני שירות משלמים ‎99‎ דולר לחודש לצורך הפעלה של קבלה אוטומטית, בניית מסלולים ב‑AI, שירות לקוחות אוטומטי והתרעות טווח מורחבות.",
          "כיום אנו מתבססים על Stripe לניהול תשלומים, ואתם מסמיכים את Guidew לבצע חיובים, זיכויים והעברות בשמכם. Apple Pay ו‑Google Pay יתווספו בשלבים הבאים.",
          "נותני שירות אחראים לדיווח ולתשלום מסים; במידת הצורך החוקי Guidew רשאית לנכות או לדווח סכומים. טיפ שמשולם לפני פרסום ההמלצה נחשב להכנסה נוספת ומשתחרר לאחר אותו פרק זמן של שבעה ימים.",
          "אלא אם צוין במפורש על ידי נותן השירות, הלקוח אחראי על הוצאות נלוות כגון כרטיסים, דלק, אגרות או השכרת רכב, והספק מחויב לציין האם מחירים אלו כלולים בתעריף."
        ]
      },
      {
        title: "6. ביטולים, החזרים ומחלוקות",
        content: [
          "משתמשים רשאים לבטל ללא קנס עד שלוש (3) שעות לפני תחילת השירות; ביטול בין שלוש לשעה אחת מוביל לחלוקת הסכום: 50% חזרה למשתמש, 25% לנותן השירות ו‑15% כעמלת פלטפורמה; פחות משעה לפני התחלה או לאחריה לא יבוצע החזר אלא אם שני הצדדים מאשרים ביטול (85% למשתמש, 15% ל‑Guidew).",
          "אם נותן השירות מבטל בין שעה לשלוש שעות לפני ההתחלה, המשתמש מקבל 100% והספק נרשם לו נקודת ענישה אחת; ביטול בתוך שעה מוסיף שתי נקודות; ביטול לאחר זמן ההתחלה מוסיף ארבע נקודות; היעדרות מוחלטת מוסיפה שש נקודות. צבירה גבוהה תגרור השעיה או הסרה.",
          "לאחר תחילת השירות, על נותן השירות להישאר בשטח (או אונליין) עד לתום המפגש גם אם הלקוח מאחר או נעדר; אם הספק אינו מופיע, המשתמש מקבל החזר מלא. אם המשתמש אינו מגיע, ההזמנה עדיין מחויבת והכסף משתחרר לאחר תקופת השבעה ימים.",
          "יש להגיש מחלוקות באפליקציה בתוך שבעה (7) ימים מסיום השירות ולצרף תכתובות, מדיה, קבלות או מסמכי מסלול. Guidew רשאית לבצע החזר, תשלום חלקי, הקפאת טיפ או כל התאמה סבירה אחרת.",
          "לאחר השירות שני הצדדים יכולים להגיש חוות דעת תלויות: המשתמש בוחר “שווה” או “לא שווה” ויכול להוסיף טיפ לפני השליחה; נותן השירות בוחר “אשמח לשרת שוב” או “מעדיף שלא”. החוות מתפרסמות רק לאחר ששני הצדדים הגישו או בחלוף שלושה (3) ימים ללא מחלוקת."
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
        title: "8. בטיחות וציות",
        content: [
          "Guidew רשאית לדרוש בדיקות נוספות עבור שירותים רגישים כגון כניסה לבתים, טיפול בילדים, תמיכה רפואית או קטגוריה אחרת שתימצא בסיכון גבוה, לרבות ראיונות, העלאת מסמכים או בדיקות צד שלישי.",
          "אתם אחראים לעמידה בכל החוקים, הרישיונות, הסטנדרטים המקצועיים ודרישות הביטוח החלים במקום מתן השירות, וכן לשמור על מיקומכם והתראות הדרך מעודכנים כדי שחישובי זמני ההגעה והתזכורות יעבדו; חברי VIP יכולים להגדיר אזורי פעילות רחבים יותר והתרעות איחור.",
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
  },

  mi: {
    badge: "Nga tikanga o te Ratonga",
    title: "Ko nga tikanga o te ratonga",
    description:
      "Ko enei kupu whakaata te hanganga o nga maakete nekeneke me te whakarite mo te whakakotahitanga o te kaiarahi, te haumaru, me nga tohungatanga o te rohe. Tena tirohia, tirohia mai i mua i te tono, i te whakarato ratonga ranei mo te kaiarahi.",
    languagePrompt: "Tirohia tenei whaarangi ki:",
    commitments: {
      heading: "He aha taau e hiahia mai ana i te kaiarahi",
      description: "Ka whakakotahihia e matou te rigor ture me te manaaki tangata-a-tangata i nga kaihokohoko, nga whanau, me nga kaiwhakarato, me te mahi maia.",
      items: [
        { title: "Haumaru-Hoahoa", description: "Tirohanga Tuakiri, Nga Kōwhiringa NDA, nga kaikopere haerenga, me nga mahi tautohetohe e tiakina ana e ia nga wheako tuimotu." },
        { title: "Nga Kaikorero Whakanoho", description: "Te utu, te utu mo nga papa, nga ohaurunga VIP, me nga tohu utu ka kitea i mua i to whakaū i tetahi ota." },
        { title: "Te kawenga a te hapori", description: "Nga arotake takitahi, ka tukuna nga tiwhikete, me nga tohu whakatutukitanga kia mau tonu nga ingoa." },
        { title: "AI + Tautoko Tangata", description: "He poto nga korero, ko nga kaihanga i te wananga, me nga roopu whakahoahoa e tu ana i nga rohe katoa o te waa." }
      ]
    },
    obligations: {
      heading: "Ko o kawenga i te tirohanga",
      description: "Whakamahia tenei raarangi arowhai i te wa e whakawhiti ana koe i waenga i nga kaitono me nga kaiwhakarato kaiwhakarato.",
      columns: [
        {
          label: "Ka tono koe i nga ratonga",
          items: [
            "Whakaaetia he tika te ngohe me te pupuri i nga whakaaetanga e hiahiatia ana, i te inihua ranei.",
            "Tukuna nga waahi tuuturu, nga raarangi wa, nga korero whakauru, me nga tikanga ahurea, rongoa ranei.",
            "Nga utu putea, pauna ranei i te kaha o te mahi i mua i te tiimata o te ratonga me te whakamahi i nga korero korero mo nga whakahoutanga.",
            "He urupare urupare, he tautohetohe ranei i roto i nga ra e 7 kia taea ai e ta maatau roopu te wawao mena e hiahiatia ana."
          ]
        },
        {
          label: "Ka tukuna e koe nga ratonga",
          items: [
            "Kia mau ki nga pukenga, tiwhikete, me nga ture iti rawa atu, ka kitea i roto i to whaarangi.",
            "Tae mai me te wa nui o te wa; Whakamōhiotia te kiritaki i roto i te taupānga mena ka puta nga mate.",
            "Whakamahi i nga raima utu a te kaiarahi anake-kore-papa-kore mo te utu kotahi.",
            "Whakapaingia te tūmataiti: Rokiroki NDA, nga rekoata, te tuhi ranei i nga konae i te waahi anake e taea ai e te kaiarahi."
          ]
        }
      ]
    },
    faq: {
      heading: "I nga wa katoa i pa ki nga tautohetohe",
      description: "Ko enei whakautu tere ka whakarapopoto i nga kaupapa here noa; Ko nga rara taipitopito i raro nei e whakahaere tonu ana.",
      items: [
        {
          question: "Ka taea e au te whiriwhiri, te whakarereke ranei i te tohu o waho?",
          answer:
            "Ka taea e koe te matapaki i te whānuitanga o te korerorero, engari me whakaatu nga huringa kua whakapumautia i roto i te tono In-App na reira, inihua, me nga utu e noho tika ana."
        },
        {
          question: "Ka ahatia mena ka pa te haerenga haerenga ki taku pukapuka?",
          answer:
            "Whakamohio i tetahi atu roopu i muri mai i te korerorero. Ka taea e te kaiarahi te whakatika, te aukati ranei i nga whiu kua whakatauhia penei i te rangi, i nga take rererangi ranei, engari me tuhi."
        },
        {
          question: "Me pehea taku e kaha ai te awangawanga haumaru?",
          answer:
            "Whakamahia te pātene haumaru i roto i te-taupānga, imeera haumaru ranei@guidew.com me nga tohutoro raupapa, taunakitanga, me nga hiahia akiaki. Ka mahi tahi tatou me nga mana whakahaere o te rohe ina hiahiatia."
        }
      ]
    },
    support: {
      heading: "Kei te hiahia te tautoko ture, whakahaere ranei?",
      contact: "Email: legal@guidew.com",
      secondary: "Hotline (24/7): +64 (21) 513-258",
      note: "Mo nga urupare hua, nga tono urunga ranei, toro atu ma te help.guidew.com kia taea ai e matou te neke ki te roopu tika."
    },
    sections: [
      {
        title: "1. Whanaungatanga kirimana",
        content: [
          "Ko enei tikanga o te ratonga (ko te \"kupu\") he whakaaetanga ture i waenganui i a koe - ahakoa he tangata haere takitahi, he kaiwhakarato, he kaiarahi me ona hinonga honohono.",
          "Ma te uru atu ki te whakamahi i te Aratohu, te App App, he ratonga hono ranei, e mohio ana koe, e whakaae ana kia herea nga kaupapa here mai i te waa, tae atu ki ta maatau kaupapa here."
        ]
      },
      {
        title: "2..",
        content: [
          "Ka whakarato a Aratohu i nga taputapu hangarau e hono ana i nga kaiwhakamahi ki te rapu i nga wheako o te rohe, te tautoko haerenga, i nga pukenga taangata ranei me nga kaiwhakarato motuhake. Ka whakahohehia e tatou te taatai, te tuku, te utu, te utu, me te Haumaru Haumaru-engari kaore matou e hanga, hei whakahaere, hei tuku ranei i nga ratonga.",
          "Mena kaore tatou e ahua mohio ki te tuhi, kaore e mahi, e whakahaere ana, e whakahaere ana, e whakahaere ana ranei i nga kawenga mo te whakahaere o nga kaiwhakarato; Ko nga rahui katoa e tohu ana i tetahi whakaaetanga motuhake i waenga i te kaiwhakamahi me te kaiwhakarato.",
          "Ko te tuku tuatahi o te kaiarahi e arotahi ana ki Akarana me Poneke. Wahanga-i-waahanga, ka whaaia e matou te 1,000 MVP mo nga marama tuatahi, 5,000-100 nga kaiwhakamahi o Aotearoa i te marama 25,000 o te ao i muri i te tau e rima."
        ]
      },
      {
        title: "3. Nga putea me te tohu",
        content: [
          "Ma te hanga i tetahi kaute aratohu e whakaū ana koe he iti rawa te 18 tau te pakeke, ā, me whai mana te ture ki te kirimana. Mena kei te whakamahi koe i te kaiarahi mo te pakihi, whakahaere ranei, me whakamana koe kia herea taua hinonga.",
          "Ka arahi pea, i nga wa katoa, me whakaoti koe i te whakaotinga tuakiri, papamuri papamuri, nga arotake tohu ranei; Ko te kore e tutuki i te aukati i te aukati i te aukati ranei.",
          "Kei a koe te kawenga mo te tiaki i o tohu tohu takiuru me nga mahi katoa ka puta i raro i to putea. Whakamohio ki a maatau ki te kore koe e whakaae."
        ]
      },
      {
        title: "4. Kaiwhakamahi me nga Kaihaututanga Kaiwhakarato",
        content: [
          "Me whakarite nga kaiwhakamahi kia tika, kia ora, kia tutuki hoki nga tikanga o te rohe, me wehewehe i nga manakohanga, nga whakaritenga, me nga whakaritenga me nga kaiwhakarato.",
          "Me pono te hunga kaiwhakarato mo o raatau pukenga, tohu, te waatea, me te utu i mua i te whakaae i tetahi ota; Me tuku nga ratonga i runga i te korerohia me te kore e waatea te kore whakaae.",
          "Me whakarārangihia e ia nga kaiwhakarato ia ratonga, ko tana utu haora, ko te tohu iti o te haora, me nga tohu e tika ana, me nga tohu o te kaha (whakaahua, tohu tohu). Ko etahi o nga waahanga-penei i te uru o te kaainga, te tiaki tamariki, me te tautoko rongoa ranei (hei tauira i nga tirotirohanga papamuri, raihana raihana ranei).",
          "E whakaae ana nga roopu e rua ki te whakamahi i nga taputapu karere a-ringa me nga taputapu tuhi ki te tuhi i nga korero whakapae me te tuku urupare, taunakitanga ranei i roto i nga wahanga e hiahiatia ana. Ka whakahoutia pea e nga kaiwhakamahi rehita ki te mana kaiwhakarato i te hainatanga i te waa ranei i roto i nga tautuhinga kaute, me nga kaiwhakamahi takiuru noa te tono, te tuku ratonga ranei.",
          "Kei roto i nga papatohu e wha nga ripa tuatahi e wha (kereme, te teepu, nga ota, taku putea); Ko nga tohu aratau kereme e tono ana i te paatene a te Tapahi-Tap \". Whakaaetia-Aunoa, AI nga kaihanga i te wa, ko nga kai urupare-a AI nga kaiwhakautu-tautoko a AI he mea motuhake ki nga kaiwhakarato VIP. Ko te Whakauru Whakauru, Tirohia (Mahere / raarangi), Mahere, me aku Taputapu Kaute Hei tirotiro, Whakahaerehia nga Whakaaturanga Maramataka, Whakahaerehia nga Waanui."
        ]
      },
      {
        title: "5. Nga utu, utu, me nga taake",
        content: [
          "Ki te kore e whakawhitiwhiti korero, kaore i te tuhi, me utu nga kaiwhakamahi ki te utu katoa o te punaha utu a te kaiarahi i te wa o te tono; Kei te pupuri nga kaiarahi i nga moni i roto i te Escrow me te tuku i nga utu mo te utu e whitu (7) nga ra i muri i te tohu o te ratonga, kaore he tautohetohe e tatari ana.",
          "Ka arahina pea e ia nga utu mo te Ratonga Hangarau Hangarau, nga utu mo nga tauhokohoko, me etahi atu taonga ranei ki nga kaiwhakamahi me / ranei nga kaiwhakarato, ko nga mea katoa e whakaatu ana i nga panui tirotiro.",
          "Ko te utu mo te maakete matua a te kaiarahi he rite ki te tekau ma rima ōrau (15%) o ia whakawhitinga angitu. Ko nga ohaurunga VIP he mea motuhake: Ka hokona pea e nga kaitautoko te VIP mo te utu mo te utu mo te utu mo te tono-tono. Ka huri pea nga kaiwhakarato ki te arataki i te USD 99 ia marama ki te whakauru i te whakatipuranga-aunoa, ai i te whakatipuranga aunoa, ai te whakamahi i nga tohu taapiri.",
          "Ka whakamahi pea tatou i nga kaituku utu tuatoru, tae atu ki te whiu mo te MVP, a ka whakamanahia e koe he kaiarahi mo te tuku utu mo nga utu me nga utu utu. Ka utua e Apple te utu a Google ki nga waahanga i muri mai.",
          "Ko nga kaiwhakarato anake te kawenga mo te ripoata me te utu taake e tika ana; Ka taea e te kaiarahi te aukati, te ripoata ranei i nga moni mena ka hiahiatia e te ture. Tohutohu i utua e nga Kaipupuri i mua i te tuku i tetahi arotake ka rite ki nga hua taapiri ka tukuna i muri i te mana whitu-ra.",
          "Me utu nga kaiwhakamahi mo nga taonga tawhito (tikiti, wahie, tara, reti) kaore i te tino whakauruhia ki te reiti i whakahuahia ai te kaiwhakarato. Me whakaatu marama nga kaiwhakarato mehemea kei roto i nga utu nga utu e pa ana ki nga utu."
        ]
      },
      {
        title: "6. Whakakore, Nga Whakahoki, me nga tautohetohe",
        content: [
          "Ka taea e nga kaiwhakamahi te whakakore i te neke atu i te toru (3) haora i mua i te tiimata o te ratonga kaore he whiu, ka whiwhi moni tonu. Mena ka whakakorehia e te kaiwhakamahi i waenga i nga haora e toru (3) me te kotahi (1) haora i mua i te tiimata, e rima tekau ma rima nga paanga (25%) ki te utu, e rima tekau ōrau (15%) hei utu. Ko te whakakore i roto i tetahi (1) haora, i muri mai ranei i te tiimata kaore he utu mo te kaiwhakamahi ki te kore e rua tekau ma rima ōrau (85%) me te kaiarahi i te tekau ma rima ōrau (15%).",
          "Mena ka whakakorehia e te kaiwhakarato i waenga i tetahi (1) me te toru (3) haora i mua, ka whakahoki mai i te kaiwhakamahi kotahi rau ōrau (100%) me te whakaputa i te kaiwhiwhi kotahi (1) whakakorea i roto i tetahi (1) haora e hanga rua (2) tohu whiu; whakakore i muri i te tiimata kua whakaritea e wha (4) tohu whiu; me nga kaiwhakaako e ono (6) nga whiu whiu. Ka taea e te kaiarahi te aukati i te tango tonu ranei i nga kaiwhakarato e whakaemi ana i nga tohu nui.",
          "Ka tiimata nga ratonga, me noho tonu nga kaiwhakarato ki te papanga (me te ipurangi ranei) mo te roanga o te waa ano ka mutu te ngaro o te kaitono. Mena ka kore te kaiwhakarato e puta, ka whakahoki i te whakahoki mai i te kaiwhakamahi. Mena ka puta te kaitirotiro, ka mau tonu te utu o te whare pukapuka, ka whiwhi tonu te kaiwhakarato i te utu kirimana i muri i te pupuri e whitu nga ra.",
          "Me tuku nga tautohetohe i roto i te taupānga Aratohu i roto i nga ra e whitu (7) i muri i te mutunga o te ratonga, me nga taunakitanga tautoko penei i nga tuhinga korero, me nga tuhinga, nga tuhinga ranei. Ka taea e te kaiarahi te rongoa i nga whakaoranga, nga utu utu, te aukati i nga moni, te whakarereke, etahi atu whakatikatika ranei e tika ana i muri i te arotake i te tautohetohe.",
          "Whai muri i ia ratonga, ka taea pea e nga roopu nga arotake, ko te tono \"he\" ranei kaore e pai ki te mahi \"me nga kaiwhakaako. Ko nga arotake ka kitea i muri noa iho i muri i nga roopu e rua e tuku ana, e toru ranei (3) nga ra e pa ana ki te tautohetohe."
        ]
      },
      {
        title: "7. Nga taonga me nga rawa hinengaro",
        content: [
          "Ko te Ratonga Aratohu, paetukutuku, raupaparorohiko, hokohoko, me nga raihana katoa e whai mana ana, a ka whiwhi koe i te raihana, kaore i te whakawhitiwhiti te raihana, kia kore ai e taea te whakamahi.",
          "Ihirangi ka tukuna e koe, penei i te tuhinga, nga tohu, te arotake, te whakamahi, te whakaputa i te ihirangi, te whakaputa, me te maakete, me te maakete.",
          "Kaua e kape, whakarereketia te miihini, whakarereke, te ngana ranei ki te tango i te waehere takenga o a maatau punaha, kaore hoki e whakamahi i nga tohu tohu a te kaiarahi."
        ]
      },
      {
        title: "8. Te Haumaru me te Whakapono",
        content: [
          "Me tono pea te kaiarahi mo nga ratonga taapiri penei i te uru ki te kaainga, te tautoko hauora, te tohu hauora, te tuku i nga uiuinga, te tuku i nga tuhinga tuatoru.",
          "Kei a koe te haepapa mo te hono ki nga ture katoa, e whakaae ana, ko nga paerewa ngaio, me nga whakaritenga inihua e pa ana ki te waahi ka puta te ratonga. Me pupuri e nga kaiwhakarato nga tautuhinga o to raatau waahi na reira ka taea e te kaiarahi te tatauranga i nga peehi haerenga me te akiaki i nga whakamaharatanga i mua i te pukapuka e whai ake nei; Ka taea e nga kaiwhakarato VIP te whirihora i nga waahanga mahi roa me nga matohi nui ina heke mai nga ratonga kua mate.",
          "Ka taea e tatou te aukati, te whakamutu ranei i nga kaute me te mahi tahi me te ture ture, mena ka kitea e tatou he ture, he mahi tinihanga ranei."
        ]
      },
      {
        title: "9. Te tūmataiti me te whakahaere raraunga",
        content: [
          "Ma te whakamahi i nga kaiarahi e whakaae ana koe ki te kohinga, whakamahi, tohatoha me te rokiroki o to raraunga kua tuhia i roto i te Kaupapahere Tūmataiti, tae atu ki nga korero tuakiri, raraunga utu, korero.",
          "Ka taea e tatou te tiri i nga raraunga me nga kaiwhakarato ratonga, hoa, mana whakahaere ranei ina hiahiatia mo te tuku ratonga, te mana whakahaere, te tautoko, te aukati ranei, i te wa e tiakina ai nga mahi hokohoko."
        ]
      },
      {
        title: "10. Nga Korero",
        content: [
          "Ko te kaiarahi e whakarato ana i te paparanga i runga i te 'rite' me te kore e whakaatu, e whakaatu ana ranei, mo te whakauru kaore i te aukati, i te mahi hapa ranei, me tutuki ranei nga ratonga.",
          "Kaore matou e taurangi ki te papamuri, nga tohu, te pono, te putanga o nga taunekeneke i waenga i nga kaiwhakamahi me nga kaiwhakarato."
        ]
      },
      {
        title: "11. Te aukati i te taunahatanga",
        content: [
          "Ki te tino tika e whakaaetia ana e te ture, ko nga kaiarahi, nga kaimahi, me nga hoa mahi, he raru, he whiu ranei, he mea e pa ana ki to whakamahi i nga ratonga.",
          "Ko te taunahatanga a Guidew mo nga whiu tuuturu he iti noa atu ki nga moni i utua e koe hei arahi mo nga ratonga motuhake i te ono marama i mua i te kereme."
        ]
      },
      {
        title: "12. Taha",
        content: [
          "E whakaae ana koe ki te whaiwhakaaro me te pupuri i nga kaiarahi kaore i te kino, i nga utu, i nga utu, me nga utu o nga roia e puta mai ana i te takahi i te ture, i te takahi ranei i te mana tuatoru."
        ]
      },
      {
        title: "13. Te ture ture me te whakatau tautohetohe",
        content: [
          "Ko enei tikanga ka whakahaerehia e nga ture o Singapore, me te kore e aro ki nga ture o te pakanga.",
          "Ko te tautohetohe, ko te kereme ranei ka whakatauhia ma te whakawakanga i whakahaerehia e te Cingapore International International Center (SIAC) i te reo Ingarihi, a ka taea te whakawhiwhi i te mana whakahaere."
        ]
      },
      {
        title: "14. Nga Huringa ki enei Ture",
        content: [
          "Ka taea e te kaiarahi te whakarereke i enei tikanga mai i te waa ki te waa. Ka kitea e matou te ra whai hua ki tenei whaarangi ka whakamohio atu ki a koe ma te imeera, i nga tuhinga-a-taputapu ranei mo nga huringa rauemi.",
          "Mena kei te haere tonu koe ki te whakamahi i nga aratohu i muri i nga tikanga hou ka whai hua, ka kiia koe kia whakaae ratou; Mena kaore koe e whakaae, me mutu koe ki te whakamahi i nga ratonga me te kati i to putea."
        ]
      },
      {
        title: "15. Whakapā mai",
        content: [
          "Mena kei a koe nga patai mo enei tikanga, ko nga ratonga aratohu ranei, me whakapiri atu ki a TTTPS://www.guidew.com/help mo nga whiringa Tautoko."
        ]
      }
    ],
    lastUpdated: "Whakahoutanga Whakamutunga: 6 Hune 2025",
    updateNotice:
      "Ka whakaatuhia tonu e ia a tatou hangarau, nga mahi, me nga taakaro haumaru. Ko te putanga hou o enei tikanga ka tukuna i nga wa katoa i runga i te guidew.com/terms me nga whakahoutanga rauemi ka tukuna mai ma te imeera, i nga whakamohiotanga ranei o te hua."
  },} as const;

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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-3">{content.badge}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.commitments.heading}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{content.commitments.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.commitments.items.map((item, index) => {
                const Icon = [ShieldCheck, Wallet2, MessageCircle, Clock][index % 4];
                return (
                  <div key={item.title} className="bg-white rounded-3xl border border-brand-lightGray p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="h-12 w-12 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-brand-teal" />
                      </span>
                      <h3 className="text-xl font-semibold text-brand-darkBlue">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-3">{content.badge}</p>
              <h2 className="text-3xl font-bold text-brand-darkBlue mb-4">{content.obligations.heading}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{content.obligations.description}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.obligations.columns.map(column => (
                <div key={column.label} className="rounded-3xl border border-brand-lightGray bg-gradient-to-br from-white to-brand-lightGray/30 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-brand-darkBlue mb-4">{column.label}</h3>
                  <ul className="space-y-3 text-gray-600 leading-relaxed list-disc list-inside">
                    {column.items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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

        <section className="py-16 bg-brand-darkBlue text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className="text-xs uppercase tracking-[0.4em] text-brand-gold mb-3">{content.badge}</p>
              <h2 className="text-3xl font-bold mb-4">{content.faq.heading}</h2>
              <p className="text-white/80 leading-relaxed">{content.faq.description}</p>
            </div>
            <div className="space-y-6">
              {content.faq.items.map(item => (
                <div key={item.question} className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">{item.question}</p>
                  <p className="text-white/90 mt-3">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-white p-8 border border-brand-lightGray shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-2">{content.support.heading}</p>
                <p className="text-lg font-semibold text-brand-darkBlue">{content.support.contact}</p>
                <p className="text-lg font-semibold text-brand-darkBlue">{content.support.secondary}</p>
                <p className="text-gray-600 mt-2">{content.support.note}</p>
              </div>
            </div>
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
