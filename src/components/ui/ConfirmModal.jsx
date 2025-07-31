import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "bg-green-600 hover:bg-green-700 focus:ring-green-500",
  action = "",
  onReasonChange, // Optional callback for reason input
}) => {
  const [reason, setReason] = useState("");

  // Reset reason when modal opens/closes
  useEffect(() => {
    if (!isOpen) setReason("");
  }, [isOpen]);

  // Determine if reason input should be shown
  const needsReason =
    (typeof title === "string" && title.toLowerCase().includes("contested")) ||
    (typeof action === "string" && action.toLowerCase().includes("contested"));

  // Handle confirm with reason if needed
  const handleConfirm = () => {
    if (needsReason && onReasonChange) {
      onReasonChange(reason);
    }
    onConfirm && onConfirm(reason);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as="div"
          open={isOpen}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClose={onClose}
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25 }}
            className="relative z-50 w-full max-w-md mx-auto rounded-2xl bg-white px-6 py-8 shadow-2xl"
          >
            <Dialog.Title className="text-xl font-semibold text-center text-gray-800">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mt-3 text-center text-sm text-gray-600">
              {description}
            </Dialog.Description>

            {needsReason && (
              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for contesting{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for contesting..."
                  required
                />
              </div>
            )}

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="w-full py-2 rounded-lg border border-gray-300 bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className={`w-full py-2 rounded-lg text-sm font-medium text-white transition focus:outline-none focus:ring-2 ${confirmColor}`}
                disabled={needsReason && !reason.trim()}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
