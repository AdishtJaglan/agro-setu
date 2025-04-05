import { Bell } from "lucide-react";

const TopNav = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="bg-emerald-600 text-white p-5 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{getGreeting()}, Farmer</h1>
          <p className="text-sm opacity-80">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Bell className="w-5 h-5 text-white" />
          <img
            src="/me.jpeg"
            alt="Profile"
            className="rounded-full w-10 h-10"
          />
        </div>
      </div>
    </header>
  );
};

export default TopNav;
