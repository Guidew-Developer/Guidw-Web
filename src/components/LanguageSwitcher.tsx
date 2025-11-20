
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = [
  { code: "en", name: "English", dir: "ltr" },
  { code: "zh", name: "中文", dir: "ltr" },
  { code: "pt", name: "Português", dir: "ltr" },
  { code: "es", name: "Español", dir: "ltr" },
  { code: "fr", name: "Français", dir: "ltr" },
  { code: "he", name: "עברית", dir: "rtl" }
] as const;

type LanguageCode = (typeof languages)[number]["code"];

const isSupported = (code?: string | null): code is LanguageCode => {
  if (!code) return false;
  return languages.some(lang => lang.code === code);
};

const applyDocumentDirection = (code: LanguageCode) => {
  const language = languages.find(lang => lang.code === code);
  document.documentElement.dir = language?.dir ?? "ltr";
  document.documentElement.lang = code;
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLang = window.localStorage.getItem("i18nextLng");
    const browserLang = navigator.language.split("-")[0];
    const initialLang: LanguageCode =
      (isSupported(storedLang) && storedLang) ||
      (isSupported(browserLang) && (browserLang as LanguageCode)) ||
      "en";
    i18n.changeLanguage(initialLang);
    applyDocumentDirection(initialLang);
  }, [i18n]);

  const selectedLanguage = useMemo<LanguageCode>(() => {
    const shortCode = i18n.language?.split("-")[0];
    return isSupported(shortCode) ? (shortCode as LanguageCode) : "en";
  }, [i18n.language]);

  return (
    <Select
      value={selectedLanguage}
      onValueChange={value => {
        if (!isSupported(value)) return;
        i18n.changeLanguage(value);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("i18nextLng", value);
        }
        applyDocumentDirection(value);
      }}
    >
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map(lang => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
