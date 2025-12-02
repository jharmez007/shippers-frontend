import { useState } from "react";

export default function VesselRummagingStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    timeAgenciesCoverage: data.timeAgenciesCoverage || "",
    busInOutHandling: data.busInOutHandling || "",
    jointVesselBody: data.jointVesselBody || "", // yes or no
    timeDuration: data.timeDuration || "",
    reasonNoJointBody: data.reasonNoJointBody || "",
    inspectionAgenciesForRummage: data.inspectionAgenciesForRummage || [""],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleJointBodyChange = (value) => {
    setForm({
      ...form,
      jointVesselBody: value,
      reasonNoJointBody: value === "no" ? form.reasonNoJointBody : "",
      timeDuration: value === "yes" ? form.timeDuration : "",
      inspectionAgenciesForRummage:
        value === "yes" ? form.inspectionAgenciesForRummage : [""],
    });
  };

  const handleAgencyChange = (idx, value) => {
    const updated = [...form.inspectionAgenciesForRummage];
    updated[idx] = value;
    setForm({ ...form, inspectionAgenciesForRummage: updated });
  };

  const handleAddAgency = () => {
    setForm({
      ...form,
      inspectionAgenciesForRummage: [...form.inspectionAgenciesForRummage, ""],
    });
  };

  const handleRemoveAgency = (idx) => {
    setForm({
      ...form,
      inspectionAgenciesForRummage: form.inspectionAgenciesForRummage.filter(
        (_, i) => i !== idx
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Time Agencies Converge */}
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Time Agencies Converge <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="timeAgenciesCoverage"
          value={form.timeAgenciesCoverage}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl shadow focus:ring-2 focus:ring-green-200 transition"
        />
      </div>

      {/* Bus-in and Bus-out Handling */}
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Bus-in and Bus-out Handling <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="busInOutHandling"
          value={form.busInOutHandling}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl shadow focus:ring-2 focus:ring-green-200 transition"
        />
      </div>

      {/* Joint Vessel Body - YES / NO */}
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
          Is there a joint body of vessel?
        </label>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="jointVesselBody"
              value="yes"
              checked={form.jointVesselBody === "yes"}
              onChange={() => handleJointBodyChange("yes")}
              required
              className="accent-green-600"
            />
            Yes
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="jointVesselBody"
              value="no"
              checked={form.jointVesselBody === "no"}
              onChange={() => handleJointBodyChange("no")}
              required
              className="accent-green-600"
            />
            No
          </label>
        </div>
      </div>

      {/* IF YES → Show Duration + Agencies */}
      {form.jointVesselBody === "yes" && (
        <>
          {/* Time Duration */}
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              Time Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="timeDuration"
              value={form.timeDuration}
              onChange={handleChange}
              required
              className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl shadow focus:ring-2 focus:ring-green-200 transition"
              placeholder="e.g. 2 hours"
            />
          </div>

          {/* Inspection Agencies */}
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              Inspection Agencies Present <span className="text-red-500">*</span>
            </label>

            {form.inspectionAgenciesForRummage.map((agency, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={agency}
                  onChange={(e) => handleAgencyChange(idx, e.target.value)}
                  required
                  className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl shadow focus:ring-2 focus:ring-green-200 transition"
                />

                {form.inspectionAgenciesForRummage.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAgency(idx)}
                    className="text-red-500 px-2 py-1 rounded hover:bg-red-100"
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
        </>
      )}

      {/* IF NO → Show Reason */}
      {form.jointVesselBody === "no" && (
        <div>
          <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
            Reason <span className="text-red-500">*</span>
          </label>
          <textarea
            name="reasonNoJointBody"
            value={form.reasonNoJointBody}
            onChange={handleChange}
            required
            className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 px-6 rounded-xl shadow focus:ring-2 focus:ring-green-200 transition"
            placeholder="Explain why there is no joint vessel body..."
            rows={3}
          ></textarea>
        </div>
      )}

      {/* Buttons */}
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
          className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </form>
  );
}
