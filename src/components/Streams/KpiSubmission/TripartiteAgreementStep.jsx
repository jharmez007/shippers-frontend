import { useState } from "react";

export default function TripartiteAgreementStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    terminalDevelopmentExecution: data.terminalDevelopmentExecution || "",
    agreedGMT: data.agreedGMT || "",
    complianceLevel: data.complianceLevel || "",
    digitalizedProcesses: data.digitalizedProcesses || [""],
    ictBackupSystem: data.ictBackupSystem || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProcessChange = (index, value) => {
    const updated = [...form.digitalizedProcesses];
    updated[index] = value;
    setForm({ ...form, digitalizedProcesses: updated });
  };

  const handleAddProcess = () => {
    setForm({ ...form, digitalizedProcesses: [...form.digitalizedProcesses, ""] });
  };

  const handleRemoveProcess = (index) => {
    const updated = [...form.digitalizedProcesses];
    updated.splice(index, 1);
    setForm({ ...form, digitalizedProcesses: updated });
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
          Execution of Terminal Development Plan (%) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min="0"
          name="terminalDevelopmentExecution"
          value={form.terminalDevelopmentExecution}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. 85"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Agreed Guarantee Minimum Tonnage (GMT) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="agreedGMT"
          value={form.agreedGMT}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. 1,000,000 tons"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Level of Compliance with GMT <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="complianceLevel"
          value={form.complianceLevel}
          onChange={handleChange}
          className={inputClass}
          style={inputStyle}
          placeholder="e.g. 95% compliance"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          List of Digitalized Processes (specify the URL) <span className="text-red-500">*</span>
        </label>
        {form.digitalizedProcesses.map((url, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={url}
              onChange={(e) => handleProcessChange(idx, e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="e.g. https://example.com/process"
              required
            />
            {form.digitalizedProcesses.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveProcess(idx)}
                className="text-red-500 px-2 py-1 rounded hover:bg-red-100"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddProcess}
          className="mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          + Add URL
        </button>
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          ICT Back-up System <span className="text-red-500">*</span>
        </label>
        <textarea
          name="ictBackupSystem"
          value={form.ictBackupSystem}
          onChange={handleChange}
          rows="2"
          className={inputClass}
          style={inputStyle}
          placeholder="Describe the backup systems in place"
          required
        />
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400">Back</button>
        <button type="submit" className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow hover:from-green-700 hover:bg-green-500 transition">Next</button>
      </div>
    </form>
  );
}
