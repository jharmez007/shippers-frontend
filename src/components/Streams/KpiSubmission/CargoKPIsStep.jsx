import { useState } from "react";

export default function CargoKPIsStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    vesselTurnaround: data.vesselTurnaround || "",
    cargoDwellTime: data.cargoDwellTime || "",
    berthOccupancy: data.berthOccupancy || "",
    craneMovesPerHour: data.craneMovesPerHour || "",
    truckTurnaround: data.truckTurnaround || "",
    claimsReceived: data.claimsReceived || "",
    claimsResolved: data.claimsResolved || "",
    profiledBoxes: data.profiledBoxes || "",
    overtimeCargo: data.overtimeCargo || "",
    complaintsHandled: data.complaintsHandled || "",
    complaintsType: data.complaintsType || "",
    shipCalls: data.shipCalls || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Vessel Turnaround Time (hrs)
        </label>
        <input
          type="number"
          name="vesselTurnaround"
          value={form.vesselTurnaround}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Cargo Dwell Time (days)
        </label>
        <input
          type="number"
          name="cargoDwellTime"
          value={form.cargoDwellTime}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Berth Occupancy Rate (%)
        </label>
        <input
          type="number"
          name="berthOccupancy"
          value={form.berthOccupancy}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Crane Moves per Hour
        </label>
        <input
          type="number"
          name="craneMovesPerHour"
          value={form.craneMovesPerHour}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Truck Turnaround Time (mins)
        </label>
        <input
          type="number"
          name="truckTurnaround"
          value={form.truckTurnaround}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Number of Claims Received
        </label>
        <input
          type="number"
          name="claimsReceived"
          value={form.claimsReceived}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Number of Claims Resolved
        </label>
        <input
          type="number"
          name="claimsResolved"
          value={form.claimsResolved}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Number of Profiled Boxes
        </label>
        <input
          type="number"
          name="profiledBoxes"
          value={form.profiledBoxes}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Overtime Cargo (TEUs)
        </label>
        <input
          type="number"
          name="overtimeCargo"
          value={form.overtimeCargo}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Number of Complaints Handled
        </label>
        <input
          type="number"
          name="complaintsHandled"
          value={form.complaintsHandled}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Type of Complaints
        </label>
        <input
          type="text"
          name="complaintsType"
          value={form.complaintsType}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Ship Calls
        </label>
        <input
          type="text"
          name="shipCalls"
          value={form.shipCalls}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div className="col-span-2 flex justify-between mt-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          Next
        </button>
      </div>
    </form>
  );
}
