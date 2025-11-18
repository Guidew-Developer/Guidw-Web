export type SupportedLocale = "en" | "zh";

export const resolveLocale = (language: string | undefined): SupportedLocale => {
  if (!language) {
    return "en";
  }
  const normalized = language.toLowerCase();
  return normalized.startsWith("zh") ? "zh" : "en";
};
