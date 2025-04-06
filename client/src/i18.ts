// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import homeEn from "./locales/en/home.json";
import jobsEn from "./locales/en/jobs.json";
import homeHi from "./locales/hi/home.json";
import jobsHi from "./locales/hi/jobs.json";
import chatbotEn from "./locales/en/chatbot.json";
import chatbotHi from "./locales/hi/chatbot.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    ns: ["home", "jobs", "chatbot"], // define namespaces
    defaultNS: "home", // set a default namespace
    resources: {
      en: {
        home: homeEn,
        jobs: jobsEn,
        chatbot: chatbotEn,
      },
      hi: {
        home: homeHi,
        jobs: jobsHi,
        chatbot: chatbotHi,
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
