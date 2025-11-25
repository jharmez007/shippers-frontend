// src/pages/Signup.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Loader from "../../components/Loader";
import { signup } from "../../services/signupServices";

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
    firstName: first_name || "",
    lastName: last_name || "",
    email: email || "",
    phoneNumber: phone_number || "",
    password: "",
    agencyName: agency || "",
    address: address || "",
    department: "",
    division: "",
    staffId: "",
  });

  const [errors, setErrors] = useState({});
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
    const newErrors = {};

    if (!form.firstName && ["individual", "nsc"].includes(userType))
      newErrors.firstName = "Please enter your first name.";

    if (!form.lastName && ["individual", "nsc"].includes(userType))
      newErrors.lastName = "Please enter your last name.";

    if (!form.staffId && ["nsc"].includes(userType))
      newErrors.staffId = "Please enter your staff ID.";

    if (!form.email) newErrors.email = "Please enter your email address.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^\d{10,14}$/;
    if (!form.phoneNumber || !phoneRegex.test(form.phoneNumber))
      newErrors.phoneNumber = "Please enter a valid phone number (10–14 digits).";

    if (!password) newErrors.password = "Please enter your password.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!form.agencyName && ["corporate", "regulator"].includes(userType))
      newErrors.agencyName = "Please enter your agency name.";

    if (!form.department && userType === "nsc")
      newErrors.department = "Please select your department.";

    if (form.department === "Regulatory" && !form.division)
      newErrors.division = "Please select your division.";

    if (!form.address && ["individual", "nsc", "corporate"].includes(userType))
      newErrors.address = "Please enter your address.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ return true if no errors
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field-specific error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      let payload = {
        user_type: userService,
        lookup_token,
        password,
      };

      if (userType === "regulator") {
        payload = {
          ...payload,
          agency_name: form.agencyName,
          email: form.email,
          phone_number: form.phoneNumber,
        };
      } else if (userType === "nsc") {
        payload = {
          ...payload,
          first_name: form.firstName,
          last_name: form.lastName,
          department: form.department,
          division: form.division,
          staff_id: form.staffId,
          email: form.email,
          phone_number: form.phoneNumber,
        };
      } else if (userService === "terminal" || userType === "corporate") {
        payload = {
          ...payload,
          agency_name: form.agencyName,
          email: form.email,
          phone_number: form.phoneNumber,
        };
      }

      setLoading(true);
      const response = await signup(payload);

      if (response.status === 201) {
        setLoading(false);
        navigate("/whoareyou/email-verification", {
          state: { userService, email: form.email },
        });
      } else {
        setLoading(false);
        setErrors({ general: response?.message || "Signup failed. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrors({ general: "Server error. Try again later." });
    }
  };

  useEffect(() => {
    if (["regulator", "nsc"].includes(userType)) {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        agencyName: "",
        address: "",
        department: "",
        division: "",
        staffId: "",
      });
      setPassword("");
      setConfirmPassword("");
    }
  }, [userType]);

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      {loading && <Loader />}
      <h1 className="text-3xl font-bold">Sign Up with NSC</h1>
      <p className="text-center text-gray-500 mb-8 uppercase tracking-widest">
        Kindly Fill in the form below to create your account
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
        {/* REGULATOR / CORPORATE */}
        {["regulator", "corporate"].includes(userType) && (
          <>
            <div>
              <input
                type="text"
                placeholder="Agency Name"
                name="agencyName"
                value={form.agencyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
              />
              {errors.agencyName && <p className="text-sm text-red-500 mt-1">{errors.agencyName}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Official Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={(form.phoneNumber || "").replace(/[^0-9]/g, "")}
                onChange={handleChange}
                className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
              />
              {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
            </div>

            {userType === "corporate" && (
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                />
                {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}
              </div>
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
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

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
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}

            <div className="w-full flex items-center justify-between mt-1">
              <div className="flex-grow h-1 mr-2 bg-gray-300 relative">
                <div className={`h-1 ${strengthColor}`}></div>
              </div>
              <span className="text-xs text-gray-500">Password Strength</span>
            </div>
          </>
        )}

        {/* INDIVIDUAL / NSC */}
        {["individual", "nsc"].includes(userType) && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                />
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                />
                {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {userType === "nsc" && (
              <>
                <input
                  type="text"
                  placeholder="Staff ID"
                  name="staffId"
                  value={form.staffId}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                />
                {errors.staffId && <p className="text-sm text-red-500 mt-1">{errors.staffId}</p>}
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}

            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
            />
            {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}

            {userType === "nsc" && (
              <>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl"
                >
                  <option value="">Select Your Department</option>
                  <option value="ICT">ICT</option>
                  <option value="CAD">CAD</option>
                  <option value="SPRD">SPRD</option>
                  <option value="ES/CEO">ES/CEO</option>
                  <option value="ITSD">ITSD</option>
                  <option value="Complaint Unit">Complaint Unit</option>
                  <option value="Regulatory">Regulatory</option>
                </select>
                {errors.department && <p className="text-sm text-red-500 mt-1">{errors.department}</p>}

                {form.department === "Regulatory" && (
                  <>
                    <select
                      name="division"
                      value={form.division}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-400 bg-[#f4f6fd] outline-none rounded-xl mt-2"
                    >
                      <option value="">Select Your Division</option>
                      <option value="M and T">M and T</option>
                      <option value="M and E">M and E</option>
                      <option value="SSD">SSD</option>
                      <option value="DRS">DRS</option>
                    </select>
                    {errors.division && <p className="text-sm text-red-500 mt-1">{errors.division}</p>}
                  </>
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
            {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address}</p>}

            {/* Password Fields */}
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
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

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
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}

            <div className="w-full flex items-center justify-between mt-1">
              <div className="flex-grow h-1 mr-2 bg-gray-300 relative">
                <div className={`h-1 ${strengthColor}`}></div>
              </div>
              <span className="text-xs text-gray-500">Password Strength</span>
            </div>
          </>
        )}

        {errors.general && (
          <p className="text-xs text-red-500 text-center mt-2">{errors.general}</p>
        )}

        <button
          type="submit"
          className="uppercase w-full bg-[#3d5afe] text-white py-4 mt-4 text-lg font-semibold tracking-widest rounded-md hover:bg-blue-700 transition-all duration-200"
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Signup;
