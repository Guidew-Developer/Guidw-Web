export const supportedLocales = ["en", "zh", "pt", "es", "fr", "he", "mi"] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const resolveLocale = (language: string | undefined): SupportedLocale => {
  if (!language) {
    return "en";
  }
  const normalized = language.split("-")[0]?.toLowerCase();
  const match = supportedLocales.find(locale => normalized === locale || (locale === "zh" && normalized?.startsWith("zh")));
  return match ?? "en";
};

export const pickLocaleValue = <T>(
  collection: Partial<Record<SupportedLocale, T>>,
  locale: SupportedLocale,
  fallback: SupportedLocale = "en"
): T => {
  if (collection[locale]) {
    return collection[locale] as T;
  }
  if (collection[fallback]) {
    return collection[fallback] as T;
  }
  for (const key of supportedLocales) {
    const value = collection[key];
    if (value) {
      return value;
    }
  }
  throw new Error("No localized content available");
};
