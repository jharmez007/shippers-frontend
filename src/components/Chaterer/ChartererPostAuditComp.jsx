import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react'; 
import Loader from '../Loader';

export default function ChartererPostAuditComp() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    name_of_vessel: '',
    voyage_number: '',
    port_of_loading: '',
    port_of_discharge: '',
    voyage_from: '',
    voyage_to: '',
    others: '',
  });
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(1); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 


  // Simple validation
  const validate = () => {
    let errorMsg = "";
    if (!formData.title.trim()) errorMsg = 'Title is required';
    else if (!formData.name_of_vessel.trim()) errorMsg = 'Name of Vessel is required';
    else if (!formData.voyage_number.trim()) errorMsg = 'Voyage Number is required';
    else if (!formData.port_of_loading.trim()) errorMsg = 'Port of Loading is required';
    else if (!formData.port_of_discharge.trim()) errorMsg = 'Port of Discharge is required';
    else if (!formData.voyage_from.trim()) errorMsg = 'Voyage From date is required';
    else if (!formData.voyage_to.trim()) errorMsg = 'Voyage To date is required';
    return errorMsg;
  };

  // Step navigation
  const handlePrevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  // Controlled input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Navigation after submit
  const handleNavigate = () => {
    navigate('/charterer-dashboard/post-audit-request');
  };


  // Final submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success('Form submitted successfully!');
      setFormData({
        title: '',
        name_of_vessel: '',
        voyage_number: '',
        port_of_loading: '',
        port_of_discharge: '',
        voyage_from: '',
        voyage_to: '',
        others: '',
      });
      setStep(steps.length - 1);
    }, 1000);
  };

  // Steps
  const steps = [
    {
      id: 'details',
      title: 'Charter Party Details',
      content: (
        <>
            <h2 className="text-2xl font-bold text-blue-800">Post Audit Request Form</h2>
            <div className="w-full max-w-6xl bg-gray-100 rounded-xl p-4 sm:p-6">
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm" onSubmit={handleSubmit}>
                {[
                { label: 'Title', name: 'title' },
                { label: 'Name of Vessel', name: 'name_of_vessel' },
                { label: 'Voyage Number', name: 'voyage_number' },
                { label: 'Port of Loading', name: 'port_of_loading' },
                { label: 'Port of Discharge', name: 'port_of_discharge' },
                { label: 'Bill of Lading Number', name: 'bill_of_lading_number' },
                { label: 'Others', name: 'others' },
                ].map((field) => (
                <div key={field.name}>
                    <label className="block font-semibold text-xl mb-1">{field.label}</label>
                    <input
                    type="text"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full bg-white p-2 rounded text-xl"
                    />
                </div>
                ))}

                {/* Dates */}
                <div>
                <label className="block font-semibold text-xl mb-1">Voyage From</label>
                <input
                    type="date"
                    name="voyage_from"
                    value={formData.voyage_from}
                    onChange={handleChange}
                    className="w-full bg-white p-2 rounded text-xl"
                />
                </div>
                <div>
                <label className="block font-semibold text-xl mb-1">Voyage To</label>
                <input
                    type="date"
                    name="voyage_to"
                    value={formData.voyage_to}
                    onChange={handleChange}
                    className="w-full bg-white p-2 rounded text-xl"
                />
                </div>

                {/* Submit */}
                <div className="col-span-full">
                <button
                    type="submit"
                    className="flex items-center text-xl gap-2 bg-blue-800 text-white px-4 py-2 rounded-md"
                >
                    <span className="text-xl font-bold">+</span> Submit Request
                </button>
                {error && <p className="text-red-500 text-xl mt-1">{error}</p>}
                </div>
            </form>
            </div>
        </>
      ),
    },
    {
      id: 'success',
      title: 'Success',
      content: (
        <>
          <h2 className="text-2xl font-bold text-blue-800">Successfully Submitted!</h2>
          <p className="text-black text-lg">Proceed to list of submissions</p>
          <button
            onClick={handleNavigate}
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl"
          >
            Proceed
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {loading && <Loader />}
      <div className="h-[70vh] flex flex-col justify-start rounded-2xl shadow-md items-center bg-white px-4 py-10 relative">
        {step > 0 && (
          <button
            onClick={handlePrevStep}
            className="absolute left-6 top-6 text-blue-700 hover:text-blue-900 flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        )}
        <div className="relative w-full h-full max-w-7xl overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              initial={{ x: direction === 1 ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 1 ? '-100%' : '100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full h-full"
            >
              <div className="text-center space-y-6">{steps[step].content}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
