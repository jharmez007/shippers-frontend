import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { resetPassword } from '../../services/resetPasswordServices';
import { images } from '../../constants';
import Loader from "../../components/Loader";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false); // Track success

  const validateInputs = () => {
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      setLoading(true);
      const response = await resetPassword({ token, password });

      if (response.status === 200) {
        setLoading(false);
        setIsResetSuccessful(true); // Set success state
        toast.success('Password reset successful!');
      } else {
        setLoading(false);
        toast.error(response?.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Server error. Try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      {loading && <Loader />}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img src={images.shippersLogo} alt="Logo" className="w-24 mx-auto mb-4" />

        {!isResetSuccessful ? (
          <>
            <h2 className="text-2xl font-semibold text-center text-[#0E4C81] mb-4">
              Reset Your Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4C81]"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4C81]"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0E4C81] text-white py-2 rounded-lg hover:bg-[#09385f]"
              >
                Reset Password
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#0E4C81] mb-4">
              Password Reset Successful!
            </h2>
            <p className="mb-6">You can now log in with your new password.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-[#0E4C81] text-white px-6 py-2 rounded-lg hover:bg-[#09385f]"
            >
              Go to Login
            </button>
          </div>
        )}


        {!isResetSuccessful && (
          <div className="mt-6 text-center">
            <a href="/login" className="text-sm text-[#0E4C81] hover:underline">
              Back to login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
