import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaBell, FaSignOutAlt} from "react-icons/fa";


import { regulatorMainLinks, regulatorAccountLinks } from "../../constants/dummy";
import { images } from "../../constants";


const RegulatorSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
      const navigate = useNavigate(); // Initialize the navigate function
    

    const handleLogOut = () => {
      localStorage.clear()

      navigate('/login');
    }
      
    return (
      <>
        {/* Mobile toggle button */}
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-blue-700 text-white rounded-md shadow"
          >
            <FaBars />
          </button>
        </div>
  
        {/* Overlay for mobile */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          />
        )}
  
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 overflow-y-auto w-[270px] h-screen md:h-auto bg-white rounded-xl shadow-md p-4 transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:static md:translate-x-0 md:mt-8 md:ml-4`}
        >
          {/* Close icon for mobile */}
          <div className="md:hidden flex justify-end mb-4">
            <button onClick={() => setIsOpen(false)} className="text-gray-700 text-xl">
              <FaTimes />
            </button>
          </div>
  
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={images.shipperslog} alt="Shippers Logo" className="mx-auto mb-2 w-20" />
            <img src={images.logo} alt="Main Logo" className="mx-auto mb-2 w-60" />
          </div>
  
          <hr className="mb-4" />
  
          {/* Main Links */}
          <nav className="space-y-4">
            {regulatorMainLinks.map(({ name, icon: Icon, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md font-semibold transition ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 shadow'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                  }`
                }
              >
                <Icon className="text-xl" />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>
  
          <hr className="my-4" />
  
          {/* Account Setup */}
          <div>
            <h3 className="text-black font-semibold mb-3">Account Setup</h3>
            <div className="space-y-4">
              {regulatorAccountLinks.map(({ name, icon: Icon, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md font-semibold transition ${
                      isActive
                        ? 'bg-blue-100 text-blue-600 shadow'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                    }`
                  }
                >
                  <Icon className="text-xl" />
                  <span>{name}</span>
                </NavLink>
                
              ))}
              <button
              onClick={handleLogOut}
              className="flex items-center gap-3 px-4 py-2 rounded-md text-gray-600 font-semibold hover:text-blue-600 hover:bg-gray-100 w-full"
              >
                <FaSignOutAlt />
                <span>Log out</span>
              </button>
            </div>
          </div>
  
          {/* Enable Notifications */}
          <div className="mt-auto pt-6">
            <div className="bg-indigo-50 px-4 py-3 rounded-xl text-center">
              <div className="flex justify-center mb-2">
                <div className="bg-green-500 text-white rounded-full p-2">
                  <FaBell className="text-lg" />
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">Enable notifications</p>
              <button className="bg-blue-700 text-white rounded-md px-4 py-1 text-sm font-semibold tracking-wide">
                ACTIVATE
              </button>
            </div>
          </div>
        </aside>
      </>
    );
}

export default RegulatorSidebar
