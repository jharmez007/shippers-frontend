import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { ProgressTracker } from "..";
import {
  getFreightDetails,
  attendFreight,
  submitFreight,
  rejectFreight,
} from "../../services/nscCrdServices";

const NscDrsShipperApplicationDetailModal = ({ isOpen, onClose, applicationId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("free"); // free | picked | completed

  const [rppu, setRppu] = useState("");
  const [reason, setReason] = useState("");
  const [showReasonInput, setShowReasonInput] = useState(false); // only for reject

  useEffect(() => {
    let isMounted = true;

    const fetchDetails = async () => {
      if (!isOpen) return;

      setLoading(true);
      setData(null);

      try {
        const resData = await getFreightDetails({ id: applicationId });

        if (isMounted) {
          const details = resData?.data?.data;
          setData(details);

          if (details?.application?.picked_by_id) {
            setStatus("picked");
          } else {
            setStatus("free");
          }
        }
      } catch (err) {
        toast.error("Failed to fetch application details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetails();
    return () => {
      isMounted = false;
    };
  }, [isOpen, applicationId]);

  /** Pick or release freight form */
  const handleAttendAction = async (action) => {
    try {
      const res = await attendFreight({ id: applicationId, action });
      if (res?.data?.message) toast.success(res.data.message);

      if (action === "pick") setStatus("picked");
      else if (action === "release") setStatus("free");
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  /** Submit or reject freight form */
  const handleDecision = async (decision) => {
    try {
      let res;
      if (decision === "submit") {
        if (!rppu) {
          toast.error("Please provide a Reasonable Price Per Unit before submitting.");
          return;
        }
        res = await submitFreight({ id: applicationId, rppu });
      } else {
        if (!reason) {
          toast.error("Please provide a reason for rejection.");
          return;
        }
        res = await rejectFreight({ id: applicationId, reason });
      }

      if (res?.data?.message) toast.success(res.data.message);
      setStatus("completed");
    } catch (err) {
      toast.error("Action failed. Please try again.");
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
                  <p className="text-center text-gray-500">Loading details...</p>
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
                        <InfoCard
                          label="Total Freight Price"
                          value={
                            data?.form?.total_price
                              ? `$${Number(data?.form?.total_price).toLocaleString()}`
                              : "—"
                          }
                        />
                      </div>

                      <div className="space-y-4">
                        <InfoCard label="Invoice No." value={data?.form?.invoice_number} />
                        <InfoCard label="Port of Origin" value={data?.form?.voyage_from} />
                        <InfoCard
                          label="No. of units"
                          value={data?.form?.number_of_units}
                        />
                        <InfoInput
                          label="Reasonable Price Per Unit"
                          placeholder="Input here..."
                          value={rppu}
                          onChange={(e) => setRppu(e.target.value)}
                        />
                      </div>

                      <div className="space-y-4">
                        <InfoCard
                          label="Bill of Lading No."
                          value={
                            data?.form?.bill_of_lading_number ||
                            "Not yet provided"
                          }
                          valueClass={
                            !data?.form?.bill_of_lading_number
                              ? "text-red-500 font-medium"
                              : ""
                          }
                        />
                        <InfoCard label="Port of Discharge" value={data?.form?.voyage_to} />
                        <InfoCard label="Price Per Unit" value={data?.form?.price_per_unit} />
                      </div>
                    </div>

                    {/* Reject reason only when needed */}
                    {showReasonInput && (
                      <div className="mb-4">
                        <textarea
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          placeholder="Enter reason for rejection"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    {status === "free" && (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleAttendAction("pick")}
                          className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                        >
                          Pick
                        </button>
                      </div>
                    )}

                    {status === "picked" && (
                      <div>
                        <div className="border rounded-md p-4 bg-gray-50 flex gap-4">
                          <button
                            onClick={() => handleDecision("submit")}
                            className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => setShowReasonInput(true)}
                            className="w-1/2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                        <button
                          onClick={() => handleAttendAction("release")}
                          className="mt-3 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
                        >
                          Release
                        </button>
                      </div>
                    )}

                    {status === "completed" && (
                      <p className="text-center text-gray-500 font-medium">
                        This application has been completed.
                      </p>
                    )}
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
    <p className={`mt-1 text-sm ${valueClass}`}>{value}</p>
  </div>
);

/* Reusable info card with input */
const InfoInput = ({ label, placeholder, value, onChange }) => (
  <div className="border border-gray-200 bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <p className="text-gray-500 text-xs">{label}</p>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-green-500 outline-none"
    />
  </div>
);

export default NscDrsShipperApplicationDetailModal;
