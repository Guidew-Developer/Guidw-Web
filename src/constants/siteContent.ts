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
        "From touchdown to hidden gems, Guidew connects travelers with locals to solve the last-mile gap and unlock authentic experiences.",
      sections: [
        {
          heading: "The Last Mile in a Strange City",
          content:
            "Transport and hotels are solved, but the first 72 hours determine how a trip feels. Guidew lets you summon locals for language help, cultural decoding, and human support the moment you arrive."
        },
        {
          heading: "Two-sided Network Effects",
          content:
            "Providers upload credentials, proof, and portfolios to build trust. Users leave reviews, tip, and join VIP subscriptions, creating incentives for more experts to join."
        },
        {
          heading: "The Power of AI + Humans",
          content:
            "AI parses requests and matchmaking, but the service happens offline through people. Guidew uses technology as a connector, not a replacement."
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
        "VIP users can call certified translators anytime for medical visits, meetings, and errands while enjoying AI matching and zero booking fees.",
      sections: [
        {
          heading: "Why $9.9/Month Matters",
          content:
            "VIP users skip commissions and describe their needs in one sentence. AI recommends the best translator or companion for the task."
        },
        {
          heading: "Priority Matching",
          content:
            "Requests surface to top providers based on proximity, skills, and ratings. VIP orders tap into a faster routing lane."
        },
        {
          heading: "Safety & Compliance",
          content:
            "All translators pass identity and professional verification, and can upload certificates plus background checks."
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
        "A dance fan shares how she booked a local instructor through Guidew and brought South American rhythms to her living room.",
      sections: [
        {
          heading: "How the Request Started",
          content:
            "The user simply wrote “I want a Bachata lesson this weekend, preferably at home.” The system matched her with vetted dancers."
        },
        {
          heading: "What Providers Show",
          content:
            "Dancers upload teaching clips, credentials, and rates so users understand their style and professionalism instantly."
        },
        {
          heading: "Offline Magic",
          content:
            "One-on-one lessons paired with local music recommendations became more than a class—it turned into a cultural exchange."
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
        "Showcase proof, certificates, audio/video work, auto-accept VIP orders, and use AI itineraries to build a trusted digital storefront.",
      sections: [
        {
          heading: "Presentation is the Brand",
          content:
            "Detailed bios, certificate walls, service videos, and transparent pricing determine whether travelers trust you enough to book."
        },
        {
          heading: "Automation & AI",
          content:
            "VIP providers auto-accept, plan routes with AI, and keep calendars synced—boosting earning potential dramatically."
        },
        {
          heading: "Reviews & Achievements",
          content:
            "Badges, ratings, and response-time streaks help providers steadily accumulate trust capital."
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
      summary: "从机场落地到隐藏景点，Guidew 如何连接旅客与本地专家，提供最后一公里的真实体验。",
      sections: [
        {
          heading: "陌生城市的“最后一公里”",
          content:
            "传统旅行产品解决的是交通与住宿，但真正影响体验的是抵达后的 72 小时。Guidew 通过即时召唤本地专家，让旅客在语言、文化、交通上都能得到人性的帮助。"
        },
        {
          heading: "双边网络效应",
          content:
            "服务者上传证明、证书与作品，形成可信赖的供给。用户通过评价、VIP 订阅和小费机制，激励更多人加入生态。"
        },
        {
          heading: "AI + 人的组合",
          content: "AI 用于需求理解与匹配，而真正的服务是线下完成的。Guidew 让技术成为连接者，而非替代者。"
        }
      ]
    },
    {
      id: "vip-translation",
      icon: "language",
      iconLabel: "VIP Features",
      title: "VIP 翻译订阅：跨语言沟通的即时解决方案",
      date: "2024-11-28",
      summary: "VIP 用户可随时召唤专业翻译陪同就医、开会或办事，并享受 AI 匹配与优先接单服务。",
      sections: [
        {
          heading: "9.9 美元/月的价值",
          content: "VIP 用户在下单时免佣，并可通过一句话描述需求，让 AI 推荐最合适的翻译或陪同服务者。"
        },
        {
          heading: "优先匹配机制",
          content: "系统根据服务者可达性、技能标签与评分进行排序，VIP 订单会优先推送给优质供给。"
        },
        {
          heading: "安全合规保障",
          content: "所有翻译服务者需通过身份与专业认证，支持上传证书及审查历史记录。"
        }
      ]
    },
    {
      id: "wellington-bachata",
      icon: "music",
      iconLabel: "Community Story",
      title: "在惠灵顿寻找 Bachata 老师，只需一键",
      date: "2024-11-02",
      summary: "真实案例分享：舞蹈爱好者如何通过 Guidew 找到本地老师，上门体验南美舞蹈。",
      sections: [
        {
          heading: "需求是如何发出的",
          content: "用户只需描述“想在周末学习 Bachata、希望有人上门教学”，系统便能推荐合适的舞者。"
        },
        {
          heading: "服务者的门面",
          content: "舞者上传教学视频、舞鞋证书与收费标准，用户一眼即可判断专业度。"
        },
        {
          heading: "线下体验的魅力",
          content: "一对一教学+本地音乐推荐，体验不止于课程，更是一场文化交流。"
        }
      ]
    },
    {
      id: "provider-branding",
      icon: "compass",
      iconLabel: "Provider Playbook",
      title: "服务者如何利用 Guidew 建立个人品牌",
      date: "2024-10-15",
      summary: "展示服务证明、证书、音视频作品，使用自动接单与 AI 行程规划，打造值得信赖的数字门店。",
      sections: [
        {
          heading: "门面即品牌",
          content: "详细的自我介绍、证书墙、服务视频和收费透明度，决定了用户是否愿意下单。"
        },
        {
          heading: "AI 与自动化的力量",
          content: "VIP 服务者可自动接单、使用 AI 生成功能规划路线，大幅提高接单效率。"
        },
        {
          heading: "评价与成就系统",
          content: "通过徽章、评价与响应速度等指标，服务者可以持续积累信任资产。"
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
