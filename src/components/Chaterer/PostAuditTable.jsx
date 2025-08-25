import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../component";

import { ChartererPostAuditApplicationDetailModal } from ".."; 

const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-800",
  Approved: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  Validated: "bg-blue-100 text-blue-800",
};

  const data = [
    { id: 1, request: "Request Name", name: "Name", date: "5th June 2025", status: "Pending" },
    { id: 2, request: "Request Name", name: "Name", date: "5th June 2025", status: "Rejected" },
    { id: 3, request: "Request Name", name: "Name", date: "5th June 2025", status: "Validated" },
  ];

const PostAuditTable = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="overflow-auto shadow rounded-lg border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">NO.</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">REQUEST NAME</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">NAME</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">DATE</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">STATUS</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={row.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium">{row.request}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-semibold ${statusClasses[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Button
                   onClick={() => setOpen(true)}
                    className="bg-primary text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ChartererPostAuditApplicationDetailModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </motion.div>
  );
};

export default PostAuditTable;
