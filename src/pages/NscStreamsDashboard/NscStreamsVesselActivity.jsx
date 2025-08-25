import { DashboardHeader, VesselAnalysisDashboard  } from "../../components"

const NscStreamsVesselActivity = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />

      <VesselAnalysisDashboard />
    </main>
  )
}

export default NscStreamsVesselActivity
