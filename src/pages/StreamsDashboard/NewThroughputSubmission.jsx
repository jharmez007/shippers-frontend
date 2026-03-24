import { DashboardHeader, ThroughputFormWrapper } from '../../components';

const NewThroughputSubmission = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="p-4 w-full">
        <h2 className="text-4xl uppercase font-bold text-white">
          Monthly Throughput Submission Form
        </h2>
        
      </div>
      <div className='h-20' />
      <ThroughputFormWrapper />
    </main>
  )
}

export default NewThroughputSubmission
