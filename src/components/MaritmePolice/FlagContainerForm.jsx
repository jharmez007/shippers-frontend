import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  containerNumber: z.string().min(7, "Enter a valid container number"),
  terminal: z.string().min(1, "Select a terminal"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
  dateFlagged: z.string(), // ISO date
});

const terminals = [
  "Apapa",
  "Tin Can Island",
  "Onne",
  "Port Harcourt",
  "Warri",
];

const FlagContainerForm = ({ isOpen, onClose, addContainer }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dateFlagged: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data) => {
    const newContainer = {
      id: Date.now().toString(),
      containerNumber: data.containerNumber,
      terminal: data.terminal,
      reason: data.reason,
      dateFlagged: data.dateFlagged,
      status: "Flagged",
    };

    addContainer(newContainer);

    toast.success("Container flagged!", {
      description: "The flagged container has been added to the table.",
      duration: 3000,
    });

    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Flag New Container">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
        {/* Container Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Container Number
          </label>
          <input
            {...register("containerNumber")}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            placeholder="e.g. MSCU1234567"
          />
          {errors.containerNumber && (
            <p className="text-xs text-red-500 mt-1">
              {errors.containerNumber.message}
            </p>
          )}
        </div>

        {/* Terminal */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Terminal
          </label>
          <select
            {...register("terminal")}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          >
            <option value="">Select Terminal</option>
            {terminals.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
          {errors.terminal && (
            <p className="text-xs text-red-500 mt-1">
              {errors.terminal.message}
            </p>
          )}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Flagging
          </label>
          <textarea
            {...register("reason")}
            rows={3}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            placeholder="Enter reason for flagging"
          />
          {errors.reason && (
            <p className="text-xs text-red-500 mt-1">
              {errors.reason.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Flagged
          </label>
          <input
            type="date"
            {...register("dateFlagged")}
            className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
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
