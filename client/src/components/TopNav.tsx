import { Bell } from "lucide-react";
import LanguageToggle from "./LangSelect";
import { useTranslation } from "react-i18next";

const TopNav = () => {
  const { t, i18n } = useTranslation("topnav");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("greeting.morning", "Good Morning");
    if (hour < 17) return t("greeting.afternoon", "Good Afternoon");
    return t("greeting.evening", "Good Evening");
  };

  return (
    <header className="bg-emerald-600 text-white p-5 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            {getGreeting()}, {t("farmer", "Farmer")}
          </h1>
          <p className="text-sm opacity-80">
            {new Date().toLocaleDateString(i18n.language, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <LanguageToggle />
          <Bell className="w-5 h-5 text-white cursor-pointer hover:text-emerald-200 transition-colors" />
          <img
            src="/me.jpeg"
            alt={t("profileAlt", "Profile")}
            className="rounded-full w-10 h-10 border-2 border-emerald-400"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
