
import { DashboardHeader, NscStreamsKPILandingDashboard } from '../../components';

const MainNscStreamsDashboard = () => {
  

  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />

      {/* Welcome Banner */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 tracking-tight mb-2">
          Welcome to STREAMS
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          Seaport Terminal Real-Time Efficiency Assessment & Monitoring System
        </p>

        <div className="mt-4">
          <p className="text-base md:text-lg font-medium text-gray-700">
            <span className="text-green-600 font-semibold">5</span> submissions confirmed,&nbsp;
            <span className="text-yellow-500 font-semibold">3</span> pending for July 2025
          </p>
        </div>
      </section>

      <div className='h-6' />
      <NscStreamsKPILandingDashboard />
    </main>
  )
}

export default MainNscStreamsDashboard

