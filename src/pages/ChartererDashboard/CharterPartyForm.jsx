import { DashboardHeader, ChartererComp } from '../../components';

const CharterPartyForm = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Submit Charter Party Confirmation Request
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Submit Charter Application for Approval
        </p>
      </div>
    
      <ChartererComp />
    </main>
  )
}

export default CharterPartyForm

