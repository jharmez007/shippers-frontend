import { motion, AnimatePresence } from "framer-motion";

export const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const Select = ({ value, onValueChange, placeholder, children, className = '' }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className={`border rounded-xl px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-primary bg-white transition-all ${className}`}
  >
    <option value="" disabled hidden>{placeholder}</option>
    {children}
  </select>
);

export const Button = ({ onClick, children, className = '', ...props }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${className}`}
    {...props}
  >
    {children}
  </button>
);

export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex gap-2 items-center text-sm">
    <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
      Prev
    </Button>
    <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
    <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
      Next
    </Button>
  </div>
);


export const Buttonn = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50 transition"
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export const Buton = ({ children, loading, size = "md", variant = "primary", ...props }) => {
  const base = "rounded-lg font-medium transition disabled:opacity-50";
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base"
  };
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700"
  };
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};




export const Input = ({ label, name, value, onChange, ...props }) => (
  <div className="flex flex-col">
    {label && <label htmlFor={name} className="text-sm font-medium mb-1">{label}</label>}
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      {...props}
    />
  </div>
);


export const Selectt = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col">
    {label && <label htmlFor={name} className="text-sm font-medium mb-1">{label}</label>}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);


export const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 rounded-lg">
      <thead className="bg-gray-100 text-left">
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-2 border-b">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? rows.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2 border-b">{cell}</td>
            ))}
          </tr>
        )) : (
          <tr><td colSpan={headers.length} className="text-center py-4">No records found</td></tr>
        )}
      </tbody>
    </table>
  </div>
);


export const Card = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow p-6 space-y-4">
    {title && <h2 className="text-lg font-semibold">{title}</h2>}
    {children}
  </div>
);







