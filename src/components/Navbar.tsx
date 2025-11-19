
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { openDownloadDialog } = useDownloadDialog();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                src="/APP_LOGO.jpeg"
                alt="Guidew logo"
                className="h-10 w-auto object-contain"
              />
              <span className="ml-2 text-2xl font-bold gradient-text uppercase">GUIDEW</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/discover" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
              {t('nav.discover')}
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-brand-teal transition-colors">
              {t('nav.about')}
            </Link>

            <div className="ml-4 flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                onClick={() => openDownloadDialog()}
              >
                <Download size={16} />
                {t("nav.downloadApp")}
              </Button>
              <LanguageSwitcher />
              <Button
                variant="outline"
                className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                onClick={() => navigate("/auth?tab=login")}
              >
                {t("common.signIn")}
              </Button>
              <Button className="bg-brand-teal hover:bg-brand-teal/90 text-white" onClick={() => navigate("/auth?tab=register")}>
                {t("common.joinNow")}
              </Button>
            </div>
          </div>
          
          <div className="flex md:hidden items-center space-x-3">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">{t("common.openMenu", "Open main menu")}</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-teal hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/discover" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-teal hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.discover')}
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-brand-teal hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2 flex items-center justify-center gap-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
              onClick={() => openDownloadDialog()}
            >
              <Download size={16} />
              {t("nav.downloadApp")}
            </Button>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Button className="w-full mb-2 bg-brand-teal hover:bg-brand-teal/90 text-white" onClick={() => navigate("/auth?tab=login")}>
                  {t("common.signIn")}
                </Button>
              </div>
              <div className="ml-3">
                <Button
                  variant="outline"
                  className="w-full border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
                  onClick={() => navigate("/auth?tab=register")}
                >
                  {t("common.joinNow")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
