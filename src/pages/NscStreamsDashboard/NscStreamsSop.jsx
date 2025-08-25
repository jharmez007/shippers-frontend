import { useState, useEffect } from "react";
import { DashboardHeader } from "../../components";
import { Card, Table } from "../../components/component";
import { getApprovedStandards } from "../../services/nscSsdServices";
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

const NscStreamsSop = () => {
  // Always store as an array for filtering
  const [approvedStandards, setApprovedStandards] = useState([]);

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
        <div className="h-32" />
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
    </main>
  );
};

export default NscStreamsSop;
