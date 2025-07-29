import { useState } from "react";

export default function CargoExaminationStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    documentationTime: data.documentationTime || "",
    positioningTime: data.positioningTime || "",
    avgContainersPositioned: data.avgContainersPositioned || "",
    jointExam: data.jointExam || "no",
    commencementOfExam: data.commencementOfExam || "",
    closeOfExam: data.closeOfExam || "",
    inspectionAgencies: data.inspectionAgencies || [""]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleJointExamChange = (e) => {
    setForm({ ...form, jointExam: e.target.value });
    if (e.target.value === "no") {
      setForm((prev) => ({ ...prev, commencementOfExam: "" }));
    }
  };

  const handleAgencyChange = (idx, value) => {
    const updated = [...form.inspectionAgencies];
    updated[idx] = value;
    setForm({ ...form, inspectionAgencies: updated });
  };

  const handleAddAgency = () => {
    setForm({ ...form, inspectionAgencies: [...form.inspectionAgencies, ""] });
  };

  const handleRemoveAgency = (idx) => {
    setForm({
      ...form,
      inspectionAgencies: form.inspectionAgencies.filter((_, i) => i !== idx)
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
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Average Time for Documentation (hours)</label>
        <input
          type="number"
          name="documentationTime"
          value={form.documentationTime}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Time for Positioning of Container (hours)</label>
        <input
          type="number"
          name="positioningTime"
          value={form.positioningTime}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Average Number of Containers Positioned</label>
        <input
          type="number"
          name="avgContainersPositioned"
          value={form.avgContainersPositioned}
          onChange={handleChange}
          required
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Is there a joint exam?</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
            <input
              type="radio"
              name="jointExam"
              value="yes"
              className="accent-blue-600"
              checked={form.jointExam === "yes"}
              onChange={handleJointExamChange}
            />
            Yes
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-800">
            <input
              type="radio"
              name="jointExam"
              value="no"
              className="accent-blue-600"
              checked={form.jointExam === "no"}
              onChange={handleJointExamChange}
            />
            No
          </label>
        </div>
      </div>

      {form.jointExam === "yes" && (
        <>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Commencement of Examination</label>
            <input
              type="text"
              name="commencementOfExam"
              value={form.commencementOfExam}
              onChange={handleChange}
              className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
              style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Close of Examination</label>
            <input
              type="text"
              name="closeOfExam"
              value={form.closeOfExam}
              onChange={handleChange}
              className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
              style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
           <div>
              <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Inspection Agencies Present</label>
              {form.inspectionAgencies.map((agency, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={agency}
                    onChange={e => handleAgencyChange(idx, e.target.value)}
                    className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
                    style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
                    required
                  />
                  {form.inspectionAgencies.length > 1 && (
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
        </>
      )}

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400">Back</button>
        <button type="submit" className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow hover:from-green-700 hover:bg-green-500 transition">Next</button>
      </div>
    </form>
  );
}
