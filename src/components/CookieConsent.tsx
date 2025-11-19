import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

const STORAGE_KEY = "guidew-cookie-preference";

const copy = {
  en: {
    title: "We use cookies to enhance your experience",
    description:
      "Click “Agree” to allow essential and analytics cookies. Learn more in our Cookie Policy",
    acknowledge: "I understand",
    decline: "Decline",
    accept: "Agree",
    policy: "Cookie Policy"
  },
  zh: {
    title: "我们使用 Cookie 优化体验",
    description: "点击“同意”表示允许必要与分析类 Cookie。更多细节请查看 Cookie 政策。",
    acknowledge: "我已了解",
    decline: "拒绝",
    accept: "同意",
    policy: "Cookie 政策"
  }
} as const;

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const content = copy[locale];

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (value: "accepted" | "declined") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-brand-lightGray bg-white p-5 shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-brand-darkBlue">{content.title}</p>
          <p className="text-sm text-gray-600">
            {content.description}
            <Link to="/cookies" className="ml-1 font-semibold text-brand-teal underline">
              {content.policy}
            </Link>
            {locale === "zh" ? "。" : "."}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-brand-teal text-brand-teal hover:bg-brand-teal/10"
            onClick={() => handleChoice("declined")}
          >
            {content.decline}
          </Button>
          <Button className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90" onClick={() => handleChoice("accepted")}>
            {content.accept}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
