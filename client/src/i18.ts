import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Define supported languages and namespaces
const languages = ["en", "hi"] as const;
const namespaces = [
  "home",
  "jobs",
  "chatbot",
  "shop",
  "rent",
  "list",
  "questions",
  "topnav",
  "bottomnav",
] as const;

type Language = (typeof languages)[number];
type Namespace = (typeof namespaces)[number];

// Function to load translation files
const loadResources = async (): Promise<Record<Language, Record<Namespace, Record<string, string>>>> => {
  const resources = {} as Record<Language, Record<Namespace, Record<string, string>>>;

  for (const lang of languages) {
    resources[lang] = {} as Record<Namespace, Record<string, string>>;
    for (const ns of namespaces) {
      resources[lang][ns] = (await import(`./locales/${lang}/${ns}.json`)).default;
    }
  }

  return resources;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    ns: namespaces as unknown as string[],
    defaultNS: "home",
    resources: await loadResources(),
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
