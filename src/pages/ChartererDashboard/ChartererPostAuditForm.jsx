import { DashboardHeader, ChartererPostAuditComp } from '../../components';

const ChartererPostAuditForm = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Submit Post Audit Confirmation Request
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Submit Post Audit Application for Approval
        </p>
      </div>

      <ChartererPostAuditComp />
    </main>
  )
}

export default ChartererPostAuditForm



