import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { toast } from "sonner";

import { baseFields, userTypeFields } from "../constants/dummy"
import { DashboardHeader } from '../components';
import { editSettings } from "../services/settingsServices";


const Settings = () => {
  const [userType, setUserType] = useState("shipper");
  const [formData, setFormData] = useState({ ...baseFields });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (userType) {
      setFormData((prev) => ({
        ...baseFields,
        ...userTypeFields[userType],
      }));
    }
  }, [userType]);

  useEffect(() => {
    // Fetch user type from localStorage or API
    const storedUserType = localStorage.getItem('user_type');
    setUserType(storedUserType || ''); // Default to empty if not found
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
    const res = await editSettings(formData);
    toast.success(res.data.data.message);
  } catch (err) {
    const msg =
      err.response?.data?.data?.message || "Something went wrong!";
    toast.error(msg);
  } finally {
    setIsSubmitting(false);
  }
  };

  const renderExtraFields = () => {
    const fields = userTypeFields[userType];
    return Object.keys(fields).map((key) => (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <label className="block text-sm font-medium text-gray-700 capitalize">
          {key.replace(/_/g, " ")}
        </label>
        <input
          type="text"
          name={key}
          value={formData[key] || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </motion.div>
    ));
  }; 

  

  return (
    <main className="flex-1 p-6 space-y-6 md:h-screen md:overflow-y-auto">
      {/* Header */}
      <DashboardHeader />

      {/* Settings Content */}
      <section className="max-w-3xl mx-auto mt-8 bg-white rounded-2xl shadow-md p-8 space-y-8">
        <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>

        <form onSubmit={handleSubmit}>
          {/* Base Fields */}
          {["first_name", "last_name"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
           <div className="mb-4" >
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {"phone_number".replace(/_/g, " ")}
              </label>
              <input
                type="text"
                name="phone_number"
                value={formData["phone_number"].replace(/[^0-9]/g, '')}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          {/* Conditional Fields */}
          {renderExtraFields()}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Settings;
