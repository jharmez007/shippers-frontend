import { useState, useEffect } from "react";
import {
  StreamsContainerTable,
  StreamsSharedActionModal,
} from "../../components";
import { toast } from "sonner";
import { flaggedContainers, getflaggedContainers } from "../../services/streamsCampServices";

const StreamsCampDashboard = () => {
  const [activeTab, setActiveTab] = useState("Flagged");
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searching, setSearching] = useState(false);

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    action: null,
    container: null,
  });

  // Fetch flagged containers on mount
  useEffect(() => {
    const fetchContainers = async () => {
      setLoading(true);
      const res = await flaggedContainers();
      if (Array.isArray(res.data?.data)) {
        const sorted = [...res.data.data].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setContainers(sorted);
      } else {
        setContainers([]);
      }
      setLoading(false);
    };
    fetchContainers();
  }, []);

  const openModal = ({ action, container }) => {
    setModalInfo({ isOpen: true, action, container });
  };

  const closeModal = () => {
    setModalInfo({ isOpen: false, action: null, container: null });
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

  const handleSearch = async () => {
    const trimmed = searchValue.trim();
    if (!trimmed) return;

    setSearching(true);
    try {
      const res = await getflaggedContainers(trimmed);
      if (res?.data?.data?.status && res.data.data.status !== "not flagged") {
        openModal({
          action: "View Container",
          container: res.data.data, 
        });
      } else {
        toast.error("Container not flagged", {
          description: `No flagged container with number "${trimmed}"`,
        });
      }
    } catch (err) {
      toast.error("Error searching container", {
        description: err?.message || "Unexpected error occurred",
      });
    }
    setSearching(false);
  };

  const tabs = ["Flagged", "Released", "Confiscated"];

  return (
    <main className="flex-1 bg-gray-50 px-4 py-6 md:px-8 min-h-screen">
      <div className="animate-fadeIn">
        <h1 className="text-2xl md:text-3xl font-bold text-green-900">
          Container Alert Management Portal (CAMP)
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor and manage flagged containers
        </p>
      </div>

      {/* Search Input moved above tabs and aligned right */}
      <div className="mt-6 flex justify-end animate-fadeIn delay-150">
        <div className="flex items-center gap-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search container number..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm"
          />
          <button
            onClick={handleSearch}
            disabled={searching}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mt-6 animate-fadeIn delay-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md transition-all duration-200 ${
              activeTab === tab
                ? "bg-white border-x border-t border-blue-600 text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab} Containers
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="animate-fadeIn delay-400">
        <StreamsContainerTable
          title={`${activeTab} Containers`}
          statusFilter={activeTab}
          containers={containers}
          onModalOpen={openModal}
          onStatusChange={handleStatusChange}
          loading={loading}
        />
      </div>

      {/* Modals */}
      <StreamsSharedActionModal
        isOpen={modalInfo.isOpen}
        onClose={closeModal}
        action={modalInfo.action}
        container={modalInfo.container}
      />
    </main>
  );
};

export default StreamsCampDashboard;
