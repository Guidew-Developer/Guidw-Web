import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCityProfiles } from "@/constants/siteContent";
import { ArrowLeft, MapPinned, Route } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const copy = {
  en: {
    missingTitle: "City not launched",
    missingDescription: "We are expanding to more destinations soon.",
    back: "Back to Locations",
    allCities: "All cities",
    why: "Why travelers choose this city",
    logistics: "Operational highlights",
    ctaTitle: (name: string) => `Ready to experience ${name}?`,
    ctaDescription: "Send a request in the Guidew app or join the provider network to shape the city with us.",
    browse: "Browse services",
    join: "Join provider network"
  },
  zh: {
    missingTitle: "尚未上线的城市",
    missingDescription: "我们正在扩展更多目的地，敬请期待。",
    back: "返回 Locations",
    allCities: "所有城市",
    why: "为什么用户选择这里",
    logistics: "运营要点",
    ctaTitle: (name: string) => `准备好体验 ${name} 吗？`,
    ctaDescription: "立即在 Guidew App 中发出需求，或加入成为服务提供者。",
    browse: "浏览服务",
    join: "加入服务者网络"
  },
  pt: {
    missingTitle: "Cidade ainda não disponível",
    missingDescription: "Estamos expandindo para novos destinos em breve.",
    back: "Voltar para Locations",
    allCities: "Todas as cidades",
    why: "Por que viajantes escolhem esta cidade",
    logistics: "Destaques operacionais",
    ctaTitle: (name: string) => `Pronto para explorar ${name}?`,
    ctaDescription: "Envie uma solicitação no app Guidew ou entre como provedor para moldar este corredor conosco.",
    browse: "Ver serviços",
    join: "Entrar na rede de provedores"
  },
  es: {
    missingTitle: "Ciudad aún no disponible",
    missingDescription: "Pronto abriremos más destinos.",
    back: "Volver a Locations",
    allCities: "Todas las ciudades",
    why: "Por qué los viajeros eligen esta ciudad",
    logistics: "Puntos operativos",
    ctaTitle: (name: string) => `¿Listo para vivir ${name}?`,
    ctaDescription: "Envía una solicitud en la app Guidew o súmate como proveedor para darle forma al corredor con nosotros.",
    browse: "Ver servicios",
    join: "Unirme a la red de proveedores"
  },
  fr: {
    missingTitle: "Ville pas encore disponible",
    missingDescription: "De nouvelles destinations arrivent bientôt.",
    back: "Retour vers Locations",
    allCities: "Toutes les villes",
    why: "Pourquoi les voyageurs choisissent cette ville",
    logistics: "Points opérationnels",
    ctaTitle: (name: string) => `Prêt à explorer ${name} ?`,
    ctaDescription: "Envoyez une demande dans l’app Guidew ou rejoignez le réseau de prestataires pour construire ce corridor avec nous.",
    browse: "Parcourir les services",
    join: "Rejoindre le réseau de prestataires"
  },
  he: {
    missingTitle: "העיר עדיין לא הושקה",
    missingDescription: "אנחנו מרחיבים ליעדים נוספים ממש בקרוב.",
    back: "חזרה לרשימת הערים",
    allCities: "כל הערים",
    why: "למה מטיילים בוחרים בעיר הזו",
    logistics: "דגשים תפעוליים",
    ctaTitle: (name: string) => `מוכנים לחוות את ${name}?`,
    ctaDescription: "שלחו בקשה באפליקציית Guidew או הצטרפו לרשת הספקים כדי לבנות איתנו את המסדרון.",
    browse: "עיינו בשירותים",
    join: "הצטרפו לרשת הספקים"
  },

  mi: {
    missingTitle: "Kaore i whakarewahia te pa",
    missingDescription: "Kei te whakawhānui atu matou ki etahi atu haerenga mai.",
    back: "Hoki ki nga waahi",
    allCities: "Nga taone katoa",
    why: "He aha te hunga e haereere ana i tenei taone",
    logistics: "Nga tohu nui",
    ctaTitle: (name: string) => `Ready to experience ${name}?`,
    ctaDescription: "Tukuna he tono i roto i te taupānga Aratohu, whakauru atu ranei ki te whatunga kaiwhakarato kia pai ai te taone.",
    browse: "Tirohia nga Ratonga",
    join: "Whakauru atu ki te whatunga kaiwhakarato"
  },} as const;

const LocationDetail = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const profiles = useMemo(() => getCityProfiles(i18n.language), [i18n.language]);
  const city = useMemo(() => profiles.find(item => item.id === cityId), [profiles, cityId]);
  const localeKey =
    locale === "zh" || locale === "pt" || locale === "es" || locale === "fr" || locale === "he" || locale === "mi" ? locale : "en";
  const content = copy[localeKey];

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col bg-brand-lightGray">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-center px-4">
          <div>
            <p className="text-sm text-brand-teal uppercase tracking-[0.3em] mb-3">Guidew Locations</p>
            <h1 className="text-3xl font-bold text-brand-darkBlue mb-3">{content.missingTitle}</h1>
            <p className="text-gray-600 mb-6">{content.missingDescription}</p>
            <Link to="/locations" className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-teal text-white">
              <ArrowLeft className="h-4 w-4" />
              {content.back}
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/locations" className="inline-flex items-center text-sm text-brand-teal mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {content.allCities}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <MapPinned className="text-brand-teal" />
              <p className="text-xs uppercase tracking-[0.4em] text-brand-teal">{city.focus}</p>
            </div>
            <h1 className="text-4xl font-bold text-brand-darkBlue mb-4">{city.name}</h1>
            <p className="text-lg text-gray-600 mb-6">{city.hero.headline}</p>
            <p className="text-gray-500">{city.hero.subtext}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-2xl p-6 border border-brand-lightGray">
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{content.why}</h2>
              <ul className="space-y-4 text-gray-600">
                {city.experiences.map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <Route className="h-5 w-5 text-brand-teal mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-brand-lightGray">
              <h2 className="text-2xl font-semibold text-brand-darkBlue mb-4">{content.logistics}</h2>
              <ul className="space-y-4 text-gray-600">
                {city.logistics.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-orange text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{content.ctaTitle(city.name)}</h2>
            <p className="text-white/90 mb-6">{content.ctaDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/discover" className="px-6 py-3 rounded-full bg-white text-brand-teal font-semibold">
                {content.browse}
              </Link>
              <Link to="/become-expert" className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold">
                {content.join}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LocationDetail;
