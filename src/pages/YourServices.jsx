import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

import { Loader } from "../utils/loader";
import { individualUserOptions, coporateUserOptions } from "../constants/dummy";


const YourServices = () => {
  const location = useLocation();
  const userType = location.state?.userType;

  const [isOpen, setIsOpen] = useState(false);
  const [userService, setUserService] = useState(""); 
  const navigate = useNavigate(); 

  // Filter options based on userType
  let userOptions = [];
  if (userType === "individual") {
    userOptions = individualUserOptions
  } else if (userType === "corporate") {
    userOptions = coporateUserOptions
  }

  const handleProceed = () => {
    if (!userService) {
      toast.error("Please select a user type before proceeding");
      return;
    }

    // Store userService in localStorage
    localStorage.setItem("userService", userService);

    Loader(); 
     if (userService !== "terminal" && userType === "individual") {
      navigate("/whoareyou/your-bvn");
    } else if (userService !== "terminal" && userType === "corporate") {
        navigate("/whoareyou/your-tin");
    } else {
      navigate("/whoareyou/your-complex");
    }
  };

   const handleSelect = (value) => {
    setUserService(value);
    setIsOpen(false);
  };

  const selectedLabel = userOptions.find((opt) => opt.value === userService)?.label || "What service do you provide?";

   return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">What service do you provide?</h1>

      <div className="relative w-[300px] md:w-[400px] mb-10 font-medium">
        {/* Dropdown Trigger */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex  w-full p-3 pr-10 border-2 border-gray-300 rounded-xl text-gray-700 text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 appearance-none bg-white shadow transition-all duration-200"
        >
          <span className='flex-1'>{selectedLabel}</span>
          <ChevronDown className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="bg-white shadow-lg rounded-b-xl border-t-0 border border-gray-200 max-h-96 overflow-y-auto z-10 absolute w-full left-0">
            {userOptions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.value)}
                className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all ${
                  userService === item.value ? "bg-blue-50 border-l-4 border-blue-500" : ""
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Button */}
      <button
        onClick={handleProceed}
        className={`w-[300px] md:w-[360px] rounded-md py-3 font-semibold text-white text-sm transition-all duration-200 ${
          userService
            ? 'bg-[#3d5afe] hover:bg-blue-700'
            : 'bg-[#C8DCEA] cursor-not-allowed'
        }`}
        disabled={!userService}
      >
        Proceed
      </button>
    </div>
  );
};

export default YourServices;
