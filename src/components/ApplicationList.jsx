import { useEffect, useState } from 'react';
import { getFreightApplications } from '../services/bankFreightServices';
import { ApplicationDetailModal } from '../components';

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

      {/* Pagination Tabs */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white transition`}
            >
              {page}
            </button>
          ))}
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