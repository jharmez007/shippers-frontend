import { useState } from "react";

export default function CargoDeliveryStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState({
    examinedByScanner: data.examinedByScanner || "",
    examinedByPhysical: data.examinedByPhysical || "",
    examinedByBoth: data.examinedByBoth || "",
    importsTruck: data.importsTruck || "",
    importsBarge: data.importsBarge || "",
    importsRail: data.importsRail || "",
    exportsTruck: data.exportsTruck || "",
    exportsBarge: data.exportsBarge || "",
    exportsRail: data.exportsRail || "",
    returnedTruck: data.returnedTruck || "",
    returnedBarge: data.returnedBarge || "",
    returnedRail: data.returnedRail || "",
    emptyShippedOut: data.emptyShippedOut || "",
    deliveryChallenges: data.deliveryChallenges || ""
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1 */}
      <div className="bg-gray-100 rounded-xl p-4">
        <h3 className="font-bold text-green-700 mb-3">Number of Containers Examined Daily</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Scanner <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="examinedByScanner"
              value={form.examinedByScanner}
              onChange={handleChange}
              required
              min={0}
              className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
              style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Physical <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="examinedByPhysical"
              value={form.examinedByPhysical}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">Scanner and Physical <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="examinedByBoth"
              value={form.examinedByBoth}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-gray-100 rounded-xl p-4">
        <h3 className="font-bold text-green-700 mb-3">Imports Exiting Terminal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Truck <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="importsTruck"
              value={form.importsTruck}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Barge <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="importsBarge"
              value={form.importsBarge}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Rail <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="importsRail"
              value={form.importsRail}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-gray-100 rounded-xl p-4">
        <h3 className="font-bold text-green-700 mb-3">Exports Handled</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Truck <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="exportsTruck"
              value={form.exportsTruck}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Barge <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="exportsBarge"
              value={form.exportsBarge}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Rail <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="exportsRail"
              value={form.exportsRail}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-gray-100 rounded-xl p-4">
        <h3 className="font-bold text-green-700 mb-3">Containers Returned</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Truck <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="returnedTruck"
              value={form.returnedTruck}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Barge <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="returnedBarge"
              value={form.returnedBarge}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">By Rail <span className="text-red-500">*</span></label>
            <input
              type="number"
              name="returnedRail"
              value={form.returnedRail}
              onChange={handleChange}
              required
              min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
            />
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div className="bg-gray-100 rounded-xl p-4">
        <h3 className="font-bold text-green-700 mb-3">Empty Containers Shipped Out <span className="text-red-500">*</span></h3>
        <div>
          <input
            type="number"
            name="emptyShippedOut"
            value={form.emptyShippedOut}
            onChange={handleChange}
            required
            min={0}
            className="appearance-none w-full text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
            style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          />
        </div>
      </div>

      {/* Challenges */}
      <div>
        <label className="text-green-700 font-semibold mb-2 flex items-center p-4 gap-2">Challenges in Delivery/Clearance</label>
        <textarea
          name="deliveryChallenges"
          value={form.deliveryChallenges}
          onChange={handleChange}
          rows="3"
          className="appearance-none w-full bg-gray-100 text-gray-900 outline-none font-medium py-3 pl-6 pr-8 rounded-xl border-0 shadow focus:ring-2 focus:ring-green-200 transition"
          style={{ boxShadow: "0 1px 4px 0 rgba(30,64,175,0.07)" }}
          placeholder="Describe any bottlenecks, delays, or other challenges faced during delivery or clearance"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={onBack} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
          Back
        </button>
        <button type="submit" className="px-8 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">
          Next
        </button>
      </div>
    </form>
  );
}
