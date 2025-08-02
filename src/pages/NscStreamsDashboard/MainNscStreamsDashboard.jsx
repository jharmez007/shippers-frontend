
import { DashboardHeader } from '../../components';

const MainNscStreamsDashboard = () => {
  

  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />

      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Welcome to the Seaport Terminal Real-Time Efficiency Assessment & Monitoring System (STREAMS)
        </h2>
        <p className="text-lg text-gray-600">
          5  submissions  confirmed, 3 pending for this month July 2025
        </p>
      </div>
      <div className='h-14' />
      
    </main>
  )
}

export default MainNscStreamsDashboard

