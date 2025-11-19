import { createContext, useContext, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";

interface DownloadDialogContextValue {
  openDownloadDialog: (serviceTitle?: string) => void;
}

const DownloadDialogContext = createContext<DownloadDialogContextValue | undefined>(undefined);

const platformOptions = [
  {
    id: "ios",
    label: "iOS",
    link: "https://apps.apple.com/app/guidew",
    logo: "https://cdn.simpleicons.org/apple/ffffff",
    tagline: {
      en: "App Store · Install now",
      zh: "App Store · 立即安装"
    }
  },
  {
    id: "android",
    label: "Android",
    link: "https://play.google.com/store/apps/details?id=guidew",
    logo: "https://cdn.simpleicons.org/android/ffffff",
    tagline: {
      en: "Google Play · Fast download",
      zh: "Google Play · 极速下载"
    }
  }
] as const;

type PlatformId = (typeof platformOptions)[number]["id"];

export const DownloadDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>("ios");
  const [serviceTitle, setServiceTitle] = useState<string | undefined>();
  const { i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);

  const copy = {
    en: {
      label: "Download Guidew",
      defaultHeadline: "Bring Guidew anywhere your journey goes",
      serviceHeadline: (title: string) => `Save ${title} directly in the app`,
      description:
        "Summon bilingual experts, world champions, or rescue teams in seconds. Scan the QR code to land on the right store.",
      vipNote: "Guidew VIP users skip commissions, providers earn more, and AI plans every itinerary.",
      qrLabel: "QR Download",
      scanTitle: (platform: string) => `Scan to install the ${platform} version`,
      visitStore: (platform: string) => `Go to ${platform} store`,
      scanNote: "Scan or click to open the download link in your browser, then continue chatting with experts.",
      versionLabel: (platform: string) => `${platform} version`
    },
    zh: {
      label: "下载 Guidew",
      defaultHeadline: "带上 Guidew，走进新西兰的真实生活",
      serviceHeadline: (title: string) => `锁定 ${title}，就在手机里`,
      description: "一次下载即可召唤本地专家、冠军导师或救援团队。扫码立即跳转到正确的应用商店。",
      vipNote: "VIP 用户免佣下单，服务者享受高佣金，并可使用 AI 行程规划。",
      qrLabel: "二维码下载",
      scanTitle: (platform: string) => `扫码下载 ${platform} 版本`,
      visitStore: (platform: string) => `前往 ${platform} 商店`,
      scanNote: "扫码或点击后在浏览器中打开下载链接。登录后即可继续与当地专家沟通。",
      versionLabel: (platform: string) => `${platform} 版本`
    }
  }[locale];

  const currentPlatform = useMemo(
    () => platformOptions.find(option => option.id === selectedPlatform) ?? platformOptions[0],
    [selectedPlatform]
  );
  const qrSrc = useMemo(
    () =>
      `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
        currentPlatform.link
      )}`,
    [currentPlatform]
  );

  const openDownloadDialog = (title?: string) => {
    setServiceTitle(title);
    setSelectedPlatform("ios");
    setOpen(true);
  };

  return (
    <DownloadDialogContext.Provider value={{ openDownloadDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90vw] max-w-[90vw] max-h-[90vh] p-0 border-none rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row h-full">
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-brand-teal via-brand-gold/60 to-brand-orange text-white p-10 flex flex-col justify-between">
              <div>
                <p className="uppercase tracking-[0.4em] text-sm mb-4">{copy.label}</p>
                <h2 className="text-4xl font-bold leading-tight mb-4">
                  {serviceTitle ? copy.serviceHeadline(serviceTitle) : copy.defaultHeadline}
                </h2>
                <p className="text-white/90 text-lg mb-8">{copy.description}</p>
                <div className="grid grid-cols-1 gap-3">
                  {platformOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedPlatform(option.id)}
                      className={`flex items-center gap-4 rounded-2xl border px-5 py-4 transition ${
                        selectedPlatform === option.id
                          ? "bg-white text-brand-teal"
                          : "border-white/60 text-white hover:bg-white/10"
                      }`}
                    >
                      <img
                        src={option.logo}
                        alt={`${option.label} logo`}
                        className={`h-8 w-8 ${selectedPlatform === option.id ? "filter invert" : ""}`}
                      />
                      <div className="text-left flex-1">
                        <p
                          className={`text-base font-semibold ${
                            selectedPlatform === option.id ? "text-brand-teal" : "text-white"
                          }`}
                        >
                          {copy.versionLabel(option.label)}
                        </p>
                        <p
                          className={`text-sm ${
                            selectedPlatform === option.id ? "text-brand-teal/80" : "text-white/80"
                          }`}
                        >
                          {option.tagline[locale]}
                        </p>
                      </div>
                      <ArrowUpRight
                        className={`h-5 w-5 ${selectedPlatform === option.id ? "text-brand-teal" : "text-white"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-sm text-white/70">
                {copy.vipNote}
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-2">{copy.qrLabel}</p>
                <h3 className="text-2xl font-semibold leading-tight text-brand-darkBlue">
                  {copy.scanTitle(currentPlatform.label)}
                </h3>
              </div>
              <div className="bg-brand-lightGray/60 p-5 rounded-3xl shadow-inner">
                <img src={qrSrc} alt="Download QR code" className="h-56 w-56 rounded-2xl" />
              </div>
              <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-base" asChild>
                <a href={currentPlatform.link} target="_blank" rel="noopener noreferrer">
                  {copy.visitStore(currentPlatform.label)}
                </a>
              </Button>
              <p className="text-sm text-gray-500 text-center">
                {copy.scanNote}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DownloadDialogContext.Provider>
  );
};

export const useDownloadDialog = () => {
  const context = useContext(DownloadDialogContext);
  if (!context) {
    throw new Error("useDownloadDialog must be used within DownloadDialogProvider");
  }
  return context;
};
