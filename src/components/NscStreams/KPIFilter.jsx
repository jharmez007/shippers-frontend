const KPIFilter = ({
  selectedYear,
  selectedPort,
  onYearChange,
  onPortChange,
}) => {
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const ports = [
    'Apapa',
    'Tincan',
    'Lekki Deep Sea',
    'Calabar',
    'Onne',
    'Warri',
    'Delta',
  ];

  return (
    <div className="flex flex-wrap gap-6 items-end border rounded-md p-4 bg-white shadow-sm">
      <div>
        <label htmlFor="year-select" className="text-sm font-medium text-gray-700">Year</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="block w-40 px-3 py-2 mt-1 border rounded-md bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="port-select" className="text-sm font-medium text-gray-700">Select Port Complex</label>
        <select
          id="port-select"
          value={selectedPort}
          onChange={(e) => onPortChange(e.target.value)}
          className="block w-60 px-3 py-2 mt-1 border rounded-md bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Ports</option>
          {ports.map((port) => (
            <option key={port} value={port}>{port}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default KPIFilter;
