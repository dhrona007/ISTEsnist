import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';

const Events = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingEvents = [
    {
      title: 'AI & Machine Learning Workshop',
      date: '2024-02-15',
      time: '10:00 AM - 4:00 PM',
      venue: 'Computer Lab A',
      description: 'Hands-on workshop covering fundamentals of AI and ML with practical projects.',
      capacity: '50 students',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    },
    {
      title: 'Tech Talk: Blockchain Revolution',
      date: '2024-02-22',
      time: '2:00 PM - 4:00 PM',
      venue: 'Auditorium',
      description: 'Industry expert discussion on blockchain technology and its applications.',
      capacity: '100 students',
      image: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg'
    },
    {
      title: 'Coding Competition 2024',
      date: '2024-03-05',
      time: '9:00 AM - 6:00 PM',
      venue: 'Multiple Labs',
      description: 'Annual coding competition with exciting prizes and recognition.',
      capacity: '200 students',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'
    }
  ];

  const pastEvents = [
    {
      title: 'Web Development Bootcamp',
      date: '2024-01-20',
      venue: 'Computer Lab B',
      description: 'Comprehensive bootcamp covering HTML, CSS, JavaScript, and React.',
      participants: '75 students',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    },
    {
      title: 'IoT Innovation Summit',
      date: '2024-01-10',
      venue: 'Conference Hall',
      description: 'Showcase of innovative IoT projects by students and industry experts.',
      participants: '120 students',
      image: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg'
    },
    {
      title: 'Cybersecurity Awareness Session',
      date: '2023-12-15',
      venue: 'Auditorium',
      description: 'Educational session on cybersecurity best practices and threat awareness.',
      participants: '200 students',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg'
    }
  ];

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest technical events, workshops, and competitions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'past'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {/* Upcoming Events */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {event.capacity}
                    </div>
                  </div>

                  <button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>Register Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Events */}
        {activeTab === 'past' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {event.participants}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Completed
                    </span>
                    <button className="text-blue-900 hover:text-blue-700 font-medium text-sm">
                      View Gallery
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;