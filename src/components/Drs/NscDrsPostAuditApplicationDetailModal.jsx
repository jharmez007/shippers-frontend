import { motion, AnimatePresence } from "framer-motion";

const NscDrsPostAuditApplicationDetailModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[70] p-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="bg-white rounded shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-gray-200">
              
              {/* Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                <h2 className="text-xl font-semibold text-gray-800">
                  Application Details
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-3xl leading-none"
                >
                  &times;
                </button>
              </div>

              {/* Body */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-6 py-6 bg-gray-50 text-sm"
              >

                {/* Section Title */}
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                  Application Summary
                </h3>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <InfoCard label="Name of Vessel" value="2311112342" />
                    <InfoCard label="Beneficiary" value="UYTIU" />
                    <InfoCard label="Voyage Number" value="State number here" />
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <InfoCard label="Invoice No." value="542" />
                    <InfoCard label="Port of Loading" value="State Location here" />
                    <InfoCard label="Period" value="10 Days" />
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    <InfoCard label="Bill of Lading No." value="987564" />
                    <InfoCard label="Port of Discharge" value="State Location here" />
                    <InfoCard label="Others Stated" value="the initial added info" />
                  </div>
                </div>

                <div className="border border-blue-500 rounded-md p-4 text-center mb-6">
                  <h3 className="text-blue-700 font-semibold text-sm">Verified</h3>

                </div>

              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* Reusable info card */
const InfoCard = ({ label, value, valueClass = "font-semibold text-gray-800" }) => (
  <div className="border border-gray-200 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <p className="text-gray-500 text-xs">{label}</p>
    <p className={`mt-1 text-sm ${valueClass}`}>{value}</p>
  </div>
);

export default NscDrsPostAuditApplicationDetailModal;
