// src/pages/nsc/NscSSDHeadSop.jsx
import { useEffect, useState, useRef } from "react";
import { DashboardHeader } from "../../components";
import { Card, Input, Buton, Modal, Table } from "../../components/component";
import {
  getProposedStandards,
  approveOrRejectProposed,
  getApprovedStandards,
  updateAverages,
  updateNewAverages,
} from "../../services/nscSsdServices";
import { toast } from "sonner";
import CustomTab from "../../components/CustomTab";
import { MoreHorizontal, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const NscSSDHeadSop = () => {
  const [pendingStandards, setPendingStandards] = useState([]);
  const [approvedStandards, setApprovedStandards] = useState([]);
  const [selectedCargoType, setSelectedCargoType] = useState("container");
  const [loading, setLoading] = useState(false);

  // Modal states
  const [averageModalOpen, setAverageModalOpen] = useState(false);
  const [newAvgModalOpen, setNewAvgModalOpen] = useState(false);

  const [currentStandard, setCurrentStandard] = useState(null);
  const [selectedType, setSelectedType] = useState("Pending Standards");
  const [activeMenuId, setActiveMenuId] = useState(null);

  // For updating individual averages
  const [averages, setAverages] = useState({});
  // For setting new world & regional averages
  const [newAverages, setNewAverages] = useState({
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

  // refs for dropdown menus
  const menuRefs = useRef({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [pendingRes, approvedRes] = await Promise.all([
        getProposedStandards(),
        getApprovedStandards(),
      ]);

      const pendingData = (pendingRes.data.data || []).filter(
        (s) => s.status === "pending"
      );

      setPendingStandards(pendingData);
      setApprovedStandards(approvedRes.data.data || []); // store ALL approved
    } catch (err) {
      console.error(err);
    }
  };

  // Find the standard matching the selected cargo type
  const filteredStandard = approvedStandards.find(
    (s) => s.cargo_type === selectedCargoType
  );

  const handleDecision = async (id, action) => {
    setLoading(true);
    try {
      await approveOrRejectProposed({ id, action });
      toast.success(`Standard ${action}d successfully`);
      setPendingStandards((prev) => prev.filter((s) => s.id !== id));
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
      setActiveMenuId(null);
    }
  };

  const openAverageModal = (standard) => {
    setCurrentStandard(standard);
    setAverages(standard); // preload existing
    setAverageModalOpen(true);
  };

  const handleAverageChange = (e) => {
    setAverages({ ...averages, [e.target.name]: e.target.value });
  };

  const saveAverages = async () => {
    if (!currentStandard) return;
    setLoading(true);
    try {
      await updateAverages({standardId: currentStandard.id, payload: averages});
      toast.success("Averages updated successfully");
      setAverageModalOpen(false);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // For creating brand new averages (world/regional)
  const handleNewAvgChange = (e) => {
    setNewAverages({ ...newAverages, [e.target.name]: e.target.value });
  };

  const saveNewAverages = async () => {
    setLoading(true);
    try {
      await updateNewAverages(newAverages);
      toast.success("New world & regional averages set successfully");
      setNewAvgModalOpen(false);
      setNewAverages({
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
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to set new averages");
    } finally {
      setLoading(false);
    }
  };

  // ✅ close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (activeMenuId && menuRefs.current[activeMenuId]) {
        if (!menuRefs.current[activeMenuId].contains(e.target)) {
          setActiveMenuId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeMenuId]);

 // Capitalized cargo type options
  const cargoTypes = [
    { value: "container", label: "Container" },
    { value: "bulk", label: "Bulk" },
    { value: "roro", label: "Roro" },
    { value: "general", label: "General" },
  ];

  // Map label back to value for filtering
  const labelToValue = Object.fromEntries(
    cargoTypes.map((t) => [t.label, t.value])
  );


  return (
    <main className="flex-1 p-6 md:h-screen space-y-6 overflow-y-auto w-full ">
      <DashboardHeader />
      <div className="p-4 w-full">
        <h2 className="text-4xl uppercase font-bold text-white">
          STANDARD OPERATING PROCEDURES
        </h2>
      </div>

      {/* Top Action Bar */}
      <div className="flex justify-end">
        <Buton
          onClick={() => setNewAvgModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Set New World & Regional Standards +
        </Buton>
      </div>

      <div className="rounded-2xl bg-gray-100 p-6 space-y-6">
        <div className="h-8" />
        {/* Cargo type tabs */}
        <CustomTab
          selectedType={
            cargoTypes.find((t) => t.value === selectedCargoType)?.label || "Container"
          }
          setSelectedType={(label) => setSelectedCargoType(labelToValue[label])}
          submissionTypes={cargoTypes.map((t) => t.label)}
        />

        {/* Standards Matrix */}
        {approvedStandards.length > 0 && (
          <Card title="Standards Matrix">
            {filteredStandard ? (
              <Table
                headers={[
                  "Indicators",
                  "World Average",
                  "Regional Average",
                  "Recommended Standards For Nigerian Ports",
                ]}
                rows={[
                  [
                    "Berth Occupancy",
                    filteredStandard.world_avg?.berth_occupancy || "-",
                    filteredStandard.regional_avg?.berth_occupancy || "-",
                    filteredStandard.berth_occupancy || "-",
                  ],
                  [
                    "Ship Turnaround Time",
                    filteredStandard.world_avg?.ship_turnaround_time || "-",
                    filteredStandard.regional_avg?.ship_turnaround_time || "-",
                    filteredStandard.ship_turnaround_time || "-",
                  ],
                  [
                    "Crane moves per hour (mph)",
                    filteredStandard.world_avg?.crane_move_per_hour || "-",
                    filteredStandard.regional_avg?.crane_move_per_hour || "-",
                    filteredStandard.crane_move_per_hour || "-",
                  ],
                  [
                    "Cargo Dwell Time",
                    filteredStandard.world_avg?.cargo_dwell_time || "-",
                    filteredStandard.regional_avg?.cargo_dwell_time || "-",
                    filteredStandard.cargo_dwell_time || "-",
                  ],
                  [
                    "Time spent at Anchorage",
                    filteredStandard.world_avg?.time_at_anchorage || "-",
                    filteredStandard.regional_avg?.time_at_anchorage || "-",
                    filteredStandard.time_at_anchorage || "-",
                  ],
                  [
                    "Truck Turnaround Time",
                    filteredStandard.world_avg?.truck_turnaround_time || "-",
                    filteredStandard.regional_avg?.truck_turnaround_time || "-",
                    filteredStandard.truck_turnaround_time || "-",
                  ],
                ]}
              />
            ) : (
              <p className="text-center text-gray-500 py-4">
                No approved standard found for {selectedCargoType}.
              </p>
            )}
          </Card>
        )}

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
                <div
                  key={s.id}
                  ref={(el) => (menuRefs.current[s.id] = el)}
                  className="relative inline-block text-left"
                >
                  <button
                    onClick={() =>
                      setActiveMenuId(activeMenuId === s.id ? null : s.id)
                    }
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <MoreHorizontal className="w-5 h-5 text-gray-600" />
                  </button>

                  <AnimatePresence>
                    {activeMenuId === s.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 z-30 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-2">
                          <button
                            onClick={() => handleDecision(s.id, "approve")}
                            className="flex items-center w-full px-4 py-2 text-sm text-green-600 hover:bg-gray-100 transition"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDecision(s.id, "reject")}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Reject
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

        {/* Modal: Update Averages */}
        <Modal
          isOpen={averageModalOpen}
          onClose={() => setAverageModalOpen(false)}
          title="Update Averages"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cargo Type Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Cargo Type</label>
              <select
                name="cargo_type"
                value={averages.cargo_type || ""}
                className="w-full border rounded-xl px-3 py-2 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
                onChange={handleAverageChange}
              >
                <option value="">Select Cargo Type</option>
                {cargoTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Indicators */}
            {Object.keys(averages)
              .filter((key) => !["cargo_type", "id", "world_avg", "regional_avg"].includes(key))
              .map((key) => (
                <Input
                  key={key}
                  label={key.replaceAll("_", " ")}
                  name={key}
                  value={averages[key] ?? ""}
                  onChange={handleAverageChange}
                />
              ))}

            {/* World Averages */}
            {averages.world_avg &&
              Object.keys(averages.world_avg).map((key) => (
                <Input
                  key={`world_${key}`}
                  label={`World Avg ${key.replaceAll("_", " ")}`}
                  name={`world_avg.${key}`}
                  value={averages.world_avg[key] ?? ""}
                  onChange={(e) =>
                    setAverages((prev) => ({
                      ...prev,
                      world_avg: {
                        ...prev.world_avg,
                        [key]: e.target.value,
                      },
                    }))
                  }
                />
              ))}

            {/* Regional Averages */}
            {averages.regional_avg &&
              Object.keys(averages.regional_avg).map((key) => (
                <Input
                  key={`regional_${key}`}
                  label={`Regional Avg ${key.replaceAll("_", " ")}`}
                  name={`regional_avg.${key}`}
                  value={averages.regional_avg[key] ?? ""}
                  onChange={(e) =>
                    setAverages((prev) => ({
                      ...prev,
                      regional_avg: {
                        ...prev.regional_avg,
                        [key]: e.target.value,
                      },
                    }))
                  }
                />
              ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-6 gap-3">
            <Buton
              onClick={() => setAverageModalOpen(false)}
              variant="outline"
              className="rounded-xl"
            >
              Cancel
            </Buton>
            <Buton onClick={saveAverages} loading={loading} className="rounded-xl bg-green-600 hover:bg-green-700">
              Submit
            </Buton>
          </div>
        </Modal>

        {/* Modal: Set New World & Regional Standards */}
        <Modal
          isOpen={newAvgModalOpen}
          onClose={() => setNewAvgModalOpen(false)}
          title="Set New World & Regional Standards"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cargo Type Dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Cargo Type</label>
              <select
                name="cargo_type"
                value={newAverages.cargo_type || ""}
                className="w-full border rounded-xl px-3 py-2 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
                onChange={handleNewAvgChange}
              >
                <option value="">Select Cargo Type</option>
                {cargoTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Other Indicators */}
            {Object.keys(newAverages)
              .filter((key) => key !== "cargo_type")
              .map((key) => (
                <Input
                  key={key}
                  label={key.replaceAll("_", " ")}
                  name={key}
                  value={newAverages[key]}
                  onChange={handleNewAvgChange}
                />
              ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end mt-6 gap-3">
            <Buton
              onClick={() => setNewAvgModalOpen(false)}
              variant="outline"
              className="rounded-xl"
            >
              Cancel
            </Buton>
            <Buton onClick={saveNewAverages} loading={loading} className="rounded-xl bg-green-600 hover:bg-green-700">
              Submit
            </Buton>
          </div>
        </Modal>
      </div>
    </main>
  );
};

export default NscSSDHeadSop;
