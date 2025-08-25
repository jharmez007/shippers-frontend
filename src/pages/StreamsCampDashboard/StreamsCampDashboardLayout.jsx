import { Outlet } from "react-router-dom";
import { StreamsCampSidebar, CampDashboardheader } from "../../components";


const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex font-sans text-gray-900 md:ml-64">
      {/* Sidebar */}
      <StreamsCampSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Top Bar */}
        <CampDashboardheader />

        {/* Page Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
