// src/pages/Signup.jsx
import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'sonner';


import { signup } from "../../services/signupServices";
import Loader from "../../components/Loader"; 

const Signup = () => {
  const userType = localStorage.getItem("userType");
  const userService = localStorage.getItem("userService");
  const address = localStorage.getItem("address");
  const email = localStorage.getItem("email");
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const phone_number = localStorage.getItem("phone_number");
  const agency = localStorage.getItem("company_name");
  const lookup_token = localStorage.getItem("lookup_token");


  const [form, setForm] = useState({
    firstName: first_name,
    lastName: last_name,
    email: email,
    phoneNumber: phone_number,
    password: "",
    agencyName: agency,
    address: address,
    department: "",
    division: "",
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [loading, setLoading] = useState(false); 
  
  const navigate = useNavigate();


  const getPasswordStrength = (pwd) => {
    if (pwd.length > 8 && /[A-Z]/.test(pwd) && /[\d\W]/.test(pwd)) return "strong";
    if (pwd.length > 5) return "medium";
    return "weak";
  };

  const strength = getPasswordStrength(password);
  const strengthColor = {
    weak: "bg-red-500 w-1/3",
    medium: "bg-yellow-500 w-2/3",
    strong: "bg-green-500 w-full",
  }[strength];

  const validateInputs = () => {
    if (!form.firstName && ["individual", "nsc"].includes(userType)) {
      toast.error("Please enter your first name.");
      return false;
    }
    if (!form.lastName && ["individual", "nsc"].includes(userType)) {
      toast.error("Please enter your last name.");
      return false;
    }
    if (!form.email) {
      toast.error("Please enter your email address.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    const phoneRegex = /^\d{10,14}$/;

    if (!form.phoneNumber || !phoneRegex.test(form.phoneNumber)) {
      toast.error("Please enter a valid phone number (10-14 digits)");
      return false;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (!confirmPassword) {
      toast.error("Please confirm your password.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    if (!form.agencyName && userType === "corporate") {
      toast.error("Please enter your agency name.");
      return false;
    }

    if (!form.agencyName && userType === "government") {
      toast.error("Please enter your agency name.");
      return false;
    }

    if (!form.department && userType === "nsc") {
      toast.error("Please select your department.");
      return false;
    }

    if (form.department === "regulatory" && !form.division) {
      toast.error("Please select your division.");
      return false;
    }

    if (!form.address && ["individual", "nsc", "corporate"].includes(userType)) {
      toast.error("Please enter your address.");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const payload = {
        user_type: userService,
        lookup_token: lookup_token,
        password: password,
      };

      setLoading(true); 
      const response = await signup(payload);

      if (response.status === 201) {
          setLoading(false); 
          navigate("/whoareyou/email-verification", { state: { userService, email: form.email } });
      } else {
        setLoading(false); 
        toast.error(response?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Hide the loader
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      {loading && <Loader />} {/* Show the loader when loading */}
      <h1 className="text-3xl font-bold">Sign Up with NSC</h1>
      <p className="text-center text-gray-500 mb-8 uppercase tracking-widest">
        Kindly Fill in the form below to create your account
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* Render form fields based on userType */}
        {[ "government", "corporate"].includes(userType) && (
          <>
             {/* Render form fields based on userType */}
              {userType === "corporate" && (
                <input
                  type="text"
                  placeholder="Agency Name"
                  name="agencyName"
                  value={form.agencyName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                />
              )}

              {userType === "government" && (
                <input
                  type="text"
                  placeholder="Agency Name"
                  name="agencyName"
                  value={form.agencyName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                />
              )}
            <input
              type="email"
              placeholder="Official Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber.replace(/[^0-9]/g, '')}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
            />
            {userType === "corporate" && (
              <input
                type="text"
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
              />
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleChange(e);
                }}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10 rounded-xl"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10 rounded-xl"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-1">
              <div className="flex-grow h-1 mr-2 bg-gray-300 relative">
                <div className={`h-1 ${strengthColor}`}></div>
              </div>
              <span className="text-xs text-gray-500">Password Strength</span>
            </div>
          </>
        )}

        {["individual", "nsc"].includes(userType) && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={(form.phoneNumber || '').replace(/[^0-9]/g, '')}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
            />
            {userType === "nsc" && (
              <>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full p-3 pr-8 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                >
                  <option value="" disabled>
                    Select Your Department
                  </option>
                  <option value="ICT">ICT</option>
                  <option value="CAD">CAD</option>
                  <option value="SPRD">SPRD</option>
                  <option value="ES/CEO">ES/CEO</option>
                  <option value="ITSD">ITSD</option>
                  <option value="Complaint Unit">Complaint Unit</option>
                  <option value="Regulatory">Regulatory</option>
                </select>

                {/* Division Dropdown for Regulatory Department */}
                {form.department === "Regulatory" && (
                  <select
                    name="division"
                    value={form.division || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none mt-4 rounded-xl"
                  >
                    <option value="" disabled>
                      Select Your Division
                    </option>
                    <option value="M and T">M and T</option>
                    <option value="M and E">M and E</option>
                    <option value="SSD">SSD</option>
                    <option value="DRS">DRS</option>
                  </select>
                )}
              </>
            )}
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleChange(e);
                }}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10 rounded-xl"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10 rounded-xl"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
            <div className="w-full flex items-center justify-between mt-1">
              <div className="flex-grow h-1 mr-2 bg-gray-300 relative">
                <div className={`h-1 ${strengthColor}`}></div>
              </div>
              <span className="text-xs text-gray-500">Password Strength</span>
            </div>
          </>
        )}

        <button
          type="submit"
          className="uppercase w-full max-w-[400px] md:max-w-[600px] bg-[#3d5afe] text-white py-4 mt-4 text-lg font-semibold tracking-widest rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          SIGN UP
        </button>
      </form>
      <p className="mt-8 text-xs text-gray-500 text-center">
        By Creating an Account, it means you agree to our{' '}
        <a href="/whoareyou/signup" className="underline text-gray-600">Privacy Policy</a> and{' '}
        <a href="/whoareyou/signup" className="underline text-gray-600">Terms of Service</a>
      </p>
    </div>
  );
};

export default Signup;
