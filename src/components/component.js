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
