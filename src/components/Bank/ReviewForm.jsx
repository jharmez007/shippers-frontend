import { useState } from 'react';
import { reviewApplication } from '../../services/bankFreightServices';
import { toast } from "sonner";

const ReviewForm = ({ applicationId }) => {
  const [action, setAction] = useState('');
  const [reason, setReason] = useState('');

  const handleReview = async () => {
    if (!action) return toast.info('Please select an action');
    if (action === 'reject' && !reason) return toast.warning('Please provide a reason');

    try {
        const payload = {
            id: applicationId,
            action,
            reason,
        };
      const res = await reviewApplication(payload);
      if (res.data.data.review_status === "submitted_to_nsc") {
        toast.success('Application submitted to NSC for review');
      } else if (res.data.data.review_status === "rejected") {
        toast.success('Application Rejected'); 
      } 
    } catch (err) {
      toast.info('Something went wrong');
    }
  };

  return (
    <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
      <h4 className="font-semibold text-gray-800 mb-2">📝 Review Application</h4>
      <div className="flex flex-col gap-3">
        <select
          className="border px-4 py-2 rounded focus:ring focus:ring-blue-300"
          value={action}
          onChange={e => setAction(e.target.value)}
        >
          <option value="">Select Action</option>
          <option value="accept">Accept</option>
          <option value="reject">Reject</option>
        </select>

        {action === 'reject' && (
          <textarea
            className="border px-4 py-2 rounded focus:ring focus:ring-red-300"
            placeholder="Reason for rejection"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />
        )}

        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition shadow"
          onClick={handleReview}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};
 export default ReviewForm