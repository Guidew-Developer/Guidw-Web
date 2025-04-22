
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPinOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="bg-brand-lightGray w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPinOff className="h-12 w-12 text-brand-teal" />
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">{t('notFound.title')}</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('notFound.subtitle')}</h2>
        <p className="text-gray-600 mb-8">{t('notFound.description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-brand-teal hover:bg-brand-teal/90 text-white"
            onClick={() => navigate("/")}
          >
            {t('notFound.actions.home')}
          </Button>
          <Button 
            variant="outline"
            className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-white"
            onClick={() => navigate("/discover")}
          >
            {t('notFound.actions.discover')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
