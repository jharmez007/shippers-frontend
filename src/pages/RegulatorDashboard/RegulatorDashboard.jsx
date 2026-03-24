import { Outlet } from 'react-router-dom';

import { RegulatorSidebar } from "../../components";
import { images } from "../../constants";

const RegulatorDashboard = () => {
    return (
    <div className="relative flex min-h-screen bg-gray-100">
        <div
        className="absolute h-[300px] bg-cover w-full bg-center bg-[#3182CE] flex items-center justify-center text-white text-center px-4"
        style={{
            backgroundImage: `url(${images.dashboardbg})`,
        }}
        ></div>
        <div className="flex w-full z-10">
        <RegulatorSidebar />
    
        {/* Main Content */}
        <Outlet />
    </div>
    </div>
    )
}

export default RegulatorDashboard
