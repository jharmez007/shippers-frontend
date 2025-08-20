import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoneyBillWave } from "react-icons/fa";
import { toast } from "sonner";

import { getFreightDetails } from "../../services/shipperFreightServices";
import { shipperFreighRateForm } from "../../services/freightRateFormServices";
import { ProgressTracker } from "..";

const ShipperApplicationDetailModal = ({ isOpen, onClose, applicationId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [billOfLading, setBillOfLading] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Reusable fetch function
  const fetchDetails = useCallback(async () => {
    if (!isOpen || !applicationId) return;

    setLoading(true);
    setData(null);

    try {
      const resData = await getFreightDetails({ id: applicationId });
      setData(resData?.data?.data);
    } catch (err) {
      console.error("Failed to fetch application details:", err);
      toast.error("Failed to load application details");
    } finally {
      setLoading(false);
    }
  }, [isOpen, applicationId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleBillOfLadingSubmit = async () => {
    if (!billOfLading.trim()) {
      toast.warning("Please enter a Bill of Lading number");
      return;
    }

    setSubmitting(true);
    try {
      await shipperFreighRateForm({
        application_id: applicationId,
        bill_of_lading_number: data?.form?.bill_of_lading_number,
      });

      setBillOfLading(""); // clear input
      toast.success("Bill of Lading submitted successfully ✅");

      // 🔄 Refresh details after submission
      await fetchDetails();
    } catch (err) {
      console.error("Failed to submit Bill of Lading:", err);
      toast.error("Failed to submit Bill of Lading ❌");
    } finally {
      setSubmitting(false);
    }
  };

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
                {loading && (
                  <p className="text-center text-gray-500">
                    Loading details...
                  </p>
                )}

                {!loading && data && (
                  <>
                    {/* Step Tracker */}
                    <div className="w-full flex justify-center mb-8">
                      <ProgressTracker currentStep={data.step || 2} />
                    </div>

                    {/* Section Title */}
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                      Application Summary
                    </h3>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                      <div className="space-y-4">
                        <InfoCard label="Form NXP No" value={data?.form?.nxp_number} />
                        <InfoCard label="Beneficiary" value={data?.form?.beneficiary} />
                        <InfoCard label="Goods Description" value={data?.form?.cargo} />
                        <InfoCard label="Total Freight Price" value={data?.form?.total_price ? `$${Number(data?.form?.total_price).toLocaleString()}` : "—"} />
                      </div>

                      <div className="space-y-4">
                        <InfoCard label="Invoice No." value={data?.form?.invoice_number} />
                        <InfoCard label="Port of Origin" value={data?.form?.voyage_from} />
                        <InfoCard label="No. of units" value={data?.form?.number_of_units} />
                        <InfoCard label="Reasonable Price Per Unit" value={data?.form?.approved_amount} />
                      </div>

                      <div className="space-y-4">
                        <InfoCard
                          label="Bill of Lading No."
                          value={data?.form?.bill_of_lading_number || "Not yet provided"}
                          valueClass={!data?.form?.bill_of_lading_number ? "text-red-500 font-medium" : ""}
                        />
                        <InfoCard label="Port of Discharge" value={data?.form?.voyage_to} />
                        <InfoCard label="Price Per Unit" value={data?.form?.price_per_unit} />
                      </div>
                    </div>

                    {/* Amount Section */}
                    <div>
                      <div className="border border-blue-500 rounded-md p-4 text-center mb-6">
                        <h3 className="text-blue-700 font-semibold text-sm">Amount Reviewed</h3>
                        <div className="flex justify-center items-center text-2xl font-bold text-blue-700 gap-2 mt-1">
                          <FaMoneyBillWave />
                          <span>{data.amountReviewed}</span>
                        </div>
                      </div>

                      {/* Show only if bill_of_lading_number is not provided */}
                      {!data?.form?.bill_of_lading_number && (
                        <div className="border rounded-md p-4 bg-gray-50">
                          <p className="text-center text-red-600 font-semibold text-sm mb-3">
                            Note: Bill of Lading Must be submitted within 30 days of this Approval
                          </p>
                          <input
                            type="text"
                            placeholder="Enter Bill of Lading number here"
                            value={billOfLading}
                            onChange={(e) => setBillOfLading(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                          />
                          <button
                            onClick={handleBillOfLadingSubmit}
                            disabled={submitting}
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
                          >
                            {submitting ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
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
    <p className={`mt-1 text-sm ${valueClass}`}>{value || "N/A"}</p>
  </div>
);

export default ShipperApplicationDetailModal;
