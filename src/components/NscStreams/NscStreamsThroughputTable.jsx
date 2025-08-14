
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import { Button, Select, Pagination } from '../component';
import { NscStreamsModal } from '..';
import { getThroughput, confirmThroughput } from '../../services/nscStreamsServices';
import { getPortComplex, getTerminals } from "../../services/portComplexServices";

const PAGE_SIZE = 10;
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const NscStreamsThroughputTable = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [portComplexOptions, setPortComplexOptions] = useState([]);
  const [terminalOptions, setTerminalOptions] = useState([]);

  const [portComplex, setPortComplex] = useState('');
  const [terminal, setTerminal] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [quarter, setQuarter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [confirmedMap, setConfirmedMap] = useState({});

  // Fetch Throughput data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getThroughput();
      if (result?.data?.data) {
        setAllData(result.data.data);
      } else {
        toast.error(result.message || 'Failed to fetch Throughput data');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Fetch port complexes on mount
  useEffect(() => {
    const fetchPortComplexes = async () => {
      const result = await getPortComplex();
      if (result) {
        setPortComplexOptions(result?.data?.data);
      } else {
        toast.error(result.message || 'Failed to fetch port complexes');
      }
    };
    fetchPortComplexes();
  }, []);

  // Fetch terminals when port complex changes
  useEffect(() => {
    const fetchTerminals = async () => {
      if (!portComplex) return setTerminalOptions([]);
      const result = await getTerminals({ port_complex: portComplex });
      if (result) {
        setTerminalOptions(result?.data?.data);
      } else {
        toast.error(result.message || 'Failed to fetch terminals');
      }
    };
    fetchTerminals();
  }, [portComplex]);

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

  const filtered = useMemo(() => {
    return allData.filter((item) => (
      (!portComplex || item.port_complex === portComplex) &&
      (!terminal || item.terminal_name === terminal) &&
      (!type || item.cargo_type === type) &&
      (!year || item.year?.toString() === year) &&
      (!month || parseInt(item.month, 10) === parseInt(month, 10)) &&
      (!quarter || (quarterMonths[quarter]?.includes(parseInt(item.month, 10))))
    ));
  }, [portComplex, terminal, type, year, month, quarter, allData]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const handleConfirm = async (id) => {

      const payload = {
      id: id,
      new_status: 'confirmed'
    }

    const result = await confirmThroughput(payload);

    if (result?.status === 200 || result?.status === 201) {
      setConfirmedMap((prev) => ({ ...prev, [id]: true }));
      toast.success("Submission confirmed");
    } else {
      toast.error(result.message || "Failed to confirm submission");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-6 bg-gray-50 h-[60vh] rounded-2xl shadow-mdr"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select onValueChange={setPortComplex} value={portComplex} placeholder="Port Complex" className="w-40">
            {portComplexOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </Select>
          <Select onValueChange={setTerminal} value={terminal} placeholder="Terminal" className="w-40">
            {terminalOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </div>
        <Button onClick={() => setShowFilters(!showFilters)} className="bg-primary text-white hover:bg-green-700">
          {showFilters ? 'Hide Filters' : 'More Filters'}
        </Button>
        <Button
          onClick={() => {
            setPortComplex('');
            setTerminal('');
            setType('');
            setYear('');
            setQuarter('');
            setMonth('');
          }}
          className="bg-gray-100 text-gray-800 hover:bg-gray-200"
        >
          Reset Filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 animate-fade-in">
          <Select onValueChange={setType} value={type} placeholder="Service">
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

      {loading ? (
        <div className="text-center text-sm text-gray-500 py-10">Loading submissions...</div>
      ) : (
        <>
          <div className="overflow-auto rounded-xl shadow border border-gray-200 max-h-[400px] custom-scrollbar">
            <table className="w-full text-sm text-left bg-white">
              <thead className="bg-gray-100 text-xs font-semibold uppercase tracking-wider sticky top-0 z-10">
                <tr>
                  <th className="p-4">SERVICE</th>
                  <th className="p-4">ID</th>
                  <th className="p-4">Port Complex</th>
                  <th className="p-4">Terminal</th>
                  <th className="p-4">MONTH</th>
                  <th className="p-4">YEAR</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
              {paginated.map((item) => {
                const isConfirmed = item.confirmation_status === 'confirmed' || confirmedMap[item.id];

                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelectedSubmission(item)}
                    className="hover:bg-blue-50 cursor-pointer border-t transition-colors"
                  >
                    <td className="p-4">{item.service_type}</td>
                    <td className="p-4">{item.unique_code}</td>
                    <td className="p-4">{item.port_complex}</td>
                    <td className="p-4">{item.terminal_name}</td>
                    <td className="p-4">{monthNames[(parseInt(item.month, 10) || 1) - 1]}</td>
                    <td className="p-4">{item.year}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isConfirmed) {
                            handleConfirm(item.id);
                          }
                        }}
                        disabled={isConfirmed}
                        className={`px-3 py-1 text-xs rounded-full font-medium transition-all flex items-center justify-center gap-1 ${
                          isConfirmed
                            ? 'bg-green-100 text-green-700 border border-green-200 cursor-not-allowed'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isConfirmed ? (
                          <>
                            <CheckCircle2 size={14} className="text-green-600" />
                            Confirmed
                          </>
                        ) : (
                          'Confirm'
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Showing {(page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
            </span>
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {selectedSubmission && (
        <NscStreamsModal
          selectedType={'Throughput'}
          application={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </motion.div>
  );
};

export default NscStreamsThroughputTable;
