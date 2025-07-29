import { motion } from "framer-motion";

import { ProgressTracker } from "..";
import AmountSection from "../AmountSection";

const ApplicationDetails = () => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden px-6 py-4 text-sm border-t mt-2 bg-gray-50"
    >
      {/* Step Progress Bar */}
      <div className="w-full app__flex p-16">
        <ProgressTracker currentStep={2} />
      </div>

      {/* Application Summary */}
      <h2 className="text-center text-lg font-bold mb-4">Application Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
        {/* Column 1 */}
        <div className="space-y-4">
          <div className="border p-3 rounded">
            <p className="text-gray-500">Form NXP No</p>
            <p className="font-bold">2311112342</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Beneficiary</p>
            <p className="font-bold">UYTIU</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Goods Description</p>
            <p className="font-bold">State Cargo type</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Total Freight Price</p>
            <p className="font-bold">$31,500</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <div className="border p-3 rounded">
            <p className="text-gray-500">Invoice No.</p>
            <p className="font-bold">542</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Port of Origin</p>
            <p className="font-bold">State Location here</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">No. of units</p>
            <p className="font-bold">364</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Reasonable Price Per Unit</p>
            <input
              type="text"
              placeholder="input here..."
              className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          <div className="border p-3 rounded">
            <p className="text-gray-500">Bill of Lading No.</p>
            <p className="text-red-500 font-semibold">not yet provided</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Port of Discharge</p>
            <p className="font-bold">State Location here</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Price Per Unit</p>
            <p className="font-bold">$100</p>
          </div>
          <div className="border p-3 rounded">
            <p className="text-gray-500">Total Freight Price</p>
            <p className="font-bold">N/A</p>
          </div>
        </div>
      </div>

      <AmountSection />
    </motion.div>
  );
};

export default ApplicationDetails;