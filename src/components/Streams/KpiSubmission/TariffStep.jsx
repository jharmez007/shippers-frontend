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
          Terminal Handling Charges per TEU
        </label>
        <input
          type="text"
          name="terminalHandling"
          value={form.terminalHandling}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. ₦30,000"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Documentation Charge per TEU
        </label>
        <input
          type="text"
          name="documentationCharge"
          value={form.documentationCharge}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. ₦5,000"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Positioning for Examination
        </label>
        <input
          type="text"
          name="positioningExamination"
          value={form.positioningExamination}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. ₦10,000"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Weighbridge Charge
        </label>
        <input
          type="text"
          name="weighbridgeCharge"
          value={form.weighbridgeCharge}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. ₦2,000"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Storage Charge per (Tier/TEU)
        </label>
        <input
          type="text"
          name="storageCharge"
          value={form.storageCharge}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. ₦1,000/day"
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
        <button type="button" onClick={onBack} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400">Back</button>
        <button type="submit" className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow hover:from-green-700 hover:bg-green-500 transition">Next</button>
      </div>
    </form>
  );
}
