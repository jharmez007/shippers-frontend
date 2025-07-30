import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getPortComplex, getTerminals } from "../../services/portComplexServices"; 


const schema = z.object({
  portComplex: z.string().min(1, "Port complex is required"),
  terminal: z.string().min(1, "Terminal is required"),
  shipper: z.string().min(1, "Shipper is required"),
  billOfLading: z.string().min(1, "B/L number is required"),
  containerNumber: z.string().min(7, "Container number is too short"),
  sealNumber: z.string().min(1, "Seal number is required"),
  consignee: z.string().min(1, "Consignee is required"),
  carriageBy: z.string().min(1, "Carriage info is required"),
  placeOfReceipt: z.string().min(1, "Place of receipt is required"),
  vesselVoyage: z.string().min(1, "Vessel/voyage number is required"),
  portOfLoading: z.string().min(1, "Port of loading is required"),
  portOfDischarge: z.string().min(1, "Port of discharge is required"),
  placeOfDelivery: z.string().min(1, "Place of delivery is required"),
  quantityPackages: z.string().min(1, "Quantity is required"),
  goodsDescription: z.string().min(1, "Description is required"),
  grossWeight: z.string().min(1, "Gross weight is required"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
  dateFlagged: z.string().min(1, "Date is required"),
});

const FlagContainerForm = ({ isOpen, onClose, addContainer }) => {
  const [portComplexes, setPortComplexes] = useState([]);
  const [terminals, setTerminals] = useState([]);
  const [selectedPort, setSelectedPort] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dateFlagged: new Date().toISOString().split("T")[0],
    },
  });

  // Watch portComplex for terminal fetching
  const portComplexWatch = watch("portComplex");

  useEffect(() => {
    if (isOpen) {
      // Fetch port complexes when modal opens
      (async () => {
        const res = await getPortComplex();
        if (Array.isArray(res.data?.data)) {
          setPortComplexes(res.data.data);
        } else if (Array.isArray(res.data)) {
          setPortComplexes(res.data);
        } else {
          setPortComplexes([]);
        }
      })();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!portComplexWatch) {
      setTerminals([]);
      setValue("terminal", "");
      return;
    }
    (async () => {
      const res = await getTerminals({ port_complex: portComplexWatch });
      if (Array.isArray(res.data?.data)) {
        setTerminals(res.data.data);
      } else if (Array.isArray(res.data)) {
        setTerminals(res.data);
      } else {
        setTerminals([]);
      }
      setValue("terminal", "");
    })();
  }, [portComplexWatch, setValue]);

  const onSubmit = (data) => {
    const newContainer = {
      id: Date.now().toString(),
      ...data,
      status: "Flagged",
    };

    addContainer(newContainer);

    toast.success("Container flagged!", {
      description: "The flagged container has been added.",
    });

    reset();
    onClose();
  };

  const renderInput = (name, label, placeholder = "", type = "text") => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
      />
      {errors[name] && (
        <p className="text-xs text-red-500 mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Flag New Container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 mt-6 w-full overflow-y-auto custom-scrollbar max-h-[80vh] p-2 pr-1"
      >
        {/* Port Complex and Terminal Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Port Complex</label>
            <select
              {...register("portComplex")}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              onChange={e => {
                setValue("portComplex", e.target.value);
                setSelectedPort(e.target.value);
              }}
              value={portComplexWatch || ""}
            >
              <option disabled value="">Select Port Complex</option>
              {portComplexes.map((port) => (
                <option key={port} value={port}>
                  {port}
                </option>
              ))}
            </select>
            {errors.portComplex && (
              <p className="text-xs text-red-500 mt-1">{errors.portComplex.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Terminal</label>
            <select
              {...register("terminal")}
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              disabled={!portComplexWatch}
            >
              <option disabled value="">Select Terminal</option>
              {terminals.map((terminal) => (
                <option key={terminal} value={terminal}>
                  {terminal}
                </option>
              ))}
            </select>
            {errors.terminal && (
              <p className="text-xs text-red-500 mt-1">{errors.terminal.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {renderInput("shipper", "Shipper")}
          {renderInput("billOfLading", "Bill of Lading No.")}
          {renderInput("containerNumber", "Container No.", "e.g. MSCU1234567")}
          {renderInput("sealNumber", "Seal No.")}
          {renderInput("consignee", "Consignee")}
          {renderInput("carriageBy", "Carriage By")}
          {renderInput("placeOfReceipt", "Place of Receipt")}
          {renderInput("vesselVoyage", "Vessel / Voyage No.")}
          {renderInput("portOfLoading", "Port of Loading")}
          {renderInput("portOfDischarge", "Port of Discharge")}
          {renderInput("placeOfDelivery", "Place of Delivery")}
          {renderInput("quantityPackages", "Quantity / No. of Packages")}
          {renderInput("grossWeight", "Gross Weight")}
          {renderInput("dateFlagged", "Date Flagged", "", "date")}
        </div>

        {/* Description of Goods */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description of Goods
          </label>
          <textarea
            {...register("goodsDescription")}
            rows={3}
            placeholder="Enter description of goods"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          {errors.goodsDescription && (
            <p className="text-xs text-red-500 mt-1">{errors.goodsDescription.message}</p>
          )}
        </div>

        {/* Reason for Flagging */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Flagging
          </label>
          <textarea
            {...register("reason")}
            rows={4}
            placeholder="Explain why the container is being flagged"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          {errors.reason && (
            <p className="text-xs text-red-500 mt-1">{errors.reason.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FlagContainerForm;
