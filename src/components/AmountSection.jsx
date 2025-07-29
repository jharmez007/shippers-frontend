import { FaMoneyBillWave } from "react-icons/fa";

const AmountSection = () => {
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

      {/* Bill of Lading Input & Submit */}
      <div className="border rounded-md p-4 bg-gray-50">
        <p className="text-center text-red-600 font-semibold text-sm mb-3">
          Note: Bill of Lading Must be submitted within 30 days of this Approval
        </p>
        <input
          type="text"
          placeholder="enter bill of laden number here"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Submit
        </button>
      </div>
    </div>
  )
}

export default AmountSection
