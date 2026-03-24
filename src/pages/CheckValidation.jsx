// src/pages/Signup.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { checkStatus } from "../services/checkStatusServices";
import Loader from "../components/Loader"; // Import the Loader component

const CheckValidation = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate(); // Initialize the navigate function
  const [loading, setLoading] = useState(false); // State to manage the loader

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await checkStatus({ email }); // Pass the email to checkStatus

        console.log("Response from checkStatus:", response);

        const { is_validated } = response?.data?.data;

        if (is_validated) {
          setLoading(true); // Show the loader
          clearInterval(interval); // Stop the interval once validated

          setLoading(false); // Hide the loader after delay
          navigate("/login"); // Redirect to login
        }
      } catch (error) {
        console.error("Failed to check user status:", error);
      }
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [email, navigate]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow max-w-lg space-y-6">
      {loading && <Loader />} {/* Show the loader when loading */}
      <h1 className="text-center text-4xl font-bold">Your Account has been Created</h1>
      <p className="text-center text-2xl text-gray-500 mb-8 tracking-widest">
        It Awaits NSC Validation. Check Email for Response.
      </p>

      <Link
        to="/home"
        className="w-full max-w-[400px] md:max-w-[600px] bg-[#3d5afe] text-white py-4 mt-4 text-lg text-center font-semibold tracking-widest hover:bg-blue-700 transition-all duration-200"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default CheckValidation;
