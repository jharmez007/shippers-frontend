import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

import { getTerminals, getPortComplex } from '../services/portComplexServices';
import { Loader } from "../utils/loader";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

const YourComplex = () => {
  const [isComplexOpen, setIsComplexOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const [userComplex, setUserComplex] = useState("");
  const [userTerminal, setUserTerminal] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  const [complexOptions, setComplexOptions] = useState([]);
  const [terminalOptions, setTerminalOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortComplexes = async () => {
      const res = await getPortComplex();
      if (res?.data?.data) {
        const options = res.data.data.map(item => ({ label: item, value: item }));
        setComplexOptions(options);
      } else {
        toast.error("Failed to load port complexes.");
      }
    };
    fetchPortComplexes();
  }, []);

  const fetchTerminals = async (complex) => {
    const res = await getTerminals({ port_complex: complex });
    if (res?.data?.data) {
      const options = res.data.data.map(item => ({ label: item, value: item }));
      setTerminalOptions(options);
    } else {
      toast.error("Failed to load terminals for selected port complex.");
    }
  };

  const handleProceed = () => {
  if (!userComplex || !userTerminal || selectedServices.length === 0) {
    toast.error("Please select port complex, terminal, and at least one service.");
    return;
  }

  // Store data in localStorage
  localStorage.setItem("selectedPortComplex", userComplex);
  localStorage.setItem("selectedTerminal", userTerminal);
  localStorage.setItem("selectedServices", JSON.stringify(selectedServices));

  Loader();
  navigate("/whoareyou/your-tin");
};


  const handleSelectComplex = (value) => {
    setUserComplex(value);
    setUserTerminal("");
    setTerminalOptions([]);
    fetchTerminals(value);
    setIsComplexOpen(false);
  };

  const handleSelectTerminal = (value) => {
    setUserTerminal(value);
    setIsTerminalOpen(false);
  };

  const handleServiceToggle = (value) => {
    setSelectedServices(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
  };

  const selectedLabel = complexOptions.find(opt => opt.value === userComplex)?.label || "Select port complex";
  const selectedLabelTwo = terminalOptions.find(opt => opt.value === userTerminal)?.label || "Select terminal";

  const serviceOptions = [
  { value: "bulk", label: "Bulk Terminal" },
  { value: "roro", label: "RoRo Terminal" },
  { value: "general", label: "General Cargo" },
  { value: "container", label: "Container Terminal" },
];

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold mb-10 tracking-wide text-center">
        Select Your Port Complex
      </h1>

      {/* === Select Complex === */}
      <motion.div {...fadeInUp} className="relative w-full max-w-md font-medium">
        <div
          onClick={() => setIsComplexOpen(!isComplexOpen)}
          className="flex w-full p-3 pr-10 border-2 border-gray-300 rounded-xl text-gray-700 bg-white shadow cursor-pointer"
        >
          <span className="flex-1">{selectedLabel}</span>
          <ChevronDown className={`transition-transform duration-200 ${isComplexOpen ? "rotate-180" : ""}`} />
        </div>

        {isComplexOpen && (
          <div className="bg-white shadow-lg rounded-b-xl border border-gray-200 max-h-96 overflow-y-auto z-10 absolute w-full left-0">
            {complexOptions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectComplex(item.value)}
                className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all ${
                  userComplex === item.value ? "bg-blue-50 border-l-4 border-blue-500" : ""
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* === Select Terminal === */}
      {userComplex && (
        <motion.div {...fadeInUp} className="relative w-full max-w-md font-medium">
          <div
            onClick={() => setIsTerminalOpen(!isTerminalOpen)}
            className="flex w-full p-3 pr-10 border-2 border-gray-300 rounded-xl text-gray-700 bg-white shadow cursor-pointer"
          >
            <span className="flex-1">{selectedLabelTwo}</span>
            <ChevronDown className={`transition-transform duration-200 ${isTerminalOpen ? "rotate-180" : ""}`} />
          </div>

          {isTerminalOpen && (
            <div className="bg-white shadow-lg rounded-b-xl border border-gray-200 max-h-96 overflow-y-auto z-10 absolute w-full left-0">
              {terminalOptions.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectTerminal(item.value)}
                  className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-all ${
                    userTerminal === item.value ? "bg-blue-50 border-l-4 border-blue-500" : ""
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* === Select Services === */}
      {userTerminal && (
        <motion.div {...fadeInUp} className="w-full max-w-md border-2 border-gray-300 rounded-xl p-4 shadow bg-white">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Select Services:</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {serviceOptions.map((service, index) => (
              <label
                key={index}
                className="flex items-center gap-3 cursor-pointer text-gray-700 hover:bg-gray-50 p-2 rounded transition"
              >
                <input
                  type="checkbox"
                  value={service.value}
                  checked={selectedServices.includes(service.value)}
                  onChange={() => handleServiceToggle(service.value)}
                  className="w-5 h-5 accent-blue-600"
                />
                <span>{service.label}</span>
              </label>
            ))}
          </div>
        </motion.div>
      )}

      {/* === Proceed Button === */}
      {userTerminal && (
        <motion.button
          {...fadeInUp}
          onClick={handleProceed}
          className={`w-full max-w-md rounded-md py-3 font-semibold text-white text-sm transition-all duration-200 ${
            userComplex && userTerminal && selectedServices.length > 0
              ? 'bg-[#3d5afe] hover:bg-blue-700'
              : 'bg-[#C8DCEA] cursor-not-allowed'
          }`}
          disabled={!userComplex || !userTerminal || selectedServices.length === 0}
        >
          Proceed
        </motion.button>
      )}
    </div>
  );
};

export default YourComplex;
