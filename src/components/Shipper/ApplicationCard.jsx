import { FaChevronDown, FaChevronUp, FaMoneyBill } from "react-icons/fa";

import { ApplicationDetails } from "..";

const statusClasses = {
  Pending: "bg-gray-400 text-white",
  Approved: "bg-green-300 text-white",
  Rejected: "bg-red-400 text-white",
  Recommended: "bg-yellow-400 text-white",
  Reviewed: "bg-blue-400 text-white",
};

const ApplicationCard = ({ application, onToggle, isOpen }) => {
  return (
    <div className="flex flex-col w-full bg-white px-4 py-4 border-b hover:bg-gray-50 transition duration-150">
      <div
        className="flex justify-between items-center cursor-pointer px-4 w-full overflow-x-auto"
        onClick={onToggle}
      >
        {/* Serial Number */}
        <div className="w-10 font-bold">{application.id}.</div>

        {/* Request Info */}
        <div className="flex flex-1 items-center justify-between gap-4">
          <div className="w-full sm:w-1/4 text-gray-700 font-medium">Request Name</div>
          <div className="w-full sm:w-1/4 text-gray-700 font-medium">Name</div>
          <div className="w-full sm:w-1/4 text-gray-600">{application.date}</div>

          {/* Status */}
          <div className="w-full sm:w-1/4">
            <div
              className={`px-3 py-2 w-40 rounded-xl text-center font-semibold ${statusClasses[application.status] || "bg-gray-300 text-white"}`}
            >
              {application.status}
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center gap-1 font-semibold text-gray-700">
            <FaMoneyBill className="text-gray-500 text-xl" />
            <span className="font-semibold text-gray-700">{application.amount}</span>
          </div>
        </div>

        {/* Amount & Open Dropdown */}
        <div className="flex items-center gap-1 min-w-[160px] justify-end font-semibold text-black">
          {isOpen ? "Close" : "Open"} {isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
        </div>
      </div>

      {/* Expandable Content */}
      {isOpen && <ApplicationDetails />}
    </div>
  );
};

export default ApplicationCard;
