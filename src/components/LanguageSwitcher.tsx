
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'pt', name: 'Português' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'he', name: 'עברית' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Get browser language
    const browserLang = navigator.language.split('-')[0];
    // Check if browser language is supported
    const isLangSupported = languages.some(lang => lang.code === browserLang);
    // Set initial language - use browser language if supported, otherwise fallback to English
    const initialLang = isLangSupported ? browserLang : 'en';
    i18n.changeLanguage(initialLang);
  }, [i18n]);

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    // Store the selected language in localStorage for persistence
    localStorage.setItem('i18nextLng', value);
    // Force reload HTML dir attribute for RTL languages
    document.documentElement.dir = value === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <Select
      value={i18n.language}
      onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;

