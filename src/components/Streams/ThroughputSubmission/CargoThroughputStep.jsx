import { useState } from "react";

export default function CargoThroughputStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    import: data.import || "",
    importUnit: "TEUs",
    export: data.export || "",
    empty: data.empty || "",
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

  const isContainerTerminal = data?.terminalType === "Container Terminal";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Import */}
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Import ({form.importUnit || "TEUs"}) <span className="text-red-500">*</span> 
        </label>
        <div className="flex gap-2">
          <input
          type="number"
          name="import"
          value={form.import}
          onChange={handleChange}
          required
          placeholder="e.g. 125000"
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />

        <select
          name="importUnit"
          value={form.importUnit || "TEUs"}
          onChange={handleChange}
          className="bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-xl border-0 shadow 
                    outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        >
          <option value="TEUs">TEUs</option>
          <option value="Tonnes">Tonnes</option>
          <option value="CBM">CBM</option>
          <option value="Unit">Unit</option>
        </select>
        </div>
      </div>

      {/* Export */}
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Export (tonnes) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="export"
          value={form.export}
          onChange={handleChange}
          required
          placeholder="e.g. 98000"
          className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      {isContainerTerminal && (
        <>
          {/* Empty */}
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              Empty (tonnes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="empty"
              value={form.empty}
              onChange={handleChange}
              required
              placeholder="e.g. 15000"
              className="appearance-none w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition"
              style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
        </>
      )}

      {/* Navigation Buttons */}
      <div className="col-span-2 flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </form>
  );
}
