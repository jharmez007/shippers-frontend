import { useState } from "react";

export default function ChallengesStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    operationalChallenges: data.operationalChallenges || "",
    suggestions: data.suggestions || ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Operational Challenges Faced <span className="text-red-500">*</span></label>
        <textarea
          name="operationalChallenges"
          value={form.operationalChallenges}
          onChange={handleChange}
          rows="4"
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          placeholder="List any operational or reporting challenges faced during this period"
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Suggestions for Improvement (Optional)</label>
        <textarea
          name="suggestions"
          value={form.suggestions}
          onChange={handleChange}
          rows="3"
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
        />
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400">Back</button>
        <button type="submit" className="bg-green-600 text-white px-10 py-3 rounded-xl font-bold shadow hover:from-green-700 hover:bg-green-500 transition">Next</button>
      </div>
    </form>
  );
}
