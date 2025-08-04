import React, { useState } from 'react';
import { Users, Award, Star, Heart } from 'lucide-react';

const Volunteers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    interests: '',
    experience: ''
  });

  const topVolunteers = [
    {
      name: 'Anita Desai',
      contributions: 25,
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg'
    },
    {
      name: 'Vikram Singh',
      contributions: 22,
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg'
    },
    {
      name: 'Meera Joshi',
      contributions: 20,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Volunteer application submitted:', formData);
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      year: '',
      interests: '',
      experience: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="volunteers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Volunteer Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Be part of our dynamic team and contribute to the growth of technical education in our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Volunteer Registration Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Heart className="h-6 w-6 text-red-500 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900">Become a Volunteer</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                <input
                  type="text"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  placeholder="e.g., Web Development, AI/ML, Event Management"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Experience (Optional)</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us about any relevant experience or skills"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200"
              >
                Submit Application
              </button>
            </form>
          </div>

          {/* Volunteer Recognition */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Award className="h-6 w-6 text-yellow-500 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">Top Volunteers</h3>
              </div>
              
              <div className="space-y-4">
                {topVolunteers.map((volunteer, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="relative">
                      <img
                        src={volunteer.image}
                        alt={volunteer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{volunteer.name}</h4>
                      <p className="text-sm text-gray-600">{volunteer.contributions} contributions</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-blue-900">#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-2xl font-semibold mb-4">Why Volunteer?</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-orange-300" />
                  <span>Build leadership and teamwork skills</span>
                </li>
                <li className="flex items-center">
                  <Star className="h-5 w-5 mr-3 text-orange-300" />
                  <span>Gain recognition and certificates</span>
                </li>
                <li className="flex items-center">
                  <Heart className="h-5 w-5 mr-3 text-orange-300" />
                  <span>Make a positive impact in the community</span>
                </li>
                <li className="flex items-center">
                  <Award className="h-5 w-5 mr-3 text-orange-300" />
                  <span>Enhance your resume and career prospects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteers;