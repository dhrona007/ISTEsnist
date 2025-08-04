import React, { useState } from "react";

const VolunteerSignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/volunteers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            interests: formData.interests,
            hours: 0,
            rank: "New Volunteer",
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        setMessage(data.message || "Failed to sign up");
        return;
      }
      setMessage("Thank you for signing up as a volunteer!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        interests: "",
      });
    } catch (error) {
      setMessage("Network error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">Volunteer Sign-Up</h2>
      {message && <p className="text-center text-red-600">{message}</p>}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <textarea
        name="interests"
        placeholder="Areas of Interest"
        value={formData.interests}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
    </form>
  );
};

export default VolunteerSignUp;
