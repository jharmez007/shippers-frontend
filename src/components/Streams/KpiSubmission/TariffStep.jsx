import { useState } from "react";

export default function TariffStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    terminalHandling: data.terminalHandling || "",
    documentationCharge: data.documentationCharge || "",
    positioningExamination: data.positioningExamination || "",
    weighbridgeCharge: data.weighbridgeCharge || "",
    storageCharge: data.storageCharge || "",
    otherCharges: data.otherCharges || ""
  });

  const isPositioningRequired = data?.terminalType === "Container Terminal";
  const isWeighbridgeRequired =
    data?.terminalType === "Container Terminal" || data?.terminalType === "Bulk Terminal";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onNext();
  };

  const inputClass =
    "appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition";
  const inputStyle = {
    boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Terminal Handling Charges per TEU <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="0"
          name="terminalHandling"
          value={form.terminalHandling}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. 30000"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Documentation Charge per TEU <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="0"
          name="documentationCharge"
          value={form.documentationCharge}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. 5000"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Positioning for Examination 
          {isPositioningRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type="number"
          min="0"
          name="positioningExamination"
          value={form.positioningExamination}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. 10000"
          required={isPositioningRequired}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Weighbridge Charge 
          {isWeighbridgeRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type="number"
          min="0"
          name="weighbridgeCharge"
          value={form.weighbridgeCharge}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. 2000"
          required={isWeighbridgeRequired}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Storage Charge per <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="0"
          name="storageCharge"
          value={form.storageCharge}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="per tier per TEU/MT/CBM"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Other Charges
        </label>
        <input
          type="text"
          name="otherCharges"
          value={form.otherCharges}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. Crane fees, overtime"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
        >
          Back
        </button>

        <button
          type="submit"
          className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow hover:bg-green-500 transition"
        >
          Next
        </button>
      </div>
    </form>
  );
}
