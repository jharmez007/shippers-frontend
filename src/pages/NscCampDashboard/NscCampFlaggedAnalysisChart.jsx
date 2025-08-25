import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { format, parseISO } from "date-fns";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const mockData = [
  {
    id: "1",
    containerNumber: "MSCU1234567",
    terminal: "Tin Can Island",
    reason: "Suspicious manifest",
    dateFlagged: "2025-07-24",
    status: "Flagged",
  },
  {
    id: "2",
    containerNumber: "MAEU8901234",
    terminal: "Apapa",
    reason: "Incorrect documentation",
    dateFlagged: "2025-07-25",
    status: "Flagged",
  },
  {
    id: "3",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Confiscated",
  },
  {
    id: "4",
    containerNumber: "COSU4764890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Contested",
  },
  {
    id: "5",
    containerNumber: "MJKU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Released",
  },
  {
    id: "6",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Flagged",
  },
  {
    id: "7",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Confiscated",
  },
  {
    id: "8",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Released",
  },
  {
    id: "9",
    containerNumber: "MANU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Pending",
  },
];

const NscCampFlaggedAnalysisChart = () => {
  const [containers, setContainers] = useState(mockData);
  const flaggedContainers = containers.filter((c) => c.status === "Flagged");

  const monthlyCounts = flaggedContainers.reduce((acc, container) => {
    const date = format(parseISO(container.dateFlagged), "yyyy-MM");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(monthlyCounts).sort();
  const data = {
    labels,
    datasets: [
      {
        label: "Flagged Containers",
        data: labels.map((label) => monthlyCounts[label]),
        backgroundColor: "#15803d", // Tailwind green-700
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} container(s)` } },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn delay-150 w-[70vw] mx-auto mt-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Flagged Container Analysis</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NscCampFlaggedAnalysisChart;
