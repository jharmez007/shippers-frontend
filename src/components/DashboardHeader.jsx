import { Link } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineHome } from 'react-icons/hi';
import { FaBell } from "react-icons/fa";


const DashboardHeader = () => {
  const user_type = localStorage.getItem("user_type");
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");


  return (
    <header className="sticky top-0 backdrop-blur-md  text-white px-4 py-2 rounded-2xl">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        {/* Left Section */}
        <div>
          <h1 className="text-sm text-white/80 font-semibold">
            {user_type}
          </h1>
          <h1 className="text-lg font-bold mt-1">
            {user_type === "terminal" ? "STREAMS Portal" : "CRD Portal"}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
          <div className="flex gap-3 items-center text-white mt-2 sm:mt-0">
            <Link to="/home">
              <HiOutlineHome className="text-2xl cursor-pointer" />
            </Link>

            {/* Search Bar */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Type"
                className="pl-10 pr-4 py-1 rounded-xl bg-white text-black placeholder-gray-400 w-full focus:outline-none"
              />
              <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>  

          <div className="flex relative items-center gap-4 mt-2 sm:mt-0">
            <div className="flex items-center gap-2 text-white">
              <span className="font-semibold">{first_name}</span>
              <span className="text-lg">•</span>
              <span className="text-white/80">{last_name}</span>
            </div>

            <div className="ml-6 relative cursor-pointer">
              <FaBell className="text-xl text-white" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
