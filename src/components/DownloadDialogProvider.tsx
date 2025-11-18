import { createContext, useContext, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

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
    tagline: "App Store · 立即安装"
  },
  {
    id: "android",
    label: "Android",
    link: "https://play.google.com/store/apps/details?id=guidew",
    logo: "https://cdn.simpleicons.org/android/ffffff",
    tagline: "Google Play · 极速下载"
  }
] as const;

type PlatformId = (typeof platformOptions)[number]["id"];

export const DownloadDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>("ios");
  const [serviceTitle, setServiceTitle] = useState<string | undefined>();

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
                <p className="uppercase tracking-[0.4em] text-sm mb-4">Download Guidew</p>
                <h2 className="text-4xl font-bold leading-tight mb-4">
                  {serviceTitle ? `锁定 ${serviceTitle}，就在手机里` : "带上 Guidew，走进新西兰的真实生活"}
                </h2>
                <p className="text-white/90 text-lg mb-8">
                  一次下载，随时召唤本地专家、冠军导师、语言搭档与救援团队。二维码扫码即可立即进入应用商店。
                </p>
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
                          {option.label} 版本
                        </p>
                        <p
                          className={`text-sm ${
                            selectedPlatform === option.id ? "text-brand-teal/80" : "text-white/80"
                          }`}
                        >
                          {option.tagline}
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
                通过 Guidew，VIP 用户免佣下单，服务者享受高佣金，并可使用 AI 行程规划。
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-teal mb-2">QR Download</p>
                <h3 className="text-2xl font-semibold leading-tight text-brand-darkBlue">
                  扫码下载 {currentPlatform.label} 版本
                </h3>
              </div>
              <div className="bg-brand-lightGray/60 p-5 rounded-3xl shadow-inner">
                <img src={qrSrc} alt="Download QR code" className="h-56 w-56 rounded-2xl" />
              </div>
              <Button className="w-full bg-brand-teal hover:bg-brand-teal/90 text-base" asChild>
                <a href={currentPlatform.link} target="_blank" rel="noopener noreferrer">
                  直接前往 {currentPlatform.label} 商店
                </a>
              </Button>
              <p className="text-sm text-gray-500 text-center">
                扫码或点击后在浏览器中打开下载链接。登录后即可继续与当地专家沟通。
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
