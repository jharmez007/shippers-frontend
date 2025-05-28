import { useEffect, useState } from "react";

import { getProfile } from "../services/settingsServices";
import { DashboardHeader } from "../components";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile().then((res) => setProfile(res.data.data.profile));
  }, []);

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f1f5f9]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <main className="flex-1 p-6  min-h-screen">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-10">
        {/* User Info Card */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6"
        >
          <h3 className="text-xl font-semibold text-green-600 mb-4">Account Details</h3>
          <div className="space-y-3 text-gray-700">
            <Detail
              label="Full Name"
              value={
                ["bank", "regulator"].includes(profile.user_type)
                  ? profile.first_name
                  : `${profile.first_name} ${profile.last_name}`
              }
            />
            <Detail label="Email" value={profile.email} />
            <Detail label="Phone Number" value={profile.phone_number} />
            <Detail label="User Type" value={profile.user_type} />
          </div>
        </div>

        {/* Status Info Card */}
        <div
          className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6"
        >
          <h3 className="text-xl font-semibold text-green-600 mb-4">Account Status</h3>
          <div className="space-y-3 text-gray-700">
            <Detail label="Verified" value={profile.is_verified ? "Yes ✅" : "No ❌"} />
            <Detail label="Validated" value={profile.is_validated ? "Yes ✅" : "No ❌"} />
            <Detail label="Date Joined" value={new Date(profile.created_at).toLocaleDateString()} />
          </div>
        </div>
      </div>
    </main>
  );
};

// Reusable Detail Component
const Detail = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-right font-semibold text-gray-900">{value}</span>
  </div>
);

export default Profile;
