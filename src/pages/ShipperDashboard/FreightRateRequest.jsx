import { DashboardHeader, ShipperApplicationList } from '../../components';

const FreightRateRequest = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Freight Rate Request
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Request a freight rate for your shipment. Fill in the details below to get started.
        </p>
        <p className="text-sm text-green-500 mt-2">
          Freight Rate Request Form
        </p>
      </div>
      <ShipperApplicationList  />
    </main>
  )
}

export default FreightRateRequest
