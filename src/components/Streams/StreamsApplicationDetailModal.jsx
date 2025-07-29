import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function KPIReportModal({ applicationId, onClose }) {
  const dummyData = {
    submissionInfo: {
      terminalType: "Bulk",
      submissionDate: "2025-07-21",
    },
    cargoStats: {
      cargoThroughput: "1,200 MT",
      containerVolume: "450 TEUs",
    },
    equipmentUsed: [
      {
        equipmentType: "Forklift",
        quantity: 4,
        condition: "Good",
      },
      {
        equipmentType: "Crane",
        quantity: 2,
        condition: "Fair",
      },
    ],
    workforce: {
      totalStaff: 32,
      shifts: "3 daily",
    },
    safety: {
      incidentsReported: 0,
      safetyDrills: "Conducted weekly",
    },
    compliance: {
      jointExam: "Yes",
      lastAudit: "2025-06-15",
    },
  };

  const formatKey = (key) =>
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {value.map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm"
            >
              {Object.entries(item).map(([k, v]) => (
                <div
                  key={k}
                  className="text-sm text-gray-700 mb-1 flex justify-between"
                >
                  <span className="font-medium">{formatKey(k)}:</span>
                  <span>{v?.toString() || "-"}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(value).map(([k, v]) => (
            <div
              key={k}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm"
            >
              <div className="text-sm text-gray-700">
                <span className="font-medium">{formatKey(k)}:</span>{" "}
                <span>{v?.toString() || "-"}</span>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="text-sm text-gray-700 bg-gray-50 rounded-md p-3 border border-gray-200">
          {value?.toString() || "-"}
        </div>
      );
    }
  };

  return (
    <Transition show={applicationId} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <AnimatePresence>
            {applicationId && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full max-w-4xl h-[90vh] overflow-hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <Dialog.Title className="text-xl font-semibold text-green-700">
                    KPI Submission Report
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto h-[70vh] pr-1 space-y-8 custom-scrollbar">
                  {Object.entries(dummyData).map(([section, value]) => (
                    <div key={section}>
                      <h3 className="text-md font-semibold text-green-700 mb-2 border-l-4 border-green-500 pl-3">
                        {formatKey(section)}
                      </h3>
                      <div className="pl-1">{renderValue(value)}</div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-6 text-end border-t pt-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Dialog>
    </Transition>
  );
}
