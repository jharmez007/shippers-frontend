import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { X, ChevronDown, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { images } from "../../constants";

import { getKPIReport, getThroughputReport } from "../../services/streamsServices";


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function StreamsApplicationDetailModal({ selectedType, application, onClose }) {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePDF = () => {
  if (!reportData) return;

  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let pageNumber = 1;
    const generationTime = new Date().toLocaleString();

    // ===== HEADER =====
    const addHeader = () => {
      const imgWidth = 40;
      const imgHeight = 12;
      const centerX = (pageWidth - imgWidth) / 2;
      doc.addImage(images.shippersLogo, "PNG", centerX, 10, imgWidth, imgHeight);
      doc.setFontSize(16);
      doc.setTextColor(40, 40, 40);
      doc.text(
        `${selectedType} Submission Summary`,
        pageWidth / 2,
        30,
        { align: "center" }
      );
    };

    // ===== FOOTER =====
    const addFooter = () => {
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text(`Generated on: ${generationTime}`, 14, pageHeight - 10);
      doc.text(`Page ${pageNumber}`, pageWidth - 20, pageHeight - 10);
    };

    addHeader();
    let yPos = 40;

    // ===== BASIC INFO SECTION =====
    const basicInfoRows = [
      ["Month", monthNames[(parseInt(reportData.month, 10) || 1) - 1]],
      ["Year", reportData.year],
      ["Officer", reportData.officer],
      ["Created At", new Date(reportData.created_at).toLocaleString()],
    ];

    if (selectedType === "KPI") {
      basicInfoRows.push(["Cargo Type", reportData.cargo_type]);
    }
    if (selectedType === "Throughput") {
      basicInfoRows.push(["Service Type", reportData.service_type]);
    }

    autoTable(doc, {
      startY: yPos,
      head: [["Field", "Value"]],
      body: basicInfoRows,
      theme: "grid",
      margin: { left: 14, right: 14 },
      headStyles: { fillColor: [0, 102, 204], textColor: 255 },
      styles: { fontSize: 10 },
      didDrawPage: (d) => {
        yPos = d.cursor.y + 10;
      },
    });

    // ===== METRICS SECTIONS =====
    const sections =
      selectedType === "KPI"
        ? groupMetrics(reportData.metrics)
        : groupThroughputMetrics(reportData);

    sections.forEach((section) => {
      if (yPos > 260) {
        addFooter();
        doc.addPage();
        pageNumber++;
        addHeader();
        yPos = 40;
      }

      // Section Title
      doc.setFontSize(13);
      doc.setTextColor(0, 102, 204);
      doc.text(section.title, 14, yPos);
      yPos += 6;

      Object.entries(section.data).forEach(([fieldKey, value]) => {
        if (Array.isArray(value)) {
          if (value.length && typeof value[0] === "object") {
            const keys = Array.from(new Set(value.flatMap((obj) => Object.keys(obj))));
            const rows = value.map((item) => keys.map((k) => item[k] ?? "-"));
            autoTable(doc, {
              startY: yPos,
              head: [keys.map(formatKey)],
              body: rows,
              theme: "grid",
              styles: { fontSize: 9 },
              headStyles: { fillColor: [0, 102, 204], textColor: 255 },
              margin: { left: 14, right: 14 },
              didDrawPage: (d) => {
                yPos = d.cursor.y + 10;
              },
            });
          } else {
            const rows = value.map((item, index) => [index + 1, item]);
            autoTable(doc, {
              startY: yPos,
              head: [["S/N", formatKey(fieldKey)]],
              body: rows,
              theme: "striped",
              headStyles: { fillColor: [0, 102, 204], textColor: 255 },
              margin: { left: 14, right: 14 },
              didDrawPage: (d) => {
                yPos = d.cursor.y + 10;
              },
            });
          }
        } else if (typeof value === "object" && value !== null) {
          const rows = Object.entries(value).map(([k, v]) => [
            formatKey(k),
            v?.toString() || "-",
          ]);
          autoTable(doc, {
            startY: yPos,
            head: [["Field", "Value"]],
            body: rows,
            theme: "grid",
            styles: { fontSize: 9 },
            headStyles: { fillColor: [0, 102, 204], textColor: 255 },
            margin: { left: 14, right: 14 },
            didDrawPage: (d) => {
              yPos = d.cursor.y + 10;
            },
          });
        } else {
          autoTable(doc, {
            startY: yPos,
            head: [["Field", "Value"]],
            body: [[formatKey(fieldKey), value?.toString() || "-"]],
            theme: "grid",
            styles: { fontSize: 9 },
            headStyles: { fillColor: [0, 102, 204], textColor: 255 },
            margin: { left: 14, right: 14 },
            didDrawPage: (d) => {
              yPos = d.cursor.y + 10;
            },
          });
        }
      });

      yPos += 10;
    });

    addFooter();
    doc.save(`${selectedType}_Submission_Summary.pdf`);
  } catch (error) {
    console.error("PDF generation error:", error);
  }
};


  const formatKey = (key) =>
    key
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const renderValue = (value) => {
  // Special case: Equipments table
  if (
    Array.isArray(value) &&
    value.length > 0 &&
    value[0]?.equipment_type !== undefined
  ) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-green-50">
            <tr>
              <th className="px-4 py-2 border border-gray-200 text-left">Equipment Type</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Functional</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Non-Functional</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Required (Acquired)</th>
              <th className="px-4 py-2 border border-gray-200 text-center">Required (On Lease)</th>
            </tr>
          </thead>
          <tbody>
            {value.map((eq) => (
              <tr key={eq.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-200">{eq.equipment_type}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{eq.functional}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{eq.non_functional}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{eq.required_acquired}</td>
                <td className="px-4 py-2 border border-gray-200 text-center">{eq.required_on_lease}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Array rendering (for non-equipment arrays)
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

  // Object rendering
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

  if (typeof value === "string" && /^\[.*\]$/.test(value.trim())) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.join(", ");
    } catch {}
  }

  if (typeof value === "boolean") return value ? "Yes" : "No";

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
          "Ship Calls": metrics.ship_calls,
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
        title: "Procedures",
        data: {
          "Claims": metrics.procedures?.claims,
          "Exams Booking": metrics.procedures?.exams_booking,
          "Invoicing": metrics.procedures?.invoicing,
          "Obtaining TDO": metrics.procedures?.obtaining_tdo,
          "Payment": metrics.procedures?.payment,
          "Receipting": metrics.procedures?.receipting,
          "Refunds": metrics.procedures?.refunds,
        },
      },
      {
        title: "Equipments",
        data: { Equipments: metrics.equipments || [] },
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
                <div
                  id="report-content"
                  className="overflow-y-auto h-[70vh] pr-1 space-y-8 custom-scrollbar"
                >
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
                <div className="mt-6 flex justify-end gap-2 border-t pt-4">
                  <button
                    onClick={generatePDF}
                    className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded hover:bg-gray-300 transition flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
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
