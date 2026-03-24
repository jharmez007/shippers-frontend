import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt, FaBell } from "react-icons/fa";
import { ChevronDown, ChevronRight } from "lucide-react";

import { links } from "../../constants/dummy";
import { images } from "../../constants";
import "./navbar.scss";

const activeLink = "text-[#58A986] font-bold";
const normalLink = "text-black hover:text-zinc-500 ease-in duration-300 font-bold";
const menuActiveLink = "text-[#58A986] font-bold";
const menuLink = "text-black hover:text-[#58A986] ease-in duration-300 font-bold";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [division, setDivision] = useState(null);

  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const agency_name = localStorage.getItem("agency_name");
  const timeoutRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserType(localStorage.getItem("user_type"));
    setDivision(localStorage.getItem("division"));
    setIsLoggedIn(!!token);
  }, []);

  const handleMouseEnter = useCallback((level, key) => {
    clearTimeout(timeoutRefs.current[level]);
    setOpenMenus((prev) => ({ ...prev, [level]: key }));
  }, []);

  const handleMouseLeave = useCallback((level) => {
    timeoutRefs.current[level] = setTimeout(() => {
      setOpenMenus((prev) => ({ ...prev, [level]: null }));
    }, 300);
  }, []);

  const handleLogOut = useCallback(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  const filteredLinks = useMemo(() => {
    return links.map((item) => {
      if (item.name === "Tools" && item.dropdown) {
        const newDropdown = item.dropdown.filter((subItem) => {
          if (!isLoggedIn) return subItem.name !== "CRD Portal" && subItem.name !== "PSSP";
          if (userType === "nsc") {
            if (division === "M and T") return subItem.name === "CRD Portal" || !["CRD Portal", "PSSP"].includes(subItem.name);
            if (division === "M and E") return subItem.name === "PSSP" || !["CRD Portal", "PSSP"].includes(subItem.name);
          }
          return true;
        });
        return { ...item, dropdown: newDropdown };
      }
      return item;
    });
  }, [isLoggedIn, userType, division]);

  const renderDropdown = useCallback((items, level = 1) => (
    <ul className={`absolute left-full top-0 ml-1 w-56 bg-white shadow-lg z-[${level + 10}] transition-all duration-200`}>
      {items.map((item) => (
        <li
          key={item.name}
          className="relative"
          onMouseEnter={() => handleMouseEnter(level, item.name)}
          onMouseLeave={() => handleMouseLeave(level)}
        >
          <Link
            to={`/${item.link}`}
            className="flex justify-between px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:border-l-4 hover:border-[#185F95] font-medium transition-all duration-200 transform hover:scale-105"
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
  ), [handleMouseEnter, handleMouseLeave, openMenus]);

  return (
    <div className="fixed flex z-[999] w-full items-center bg-white shadow-lg h-20">
      <div className="flex w-full flex-col lg:flex-row justify-between items-center px-4 lg:px-8 py-3 mx-auto">
        {/* Left: Logo + Mobile Menu Button */}
        <div className="w-full lg:w-auto flex justify-between items-center">
          <Link to="/home">
            <img src={images.logo} alt="logo" className="w-40 sm:w-48 object-contain" />
          </Link>
          <div className="lg:hidden">
            <HiMenuAlt4 onClick={() => setToggle(true)} className="text-3xl cursor-pointer" />
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex flex-wrap justify-center items-center space-x-6 mt-4 lg:mt-0 text-base font-medium text-gray-700">
          {filteredLinks
            .filter((item) => !(item.name === "Tools" && (userType === "terminal" || userType === "regulator")))
            .map((item) => (
              <li
                key={item.name}
                className="relative group navlink"
                onMouseEnter={() => handleMouseEnter(0, item.name)}
                onMouseLeave={() => handleMouseLeave(0)}
              >
                {item.dropdown ? (
                  <span className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-black font-medium">
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </span>
                ) : (
                  <Link to={`/${item.link}`} className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                    <span className="flex items-center gap-1">{item.name}</span>
                  </Link>
                )}
                {item.dropdown && openMenus[0] === item.name && (
                  <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-lg z-50">
                    {renderDropdown(item.dropdown, 1)}
                  </div>
                )}
              </li>
            ))}
        </ul>

        {/* Right Desktop: Auth / User Info */}
        <div className="hidden lg:flex items-center gap-4 mt-4 lg:mt-0">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-[#12507B]">
                <FaUserCircle className="text-xl" />
                <span className="font-semibold">
                  {userType === "regulator"
                    ? agency_name
                    : userType === "terminal"
                    ? last_name
                    : first_name}
                </span>
              </div>
              <span className="text-lg">•</span>
              <div onClick={handleLogOut} className="flex items-center gap-1 text-[#12507B] cursor-pointer">
                <FaSignOutAlt className="text-lg" />
                <span className="font-semibold">Sign Out</span>
              </div>
              <div className="relative cursor-pointer">
                <FaBell className="text-xl text-[#12507B]" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-black hover:text-white border-2 border-black text-sm font-bold px-6 py-2 rounded">
                Log In
              </Link>
              <Link to="/whoareyou" className="hover:bg-black hover:text-white border-2 border-black text-sm font-bold px-5 py-2 rounded">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Drawer */}
        {toggle && (
          <motion.div
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="fixed top-0 right-0 w-72 h-screen bg-white shadow-xl z-[999] p-6 overflow-y-auto"
          >
            <div className="flex justify-end mb-6">
              <HiX onClick={() => setToggle(false)} className="text-3xl cursor-pointer" />
            </div>

            {/* Auth on Mobile */}
            <div className="mb-6">
              {isLoggedIn ? (
                <div className="flex flex-col gap-3 text-[#12507B]">
                  <div className="flex items-center gap-3">
                    <FaUserCircle className="text-2xl" />
                    <span className="font-semibold text-lg">
                      {userType === "regulator"
                        ? agency_name
                        : userType === "terminal"
                        ? last_name
                        : first_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogOut}>
                    <FaSignOutAlt className="text-lg" />
                    <span className="font-semibold">Sign Out</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="border-2 border-black text-sm font-bold px-6 py-2 rounded" onClick={() => setToggle(false)}>
                    Log In
                  </Link>
                  <Link to="/whoareyou" className="border-2 border-black text-sm font-bold px-5 py-2 rounded" onClick={() => setToggle(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-4">
              {filteredLinks
                .filter((item) => !(userType === "terminal" && item.name === "Tools"))
                .map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <span className="block font-bold text-gray-700 mb-1 text-lg">{item.name}</span>
                        {item.dropdown.map((subItem) => (
                          <NavLink
                            to={`/${subItem.link}`}
                            key={subItem.name}
                            className={({ isActive }) => (isActive ? menuActiveLink : menuLink)}
                            onClick={() => setToggle(false)}
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </>
                    ) : (
                      <NavLink
                        to={`/${item.link}`}
                        className={({ isActive }) => (isActive ? menuActiveLink : menuLink)}
                        onClick={() => setToggle(false)}
                      >
                        {item.name}
                      </NavLink>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
