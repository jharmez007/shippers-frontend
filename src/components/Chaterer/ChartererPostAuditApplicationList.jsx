import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button, Select } from "../component";
import { CustomTab, ChartererPostAuditApplicationDetailModal } from ".."; 
import { getPostAuditApplications } from "../../services/chatererServices";

const ITEMS_PER_PAGE = 10;
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const statusTypes = ["All", "Pending", "Approved", "Rejected"];

const quarterMonths = {
  Q1: [1, 2, 3],
  Q2: [4, 5, 6],
  Q3: [7, 8, 9],
  Q4: [10, 11, 12]
};

const ChartererPostAuditApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [status, setStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Modal
  const [open, setOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getPostAuditApplications();
        if (res?.data?.data) {
          // Sort applications by date (newest first)
          const sorted = [...res.data.data].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setApplications(sorted);
        } else {
          setApplications([]);
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch applications.");
      }
    };

    fetchApplications();
  }, []);

  const parseDateString = (dateStr) => {
    if (!dateStr) return new Date(""); 
    const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1");
    return new Date(cleanDateStr);
  };

  const handleQuarterChange = (value) => {
    setQuarter(value);
    setMonth("");
  };

  const handleMonthChange = (value) => {
    setMonth(value);
    setQuarter("");
  };

  const filteredData = useMemo(() => {
    return applications.filter((app) => {
      const appDate = parseDateString(app.date || app.created_at);
      if (isNaN(appDate)) return false;

      const appYear = appDate.getFullYear();
      const appMonth = appDate.getMonth() + 1;

      const yearMatch = !year || appYear.toString() === year;
      const monthMatch = !month || appMonth === parseInt(month, 10);
      const quarterMatch = !quarter || quarterMonths[quarter]?.includes(appMonth);
      const statusMatch = status === "All" || app.status === status;

      return yearMatch && monthMatch && quarterMatch && statusMatch;
    });
  }, [applications, year, month, quarter, status]);

  useEffect(() => {
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [filteredData]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleOpenModal = (id) => {
    setSelectedAppId(id);
    setOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-4"
    >
      {/* Tabs & Actions */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <CustomTab
          selectedType={status}
          setSelectedType={setStatus}
          submissionTypes={statusTypes}
        />
        <div className="flex gap-3">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-primary text-white hover:bg-green-700"
          >
            {showFilters ? "Hide Filters" : "More Filters"}
          </Button>
          <Button
            onClick={() => {
              setYear("");
              setMonth("");
              setQuarter("");
              setStatus("All");
            }}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            Reset Filters
          </Button>
        </div>
      </div>

      {/* More Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          <Select onValueChange={setYear} value={year} placeholder="Year">
            {[2025, 2024, 2023, 2022].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </Select>
          <Select onValueChange={handleQuarterChange} value={quarter} placeholder="Quarter">
            {["Q1", "Q2", "Q3", "Q4"].map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </Select>
          <Select onValueChange={handleMonthChange} value={month} placeholder="Month">
            {monthNames.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </Select>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex justify-center items-center h-40 text-gray-500 text-lg font-semibold">
          No applications found
        </div>
      ) : (
        <>
          <div className="overflow-auto custom-scrollbar shadow rounded-lg border bg-white max-h-[470px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">NO.</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">VESSEL NAME</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">VOYAGE NUMBER</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">DATE</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">STATUS</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((app, index) => {
                  const appDate = parseDateString(app.created_at);
                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition"
                      onClick={() => setOpen(true)}
                    >
                      <td className="px-6 py-4">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td className="px-6 py-4 font-medium">{app.vessel_name}</td>
                      <td className="px-6 py-4">{app.voyage_number}</td>
                      <td className="px-6 py-4">{appDate.toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm px-3 py-1 rounded-full font-semibold 
                          ${app.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : app.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          onClick={() => handleOpenModal(app.id)}
                          className="bg-primary text-white px-4 py-1 rounded hover:bg-green-700"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page <strong className="text-blue-600">{currentPage}</strong> of{" "}
              <strong className="text-blue-600">{totalPages}</strong>
            </span>
            <Button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </Button>
          </div>

          {/* Modal */}
          <ChartererPostAuditApplicationDetailModal
            isOpen={open}
            onClose={() => setOpen(false)}
            applicationId={selectedAppId}
          />
        </>
      )}
    </motion.div>
  );
};

export default ChartererPostAuditApplicationList;
