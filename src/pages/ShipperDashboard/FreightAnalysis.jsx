import { DashboardHeader } from '../../components';
import { FreightOverviewChart, barData } from "../../constants/dummy";
import { Bar } from 'react-chartjs-2';

const FreightAnalysis = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
    {/* Header */}
    <DashboardHeader />
    {/* Cards */}
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-xl font-bold text-gray-800">
        Freight Analysis
      </h2>
      <p className="text-lg text-gray-600 mt-2">
        Analyze your freight data to optimize shipping routes and costs.
      </p>
      <p className="text-sm text-green-500 mt-2">
        Freight Data
      </p>
    </div>

     {/* Charts */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
          <FreightOverviewChart />
          </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Performance: Total Orders</h3>
          <Bar data={barData} />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Page Visits */}
        <div className="bg-white p-6 rounded shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Page Visits</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Page Name</th>
                <th className="pb-2">Visitors</th>
                <th className="pb-2">Unique Users</th>
                <th className="pb-2">Bounce Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['/argon/', 4569, 340, '46.53%'],
                ['/argon/index.html', 3985, 319, '46.53%'],
                ['/argon/charts.html', 3513, 294, '36.49%'],
                ['/argon/tables.html', 2050, 147, '50.87%'],
                ['/argon/profile.html', 1795, 190, '46.53%'],
              ].map(([page, visitors, users, bounce], idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2">{page}</td>
                  <td>{visitors}</td>
                  <td>{users}</td>
                  <td>{bounce}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Social Traffic */}
        <div className="bg-white p-6 rounded shadow overflow-x-auto">
          <h3 className="text-lg font-semibold mb-4">Social Traffic</h3>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="pb-2">Referral</th>
                <th className="pb-2">Visitors</th>
                <th className="pb-2">%</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Facebook', 1480, 60],
                ['Facebook', 5480, 70],
                ['Google', 4807, 80],
                ['Instagram', 3678, 75],
                ['Twitter', 2645, 30],
              ].map(([ref, visits, percent], idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-2">{ref}</td>
                  <td>{visits}</td>
                  <td>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  </main>
  )
}

export default FreightAnalysis
