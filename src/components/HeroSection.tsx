
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";
import { useTranslation } from "react-i18next";
import { pickLocaleValue, resolveLocale, type SupportedLocale } from "@/utils/locale";

type HeroBadge =
  | {
      id: string;
      type: "location" | "community";
      position: string;
      delay: string;
    }
  | {
      id: string;
      type: "info";
      title: string;
      subtitle: string;
      position: string;
      delay: string;
    };

type HeroSlideLayout = "default" | "reverse" | "spotlight" | "immersive" | "editorial";

type HeroSlide = {
  id: string;
  kicker: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  imageAlt: string;
  cta: "search" | "button";
  button?: {
    label: string;
    to: string;
  };
  badges: HeroBadge[];
  layout?: HeroSlideLayout;
};

const heroSlides: Partial<Record<SupportedLocale, HeroSlide[]>> = {
  en: [
    {
      id: "local-expertise",
      kicker: "Local Experts",
      title: "Local Expertise,",
      highlight: "On Demand",
      description:
        "Connect with trusted locals for city tours, translation, or skill coaching—all from a single app.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Local expert guiding tourists",
      layout: "default",
      cta: "search",
      badges: [
        {
          id: "badge-location",
          type: "location",
          position: "-left-4 top-1/4",
          delay: "0s"
        },
        {
          id: "badge-community",
          type: "community",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "elite-advisors",
      kicker: "Global Advisory",
      title: "Top Experts Across Fields,",
      highlight: "Your Personal Board",
      description:
        "Spin up strategy, culture, or growth sessions with exec coaches, VC mentors, and local fixers who join your call within minutes.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Advisors meeting virtually with clients",
      layout: "reverse",
      cta: "button",
      button: {
        label: "Book a private advisor",
        to: "/discover?category=business"
      },
      badges: [
        {
          id: "badge-board-en",
          type: "info",
          title: "Strategy • Culture • Legal",
          subtitle: "Curated mentors",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-en",
          type: "info",
          title: "30 min response",
          subtitle: "24/7 timezones",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "Elite Concierge",
      title: "Live Like A Billionaire,",
      highlight: "Experts On Standby",
      description:
        "Personal sommeliers, yacht skippers, wardrobe stylists, and crisis fixers choreograph every detail across New Zealand within minutes.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Luxury concierge team planning experiences",
      layout: "spotlight",
      cta: "button",
      button: {
        label: "Unlock VIP concierge",
        to: "/discover?category=professional"
      },
      badges: [
        {
          id: "badge-luxe-team-en",
          type: "info",
          title: "Lifestyle architects",
          subtitle: "6-star concierge",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-en",
          type: "info",
          title: "15 min response",
          subtitle: "Nationwide coverage",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "download-app",
      kicker: "Guidew App",
      title: "Turn Moments Into",
      highlight: "Local Magic",
      description:
        "Download Guidew and instantly call Auckland or Wellington experts—dance coaches, language partners, or rescue teams with AI matching and VIP perks.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Downloading Guidew app on phone",
      layout: "reverse",
      cta: "button",
      button: {
        label: "Download the app",
        to: "/download"
      },
      badges: [
        {
          id: "badge-app",
          type: "info",
          title: "iOS & Android",
          subtitle: "Scan to install",
          position: "-left-3 top-1/4",
          delay: "0.5s"
        },
        {
          id: "badge-vip",
          type: "info",
          title: "VIP perks",
          subtitle: "AI itinerary assistant",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "9.9 USD/month,",
      highlight: "Unlock AI Concierge",
      description:
        "Skip the 15% hire fee, chat with AI to describe your needs, and enjoy priority matching plus auto-accept tools for providers in Auckland and Wellington.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "VIP members chatting with AI planner",
      layout: "immersive",
      cta: "button",
      button: {
        label: "Join VIP",
        to: "/vip"
      },
      badges: [
        {
          id: "badge-vip-fee-en",
          type: "info",
          title: "No 15% fee",
          subtitle: "VIP-only hires",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-en",
          type: "info",
          title: "AI concierge",
          subtitle: "Priority matching",
          position: "right-6 bottom-10",
          delay: "2s"
        }
      ]
    },
    {
      id: "creator-network",
      kicker: "Become a Guidew Expert",
      title: "Create Your Own Work,",
      highlight: "Join 1000+ Job Creators",
      description:
        "Design your schedule and offer dance lessons, translation, or city buddies. Earn higher payouts and automate bookings with AI tools.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Creator planning routes on laptop",
      layout: "default",
      cta: "button",
      button: {
        label: "Start building",
        to: "/become-expert"
      },
      badges: [
        {
          id: "badge-impact",
          type: "info",
          title: "1000+ creators",
          subtitle: "Global network by 2026",
          position: "-left-6 top-1/3",
          delay: "0.5s"
        },
        {
          id: "badge-earning",
          type: "info",
          title: "High commission",
          subtitle: "Transparent payouts",
          position: "right-2 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "dance-school-finder",
      kicker: "Language Coach Radar",
      title: "Find New Zealand's",
      highlight: "Best Language Tutors",
      description:
        "Compare bilingual mentors, immersion labs, and exam coaches curated by locals. Preview voice samples, then book a private session in 60 seconds.",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Students practicing language skills in a sunlit studio",
      layout: "editorial",
      cta: "button",
      button: {
        label: "Book a language mentor",
        to: "/discover?category=language&tag=coaches"
      },
      badges: [
        {
          id: "badge-trial-en",
          type: "info",
          title: "48h placement",
          subtitle: "Trial guaranteed",
          position: "-left-6 top-6",
          delay: "0.3s"
        },
        {
          id: "badge-genres-en",
          type: "info",
          title: "IELTS • Business • Survival",
          subtitle: "30+ pro mentors",
          position: "right-6 bottom-8",
          delay: "2s"
        }
      ]
    },
    {
      id: "global-dance",
      kicker: "Dance Legends On Call",
      title: "Invite World Champions,",
      highlight: "Master Bachata In NZ",
      description:
        "From bohemian rooftops to Auckland's harbour, we fly champions to your door. Learn Kiwi-flavored Bachata in two hours plus stage confidence.",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Dancers practicing Bachata with mentor",
      layout: "spotlight",
      cta: "button",
      button: {
        label: "Book a champion coach",
        to: "/discover?category=dance"
      },
      badges: [
        {
          id: "badge-stars",
          type: "info",
          title: "World champions",
          subtitle: "Bachata mentors",
          position: "-left-4 top-1/4",
          delay: "0.3s"
        },
        {
          id: "badge-sessions",
          type: "info",
          title: "40+ private sessions",
          subtitle: "Auckland & Wellington",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    }
  ],
  es: [
    {
      id: "local-expertise",
      kicker: "Expertos locales",
      title: "Talento local,",
      highlight: "a demanda",
      description:
        "Conecta con especialistas de confianza para recorridos urbanos, traducción o clases privadas desde una sola app.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Experto local guiando a viajeros",
      layout: "default",
      cta: "search",
      badges: [
        { id: "badge-location-es", type: "location", position: "-left-4 top-1/4", delay: "0s" },
        { id: "badge-community-es", type: "community", position: "right-4 bottom-1/4", delay: "2s" }
      ]
    },
    {
      id: "elite-advisors",
      kicker: "Mesa directiva global",
      title: "Expertos top en cada disciplina,",
      highlight: "tu board personal",
      description:
        "Activa sesiones de estrategia, cultura o expansión con coaches ejecutivos, mentores VC y fixers locales que se conectan en minutos.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Asesores en reunión virtual",
      layout: "reverse",
      cta: "button",
      button: { label: "Reserva un asesor privado", to: "/discover?category=business" },
      badges: [
        {
          id: "badge-board-es",
          type: "info",
          title: "Estrategia • Cultura • Legal",
          subtitle: "Mentores curados",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-es",
          type: "info",
          title: "Respuesta en 30 min",
          subtitle: "Husos 24/7",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "Concierge de élite",
      title: "Vive como un billonario,",
      highlight: "con expertos en guardia",
      description:
        "Sommeliers personales, capitanes de yate, estilistas y equipos de crisis coordinan cada detalle en toda Nueva Zelanda.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Equipo concierge diseñando experiencias",
      layout: "spotlight",
      cta: "button",
      button: { label: "Desbloquear concierge VIP", to: "/discover?category=professional" },
      badges: [
        {
          id: "badge-luxe-team-es",
          type: "info",
          title: "Arquitectos de lifestyle",
          subtitle: "Concierge seis estrellas",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-es",
          type: "info",
          title: "Respuesta en 15 min",
          subtitle: "Cobertura nacional",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "download-app",
      kicker: "App Guidew",
      title: "Convierte ideas en",
      highlight: "magia local",
      description:
        "Descarga Guidew y convoca expertos de Auckland o Wellington—coaches de danza, compañeros de idioma o equipos de rescate con IA y perks VIP.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Usuario descargando Guidew",
      layout: "reverse",
      cta: "button",
      button: { label: "Descargar la app", to: "/download" },
      badges: [
        { id: "badge-app-es", type: "info", title: "iOS & Android", subtitle: "Escanea para instalar", position: "-left-3 top-1/4", delay: "0.5s" },
        { id: "badge-vip-es", type: "info", title: "Beneficios VIP", subtitle: "Asistente IA de itinerarios", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "9,9 USD/mes,",
      highlight: "desbloquea concierge IA",
      description:
        "VIP elimina el 15% de comisión, habilita solicitudes por IA y matching prioritario; los proveedores reciben auto-accept, itinerarios y alertas de desplazamiento.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Miembros VIP hablando con IA",
      layout: "immersive",
      cta: "button",
      button: { label: "Unirme al VIP", to: "/vip" },
      badges: [
        {
          id: "badge-vip-fee-es",
          type: "info",
          title: "Sin comisión 15%",
          subtitle: "Exclusivo VIP",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-es",
          type: "info",
          title: "Concierge IA",
          subtitle: "Matching prioritario",
          position: "right-6 bottom-10",
          delay: "2s"
        }
      ]
    },
    {
      id: "creator-network",
      kicker: "Hazte experto Guidew",
      title: "Diseña tu ritmo laboral,",
      highlight: "entra a la red global",
      description:
        "Ofrece traducción, city escort o coaching creativo y administra pedidos con IA, pagos transparentes y badges de reputación.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Creadores planeando experiencias",
      layout: "default",
      cta: "button",
      button: { label: "Comenzar ahora", to: "/become-expert" },
      badges: [
        { id: "badge-impact-es", type: "info", title: "1000+ creadores", subtitle: "Red 2026", position: "-left-6 top-1/3", delay: "0.5s" },
        { id: "badge-earning-es", type: "info", title: "Altas comisiones", subtitle: "Pagos claros", position: "right-2 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "dance-school-finder",
      kicker: "Radar de idiomas",
      title: "Encuentra los mejores",
      highlight: "profesores de idioma",
      description:
        "Tarjetas inmersivas comparan estilos, acentos, logros y cupos; asesores bilingües aseguran un trial privado en 60 segundos.",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Estudiantes practicando en aula",
      layout: "editorial",
      cta: "button",
      button: { label: "Agendar coach de idiomas", to: "/discover?category=language&tag=coaches" },
      badges: [
        { id: "badge-trial-es", type: "info", title: "Agenda en 48h", subtitle: "Trial garantizado", position: "-left-6 top-6", delay: "0.3s" },
        { id: "badge-genres-es", type: "info", title: "IELTS • Negocios • Supervivencia", subtitle: "30+ coaches pro", position: "right-6 bottom-8", delay: "2s" }
      ]
    },
    {
      id: "global-dance",
      kicker: "Campeones on-call",
      title: "Invita campeones mundiales,",
      highlight: "domina Bachata en NZ",
      description:
        "De rooftops bohemios al puerto de Auckland, mentores campeones enseñan pasos, presencia escénica y confianza social.",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Alumnos practicando con instructora",
      layout: "spotlight",
      cta: "button",
      button: { label: "Reservar campeón", to: "/discover?category=dance" },
      badges: [
        { id: "badge-stars-es", type: "info", title: "Campeones mundiales", subtitle: "Equipo Bachata", position: "-left-4 top-1/4", delay: "0.3s" },
        { id: "badge-sessions-es", type: "info", title: "40+ privadas/semana", subtitle: "Auckland · Wellington", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    }
  ],
  pt: [
    {
      id: "local-expertise",
      kicker: "Especialistas locais",
      title: "Expertise local,",
      highlight: "sob demanda",
      description:
        "Conecte-se com moradores de confiança para passeios, tradução ou aulas particulares—tudo em um único app.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Especialista local guiando viajantes",
      layout: "default",
      cta: "search",
      badges: [
        { id: "badge-location", type: "location", position: "-left-4 top-1/4", delay: "0s" },
        { id: "badge-community", type: "community", position: "right-4 bottom-1/4", delay: "2s" }
      ]
    },
    {
      id: "elite-advisors",
      kicker: "Conselho global",
      title: "Top experts de várias áreas,",
      highlight: "no seu board pessoal",
      description:
        "Inicie sessões de estratégia, cultura ou crescimento com executivos, mentores de VC e fixers locais que entram na sua call em minutos.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Consultores em reunião virtual",
      layout: "reverse",
      cta: "button",
      button: { label: "Reservar consultor privado", to: "/discover?category=business" },
      badges: [
        {
          id: "badge-board-pt",
          type: "info",
          title: "Estratégia • Cultura • Jurídico",
          subtitle: "Mentores curados",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-pt",
          type: "info",
          title: "Resposta em 30 min",
          subtitle: "Fusos 24/7",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "Concierge de elite",
      title: "Viva como bilionário,",
      highlight: "com experts de prontidão",
      description:
        "Sommelier, capitães de iate, stylists e equipes de crise coordenam cada detalhe pela Nova Zelândia em poucos minutos.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Equipe concierge planejando experiências",
      layout: "spotlight",
      cta: "button",
      button: { label: "Desbloquear concierge VIP", to: "/discover?category=professional" },
      badges: [
        {
          id: "badge-luxe-team-pt",
          type: "info",
          title: "Arquitetos de lifestyle",
          subtitle: "Concierge 6 estrelas",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-pt",
          type: "info",
          title: "Resposta em 15 min",
          subtitle: "Cobertura nacional",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "download-app",
      kicker: "App Guidew",
      title: "Transforme momentos em",
      highlight: "magia local",
      description:
        "Baixe a Guidew e acione especialistas de Auckland ou Wellington—coaches de dança, parceiros de idioma ou equipes de resgate com IA e perks VIP.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Pessoa baixando o app Guidew",
      layout: "reverse",
      cta: "button",
      button: { label: "Baixar o app", to: "/download" },
      badges: [
        { id: "badge-app-pt", type: "info", title: "iOS & Android", subtitle: "Escaneie para instalar", position: "-left-3 top-1/4", delay: "0.5s" },
        { id: "badge-vip-pt", type: "info", title: "Benefícios VIP", subtitle: "Assistente de itinerário IA", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "US$ 9,9/mês,",
      highlight: "desbloqueie o concierge IA",
      description:
        "VIP remove a taxa de 15%, libera pedidos por IA e prioridade; provedores ganham autoaceite, roteiros inteligentes e alertas de deslocamento.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Membros VIP conversando com assistente IA",
      layout: "immersive",
      cta: "button",
      button: { label: "Entrar no VIP", to: "/vip" },
      badges: [
        {
          id: "badge-vip-fee-pt",
          type: "info",
          title: "Sem taxa de 15%",
          subtitle: "Exclusivo VIP",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-pt",
          type: "info",
          title: "Concierge IA",
          subtitle: "Matching prioritário",
          position: "right-6 bottom-10",
          delay: "2s"
        }
      ]
    },
    {
      id: "creator-network",
      kicker: "Torne-se especialista Guidew",
      title: "Desenhe seu ritmo de trabalho,",
      highlight: "entre na rede global",
      description:
        "Ofereça dança, tradução ou city escort e administre pedidos com IA, pagamentos transparentes e badges de reputação.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Criadores planejando experiências",
      layout: "default",
      cta: "button",
      button: { label: "Começar agora", to: "/become-expert" },
      badges: [
        { id: "badge-impact-pt", type: "info", title: "1000+ criadores", subtitle: "Rede global 2026", position: "-left-6 top-1/3", delay: "0.5s" },
        { id: "badge-earning-pt", type: "info", title: "Comissão alta", subtitle: "Liquidação transparente", position: "right-2 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "dance-school-finder",
      kicker: "Radar de idiomas",
      title: "Encontre os melhores",
      highlight: "professores de idioma da NZ",
      description:
        "Cartões imersivos comparam estilo de aula, sotaque, aprovações e vagas; consultores bilíngues garantem um trial em 60 segundos.",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Alunos praticando em sala iluminada",
      layout: "editorial",
      cta: "button",
      button: { label: "Agendar professor de idiomas", to: "/discover?category=language&tag=coaches" },
      badges: [
        { id: "badge-trial-pt", type: "info", title: "Agenda garantida em 48h", subtitle: "Trial exclusivo", position: "-left-6 top-6", delay: "0.3s" },
        { id: "badge-genres-pt", type: "info", title: "IELTS · negócios · conversação", subtitle: "30+ coaches certificados", position: "right-6 bottom-8", delay: "2s" }
      ]
    },
    {
      id: "global-dance",
      kicker: "Campeões ao vivo",
      title: "Traga campeões mundiais,",
      highlight: "domine Bachata Kiwi em 2h",
      description:
        "De rooftops boêmios ao porto de Auckland, mentores campeões ensinam passos, presença de palco e confiança social.",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Alunos dançando com instrutora",
      layout: "spotlight",
      cta: "button",
      button: { label: "Reservar campeão", to: "/discover?category=dance" },
      badges: [
        { id: "badge-stars-pt", type: "info", title: "Campeões mundiais", subtitle: "Equipe Bachata", position: "-left-4 top-1/4", delay: "0.3s" },
        { id: "badge-sessions-pt", type: "info", title: "40+ particulares/semana", subtitle: "Auckland · Wellington", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    }
  ],
  fr: [
    {
      id: "local-expertise",
      kicker: "Experts locaux",
      title: "Talents locaux,",
      highlight: "à la demande",
      description:
        "Connectez-vous à des spécialistes de confiance pour visites urbaines, traduction ou coaching personnalisé depuis une seule application.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Expert local guidant des voyageurs",
      layout: "default",
      cta: "search",
      badges: [
        { id: "badge-location-fr", type: "location", position: "-left-4 top-1/4", delay: "0s" },
        { id: "badge-community-fr", type: "community", position: "right-4 bottom-1/4", delay: "2s" }
      ]
    },
    {
      id: "elite-advisors",
      kicker: "Conseil global",
      title: "Experts de haut niveau,",
      highlight: "votre board personnel",
      description:
        "Activez des sessions de stratégie, culture ou expansion avec coaches exécutifs, mentors VC et fixers locaux connectés en quelques minutes.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Conseillers en réunion virtuelle",
      layout: "reverse",
      cta: "button",
      button: { label: "Réserver un conseiller privé", to: "/discover?category=business" },
      badges: [
        { id: "badge-board-fr", type: "info", title: "Stratégie • Culture • Legal", subtitle: "Mentors triés", position: "-left-5 top-1/3", delay: "0.4s" },
        { id: "badge-response-fr", type: "info", title: "Réponse 30 min", subtitle: "Fuseaux 24/7", position: "right-3 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "Concierge d’élite",
      title: "Vivez comme un milliardaire,",
      highlight: "experts en alerte",
      description:
        "Sommeliers, skippers, stylistes et cellules de crise coordonnent chaque détail sur toute la Nouvelle-Zélande.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Équipe concierge orchestrant une expérience",
      layout: "spotlight",
      cta: "button",
      button: { label: "Débloquer le concierge VIP", to: "/discover?category=professional" },
      badges: [
        { id: "badge-luxe-team-fr", type: "info", title: "Architectes lifestyle", subtitle: "Concierge 6 étoiles", position: "-left-6 top-1/3", delay: "0.4s" },
        { id: "badge-luxe-response-fr", type: "info", title: "Réponse 15 min", subtitle: "Couverture nationale", position: "right-4 bottom-1/4", delay: "2s" }
      ]
    },
    {
      id: "download-app",
      kicker: "App Guidew",
      title: "Transformez vos idées en",
      highlight: "magie locale",
      description:
        "Téléchargez Guidew et sollicitez des experts à Auckland ou Wellington—coaches de danse, tandems linguistiques ou équipes de secours avec IA et avantages VIP.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Téléchargement de l’application Guidew",
      layout: "reverse",
      cta: "button",
      button: { label: "Télécharger l’app", to: "/download" },
      badges: [
        { id: "badge-app-fr", type: "info", title: "iOS & Android", subtitle: "Scannez pour installer", position: "-left-3 top-1/4", delay: "0.5s" },
        { id: "badge-vip-fr", type: "info", title: "Avantages VIP", subtitle: "Assistant IA d’itinéraires", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "9,9 USD/mois,",
      highlight: "concierge IA activé",
      description:
        "Le plan VIP supprime les 15 % de frais, permet de briefer via IA et offre un matching prioritaire; les prestataires obtiennent auto-accept, itinéraires IA et alertes de distance.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Membres VIP utilisant un planificateur IA",
      layout: "immersive",
      cta: "button",
      button: { label: "Rejoindre le VIP", to: "/vip" },
      badges: [
        { id: "badge-vip-fee-fr", type: "info", title: "Sans frais 15 %", subtitle: "Demandes exclusives", position: "left-6 top-6", delay: "0.4s" },
        { id: "badge-vip-ai-fr", type: "info", title: "Concierge IA", subtitle: "Matching prioritaire", position: "right-6 bottom-10", delay: "2s" }
      ]
    },
    {
      id: "creator-network",
      kicker: "Devenir expert Guidew",
      title: "Créez votre travail,",
      highlight: "rejoignez 1000+ créateurs",
      description:
        "Choisissez votre planning et proposez danse, traduction ou city buddy. Maximisez vos revenus et automatisez vos réservations avec les outils IA.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Créatrice planifiant des itinéraires",
      layout: "default",
      cta: "button",
      button: { label: "Commencer maintenant", to: "/become-expert" },
      badges: [
        { id: "badge-impact-fr", type: "info", title: "1000+ créateurs", subtitle: "Réseau mondial 2026", position: "-left-6 top-1/3", delay: "0.5s" },
        { id: "badge-earning-fr", type: "info", title: "Commissions élevées", subtitle: "Payouts transparents", position: "right-2 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "dance-school-finder",
      kicker: "Radar coach linguistique",
      title: "Trouvez les meilleurs",
      highlight: "mentors de langues en NZ",
      description:
        "Comparez mentors bilingues, labos d’immersion et coachs d’examen vérifiés par des locaux. Prévisualisez des voix, puis réservez en 60 s.",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Étudiants pratiquant une langue",
      layout: "editorial",
      cta: "button",
      button: { label: "Réserver un mentor linguistique", to: "/discover?category=language&tag=coaches" },
      badges: [
        { id: "badge-trial-fr", type: "info", title: "Placement 48 h", subtitle: "Essai garanti", position: "-left-6 top-6", delay: "0.3s" },
        { id: "badge-genres-fr", type: "info", title: "IELTS • Business • Survie", subtitle: "30+ mentors pro", position: "right-6 bottom-8", delay: "2s" }
      ]
    },
    {
      id: "global-dance",
      kicker: "Champions à portée",
      title: "Invitez des maîtres mondiaux,",
      highlight: "domptez la bachata en NZ",
      description:
        "Des rooftops bohèmes aux quais d’Auckland, nous faisons venir des champions chez vous. Apprenez une bachata saveur kiwi en deux heures et gagnez en confiance scénique.",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4ca60f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Danseurs coachés",
      layout: "spotlight",
      cta: "button",
      button: { label: "Réserver un coach champion", to: "/discover?category=dance" },
      badges: [
        { id: "badge-stars-fr", type: "info", title: "Champions du monde", subtitle: "Mentors bachata", position: "-left-4 top-1/4", delay: "0.3s" },
        { id: "badge-sessions-fr", type: "info", title: "40+ sessions privées", subtitle: "Auckland & Wellington", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    }
  ],
  zh: [
    {
      id: "local-expertise",
      kicker: "Local Experts",
      title: "随叫随到的本地专家，",
      highlight: "就在手机里",
      description: "一键召唤城市陪同、翻译伙伴或技能导师，真实人脉即时响应。",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "本地专家带路",
      layout: "default",
      cta: "search",
      badges: [
        { id: "badge-location", type: "location", position: "-left-4 top-1/4", delay: "0s" },
        { id: "badge-community", type: "community", position: "right-4 bottom-1/4", delay: "2s" }
      ]
    },
    {
      id: "elite-advisors",
      kicker: "全球顾问席位",
      title: "让各领域顶级专家成为你的",
      highlight: "专属顾问",
      description:
        "无论企业战略、跨文化沟通还是海外落地，立即召集中外导师与本地 Fixer，30 分钟内一起进入你的专属会议室。",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "顾问远程会议",
      layout: "reverse",
      cta: "button",
      button: { label: "立即预约顾问", to: "/discover?category=business" },
      badges: [
        {
          id: "badge-board-zh",
          type: "info",
          title: "战略 · 文化 · 法务",
          subtitle: "一键匹配导师",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-zh",
          type: "info",
          title: "30 分钟响应",
          subtitle: "覆盖全球时区",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "奢华生活管家",
      title: "像亿万富豪一样生活，",
      highlight: "让各路专家随叫随到",
      description:
        "私人侍酒师、游艇船长、衣橱顾问与危机处理团队在新西兰全境待命，15 分钟内响应你的任何愿望。",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "奢华生活管家团队",
      layout: "spotlight",
      cta: "button",
      button: { label: "解锁奢华管家", to: "/discover?category=professional" },
      badges: [
        {
          id: "badge-luxe-team-zh",
          type: "info",
          title: "生活设计师",
          subtitle: "六星级管家团队",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-zh",
          type: "info",
          title: "15 分钟响应",
          subtitle: "覆盖全新西兰",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "download-app",
      kicker: "Guidew App",
      title: "一键下载，",
      highlight: "把灵感变成行程",
      description:
        "随时呼叫奥克兰和惠灵顿的本地专家、舞蹈导师、语言伙伴或救援团队。App 支持 AI 匹配、VIP 免佣与行程管理。",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "下载 Guidew 应用",
      layout: "reverse",
      cta: "button",
      button: { label: "立即下载 APP", to: "/download" },
      badges: [
        { id: "badge-app", type: "info", title: "iOS & Android", subtitle: "扫码即刻安装", position: "-left-3 top-1/4", delay: "0.5s" },
        { id: "badge-vip", type: "info", title: "VIP 免佣", subtitle: "AI 行程助手", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "每月 9.9 美元，",
      highlight: "解锁 AI 管家",
      description:
        "VIP 用户免 15% 平台佣金，直接用多语言 AI 描述需求并获得优先匹配；服务者可启用自动接单与 AI 行程规划，奥克兰和惠灵顿同步开放。",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "VIP 会员与 AI 规划师沟通",
      layout: "immersive",
      cta: "button",
      button: { label: "加入 VIP", to: "/vip" },
      badges: [
        {
          id: "badge-vip-fee-zh",
          type: "info",
          title: "免 15% 佣金",
          subtitle: "VIP 专享",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-zh",
          type: "info",
          title: "AI 管家",
          subtitle: "优先匹配",
          position: "right-6 bottom-10",
          delay: "2s"
        }
      ]
    },
    {
      id: "creator-network",
      kicker: "成为 Guidew 专家",
      title: "设计你的工作节奏，",
      highlight: "加入全球创作者网络",
      description: "提供舞蹈教学、翻译陪同或城市陪游等技能，享受高佣金与 AI 工具管理订单。",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "创作者计划行程",
      layout: "default",
      cta: "button",
      button: { label: "开始打造", to: "/become-expert" },
      badges: [
        { id: "badge-impact", type: "info", title: "1000+ Creators", subtitle: "2026 全球网络", position: "-left-6 top-1/3", delay: "0.5s" },
        { id: "badge-earning", type: "info", title: "高佣金回报", subtitle: "透明结算", position: "right-2 bottom-1/3", delay: "2s" }
      ]
    },
    {
      id: "dance-school-finder",
      kicker: "语言教练雷达",
      title: "寻找全新西兰最好的",
      highlight: "语言老师",
      description:
        "沉浸式卡片对比课程风格、口音、考试战绩与录取名额，双语顾问 60 秒内帮你锁定一对一试听。",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "学员在阳光照射的教室里练习语言",
      layout: "editorial",
      cta: "button",
      button: { label: "预约语言导师", to: "/discover?category=language&tag=coaches" },
      badges: [
        { id: "badge-trial-zh", type: "info", title: "48 小时内锁档", subtitle: "专属试听保留", position: "-left-6 top-6", delay: "0.3s" },
        { id: "badge-genres-zh", type: "info", title: "雅思 · 商务 · 生存口语", subtitle: "30+ 认证导师", position: "right-6 bottom-8", delay: "2s" }
      ]
    },
    {
      id: "global-dance",
      kicker: "冠军导师随叫随到",
      title: "把世界冠军请到你家，",
      highlight: "两小时掌握 Kiwi 风味 Bachata",
      description: "从波西米亚屋顶到奥克兰海港，冠军导师手把手教舞，还帮你提升舞台表现与社交自信。",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "舞者随导师练习",
      layout: "spotlight",
      cta: "button",
      button: { label: "预约冠军导师", to: "/discover?category=dance" },
      badges: [
        { id: "badge-stars", type: "info", title: "世界冠军", subtitle: "Bachata 导师团", position: "-left-4 top-1/4", delay: "0.3s" },
        { id: "badge-sessions", type: "info", title: "每周 40+ 私教", subtitle: "奥克兰·惠灵顿", position: "right-4 bottom-1/3", delay: "2s" }
      ]
    }
  ],
  he: [
    {
      id: "local-expertise",
      kicker: "מומחים מקומיים",
      title: "חיבורים מקומיים,",
      highlight: "בכל רגע",
      description:
        "הזמינו מדריכים, מתורגמנים ומאמני מיומנויות מאומתים לטיולים, חירום או רגעי פינוק—הכול מתוך אפליקציה אחת.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "מדריכה מקומית מובילה אורחים בעיר",
      layout: "default",
      cta: "search",
      badges: [
        { id: "badge-location-he", type: "location", position: "-left-4 top-1/4", delay: "0s" },
        { id: "badge-community-he", type: "community", position: "right-4 bottom-1/4", delay: "2s" }
      ]
    },
    {
      id: "elite-advisors",
      kicker: "לשכת יועצים גלובלית",
      title: "צוות מומחים על,",
      highlight: "לוח אישי משלכם",
      description:
        "פתחו סשנים אסטרטגיים עם מאמני מנהלים, משקיעים ו-Fixers מקומיים שמצטרפים לשיחה תוך דקות ספורות.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "צוות יועצים בפגישה מקוונת",
      layout: "reverse",
      cta: "button",
      button: { label: "הזמינו יועץ פרטי", to: "/discover?category=business" },
      badges: [
        {
          id: "badge-board-he",
          type: "info",
          title: "אסטרטגיה • תרבות • משפט",
          subtitle: "מנטורים נבחרים",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-he",
          type: "info",
          title: "תגובה תוך 30 דק׳",
          subtitle: "24/7 בכל אזור זמן",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "concierge-luxury",
      kicker: "קונסיירז' יוקרתי",
      title: "חיו כמו מיליארדרים,",
      highlight: "כשמומחים בכוננות",
      description:
        "סומלייה אישי, קפטן יאכטה, סטייליסטים וצוותי חירום מתזמנים כל פרט ברחבי ניו זילנד תוך 15 דקות מרגע הקריאה.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "צוות קונסיירז' מתכנן חוויות",
      layout: "spotlight",
      cta: "button",
      button: { label: "פתחו קונסיירז' VIP", to: "/discover?category=professional" },
      badges: [
        {
          id: "badge-luxe-team-he",
          type: "info",
          title: "אדריכלי לייף-סטייל",
          subtitle: "שירות 6 כוכבים",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-he",
          type: "info",
          title: "תגובה תוך 15 דק׳",
          subtitle: "כיסוי בכל ניו זילנד",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "download-app",
      kicker: "Guidew App",
      title: "הורידו את Guidew,",
      highlight: "והפכו רגעים לקסם",
      description:
        "הזמינו מומחים מאוקלנד או וולינגטון—מאמני ריקוד, שותפי תרגום או צוותי חירום—עם התאמות AI והטבות VIP.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "משתמשת מורידה את אפליקציית Guidew",
      layout: "reverse",
      cta: "button",
      button: { label: "הורידו את האפליקציה", to: "/download" },
      badges: [
        {
          id: "badge-app-he",
          type: "info",
          title: "iOS ו‑Android",
          subtitle: "סרקו להתקנה",
          position: "-left-3 top-1/4",
          delay: "0.5s"
        },
        {
          id: "badge-vip-he",
          type: "info",
          title: "הטבות VIP",
          subtitle: "עוזר AI למסלולים",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "vip-membership",
      kicker: "Guidew VIP",
      title: "9.9 דולר לחודש,",
      highlight: "AI קונסיירז' אישי",
      description:
        "חברי VIP מדלגים על עמלת ה‑15%, מתארים צרכים בשפה טבעית ומקבלים התאמה מיידית; ספקים מפעילים Auto-Accept וכלי AI למסלולים.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "חברי VIP משוחחים עם עוזר AI",
      layout: "immersive",
      cta: "button",
      button: { label: "הצטרפו ל‑VIP", to: "/vip" },
      badges: [
        {
          id: "badge-vip-fee-he",
          type: "info",
          title: "ללא עמלת 15%",
          subtitle: "בלעדי לחברי VIP",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-he",
          type: "info",
          title: "AI Concierge",
          subtitle: "התאמה מיידית",
          position: "right-6 bottom-10",
          delay: "2s"
        }
      ]
    },
    {
      id: "creator-network",
      kicker: "הפכו למומחי Guidew",
      title: "בנו את הקריירה שלכם,",
      highlight: "הצטרפו ליוצרי העבודה",
      description:
        "קבעו את לוח הזמנים שלכם, הציעו שיעורי ריקוד, תרגום או ליווי עירוני ותיהנו מתשלומים שקופים ואוטומציה של AI.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "יוצרת מתכננת מסלולים במחשב",
      layout: "default",
      cta: "button",
      button: { label: "התחילו לבנות", to: "/become-expert" },
      badges: [
        {
          id: "badge-impact-he",
          type: "info",
          title: "1000+ יוצרים",
          subtitle: "רשת עולמית עד 2026",
          position: "-left-6 top-1/3",
          delay: "0.5s"
        },
        {
          id: "badge-earning-he",
          type: "info",
          title: "עמלות הוגנות",
          subtitle: "תשלומים שקופים",
          position: "right-2 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "dance-school-finder",
      kicker: "רדאר מאמני שפה",
      title: "מצאו את מאמני השפה הטובים",
      highlight: "בניו זילנד",
      description:
        "השוו מנטורים דו-לשוניים, מעבדות אימרסיביות ומאמני בחינות. האזינו לדוגמיות קול והזמינו שיעור ניסיון תוך 60 שניות.",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "תלמידים מתרגלים בכיתה מוארת",
      layout: "editorial",
      cta: "button",
      button: { label: "שריינו מנטור לשפה", to: "/discover?category=language&tag=coaches" },
      badges: [
        {
          id: "badge-trial-he",
          type: "info",
          title: "הצעה מובטחת ב‑48 ש׳",
          subtitle: "שיעור ניסיון אישי",
          position: "-left-6 top-6",
          delay: "0.3s"
        },
        {
          id: "badge-genres-he",
          type: "info",
          title: "IELTS • עסקים • הישרדות",
          subtitle: "30+ מאמנים מקצועיים",
          position: "right-6 bottom-8",
          delay: "2s"
        }
      ]
    },
    {
      id: "global-dance",
      kicker: "אגדות הריקוד זמינות",
      title: "הזמינו אלופי עולם,",
      highlight: "ותשלימו Bachata בניחוח ניו זילנדי",
      description:
        "מהגגות הבוהמיים ועד נמל אוקלנד—אלופים מגיעים עד הבית, מלמדים צעד אחר צעד ומחזקים ביטחון לבמה ולחיי הלילה.",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "זוג מתאמן עם מאמן Bachata",
      layout: "spotlight",
      cta: "button",
      button: { label: "הזמינו מאמן אלוף", to: "/discover?category=dance" },
      badges: [
        {
          id: "badge-stars-he",
          type: "info",
          title: "אלופי עולם",
          subtitle: "צוות Bachata",
          position: "-left-4 top-1/4",
          delay: "0.3s"
        },
        {
          id: "badge-sessions-he",
          type: "info",
          title: "40+ שיעורים פרטיים",
          subtitle: "אוקלנד & וולינגטון",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    }
  ],

  mi: [
    {
      id: "tohungatanga-rohe",
      kicker: "Nga tohunga o te rohe",
      title: "Te tohungatanga o te rohe,",
      highlight: "I runga i te tono",
      description:
        "Tūhono me te hunga e whakawhirinaki ana mo nga haerenga taone, whakamaoritanga, he pukenga pukenga-katoa mai i te taupānga kotahi.",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Tūruhi tohunga i te rohe",
      layout: "default",
      cta: "search",
      badges: [
        {
          id: "badge-location-mi",
          type: "location",
          position: "-left-4 top-1/4",
          delay: "0s"
        },
        {
          id: "badge-community-mi",
          type: "community",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "elite-advisors-mi",
      kicker: "Tohutohu a te Ao",
      title: "Tohunga puta noa i te ao,",
      highlight: "To poari whaiaro",
      description:
        "Hurihia te rautaki, te ahurea, me te tipu me nga kaiwhakaako rangatira, nga kaitohutohu VC, me nga fixers o te rohe ka uru atu ki to waea i roto i nga meneti.",
      image:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Huihuinga Kaitohutohu me nga kiritaki",
      layout: "reverse",
      cta: "button",
      button: {
        label: "Pukapuka he kaitohutohu tūmataiti",
        to: "/discover?category=business"
      },
      badges: [
        {
          id: "badge-board-mi",
          type: "info",
          title: "Rautaki • Ahurea • Ture",
          subtitle: "Kaitohutohu kua kōwhiria",
          position: "-left-5 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-response-mi",
          type: "info",
          title: "30 meneti te whakautu",
          subtitle: "24/7 ā-ao",
          position: "right-3 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "hangahanga-papai",
      kicker: "Ko te concierge elite",
      title: "Ora rite he piriona,",
      highlight: "Nga tohunga e tū ana",
      description:
        "Ka whakaritehia e ngā sommeliers, ngā kaipupuri poti, ngā kaihoahoa kākahu, me ngā kaitapa raruraru ngā taipitopito katoa puta noa i Aotearoa i roto i ngā meneti.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Nga wheako whakamahere a nga roopu papai",
      layout: "spotlight",
      cta: "button",
      button: {
        label: "Wewete i te concierge VIP",
        to: "/discover?category=professional"
      },
      badges: [
        {
          id: "badge-luxe-team-mi",
          type: "info",
          title: "Kaihoahoa oranga",
          subtitle: "Concierge 6-whetu",
          position: "-left-6 top-1/3",
          delay: "0.4s"
        },
        {
          id: "badge-luxe-response-mi",
          type: "info",
          title: "15 meneti te whakautu",
          subtitle: "Kapinga ā-motu",
          position: "right-4 bottom-1/4",
          delay: "2s"
        }
      ]
    },
    {
      id: "tango-taupanga",
      kicker: "Guidew App",
      title: "Huri i ngā wā",
      highlight: "Hei mākutu ā-rohe",
      description:
        "Tikiake i te Guidew ka karanga tonu ki ngā tohunga o Tāmaki, o Te Whanganui-a-Tara hoki—kaiako kanikani, hoa reo, kapa āwhina rānei me te tautoko AI me te VIP.",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Tikiake i te taupānga Guidew",
      layout: "reverse",
      cta: "button",
      button: {
        label: "Tangohia te taupānga",
        to: "/download"
      },
      badges: [
        {
          id: "badge-app-mi",
          type: "info",
          title: "iOS & Android",
          subtitle: "Karapa hei tāuta",
          position: "-left-3 top-1/4",
          delay: "0.5s"
        },
        {
          id: "badge-vip-mi",
          type: "info",
          title: "Painga VIP",
          subtitle: "Kaiāwhina mahere AI",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "vip-membership-mi",
      kicker: "Guidew VIP",
      title: "9.9 USD ia marama,",
      highlight: "Wewete i te concierge AI",
      description:
        "Whakakore i te 15% utu, kōrerohia ō hiahia ki te AI, ka pai ki te ōrite matua me ngā taputapu auto-accept mō ngā kaiwhakarato i Tāmaki me Pōneke.",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Ko nga mema VIP e whakamahere ana me te AI",
      layout: "immersive",
      cta: "button",
      button: {
        label: "Whakauru atu ki te VIP",
        to: "/vip"
      },
      badges: [
        {
          id: "badge-vip-fee-mi",
          type: "info",
          title: "Kāore he 15% utu",
          subtitle: "Toro vip-anake",
          position: "left-6 top-6",
          delay: "0.4s"
        },
        {
          id: "badge-vip-ai-mi",
          type: "info",
          title: "Kaiāwhina AI",
          subtitle: "Whakawhanaunga matua",
          position: "right-6 bottom-10",
          delay: "2s"
        }
      ]
    },
    {
      id: "kaihanga-whatunga",
      kicker: "Riro hei tohunga Guidew",
      title: "Hangaia tāu ake mahi,",
      highlight: "Hono ki te 1000+ kaihanga",
      description:
        "Hoahoa tō maramataka, tuku akoranga kanikani, whakamaoritanga, hoa taone rānei. Whiwhi utu nui ake, ka whakamahi i ngā taputapu AI hei whakahaere ota.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Kaihanga e whakamahere ana i ngā ara i runga rorohiko",
      layout: "default",
      cta: "button",
      button: {
        label: "Tīmata te hanga",
        to: "/become-expert"
      },
      badges: [
        {
          id: "badge-impact-mi",
          type: "info",
          title: "1000+ kaihanga",
          subtitle: "Rōpū ao i te 2026",
          position: "-left-6 top-1/3",
          delay: "0.5s"
        },
        {
          id: "badge-earning-mi",
          type: "info",
          title: "Kōmihana teitei",
          subtitle: "Utu haumaru",
          position: "-2 bottom-1/3",
          delay: "2s"
        }
      ]
    },
    {
      id: "kanikani-kura-rapu",
      kicker: "Te Kaiwhakaako Reo",
      title: "Rapua ngā kaiwhakaako o Aotearoa",
      highlight: "Ko ngā kaiako reo pai",
      description:
        "Whakatauritea ngā kaiwhakaako reorua, ngā awheawhe rumaki, me ngā kaitohutohu whakamātautau. Tirohia he tauira reo, ka whakarite hui i te 60 hēkona.",
      image:
        "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Ka whakamahia e ngā akonga ngā pūkenga reo i te awheawhe",
      layout: "editorial",
      cta: "button",
      button: {
        label: "Tonoa he kaiwhakaako reo",
        to: "/discover?category=language&tag=coaches"
      },
      badges: [
        {
          id: "badge-trial-mi",
          type: "info",
          title: "48h tūnga",
          subtitle: "Whakamātautau kua whakamanahia",
          position: "-left-6 top-6",
          delay: "0.3s"
        },
        {
          id: "badge-genres-mi",
          type: "info",
          title: "IELTS • Pakihi • Oranga",
          subtitle: "30+ kaitautoko",
          position: "right-6 bottom-8",
          delay: "2s"
        }
      ]
    },
    {
      id: "global-dance-mi",
      kicker: "Ko ngā pūrākau kanikani i te karanga",
      title: "A ani manihini i te ao,",
      highlight: "Nga kaiako Bachata i NZ",
      description:
        "Mai i ngā tuanui Bohemian ki te whanga o Tāmaki, ka rere mātou i ngā toa ki tō tatau. Ako i te Bachata i roto i ngā haora e rua me te māia ki te atamira.",
      image:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=2070&q=80",
      imageAlt: "Kanikani e mahi ana i te bachata me te kaiako",
      layout: "spotlight",
      cta: "button",
      button: {
        label: "Pukapuka he kaiako toa",
        to: "/discover?category=dance"
      },
      badges: [
        {
          id: "badge-stars-mi",
          type: "info",
          title: "Toa o te ao",
          subtitle: "Kaiako Bachata",
          position: "-left-4 top-1/4",
          delay: "0.3s"
        },
        {
          id: "badge-sessions-mi",
          type: "info",
          title: "40+ huihuinga tūmataiti",
          subtitle: "Tāmaki & Pōneke",
          position: "right-4 bottom-1/3",
          delay: "2s"
        }
      ]
    }
  ],
};

const badgeCopy: Partial<
  Record<
    SupportedLocale,
    {
      locationTitle: string;
      locationDistance: string;
      communityTitle: string;
      communitySubtitle: string;
    }
  >
> = {
  en: {
    locationTitle: "Local Expert",
    locationDistance: "5 min away",
    communityTitle: "500+ Experts",
    communitySubtitle: "In your area"
  },
  es: {
    locationTitle: "Experto local",
    locationDistance: "A 5 min",
    communityTitle: "500+ expertos",
    communitySubtitle: "Cerca de ti"
  },
  pt: {
    locationTitle: "Especialista local",
    locationDistance: "A 5 min",
    communityTitle: "500+ especialistas",
    communitySubtitle: "Perto de você"
  },
  zh: {
    locationTitle: "附近专家",
    locationDistance: "5 分钟可达",
    communityTitle: "500+ 服务者",
    communitySubtitle: "就在你身边"
  },
  fr: {
    locationTitle: "Expert à proximité",
    locationDistance: "à 5 min",
    communityTitle: "500+ experts",
    communitySubtitle: "Près de chez vous"
  },
  he: {
    locationTitle: "מומחה קרוב",
    locationDistance: "5 דק׳ ממך",
    communityTitle: "500+ מומחים",
    communitySubtitle: "בדיוק באזור שלך"
  },

  mi: {
    locationTitle: "Tohunga whenua",
    locationDistance: "5 meneti",
    communityTitle: "500+ tohunga",
    communitySubtitle: "I to rohe"
  },
};

const searchCopy: Partial<
  Record<
    SupportedLocale,
    {
      placeholder: string;
      button: string;
      slideLabel: string;
    }
  >
> = {
  en: {
    placeholder: "Where are you going?",
    button: "Search",
    slideLabel: "Go to slide"
  },
  es: {
    placeholder: "¿A dónde viajas?",
    button: "Buscar",
    slideLabel: "Ir al slide"
  },
  pt: {
    placeholder: "Para onde você vai?",
    button: "Buscar",
    slideLabel: "Ir para o slide"
  },
  zh: {
    placeholder: "想去哪里？",
    button: "搜索",
    slideLabel: "跳转到幻灯片"
  },
  fr: {
    placeholder: "Où partez-vous ?",
    button: "Rechercher",
    slideLabel: "Aller à la diapositive"
  },
  he: {
    placeholder: "לאן תרצו להגיע?",
    button: "חיפוש",
    slideLabel: "מעבר לשקופית"
  },

  mi: {
    placeholder: "Kei hea koe?",
    button: "Rapu",
    slideLabel: "Haere ki te Kiriata"
  },
};

type LayoutConfig = {
  container: string;
  contentWrapper: string;
  bodyCopy: string;
  ctaWrapper: string;
  imageWrapper: string;
  imageFrame: string;
  imageClass: string;
  imageGlow?: string;
};

const heroLayoutStyles: Record<HeroSlideLayout, LayoutConfig> = {
  default: {
    container: "flex w-full flex-col gap-10 justify-center lg:flex-row",
    contentWrapper: "lg:w-1/2 text-center lg:text-left items-center lg:items-start mb-6 lg:mb-0",
    bodyCopy: "max-w-xl mx-auto lg:mx-0",
    ctaWrapper: "max-w-md mx-auto lg:mx-0",
    imageWrapper: "lg:w-1/2 lg:justify-end",
    imageFrame: "w-full max-w-md sm:max-w-lg",
    imageClass: "w-full rounded-xl shadow-xl h-[230px] sm:h-[320px] lg:h-[380px] object-cover"
  },
  reverse: {
    container: "flex w-full flex-col gap-10 justify-center lg:flex-row-reverse",
    contentWrapper: "lg:w-1/2 text-center lg:text-right items-center lg:items-end mb-6 lg:mb-0",
    bodyCopy: "max-w-xl mx-auto lg:mx-0 lg:ml-auto",
    ctaWrapper: "max-w-md mx-auto lg:mx-0 lg:ml-auto",
    imageWrapper: "lg:w-1/2 lg:justify-start",
    imageFrame: "w-full max-w-md sm:max-w-lg",
    imageClass: "w-full rounded-[32px] shadow-2xl h-[230px] sm:h-[320px] lg:h-[390px] object-cover",
    imageGlow:
      "-inset-6 -z-10 bg-gradient-to-br from-brand-orange/30 via-brand-teal/20 to-brand-darkBlue/30 opacity-70 blur-3xl rounded-[40px]"
  },
  spotlight: {
    container: "grid w-full grid-cols-1 gap-10 items-center lg:grid-cols-[0.65fr_0.35fr] lg:gap-16",
    contentWrapper:
      "order-1 w-full rounded-2xl border border-white/60 bg-white/90 backdrop-blur px-6 py-8 sm:px-8 sm:py-10 text-left items-start shadow-2xl",
    bodyCopy: "max-w-2xl",
    ctaWrapper: "max-w-sm w-full",
    imageWrapper: "order-2 lg:order-2",
    imageFrame: "w-full max-w-md sm:max-w-xl",
    imageClass: "w-full rounded-[36px] shadow-2xl h-[230px] sm:h-[320px] lg:h-[420px] object-cover",
    imageGlow:
      "-inset-8 -z-10 bg-gradient-to-br from-brand-darkBlue/30 via-brand-teal/40 to-brand-orange/30 opacity-80 blur-3xl rounded-[48px]"
  },
  immersive: {
    container: "relative w-full min-h-[420px] md:min-h-[520px] flex items-center justify-center",
    contentWrapper:
      "relative z-10 w-full max-w-3xl text-center items-center rounded-[36px] border border-white/60 bg-white/90 px-6 py-10 sm:px-10 sm:py-12 backdrop-blur shadow-[0_45px_140px_rgba(15,23,42,0.35)]",
    bodyCopy: "max-w-2xl mx-auto",
    ctaWrapper: "w-full max-w-md mx-auto",
    imageWrapper: "absolute inset-0",
    imageFrame: "w-full h-full",
    imageClass:
      "w-full h-full rounded-[48px] object-cover opacity-90 max-h-[520px] sm:max-h-none",
    imageGlow:
      "-inset-4 rounded-[50px] bg-gradient-to-r from-brand-darkBlue/60 via-brand-teal/40 to-brand-orange/40 mix-blend-multiply"
  },
  editorial: {
    container: "grid w-full grid-cols-1 gap-10 items-center lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch",
    contentWrapper:
      "order-1 items-start text-left rounded-[36px] border border-white/50 bg-gradient-to-br from-brand-darkBlue via-brand-teal/80 to-brand-orange/60 text-white px-6 py-8 sm:px-10 sm:py-12 shadow-[0_35px_120px_rgba(15,23,42,0.4)]",
    bodyCopy: "text-white/90",
    ctaWrapper: "w-full",
    imageWrapper: "order-2 lg:order-2",
    imageFrame: "w-full h-full max-w-md sm:max-w-none",
    imageClass:
      "w-full h-[230px] sm:h-[340px] lg:h-full object-cover rounded-[42px] border border-white/30 shadow-2xl",
    imageGlow: "-inset-6 rounded-[48px] bg-brand-orange/30 blur-3xl"
  }
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const { openDownloadDialog } = useDownloadDialog();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const slides = useMemo(() => pickLocaleValue(heroSlides, locale), [locale]);
  const isRtl = locale === "he";
  const hasMultipleSlides = slides.length > 1;
  const extendedSlides = useMemo(() => {
    if (!slides.length) {
      return [];
    }
    if (!hasMultipleSlides) {
      return slides;
    }
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];
    return [lastSlide, ...slides, firstSlide];
  }, [slides, hasMultipleSlides]);
  const copy = pickLocaleValue(searchCopy, locale);
  const badges = pickLocaleValue(badgeCopy, locale);

  useEffect(() => {
    setCurrentSlide(0);
    setCarouselIndex(slides.length > 1 ? 1 : 0);
  }, [slides]);

  useEffect(() => {
    if (!hasMultipleSlides) {
      return;
    }
    const timer = setInterval(() => {
      setCarouselIndex(prev => prev + 1);
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [hasMultipleSlides, slides.length]);

  useEffect(() => {
    if (isTransitionEnabled) {
      return;
    }
    const frame = requestAnimationFrame(() => setIsTransitionEnabled(true));
    return () => cancelAnimationFrame(frame);
  }, [isTransitionEnabled]);

  const contentBaseClass =
    "w-full transition-all duration-500 min-h-[320px] flex flex-col justify-center";
  const imageBaseClass = "w-full transition-all duration-500 flex justify-center";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/discover");
  };

  const handleButtonCta = (slide: HeroSlide) => {
    // download slide marker
    if (slide.button?.to === "/download") {
      openDownloadDialog();
      return;
    }
    if (slide.button) {
      navigate(slide.button.to);
    }
  };

  const handleDotClick = (index: number) => {
    if (index === currentSlide) {
      return;
    }
    setCurrentSlide(index);
    if (hasMultipleSlides) {
      setCarouselIndex(index + 1);
    }
  };

  useEffect(() => {
    if (!hasMultipleSlides) {
      return;
    }
    if (carouselIndex === 0) {
      const frame = requestAnimationFrame(() => {
        setIsTransitionEnabled(false);
        setCarouselIndex(slides.length);
      });
      return () => cancelAnimationFrame(frame);
    }
    if (carouselIndex === slides.length + 1) {
      const frame = requestAnimationFrame(() => {
        setIsTransitionEnabled(false);
        setCarouselIndex(1);
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [carouselIndex, hasMultipleSlides, slides.length]);

  const renderBadgeContent = (badge: HeroBadge) => {
    switch (badge.type) {
      case "location":
        return (
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full">
              <MapPin className="h-4 w-4 text-green-600" />
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium">{badges.locationTitle}</p>
              <p className="text-xs text-gray-500">{badges.locationDistance}</p>
            </div>
          </div>
        );
      case "community":
        return (
          <div className="flex items-center">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-white h-6 w-6">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-white h-6 w-6">
                <AvatarFallback>ST</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-2">
              <p className="text-xs font-medium">{badges.communityTitle}</p>
              <p className="text-xs text-gray-500">{badges.communitySubtitle}</p>
            </div>
          </div>
        );
      case "info":
        return (
          <div className="flex items-center">
            <div className="bg-brand-teal/10 p-2 rounded-full">
              <Briefcase className="h-4 w-4 text-brand-teal" />
            </div>
            <div className="ml-2">
              <p className="text-xs font-semibold text-brand-darkBlue">{badge.title}</p>
              <p className="text-xs text-gray-500">{badge.subtitle}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-lightGray to-white -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="w-full pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="relative overflow-hidden">
          <div
            className={`flex ${isTransitionEnabled ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            dir="ltr"
          >
            {extendedSlides.map((slide, index) => {
              const slideLayout = heroLayoutStyles[slide.layout ?? "default"];
              return (
                <div key={`${slide.id}-${index}`} className="basis-full shrink-0">
                  <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className={`${slideLayout.container} items-center py-6 md:min-h-[520px] md:py-0`}>
                      {/* Hero content */}
                      <div className={`${contentBaseClass} ${slideLayout.contentWrapper}`} dir={isRtl ? "rtl" : "ltr"}>
                        <p className="uppercase tracking-[0.4em] text-sm text-brand-teal mb-4">{slide.kicker}</p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                          {slide.title}
                          <br />
                          <span className="gradient-text">{slide.highlight}</span>
                        </h1>
                        <p className={`text-lg md:text-xl text-gray-600 mb-8 ${slideLayout.bodyCopy}`}>
                          {slide.description}
                        </p>
                        
                        {slide.cta === "search" ? (
                          <form
                            onSubmit={handleSearch}
                            className={`flex w-full flex-col sm:flex-row gap-3 ${slideLayout.ctaWrapper}`}
                          >
                            <div className="relative flex-grow">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                placeholder={copy.placeholder}
                                className="pl-10 bg-white border-gray-200 focus-visible:ring-brand-teal h-12"
                              />
                            </div>
                            <Button type="submit" className="bg-brand-teal hover:bg-brand-teal/90 h-12">
                              <Search className="mr-2 h-4 w-4" /> {copy.button}
                            </Button>
                          </form>
                        ) : (
                          <div className={`flex w-full flex-col sm:flex-row gap-3 ${slideLayout.ctaWrapper}`}>
                            <Button className="h-12 bg-brand-teal hover:bg-brand-teal/90 text-base" onClick={() => handleButtonCta(slide)}>
                              {slide.button?.label}
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Hero image */}
                      <div className={`${imageBaseClass} ${slideLayout.imageWrapper}`}>
                        <div className={`relative ${slideLayout.imageFrame}`}>
                          {slideLayout.imageGlow && (
                            <div className={`absolute ${slideLayout.imageGlow}`}></div>
                          )}
                          <img
                            src={slide.image}
                            alt={slide.imageAlt}
                            className={`${slideLayout.imageClass} animate-float`}
                          />
                          
                          {/* Floating badges */}
                          {slide.badges.map(badge => (
                            <div
                              key={`${slide.id}-${badge.id}`}
                              className={`absolute ${badge.position} bg-white p-3 rounded-lg shadow-lg animate-float`}
                              style={{ animationDelay: badge.delay }}
                            >
                              {renderBadgeContent(badge)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-2 mt-12">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                aria-label={`${copy.slideLabel} ${index + 1}`}
                onClick={() => handleDotClick(index)}
                className={`h-2 w-10 rounded-full transition ${
                  index === currentSlide ? "bg-brand-teal" : "bg-gray-200 hover:bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default HeroSection;
