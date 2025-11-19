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
import { resolveLocale } from "@/utils/locale";

const copy = {
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
  }
} as const;

const Footer = () => {
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = copy[locale];

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
