import { Outlet } from "react-router-dom";
import { MaritimePoliceSidebar, CampDashboardheader } from "../../components";


const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex font-sans text-gray-900 md:ml-64">
      {/* Sidebar */}
      <MaritimePoliceSidebar />

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
