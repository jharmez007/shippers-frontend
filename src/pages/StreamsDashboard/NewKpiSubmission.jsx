import { DashboardHeader, KPIFormWrapper } from '../../components';

const NewKpiSubmission = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Monthly KPI Submission Form
        </h2>
        
      </div>
      <div className='h-24' />
      <KPIFormWrapper />
    </main>
  )
}

export default NewKpiSubmission

