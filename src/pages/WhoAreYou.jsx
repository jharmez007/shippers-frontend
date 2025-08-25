import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader } from "../utils/loader";

const WhoAreYou = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!userType) {
      toast.error("Please select a user type before proceeding");
      return;
    }

    // Store userType in localStorage
    localStorage.setItem("userType", userType);
    localStorage.setItem("userService", userType);

    Loader();
    if (userType === "individual" || userType === "corporate") {
      navigate("/whoareyou/your-services", { state: { userType } });
    } else if (userType === "regulator") {
      navigate("/whoareyou/signup", { state: { userType } });
    }
  };

  const handleNscClick = () => {
    // Store NSC staff type in localStorage
    localStorage.setItem("userType", "nsc");
    localStorage.setItem("userService", "nsc");
    
    Loader();
    navigate("/whoareyou/signup");
  };

  const userOptions = [
    { value: "individual", label: "Individual" },
    { value: "corporate", label: "Corporate" },
    { value: "regulator", label: "Government" },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 bg-white px-4">
      <h1 className="text-3xl font-bold mb-6 tracking-wide">Sign Up As</h1>

      <div className="flex gap-8 mb-6">
        {userOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="userType"
              value={option.value}
              checked={userType === option.value}
              onChange={() => setUserType(option.value)}
              className="w-5 h-5 accent-black"
            />
            <span className="font-semibold text-black">{option.label}</span>
          </label>
        ))}
      </div>

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

      <button
        onClick={handleNscClick}
        className="text-xs text-red-500 underline mt-2 cursor-pointer"
      >
        Nsc staff here
      </button>
    </div>
  );
};

export default WhoAreYou;
