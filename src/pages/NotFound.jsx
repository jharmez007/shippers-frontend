// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4 py-10">
      {/* Illustration */}
      <img
        src="https://undraw.co/api/illustrations/5b8592d0-2fe3-4228-b610-cae7c47e86d2" // Free unDraw illustration
        alt="Page not found"
        className="w-64 h-auto mb-8"
      />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-[#0E4C81] mb-2">404 - Page Not Found</h1>

      {/* Subtext */}
      <p className="text-gray-600 mb-6">
        Sorry, the page you’re looking for doesn't exist or has been moved.
      </p>

      {/* Go back button */}
      <Link
        to="/"
        className="inline-block bg-[#0E4C81] text-white px-6 py-3 rounded-lg hover:bg-[#093c65] transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
