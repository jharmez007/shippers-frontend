import { useState, useEffect, useRef } from "react";
import {
  MoreHorizontal,
  Eye,
  Upload,
  ShieldCheck,
  Clock,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

import { ConfirmModal } from ".."

const actionIcons = {
  "View Container": <Eye className="w-4 h-4 mr-2 text-gray-500" />,
  "Upload Document": <Upload className="w-4 h-4 mr-2 text-gray-500" />,
  "Upload Response": <Upload className="w-4 h-4 mr-2 text-gray-500" />,
  "Mark as Contested": <ShieldCheck className="w-4 h-4 mr-2 text-blue-500" />,
  "Mark as Pending": <Clock className="w-4 h-4 mr-2 text-yellow-500" />,
};

const NscCampContainerActionMenu = ({ container, onModalOpen, onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const [confirmingAction, setConfirmingAction] = useState(null); // { action, status }

  const menuRef = useRef(null);

  const getAvailableActions = (status) => {
    switch (status) {
      case "Flagged":
        return [
          "View Container",
          "Upload Response",
          "Mark as Contested",
          "Mark as Pending",
        ];
      case "Contested":
        return ["View Container"];
      case "Pending":
        return [
          "View Container",
          "Upload Response",
          "Mark as Contested",
        ];
      case "Released":
        return ["View Container"];
      case "Confiscated":
        return ["View Container"];
      default:
        return ["View Container"];
    }
  };

  const handleAction = (action) => {
    setOpen(false);

    const needsModal = [
      "View Container",
      "Upload Document",
      "Upload Response",
    ];

    if (needsModal.includes(action)) {
      onModalOpen({ action, container });
      return;
    }

    if (action.startsWith("Mark as")) {
      const newStatus = action.split(" ")[2]; // e.g. Contested
      setConfirmingAction({ action, newStatus });
      return;
    }

    toast(action);
  };

  const confirmStatusChange = () => {
    if (!confirmingAction) return;

    const { newStatus, action } = confirmingAction;

    onStatusChange(container.id, newStatus);
    toast.success(`${action} - Success`, {
      description: `Container ${container.containerNumber} is now ${newStatus}`,
    });

    setConfirmingAction(null);
  };

  const cancelConfirmation = () => {
    setConfirmingAction(null);
  };

  const actions = getAvailableActions(container.status);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-30 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="py-2">
                {actions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleAction(action)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    {actionIcons[action] || <RotateCcw className="w-4 h-4 mr-2 text-gray-500" />}
                    {action}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Confirmation Modal */}
      {confirmingAction && (
        <ConfirmModal
          isOpen={!!confirmingAction}
          onClose={cancelConfirmation}
          onConfirm={confirmStatusChange}
          title={`Mark as ${confirmingAction.newStatus}?`}
          description={
            <>
              Are you sure you want to mark container <span className="font-bold">{container.containerNumber}</span> as {confirmingAction.newStatus}?
            </>
          }
          confirmText={`Yes, mark as ${confirmingAction.newStatus}`}
          confirmColor={
            confirmingAction.newStatus === "Contested"
              ? "bg-blue-600 hover:bg-blue-700"
              : confirmingAction.newStatus === "Pending"
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-gray-600 hover:bg-gray-700"
          }
        />
      )}
    </>
  );
};

export default NscCampContainerActionMenu;
