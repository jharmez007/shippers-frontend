import { X, File } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Modal, ConfirmModal } from "..";

const SharedActionModal = ({ isOpen, onClose, action, container, onStatusChange }) => {
  const [document, setDocument] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (!isOpen) setDocument(null);
    // When main modal closes, also close confirm modal and clear pendingAction
    if (!isOpen) {
      setShowConfirm(false);
      setPendingAction(null);
    }
  }, [isOpen]);

  // Prevent background modal interaction when confirm modal is open
  const isModalDisabled = showConfirm;

  const confirmStatusChange = () => {
    if (!pendingAction) return;

    let newStatus = "";
    let actionLabel = "";

    if (pendingAction === "Mark as Released") {
      newStatus = "Released";
      actionLabel = "Mark as Released";
    } else if (pendingAction === "Mark as Confiscated") {
      newStatus = "Confiscated";
      actionLabel = "Mark as Confiscated";
    }

    if (newStatus) {
      onStatusChange(container.id, newStatus);
      toast.success(`${actionLabel} - Success`, {
        description: (
          <>
            Container <span className="font-bold">{container.containerNumber}</span> is now {newStatus}
          </>
        ),
      });
    }

    setPendingAction(null);
    setShowConfirm(false);
    onClose(); // <-- Close the main modal as well to prevent resubmissions
  };

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
    <>
      <Modal isOpen={isOpen} onClose={isModalDisabled ? () => {} : onClose}>
        {/* Overlay a semi-transparent layer when confirm modal is open */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 bg-black/30 pointer-events-auto" />
        )}

        {/* Header */}
        <div className={`flex justify-between items-start mb-6 ${isModalDisabled ? "pointer-events-none opacity-60" : ""}`}>
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
            disabled={isModalDisabled}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Container Details */}
        {action === "View Container" && (
          <>
            <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 text-sm text-gray-700 ${isModalDisabled ? "pointer-events-none opacity-60" : ""}`}>
              <p>
                <span className="font-medium">Terminal:</span>{" "}
                {container.terminal}
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

            {/* Status-based Action Buttons */}
            <div className={`mt-6 flex flex-wrap gap-3 justify-end ${isModalDisabled ? "pointer-events-none opacity-60" : ""}`}>
              {container.status === "Contested" && (
                <>
                  <button
                    onClick={() => {
                      setPendingAction("Mark as Released");
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition"
                  >
                    Mark as Released
                  </button>
                  <button
                    onClick={() => {
                      setPendingAction("Mark as Confiscated");
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
                  >
                    Mark as Confiscated
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {/* Upload Document Section */}
        {(action === "Upload Document" || action === "Upload Response") && (
          <div className={`space-y-4 ${isModalDisabled ? "pointer-events-none opacity-60" : ""}`}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload PDF or Image
              </label>
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => setDocument(e.target.files[0])}
                className="block w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
                disabled={isModalDisabled}
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
                disabled={isModalDisabled}
              >
                Upload
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmStatusChange}
        title={pendingAction}
        description={
          pendingAction ? (
            <>
              Are you sure you want to{" "}
              {pendingAction.toLowerCase()} container{" "}
              <span className="font-bold">{container.containerNumber}</span>?
              This action cannot be undone.
            </>
          ) : ""
        }
        confirmText="Yes, Proceed"
        cancelText="Cancel"
      />
    </>
  );
};

export default SharedActionModal;
