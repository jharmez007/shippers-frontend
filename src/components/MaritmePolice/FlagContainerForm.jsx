import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import { getPortComplex, getTerminals } from "../../services/portComplexServices";
import { flagContainer } from "../../services/maritimePoliceServices";

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
  reason: z.string().min(1, "Reason is required"),
  dateFlagged: z.string().min(1, "Date is required"),
});

const FlagContainerForm = ({ isOpen, onClose, addContainer }) => {
  const [portComplexes, setPortComplexes] = useState([]);
  const [terminals, setTerminals] = useState([]);
  const [selectedPort, setSelectedPort] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

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

  const onSubmit = async (data) => {
    setLoading(true);

    // Map form data to backend payload
    const payload = {
      shipper: data.shipper,
      consignee: data.consignee,
      container_no: data.containerNumber,
      seal_no: data.sealNumber,
      bill_of_lading: data.billOfLading,
      place_of_request: data.placeOfReceipt,
      place_of_loading: data.placeOfReceipt,
      port_of_loading: data.portOfLoading,
      port_of_delivery: data.placeOfDelivery,
      port_complex: data.portComplex,
      terminal: data.terminal,
      vessel_number: data.vesselVoyage,
      carriage_by: data.carriageBy,
      quantity: Number(data.quantityPackages),
      gross_weight: Number(data.grossWeight),
      reason_for_flagging: data.reason,
      goods_description: data.goodsDescription,
      date_flagged: data.dateFlagged,
      port_of_discharge: data.portOfDischarge,
    };

    // Handle file upload
    const file = fileInputRef.current?.files[0];
    let formData;
    if (file) {
      formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("document", file);
    }

    // Use FormData if file exists, else send JSON
    const res = await flagContainer(file ? formData : payload);

    setLoading(false);

    // Handle backend error for already flagged container
    if (res?.error) {
      toast.error(res.error);
      return;
    }

    if (res.status === 201 || res.status === 200) {
      toast.success("Container flagged!", {
        description: "The flagged container has been added.",
      });
      addContainer({
        id: Date.now().toString(),
        container_no: data.containerNumber,
        reason_for_flagging: data.reason,
        created_at: data.dateFlagged,
        status: "Flagged",
        terminal: data.terminal,
      });
      reset();
      onClose();
    } else {
      toast.error(res.message || "Failed to flag container.");
    }
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
        encType="multipart/form-data"
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
                <option key={port.id || port.name || port} value={port.name || port}>
                  {port.name || port}
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
                <option key={terminal.id || terminal.name || terminal} value={terminal.name || terminal}>
                  {terminal.name || terminal}
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

        {/* Upload Document */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Document (optional)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            accept="application/pdf,image/*"
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition text-sm"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-sm font-medium"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FlagContainerForm;
