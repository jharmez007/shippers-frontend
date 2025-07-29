import { useNavigate } from "react-router-dom";
import { Pencil, Mail, UserCircle2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  // You can fetch user data here later
  const user = {
    name: "Uche Okonkwo",
    email: "uche@example.com",
    role: "NSC Staff",
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10 animate-fadeIn">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-green-200 text-green-900 rounded-full flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-green-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Mail className="w-5 h-5 text-green-700" />
            <span>{user.email}</span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => alert("Edit profile coming soon")}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-800 hover:bg-green-900 rounded-md transition"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
