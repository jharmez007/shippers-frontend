import { useState } from "react";
// import { toast } from 'sonner';

import { ApplicationCard } from "..";
// import { getFreightApplications } from '../../services/shipperFreightServices';

// Use mock data directly
const mockApplications = [
  { id: 1, status: 'Pending', amount: '$234,898.00', date: '5th January 2024' },
  { id: 2, status: 'Approved', amount: '$234,898.00', date: '5th February 2025' },
  { id: 3, status: 'Rejected', amount: '$234,898.00', date: '5th March 2025' },
  { id: 4, status: 'Recommended', amount: '$234,898.00', date: '5th April 2025' },
  { id: 5, status: 'Recommended', amount: '$234,898.00', date: '5th May 2025' },
  { id: 6, status: 'Reviewed', amount: '$234,898.00', date: '5th June 2025' },
  { id: 7, status: 'Reviewed', amount: '$234,898.00', date: '5th July 2022' },
  { id: 8, status: 'Rejected', amount: '$234,898.00', date: '5th August 2027' },
  { id: 9, status: 'Reviewed', amount: '$234,898.00', date: '5th September 2025' },
  { id: 10, status: 'Reviewed', amount: '$234,898.00', date: '5th October 2028' },
  { id: 11, status: 'Rejected', amount: '$234,898.00', date: '5th November 2022' },
  { id: 12, status: 'Reviewed', amount: '$234,898.00', date: '5th December 2021' },
  { id: 13, status: 'Approved', amount: '$234,898.00', date: '5th January 2026' },
  { id: 14, status: 'Reviewed', amount: '$234,898.00', date: '5th June 2026' },
  { id: 15, status: 'Pending', amount: '$234,898.00', date: '5th May 2026' },
  { id: 16, status: 'Approved', amount: '$234,898.00', date: '5th August 2026' },
];


const ShipperApplicationList = () => {
  // const [applications, setApplications] = useState([]);

//  useEffect(() => {
//   getFreightApplications()
//     .then(res => {
//       // Sort applications by created_at descending (latest first)
//       const sorted = [...res.data.data].sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       setApplications(sorted);
//     })
//     .catch(err => {
//       toast.error(
//         err?.response?.data?.message ||
//         "Failed to fetch dashboard stats. Please try again."
//       );
//     });
// }, []);


  const safeApplications = Array.isArray(mockApplications) ? mockApplications : [];

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [quarter, setQuarter] = useState("");
  const [status, setStatus] = useState("All");
  const [openCardId, setOpenCardId] = useState(null);

  const handleToggle = (id) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  const parseDateString = (dateStr) => {
    // Example input: "5th January 2024"
    const cleanDateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1'); // remove 'th', 'st', etc.
    return new Date(cleanDateStr);
  };


const filteredApplications = safeApplications.filter((app) => {
  const appDate = parseDateString(app.date);
  if (isNaN(appDate)) return false;

  const appYear = appDate.getFullYear().toString();
  const appMonth = (appDate.getMonth() + 1).toString().padStart(2, "0");
  const appQuarter = Math.floor(appDate.getMonth() / 3) + 1;

  const matchYear = !year || appYear === year;
  const matchMonth = !month || appMonth === month;
  const matchQuarter = !quarter || `Q${appQuarter}` === quarter;
  const matchStatus = status === "All" || !status || app.status === status;

  // Conflict check: if quarter is selected, ignore month and vice versa
  const shouldMatch = matchYear && matchStatus && (
    (!month && !quarter) || (month && matchMonth) || (quarter && matchQuarter)
  );

  return shouldMatch;
});


  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: (currentYear + 7) - 2020 + 1 }, (_, i) => (2020 + i).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const statuses = ["Pending", "Approved", "Rejected", "Recommended", "Reviewed"];

  let headerStatus = "Reviewed";
  if (status) {
    headerStatus = status;
  } else if (filteredApplications.length > 0) {
    headerStatus = filteredApplications[0].status;
  }

  return (
    <div className="px-4 py-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{headerStatus} Requests</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
      <select value={year} onChange={(e) => setYear(e.target.value)} className="px-3 py-2 border rounded">
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => {
          setMonth(e.target.value);
          setQuarter(""); // Reset quarter when month is selected
        }}
        className="px-3 py-2 border rounded"
      >
        <option value="">Month</option>
        {months.map((m, idx) => (
          <option key={m} value={m}>
            {new Date(0, idx).toLocaleString('default', { month: 'long' })}
          </option>
        ))}
      </select>

      <select
        value={quarter}
        onChange={(e) => {
          setQuarter(e.target.value);
          setMonth(""); // Reset month when quarter is selected
          setYear("");  // ✅ Reset year too
        }}
        className="px-3 py-2 border rounded"
      >
        <option value="">Quarter</option>
        {quarters.map((q) => (
          <option key={q} value={q}>{q}</option>
        ))}
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-3 py-2 border rounded">
        <option value="All">Status</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>


      {/* Header */}
      <div className="flex font-bold px-6 pb-2 text-gray-600 border-b">
        <div className="w-10">No.</div>
        <div className="flex w-full">
          <div className="w-full sm:w-1/4 ml-4">Request Title</div>
          <div className="w-full sm:w-1/4 ml-4">Shipper</div>
          <div className="w-full sm:w-1/4 ml-7">Date</div>
          <div className="w-full sm:w-1/4 pl-6">Status</div>
        </div>
        <div className="min-w-[160px] text-right">Amount Requested</div>
        <div className="min-w-[160px] text-right">Action</div>
      </div>

      {/* Application List */}
      {filteredApplications.length > 0 ? (
        filteredApplications.map((application, index) => (
          <ApplicationCard
            key={application.id}
            application={application}
            isOpen={openCardId === application.id}
            onToggle={() => handleToggle(application.id)}
            index={index + 1}
          />
        ))
      ) : (
        <div className="text-center py-10 text-gray-400">No applications found.</div>
      )}
    </div>
  );
};

export default ShipperApplicationList;
