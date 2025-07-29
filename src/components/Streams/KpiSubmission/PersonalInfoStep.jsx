import { useState } from "react";

export default function PersonalInfoStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    reportingOfficer: data.reportingOfficer || "",
    designation: data.designation || "",
    email: data.email || "",
    phone: data.phone || ""
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
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Name of Reporting Officer</label>
        <input
          type="text"
          name="reportingOfficer"
          value={form.reportingOfficer}
          onChange={handleChange}
          className="w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Designation</label>
        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
          className="w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          required
        />
      </div>

      <div>
        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full bg-gray-50 text-gray-900 font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow outline-none focus:ring-2 focus:ring-green-200 transition placeholder-green-300"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          required
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
