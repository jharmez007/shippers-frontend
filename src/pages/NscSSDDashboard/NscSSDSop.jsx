// src/pages/nsc/NscSSDSop.jsx
import { useState, useEffect } from "react";
import { DashboardHeader } from "../../components";
import { Card, Input, Buttonn, Selectt, Table } from "../../components/component";
import { getApprovedStandards, submitProposedStandard } from "../../services/nscSsdServices";
import { toast } from "sonner";

const NscSSDSop = () => {
  const [form, setForm] = useState({
    berth_occupancy: "",
    ship_turnaround_time: "",
    crane_move_per_hour: "",
    cargo_dwell_time: "",
    time_at_anchorage: "",
    truck_turnaround_time: "",
    cargo_type: ""
  });
  const [approvedStandards, setApprovedStandards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch approved standards
  useEffect(() => {
    loadStandards();
  }, []);

  const loadStandards = async () => {
    try {
      const res = await getApprovedStandards();
      setApprovedStandards(res.data || []);
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
        cargo_type: ""
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen overflow-y-auto w-full">
      <DashboardHeader title="SSD Standards Management" />

      {/* Form */}
      <Card title="Submit Proposed Standard">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              { value: "general_cargo", label: "General Cargo" }
            ]}
          />
          <div className="col-span-full">
            <Buttonn type="submit" loading={loading}>Submit</Buttonn>
          </div>
        </form>
      </Card>

      {/* Approved Standards */}
      <Card title="Approved Standards">
        <Table
          headers={["Cargo Type", "Berth Occ.", "Ship Turnaround", "Crane Moves", "Cargo Dwell", "Anchorage", "Truck Turnaround", "Approved At"]}
          rows={approvedStandards.map(s => [
            s.cargo_type,
            s.berth_occupancy,
            s.ship_turnaround_time,
            s.crane_move_per_hour,
            s.cargo_dwell_time,
            s.time_at_anchorage,
            s.truck_turnaround_time,
            new Date(s.approved_at).toLocaleDateString()
          ])}
        />
      </Card>
    </main>
  );
};

export default NscSSDSop;

