import { DashboardHeader, FreightRateComp } from '../../components';


const FreightRateForm = () => {
  return (
    <main className="flex-1 p-6 space-y-6">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Submit Freight Rate Confirmation Request
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Submit Freight Rate Application for Approval
        </p>
        <p className="text-sm text-green-500 mt-2">
          Consolidators
        </p>
      </div>

      <FreightRateComp />
    </main>
  )
}

export default FreightRateForm
