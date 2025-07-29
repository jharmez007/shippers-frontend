import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../constants';
import { LandingSlider } from '../../components';
import { Table2, Truck } from 'lucide-react'; // Icons

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full">

      {/* If logged in, show cards instead of hero section */}
      {isLoggedIn ? (
        <div className="relative w-full bg-gradient-to-br from-blue-100 to-green-100 py-16 px-4 flex flex-col items-center justify-center">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Choose a Portal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            {/* STREAMS Card */}
            <Link
              to="/streams-dashboard/dashboard"
              className="rounded-xl p-8 text-white shadow-md hover:shadow-xl transition duration-300 bg-blue-400 hover:scale-105 flex flex-col items-center justify-center gap-4"
            >
              <Table2 size={40} />
              <h2 className="text-xl font-bold">STREAMS</h2>
              <p className="text-sm opacity-80 text-bold text-center">For Terminal Operators</p>
            </Link>

            {/* CAMP Card */}
            <a
              href="/camp"
              className="rounded-xl p-8 text-white shadow-md hover:shadow-xl transition duration-300 bg-green-700 hover:scale-105 flex flex-col items-center justify-center gap-4"
            >
              <Truck size={40} />
              <h2 className="text-xl font-bold">CAMP</h2>
              <p className="text-sm opacity-80 text-center">Container Management</p>
            </a>
          </div>
        </div>
      ) : (
        // Original hero section if NOT logged in
        <div
          className="relative h-[400px] bg-cover w-full bg-center flex items-center justify-center text-white text-center px-4"
          style={{
            backgroundImage: `url(${images.img})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <h1 className="text-3xl md:text-5xl font-bold max-w-2xl z-10">
            Seamless Regulatory Services in Just One Click
          </h1>
        </div>
      )}

      <LandingSlider />
    </div>
  );
};

export default Home;
