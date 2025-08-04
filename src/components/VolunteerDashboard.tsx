import React, { useEffect, useState } from "react";

interface Volunteer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  interests?: string;
  hours: number;
  rank: string;
}

const VolunteerDashboard: React.FC = () => {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For demo, fetch volunteer data by id or from token (simplified)
  useEffect(() => {
    const fetchVolunteer = async () => {
      setLoading(true);
      setError("");
      try {
        // Replace with actual API call to get volunteer info for logged-in user
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/volunteers`
        );
        if (!response.ok) {
          setError("Failed to fetch volunteer data");
          setLoading(false);
          return;
        }
        const data: Volunteer[] = await response.json();
        // For demo, pick first volunteer
        if (data.length > 0) {
          setVolunteer(data[0]);
        } else {
          setError("No volunteer data found");
        }
      } catch (err) {
        setError("Network error");
      }
      setLoading(false);
    };
    fetchVolunteer();
  }, []);

  if (loading) {
    return <p>Loading volunteer dashboard...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!volunteer) {
    return <p>No volunteer data available.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-semibold text-center">
        Volunteer Dashboard
      </h2>
      <p>
        <strong>Name:</strong> {volunteer.name}
      </p>
      {volunteer.email && (
        <p>
          <strong>Email:</strong> {volunteer.email}
        </p>
      )}
      {volunteer.phone && (
        <p>
          <strong>Phone:</strong> {volunteer.phone}
        </p>
      )}
      {volunteer.interests && (
        <p>
          <strong>Interests:</strong> {volunteer.interests}
        </p>
      )}
      <p>
        <strong>Hours Contributed:</strong> {volunteer.hours}
      </p>
      <p>
        <strong>Rank:</strong> {volunteer.rank}
      </p>
      {/* Additional info like events helped, recognition levels can be added here */}
    </div>
  );
};

export default VolunteerDashboard;
