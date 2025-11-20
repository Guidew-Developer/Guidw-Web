import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { pickLocaleValue, resolveLocale, type SupportedLocale } from "@/utils/locale";

const copy: Partial<
  Record<
    SupportedLocale,
    {
      tagline: string;
      powered: string;
      explore: string;
      company: string;
      contact: string;
      quickLinks: Array<{ to: string; label: string }>;
      companyLinks: Array<{ to: string; label: string }>;
      address: string;
      phone: string;
      email: string;
      terms: string;
      privacy: string;
      cookies: string;
    }
  >
> = {
  en: {
    tagline: "Connecting you with local expertise, on demand, wherever you are in the world.",
    powered: "Powered by VIVA Dance Limited",
    explore: "Explore",
    company: "Company",
    contact: "Contact",
    quickLinks: [
      { to: "/discover", label: "Find Services" },
      { to: "/how-it-works", label: "How It Works" },
      { to: "/become-expert", label: "Become an Expert" },
      { to: "/locations", label: "Locations" }
    ],
    companyLinks: [
      { to: "/about", label: "About Us" },
      { to: "/careers", label: "Careers" },
      { to: "/blog", label: "Blog" },
      { to: "/press", label: "Press" }
    ],
    address: "10 Newton Road, Auckland Central, NZ 1010",
    phone: "+64 (21) 513-258",
    email: "hello@guidew.com",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    cookies: "Cookie Policy"
  },
  zh: {
    tagline: "随时连接本地专家，无论您身在世界何处。",
    powered: "由 VIVA Dance Limited 提供技术支持",
    explore: "探索",
    company: "公司",
    contact: "联系",
    quickLinks: [
      { to: "/discover", label: "查找服务" },
      { to: "/how-it-works", label: "使用指南" },
      { to: "/become-expert", label: "成为服务者" },
      { to: "/locations", label: "服务城市" }
    ],
    companyLinks: [
      { to: "/about", label: "关于我们" },
      { to: "/careers", label: "加入我们" },
      { to: "/blog", label: "城市故事" },
      { to: "/press", label: "媒体与公关" }
    ],
    address: "10 Newton Road, Auckland Central, NZ 1010",
    phone: "+64 (21) 513-258",
    email: "hello@guidew.com",
    terms: "服务条款",
    privacy: "隐私政策",
    cookies: "Cookie 政策"
  },
  es: {
    tagline: "Conectamos viajeros y especialistas locales, on demand, en cualquier ciudad.",
    powered: "Operado por VIVA Dance Limited",
    explore: "Explorar",
    company: "Compañía",
    contact: "Contacto",
    quickLinks: [
      { to: "/discover", label: "Buscar servicios" },
      { to: "/how-it-works", label: "Cómo funciona" },
      { to: "/become-expert", label: "Quiero ser experto" },
      { to: "/locations", label: "Ciudades" }
    ],
    companyLinks: [
      { to: "/about", label: "Sobre Guidew" },
      { to: "/careers", label: "Carreras" },
      { to: "/blog", label: "Blog" },
      { to: "/press", label: "Prensa" }
    ],
    address: "10 Newton Road, Auckland Central, NZ 1010",
    phone: "+64 (21) 513-258",
    email: "hello@guidew.com",
    terms: "Términos de servicio",
    privacy: "Política de privacidad",
    cookies: "Política de cookies"
  },
  pt: {
    tagline: "Conectamos você a especialistas locais, sob demanda, em qualquer parte do mundo.",
    powered: "Operado pela VIVA Dance Limited",
    explore: "Explorar",
    company: "Empresa",
    contact: "Contato",
    quickLinks: [
      { to: "/discover", label: "Encontrar serviços" },
      { to: "/how-it-works", label: "Como funciona" },
      { to: "/become-expert", label: "Quero ser especialista" },
      { to: "/locations", label: "Cidades" }
    ],
    companyLinks: [
      { to: "/about", label: "Sobre nós" },
      { to: "/careers", label: "Carreiras" },
      { to: "/blog", label: "Blog" },
      { to: "/press", label: "Imprensa" }
    ],
    address: "10 Newton Road, Auckland Central, NZ 1010",
    phone: "+64 (21) 513-258",
    email: "hello@guidew.com",
    terms: "Termos de serviço",
    privacy: "Política de privacidade",
    cookies: "Política de cookies"
  },
  fr: {
    tagline: "Reliez-vous à une expertise locale, à la demande, où que vous soyez dans le monde.",
    powered: "Propulsé par VIVA Dance Limited",
    explore: "Explorer",
    company: "Entreprise",
    contact: "Contact",
    quickLinks: [
      { to: "/discover", label: "Trouver des services" },
      { to: "/how-it-works", label: "Comment ça marche" },
      { to: "/become-expert", label: "Devenir expert" },
      { to: "/locations", label: "Villes desservies" }
    ],
    companyLinks: [
      { to: "/about", label: "À propos" },
      { to: "/careers", label: "Carrières" },
      { to: "/blog", label: "Blog" },
      { to: "/press", label: "Presse" }
    ],
    address: "10 Newton Road, Auckland Central, NZ 1010",
    phone: "+64 (21) 513-258",
    email: "hello@guidew.com",
    terms: "Conditions d’utilisation",
    privacy: "Politique de confidentialité",
    cookies: "Politique de cookies"
  },
  he: {
    tagline: "חיבור מיידי למומחיות מקומית בכל מקום בעולם.",
    powered: "מופעל על ידי VIVA Dance Limited",
    explore: "גלו",
    company: "החברה",
    contact: "יצירת קשר",
    quickLinks: [
      { to: "/discover", label: "מצאו שירותים" },
      { to: "/how-it-works", label: "איך זה עובד" },
      { to: "/become-expert", label: "הפכו למומחים" },
      { to: "/locations", label: "ערים ושירותים" }
    ],
    companyLinks: [
      { to: "/about", label: "אודות" },
      { to: "/careers", label: "קריירות" },
      { to: "/blog", label: "בלוג" },
      { to: "/press", label: "תקשורת" }
    ],
    address: "10 Newton Road, Auckland Central, NZ 1010",
    phone: "+64 (21) 513-258",
    email: "hello@guidew.com",
    terms: "תנאי שימוש",
    privacy: "מדיניות פרטיות",
    cookies: "מדיניות Cookies"
  }
} as const;

const Footer = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = pickLocaleValue(copy, locale);

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center">
              <img
                src="/APP_LOGO.jpeg"
                alt="Guidew logo"
                className="h-12 w-auto object-contain"
              />
              <span className="ml-2 text-2xl font-bold gradient-text uppercase">GUIDEW</span>
            </Link>
            <p className="mt-3 text-gray-600 text-sm">
              {content.tagline}
            </p>
            <a
              href="https://www.vivadance.co.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center space-x-3 hover:opacity-90 transition-opacity"
            >
              <img
                src="/VIVA_logo.jpeg"
                alt="VIVA Dance Limited logo"
                className="h-8 w-auto object-contain"
              />
              <span className="text-sm text-gray-700 font-medium">{content.powered}</span>
            </a>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-teal">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {content.explore}
            </h3>
            <ul className="mt-4 space-y-2">
              {content.quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-600 hover:text-brand-teal text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {content.company}
            </h3>
            <ul className="mt-4 space-y-2">
              {content.companyLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-600 hover:text-brand-teal text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              {content.contact}
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <MapPin size={18} className="flex-shrink-0 text-brand-teal mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">
                  {content.address}
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="flex-shrink-0 text-brand-teal mr-2" />
                <span className="text-gray-600 text-sm">{content.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="flex-shrink-0 text-brand-teal mr-2" />
                <span className="text-gray-600 text-sm">{content.email}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} VIVA Dance Limited. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="text-sm text-gray-500 hover:text-brand-teal">
                {content.terms}
              </Link>
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-brand-teal">
                {content.privacy}
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 hover:text-brand-teal">
                {content.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
