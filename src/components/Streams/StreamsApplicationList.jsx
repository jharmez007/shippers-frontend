import { useEffect, useState } from 'react';
import { StreamsApplicationDetailModal } from '..';
import {CustomDropdown} from '../';

const ITEMS_PER_PAGE = 10;
const submissionTypes = ["All", "KPI", "Throughput", "Shipping Lines", "Tariffs", "SOP"];

const dummySubmissions = [
  {
    id: 1,
    type: "KPI",
    code: "kpi_001",
    service: "General Cargo",
    application_status: "pending",
    created_at: "2025-06-05T12:00:00Z",
  },
  {
    id: 2,
    type: "Throughput",
    code: "tp_002",
    service: "Bulk Terminal",
    application_status: "confirmed",
    created_at: "2025-05-20T09:00:00Z",
  },
  {
    id: 3,
    type: "Shipping Lines",
    code: "sl_003",
    service: "Container Terminal",
    application_status: "pending",
    created_at: "2025-04-18T13:30:00Z",
  },
  {
    id: 4,
    type: "Tariffs",
    code: "tar_004",
    service: "RoRo Cargo",
    application_status: "confirmed",
    created_at: "2025-03-25T10:00:00Z",
  },
  {
    id: 5,
    type: "SOP",
    code: "sop_005",
    service: "General Cargo",
    application_status: "pending",
    created_at: "2025-02-10T16:45:00Z",
  },
  {
    id: 6,
    type: "KPI",
    code: "kpi_006",
    service: "Bulk Terminal",
    application_status: "confirmed",
    created_at: "2025-01-18T11:15:00Z",
  },
  {
    id: 7,
    type: "KPI",
    code: "kpi_006",
    service: "Bulk Terminal",
    application_status: "confirmed",
    created_at: "2025-01-18T11:15:00Z",
  },
  {
    id: 8,
    type: "KPI",
    code: "kpi_006",
    service: "Bulk Terminal",
    application_status: "confirmed",
    created_at: "2025-01-18T11:15:00Z",
  },
  {
    id: 9,
    type: "KPI",
    code: "kpi_006",
    service: "Bulk Terminal",
    application_status: "confirmed",
    created_at: "2025-01-18T11:15:00Z",
  },
  {
    id: 10,
    type: "KPI",
    code: "kpi_006",
    service: "Bulk Terminal",
    application_status: "confirmed",
    created_at: "2025-01-18T11:15:00Z",
  },
  {
    id: 11,
    type: "KPI",
    code: "kpi_006",
    service: "Bulk Terminal",
    application_status: "confirmed",
    created_at: "2025-01-18T11:15:00Z",
  },
];


const StreamsApplicationList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const sorted = [...dummySubmissions].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setSubmissions(sorted);
    setFiltered(sorted);
  }, []);

  useEffect(() => {
    if (selectedType === "All") {
      setFiltered(submissions);
    } else {
      const filteredByType = submissions.filter(sub => sub.type === selectedType);
      setFiltered(filteredByType);
    }
    setCurrentPage(1);
  }, [selectedType, submissions]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <svg className="w-5 h-5 mr-2 text-[#000]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 4a1 1 0 011-1h6a1 1 0 110 2H5v14h14v-5a1 1 0 112 0v6a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm17.707 1.707a1 1 0 00-1.414-1.414L16 7.586 14.707 6.293a1 1 0 10-1.414 1.414L14.586 9l-1.293 1.293a1 1 0 101.414 1.414L16 10.414l1.293 1.293a1 1 0 001.414-1.414L17.414 9l1.293-1.293z"/>
          </svg>
          All Submissions
        </h2>

        {/* Dropdown filter */}
        <CustomDropdown
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          submissionTypes={submissionTypes}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex justify-center items-center h-40 text-gray-500 text-lg font-semibold">
          No submissions available for this category
        </div>
      ) : (
        <>
          <div className="overflow-auto custom-scrollbar shadow rounded-lg border bg-white max-h-[470px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map(sub => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition" onClick={() => setSelectedApp(sub.id)}>
                    <td className="px-6 py-4 font-medium">{sub.type}</td>
                    <td className="px-6 py-4">{sub.code}</td>
                    <td className="px-6 py-4">{sub.service}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm px-3 py-1 rounded-full font-semibold 
                        ${sub.application_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                        {sub.application_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(sub.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedApp(sub.id);
                        }}
                        className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded text-sm font-medium ${currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-700">
              Page <strong className="text-blue-600">{currentPage}</strong> of <strong className="text-blue-600">{totalPages}</strong>
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded text-sm font-medium ${currentPage === totalPages ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              Next
            </button>
          </div>

          {selectedApp && (
            <StreamsApplicationDetailModal
              applicationId={selectedApp}
              onClose={() => setSelectedApp(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default StreamsApplicationList;
