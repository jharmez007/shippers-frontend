import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiMenuAlt4, HiX } from "react-icons/hi";

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
  const [initials, setInitials] = useState(""); 
  const timeoutRefs = {};
  const navigate = useNavigate(); 
  useEffect(() => {
    const first_name = localStorage.getItem("first_name");
    const last_name = localStorage.getItem("last_name");
    const token = localStorage.getItem("token");
    const user_type = localStorage.getItem("user_type");
  
    if (token) {
      setIsLoggedIn(true);
      if (user_type === "bank") {
        setInitials(`${first_name[0]}`.toUpperCase()); 
      } else {
        setInitials(`${first_name[0]}${last_name[0]}`.toUpperCase()); 
      }
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
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:border-l-4 hover:border-[#185F95] font-medium relative transition-all duration-200 transform hover:scale-105"
            >
              {item.name}
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

  const handleInitialsClick = () => {
    const user_type = localStorage.getItem("user_type");
    if (user_type === "shipper") {
      navigate("/shipper-dashboard/profile");
    } else if (user_type === "bank") {
      navigate("/bank-dashboard/profile");
    } else if (user_type === "regulator") {
      navigate("/regulator-dashboard/profile");
    } else {
      navigate("/dashboard/profile");
    }
  };

  return (
    <div className="fixed app__flex flex-col lg:flex-row bg-white min-h-20 w-full z-[999] lg:px-3">
      <div className="flex items-center justify-between lg:justify-center w-full lg:basis-10/12 md:basis-9/12 px-4 py-3">
        <div className="flex basis-5/12">
          <Link to="/home">
            <div className="w-60">
              <img src={images.logo} alt="logo" className="w-full h-full" />
            </div>
          </Link>
        </div>

        <ul className="basis-7/12 hidden lg:flex space-x-6 text-lg relative">
          {links.map((item) => (
            <li
              key={item.name}
              className="relative group navlink"
              onMouseEnter={() => handleMouseEnter(0, item.name)}
              onMouseLeave={() => handleMouseLeave(0)}
            >
              <Link
                to={`/${item.link}`}
                className={({ isActive }) => (isActive ? activeLink : normalLink)}
              >
                {item.name}
              </Link>
              {item.dropdown && openMenus[0] === item.name && (
                <div className="absolute top-full left-0 mt-1">
                  {renderDropdown(item.dropdown, 1)}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="app__navbar-menu lg:hidden">
          <HiMenuAlt4 onClick={() => setToggle(true)} />

          {toggle && (
            <motion.div
              whileInView={{ x: [200, 0] }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="motion__div z-[999]"
            >
              <HiX onClick={() => setToggle(false)} />
              <div className="app__flex small__menu gap-6">
                {links.map((item) => (
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

      <div className="w-full h-20 md:h-auto md:basis-3/12 lg:basis-2/12 flex justify-end">
        {isLoggedIn ? (
          <div
            onClick={handleInitialsClick} // Navigate to the appropriate profile
            className="app__flex bg-black text-white text-lg font-bold px-8 py-3 rounded-none w-full lg:w-auto lg:rounded h-20 lg:h-auto justify-center items-center cursor-pointer"
          >
            {initials} {/* Display user initials */}
          </div>
        ) : (
          <Link
            to="/login"
            className="app__flex bg-black text-white text-lg font-bold px-8 py-3 rounded-none w-full lg:w-auto lg:rounded h-20 lg:h-auto"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;


