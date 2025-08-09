import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getKPIReport, getThroughputReport } from "../../services/streamsServices";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function KPIReportModal({ selectedType, application, onClose }) {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatKey = (key) =>
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const renderValue = (value) => {
    if (typeof value === "string" && /^\[.*\]$/.test(value.trim())) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed.join(", ");
      } catch {}
    }

    if (typeof value === "boolean") return value ? "Yes" : "No";

    if (Array.isArray(value)) {
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {value.map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
              {renderValue(item)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="bg-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-700">
                <span className="font-medium">{formatKey(k)}:</span>{" "}
                {renderValue(v)}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return value !== null && value !== undefined ? value.toString() : "-";
  };

  const groupMetrics = (metrics) => {
    if (!metrics) return [];

    return [
      {
        title: "Time Metrics",
        data: {
          "Vessel Turnaround Time": metrics.vessel_turnaround_time,
          "Cargo Dwell Time": metrics.cargo_dwell_time,
          "Truck Turnaround Time": metrics.truck_turnaround_time,
          "Positioning Time": metrics.positioning?.time,
          "Commencement Time": metrics.positioning?.commencement_time,
          "Close Time": metrics.positioning?.close_time,
          "Agencies Converge Time": metrics.vessel_rummaging?.agencies_converge_time,
          "Duration": metrics.vessel_rummaging?.duration,
        },
      },
      {
        title: "Cargo Movement",
        data: {
          "Overtime Cargo": metrics.overtime_cargo,
          "Profiled Boxes": metrics.profiled_boxes,
          "Examined by Scanner": metrics.examined_by_scanner,
          "Examined by Physical": metrics.examined_by_physical,
          "Examined by Both": metrics.examined_by_both,
          "Import": metrics.import,
          "Export": metrics.export,
          "Returned": metrics.returned,
        },
      },
      {
        title: "Operations",
        data: {
          "Berth Occupancy": metrics.berth_occupancy,
          "Crane Move Per Hour": metrics.crane_move_per_hour,
          "Average Positioned": metrics.positioning?.average_positioned,
          "Joint Examination": metrics.positioning?.joint_examination,
          "Inspection Agencies": metrics.positioning?.inspection_agencies,
          "Bus Handling": metrics.vessel_rummaging?.bus_handling,
          "Joint Exam of Ship": metrics.vessel_rummaging?.joint_exam_of_ship,
          "Vessel Inspection Agencies": metrics.vessel_rummaging?.inspection_agencies,
        },
      },
      {
        title: "Customer Service",
        data: {
          "Complaints Handled": metrics.complaints_handled,
          "Complaints Type": metrics.complaints_type,
          "Claims Received": metrics.claims_received,
          "Claims Resolved": metrics.claims_resolved,
        },
      },
      { title: "Charges & Tariffs", data: metrics.tariff || {} },
      { title: "Agreements with NPA", data: metrics.agreement_with_npa || {} },
      { title: "Challenges", data: { Challenges: metrics.challenges } },
    ];
  };


  const groupThroughputMetrics = (metrics) => {
    if (!metrics) return [];

    return [
      {
        title: "Cargo Movement",
        data: {
          "Cargo Import": metrics.cargo_import,
          "Cargo Export": metrics.cargo_export,
          "Cargo Empty": metrics.cargo_empty,
        },
      },
      {
        title: "Challenges",
        data: {
          Challenges: metrics.challenges,
        },
      },
    ];
  };


  useEffect(() => {
    const fetchReport = async () => {
      if (!application?.id) return;
      setLoading(true);

      let res;
      if (selectedType === "KPI") {
        res = await getKPIReport({ id: application.id });
      } else if (selectedType === "Throughput") {
        res = await getThroughputReport({ id: application.id });
      }
      // you can extend here for "shipping lines", "tariffs", etc.

      if (res?.status === 200) {
        setReportData(res.data?.data || null);
      }
      setLoading(false);
    };

    fetchReport();
  }, [application, selectedType]);

  return (
    <Transition show={!!application} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <AnimatePresence>
            {application && (
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
                    {application.type} Submission Report
                  </Dialog.Title>
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="overflow-y-auto h-[70vh] pr-1 space-y-8 custom-scrollbar">
                  {loading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                  ) : reportData ? (
                    <>
                      {/* Basic Info */}
                      <div>
                        <h3 className="text-md font-semibold text-green-700 mb-2 border-l-4 border-green-500 pl-3">
                          Report Info
                        </h3>
                        {/* Report Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded border">
                            <span className="font-medium">Month:</span>{" "}
                            {monthNames[(parseInt(reportData.month, 10) || 1) - 1]}
                          </div>
                          <div className="bg-gray-50 p-3 rounded border">
                            <span className="font-medium">Year:</span>{" "}
                            {reportData.year}
                          </div>

                          {selectedType === "KPI" && (
                            <div className="bg-gray-50 p-3 rounded border">
                              <span className="font-medium">Cargo Type:</span>{" "}
                              {reportData.cargo_type}
                            </div>
                          )}

                          {selectedType === "Throughput" && (
                            <div className="bg-gray-50 p-3 rounded border">
                              <span className="font-medium">Service Type:</span>{" "}
                              {reportData.service_type}
                            </div>
                          )}

                          <div className="bg-gray-50 p-3 rounded border">
                            <span className="font-medium">Officer:</span>{" "}
                            {reportData.officer}
                          </div>
                          <div className="bg-gray-50 p-3 rounded border">
                            <span className="font-medium">Created At:</span>{" "}
                            {new Date(reportData.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* KPI Metrics */}
                      {selectedType === "KPI" && (
                        <div>
                          <h3 className="text-md font-semibold text-green-700 mb-2 border-l-4 border-green-500 pl-3">
                            Metrics
                          </h3>
                          <div className="space-y-3">
                            {groupMetrics(reportData.metrics).map((section, i) => (
                              <Disclosure key={i} defaultOpen={i < 2}>
                                {({ open }) => (
                                  <div className="border rounded-lg overflow-hidden">
                                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left bg-green-50 hover:bg-green-100 transition">
                                      {section.title}
                                      <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                          open ? "rotate-180" : ""
                                        }`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="p-4 bg-white">
                                      {renderValue(section.data)}
                                    </Disclosure.Panel>
                                  </div>
                                )}
                              </Disclosure>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Throughput Metrics */}
                      {selectedType === "Throughput" && (
                        <div>
                          <h3 className="text-md font-semibold text-green-700 mb-2 border-l-4 border-green-500 pl-3">
                            Metrics
                          </h3>
                          <div className="space-y-3">
                            {groupThroughputMetrics(reportData).map((section, i) => (
                              <Disclosure key={i} defaultOpen={i < 1}>
                                {({ open }) => (
                                  <div className="border rounded-lg overflow-hidden">
                                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left bg-green-50 hover:bg-green-100 transition">
                                      {section.title}
                                      <ChevronDown
                                        className={`w-4 h-4 transition-transform ${
                                          open ? "rotate-180" : ""
                                        }`}
                                      />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="p-4 bg-white">
                                      {renderValue(section.data)}
                                    </Disclosure.Panel>
                                  </div>
                                )}
                              </Disclosure>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-red-500">No data found.</div>
                  )}
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
