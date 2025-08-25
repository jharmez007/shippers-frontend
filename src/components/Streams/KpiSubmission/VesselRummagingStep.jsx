import { useState } from "react";

export default function VesselRummagingStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    timeAgenciesCoverage: data.timeAgenciesCoverage || "",
    busInOutHandling: data.busInOutHandling || "",
    jointExamination: data.jointExamination || "",
    timeDuration: data.timeDuration || "",
    inspectionAgenciesForRummage: data.inspectionAgenciesForRummage || [""],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleAgencyChange = (idx, value) => {
    const updated = [...form.inspectionAgenciesForRummage];
    updated[idx] = value;
    setForm({ ...form, inspectionAgenciesForRummage: updated });
  };

  const handleAddAgency = () => {
    setForm({ ...form, inspectionAgenciesForRummage: [...form.inspectionAgenciesForRummage, ""] });
  };

  const handleRemoveAgency = (idx) => {
    setForm({
      ...form,
      inspectionAgenciesForRummage: form.inspectionAgenciesForRummage.filter((_, i) => i !== idx)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Time Agencies Converge</label>
        <input
          type="text"
          name="timeAgenciesCoverage"
          value={form.timeAgenciesCoverage}
          onChange={handleChange}
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          placeholder="e.g. 08:00 - 17:00"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Bus-in and Bus-out Handling</label>
        <input
          type="text"
          name="busInOutHandling"
          value={form.busInOutHandling}
          onChange={handleChange}
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          placeholder="e.g. Handled by Port Authority"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Joint Examination of Ships</label>
        <input
          type="text"
          name="jointExamination"
          value={form.jointExamination}
          onChange={handleChange}
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          placeholder="e.g. Conducted by NDLEA and Customs"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Time Duration</label>
        <input
          type="text"
          name="timeDuration"
          value={form.timeDuration}
          onChange={handleChange}
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          placeholder="e.g. 2 hours"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Inspection Agencies Present</label>
        {form.inspectionAgenciesForRummage.map((agency, idx) => (
          <div key={idx} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={agency}
              onChange={e => handleAgencyChange(idx, e.target.value)}
              className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
              style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
              required
            />
            {form.inspectionAgenciesForRummage.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveAgency(idx)}
                className="text-red-500 px-2 py-1 rounded hover:bg-red-100"
                aria-label="Remove agency"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAgency}
          className="mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
        >
          + Add Agency
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400">Back</button>
        <button type="submit" className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow hover:from-green-700 hover:bg-green-500 transition">Next</button>
      </div>
    </form>
  );
}
