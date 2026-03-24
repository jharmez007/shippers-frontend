import { Outlet } from 'react-router-dom';

// import { dashboard } from "../../services/dashboardServices";
import { BankSidebar } from "../../components";
import { images } from "../../constants";

const BankDashboard = () => {
    return (
    <div className="relative flex min-h-screen bg-gray-100">
        <div
        className="absolute h-[300px] bg-cover w-full bg-center bg-[#3182CE] flex items-center justify-center text-white text-center px-4"
        style={{
            backgroundImage: `url(${images.dashboardbg})`,
        }}
        ></div>
        <div className="flex w-full z-10">
        <BankSidebar />
    
        {/* Main Content */}
        <Outlet />
    </div>
    </div>
    )
}

export default BankDashboard
