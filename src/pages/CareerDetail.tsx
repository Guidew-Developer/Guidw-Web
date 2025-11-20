import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCareerOpenings } from "@/constants/siteContent";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const careerLocales = ["en", "zh", "pt", "es", "fr", "he"] as const;
type CareerLocale = (typeof careerLocales)[number];

const copy: Record<CareerLocale, {
  badge: string;
  notFound: {
    badge: string;
    title: string;
    description: string;
    cta: string;
  };
  listCta: string;
  roleBadge: string;
  responsibilities: string;
  requirements: string;
  perks: string;
  ctaTitle: string;
  ctaDescription: string;
}> = {
  en: {
    badge: "Guidew Careers",
    notFound: {
      badge: "Guidew Careers",
      title: "Role no longer available",
      description: "New opportunities go live frequently—keep an eye on our careers page.",
      cta: "Back to Careers"
    },
    listCta: "See all roles",
    roleBadge: "Open role",
    responsibilities: "Responsibilities",
    requirements: "Requirements",
    perks: "What you gain",
    ctaTitle: "Ready to join Guidew?",
    ctaDescription: "Send your portfolio or resume to careers@guidew.app and tell us why you're a match."
  },
  zh: {
    badge: "Guidew 招聘",
    notFound: {
      badge: "Guidew 招聘",
      title: "职位已关闭",
      description: "请关注我们的招聘页面，第一时间获取最新机会。",
      cta: "返回 Careers"
    },
    listCta: "查看所有职位",
    roleBadge: "Open Role",
    responsibilities: "岗位职责",
    requirements: "任职资格",
    perks: "你将获得",
    ctaTitle: "准备加入 Guidew？",
    ctaDescription: "发送作品集或简历至 careers@guidew.app，并说明你为什么适合这个角色。"
  },
  pt: {
    badge: "Carreiras Guidew",
    notFound: {
      badge: "Carreiras Guidew",
      title: "Vaga encerrada",
      description: "Novas posições aparecem com frequência. Acompanhe nossa página de carreiras.",
      cta: "Voltar para Careers"
    },
    listCta: "Ver todas as vagas",
    roleBadge: "Vaga aberta",
    responsibilities: "Responsabilidades",
    requirements: "Requisitos",
    perks: "O que você recebe",
    ctaTitle: "Pronto para entrar na Guidew?",
    ctaDescription: "Envie portfólio ou currículo para careers@guidew.app e conte por que você é a pessoa certa."
  },
  es: {
    badge: "Carreras Guidew",
    notFound: {
      badge: "Carreras Guidew",
      title: "Vacante no disponible",
      description: "Consulta nuestra página de carreras para enterarte cuando abramos nuevas oportunidades.",
      cta: "Volver a Careers"
    },
    listCta: "Ver todas las vacantes",
    roleBadge: "Rol abierto",
    responsibilities: "Responsabilidades",
    requirements: "Requisitos",
    perks: "Lo que obtendrás",
    ctaTitle: "¿Listo para unirte a Guidew?",
    ctaDescription: "Envía portafolio o CV a careers@guidew.app y cuéntanos por qué encajas en el equipo."
  },
  fr: {
    badge: "Carrières Guidew",
    notFound: {
      badge: "Carrières Guidew",
      title: "Poste fermé",
      description: "Restez connecté à notre page carrières pour découvrir les nouvelles opportunités.",
      cta: "Retourner à Careers"
    },
    listCta: "Voir tous les postes",
    roleBadge: "Poste ouvert",
    responsibilities: "Responsabilités",
    requirements: "Profil recherché",
    perks: "Ce que vous obtenez",
    ctaTitle: "Prêt à rejoindre Guidew ?",
    ctaDescription: "Envoyez votre portfolio ou CV à careers@guidew.app et expliquez-nous pourquoi vous êtes la personne idéale."
  },
  he: {
    badge: "קריירה ב‑Guidew",
    notFound: {
      badge: "קריירה ב‑Guidew",
      title: "התפקיד נסגר",
      description: "עקבו אחר עמוד הקריירות כדי לקבל עדכונים על משרות חדשות.",
      cta: "חזרה ל‑Careers"
    },
    listCta: "לכל המשרות",
    roleBadge: "תפקיד פתוח",
    responsibilities: "תחומי אחריות",
    requirements: "דרישות",
    perks: "מה תרוויחו",
    ctaTitle: "מוכנים להצטרף ל‑Guidew?",
    ctaDescription: "שלחו קורות חיים או תיק עבודות ל‑careers@guidew.app וספרו לנו מדוע אתם התאמה מושלמת."
  }
};

const CareerDetail = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const localeKey = (careerLocales.includes(locale as CareerLocale) ? (locale as CareerLocale) : "en");
  const content = copy[localeKey];
  const openings = useMemo(() => getCareerOpenings(i18n.language), [i18n.language]);
  const role = useMemo(() => openings.find(item => item.id === roleId), [openings, roleId]);

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-lightGray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <p className="text-sm text-brand-teal uppercase tracking-[0.3em] mb-4">{content.notFound.badge}</p>
            <h1 className="text-3xl font-bold text-brand-darkBlue mb-3">{content.notFound.title}</h1>
            <p className="text-gray-600 mb-6">{content.notFound.description}</p>
            <Link to="/careers" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-teal text-white">
              <ArrowLeft className="h-4 w-4" />
              {content.notFound.cta}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-lightGray">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/careers" className="inline-flex items-center text-sm text-brand-teal mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {content.listCta}
            </Link>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-teal mb-4">{content.roleBadge}</p>
            <h1 className="text-4xl font-bold text-brand-darkBlue mb-3">{role.title}</h1>
            <p className="text-gray-500 mb-6">{role.location}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {role.tags.map(tag => (
                <span key={tag} className="text-xs uppercase tracking-wide px-3 py-1 rounded-full bg-brand-lightGray text-brand-teal border border-brand-teal/30">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-lg text-gray-600">{role.description}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{content.responsibilities}</h2>
              <ul className="space-y-3 text-gray-600">
                {role.responsibilities.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{content.requirements}</h2>
              <ul className="space-y-3 text-gray-600">
                {role.requirements.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-teal mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{content.perks}</h2>
            <div className="flex flex-wrap gap-3">
              {role.perks.map(perk => (
                <span key={perk} className="px-4 py-2 rounded-full bg-brand-lightGray text-brand-darkBlue text-sm">
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4">{content.ctaTitle}</h2>
            <p className="text-white/90 mb-6">{content.ctaDescription}</p>
            <a href="mailto:careers@guidew.app" className="px-6 py-3 rounded-full bg-white text-brand-teal font-semibold">
              careers@guidew.app
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareerDetail;
