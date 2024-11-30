import { useEffect, useState } from "react";
import { ProfileDetails as ProfileComponent } from "../pages/ProfilePage"; // Renamed import to avoid conflict
import axios from "axios";

function ProfileDetails() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "https://api.thenotary.app/directory/customerDetails?username=nandha"
        );
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to fetch profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Tailwind animated spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading profile details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (<div className="bg-gray-100">
    
    <ProfileComponent profileData={profileData} />;
    </div>)
}

export default ProfileDetails;
