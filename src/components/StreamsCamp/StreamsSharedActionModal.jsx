import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  X,
  File,
  Clock,
  Flag,
  FileEdit,
  CheckCircle
} from "lucide-react";

import { Modal } from "..";

// Dummy activity log data for now
const mockActivityLogs = [
  {
    status: "Flagged",
    actor: "Maritime Police",
    timestamp: "2025-07-25 09:30 AM",
  },
  {
    status: "Contested",
    actor: "NSC",
    timestamp: "2025-07-26 02:15 PM",
  },
  {
    status: "Released",
    actor: "Maritime Police",
    timestamp: "2025-07-27 11:00 AM",
  },
];

const statusColor = {
  Flagged: "bg-red-500",
  Contested: "bg-yellow-500",
  Released: "bg-green-500",
};

const StreamsSharedActionModal = ({ isOpen, onClose, action, container }) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (!isOpen) setDocument(null);
  }, [isOpen]);

  const handleUpload = () => {
    if (!document) {
      toast.error("Please select a document to upload.");
      return;
    }

    toast.success(`${action} Success`, {
      description: `Document uploaded for ${container.containerNumber}`,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{action}</h2>
          {container?.containerNumber && (
            <p className="text-sm text-gray-500">
              Container No:{" "}
              <span className="font-medium">{container.containerNumber}</span>
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* View Details */}
      {action === "View Container" && (
        <>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 text-sm text-gray-700 mb-6">
            <p>
              <span className="font-medium">Terminal:</span> {container.terminal}
            </p>
            <p>
              <span className="font-medium">Status:</span> {container.status}
            </p>
            <p>
              <span className="font-medium">Date Flagged:</span>{" "}
              {container.dateFlagged || "N/A"}
            </p>
            <p>
              <span className="font-medium">Reason:</span>{" "}
              {container.reason || "N/A"}
            </p>
          </div>

          {/* Activity Timeline */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Activity Timeline
            </h3>
            <div className="relative border-l-2 border-gray-200 space-y-6 pl-6">
              {(container.activityLogs || mockActivityLogs).map((log, idx) => {
                const isLast = idx === (container.activityLogs || mockActivityLogs).length - 1;

                let icon = <Clock className="w-4 h-4" />;
                let iconBg = "bg-gray-400";
                let textColor = "text-gray-700";

                if (log.status === "Flagged") {
                  icon = <Flag className="w-4 h-4 text-white" />;
                  iconBg = "bg-red-600";
                } else if (log.status === "Contested") {
                  icon = <FileEdit className="w-4 h-4 text-white" />;
                  iconBg = "bg-yellow-500";
                } else if (log.status === "Released") {
                  icon = <CheckCircle className="w-4 h-4 text-white" />;
                  iconBg = "bg-green-600";
                }

                return (
                  <div key={idx} className="relative">
                    {/* Circle Icon */}
                    <div
                      className={`absolute -left-[1.05rem] top-0 w-6 h-6 flex items-center justify-center rounded-full ${iconBg}`}
                    >
                      {icon}
                    </div>

                    <div className={`pl-2`}>
                      <p className={`text-sm font-medium ${textColor}`}>
                        {log.status}{" "}
                        <span className="text-xs text-gray-500 italic">
                          by {log.actor}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {log.timestamp}
                      </p>
                    </div>

                    {/* Connecting line */}
                    {!isLast && (
                      <span className="absolute left-2.5 top-6 h-full w-0.5 bg-gray-200"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Upload Section */}
      {(action === "Upload Document" || action === "Upload Response") && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload PDF or Image
            </label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={(e) => setDocument(e.target.files[0])}
              className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
            />
            {document && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <File className="w-4 h-4 text-gray-500" />
                <span className="truncate">{document.name}</span>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpload}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default StreamsSharedActionModal;
