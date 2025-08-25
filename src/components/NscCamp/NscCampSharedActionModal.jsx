import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Modal, ConfirmModal } from "..";
import { reviewContainers, contestContainers, consentContainers } from "../../services/nscCampServices"; 

const NscCampSharedActionModal = ({ isOpen, onClose, action, container, onStatusChange }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [reason, setReason] = useState(""); 

  useEffect(() => {
    if (!isOpen) {
      setShowConfirm(false);
      setPendingAction(null);
      setReason(""); 
    }
  }, [isOpen]);

  const isModalDisabled = showConfirm;

  // Accept reason from ConfirmModal
  const confirmStatusChange = async (inputReason) => {
    if (!pendingAction) return;

    let newStatus = "";
    let actionLabel = "";

    if (pendingAction === "Mark as Contested") {
      newStatus = "contested";
      actionLabel = "Mark as Contested";
      // Call backend to mark as contested, pass reason if needed
      const res = await contestContainers({ id: container.id, remarks: inputReason || reason });
      if (res.status === 200 || res.status === 201) {
        onStatusChange(container.id, newStatus);
        toast.success(`${actionLabel} - Success`, {
          description: (
            <>
              Container <span className="font-bold">{container.containerNumber || container.container_no}</span> is now {newStatus}
            </>
          ),
        });
      } else {
        toast.error(res.message || "Failed to mark as contested.");
      }
    } else if (pendingAction === "Mark as Pending") {
      newStatus = "pending";
      actionLabel = "Mark as Pending";
      // Call backend to mark as under_review
      const res = await reviewContainers({ id: container.id });
      if (res.status === 200 || res.status === 201) {
        onStatusChange(container.id, "under_review");
        toast.success(`${actionLabel} - Success`, {
          description: (
            <>
              Container <span className="font-bold">{container.container_no}</span> is now Pending
            </>
          ),
        });
      } else {
        toast.error(res.message || "Failed to mark as pending.");
      }
    } else if (pendingAction === "Mark as Recommended") {
      newStatus = "recommended";
      actionLabel = "Mark as Recommended";
      // Call backend to mark as consented
      const res = await consentContainers({ id: container.id });
      if (res.status === 200 || res.status === 201) {
        onStatusChange(container.id, "consented");
        toast.success(`${actionLabel} - Success`, {
          description: (
            <>
              Container <span className="font-bold">{container.container_no}</span> is now Recommended
            </>
          ),
        });
      } else {
        toast.error(res.message || "Failed to mark as pending.");
      }
    }

    setPendingAction(null);
    setShowConfirm(false);
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
            {container?.container_no && (
              <p className="text-sm text-gray-500">
                Container No:{" "}
                <span className="font-medium">{container.container_no}</span>
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
                <span className="font-medium">Status:</span>{" "}
                {(container.status && container.status.toLowerCase() === "under_review"
                  ? "Pending"
                  : container.status?.charAt(0).toUpperCase() + container.status?.slice(1))}
              </p>
              <p>
                <span className="font-medium">Date Flagged:</span>{" "}
                {container.created_at || "N/A"}
              </p>
              <p>
                <span className="font-medium">Reason:</span>{" "}
                {container.reason_for_flagging || "N/A"}
              </p>
            </div>

            {/* Status-based Action Buttons */}
            <div className={`mt-6 flex flex-wrap gap-3 justify-end ${isModalDisabled ? "pointer-events-none opacity-60" : ""}`}>
              {container.status === "flagged" && (
                <>
                  <button
                    onClick={() => {
                      setPendingAction("Mark as Contested");
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Contest
                  </button>
                  <button
                    onClick={() => {
                      setPendingAction("Mark as Pending");
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-yellow-600 text-white text-sm font-medium hover:bg-yellow-700 transition"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => {
                      setPendingAction("Mark as Recommended");
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-yellow-700 transition"
                  >
                    Recommend
                  </button>
                </>
              )}

              {(container.status === "pending" || container.status === "under_review") && (
               <>
                  <button
                    onClick={() => {
                      setPendingAction("Mark as Contested");
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Contest
                  </button>
                  <button
                    onClick={() => {
                      setPendingAction("Mark as Recommended");
                      setShowConfirm(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition"
                  >
                    Recommend
                  </button>
                </>
              )}
            </div>
          </>
        )}

        {/* Upload Document Section */}
        {/* {(action === "Upload Document" || action === "Upload Response") && (
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
        )} */}
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
              <span className="font-bold">{container.containerNumber || container.container_no}</span>?
              This action cannot be undone.
            </>
          ) : ""
        }
        confirmText="Yes, Proceed"
        cancelText="Cancel"
        onReasonChange={setReason} 
      />
    </>
  );
};

export default NscCampSharedActionModal;
