import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Menu,
  X,
} from "lucide-react";

import { images } from "../../constants";

const navItems = [
  {
    label: "Dashboard",
    to: "/camp/maritime-police-dashboard/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Documents",
    to: "/documents",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Settings",
    to: "/camp/maritime-police-dashboard/settings",
    icon: <Settings className="w-5 h-5" />,
  },
];

const MaritimePoliceSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const SidebarContent = ({ onClickItem }) => (
    <div className="flex flex-col h-full p-4 pt-8 bg-green-900 w-64 text-white">
      {/* Branding */}
      <div className="mb-8 flex items-center justify-between md:justify-center">
        <div className="ml-4 flex items-center">
          <div className="flex text-center">
            <img src={images.shipperslog} alt="Shippers Logo" className="mx-auto mb-2 w-20" />
            <img src={images.camplogo} alt="Camp Logo" className="mx-auto mb-2 w-40 h-20" />
          </div>
        </div>
        {/* Close button on mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => {
                  if (onClickItem) onClickItem();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-green-900"
                      : "text-white hover:bg-green-800"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6 text-green-900" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
          <div className="fixed top-0 left-0 h-full w-64 bg-green-900 shadow-xl z-50 transition-transform duration-300">
            <SidebarContent onClickItem={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default MaritimePoliceSidebar;
