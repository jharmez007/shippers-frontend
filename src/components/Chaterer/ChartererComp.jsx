import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react'; 
import Loader from '../Loader';

export default function ChartererComp() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    pacc_number: '',
    form_a_number: '',
    name_of_vessel: '',
    voyage_number: '',
    port_of_loading: '',
    port_of_discharge: '',
    voyage_from: '',
    voyage_to: '',
    bill_of_lading_number: '',
    bank_name: '',
    invoice_number: '',
    charter_party_fee: '',
    number_of_days: '',
    charter_party_total_price: '',
    cargo_quantity: '',
    others: '',
  });
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(1); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  // Calculate total price
  const calculateTotalPrice = (days, fee) => {
    const d = parseFloat(days) || 0;
    const f = parseFloat(fee) || 0;
    return (d * f).toString();
  };

  // Simple validation
  const validate = () => {
    let errorMsg = "";
    if (!formData.pacc_number.trim()) errorMsg = 'PACC Number is required';
    else if (!formData.title.trim()) errorMsg = 'Title is required';
    else if (!formData.form_a_number.trim()) errorMsg = 'Form A Number is required';
    else if (!formData.name_of_vessel.trim()) errorMsg = 'Name of Vessel is required';
    else if (!formData.voyage_number.trim()) errorMsg = 'Voyage Number is required';
    else if (!formData.port_of_loading.trim()) errorMsg = 'Port of Loading is required';
    else if (!formData.port_of_discharge.trim()) errorMsg = 'Port of Discharge is required';
    else if (!formData.voyage_from.trim()) errorMsg = 'Voyage From date is required';
    else if (!formData.voyage_to.trim()) errorMsg = 'Voyage To date is required';
    else if (!formData.bill_of_lading_number.trim()) errorMsg = 'Bill of Lading Number is required';
    else if (!formData.bank_name.trim()) errorMsg = 'Bank Name is required';
    else if (!formData.invoice_number.trim()) errorMsg = 'Invoice Number is required';
    else if (!formData.charter_party_fee.trim()) errorMsg = 'Charter Party Fee is required';
    else if (!formData.number_of_days.trim()) errorMsg = 'Number of Days is required';
    else if (!formData.cargo_quantity.trim()) errorMsg = 'Cargo Quantity is required';
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
    navigate('/crd/charterer-dashboard/charter-party-request');
  };

  // Step handling
  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) {
      setError('');
      setDirection(1);
      setStep((prev) => prev + 1);
    }
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
        pacc_number: '',
        form_a_number: '',
        name_of_vessel: '',
        voyage_number: '',
        port_of_loading: '',
        port_of_discharge: '',
        voyage_from: '',
        voyage_to: '',
        bill_of_lading_number: '',
        bank_name: '',
        invoice_number: '',
        charter_party_fee: '',
        number_of_days: '',
        charter_party_total_price: '',
        cargo_quantity: '',
        others: '',
      });
      setStep(steps.length - 1);
    }, 1000);
  };

  // Steps
  const steps = [
    {
      id: 'pacc',
      title: 'PACC and Form A',
      content: (
        <>
          <h2 className="text-2xl font-bold text-blue-800">Charter Party Form</h2>
          <p className="text-black text-lg">
            Provide <strong>PACC Number</strong> & <strong>Form A Number</strong> to proceed
          </p>
          <form className="space-y-4" onSubmit={handleNextStep}>
            <input
              type="text"
              name="pacc_number"
              placeholder="Input PACC Number"
              value={formData.pacc_number}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none text-center"
            />
            <input
              type="text"
              name="form_a_number"
              placeholder="Input Form A Number"
              value={formData.form_a_number}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none text-center"
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl"
            >
              Proceed
            </button>
          </form>
        </>
      ),
    },
    {
      id: 'details',
      title: 'Charter Party Details',
      content: (
        <div className="w-full max-w-6xl bg-gray-100 rounded-xl p-4 sm:p-6">
          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm" onSubmit={handleSubmit}>
            {[
              { label: 'Title', name: 'title' },
              { label: 'Name of Vessel', name: 'name_of_vessel' },
              { label: 'Voyage Number', name: 'voyage_number' },
              { label: 'Port of Loading', name: 'port_of_loading' },
              { label: 'Port of Discharge', name: 'port_of_discharge' },
              { label: 'Bill of Lading Number', name: 'bill_of_lading_number' },
              { label: 'Bank Name', name: 'bank_name' },
              { label: 'Invoice Number', name: 'invoice_number' },
              { label: 'Cargo Quantity', name: 'cargo_quantity' },
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

            {/* Fees */}
            <div>
              <label className="block font-semibold text-xl mb-1">Charter Party Fee</label>
              <input
                type="text"
                name="charter_party_fee"
                value={formData.charter_party_fee}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setFormData((prev) => ({
                    ...prev,
                    charter_party_fee: value,
                    charter_party_total_price: calculateTotalPrice(prev.number_of_days, value),
                  }));
                }}
                className="w-full bg-white p-2 rounded text-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Number of Days</label>
              <input
                type="text"
                name="number_of_days"
                value={formData.number_of_days}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData((prev) => ({
                    ...prev,
                    number_of_days: value,
                    charter_party_total_price: calculateTotalPrice(value, prev.charter_party_fee),
                  }));
                }}
                className="w-full bg-white p-2 rounded text-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Total Price</label>
              <input
                type="text"
                name="charter_party_total_price"
                value={formData.charter_party_total_price}
                readOnly
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
      <div className="h-[1000px] flex flex-col justify-start rounded-2xl shadow-md items-center bg-white px-4 py-10 relative">
        <div className="mb-10">
          <ProgressBar currentStep={step + 1} totalSteps={steps.length} />
        </div>
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
