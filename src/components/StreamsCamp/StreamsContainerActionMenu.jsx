import { useState, useEffect, useRef } from "react";
import { MoreHorizontal, Eye, Upload, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const actionIcons = {
  "View Container": <Eye className="w-4 h-4 mr-2 text-gray-500" />,
  "Upload Document": <Upload className="w-4 h-4 mr-2 text-gray-500" />,
  "Upload Response": <Upload className="w-4 h-4 mr-2 text-gray-500" />,
  "Mark as Released": <CheckCircle className="w-4 h-4 mr-2 text-green-500" />,
  "Mark as Confiscated": <XCircle className="w-4 h-4 mr-2 text-red-500" />,
};

const StreamsContainerActionMenu = ({ container, onModalOpen, onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const getAvailableActions = (status) => {
    switch (status) {
      case "Flagged":
        return [
          "View Container",
        ];
      case "Contested":
        return [
          "View Container",
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
      const newStatus = action.split(" ")[2]; // Released or Confiscated
      const previousStatus = container.status;

      onStatusChange(container.id, newStatus);

      toast.success(`${action} - Success`, {
        description: `Container ${container.containerNumber} is now ${newStatus}`,
        action: {
          label: "Undo",
          onClick: () => {
            onStatusChange(container.id, previousStatus);
            toast.info("Undo successful", {
              description: `Container ${container.containerNumber} reverted to ${previousStatus}`,
            });
          },
        },
      });

      return;
    }

    toast(action);
  };

  const actions = getAvailableActions(container.status);

  // Close on click outside
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
  );
};

export default StreamsContainerActionMenu;
