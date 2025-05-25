// src/pages/Signup.jsx
import  { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'sonner';


import { signup } from "../../services/signupServices";
import Loader from "../../components/Loader"; 

const Signup = () => {
  const location = useLocation();
  const userType = location.state?.userType; 

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    bankName: "",
    agencyName: "",
    address: "",
    department: "",
    division: "",
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    if (!form.firstName && ["shipper", "terminal", "shipping_line", "nsc", "vessel_charter"].includes(userType)) {
      toast.error("Please enter your first name.");
      return false;
    }
    if (!form.lastName && ["shipper", "terminal", "shipping_line", "nsc", "vessel_charter"].includes(userType)) {
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

    if (
      ["shipper", "terminal", "regulator", "shipping_line", "nsc", "bank", "vessel_charter"].includes(userType) &&
      !password
    ) {
      toast.error("Please enter your password.");
      return false;
    }
    if (
      ["shipper", "terminal", "regulator", "shipping_line", "nsc", "bank", "vessel_charter"].includes(userType) &&
      password.length < 6
    ) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (!form.bankName && userType === "bank") {
      toast.error("Please enter your bank name.");
      return false;
    }

    if (!form.agencyName && userType === "regulator") {
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

    if (!form.address && ["shipper", "terminal", "regulator", "shipping_line", "vessel_charter", "bank"].includes(userType)) {
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
        user_type: userType,
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phoneNumber,
        password: password,
        address: form.address,
        bank_name: form.bankName,
        department: form.department,
        division: form.division,
        agency_name: form.agencyName,
      };

      setLoading(true); 
      const response = await signup(payload);

      if (response.status === 201) {
          setLoading(false); 
          navigate("/whoareyou/email-verification", { state: { userType, email: form.email } });
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
        {userType}
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* Render form fields based on userType */}
        {[ "regulator", "bank"].includes(userType) && (
          <>
             {/* Render form fields based on userType */}
              {userType === "bank" && (
                <input
                  type="text"
                  placeholder="Bank Name"
                  name="bankName"
                  value={form.bankName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
                />
              )}

              {userType === "regulator" && (
                <input
                  type="text"
                  placeholder="Agency Name"
                  name="agencyName"
                  value={form.agencyName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
                />
              )}
            <input
              type="email"
              placeholder="Official Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
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
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

        {["shipper", "terminal", "shipping_line", "nsc", "vessel_charter"].includes(userType) && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
            />
            {userType === "nsc" && (
              <>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full p-3 pr-8 border border-gray-400 bg-[#f4f6fd] outline-none"
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
                    className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none mt-4"
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
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none"
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
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none pr-10"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
          className="w-full max-w-[400px] md:max-w-[600px] bg-[#3d5afe] text-white py-4 mt-4 text-lg font-semibold tracking-widest hover:bg-blue-700 transition-all duration-200"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Signup;
