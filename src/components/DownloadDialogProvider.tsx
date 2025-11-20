import { createContext, useContext, useMemo, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { pickLocaleValue, resolveLocale, type SupportedLocale } from "@/utils/locale";

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
      zh: "App Store · 立即安装",
      pt: "App Store · Instale agora",
      es: "App Store · Instalar ahora",
      fr: "App Store · Installer maintenant",
      he: "App Store · התקנה מידית"
    }
  },
  {
    id: "android",
    label: "Android",
    link: "https://play.google.com/store/apps/details?id=guidew",
    logo: "https://cdn.simpleicons.org/android/ffffff",
    tagline: {
      en: "Google Play · Fast download",
      zh: "Google Play · 极速下载",
      pt: "Google Play · Download rápido",
      es: "Google Play · Descarga rápida",
      fr: "Google Play · Téléchargement rapide",
      he: "Google Play · הורדה מהירה"
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
  const translationMap: Partial<
    Record<
      SupportedLocale,
      {
        label: string;
        defaultHeadline: string;
        serviceHeadline: (title: string) => string;
        description: string;
        vipNote: string;
        qrLabel: string;
        scanTitle: (platform: string) => string;
        visitStore: (platform: string) => string;
        scanNote: string;
        versionLabel: (platform: string) => string;
      }
    >
  > = {
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
    es: {
      label: "Descargar Guidew",
      defaultHeadline: "Lleva Guidew a cada ciudad que visitas",
      serviceHeadline: (title: string) => `Guarda ${title} directamente en la app`,
      description:
        "Convoca expertos bilingües, campeones o equipos de apoyo en segundos. Escanea el QR para llegar a la tienda correcta.",
      vipNote: "Con Guidew VIP eliminas la comisión del 15%, tienes matching prioritario y automatización para proveedores.",
      qrLabel: "Descarga por QR",
      scanTitle: (platform: string) => `Escanea para instalar la versión ${platform}`,
      visitStore: (platform: string) => `Ir a la tienda ${platform}`,
      scanNote: "Escanea o haz clic para abrir el enlace de descarga y seguir chateando con expertos.",
      versionLabel: (platform: string) => `Versión ${platform}`
    },
    pt: {
      label: "Baixar Guidew",
      defaultHeadline: "Leve a Guidew para onde sua jornada for",
      serviceHeadline: (title: string) => `Salve ${title} direto no app`,
      description:
        "Acione especialistas bilíngues, campeões mundiais ou equipes de suporte em segundos. Escaneie o QR para cair na loja certa.",
      vipNote: "VIP remove a taxa de 15%, dá prioridade no matching e oferece automação para provedores.",
      qrLabel: "Download via QR",
      scanTitle: (platform: string) => `Escaneie para instalar a versão ${platform}`,
      visitStore: (platform: string) => `Ir para a loja ${platform}`,
      scanNote: "Escaneie ou clique para abrir o link de download e continue falando com os especialistas.",
      versionLabel: (platform: string) => `Versão ${platform}`
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
    },
    fr: {
      label: "Télécharger Guidew",
      defaultHeadline: "Emportez Guidew dans chaque ville de votre voyage",
      serviceHeadline: (title: string) => `Enregistrez ${title} directement dans l’app`,
      description:
        "En quelques secondes, convoquez des experts bilingues, des champions ou des équipes de secours. Scannez le QR pour atteindre la bonne boutique.",
      vipNote: "Guidew VIP supprime la commission de 15 %, priorise le matching et automatise les outils côté prestataires.",
      qrLabel: "Téléchargement QR",
      scanTitle: (platform: string) => `Scannez pour installer la version ${platform}`,
      visitStore: (platform: string) => `Aller sur la boutique ${platform}`,
      scanNote: "Scannez ou cliquez pour ouvrir le lien de téléchargement, puis continuez à discuter avec les experts.",
      versionLabel: (platform: string) => `Version ${platform}`
    },
    he: {
      label: "הורידו את Guidew",
      defaultHeadline: "Guidew נוסעת איתכם לכל עיר",
      serviceHeadline: (title: string) => `שמרו את ${title} ישירות באפליקציה`,
      description:
        "זמינים לכם מומחים דו-לשוניים, אלופי עולם או צוותי סיוע תוך שניות. סרקו את ה‑QR כדי לפתוח את החנות המתאימה.",
      vipNote: "חברי VIP מדלגים על עמלות, ספקים מרוויחים יותר וה-AI בונה כל מסלול.",
      qrLabel: "הורדה ב‑QR",
      scanTitle: (platform: string) => `סרקו כדי להתקין את גרסת ${platform}`,
      visitStore: (platform: string) => `עברו לחנות ${platform}`,
      scanNote: "סרקו או לחצו כדי לפתוח את קישור ההורדה ולהמשיך לשוחח עם המומחים.",
      versionLabel: (platform: string) => `גרסת ${platform}`
    }
  };
  const copy = pickLocaleValue(translationMap, locale);
  const taglineLocale =
    locale === "zh"
      ? "zh"
      : locale === "pt"
        ? "pt"
        : locale === "es"
          ? "es"
          : locale === "fr"
            ? "fr"
            : locale === "he"
              ? "he"
              : "en";

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
                          {option.tagline[taglineLocale]}
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
