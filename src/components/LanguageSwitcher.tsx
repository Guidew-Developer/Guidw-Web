
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
  { code: 'zh', name: '中文' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedLang = window.localStorage.getItem('i18nextLng');
    const browserLang = navigator.language.split('-')[0];
    const supported = (code?: string) => code && languages.some(lang => lang.code === code);
    const initialLang = supported(storedLang) ? storedLang! : supported(browserLang) ? browserLang : 'en';
    i18n.changeLanguage(initialLang);
    document.documentElement.dir = initialLang === 'he' ? 'rtl' : 'ltr';
  }, [i18n]);

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('i18nextLng', value);
    }
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
