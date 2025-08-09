const getCellStyle = (indicator, value) => {
  const num = Number(value);
  if (isNaN(num)) return "";

  switch (indicator.toLowerCase()) {
    case "berth occupancy (%)":
      return num >= 70
        ? "bg-green-100 text-green-800"
        : num >= 50
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";
    case "cargo dwell time (days)":
    case "truck turn around time (minutes)":
    case "vessel turn around (days)":
      return num <= 3
        ? "bg-green-100 text-green-800"
        : num <= 7
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";
    case "crane moves per hour (hours)":
      return num >= 25
        ? "bg-green-100 text-green-800"
        : num >= 15
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800";
    default:
      return "";
  }
};

const MonthlyKPITable = ({ month, indicators, terminals }) => {
  if (!Array.isArray(terminals) || terminals.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">{month}</h3>
      <div className="overflow-x-auto rounded-md border shadow-sm bg-white">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-green-50 text-gray-700">
              <th className="p-3 border text-left">Indicators</th>
              {terminals.map((terminal) => (
                <th
                  key={terminal.name}
                  className="p-3 border text-left whitespace-nowrap"
                >
                  {terminal.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indicators.map((indicator) => (
              <tr key={indicator}>
                <td className="p-3 border font-medium text-gray-600 whitespace-nowrap">
                  {indicator}
                </td>
                {terminals.map((terminal) => {
                  const value = terminal.indicators?.[indicator];
                  return (
                    <td
                      key={terminal.name + indicator}
                      className={`p-3 border text-center font-mono ${getCellStyle(
                        indicator,
                        value
                      )}`}
                    >
                      {value ?? "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyKPITable;
