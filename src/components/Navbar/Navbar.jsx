import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { FaUserCircle, FaSignOutAlt, FaBell } from "react-icons/fa";
import { ChevronDown, ChevronRight  } from "lucide-react"; 

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
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name"); 
  const agency_name = localStorage.getItem("agency_name");
  const timeoutRefs = {};
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");

    setUserType(user_type); 

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  const handleMouseEnter = (level, key) => {
    clearTimeout(timeoutRefs[level]);
    setOpenMenus((prev) => ({ ...prev, [level]: key }));
  };

  const handleMouseLeave = (level) => {
    timeoutRefs[level] = setTimeout(() => {
      setOpenMenus((prev) => ({ ...prev, [level]: null }));
    }, 300); // Delay before hiding to allow smoother experience
  };

  const renderDropdown = (items, level = 1) => {
    return (
      <ul
        className={`absolute left-full top-0 mt-0 ml-1 w-56 bg-white shadow-lg z-[${
          level + 10
        }] transition-all duration-200`}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(level, item.name)}
            onMouseLeave={() => handleMouseLeave(level)}
          >
            <Link
              to={`/${item.link}`}
              className="flex justify-between px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:border-l-4 hover:border-[#185F95] font-medium relative transition-all duration-200 transform hover:scale-105"
            >
              {item.name}
              {item.dropdown && (
              <ChevronRight className="w-4 h-4 text-gray-500 ml-2" />
            )}
            </Link>
            {item.dropdown && openMenus[level] === item.name && (
              <div className="absolute top-0 left-full">
                {renderDropdown(item.dropdown, level + 1)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // const handleInitialsClick = () => {
  //   const user_type = localStorage.getItem("user_type");
  //   if (user_type === "shipper") {
  //     navigate("/shipper-dashboard/profile");
  //   } else if (user_type === "bank") {
  //     navigate("/bank-dashboard/profile");
  //   } else if (user_type === "regulator") {
  //     navigate("/regulator-dashboard/profile");
  //   } else if (user_type === "nsc") {
  //     navigate("/nsc-dashboard/profile");
  //   }
  // };

  const handleLogOut = () => {
      localStorage.clear()

      navigate('/login');
    }

  return (
    <div className="fixed flex z-[999] w-full items-center bg-white shadow-sm h-20">
      <div className="flex w-full flex-col lg:flex-row justify-between items-center px-4 lg:px-8 py-3 mx-auto">
        {/* Left: Logo */}
        <div className="w-full lg:w-auto flex justify-between items-center">
          <Link to="/home">
            <div className="w-48 sm:w-56">
              <img src={images.logo} alt="logo" className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <HiMenuAlt4 onClick={() => setToggle(true)} className="text-2xl cursor-pointer" />
          </div>
        </div>

        <ul className="hidden lg:flex flex-wrap justify-center items-center space-x-6 mt-4 lg:mt-0 text-base font-medium text-gray-700">
          {links
            .filter((item) => !(item.name === "Tools" && (userType === "terminal" || userType === "regulator")))
            .map((item) => {

            return (
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
                  <Link
                    to={`/${item.link}`}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <span className="flex items-center gap-1">
                      {item.name}
                    </span>
                  </Link>
                )}

                {item.dropdown && openMenus[0] === item.name && (
                  <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-lg z-50">
                    {renderDropdown(item.dropdown, 1)}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Right: Auth Buttons or User Info */}
        <div className="hidden lg:flex items-center gap-4 mt-4 lg:mt-0">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-2 text-[#12507B]">
                <FaUserCircle className="text-xl" />
                {userType === "regulator" ? (
                  <span className="font-semibold">{agency_name}</span>
                ) : (
                  <>
                    <span className="font-semibold">{first_name}</span>
                    <span className="text-lg">•</span>
                    <span className="text-[#12507B]/80">{last_name}</span>
                  </>
                )}
              </div>

              <div
                onClick={handleLogOut}
                className="flex items-center gap-1 text-[#12507B] cursor-pointer"
              >
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
              <Link
                to="/login"
                className="hover:bg-black hover:text-white border-2 border-black text-sm font-bold px-6 py-2 rounded"
              >
                Log In
              </Link>
              <Link
                to="/whoareyou"
                className="hover:bg-black hover:text-white border-2 border-black text-sm font-bold px-5 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Drawer */}
        {toggle && (
          <motion.div
            whileInView={{ x: [200, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="fixed top-0 right-0 w-64 h-screen bg-white shadow-lg z-[999] p-6"
          >
            <div className="flex justify-end mb-4">
              <HiX onClick={() => setToggle(false)} className="text-2xl cursor-pointer" />
            </div>
            <div className="flex flex-col gap-4">
              {links
                .filter((item) => !(userType === "terminal" && item.name === "Tools"))
                .map((item) => (
                <NavLink
                  to={`/${item.link}`}
                  className={({ isActive }) =>
                    isActive ? menuActiveLink : menuLink
                  }
                  key={`link-${item.name}`}
                  onClick={() => setToggle(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


