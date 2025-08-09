// components/modals/ConfirmModal.tsx
import { Dialog } from "@headlessui/react";
import { Button } from "..";

const KPIConfirmModal = ({ open, onClose, onConfirm, title, description, confirmText }) => {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div className="bg-white p-6 rounded-xl shadow-xl z-10 max-w-sm w-full space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default KPIConfirmModal;
