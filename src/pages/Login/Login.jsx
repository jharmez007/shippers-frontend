import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../services/loginServices";
import { images } from "../../constants";
import Loader from "../../components/Loader"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({}); // Inline errors
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: images.laptop,
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Shipping Quote Author",
    },
    {
      image: images.laptop,
      quote: "Second slide quote goes here.",
      author: "Second Author",
    },
    {
      image: images.laptop,
      quote: "Third slide quote here.",
      author: "Third Author",
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Validation
  const validateInputs = () => {
    const newErrors = {};

    if (!email) newErrors.email = "Please enter your email address.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address.";
    }

    if (!password) newErrors.password = "Please enter your password.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    if (rememberMe) localStorage.setItem("rememberedEmail", email);
    else localStorage.removeItem("rememberedEmail");

    try {
      const response = await login({ email, password });
      
      const token = response?.data?.data?.access_token;
      const refreshToken = response?.data?.data?.refresh_token;
      const userId = response?.data?.data?.user_id;
      const userType = response?.data?.data?.user_type;
      const first_name = response?.data?.data?.first_name;
      const last_name = response?.data?.data?.last_name;
      const department = response?.data?.data?.department;
      const division = response?.data?.data?.division;
      const is_head = response?.data?.data?.is_head;
      const agency_name = response?.data?.data?.agency_name;

      
      if (response.status === 200 && token) {
        setLoading(true);
        // Save session info
        localStorage.setItem("token", token);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("user_id", userId);
        localStorage.setItem("user_type", userType);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("last_name", last_name);
        localStorage.setItem("department", department);
        localStorage.setItem("division", division);
        localStorage.setItem("is_head", is_head);
        localStorage.setItem("agency_name", agency_name);

        // Navigate based on user type
        if (userType === "shipper") navigate("/crd/shipper-dashboard/dashboard");
        else if (userType === "terminal") navigate("/streams/terminal-dashboard/dashboard");
        else if (userType === "charterer") navigate("/crd/charterer-dashboard/dashboard");
        else if (userType === "shipping_line") navigate("/crd/shipping-lines-dashboard/dashboard");
        else if (userType === "regulator") navigate("/camp/maritime-police-dashboard/dashboard");
        else if (division === "M and T" && is_head) navigate("/home");
        else if (division === "SSD" && is_head) navigate("/nsc-ssd-head-dashboard/sop");
        else if (division === "SSD") navigate("/nsc-ssd-dashboard/sop");
        else if (division === "DRS") navigate("/home");
        else if (userType === "nsc") navigate("/home");
      } else {
        setErrors({ general: response?.message || "Login failed. Please try again." });
      }
    } catch (error) {
      setLoading(false);
      if (error.response?.status === 401) {
        setErrors({ general: "Invalid email or password." });
      } else {
        setErrors({ general: "Error connecting to the server. Please try again later." });
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {loading && <Loader />}
      {/* Left Section */}
      <div className="flex flex-col w-full lg:w-3/4 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 lg:px-10 lg:py-6">
          <Link to="/home">
            <img src={images.logo} alt="Logo" className="w-40 lg:w-60 mb-2" />
          </Link>
          <div className="flex items-center space-x-2">
            <p className="text-gray-600 text-sm">No Account yet?</p>
            <Link
              to="/whoareyou"
              className="border border-gray-500 text-gray-700 text-sm px-4 py-1 rounded transition duration-300 hover:bg-gray-500 hover:text-white"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-center h-full w-full px-4 lg:px-0">
          <div className="flex flex-col items-center justify-center flex-grow space-y-6 w-full max-w-lg">
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <h2 className="text-2xl font-bold text-center mb-2">Account Log In</h2>
              <p className="text-center text-gray-500 mb-6 uppercase tracking-widest">
                Please login to continue to your account
              </p>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-3 mb-1 border border-gray-300 rounded-xl focus:outline-none"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="relative mb-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
              </div>

              {errors.general && <p className="text-sm text-red-500 text-center">{errors.general}</p>}

              <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="form-checkbox text-blue-600 mr-2"
                  />
                  <span className="text-gray-700">Remember Me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-gray-500 hover:underline text-sm mt-2 lg:mt-0"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-sm font-semibold tracking-widest"
              >
                LOG IN
              </button>
            </form>

            <p className="mt-8 text-xs text-gray-500 text-center">
              By Creating an Account, it means you agree to our{' '}
              <a href="/login" className="underline text-gray-600">Privacy Policy</a> and{' '}
              <a href="/login" className="underline text-gray-600">Terms of Service</a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center py-6">
          <div className="flex justify-center items-center">
            <img src={images.shippersLogo} alt="Logo" className="w-40 lg:w-80 mb-2" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        className="w-full lg:w-1/4 text-white flex flex-col justify-center items-center py-10 lg:py-0"
        style={{
          backgroundImage: `url(${images.loginbg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Slide Image */}
        <div className="flex justify-center items-center pt-10 lg:pt-20">
          <img
            src={slides[currentSlide].image}
            alt="Slide"
            className="max-h-[200px] lg:max-h-[380px] object-contain drop-shadow-2xl transition-all duration-700"
          />
        </div>

        {/* Slider Dots */}
        <div className="flex space-x-2 my-4">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white" : "bg-gray-400"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Quote Section */}
        <div className="text-center my-6 px-6 pb-8">
          <div className="text-3xl lg:text-5xl font-extrabold">“</div>
          <p className="italic text-sm lg:text-base">{slides[currentSlide].quote}</p>
          <p className="text-sm lg:text-base mt-1">
            -{" "}
            <span className="font-semibold italic">{slides[currentSlide].author}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
