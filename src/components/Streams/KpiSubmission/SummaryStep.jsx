import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { toast } from "sonner";

import { stepFieldMap } from "../../../constants/dummy";
import { images } from "../../../constants";

const formatKey = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const SummaryStep = ({ data, onBack, onSubmit }) => {
  const generatePDF = () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let pageNumber = 1;
      const generationTime = new Date().toLocaleString();

      const addHeader = () => {
        const imgWidth = 40;
        const imgHeight = 12;
        const centerX = (pageWidth - imgWidth) / 2;
        doc.addImage(images.shippersLogo, "PNG", centerX, 10, imgWidth, imgHeight);
        doc.setFontSize(16);
        doc.setTextColor(40, 40, 40);
        doc.text("Submission Summary", pageWidth / 2, 30, { align: "center" });
      };

      const addFooter = () => {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Generated on: ${generationTime}`, 14, pageHeight - 10);
        doc.text(`Page ${pageNumber}`, pageWidth - 20, pageHeight - 10);
      };

      addHeader();
      let yPos = 40;

      stepFieldMap.forEach(({ label, keys }) => {
        const sectionData = {};
        keys.forEach((key) => {
          if (data[key] !== undefined) sectionData[key] = data[key];
        });
        if (Object.keys(sectionData).length === 0) return;

        if (yPos > 260) {
          addFooter();
          doc.addPage();
          pageNumber++;
          addHeader();
          yPos = 40;
        }

        doc.setFontSize(13);
        doc.setTextColor(0, 102, 204);
        doc.text(label, 14, yPos);
        yPos += 6;

        Object.entries(sectionData).forEach(([fieldKey, value]) => {
          if (Array.isArray(value)) {
            if (value.every((item) => typeof item === "string")) {
              const rows = value.map((item, index) => [index + 1, item]);
              autoTable(doc, {
                startY: yPos,
                head: [["S/N", formatKey(fieldKey)]],
                body: rows,
                theme: "striped",
                margin: { left: 14, right: 14 },
                headStyles: { fillColor: [0, 102, 204], textColor: 255 },
                didDrawPage: (d) => {
                  yPos = d.cursor.y + 10;
                },
              });
            } else {
              const keys = Array.from(new Set(value.flatMap((obj) => Object.keys(obj))));
              const rows = value.map((item) => keys.map((k) => item[k] ?? "-"));
              autoTable(doc, {
                startY: yPos,
                head: [keys.map(formatKey)],
                body: rows,
                theme: "grid",
                margin: { left: 14, right: 14 },
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 102, 204], textColor: 255 },
                didDrawPage: (d) => {
                  yPos = d.cursor.y + 10;
                },
              });
            }
          } else if (typeof value === "object" && value !== null) {
            const rows = Object.entries(value).map(([k, v]) => [formatKey(k), v?.toString() || "-"]);
            autoTable(doc, {
              startY: yPos,
              head: [["Field", "Value"]],
              body: rows,
              theme: "grid",
              margin: { left: 14, right: 14 },
              styles: { fontSize: 10 },
              headStyles: { fillColor: [0, 102, 204], textColor: 255 },
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
              margin: { left: 14, right: 14 },
              styles: { fontSize: 10 },
              headStyles: { fillColor: [0, 102, 204], textColor: 255 },
              didDrawPage: (d) => {
                yPos = d.cursor.y + 10;
              },
            });
          }
        });

        yPos += 10;
      });

      addFooter();
      doc.save("KPI_Submission_Summary.pdf");
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF.");
    }
  };

  const renderTable = (fieldKey, value) => {
    if (Array.isArray(value)) {
      if (value.every((item) => typeof item === "string")) {
        return (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-[#0066cc73] text-blue-900">
                <tr>
                  <th className="p-2 text-left w-16">S/N</th>
                  <th className="p-2 text-left">{formatKey(fieldKey)}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {value.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2">{item || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      const keys = Array.from(new Set(value.flatMap((obj) => Object.keys(obj))));
      return (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-[#0066cc73] text-blue-900">
              <tr>
                {keys.map((k) => (
                  <th key={k} className="p-2 text-left">{formatKey(k)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {value.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {keys.map((k) => (
                    <td key={k} className="p-2">{row[k] ?? "-"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-[#0066cc73] text-blue-900">
              <tr>
                <th className="p-2 text-left">Field</th>
                <th className="p-2 text-left">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Object.entries(value).map(([k, v]) => (
                <tr key={k} className="hover:bg-gray-50">
                  <td className="p-2">{formatKey(k)}</td>
                  <td className="p-2">{v?.toString() || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-[#0066cc73] text-blue-900">
            <tr>
              <th className="p-2 text-left">Field</th>
              <th className="p-2 text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="p-2">{formatKey(fieldKey)}</td>
              <td className="p-2 text-right">{value?.toString() || "-"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white ">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Review Your Submission
      </h2>

      <div className="space-y-10">
        {stepFieldMap.map(({ label, keys }) => {
          const sectionData = {};
          keys.forEach((key) => {
            if (data[key] !== undefined) sectionData[key] = data[key];
          });
          if (Object.keys(sectionData).length === 0) return null;

          return (
            <div key={label} className="bg-white rounded-lg shadow-md p-5 border border-gray-200">
              <h3 className="text-xl font-semibold text-[#0066CC] mb-4">{label}</h3>
              <div className="space-y-4">
                {Object.entries(sectionData).map(([fieldKey, value]) => (
                  <div key={fieldKey}>{renderTable(fieldKey, value)}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <button
          onClick={onBack}
          className="w-full sm:w-auto px-6 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300 transition"
        >
          Back
        </button>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={generatePDF}
            className="w-full sm:w-auto px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Export as PDF
          </button>
          <button
            onClick={onSubmit}
            className="w-full sm:w-auto px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;
