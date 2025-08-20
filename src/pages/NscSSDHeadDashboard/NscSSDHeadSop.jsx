// src/pages/nsc/NscSSDHeadSop.jsx
import { useEffect, useState } from "react";
import { DashboardHeader } from "../../components";
import { Card, Input, Buton, Modal, Table } from "../../components/component";
import {
  getProposedStandards,
  approveOrRejectProposed,
  getApprovedStandards,
  updateAverages,
} from "../../services/nscSsdServices";
import { toast } from "sonner";
import CustomTab from "../../components/CustomTab";

const NscSSDHeadSop = () => {
  const [pendingStandards, setPendingStandards] = useState([]);
  const [approvedStandards, setApprovedStandards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStandard, setCurrentStandard] = useState(null);
  const [selectedType, setSelectedType] = useState("Pending Standards");
  const [averages, setAverages] = useState({
    world_avg_berth_occupancy: "",
    regional_avg_berth_occupancy: "",
    world_avg_ship_turnaround_time: "",
    regional_avg_ship_turnaround_time: "",
    world_avg_crane_move_per_hour: "",
    regional_avg_crane_move_per_hour: "",
    world_avg_cargo_dwell_time: "",
    regional_avg_cargo_dwell_time: "",
    world_avg_time_at_anchorage: "",
    regional_avg_time_at_anchorage: "",
    world_avg_truck_turnaround_time: "",
    regional_avg_truck_turnaround_time: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        getProposedStandards(),
        getApprovedStandards(),
      ]);
      setPendingStandards(pendingRes.data || []);
      setApprovedStandards(approvedRes.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecision = async (id, action) => {
    setLoading(true);
    try {
      await approveOrRejectProposed(id, { action });
      toast.success(`Standard ${action}d successfully`);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  const openAverageModal = (standard) => {
    setCurrentStandard(standard);
    setModalOpen(true);
  };

  const handleAverageChange = (e) => {
    setAverages({ ...averages, [e.target.name]: e.target.value });
  };

  const saveAverages = async () => {
    if (!currentStandard) return;
    setLoading(true);
    try {
      await updateAverages(currentStandard.id, averages);
      toast.success("Averages updated successfully");
      setModalOpen(false);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
     <DashboardHeader />

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
        {/* Tabs */}
        <CustomTab
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          submissionTypes={["Pending Standards", "Approved Standards"]}
        />

        {/* Pending Standards */}
        {selectedType === "Pending Standards" && (
          <Card>
            <Table
              headers={[
                "Cargo Type",
                "Berth Occ.",
                "Ship Turnaround",
                "Crane Moves",
                "Cargo Dwell",
                "Anchorage",
                "Truck Turnaround",
                "Actions",
              ]}
              rows={pendingStandards.map((s) => [
                s.cargo_type,
                s.berth_occupancy,
                s.ship_turnaround_time,
                s.crane_move_per_hour,
                s.cargo_dwell_time,
                s.time_at_anchorage,
                s.truck_turnaround_time,
                <div className="flex gap-2">
                  <Buton
                    size="sm"
                    onClick={() => handleDecision(s.id, "approve")}
                    loading={loading}
                  >
                    Approve
                  </Buton>
                  <Buton
                    size="sm"
                    variant="danger"
                    onClick={() => handleDecision(s.id, "reject")}
                    loading={loading}
                  >
                    Reject
                  </Buton>
                </div>,
              ])}
            />
          </Card>
        )}

        {/* Approved Standards */}
        {selectedType === "Approved Standards" && (
          <Card>
            <Table
              headers={[
                "Cargo Type",
                "Berth Occ.",
                "Ship Turnaround",
                "Crane Moves",
                "Cargo Dwell",
                "Anchorage",
                "Truck Turnaround",
                "Actions",
              ]}
              rows={approvedStandards.map((s) => [
                s.cargo_type,
                s.berth_occupancy,
                s.ship_turnaround_time,
                s.crane_move_per_hour,
                s.cargo_dwell_time,
                s.time_at_anchorage,
                s.truck_turnaround_time,
                <Buton size="sm" onClick={() => openAverageModal(s)}>
                  Update Averages
                </Buton>,
              ])}
            />
          </Card>
        )}

        {/* Modal for Updating Averages */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Update Averages"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(averages).map((key) => (
              <Input
                key={key}
                label={key.replaceAll("_", " ")}
                name={key}
                value={averages[key]}
                onChange={handleAverageChange}
              />
            ))}
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Buton onClick={() => setModalOpen(false)} variant="secondary">
              Cancel
            </Buton>
            <Buton onClick={saveAverages} loading={loading}>
              Save
            </Buton>
          </div>
        </Modal>
      </div>
    </main>
  );
};

export default NscSSDHeadSop;
