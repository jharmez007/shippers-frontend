// src/pages/nsc/NscSSDSop.jsx
import { useState, useEffect } from "react";
import { DashboardHeader } from "../../components";
import { Card, Input, Buttonn, Selectt, Table, Modal } from "../../components/component";
import { getApprovedStandards, submitProposedStandard } from "../../services/nscSsdServices";
import { toast } from "sonner";
import CustomTab from "../../components/CustomTab";


const cargoTypeLabelToValue = {
  "Container": "container",
  "Bulk": "bulk",
  "RoRo": "roro",
  "General Cargo": "general_cargo",
};
const cargoTypeValueToLabel = {
  container: "Container",
  bulk: "Bulk",
  roro: "RoRo",
  general_cargo: "General Cargo",
};

const NscSSDSop = () => {
  const [form, setForm] = useState({
    berth_occupancy: "",
    ship_turnaround_time: "",
    crane_move_per_hour: "",
    cargo_dwell_time: "",
    time_at_anchorage: "",
    truck_turnaround_time: "",
    cargo_type: "",
  });
  // Always store as an array for filtering
  const [approvedStandards, setApprovedStandards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Tabs use human labels; filtering uses mapped values
  const [selectedLabel, setSelectedLabel] = useState("Container");

  useEffect(() => {
    loadStandards();
  }, []);

  const loadStandards = async () => {
    try {
      const res = await getApprovedStandards();
      const raw = res?.data?.data ?? [];
      // normalize to array
      const list = Array.isArray(raw) ? raw : (raw ? [raw] : []);
      setApprovedStandards(list);

      // If current tab has no data, default to the first available cargo_type
      const availableTypes = new Set(
        list.map((s) => (s.cargo_type || "").toLowerCase())
      );
      const currentValue = cargoTypeLabelToValue[selectedLabel];
      if (!availableTypes.has((currentValue || "").toLowerCase())) {
        // pick the first available, or keep as-is if none
        const first = list[0]?.cargo_type;
        if (first && cargoTypeValueToLabel[first]) {
          setSelectedLabel(cargoTypeValueToLabel[first]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitProposedStandard(form);
      toast.success("Proposed standard submitted successfully!");
      setForm({
        berth_occupancy: "",
        ship_turnaround_time: "",
        crane_move_per_hour: "",
        cargo_dwell_time: "",
        time_at_anchorage: "",
        truck_turnaround_time: "",
        cargo_type: "",
      });
      setModalOpen(false);
      loadStandards();
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  // 🚦 Filter by selected cargo type (label -> value)
  const selectedValue = cargoTypeLabelToValue[selectedLabel]; // e.g. "roro"
  const filteredStandard = approvedStandards.find(
    (s) => (s?.cargo_type || "").toLowerCase() === (selectedValue || "").toLowerCase()
  );

  // Build table rows (guard world_avg/regional_avg)
  const w = filteredStandard?.world_avg || {};
  const r = filteredStandard?.regional_avg || {};
  const indicatorRows = filteredStandard
    ? [
        ["Berth Occupancy (%)", w.berth_occupancy ?? 0, r.berth_occupancy ?? 0, filteredStandard.berth_occupancy ?? 0],
        ["Ship Turnaround Time (hrs)", w.ship_turnaround_time ?? 0, r.ship_turnaround_time ?? 0, filteredStandard.ship_turnaround_time ?? 0],
        ["Crane Moves per Hour (mph)", w.crane_move_per_hour ?? 0, r.crane_move_per_hour ?? 0, filteredStandard.crane_move_per_hour ?? 0],
        ["Cargo Dwell Time (days)", w.cargo_dwell_time ?? 0, r.cargo_dwell_time ?? 0, filteredStandard.cargo_dwell_time ?? 0],
        ["Time Spent at Anchorage (hrs)", w.time_at_anchorage ?? 0, r.time_at_anchorage ?? 0, filteredStandard.time_at_anchorage ?? 0],
        ["Truck Turnaround Time (hrs)", w.truck_turnaround_time ?? 0, r.truck_turnaround_time ?? 0, filteredStandard.truck_turnaround_time ?? 0],
      ]
    : [];

  return (
    <main className="flex-1 p-6 md:h-screen overflow-y-auto w-full">
      <DashboardHeader />
      <div className="p-4 w-full">
        <h2 className="text-4xl uppercase font-bold text-white">
          STANDARD OPERATING PROCEDURES
        </h2>
      </div>
      <div className="space-y-6">
        {/* Action Bar */}
        <div className="flex justify-end">
          <Buttonn
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow"
          >
            Propose New Standard +
          </Buttonn>
        </div>
        <div className="h-20" />
        {/* Tabs for cargo type filtering (labels only) */}
        <CustomTab
          selectedType={selectedLabel}
          setSelectedType={setSelectedLabel}
          submissionTypes={["Container", "Bulk", "RoRo", "General Cargo"]}
        />

        {/* Standards Matrix Table */}
        <Card title={`Standards Matrix - ${selectedLabel}`}>
          <Table
            headers={[
              "Indicators",
              "World Average",
              "Regional Average",
              "Recommended Standards (Nigeria)",
            ]}
            rows={indicatorRows}
          />
          {!filteredStandard && (
            <div className="text-sm text-gray-500 p-3">
              No approved standard found for <span className="font-semibold">{selectedLabel}</span>.
            </div>
          )}
        </Card>
      </div>

      {/* Modal for New Standard */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Set New Standard"
      >
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input label="Berth Occupancy (%)" name="berth_occupancy" value={form.berth_occupancy} onChange={handleChange} required />
          <Input label="Ship Turnaround Time (hrs)" name="ship_turnaround_time" value={form.ship_turnaround_time} onChange={handleChange} required />
          <Input label="Crane Moves per Hour" name="crane_move_per_hour" value={form.crane_move_per_hour} onChange={handleChange} required />
          <Input label="Cargo Dwell Time (days)" name="cargo_dwell_time" value={form.cargo_dwell_time} onChange={handleChange} required />
          <Input label="Time at Anchorage (hrs)" name="time_at_anchorage" value={form.time_at_anchorage} onChange={handleChange} required />
          <Input label="Truck Turnaround Time (hrs)" name="truck_turnaround_time" value={form.truck_turnaround_time} onChange={handleChange} required />

          <Selectt
            label="Cargo Type"
            name="cargo_type"
            value={form.cargo_type}
            onChange={handleChange}
            options={[
              { value: "", label: "Select cargo type" },
              { value: "container", label: "Container" },
              { value: "bulk", label: "Bulk" },
              { value: "roro", label: "RoRo" },
              { value: "general_cargo", label: "General Cargo" },
            ]}
            required
          />

          <div className="col-span-full flex justify-end gap-3 mt-4">
            <Buttonn type="button" variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Buttonn>
            <Buttonn type="submit" loading={loading}>
              Submit
            </Buttonn>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default NscSSDSop;
