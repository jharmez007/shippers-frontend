import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaClipboardList } from "react-icons/fa";
import { MdOutlineAssignment, MdPerson, MdLocalShipping } from "react-icons/md";

import { submitThroughput } from "../../../services/streamsServices";
import {
  ServiceTypeStep, PersonalInfoStep, CargoThroughputStep,
  ChallengesStep, SummaryStep
} from "../..";

const steps = [
  { label: "Service Type & Submission Date", icon: <MdOutlineAssignment className="text-green-600" /> },
  { label: "Personal Information", icon: <MdPerson className="text-green-600" /> },
  { label: "Cargo Throughput", icon: <MdLocalShipping className="text-green-600" /> },
  { label: "Challenges", icon: <FaClipboardList className="text-green-600" /> },
  { label: "Review & Submit", icon: <FaCheckCircle className="text-green-600" /> }
];

const monthNameToNumber = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};


export default function ThroughputFormWrapper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const containerRef = useRef(null);

  const officer_id = localStorage.getItem("officerId");
  const officer_name = localStorage.getItem("officerName");


  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

   const resetForm = () => {
    setFormData({});
  };

  const renderStep = () => {
    const commonProps = {
      data: formData,
      onNext: handleNext,
      onBack: handleBack,
      onUpdate: updateFormData,
      onReset: resetForm,
    };

    switch (currentStep) {
      case 0: return <PersonalInfoStep {...commonProps} />;
      case 1: return <ServiceTypeStep {...commonProps} />;
      case 2: return <CargoThroughputStep {...commonProps} />;
      case 3: return <ChallengesStep {...commonProps} />;
      case 4:
        return (
          <SummaryStep
            data={formData}
            onBack={handleBack}
            onSubmit={async () => {
              try {
                const payload = {
                  cargo_type: formData?.terminalType,
                  month: monthNameToNumber[formData?.submissionMonth],
                  year: formData?.submissionYear,
                  officer_id: officer_id,
                  cargo_import: Number(formData?.import),
                  cargo_export: Number(formData?.export),
                  cargo_empty: Number(formData?.empty),
                  challenges: formData?.operationalChallenges,
                };
  
                const result = await submitThroughput(payload);
  
                if (result?.status === 200 || result?.status === 201) {
                  toast.success("Throughput successfully submitted!");
                  setFormData({});
                  setCurrentStep(0);
                } else {
                  toast.error(result?.message || "Failed to submit Throughput.");
                }
              } catch (error) {
                toast.error("Something went wrong during submission.");
              }
            }}
          />
        );
      default:
        return <div className="text-center text-gray-500">Step Not Found</div>;
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep]);

  return (
    <div
      ref={containerRef}
      className="max-w-5xl mx-auto px-4 py-6 h-[64vh] overflow-y-auto custom-scrollbar overflow-x-hidden bg-gray-50 rounded-lg shadow-md"
    >
      {/* Step Header */}
      <div className="mb-6 bg-white shadow-sm rounded-lg p-4 max-w-5xl flex items-center gap-4 justify-between flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50">
            {steps[currentStep].icon}
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">
              Step {currentStep + 1} of {steps.length}
            </h2>
            <p className="text-sm text-gray-500">{steps[currentStep].label}</p>
            <div className="w-full bg-gray-200 h-2 rounded mt-3">
              <div
                className="h-2 rounded bg-green-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Officer Name */}
        {officer_name && (
          <div className="text-sm text-gray-600 mt-4 sm:mt-0 sm:ml-auto">
            <span className="font-medium text-gray-800">Officer:</span> {officer_name}
          </div>
        )}
      </div>

      {/* Form Step with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-sm rounded-2xl p-4 md:p-6 border border-gray-200"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
