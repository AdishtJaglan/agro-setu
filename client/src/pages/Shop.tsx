import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  ChartNoAxesCombined,
  Tags,
  Building,
} from "lucide-react";
import TopNav from "../components/TopNav";
import BottomNavbar from "../components/BottomNav";

const Shop = () => {
  const navigate = useNavigate();

  const data = [
    {
      heading: "Buy",
      text: "Browse crops, farming equipment, and more",
      icon: ShoppingCart,
      path: "/shop/buy",
    },
    {
      heading: "Sell",
      text: "List your crops, farming equipment for sale",
      icon: Tags,
      path: "/shop/sell",
    },
    {
      heading: "Rent",
      text: "Find rental cold storage spaces",
      icon: Building,
      path: "/shop/rent",
    },
    {
      heading: "List",
      text: "List your rental cold storage spaces",
      icon: ChartNoAxesCombined,
      path: "/shop/list",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <TopNav />

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col items-center justify-start mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          What would you like to do?
        </h2>

        <div className="grid grid-cols-1 gap-6 w-full max-w-md">
          {/* Buy Option */}
          {data.map((entry, idx) => (
            <button
              key={idx}
              onClick={() => navigate(entry.path)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="p-6 flex items-center text-left">
                <div className="bg-gray-100 p-4 rounded-full mr-4">
                  <entry.icon className="h-8 w-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {entry.heading}
                  </h3>
                  <p className="text-gray-600">{entry.text}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar activeTab="shop" />
    </div>
  );
};

export default Shop;
