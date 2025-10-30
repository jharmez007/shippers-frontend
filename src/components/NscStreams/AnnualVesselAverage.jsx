const getCellStyle = (indicator, value) => {
  const num = Number(value);
  if (isNaN(num)) return "";

  switch (indicator.toLowerCase()) {
    case "ship calls":
      return num >= 100
        ? "bg-green-100 text-green-800"
        : num >= 70
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";

    case "tonnage (mt) import":
    case "tonnage (mt) export":
      return num >= 60000
        ? "bg-green-100 text-green-800"
        : num >= 30000
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";

    case "containers (teus) import":
    case "containers (teus) export":
      return num >= 25000
        ? "bg-green-100 text-green-800"
        : num >= 10000
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";

    default:
    return "";
  }
};

const AnnualVesselAverage = ({ indicators = [], terminals = [], data = [] }) => {
  const calculateAverages = () => {
    const terminalSums = {};
    const terminalCounts = {};

    data.forEach((monthly) => {
      terminals.forEach((terminal) => {
        const monthData = monthly[terminal];
        if (!monthData) return;

        indicators.forEach((indicator) => {
          const val = parseFloat(monthData[indicator]);
          if (!isNaN(val)) {
            terminalSums[terminal] = terminalSums[terminal] || {};
            terminalCounts[terminal] = terminalCounts[terminal] || {};

            terminalSums[terminal][indicator] =
              (terminalSums[terminal][indicator] || 0) + val;
            terminalCounts[terminal][indicator] =
              (terminalCounts[terminal][indicator] || 0) + 1;
          }
        });
      });
    });

    const averages = {};
    terminals.forEach((terminal) => {
      averages[terminal] = {};
      indicators.forEach((indicator) => {
        const sum = terminalSums[terminal]?.[indicator] || 0;
        const count = terminalCounts[terminal]?.[indicator] || 0;
        averages[terminal][indicator] = count
          ? (sum / count).toFixed(2)
          : "-";
      });
    });

    return averages;
  };

  const averages = calculateAverages();

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4 overflow-x-auto">
      <h3 className="text-lg font-semibold text-gray-800">Annual Vessel Activity Averages</h3>
      <table className="min-w-[800px] w-full text-sm border">
        <thead>
          <tr className="bg-green-100 text-gray-800">
            <th className="text-left p-3 border">Indicators</th>
            {terminals.map((terminal) => (
              <th key={terminal} className="text-left p-3 border">
                {terminal}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {indicators.map((indicator) => (
            <tr key={indicator} className="border-b">
              <td className="p-3 font-medium text-gray-700 border">
                {indicator}
              </td>
              {terminals.map((terminal) => (
                <td
                  key={terminal}
                  className={`p-3 font-mono text-center border ${getCellStyle(
                    indicator,
                    averages[terminal][indicator]
                  )}`}
                >
                  {averages[terminal][indicator]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnualVesselAverage;
