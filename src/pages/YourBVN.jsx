import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { preSignup } from '../services/signupServices';


import { Loader } from "../utils/loader";

const YourBVN = () => {
  const [bvn, setBvn] = useState(""); 
  const navigate = useNavigate(); 
  const userService = localStorage.getItem("userService");
  const userType = localStorage.getItem("userType");

  const handleProceed = async () => {
    if (!bvn) {
      toast.error("Please enter your BVN before proceeding");
      return;
    }

    try {
          const payload = {
            user_type: userService,
            is_corporate: userType === "individual",
            bvn: bvn,
          };
    
          const response = await preSignup(payload);

          const address = response?.data?.data?.address;
          const email = response?.data?.data?.email;
          const first_name = response?.data?.data?.first_name;
          const last_name = response?.data?.data?.last_name;
          const phone_number = response?.data?.data?.phone_number;
          const lookup_token = response?.data?.lookup_token;

          if (response.status === 200) {
            // Save session info
            localStorage.setItem("address", address);
            localStorage.setItem("email", email);
            localStorage.setItem("first_name", first_name);
            localStorage.setItem("last_name", last_name);
            localStorage.setItem("phone_number", phone_number);
            localStorage.setItem("lookup_token", lookup_token);
            toast.success("BVN verified successfully");
            Loader(); 
            navigate("/whoareyou/signup", { state: { bvn } });
          } else {
            toast.error("Failed to verify BVN. Please try again.");
            return;
          }
        } catch (error) {
          if (error.response?.status === 401) {
            toast.error("Failed to verify BVN.");
          } else {
            toast.error("Error connecting to the server. Please try again later.");
            console.error("Login error:", error);
          }
        }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">Individual</h1>

      <div className="relative w-[300px] md:w-[400px] mb-10 font-medium">
        <input
          type="text"
          value={bvn}
          onChange={e => setBvn(e.target.value)}
          placeholder="Enter your BVN"
          className="w-full p-3 pr-10 border-2 border-gray-300 rounded-xl text-gray-700 text-center focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white shadow transition-all duration-200"
        />
      </div>

      {/* Next Button */}
      <button
        onClick={handleProceed}
        className={`w-[300px] md:w-[360px] rounded-md py-3 font-semibold text-white text-sm transition-all duration-200 ${
          bvn
            ? 'bg-[#3d5afe] hover:bg-blue-700'
            : 'bg-[#C8DCEA] cursor-not-allowed'
        }`}
        disabled={!bvn}
      >
        Proceed
      </button>
    </div>
  );
};

export default YourBVN;
