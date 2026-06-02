export const SUPPORTED_LANGUAGES = ["en", "ja", "fr"] as const;
export type LanguageKey = (typeof SUPPORTED_LANGUAGES)[number];
