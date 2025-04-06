import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n

  .use(LanguageDetector) // auto-detects the language from the browser
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: (await import("./locales/en/translation.json")).default,
      },
      hi: {
        translation: (await import("./locales/hi/translation.json")).default,
      },
    },
    fallbackLng: "en", // fallback language if detected language is not available
    debug: false, // set to true to see logs in development

    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
