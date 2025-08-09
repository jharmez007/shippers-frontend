// components/KPIColorLegend.jsx
const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 text-sm">
    <div className={`w-4 h-4 rounded-full ${color}`} />
    <span>{label}</span>
  </div>
);

const KPIColorLegend = () => (
  <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm space-y-2 text-gray-700 max-w-sm">
    <h3 className="text-sm font-semibold mb-2">Performance Legend</h3>
    <LegendItem color="bg-green-500" label="Good" />
    <LegendItem color="bg-yellow-400" label="Moderate" />
    <LegendItem color="bg-red-500" label="Poor" />
  </div>
);

export default KPIColorLegend;
