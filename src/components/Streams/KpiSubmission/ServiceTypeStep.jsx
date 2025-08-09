import { useState } from "react";
import { motion } from "framer-motion";

const terminalOptions = [
  "Bulk Terminal",
  "Roro Terminal",
  "General Cargo",
  "Container Terminal",
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];


const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

export default function ServiceTypeStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    terminalType: data.terminalType || "",
    submissionMonth: data.submissionMonth || "",
    submissionYear: data.submissionYear || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  onUpdate(form);
  onNext();
};


  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Terminal Type */}
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Select Service Type
        </label>
        <div className="relative">
          <select
            name="terminalType"
            value={form.terminalType}
            onChange={handleChange}
            required
            className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          >
            <option disabled value="">-- Select --</option>
            {terminalOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <svg
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Custom Month and Year Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Month */}
        <div>
          <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            Select Month
          </label>
          <div className="relative">
            <select
              name="submissionMonth"
              value={form.submissionMonth}
              onChange={handleChange}
              required
              className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
              style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            >
              <option disabled value="">-- Select Month --</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Year */}
        <div>
          <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            Select Year
          </label>
          <div className="relative">
            <select
              name="submissionYear"
              value={form.submissionYear}
              onChange={handleChange}
              required
              className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
              style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            >
              <option disabled value="">-- Select Year --</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="col-span-2 flex justify-between mt-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </motion.form>
  );
}

