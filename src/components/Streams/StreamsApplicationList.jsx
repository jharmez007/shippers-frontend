import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import { Button, Select } from '../component';
import { StreamsApplicationDetailModal, CustomTab } from '..';
import { getKPI, getThroughput } from '../../services/streamsServices';

const ITEMS_PER_PAGE = 10;
const submissionTypes = ["KPI", "Throughput", "Tariffs", "SOP", "Shipping Lines"];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


const StreamsApplicationList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedType, setSelectedType] = useState("KPI");
  const [selectedApp, setSelectedApp] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [service, setService] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [quarter, setQuarter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch Data by Tab
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;

        if (selectedType === "KPI") {
          response = await getKPI();
        } else if (selectedType === "Throughput") {
          response = await getThroughput();
        } else {
          // Placeholder for other submission type APIs
          setSubmissions([]);
          return;
        }

        if (response?.data?.data) {
          const sorted = [...response.data.data].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setSubmissions(sorted);
        } else {
          setSubmissions([]);
          toast.error(`Failed to fetch ${selectedType} submissions: ${response?.message || "Unknown error"}`);
        }
      } catch (error) {
        setSubmissions([]);
        toast.error(`Error fetching ${selectedType} submissions: ${error?.message || "Unknown error"}`);
      }
    };

    fetchData();
  }, [selectedType]);

  // Quarter to month mapping
  const quarterMonths = {
    Q1: [1, 2, 3],   // Jan - Mar
    Q2: [4, 5, 6],   // Apr - Jun
    Q3: [7, 8, 9],   // Jul - Sep
    Q4: [10, 11, 12] // Oct - Dec
  };

  // Handle Quarter change
  const handleQuarterChange = (value) => {
    setQuarter(value);
    setMonth(''); // Clear month when quarter is selected
  };

  // Handle Month change
  const handleMonthChange = (value) => {
    setMonth(value);
    setQuarter(''); // Clear quarter when month is selected
  };

  const filteredData = useMemo(() => {
    return submissions.filter((s) => {
      const serviceMatch =
        !service ||
        (selectedType === "KPI" && s.cargo_type === service) ||
        (selectedType === "Throughput" && s.service_type === service);

      const monthNum = parseInt(s.month, 10);

      const quarterMatch =
        !quarter || (quarterMonths[quarter]?.includes(monthNum));

      return (
        serviceMatch &&
        (!year || s.year?.toString() === year) &&
        (!month || monthNum === parseInt(month, 10)) &&
        quarterMatch
      );
    });
  }, [submissions, service, year, month, quarter, selectedType]);


  useEffect(() => {
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [filteredData]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedData = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-4"
    >
      {/* Tabs */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <CustomTab
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          submissionTypes={submissionTypes}
        />
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-primary text-white hover:bg-green-700"
        >
          {showFilters ? 'Hide Filters' : 'More Filters'}
        </Button>
        <Button
          onClick={() => {
            setService('');
            setYear('');
            setMonth('');
            setQuarter('');
          }}
          className="bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          Reset Filters
        </Button>
      </div>

      {/* More Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <Select onValueChange={setService} value={service} placeholder="Service">
            <option value="Container Terminal">Container Terminal</option>
            <option value="Roro Terminal">RoRo Terminal</option>
            <option value="Bulk Terminal">Bulk Terminal</option>
            <option value="General Cargo">General Cargo Terminal</option>
          </Select>

          <Select onValueChange={setYear} value={year} placeholder="Year">
            {[2025, 2024, 2023].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </Select>

          <Select onValueChange={handleQuarterChange} value={quarter} placeholder="Quarter">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </Select>

          <Select onValueChange={handleMonthChange} value={month} placeholder="Month">
            {monthNames.map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </Select>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex justify-center items-center h-40 text-gray-500 text-lg font-semibold">
          No {selectedType} submissions available
        </div>
      ) : (
        <>
          <div className="overflow-auto custom-scrollbar shadow rounded-lg border bg-white max-h-[470px]">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">OFFICER</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">MONTH</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">YEAR</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">SERVICE</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">STATUS</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map(sub => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => setSelectedApp(sub)}
                  >
                    <td className="px-6 py-4 font-medium">{sub.officer_name}</td>
                    <td className="px-6 py-4">{monthNames[(parseInt(sub.month, 10) || 1) - 1]}</td>
                    <td className="px-6 py-4">{sub.year}</td>
                    <td className="px-6 py-4">{sub.cargo_type || sub.service_type}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm px-3 py-1 rounded-full font-semibold 
                        ${sub.application_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{new Date(sub.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <Button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`bg-gray-100 hover:bg-gray-200 disabled:opacity-50`}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page <strong className="text-blue-600">{currentPage}</strong> of <strong className="text-blue-600">{totalPages}</strong>
            </span>
            <Button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`bg-gray-100 hover:bg-gray-200 disabled:opacity-50`}
            >
              Next
            </Button>
          </div>

          {/* Modal */}
          {selectedApp && (
            <StreamsApplicationDetailModal
              selectedType={selectedType}
              application={selectedApp}
              onClose={() => setSelectedApp(null)}
            />
          )}
        </>
      )}
    </motion.div>
  );
};

export default StreamsApplicationList;
