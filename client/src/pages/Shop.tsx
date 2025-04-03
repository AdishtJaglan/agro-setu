import { useNavigate } from "react-router-dom";
import { ShoppingCart, Tags, Building } from "lucide-react";
import TopNav from "../components/TopNav";
import BottomNavbar from "../components/BottomNav";

const Shop = () => {
  const navigate = useNavigate();

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
          <button
            onClick={() => navigate("/shop/buy")}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-6 flex items-center text-left">
              <div className="bg-gray-100 p-4 rounded-full mr-4">
                <ShoppingCart className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">Buy Storage</h3>
                <p className="text-gray-600">
                  Browse crops, farming equipment, and more
                </p>
              </div>
            </div>
          </button>

          {/* Sell Option */}
          <button
            onClick={() => navigate("/shop/sell")}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-6 flex items-center text-left">
              <div className="bg-gray-100 p-4 rounded-full mr-4">
                <Tags className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 ">
                  Sell Storage
                </h3>
                <p className="text-gray-600">
                  List your crops, farming equipment for sale
                </p>
              </div>
            </div>
          </button>

          {/* Rent Option */}
          <button
            onClick={() => navigate("/shop/rent")}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="p-6 flex items-center text-left">
              <div className="bg-gray-100 p-4 rounded-full mr-4">
                <Building className="h-8 w-8 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Rent Storage
                </h3>
                <p className="text-gray-600">
                  Find or list rental cold storage space
                </p>
              </div>
            </div>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavbar activeTab="shop" />
    </div>
  );
};

export default Shop;
