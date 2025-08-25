import { motion } from "framer-motion";

const CustomTab = ({ selectedType, setSelectedType, submissionTypes }) => {
  return (
    <div className="relative">
      {/* Tab buttons */}
      <div className="flex gap-2 border-b">
        {submissionTypes.map((type) => (
          <button
            key={type}
            className={`relative whitespace-nowrap px-4 py-2 font-semibold transition-colors duration-200 ${
              selectedType === type
                ? "text-primary"
                : "text-gray-400 hover:text-gray-600"
            }`}
            onClick={() => setSelectedType(type)}
          >
            {type}
            {/* Underline animation */}
            {selectedType === type && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomTab;
