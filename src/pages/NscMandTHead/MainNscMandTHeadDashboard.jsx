import { DashboardHeader, MandTHeadRecentActivities } from '../../components';

const MainNscMandTHeadDashboard = () => {
  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      {/* Header */}
      <DashboardHeader />
         
      <MandTHeadRecentActivities  />
    </main>
  )
}

export default MainNscMandTHeadDashboard;
