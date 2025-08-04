import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

const About = () => {
  const boardMembers = [
    {
      name: 'Arjun Sharma',
      role: 'President',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      email: 'president@iste.club',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Priya Patel',
      role: 'Vice President',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      email: 'vp@iste.club',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Rahul Kumar',
      role: 'Technical Lead',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      email: 'tech@iste.club',
      linkedin: '#',
      github: '#'
    },
    {
      name: 'Sneha Gupta',
      role: 'Events Coordinator',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg',
      email: 'events@iste.club',
      linkedin: '#',
      github: '#'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About ISTE */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About ISTE</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The Indian Society for Technical Education (ISTE) is a national professional society 
              for the technical education system in the country. Our student chapter aims to foster 
              technical education, research, and innovation among students.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To promote and advance technical education, facilitate knowledge sharing, 
                  and create opportunities for students to excel in their chosen fields.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading platform for technical education and innovation, 
                  contributing to India's technological advancement and global competitiveness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Board Members */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Board Members 2024-25</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                    <a href={member.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={member.github} className="text-gray-400 hover:text-gray-900 transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;