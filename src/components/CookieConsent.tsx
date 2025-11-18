import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "guidew-cookie-preference";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

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
          <p className="text-base font-semibold text-brand-darkBlue">我们使用 Cookie 优化体验</p>
          <p className="text-sm text-gray-600">
            点击“同意”即表示您允许我们使用必要与分析类 Cookie。更多细节请查看
            <Link to="/cookies" className="ml-1 font-semibold text-brand-teal underline">
              Cookie 政策
            </Link>
            。
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-brand-teal text-brand-teal hover:bg-brand-teal/10"
            onClick={() => handleChoice("declined")}
          >
            拒绝
          </Button>
          <Button className="w-full sm:w-auto bg-brand-teal hover:bg-brand-teal/90" onClick={() => handleChoice("accepted")}>
            同意
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
