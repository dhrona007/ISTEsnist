import React from "react";
import { ArrowRight, Calendar, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-16"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg')] bg-cover bg-center opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-5xl font-bold text-white mt-8 mb-6">
            SNIST's ISTE Club
          </h1>
          <p className="text-xl md:text-2xl text-orange-300 mb-4 font-medium">
            Indian Society for Technical Education
          </p>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Empowering students through technology, innovation, and
            collaborative learning. Join us in shaping the future of technical
            education.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>Join Our Club</span>
            <ArrowRight className="h-5 w-5" />
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            View Events
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
            <Calendar className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              50+ Events
            </h3>
            <p className="text-gray-300">
              Technical workshops, seminars, and competitions
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
            <Users className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              150+ Members
            </h3>
            <p className="text-gray-300">
              Active student community across all departments
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 transform hover:scale-105 transition-all duration-300">
            <Trophy className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              25+ Awards
            </h3>
            <p className="text-gray-300">National and regional recognitions</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
