import { useEffect, useState } from 'react';
import { getFreightDetails } from '../services/bankFreightServices';
import { ReviewForm } from '../components';
import { motion, AnimatePresence } from 'framer-motion';

const ApplicationDetailModal = ({ applicationId, onClose }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    getFreightDetails({id: applicationId}).then(res => setDetails(res.data.data));
  }, [applicationId]);

  if (!details) return null;

  const { application, form } = details;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="bg-white p-6 rounded-xl max-w-3xl w-full shadow-lg overflow-y-auto max-h-[90vh]"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">📄 Application Details</h3>
            <button onClick={onClose} className="text-red-500 text-lg hover:text-red-700 transition">✖</button>
          </div>
          <div className="space-y-2 text-gray-700">
            <p><strong>Title:</strong> {application.title}</p>
            <p><strong>CCI Number:</strong> {application.cci_number}</p>
            <p><strong>Status:</strong> {application.status}</p>
            <p><strong>Submitted:</strong> {new Date(application.submitted_at).toLocaleDateString()}</p>
          </div>
          <hr className="my-4" />
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            {Object.entries(form).map(([key, value]) => (
              <p key={key}><strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value}</p>
            ))}
          </div>
          <ReviewForm applicationId={application.id} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ApplicationDetailModal