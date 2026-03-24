import { useEffect, useState } from "react";

const initialEquipmentTypes = [
  "RTGs",
  "STS Crane",
  "MHC",
  "Reach Stacker",
  "Forklift",
  "Terminal Truck",
  "Weigh Bridge",
  "Towing",
  "Trucks & Sky Lift"
];

const defaultRow = {
  equipment_type: "",
  required_on_lease: "",
  required_acquired: "",
  functional: "",
  non_functional: ""
};

export default function CargoEquipmentStep({ data, onNext, onBack, onUpdate }) {
  const [rows, setRows] = useState([]);

  // Repopulate rows from data whenever this step is visited
  useEffect(() => {
    if (data.equipments && data.equipments.length > 0) {
      setRows(data.equipments);
    } else {
      setRows(
        initialEquipmentTypes.map(equipment_type => ({
          ...defaultRow,
          equipment_type
        }))
      );
    }
  }, [data]);

  const handleChange = (index, e) => {
    const newRows = [...rows];
    newRows[index][e.target.name] = e.target.value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { ...defaultRow }]);
  };

  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ equipments: rows });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 text-left text-gray-700 font-semibold border bg-gray-50 border-gray-200">Equipment Type</th>
              <th className="p-3 text-left text-gray-700 font-semibold border bg-gray-50 border-gray-200">Required (Lease)</th>
              <th className="p-3 text-left text-gray-700 font-semibold border bg-gray-50 border-gray-200">Required (Acquired)</th>
              <th className="p-3 text-left text-gray-700 font-semibold border bg-gray-50 border-gray-200">Functional</th>
              <th className="p-3 text-left text-gray-700 font-semibold border bg-gray-50 border-gray-200">Non-functional</th>
              <th className="p-3 text-center text-gray-700 font-semibold border bg-gray-50 border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                style={{ borderSpacing: "0 0.5rem" }}
              >
                <td className="p-2 align-middle border border-gray-200">
                  <input
                    type="text"
                    name="equipment_type"
                    value={row.equipment_type}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full bg-transparent rounded-md px-2 py-2 my-1 outline-none"
                    required
                    placeholder="Equipment Type"
                  />
                </td>
                <td className="p-2 align-middle border border-gray-200">
                  <input
                    type="number"
                    name="required_on_lease"
                    value={row.required_on_lease}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full bg-transparent rounded-md px-2 py-2 my-1 outline-none"
                  />
                </td>
                <td className="p-2 align-middle border border-gray-200">
                  <input
                    type="number"
                    name="required_acquired"
                    value={row.required_acquired}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full bg-transparent rounded-md px-2 py-2 my-1 outline-none"
                  />
                </td>
                <td className="p-2 align-middle border border-gray-200">
                  <input
                    type="number"
                    name="functional"
                    value={row.functional}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full bg-transparent rounded-md px-2 py-2 my-1 outline-none"
                  />
                </td>
                <td className="p-2 align-middle border border-gray-200">
                  <input
                    type="number"
                    name="non_functional"
                    value={row.non_functional}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full bg-transparent rounded-md px-2 py-2 my-1 outline-none"
                  />
                </td>
                <td className="p-2 text-center align-middle border border-gray-200">
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:text-red-700 font-semibold px-3 py-1 rounded transition disabled:opacity-50"
                    disabled={rows.length === 1}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4 gap-2 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleAddRow}
          className="px-6 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold border border-blue-200 hover:bg-blue-100 transition"
        >
          + Add Row
        </button>
        <button
          type="submit"
          className="px-8 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </form>
  );
}
