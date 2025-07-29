import React, { useState } from "react";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";

const fields = [
  "Invoicing",
  "Payment",
  "Receipting",
  "Examination Booking",
  "Obtaining TDO",
  "Claims",
  "Refunds"
];

const options = ["Manual", "Online", "Manual and Online"];

export default function TerminalReleaseStep({ data, onNext, onBack, onUpdate }) {
  const [form, setForm] = useState(
    fields.reduce((acc, field) => {
      acc[field] = data[field] || "";
      return acc;
    }, {})
  );

  const handleRadioChange = (field, option) => {
    setForm({ ...form, [field]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field} className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <h3 className="text-gray-700 font-semibold mb-2 flex items-center gap-2">{field}</h3>
          <div className="flex gap-6">
            {options.map((option) => (
              <label
                key={option}
                className={`flex items-center cursor-pointer px-4 py-2 rounded-lg transition
                  ${
                    form[field] === option
                      ? "bg-green-100 border border-green-400"
                      : "bg-white border border-gray-200 hover:bg-green-50"
                  }`}
              >
                <span className="mr-2">
                  {form[field] === option ? (
                    <MdCheckCircle className="text-green-600 text-xl" />
                  ) : (
                    <MdRadioButtonUnchecked className="text-gray-400 text-xl" />
                  )}
                </span>
                <span className="font-medium text-gray-700">{option}</span>
                <input
                  type="radio"
                  name={field}
                  value={option}
                  checked={form[field] === option}
                  onChange={() => handleRadioChange(field, option)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-200 text-gray-700 px-8 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-8 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition"
        >
          Next
        </button>
      </div>
    </form>
  );
}

