import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { images } from "../../../constants";

// Utility: Convert camelCase or snake_case to Title Case
const formatKey = (key) =>
  key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const SummaryStep = ({ data, onBack, onSubmit }) => {
  // PDF Generation
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
        doc.text("KPI Submission Summary", pageWidth / 2, 30, { align: "center" });
      };

      const addFooter = () => {
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Generated on: ${generationTime}`, 14, pageHeight - 10);
        doc.text(`Page ${pageNumber}`, pageWidth - 20, pageHeight - 10);
      };

      addHeader();
      let yPos = 40;

      Object.entries(data).forEach(([section, value]) => {
        if (yPos > 260) {
          addFooter();
          doc.addPage();
          pageNumber++;
          addHeader();
          yPos = 40;
        }

        doc.setFontSize(13);
        doc.setTextColor(0, 102, 204);
        doc.text(formatKey(section), 14, yPos);
        yPos += 6;

        if (Array.isArray(value)) {
          if (value.every((item) => typeof item === "string")) {
            const rows = value.map((item, index) => [index + 1, item]);
            autoTable(doc, {
              startY: yPos,
              head: [["S/N", formatKey(section)]],
              body: rows,
              theme: "striped",
              margin: { left: 14, right: 14 },
              headStyles: { fillColor: [0, 102, 204], textColor: 255 },
              didDrawPage: (data) => {
                yPos = data.cursor.y + 10;
              },
            });
          } else {
            const keys = Array.from(new Set(value.flatMap((obj) => Object.keys(obj))));
            const rows = value.map((item) => keys.map((key) => item[key] ?? "-"));
            autoTable(doc, {
              startY: yPos,
              head: [keys.map(formatKey)],
              body: rows,
              theme: "grid",
              margin: { left: 14, right: 14 },
              styles: { fontSize: 10 },
              headStyles: { fillColor: [0, 102, 204], textColor: 255 },
              didDrawPage: (data) => {
                yPos = data.cursor.y + 10;
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
            didDrawPage: (data) => {
              yPos = data.cursor.y + 10;
            },
          });
        } else {
          autoTable(doc, {
            startY: yPos,
            head: [["Field", "Value"]],
            body: [[formatKey(section), value?.toString() || "-"]],
            theme: "grid",
            margin: { left: 14, right: 14 },
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 102, 204], textColor: 255 },
            didDrawPage: (data) => {
              yPos = data.cursor.y + 10;
            },
          });
        }

        if (yPos > 260) {
          addFooter();
          doc.addPage();
          pageNumber++;
          addHeader();
          yPos = 40;
        }

        yPos += 10;
      });

      addFooter();
      doc.save("KPI_Submission_Summary.pdf");
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      toast.error("Failed to generate PDF.");
    }
  };

  const renderData = (value) => {
    if (Array.isArray(value)) {
      if (value.every((item) => typeof item === "string")) {
        return (
          <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
            {value.map((item, idx) => (
              <li key={idx}>{item || "-"}</li>
            ))}
          </ul>
        );
      }
      return (
        <div className="space-y-3">
          {value.map((item, idx) => (
            <div key={idx} className="border p-3 rounded bg-gray-50 shadow">
              {Object.entries(item).map(([k, v]) => (
                <div key={k} className="text-sm text-gray-700">
                  <span className="font-medium capitalize">{k.replace(/([A-Z])/g, " $1")}:</span> {v || "-"}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    } else if (typeof value === "object" && value !== null) {
      return (
        <div className="space-y-1">
          {Object.entries(value).map(([k, v]) => (
            <div key={k} className="text-sm text-gray-700">
              <span className="font-medium capitalize">{k.replace(/([A-Z])/g, " $1")}:</span> {v?.toString() || "-"}
            </div>
          ))}
        </div>
      );
    } else {
      return <div className="text-sm text-gray-700">{value?.toString() || "-"}</div>;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Review Your KPI Submission</h2>

      <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400">
        {Object.entries(data).map(([section, value]) => (
          <div key={section} className="border-l-4 border-green-600 pl-4">
            <h3 className="text-xl font-semibold text-green-700 mb-2 capitalize">
              {section.replace(/([A-Z])/g, " $1")}
            </h3>
            <div className="ml-2 text-lg font-bold">{renderData(value)}</div>
          </div>
        ))}
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
