import { useState, useEffect } from "react";
import { FaFileAlt, FaTruck, FaFileArchive } from "react-icons/fa";
import { toast } from 'sonner';

import { DashboardHeader, ShipperApplicationList } from '../../components';
import { getStats } from '../../services/freightStatServices';


const MainDashboard = () => {
  const [value, setValue] = useState({});

  useEffect(() => {
    getStats()
      .then(res => {
        setValue(res.data.data);
      })
      .catch(err => {
        toast.error(
          err?.response?.data?.message ||
          "Failed to fetch dashboard stats. Please try again."
        );
      });
  }, []);

  const statCards = [
    { title: 'FREIGHTS REQUESTED', value: value.total_submitted, change: '', icon: <FaTruck /> },
    { title: 'FREIGHT SHEETS CONFIRMED', value: value.total_approved, change: `${value.approved_percent}%`, icon: <FaFileAlt /> },
    { title: 'FREIGHT PENDING APPROVAL', value: value.total_pending, change: `${value.pending_percent}%`, icon: <FaFileAlt /> },
    { title: 'FREIGHT SHEETS REJECTED', value: value.total_rejected, change: `${value.rejected_percent}%`, icon: <FaFileArchive /> },
  ];

  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />

       <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Shipper’s Service
        </h2>
        <p className="text-lg text-gray-600">
          12 Requests completed 
          <span className="text-sm text-green-500 ml-2">
           +3.01 % in 2nd Quarter 2025
          </span>
        </p>
      </div>

      {/* Stat Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full">
       {statCards.map((card, index) => {

            return (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between w-full">
                <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-bold">{card.value}</p>
                <p className="text-sm text-blue-600">{card.change}</p>
                </div>
                <div className="text-2xl text-blue-500">
                {card.icon}
                </div>
            </div>
            );
        })}
        </div>
          <h2 className="text-[#005baa] text-lg font-semibold flex items-center mb-4">
          <svg className="w-5 h-5 mr-2 text-[#005baa]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v14h14v-5a1 1 0 112 0v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm17.707 1.707a1 1 0 00-1.414-1.414L16 7.586 14.707 6.293a1 1 0 10-1.414 1.414L14.586 9l-1.293 1.293a1 1 0 101.414 1.414L16 10.414l1.293 1.293a1 1 0 001.414-1.414L17.414 9l1.293-1.293z"/>
          </svg>
          Recent Activities
        </h2>
        <ShipperApplicationList  />
    </main>
  )
}

export default MainDashboard

