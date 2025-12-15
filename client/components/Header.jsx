import { Bell, User, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header({ setSidebarOpen }) {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);


  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 flex items-center justify-between">

      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-300 rounded-full transition-all">
          <Bell size={20} className="text-gray-600" />
        </button>

        <button onClick={() => navigate("/profile")} className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-300 transition-all">
          <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.name || "User"}
          </span>
        </button>

      </div>
    </header>
  );
}
