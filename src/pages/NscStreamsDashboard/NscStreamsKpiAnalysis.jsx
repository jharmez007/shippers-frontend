import { DashboardHeader, KPIAnalysisDashboard  } from "../../components"

const NscStreamsKpiAnalysis = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />

      <KPIAnalysisDashboard />
    </main>
  )
}

export default NscStreamsKpiAnalysis
