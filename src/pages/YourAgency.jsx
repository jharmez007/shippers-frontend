import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Loader } from "../utils/loader";
import { GovernmentUserOptions } from "../constants/dummy";


const YourAgency = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(""); 
  const navigate = useNavigate(); 

  const handleProceed = () => {
    if (!userType) {
      toast.error("Please select a user type before proceeding");
      return;
    }

    
    Loader(); 
    navigate("/whoareyou/signup", { state: { userType } });
  };

   const handleSelect = (value) => {
    setUserType(value);
    setIsOpen(false);
  };

  const selectedLabel = GovernmentUserOptions.find((opt) => opt.value === userType)?.label || "Select agency from list below";

   return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">Select Agency from dropdown</h1>

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
            {GovernmentUserOptions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.value)}
                className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all ${
                  userType === item.value ? "bg-blue-50 border-l-4 border-blue-500" : ""
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
          userType
            ? 'bg-[#3d5afe] hover:bg-blue-700'
            : 'bg-[#C8DCEA] cursor-not-allowed'
        }`}
        disabled={!userType}
      >
        Proceed
      </button>
    </div>
  );
};

export default YourAgency;
