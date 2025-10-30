import { DashboardHeader, RecentActivities } from '../../components';

const MainNscDashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />
         
      <RecentActivities  />
    </main>
  )
}

export default MainNscDashboard


