import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  LogOut,
} from "lucide-react";

const CampDashboardHeader = () => {
  const navigate = useNavigate(); 
  const handleLogOut = () => {
    localStorage.clear()

    navigate('/login');
  }
  return (
    <header className="sticky top-0 z-40 w-full flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm">
      {/* Left: Menu button (mobile) & Home link */}
      <div className="flex items-center gap-4">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center gap-2 text-green-900 font-semibold hover:text-green-800 transition"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Home</span>
        </Link>
      </div>

      {/* Right: Notifications + Profile + Logout */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Notification Bell */}
        <button className="relative text-green-900 hover:text-green-700 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-red-600 text-white rounded-full">
            3
          </span>
        </button>

        {/* Profile */}
        <Link
          to="/streams-camp-dashboard/profile"
          className="flex items-center gap-2 text-sm text-green-900 hover:text-green-800 transition"
        >
          <div className="w-7 h-7 bg-green-200 text-green-900 rounded-full flex items-center justify-center text-xs font-bold">
            U
          </div>
          <span className="hidden md:inline">Profile</span>
        </Link>

        {/* Logout */}
        <button 
          onClick={handleLogOut}
          className="flex items-center gap-1 sm:gap-2 text-sm text-red-600 hover:text-red-500 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default CampDashboardHeader;
