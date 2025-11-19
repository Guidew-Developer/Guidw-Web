import { resolveLocale, type SupportedLocale } from "@/utils/locale";

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

const cityProfiles: Record<SupportedLocale, CityProfile[]> = {
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
  ]
};

const careerOpenings: Record<SupportedLocale, CareerOpening[]> = {
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
  ]
};

const blogPosts: Record<SupportedLocale, BlogPost[]> = {
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
  ]
};

const resolve = <T,>(collection: Record<SupportedLocale, T>, language: string): T =>
  collection[resolveLocale(language)];

export const getCityProfiles = (language: string) => resolve(cityProfiles, language);
export const getCareerOpenings = (language: string) => resolve(careerOpenings, language);
export const getBlogPosts = (language: string) => resolve(blogPosts, language);
