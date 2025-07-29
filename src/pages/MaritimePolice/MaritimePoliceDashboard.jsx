import { useState } from "react";
import {
  StatsOverview,
  ContainerTable,
  FlagContainerForm,
  SharedActionModal,
} from "../../components";

const mockData = [
  {
    id: "1",
    containerNumber: "MSCU1234567",
    terminal: "Tin Can Island",
    reason: "Suspicious manifest",
    dateFlagged: "2025-07-24",
    status: "Flagged",
  },
  {
    id: "2",
    containerNumber: "MAEU8901234",
    terminal: "Apapa",
    reason: "Incorrect documentation",
    dateFlagged: "2025-07-25",
    status: "Flagged",
  },
  {
    id: "3",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Confiscated",
  },
  {
    id: "4",
    containerNumber: "COSU4764890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Contested",
  },
  {
    id: "5",
    containerNumber: "MJKU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Released",
  },
  {
    id: "6",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Flagged",
  },
  {
    id: "7",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Confiscated",
  },
  {
    id: "8",
    containerNumber: "COSU4567890",
    terminal: "Onne",
    reason: "Random Inspection",
    dateFlagged: "2025-07-26",
    status: "Released",
  },
];

const MaritimePoliceDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Flagged");
  const [containers, setContainers] = useState(mockData);

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    action: null,
    container: null,
  });

  const openModal = ({ action, container }) => {
    setModalInfo({ isOpen: true, action, container });
  };

  const closeModal = () => {
    setModalInfo({ isOpen: false, action: null, container: null });
  };

  const handleAddContainer = (newContainer) => {
    setContainers((prev) => [newContainer, ...prev]);
    setModalOpen(false);
  };

  const handleStatusChange = (containerId, newStatus) => {
    setContainers((prev) =>
      prev.map((container) =>
        container.id === containerId
          ? { ...container, status: newStatus }
          : container
      )
    );
  };

  const tabs = ["Flagged", "Contested", "Released", "Confiscated"];

  return (
    <main className="flex-1 bg-gray-50 px-4 py-6 md:px-8 space-y-6 min-h-screen">
      <div className="animate-fadeIn">
        <h1 className="text-2xl md:text-3xl font-bold text-green-900">Container Alert Management Portal (CAMP)</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor and manage flagged containers</p>
      </div>

      {/* Stats Overview */}
      <div className="animate-fadeIn delay-100">
        <StatsOverview containers={containers} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mt-6 animate-fadeIn delay-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-all duration-200
              ${
                activeTab === tab
                  ? "bg-white border-x border-t border-blue-600 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600"
              }`}
          >
            {tab} Containers
          </button>
        ))}
      </div>

      {/* Flag Button (Only show on "Flagged" tab) */}
      {activeTab === "Flagged" && (
        <div className="flex justify-end animate-fadeIn delay-300">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
          >
            + Flag New Container
          </button>
        </div>
      )}

      {/* Table */}
      <div className="animate-fadeIn delay-400">
        <ContainerTable
            title={`${activeTab} Containers`}
            statusFilter={activeTab}
            containers={containers}
            onModalOpen={openModal}
            onStatusChange={handleStatusChange}
        />
      </div>

      {/* Modals */}
      <FlagContainerForm
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        addContainer={handleAddContainer}
      />

      <SharedActionModal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        action={modalInfo.action}
        container={modalInfo.container}
      />
    </main>
  );
};

export default MaritimePoliceDashboard;