import { X, File } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Modal } from "..";

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
              Container No: <span className="font-medium">{container.containerNumber}</span>
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 text-sm text-gray-700">
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
