import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { getReportingOfficers, createReportingOfficer } from "../../../services/streamsServices";


export default function PersonalInfoStep({ data, onNext, onUpdate, onReset }) {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    reportingOfficer: data.reportingOfficer || "",
    designation: data.designation || "",
    email: data.email || "",
    phone: data.phone || ""
  });

  useEffect(() => {
  const fetchReportingOfficers = async () => {
    setLoading(true);
    try {
      const response = await getReportingOfficers();

      if (Array.isArray(response?.data?.data)) {
        setOfficers(response?.data?.data);
      } else {
        setOfficers([]);
        setError("No reporting officers found.");
      }
    } catch (error) {
      setError("Failed to fetch reporting officers.");
    } finally {
      setLoading(false);
    }
  };

  fetchReportingOfficers();
}, []);


  const handleOfficerSelect = (officer) => {
  const isSameOfficer =
    form.reportingOfficer === officer.name &&
    form.designation === officer.designation &&
    form.email === officer.email &&
    form.phone === officer.phone_number;

  if (!isSameOfficer) {
    onReset?.(); 
  }

  localStorage.setItem("officerId", officer.id);
  localStorage.setItem("officerName", officer.name);

  const selectedOfficerData = {
    reportingOfficer: officer.name,
    designation: officer.designation,
    email: officer.email,
    phone: officer.phone_number,
  };

  onUpdate(selectedOfficerData);
  onNext();
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      name: form.reportingOfficer,
      designation: form.designation,
      email: form.email,
      phone_number: form.phone
    };

    const response = await createReportingOfficer(payload);

    const officerId = response?.data?.data?.id;
    localStorage.setItem("officerId", officerId);

    // Optional: Push new officer to the list or refresh the list
    setOfficers((prev) => [...prev, response?.data?.data]);

    onUpdate(form);
    onNext();
  } catch (err) {
    console.error("Failed to create reporting officer", err);
    setError("Failed to create reporting officer. Please try again.");
  }
};


  return (
    <div className="space-y-6">
      {!showForm ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Select Reporting Officer</h2>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
              title="Create new profile"
            >
              <Plus size={20} />
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading officers...</p>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : officers.length === 0 ? (
            <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-lg border border-yellow-200">
              No reporting officers found. You need to{" "}
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="text-green-700 underline font-semibold hover:text-green-800"
              >
                create your profile
              </button>{" "}
              to proceed.
            </div>
          ) : (
            <div className="grid gap-3">
              {officers.map((officer) => (
                <button
                  key={officer.id}
                  type="button"
                  onClick={() => handleOfficerSelect(officer)}
                  className="text-left bg-white hover:bg-green-50 border border-gray-200 px-4 py-3 rounded-lg shadow-sm transition flex justify-between items-center"
                >
                  <div>
                    <div className="text-base font-semibold text-gray-800">{officer.name}</div>
                    <div className="text-sm text-gray-500">{officer.designation}</div>
                  </div>
                  <div className="text-xs text-gray-400">{officer.email}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Create New Reporting Officer</h2>
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              Name of Reporting Officer
            </label>
            <input
              type="text"
              name="reportingOfficer"
              value={form.reportingOfficer}
              onChange={handleChange}
              className="w-full bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-xl border-0 shadow outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              Designation
            </label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              className="w-full bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-xl border-0 shadow outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-xl border-0 shadow outline-none transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-gray-50 text-gray-900 font-medium py-3 px-4 rounded-xl border-0 shadow outline-none transition"
              required
            />
          </div>

          <div className="col-span-2 flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setShowForm(false)} // Switch back to officer list
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Create & Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
