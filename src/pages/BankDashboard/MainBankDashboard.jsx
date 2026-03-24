import { DashboardHeader } from '../../components';


const MainBankDashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />
      {/* Cards */}
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <h2 className="text-xl font-bold text-gray-800">
          Welcome to the Bank Dashboard
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Check all activities and manage accounts
        </p>
      </div>
      
      {/* <section className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Recent Activity</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ You completed a task yesterday.</li>
          <li>📈 Your performance increased by 12% this week.</li>
          <li>📬 You received 3 new messages.</li>
        </ul>
      </section>  */}
    </main>
  )
}

export default MainBankDashboard
