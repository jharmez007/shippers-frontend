import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "..";
import { Button } from "..";
import { ChevronRight, Check } from "lucide-react";

import { portComplexData, portComplexes } from "../../constants/dummy";
import { NscStreamsStatsOverview } from "..";
import { toast } from "sonner"; 
import { KPIConfirmModal } from ".."; 

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

const statusColor = {
  Submitted: "text-green-700 bg-green-100 border-green-600",
  Remind: "text-yellow-700 bg-yellow-100 border-yellow-600",
  "Past Due": "text-red-700 bg-red-100 border-red-600",
};

const calculateStats = (data) => {
  const stats = {
    total: 0,
    Submitted: 0,
    Remind: 0,
    "Past Due": 0,
  };

  Object.values(data).forEach((category) => {
    category.forEach((terminal) => {
      stats.total++;
      stats[terminal.status]++;
    });
  });

  return stats;
};

const NscKPILandingDashboard = () => {
  const [selectedPort, setSelectedPort] = useState("Apapa Port Complex");
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [showConfirm, setShowConfirm] = useState(false);
  const [activeTerminal, setActiveTerminal] = useState(null);
  const [remindedTerminals, setRemindedTerminals] = useState({}); // Keeps track of who was reminded

  const currentData = portComplexData[selectedPort];
  const stats = calculateStats(currentData);

  const handleRemindClick = (terminal) => {
    setActiveTerminal(terminal);
    setShowConfirm(true);
  };

  const sendReminder = async () => {
    setShowConfirm(false);
    toast.loading(`Sending reminder to ${activeTerminal.terminal}...`);
    
    // Simulate API call
    setTimeout(() => {
      setRemindedTerminals((prev) => ({
        ...prev,
        [activeTerminal.terminal]: true,
      }));
      toast.dismiss();
      toast.success(`Reminder sent to ${activeTerminal.terminal}`);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 space-y-6 h-[60vh] bg-gray-50 rounded-2xl overflow-y-auto custom-scrollbar"
    >
      {/* Port Tabs */}
      <div className="sticky top-0 z-10 bg-gray-50 pb-2">
        <Tabs value={selectedPort} onValueChange={setSelectedPort} className="w-full">
          <TabsList className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 bg-transparent">
            {portComplexes.map((port) => (
              <TabsTrigger
                key={port}
                value={port}
                className="px-4 py-2 rounded-t-lg text-sm font-medium transition-colors duration-200
                  data-[state=active]:bg-white
                  data-[state=active]:border-b-2
                  data-[state=active]:border-primary
                  data-[state=active]:text-primary
                  text-gray-500 hover:text-primary"
              >
                {port}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="bg-white border px-4 py-2 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-600"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-white border px-4 py-2 rounded-md shadow-sm text-sm focus:ring-2 focus:ring-blue-600"
        >
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Summary Stats */}
      <NscStreamsStatsOverview stats={stats} />

      {/* Terminal Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(portComplexData[selectedPort]).map(([category, terminals]) => (
          <div key={category} className="bg-white border rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 font-semibold border-b text-sm text-gray-700 uppercase tracking-wide">
              {category}
            </div>
            <ul>
              {terminals.map((t, idx) => {
                const isReminded = remindedTerminals[t.terminal];
                const showArrow = t.status !== "Submitted";
                return (
                  <li
                    key={t.terminal + idx}
                    className="flex justify-between items-center px-4 py-3 border-b last:border-b-0 text-sm hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-800">
                      {idx + 1}. {t.terminal}
                    </span>
                    <div className="flex gap-2 items-center">
                      <span
                        className={`border px-3 py-1 rounded-full text-xs font-semibold ${statusColor[t.status]}`}
                      >
                        {t.status}
                      </span>
                      {showArrow && (
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isReminded}
                          onClick={() => handleRemindClick(t)}
                        >
                          {isReminded ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && activeTerminal && (
        <KPIConfirmModal
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={sendReminder}
          title="Send Reminder"
          description={`Send reminder to ${activeTerminal.terminal}?`}
          confirmText="Send"
        />
      )}
    </motion.div>
  );
};

export default NscKPILandingDashboard;
