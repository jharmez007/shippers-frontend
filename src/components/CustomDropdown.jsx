import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomDropdown = ({ selectedType, setSelectedType, submissionTypes }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between items-center w-48 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
      >
        {selectedType || "Select Type"}
        <FaChevronDown className="ml-2 text-xs" />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg border border-gray-200"
        >
          <ul className="py-1 text-sm text-gray-700">
            {submissionTypes.map((type) => (
              <li
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selectedType === type ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
