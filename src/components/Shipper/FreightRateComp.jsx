import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../ProgressBar';
import { toast } from 'sonner';

import { ArrowLeft } from 'lucide-react'; 
import { shipperFreighRateApplications } from '../../services/freightRateAppServices';
import { shipperFreighRateForm } from '../../services/freightRateFormServices';
import Loader from '../Loader';

export default function FreightRateForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    cci_number: '',
    form_a_number: '',
    nxp_number: '',
    invoice_number: '',
    bill_of_lading_number: '',
    beneficiary: '',
    voyage_from: '',
    voyage_to: '',
    cargo: '',
    number_of_units: '',
    price_per_unit: '',
    total_price: '',
    goods_description: '',
    quantity: '',
    port_of_loading: '',
    port_of_discharge: '',
    bank_name: '',
  });
  const [applicationId, setApplicationId] = useState(null); 
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(1); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  // Calculate total price
  const calculateTotalPrice = (numberOfUnits, pricePerUnit) => {
    const units = parseFloat(numberOfUnits) || 0;
    const price = parseFloat(pricePerUnit) || 0;
    return (units * price).toString();
  };

  // Validate required fields
  const validate = () => {
    let errorMsg = "";
    if (!formData.nxp_number.trim()) errorMsg = 'Form NXP Application No is required';
    else if (!formData.invoice_number.trim()) errorMsg = 'Invoice No is required';
    else if (!formData.beneficiary.trim()) errorMsg = 'Beneficiary is required';
    else if (!formData.voyage_from.trim()) errorMsg = 'Voyage From is required';
    else if (!formData.voyage_to.trim()) errorMsg = 'Voyage To is required';
    else if (!formData.cargo.trim()) errorMsg = 'Cargo is required';
    else if (!formData.number_of_units.trim()) errorMsg = 'Number of Units is required';
    else if (!formData.price_per_unit.trim()) errorMsg = 'Freight Price per Unit is required';
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
    navigate('/crd/shipper-dashboard/freight-rate-request');
  };

  // Step 0: Prefill logic
  const handleNextStep = async (e) => {
    e.preventDefault();

    if (step === 0 && !formData.form_a_number) {
      setError('Please enter a valid form A number.');
      return;
    }
    if (step === 0 && !formData.cci_number) {
      setError('Please enter a valid CCI Number.');
      return;
    }

    if (step === 0) {
      setLoading(true);
      try {
        const response = await shipperFreighRateApplications({
          form_a_number: formData.form_a_number,
          cci_number: formData.cci_number,
        });

        if (response.status === 201) {
          setError('');
          const data = response?.data?.data;
          setFormData((prev) => ({
            ...prev,
            title: data?.application?.title ?? "",
            nxp_number: data?.cci_data?.nxp_number ?? "",
            invoice_number: "",
            bill_of_lading_number: "",
            beneficiary: data?.form_a_data?.beneficiary ?? "",
            voyage_from: "",
            voyage_to: "",
            cargo: "",
            number_of_units: "",
            price_per_unit: "",
            total_price: "",
            goods_description: data?.cci_data?.goods_description ?? "",
            quantity: data?.cci_data?.quantity ?? "",
            port_of_loading: data?.cci_data?.port_of_loading ?? "",
            port_of_discharge: data?.cci_data?.port_of_discharge ?? "",
            bank_name: data?.form_a_data?.bank_name ?? "",
            cci_number: formData.cci_number,
            form_a_number: formData.form_a_number,
          }));
          setApplicationId(data?.application?.id ?? null);
          setDirection(1);
          setStep((prev) => prev + 1);
          toast.success(response?.data?.message || 'Proceed to complete the form.');
        } else {
          setError(response?.data?.message || 'You have already applied for this CCI number.');
          toast.error(response?.data?.message || 'You have already applied for this CCI number.');
        }
      } catch (err) {
        if (err?.response?.status === 400 || err?.response?.status === 403) {
          setError(err.response.data.message || 'You have already applied for this CCI number.');
          toast.error(err.response.data.message || 'You have already applied for this CCI number.');
        } else {
          setError('An error occurred while submitting title and CCI number.');
          toast.error('An error occurred while submitting title and CCI number.');
        }
      }
      setLoading(false);
      return;
    }

    setError('');
    if (step < steps.length - 1) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  // Final submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errorMsg = validate();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        application_id: applicationId,
      };

      const response = await shipperFreighRateForm(payload); 
      if (response.status === 201) {
        setFormData({
          title: '',
          cci_number: '',
          form_a_number: '',
          nxp_number: '',
          invoice_number: '',
          bill_of_lading_number: '',
          beneficiary: '',
          voyage_from: '',
          voyage_to: '',
          cargo: '',
          number_of_units: '',
          price_per_unit: '',
          total_price: '',
          goods_description: '',
          quantity: '',
          port_of_loading: '',
          port_of_discharge: '',
          bank_name: '',
        });
        setApplicationId(null); 
        setDirection(1);
        setStep((prev) => prev + 1); 
        toast.success('Freight rate submitted successfully!');
      } else {
        setError(response?.message || 'Failed to submit freight rate.');
        toast.error(response?.message || 'Failed to submit freight rate.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  // Steps
  const steps = [
    {
      id: 'title',
      title: 'Title of Request',
      content: (
        <>
          <h2 className="text-2xl font-bold text-blue-800">Freight Rate Submission Form</h2>
          <p className="text-black text-lg">
            In Order to Proceed, Provide <strong>CCI</strong> & <strong>Form A Number</strong> below
          </p>
          <form className="space-y-4" onSubmit={handleNextStep}>
            <input
              type="text"
              name="cci_number"
              placeholder="Input CCI Number"
              value={formData.cci_number || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-gray-100 focus:outline-none text-center"
            />
            <input
              type="text"
              name="form_a_number"
              placeholder="Input Form A Number"
              value={formData.form_a_number || ""}
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
      id: 'cci',
      title: 'CCI Number Entry',
      content: (
        <div className="w-full max-w-6xl bg-gray-100 rounded-xl p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-black rounded-sm mr-2"></div>
            <h1 className="text-xl sm:text-4xl font-bold">Freight Rate Submission Form</h1>
          </div>

          <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm" onSubmit={handleSubmit}>
            {/* Title */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3">
              <label className="block font-semibold text-xl mb-1">Title</label>
              <input
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className="w-full bg-white p-2 rounded text-xl italic"
                type="text"
              />
            </div>

            {/* Input Groups */}
            <div>
              <label className="block font-semibold text-xl mb-1">Form NXP Application No.</label>
              <input
                type="text"
                name="nxp_number"
                value={formData.nxp_number || ""}
                placeholder="cci autofill"
                className="w-full bg-white p-2 rounded text-xl"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Good Description</label>
              <input
                type="text"
                name="goods_description"
                value={formData.goods_description || ""}
                className="w-full bg-white p-2 rounded text-xl"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity || ""}
                className="w-full bg-white p-2 rounded text-xl"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Port of Loading</label>
              <input
                type="text"
                name="port_of_loading"
                value={formData.port_of_loading || ""}
                className="w-full bg-white p-2 rounded text-xl"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Port of Discharge</label>
              <input
                type="text"
                name="port_of_discharge"
                value={formData.port_of_discharge || ""}
                className="w-full bg-white p-2 rounded text-xl"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Bank</label>
              <input
                type="text"
                name="bank_name"
                value={formData.bank_name || ""}
                className="w-full bg-white p-2 rounded text-xl"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Beneficiary</label>
              <input
                type="text"
                name="beneficiary"
                value={formData.beneficiary || ""}
                className="w-full bg-white p-2 rounded text-xl"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Invoice</label>
              <input
                type="text"
                name="invoice_number"
                placeholder="click to type"
                value={formData.invoice_number || ""}
                onChange={handleChange}
                className="w-full bg-white p-2 rounded text-xl"
              />
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Bill of Lading No.</label>
              <input
                type="text"
                name="bill_of_lading_number"
                value={formData.bill_of_lading_number || ""}
                onChange={handleChange}
                placeholder="click to type"
                className="w-full bg-white p-2 rounded text-xl"
              />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className="block font-semibold text-xl mb-1">Voyage From</label>
                <input
                  type="date"
                  name="voyage_from"
                  value={formData.voyage_from || ""}
                  onChange={handleChange}
                  placeholder="start day"
                  className="w-full bg-white p-2 rounded text-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-xl mb-1">Voyage To</label>
                <input
                  type="date"
                  name="voyage_to"
                  value={formData.voyage_to || ""}
                  onChange={handleChange}
                  placeholder="end day"
                  className="w-full bg-white p-2 rounded text-xl"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold text-xl mb-1">Cargo</label>
              <input
                type="text"
                name="cargo"
                value={formData.cargo || ""}
                onChange={handleChange}
                placeholder="click to type"
                className="w-full bg-white p-2 rounded text-xl"
                required
              />
            </div>
            {/* Number of Units with numeric only logic */}
            <div>
              <label className="block text-xl font-semibold mb-1">No. of Units</label>
              <input
                name="number_of_units"
                value={formData.number_of_units || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData((prev) => ({
                    ...prev,
                    number_of_units: value,
                    total_price: calculateTotalPrice(value, prev.price_per_unit),
                  }));
                }}
                className="w-full text-xl bg-white p-2 rounded "
                type="text"
                placeholder="click to type"
                required
              />
            </div>
            {/* Freight Price */}
            <div>
              <label className="block text-xl font-semibold mb-1">Freight Price / Unit</label>
              <input
                name="price_per_unit"
                value={`$ ${formData.price_per_unit || ""}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setFormData((prev) => ({
                    ...prev,
                    price_per_unit: value,
                    total_price: calculateTotalPrice(prev.number_of_units, value),
                  }));
                }}
                className="w-full text-xl bg-white p-2 rounded"
                type="text"
                required
              />
            </div>
            {/* Freight Total */}
            <div>
              <label className="block text-xl font-semibold mb-1">Freight Total Price</label>
              <input
                name="total_price"
                value={`$ ${formData.total_price || ""}`}
                className="w-full text-xl bg-white p-2 rounded"
                type="text"
                readOnly
                required
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
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
      id: 'form',
      title: 'Freight Form',
      content: (
        <>
          <h2 className="text-2xl font-bold text-blue-800">Successfully Submitted for Confirmation</h2>
          <p className="text-black text-lg">
            Proceed to list of submissions
          </p>
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
