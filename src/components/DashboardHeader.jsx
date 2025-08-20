import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FaBell, FaWrench } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

import { links } from "../constants/dummy";

const DashboardHeader = () => {
  const user_type = localStorage.getItem("user_type");
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const division = localStorage.getItem("division");
  const isHead = localStorage.getItem("is_head") === "true";

  const [openMenus, setOpenMenus] = useState({});
  const timeoutRefs = useRef({});

  const handleMouseEnter = useCallback((level, key) => {
    clearTimeout(timeoutRefs.current[level]);
    setOpenMenus((prev) => ({ ...prev, [level]: key }));
  }, []);

  const handleMouseLeave = useCallback((level) => {
    timeoutRefs.current[level] = setTimeout(() => {
      setOpenMenus((prev) => ({ ...prev, [level]: null }));
    }, 300);
  }, []);

  const renderDropdown = useCallback(
    (items, level = 1) => (
      <ul className={`absolute left-full top-0 ml-1 w-56 bg-white shadow-lg rounded-md z-[${level + 10}]`}>
        {items.map((item) => (
          <li
            key={item.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(level, item.name)}
            onMouseLeave={() => handleMouseLeave(level)}
          >
            <Link
              to={item.link ? `/${item.link}` : "#"}
              className="flex justify-between px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:border-l-4 hover:border-[#185F95] font-medium"
            >
              {item.name}
              {item.dropdown && <ChevronRight className="w-4 h-4 text-gray-500 ml-2" />}
            </Link>
            {item.dropdown && openMenus[level] === item.name && (
              <div className="absolute top-0 left-full">{renderDropdown(item.dropdown, level + 1)}</div>
            )}
          </li>
        ))}
      </ul>
    ),
    [handleMouseEnter, handleMouseLeave, openMenus]
  );

  const toolsDropdown = links.find((item) => item.name === "Tools")?.dropdown || [];

  return (
    <header className="sticky top-0 backdrop-blur-md text-white px-4 py-2 rounded-2xl z-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        {/* Left Section */}
        <div>
          <h1 className="capitalize text-sm text-white/80 font-semibold">{user_type === "nsc"? "NSC" : user_type === "shipping_line" ? "Shipping Line/Agency" : user_type}</h1>
          <h1 className="text-lg font-bold mt-1">
            {user_type === "terminal" || (user_type === "nsc" && division === "M and E")
              ? "STREAMS Portal"
              : "CRD Portal"}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
          <div className="flex gap-6 items-center text-white mt-2 sm:mt-0">
            {/* Wrench Icon - Only for NSC */}
            {user_type === "nsc" && toolsDropdown.length > 0 && (
              <div
                className="relative bg-white text-blue-500 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer"
                onMouseEnter={() => handleMouseEnter(0, "Tools")}
                onMouseLeave={() => handleMouseLeave(0)}
              >
                <FaWrench className="text-lg" />
                {openMenus[0] === "Tools" && (
                  <div className="absolute top-full left-[-200px] mt-2 bg-white border shadow-lg rounded-lg z-50">
                    {renderDropdown(toolsDropdown, 1)}
                  </div>
                )}
              </div>
            )}

            <Link to="/home">
              <HiOutlineHome className="text-2xl cursor-pointer" />
            </Link>
          </div>

          <div className="flex relative items-center gap-4 mt-2 sm:mt-0">
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold">
                {user_type === "terminal" ? last_name : first_name}
              </span>

              {/* If head of department */}
             {isHead && (
                <span className="ml-2 px-2 py-0.5 text-md font-semibold text-[#185F95] bg-white rounded-lg shadow-sm">
                  Head of Department
                </span>
              )}


              <span className="text-lg">•</span>
              <span className="text-white/80">
                {user_type === "nsc" ? division : user_type === "shipper" ? last_name : user_type === "charterer" ? last_name : user_type === "shipping_line" ? last_name : first_name}
              </span>
            </div>

            <div className="ml-6 relative cursor-pointer">
              <FaBell className="text-xl text-white" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
