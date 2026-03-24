import { FaMoneyBillWave } from "react-icons/fa";

const NscAmountSection = () => {
  return (
    <div>
      {/* Amount Reviewed Section */}
      <div className="border border-blue-500 rounded-md p-4 text-center mb-6">
        <h3 className="text-blue-700 font-semibold text-sm">Amount Reviewed</h3>
        <div className="flex justify-center items-center text-2xl font-bold text-blue-700 gap-2 mt-1">
          <FaMoneyBillWave />
          <span>$548,898.00</span>
        </div>
      </div>

      {/* Submit & Reject Buttons */}
      <div className="border rounded-md p-4 bg-gray-50 flex gap-4">
        <button className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Submit
        </button>
        <button className="w-1/2 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
          Reject
        </button>
      </div>
    </div>
  )
}

export default NscAmountSection
