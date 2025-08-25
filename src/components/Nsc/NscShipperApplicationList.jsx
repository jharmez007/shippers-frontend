import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button, Select } from "../component";
import { NscShipperApplicationDetailModal } from ".."; 
import { getFreightApplications } from "../../services/nscCrdServices";

const ITEMS_PER_PAGE = 10;
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const quarterMonths = {
  Q1: [1, 2, 3],
  Q2: [4, 5, 6],
  Q3: [7, 8, 9],
  Q4: [10, 11, 12]
};

const NscShipperApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Modal
  const [open, setOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await getFreightApplications();
        if (res?.data?.data) {
          const sorted = [...res.data.data].sort(
            (a, b) => new Date(b.submitted_at) - new Date(a.submitted_at)
          );
          setApplications(sorted);
        } else {
          toast.error("Unexpected response format.");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to fetch applications.");
      }
    };

    fetchApplications();
  }, []);


  const parseDateString = (dateStr) => {
    if (!dateStr) return new Date(""); // returns Invalid Date safely
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
      const appDate = parseDateString(app.date || app.submitted_at);
      if (isNaN(appDate)) return false;

      const appYear = appDate.getFullYear();
      const appMonth = appDate.getMonth() + 1;

      const yearMatch = !year || appYear.toString() === year;
      const monthMatch = !month || appMonth === parseInt(month, 10);
      const quarterMatch = !quarter || quarterMonths[quarter]?.includes(appMonth);

      return yearMatch && monthMatch && quarterMatch;
    });
  }, [applications, year, month, quarter]);

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

  // 🔹 Status renderer based on pick_status
  const renderStatus = (app) => {
    if (app.pick_status === "picked") {
      return (
        <span className="text-sm px-3 py-1 rounded-full font-semibold bg-blue-100 text-blue-800">
          Under Review
        </span>
      );
    }
    if (app.pick_status === null) {
      return (
        <span className="text-sm px-3 py-1 rounded-full font-semibold bg-yellow-100 text-yellow-800">
          Awaiting Review
        </span>
      );
    }
    // fallback if backend starts returning "approved" / "rejected"
    if (app.status === "approved") {
      return (
        <span className="text-sm px-3 py-1 rounded-full font-semibold bg-green-100 text-green-800">
          Approved
        </span>
      );
    }
    if (app.status === "rejected") {
      return (
        <span className="text-sm px-3 py-1 rounded-full font-semibold bg-red-100 text-red-800">
          Rejected
        </span>
      );
    }
    return (
      <span className="text-sm px-3 py-1 rounded-full font-semibold bg-gray-100 text-gray-700">
        {app.status || "Unknown"}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-4"
    >
      {/* Actions */}
      <div className="flex justify-start items-center mb-6 gap-4">
        <div className="flex gap-3">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-primary text-white hover:bg-green-700"
          >
            {showFilters ? "Hide Filters" : "Filters"}
          </Button>
          <Button
            onClick={() => {
              setYear("");
              setMonth("");
              setQuarter("");
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
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">REQUEST TITLE</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">SHIPPER</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">DATE</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">STATUS</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">CCI NUMBER</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((app, index) => {
                  const appDate = parseDateString(app.date || app.submitted_at);
                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-gray-50 transition"
                      onClick={() => handleOpenModal(app.id)}
                    >
                      <td className="px-6 py-4">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                      <td className="px-6 py-4 font-medium">{app.title}</td>
                      <td className="px-6 py-4">{app.shipper_name}</td>
                      <td className="px-6 py-4">
                        {isNaN(appDate) ? "-" : appDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{renderStatus(app)}</td>
                      <td className="px-6 py-4">{app.cci_number}</td>
                      <td className="px-6 py-4 text-center">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(app.id);
                          }}
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
          <NscShipperApplicationDetailModal
            isOpen={open}
            onClose={() => setOpen(false)}
            applicationId={selectedAppId}
          />
        </>
      )}
    </motion.div>
  );
};

export default NscShipperApplicationList;
