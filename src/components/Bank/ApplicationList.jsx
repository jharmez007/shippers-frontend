import { useEffect, useState } from 'react';
import { getFreightApplications } from '../../services/bankFreightServices';
import { ApplicationDetailModal } from '..';

const ITEMS_PER_PAGE = 8;

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    getFreightApplications().then(res => {
      setApplications(res.data.data)
      setCurrentPage(1);
    });
  }, []);

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const paginatedApps = applications.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📦 Freight Rate Applications</h2>
      <div className="overflow-auto shadow-lg rounded-lg border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {['Title', 'CCI Number', 'Status', 'Shipper', 'Created At', 'Action'].map((h, i) => (
                <th key={i} className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedApps.map(app => (
              <tr key={app.application_id} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                <td className="px-6 py-4">{app.title}</td>
                <td className="px-6 py-4">{app.cci_number}</td>
                <td className="px-6 py-4">
                  <span
                    className={
                      `capitalize px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        app.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : app.status === "pending"
                          ? "bg-blue-100 text-blue-800"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`
                    }
                  >
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4">{app.shipper_name}</td>
                <td className="px-6 py-4">{new Date(app.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 text-white rounded-lg shadow-sm"
                    onClick={() => setSelectedApp(app.application_id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    {/* Enhanced Pagination */}
    {totalPages > 1 && (
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition 
            ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        <span className="text-sm text-gray-700 font-medium">
          Page <span className="text-blue-600">{currentPage}</span> of <span className="text-blue-600">{totalPages}</span>
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition 
            ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )}

      {selectedApp && (
        <ApplicationDetailModal
          applicationId={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
};

export default ApplicationList