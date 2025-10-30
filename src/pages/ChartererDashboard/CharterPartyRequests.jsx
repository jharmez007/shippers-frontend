import { DashboardHeader, ChartererApplicationList } from '../../components';

const CharterPartyRequests = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Charter Party Requests
        </h2>
        <p className="text-sm mt-2 text-gray-500">
          <span className="text-green-600 font-semibold">5</span> Requests Approved,&nbsp;
          <span className="text-yellow-500 font-semibold">3</span> Pending
        </p>
      </div>
       <div className="h-8"/>
      <ChartererApplicationList  />
    </main>
  )
}

export default CharterPartyRequests
