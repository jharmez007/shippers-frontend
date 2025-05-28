import { useState, useEffect } from "react";
import { FaFileAlt, FaTruck, FaFileArchive } from "react-icons/fa";

import { DashboardHeader } from '../../components';
import { getStats } from '../../services/freightStatServices';


const MainDashboard = () => {
  const [value, setValue] = useState({});

  useEffect(() => {
    getStats().then(res => {
      setValue(res.data.data)
    });
  }, []);

  const statCards = [
    { title: 'FREIGHTS REQUESTED', value: value.total_submitted, change: '', icon: <FaTruck /> },
    { title: 'FREIGHT SHEETS CONFIRMED', value: value.total_approved, change: `${value.approved_percent}%`, icon: <FaFileAlt /> },
    { title: 'FREIGHT PENDING APPROVAL', value: value.total_pending, change: `${value.pending_percent}%`, icon: <FaFileAlt /> },
    { title: 'FREIGHT SHEETS REJECTED', value: value.total_rejected, change: `${value.rejected_percent}%`, icon: <FaFileArchive /> },
  ];

  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Stat Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
       {statCards.map((card, index) => {

            return (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
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

      {/* <section className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ You completed a task yesterday.</li>
          <li>📈 Your performance increased by 12% this week.</li>
          <li>📬 You received 3 new messages.</li>
        </ul>
      </section>   */}
 
    </main>
  )
}

export default MainDashboard

