import { DashboardHeader, DrsRecentActivities } from '../../components';

const MainNscDrsDashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />

      <DrsRecentActivities />
    </main>
  )
}

export default MainNscDrsDashboard;
