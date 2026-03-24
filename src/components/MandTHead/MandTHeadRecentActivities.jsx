import { useState } from "react";
import { motion } from "framer-motion";
import { SquarePen } from "lucide-react";

// Dummy data for recent activities
const activities = [
  {
    id: 1,
    type: "Freight Rate Submission",
    user: "John Doe",
    date: "2025-08-16 14:32",
    status: "Approved",
  },
  {
    id: 2,
    type: "Charter Party Submission",
    user: "Jane Smith",
    date: "2025-08-15 10:20",
    status: "Pending",
  },
  {
    id: 3,
    type: "Demurrage Submission",
    user: "Michael Johnson",
    date: "2025-08-14 09:15",
    status: "Rejected",
  },
  {
    id: 4,
    type: "Post Audit Submission",
    user: "Sarah Lee",
    date: "2025-08-13 18:45",
    status: "Approved",
  },
];

const statusColors = {
  Approved: "bg-green-100 text-green-700 border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Rejected: "bg-red-100 text-red-700 border-red-300",
};

const MandTHeadRecentActivitiesDashboard = () => {
  const [filter, setFilter] = useState("All");

  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter((act) => act.type.includes(filter));

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-xl">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SquarePen className="w-5 h-5 text-blue-700" />
          <h1 className="text-2xl font-bold text-blue-700">Recent Activities</h1>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="All">All</option>
          <option value="Freight Rate">Freight Rate</option>
          <option value="Charter Party">Charter Party</option>
          <option value="Demurrage">Demurrage</option>
          <option value="Post Audit">Post Audit</option>
        </select>
      </div>

      {/* Activity List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <ul className="divide-y divide-gray-100">
          {filteredActivities.map((activity) => (
            <motion.li
              key={activity.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">{activity.type}</p>
                <p className="text-sm text-gray-500">By {activity.user}</p>
                <p className="text-xs text-gray-400">{activity.date}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs border font-medium ${statusColors[activity.status]}`}
              >
                {activity.status}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MandTHeadRecentActivitiesDashboard;
