import { useState } from "react";
import { MapPin, Globe, Languages, Music, Book, Coffee, Camera, Utensils, ChevronRight, AlertTriangle, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";

const featuredServiceImages = {
  tour: "/images/featured-tour.jpg",
  translation: "/images/featured-translation.jpg",
  dance: "/images/featured-dance.jpg"
};

const featuredServices = {
  en: [
    {
      id: "1",
      title: "Local City Tour with Hidden Gems",
      description: "Discover secret spots and local favorites perfect for your first day in town.",
      category: "City Guide",
      price: 40,
      rating: 4.9,
      location: "Auckland, New Zealand",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: featuredServiceImages.tour
    },
    {
      id: "2",
      title: "Business Meeting Translation Services",
      description: "Professional interpretation so every cross-border meeting stays clear and confident.",
      category: "Translation",
      price: 60,
      rating: 4.8,
      location: "Wellington, New Zealand",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: featuredServiceImages.translation
    },
    {
      id: "3",
      title: "Salsa Dance Introduction & Practice",
      description: "Learn salsa fundamentals with a champion instructor—no experience needed.",
      category: "Dance",
      price: 35,
      rating: 4.7,
      location: "Queenstown, New Zealand",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: featuredServiceImages.dance
    }
  ],
  pt: [
    {
      id: "1",
      title: "Tour urbano com segredos locais",
      description: "Descubra becos escondidos, cafés autorais e histórias que só os moradores contam.",
      category: "Guia da cidade",
      price: 40,
      rating: 4.9,
      location: "Auckland, Nova Zelândia",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: featuredServiceImages.tour
    },
    {
      id: "2",
      title: "Tradução para reuniões estratégicas",
      description: "Intérpretes certificados garantem clareza em negociações e pitches bilíngues.",
      category: "Tradução",
      price: 60,
      rating: 4.8,
      location: "Wellington, Nova Zelândia",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: featuredServiceImages.translation
    },
    {
      id: "3",
      title: "Aula express de salsa ou bachata",
      description: "Aprenda passos básicos e postura com campeões que dão apoio individual.",
      category: "Dança",
      price: 35,
      rating: 4.7,
      location: "Queenstown, Nova Zelândia",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: featuredServiceImages.dance
    }
  ],
  es: [
    {
      id: "1",
      title: "Tour urbano con rincones ocultos",
      description: "Descubre lugares secretos y favoritos locales ideales para tu primer día en la ciudad.",
      category: "Guía urbana",
      price: 40,
      rating: 4.9,
      location: "Auckland, Nueva Zelanda",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: featuredServiceImages.tour
    },
    {
      id: "2",
      title: "Traducción para reuniones ejecutivas",
      description: "Interpretación profesional para que cada reunión transfronteriza sea clara y segura.",
      category: "Traducción",
      price: 60,
      rating: 4.8,
      location: "Wellington, Nueva Zelanda",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: featuredServiceImages.translation
    },
    {
      id: "3",
      title: "Introducción a la salsa con práctica guiada",
      description: "Aprende fundamentos de salsa junto a un instructor campeón, sin necesidad de experiencia previa.",
      category: "Danza",
      price: 35,
      rating: 4.7,
      location: "Queenstown, Nueva Zelanda",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: featuredServiceImages.dance
    }
  ],
  zh: [
    {
      id: "1",
      title: "本地城市隐藏宝地之旅",
      description: "第一天就跟随本地达人，走进只属于当地人的秘境。",
      category: "城市向导",
      price: 40,
      rating: 4.9,
      location: "奥克兰，新西兰",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: featuredServiceImages.tour
    },
    {
      id: "2",
      title: "商务会议口译服务",
      description: "专业译员陪同跨境会议，让每一句话都准确无误。",
      category: "翻译服务",
      price: 60,
      rating: 4.8,
      location: "惠灵顿，新西兰",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: featuredServiceImages.translation
    },
    {
      id: "3",
      title: "萨尔萨入门私教",
      description: "两小时掌握基础步伐与节奏，冠军导师亲自带练。",
      category: "舞蹈",
      price: 35,
      rating: 4.7,
      location: "皇后镇，新西兰",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: featuredServiceImages.dance
    }
  ],
  fr: [
    {
      id: "1",
      title: "Balade urbaine et perles cachées",
      description: "Découvrez passages secrets et adresses favorites pour réussir votre premier jour.",
      category: "Guide urbain",
      price: 40,
      rating: 4.9,
      location: "Auckland, Nouvelle-Zélande",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: featuredServiceImages.tour
    },
    {
      id: "2",
      title: "Interprétation pour réunions exécutives",
      description: "Assurez des échanges limpides lors de vos rendez-vous transfrontaliers.",
      category: "Traduction",
      price: 60,
      rating: 4.8,
      location: "Wellington, Nouvelle-Zélande",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: featuredServiceImages.translation
    },
    {
      id: "3",
      title: "Initiation salsa guidée",
      description: "Apprenez les bases avec un champion international—aucune expérience nécessaire.",
      category: "Danse",
      price: 35,
      rating: 4.7,
      location: "Queenstown, Nouvelle-Zélande",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: featuredServiceImages.dance
    }
  ],
  he: [
    {
      id: "1",
      title: "סיור עירוני עם נקודות חבויות",
      description: "מתאים ליום הראשון בעיר: סמטאות סודיות, בתי קפה מקומיים וסיפורים אותנטיים.",
      category: "מדריך עיר",
      price: 40,
      rating: 4.9,
      location: "אוקלנד, ניו זילנד",
      provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: featuredServiceImages.tour
    },
    {
      id: "2",
      title: "תרגום וליווי לפגישות עסקיות",
      description: "מתורגמנית מוסמכת שומרת על שיחה מדויקת ומקצועית בכל פגישה בינלאומית.",
      category: "תרגום",
      price: 60,
      rating: 4.8,
      location: "וולינגטון, ניו זילנד",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: featuredServiceImages.translation
    },
    {
      id: "3",
      title: "סדנת סלסה למתחילים",
      description: "לומדים קצב וצעד בסיסי עם אלוף תחרויות, באווירה נינוחה וללא צורך בניסיון.",
      category: "ריקוד",
      price: 35,
      rating: 4.7,
      location: "קווינסטאון, ניו זילנד",
      provider: { id: "p3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: featuredServiceImages.dance
    }
  ],

  mi: [
    {
      id: "1",
      title: "Haerenga taone nui me nga taonga huna",
      description: "Tirohia nga waahanga ngaro me nga tino pai o te rohe mo to ra tuatahi i te taone.",
      category: "He Aratohu Taone",
      price: 40,
      rating: 4.9,
      location: "Auckland, Aotearoa",
      provider: { id: "P1", name: "Hiri K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
      imageSrc: featuredServiceImages.tour
    },
    {
      id: "2",
      title: "Ratonga Whakawhiti Pakihi",
      description: "Te whakamaoritanga ngaio na reira ka marama, ka maia nga hui whakawhiti whakawhiti.",
      category: "Whakamāoritanga",
      price: 60,
      rating: 4.8,
      location: "Wellington, Aotearoa",
      provider: { id: "p2", name: "Mei L.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      imageSrc: featuredServiceImages.translation
    },
    {
      id: "3",
      title: "Salsa Dance Whakataki me te Mahi",
      description: "Akohia nga kaupapa a Salsa me tetahi kaiwhakaako toa-kaore he wheako e hiahiatia ana.",
      category: "Kanikani",
      price: 35,
      rating: 4.7,
      location: "Kuini, Aotearoa",
      provider: { id: "P3", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
      imageSrc: featuredServiceImages.dance
    }
  ],
} as const;

const testimonials = {
  en: [
    {
      content:
        "Landing in Auckland with zero contacts, Guidew introduced me to underground jazz bars and a Bachata crew. Two weeks later I was greeting everyone in Māori and felt like a local.",
      author: { name: "Lily West", title: "London · Weekend dancer", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
    },
    {
      content:
        "Moving to Wellington for a game studio, I needed a social jumpstart. Guidew matched me with a translation buddy who taught Kiwi business etiquette by day and introduced me to tech meetups by night.",
      author: { name: "Mateo Rivera", title: "Mexico · Founder", avatar: "https://randomuser.me/api/portraits/men/54.jpg" }
    },
    {
      content:
        "During Queenstown's ski season, a local coach from Guidew took me to hidden Māori workshops and alpaca farms. I finally felt the soul of New Zealand.",
      author: { name: "Ava Nguyen", title: "Vietnam · Adventurer", avatar: "https://randomuser.me/api/portraits/women/29.jpg" }
    }
  ],
  pt: [
    {
      content:
        "Cheguei a Auckland sem contatos. Em dois dias, a Guidew me levou a clubes de jazz e a um grupo de bachata—agora cumpro agendas em maori básico e tenho amigos por toda a cidade.",
      author: { name: "Lívia Andrade", title: "São Paulo · Empreendedora criativa", avatar: "https://randomuser.me/api/portraits/women/65.jpg" }
    },
    {
      content:
        "Mudei para Wellington para trabalhar com games e precisava de networking imediato. A Guidew me conectou com um intérprete que explicou etiqueta de negócios kiwi e abriu portas em meetups tech.",
      author: { name: "Guilherme Costa", title: "Lisboa · Product designer", avatar: "https://randomuser.me/api/portraits/men/46.jpg" }
    },
    {
      content:
        "Nas férias em Queenstown, um coach da Guidew me levou a oficinas maori, trilhas secretas e fazendas de alpacas. Foi a primeira vez que senti a alma do país.",
      author: { name: "Carolina Dias", title: "Rio · Viajante solo", avatar: "https://randomuser.me/api/portraits/women/12.jpg" }
    }
  ],
  es: [
    {
      content:
        "Aterrizar en Auckland sin conocer a nadie fue intimidante. Guidew me llevó a bares de jazz y a un crew de bachata; en pocos días saludaba en maorí y tenía amigos en todos lados.",
      author: { name: "Valeria Núñez", title: "Madrid · Bailarina de finde", avatar: "https://randomuser.me/api/portraits/women/63.jpg" }
    },
    {
      content:
        "Me mudé a Wellington para un estudio de videojuegos. Guidew me conectó con una traductora que me enseñó etiqueta de negocios kiwi y me abrió puertas en meetups tech nocturnos.",
      author: { name: "Santiago Álvarez", title: "Buenos Aires · Creador", avatar: "https://randomuser.me/api/portraits/men/57.jpg" }
    },
    {
      content:
        "En Queenstown, una coach de Guidew me llevó a talleres maoríes y granjas ocultas. Por primera vez sentí el espíritu real de Nueva Zelanda.",
      author: { name: "Lucía Herrera", title: "CDMX · Aventurera", avatar: "https://randomuser.me/api/portraits/women/21.jpg" }
    }
  ],
  fr: [
    {
      content:
        "Arriver à Auckland sans connaître personne faisait peur. Guidew m’a emmenée dans des bars jazz underground et un crew de bachata; en quelques jours je saluais tout le monde en maori.",
      author: { name: "Camille Robert", title: "Paris · Danseuse du week-end", avatar: "https://randomuser.me/api/portraits/women/31.jpg" }
    },
    {
      content:
        "Je me suis installé à Wellington pour un studio de jeux vidéo. Guidew m’a présenté une interprète qui m’a expliqué l’étiquette business kiwi le jour et m’a introduit aux meetups tech le soir.",
      author: { name: "Hugo Martin", title: "Lyon · Producteur de jeux", avatar: "https://randomuser.me/api/portraits/men/23.jpg" }
    },
    {
      content:
        "Pendant la saison de ski à Queenstown, une coach Guidew m’a ouvert les portes d’ateliers maoris cachés et de fermes d’alpagas. J’ai enfin ressenti l’âme de la Nouvelle-Zélande.",
      author: { name: "Noémie Laurent", title: "Bruxelles · Aventurière", avatar: "https://randomuser.me/api/portraits/women/50.jpg" }
    }
  ],
  zh: [
    {
      content:
        "第一次踏上奥克兰，我一个朋友都没有。Guidew 的专家带我夜访地下爵士俱乐部，还介绍我加入 Bachata 社团，两周后用毛利语问候所有人。",
      author: { name: "Lily West", title: "来自伦敦 · 周末舞者", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
    },
    {
      content:
        "我搬到惠灵顿创办游戏工作室，社交圈一片空白。Guidew 帮我找到翻译兼 City Buddy，白天教我 Kiwi 式商务礼仪，晚上直接带进科技圈。",
      author: { name: "Mateo Rivera", title: "来自墨西哥 · 创业者", avatar: "https://randomuser.me/api/portraits/men/54.jpg" }
    },
    {
      content:
        "在皇后镇滑雪季，Guidew 让我认识热爱毛利文化的教练。她带我拜访部落工坊，还推荐驼羊牧场里的即兴舞会，我终于感受到新西兰的灵魂。",
      author: { name: "Ava Nguyen", title: "来自越南 · 冒险爱好者", avatar: "https://randomuser.me/api/portraits/women/29.jpg" }
    }
  ],
  he: [
    {
      content:
        "נחתתי באוקלנד בלי להכיר אף אחד. Guidew הובילו אותי למועדוני ג׳אז מחתרתיים ולחוג Bachata, ותוך ימים כבר בירכתי אנשים במאורית.",
      author: { name: "נועה הדר", title: "תל אביב · רוקדת בסופי שבוע", avatar: "https://randomuser.me/api/portraits/women/75.jpg" }
    },
    {
      content:
        "עברתי לוולינגטון כדי לעבוד בסטודיו למשחקים והייתי צריך חברים מהר. מומחית Guidew שימשה כמתורגמנית ביום וחיברה אותי ל-meetups טכנולוגיים בלילה.",
      author: { name: "אסף גולן", title: "חיפה · יזם משחקים", avatar: "https://randomuser.me/api/portraits/men/71.jpg" }
    },
    {
      content:
        "בעונת הסקי בקווינסטאון מאמנת Guidew לקחה אותי לסדנאות מאוריות נסתרות ולחוות אלפקות. סוף סוף הרגשתי את הנשמה של ניו זילנד.",
      author: { name: "יעל שלו", title: "ירושלים · מחפשת הרפתקאות", avatar: "https://randomuser.me/api/portraits/women/11.jpg" }
    }
  ],

  mi: [
    {
      content:
        "Ko te taunga ki Akarana me nga hoapaki kore, i whakauruhia e te kaiarahi ki a au ki nga tutaki o te jazz me te roopu bactata. E rua wiki i muri mai ka mihi ahau ki nga tangata katoa o te iwi Māori ka rite ki te rohe.",
      author: { name: "Lily West", title: "London Cancer", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
    },
    {
      content:
        "Te neke ki Te Whanganui-a-Tara mo te Taakaro Game, I hiahiatia e ahau he pekerangi pāpori. Ko te kaiarahi i a au me tetahi kai whakamaoritanga i whakaakona e Iwi Pakihi ki te ra, a ka whakauru mai ahau ki te whakatau hangarau i te po.",
      author: { name: "Mateo Rivera", title: "Mexico leger", avatar: "https://randomuser.me/api/portraits/men/54.jpg" }
    },
    {
      content:
        "I te wa o te reti o te Kuini, ka haria mai e te kaiarahi o te rohe ki te huna i nga awheawhe a te Māori me nga ahuwhenua a Alpaca. I te mutunga kua rongo ahau i te wairua o Aotearoa.",
      author: { name: "Ava nuguyen", title: "Vietnam · te kaikorero", avatar: "https://randomuser.me/api/portraits/women/29.jpg" }
    }
  ],
} as const;

const copy = {
  en: {
    notice:
      "This site is a demo for research. Please do not register, pay, or rely on the data—everything is mock content.",
    noticeButton: "Got it",
    categories: {
      badge: "Diverse Expertise",
      title: "What kind of help do you need?",
      description:
        "From city guides and language assistance to specialized skills, find trusted experts anywhere.",
      cards: [
        { title: "City Guides", description: "Hidden gems and custom tours.", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "Translation Services", description: "Break barriers with interpreters on demand.", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "Cultural Experiences", description: "Immerse yourself in local traditions.", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "Skill Instruction", description: "Learn cooking, music, dance, and more.", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "View all categories"
    },
    featured: {
      badge: "Top Picks",
      title: "Featured Services",
      description: "Explore our most-loved services from top-rated locals.",
      cta: "Explore all services"
    },
    howItWorks: {
      badge: "Simple Process",
      title: "How It Works",
      description: "Connect with local expertise in three easy steps.",
      steps: [
        { title: "Discover", description: "Browse services near you or your destination.", icon: MapPin },
        { title: "Book", description: "Choose a time and confirm instantly.", icon: Calendar },
        { title: "Experience", description: "Meet your expert and enjoy personalized help.", icon: Coffee }
      ],
      cta: "Learn more about the process"
    },
    testimonials: {
      badge: "User Stories",
      title: "What Our Users Say",
      description: "Travelers and locals share how Guidew transformed their trips."
    },
    cta: {
      title: "Ready to experience local expertise?",
      description: "Join thousands of travelers and locals connecting through Guidew.",
      find: "Find an Expert",
      become: "Become an Expert"
    }
  },
  pt: {
    notice:
      "Este site é um protótipo de pesquisa. Não realize cadastros, pagamentos ou decisões reais com base nas informações exibidas.",
    noticeButton: "Entendi",
    categories: {
      badge: "Expertise diversa",
      title: "Que tipo de ajuda você procura?",
      description:
        "De guias urbanos e apoio linguístico a aulas exclusivas e experiências culturais, encontre especialistas confiáveis em qualquer lugar.",
      cards: [
        { title: "Guias urbanos", description: "Roteiros sob medida e segredos locais.", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "Tradução imediata", description: "Intérpretes que eliminam barreiras nos seus encontros.", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "Experiências culturais", description: "Imersões em tradições, gastronomia e arte.", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "Aulas personalizadas", description: "Culinária, música, dança e muito mais.", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "Ver todas as categorias"
    },
    featured: {
      badge: "Favoritos da comunidade",
      title: "Serviços em destaque",
      description: "Seleção atualizada com experiências que os usuários mais amam.",
      cta: "Explorar todos os serviços"
    },
    howItWorks: {
      badge: "Processo simples",
      title: "Como funciona na prática",
      description: "Três passos para encontrar um especialista local e confirmar em minutos.",
      steps: [
        { title: "Descobrir", description: "Busque serviços perto de você ou no próximo destino.", icon: MapPin },
        { title: "Reservar", description: "Escolha o horário ideal e confirme instantaneamente.", icon: Calendar },
        { title: "Viver", description: "Encontre o especialista e aproveite uma experiência sob medida.", icon: Coffee }
      ],
      cta: "Saiba mais sobre o passo a passo"
    },
    testimonials: {
      badge: "Histórias reais",
      title: "O que viajantes e moradores dizem",
      description: "Depoimentos inspiradores de quem já usou a Guidew para desbloquear novas conexões."
    },
    cta: {
      title: "Pronto para viver a experiência Guidew?",
      description: "Junte-se a milhares de viajantes e locais que encontram ajuda humana pela plataforma.",
      find: "Encontrar especialista",
      become: "Quero ser especialista"
    }
  },
  es: {
    notice:
      "Este sitio es un prototipo de investigación. No realices registros, pagos ni decisiones reales con la información mostrada.",
    noticeButton: "Entendido",
    categories: {
      badge: "Talento diverso",
      title: "¿Qué tipo de ayuda buscas?",
      description:
        "Desde guías urbanos y apoyo lingüístico hasta clases exclusivas y experiencias culturales, encuentra expertos confiables en segundos.",
      cards: [
        { title: "Guías urbanos", description: "Itinerarios a medida y secretos locales.", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "Traducción inmediata", description: "Intérpretes que derriban barreras en tus reuniones.", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "Experiencias culturales", description: "Inmersiones en gastronomía, arte y rituales.", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "Clases personalizadas", description: "Cocina, música, danza y más.", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "Ver todas las categorías"
    },
    featured: {
      badge: "Favoritos de la comunidad",
      title: "Servicios destacados",
      description: "Experiencias que los viajeros recomiendan una y otra vez.",
      cta: "Explorar todos los servicios"
    },
    howItWorks: {
      badge: "Proceso simple",
      title: "¿Cómo funciona Guidew?",
      description: "Tres pasos para encontrar un experto local y confirmar en minutos.",
      steps: [
        { title: "Descubrir", description: "Explora servicios cerca de ti o del próximo destino.", icon: MapPin },
        { title: "Reservar", description: "Elige la hora ideal y confirma al instante.", icon: Calendar },
        { title: "Vivir", description: "Reúnete con el experto y disfruta una experiencia diseñada para ti.", icon: Coffee }
      ],
      cta: "Conoce el paso a paso"
    },
    testimonials: {
      badge: "Historias reales",
      title: "Lo que dicen viajeros y locales",
      description: "Testimonios de quienes desbloquearon conexiones humanas con Guidew."
    },
    cta: {
      title: "¿Listo para vivir Guidew?",
      description: "Únete a miles de viajeros y locales que encuentran ayuda confiable en la plataforma.",
      find: "Encontrar especialista",
      become: "Convertirme en experto"
    }
  },
  fr: {
    notice:
      "Ce site est un prototype de recherche. Merci de ne pas créer de compte, de ne pas payer et de ne pas vous baser sur les données affichées.",
    noticeButton: "Compris",
    categories: {
      badge: "Talents variés",
      title: "Quelle aide recherchez-vous ?",
      description:
        "Guides urbains, soutien linguistique, ateliers exclusifs ou expériences culturelles : trouvez des experts fiables en quelques secondes.",
      cards: [
        { title: "Guides urbains", description: "Itinéraires sur mesure et secrets locaux.", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "Traduction express", description: "Des interprètes qui effacent les barrières linguistiques.", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "Immersions culturelles", description: "Gastronomie, art, rituels et quartiers cachés.", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "Cours personnalisés", description: "Cuisine, musique, danse et plus encore.", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "Voir toutes les catégories"
    },
    featured: {
      badge: "Favoris de la communauté",
      title: "Services en vedette",
      description: "Les expériences que les voyageurs recommandent encore et encore.",
      cta: "Explorer tous les services"
    },
    howItWorks: {
      badge: "Processus simple",
      title: "Comment fonctionne Guidew ?",
      description: "Trois étapes pour trouver un expert local et confirmer en quelques minutes.",
      steps: [
        { title: "Découvrir", description: "Parcourez les services près de chez vous ou de votre prochaine destination.", icon: MapPin },
        { title: "Réserver", description: "Choisissez l’horaire idéal et confirmez instantanément.", icon: Calendar },
        { title: "Vivre", description: "Rencontrez l’expert et profitez d’une expérience sur mesure.", icon: Coffee }
      ],
      cta: "Découvrir le fonctionnement"
    },
    testimonials: {
      badge: "Histoires réelles",
      title: "Ce que disent voyageurs et locaux",
      description: "Ils racontent comment Guidew leur a ouvert de nouvelles connexions humaines."
    },
    cta: {
      title: "Prêt à vivre l’expérience Guidew ?",
      description: "Rejoignez des milliers de voyageurs et de locaux qui trouvent une aide fiable sur la plateforme.",
      find: "Trouver un expert",
      become: "Devenir expert"
    }
  },
  zh: {
    notice: "当前网站仍处于研发阶段，仅用于演示。请勿注册、支付或依据页面信息做实际决策，所有数据为模拟内容。",
    noticeButton: "我已了解",
    categories: {
      badge: "多元技能",
      title: "需要什么帮助？",
      description: "从城市陪同、语言协助到专业技能，在任何地方找到可信赖的专家。",
      cards: [
        { title: "城市向导", description: "发现隐藏景点与专属行程。", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "翻译服务", description: "实时翻译，跨语言零障碍。", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "文化体验", description: "沉浸式感受本地传统。", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "技能教学", description: "烹饪、舞蹈、音乐等定制课程。", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "查看全部类别"
    },
    featured: {
      badge: "精选推荐",
      title: "热门服务",
      description: "探索来自全球顶级本地专家的热门体验。",
      cta: "查看更多服务"
    },
    howItWorks: {
      badge: "三步即可",
      title: "Guidew 如何运作",
      description: "三步连接本地专家，享受个性化体验。",
      steps: [
        { title: "发现", description: "浏览附近或目的地的服务。", icon: MapPin },
        { title: "预订", description: "选择时间地点，一键确认。", icon: Calendar },
        { title: "体验", description: "线下见面，享受专属陪伴。", icon: Coffee }
      ],
      cta: "了解完整流程"
    },
    testimonials: {
      badge: "用户故事",
      title: "真实反馈",
      description: "旅行者与本地人分享他们与 Guidew 的故事。"
    },
    cta: {
      title: "准备好体验本地服务了吗？",
      description: "加入数千名旅行者和当地人，通过 Guidew 连接真实帮助。",
      find: "寻找专家",
      become: "成为专家"
    }
  },
  he: {
    notice: "האתר הזה הוא דמו למחקר. אל תבצעו הרשמות, תשלומים או החלטות אמיתיות על בסיס המידע שמופיע כאן.",
    noticeButton: "הבנתי",
    categories: {
      badge: "מומחיות מגוונת",
      title: "איזו עזרה אתם מחפשים?",
      description: "ממדריכי עיר ותרגום מיידי ועד סדנאות תרבותיות והדרכות פרטיות—מצאו מומחים אמינים בכל יעד.",
      cards: [
        { title: "מדריכי עיר", description: "מסלולים אישיים וסודות מקומיים.", icon: MapPin, color: "bg-brand-teal", route: "/discover?category=city-guides" },
        { title: "שירותי תרגום", description: "מתורגמנים זמינים שוברים מחסומי שפה.", icon: Languages, color: "bg-brand-orange", route: "/discover?category=translation" },
        { title: "חוויות תרבות", description: "טבילה במטבח, באמנות ובקהילות המקומיות.", icon: Globe, color: "bg-purple-500", route: "/discover?category=cultural-experiences" },
        { title: "הדרכות מיומנות", description: "שיעורי בישול, מוזיקה, ריקוד ועוד.", icon: Book, color: "bg-blue-500", route: "/discover?category=skill-instruction" }
      ],
      cta: "צפו בכל הקטגוריות"
    },
    featured: {
      badge: "בחירות מובילות",
      title: "שירותים מומלצים",
      description: "החוויה של מדריכים מדורגים שהקהילה לא מפסיקה להזמין.",
      cta: "כל השירותים הזמינים"
    },
    howItWorks: {
      badge: "תהליך פשוט",
      title: "איך Guidew עובדת",
      description: "שלושה צעדים קלים כדי להתחבר למומחית מקומית.",
      steps: [
        { title: "גילוי", description: "מגלים שירותים לידכם או ביעד הבא.", icon: MapPin },
        { title: "הזמנה", description: "בוחרים זמן ומאשרים בלחיצה.", icon: Calendar },
        { title: "חווים", description: "נפגשים עם המומחה ומקבלים ליווי מותאם אישית.", icon: Coffee }
      ],
      cta: "למידע נוסף על התהליך"
    },
    testimonials: {
      badge: "סיפורי משתמשים",
      title: "מה הקהילה מספרת",
      description: "מטיילים ותושבים משתפים כיצד Guidew שדרגה להם את הנסיעות."
    },
    cta: {
      title: "מוכנים לחוות מומחיות מקומית?",
      description: "הצטרפו לאלפי אנשים שכבר מתחברים דרך Guidew.",
      find: "מצאו מומחה",
      become: "הפכו למומחה"
    }
  },

  mi: {
    notice:
      "Ko tenei papaanga he demo mo te rangahau. Tena koa kaua e rehita, utu, kia whakawhirinaki ranei ki nga raraunga - ko nga mea katoa he mea whakahihiri.",
    noticeButton: "Ka mau",
    categories: {
      badge: "Tohungatanga kanorau",
      title: "He aha te momo awhina e hiahiatia ana e koe?",
      description:
        "Mai i nga kaiarahi o te taone me nga awhina reo ki nga pukenga motuhake, kitea nga tohunga e whakawhirinaki ana ki nga waahi katoa.",
      cards: [
        { title: "Nga kaiarahi o te taone", description: "Nga taonga huna me nga haerenga ritenga.", icon: MapPin, color: "Bg-waitohu-teal", route: "/ Tirohia? Te Kāwai = Taonga-Taonga" },
        { title: "Ratonga Whakawhiti", description: "Pakaru nga aukati me nga whakamaori i runga i te tono.", icon: Languages, color: "BG-waitohu-karaka", route: "/ Tirohia? Kāwai = Whakawhiti" },
        { title: "Nga wheako ahurea", description: "Rumaki i roto i nga tikanga o te rohe.", icon: Globe, color: "BG-parple-500", route: "/ Tirohia? Te kāwai = nga wheako ahurea" },
        { title: "Tohutohu pūkenga", description: "Akohia te tunu kai, waiata, kanikani, me te maha atu.", icon: Book, color: "BG-Blue-500", route: "/ Tirohia? Te Kāwai = Tohutohu-Tohutohu" }
      ],
      cta: "Tirohia nga waahanga katoa"
    },
    featured: {
      badge: "Tuhinga o mua",
      title: "Ratonga Whakaaturanga",
      description: "Te tirotiro i o maatau ratonga tino aroha mai i nga taangata o runga.",
      cta: "Te tirotiro i nga ratonga katoa"
    },
    howItWorks: {
      badge: "He mahinga ngawari",
      title: "Me pehea te mahi",
      description: "Tūhono ki ngā tohungatanga o te rohe i roto i nga waahanga ngawari e toru.",
      steps: [
        { title: "Hura", description: "Tirotiro nga ratonga e tata ana ki a koe, ki to haerenga ranei.", icon: MapPin },
        { title: "Pukapuka", description: "Whiriwhiria he wa ka whakaū tonu.", icon: Calendar },
        { title: "Taunga", description: "Me tutaki ki to tohunga me te pai ki te awhina awhina.", icon: Coffee }
      ],
      cta: "Ako atu mo te tukanga"
    },
    testimonials: {
      badge: "Nga korero a te kaiwhakamahi",
      title: "He aha ta o maatau kaiwhakamahi",
      description: "Ko nga kaihaere me nga taangata e whakaatu ana i te hurihanga o nga kaiarahi a raatau haerenga."
    },
    cta: {
      title: "Kua rite ki te wheako i nga tohungatanga o te rohe?",
      description: "Hono atu ki nga mano o nga kaihaere me nga takiwa e hono ana ma te arahi.",
      find: "Rapua he tohunga",
      become: "Riro hei tohunga"
    }
  },} as const;

const Index = () => {
  const [showNotice, setShowNotice] = useState(true);
  const { i18n } = useTranslation();
  const { openDownloadDialog } = useDownloadDialog();
  const locale = resolveLocale(i18n.language);
  const localeKey =
    locale === "zh"
      ? "zh"
      : locale === "pt"
        ? "pt"
        : locale === "es"
          ? "es"
          : locale === "fr"
            ? "fr"
            : locale === "he"
              ? "he"
              : locale === "mi"
                ? "mi"
                : "en";
  const content = copy[localeKey];
  const services = featuredServices[locale] ?? featuredServices.en;
  const stories = testimonials[locale] ?? testimonials.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {showNotice && (
          <div className="bg-white border-b border-amber-200/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-brand-darkBlue">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertTriangle className="h-6 w-6 text-brand-orange" />
                </div>
                <p>{content.notice}</p>
              </div>
              <button
                onClick={() => setShowNotice(false)}
                className="text-xs font-semibold uppercase tracking-wide text-brand-teal hover:underline"
              >
                {content.noticeButton}
              </button>
            </div>
          </div>
        )}

        <HeroSection />

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.categories.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.categories.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.categories.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {content.categories.cards.map(card => (
                <CategoryCard key={card.title} {...card} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/discover" className="inline-block">
                <Button variant="outline" className="group">
                  {content.categories.cta} <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.featured.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.featured.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.featured.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  onCardClick={() => openDownloadDialog(service.title)}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/discover" className="inline-block">
                <Button className="bg-brand-teal hover:bg-brand-teal/90">{content.featured.cta}</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.howItWorks.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.howItWorks.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.howItWorks.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {content.howItWorks.steps.map(step => (
                <div key={step.title} className="text-center">
                  <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-brand-teal" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link to="/how-it-works" className="inline-block">
                <Button variant="outline" className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white">
                  {content.howItWorks.cta}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-lightGray">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-3 py-1 border-brand-teal text-brand-teal">
                {content.testimonials.badge}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.testimonials.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{content.testimonials.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stories.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{content.cta.title}</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{content.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="inline-flex justify-center">
                <Button className="bg-white text-brand-teal hover:bg-white/90">{content.cta.find}</Button>
              </Link>
              <Link to="/become-expert" className="inline-flex justify-center">
                <Button
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-brand-teal"
                >
                  {content.cta.become}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
