import { Outlet, useLocation, Link } from 'react-router-dom';

import StepItem from './StepItem/StepItem';
import { images } from '../constants';

const SignUpLayout = () => {
  const location = useLocation();
  const isEmailVerification = location.pathname === '/whoareyou/email-verification' || location.pathname === '/whoareyou/check-validation';
  

  // Find current step based on path
  const getCurrentStep = () => {
    switch (location.pathname) {
      case '/whoareyou':
        return 1;
      case '/whoareyou/department':
        return 1;
      case '/whoareyou/signup':
        return 2;
      case '/whoareyou/email-verification':
        return 3;
      case '/whoareyou/check-validation':
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col w-full lg:w-3/4 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 lg:px-10 lg:py-6">
          <Link to="/home">
            <img src={images.logo} alt="Logo" className="w-40 lg:w-60 mb-2" />
          </Link>
          {!isEmailVerification && (
            <div className="flex items-center space-x-2">
              <p className="text-gray-600 text-sm">Already a Member?</p>
              <Link
                to="/login"
                className="border border-gray-500 text-gray-700 text-sm px-4 py-1 rounded transition duration-300 hover:bg-gray-500 hover:text-white"
              >
                Log In
              </Link>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center h-full w-full px-4 lg:px-0">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="flex justify-center py-6">
          <div className="flex justify-center items-center">
            <img src={images.shippersLogo} alt="Logo" className="w-60 lg:w-80 mb-2" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="w-full lg:w-1/4 text-white flex flex-col justify-center items-center py-10 lg:py-0"
        style={{
          backgroundImage: `url(${images.signupbg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col space-y-6 lg:space-y-10">
          <StepItem currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;

