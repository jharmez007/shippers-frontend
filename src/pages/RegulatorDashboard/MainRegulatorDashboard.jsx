import {useState} from 'react';
import { motion } from "framer-motion";

import { DashboardHeader } from '../../components';
import { images } from '../../constants';


const MainRegulatorDashboard = () => {
    const [code, setCode] = useState("");

    const handleInputChange = (e) => {
        setCode(e.target.value);
    };

    const handleVerify = () => {
        if (!code.trim()) return;
        console.log("Verifying code:", code);
        // Call API or validation logic here
    };

  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
            Welcome back Mr. Damiet Peter 
        </h2>
        <p className="text-lg text-gray-600 mt-2">
            To the STREAMS Application
        </p>
      </div>
      
      <motion.div
        className="w-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >
        <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
        >
            <img
            src={images.shipperslog}
            alt="NSC Logo"
            className="mx-auto w-20 h-20 mb-4"
            />
            <h1 className="text-4xl font-bold text-green-700 mb-2">NSC</h1>
            <p className="text-md text-green-800 font-medium mb-6">
            VERIFY Confirmation Approval Letter
            </p>

            <input
            type="text"
            placeholder="ENTER VERIFICATION CODE HERE"
            className="w-full p-3 text-red-600 rounded-md placeholder-red-600 outline-none mb-5 text-center text-sm font-medium"
            value={code}
            onChange={handleInputChange}
            />

            <button
            onClick={handleVerify}
            disabled={!code.trim()}
            className={`w-full py-3 text-white rounded-md font-semibold transition duration-300 ${
                code.trim()
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            >
            VERIFY
            </button>
        </motion.div>
        </motion.div>
    </main>
  )
}

export default MainRegulatorDashboard
