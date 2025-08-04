import React from 'react';
import { Trophy, Medal, Target, TrendingUp } from 'lucide-react';

const Achievements = () => {
  const achievements = [
    {
      title: 'Best ISTE Chapter Award 2023',
      description: 'Recognized as the most active and innovative ISTE chapter in the region.',
      year: '2023',
      category: 'National',
      icon: Trophy,
      color: 'text-yellow-500'
    },
    {
      title: 'Smart India Hackathon Winners',
      description: 'Our team secured 1st place in Smart India Hackathon with an innovative IoT solution.',
      year: '2023',
      category: 'Competition',
      icon: Medal,
      color: 'text-blue-500'
    },
    {
      title: 'Technical Excellence Award',
      description: 'Awarded for outstanding contribution to technical education and student development.',
      year: '2022',
      category: 'Regional',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Innovation Hub Recognition',
      description: 'Recognized for establishing a successful innovation and startup ecosystem.',
      year: '2022',
      category: 'Institutional',
      icon: TrendingUp,
      color: 'text-purple-500'
    }
  ];

  const stats = [
    { label: 'Awards Won', value: '25+', icon: Trophy },
    { label: 'Competitions', value: '50+', icon: Medal },
    { label: 'Projects', value: '100+', icon: Target },
    { label: 'Success Rate', value: '95%', icon: TrendingUp }
  ];

  const futureGoals = [
    'Establish industry partnerships for internships and placements',
    'Launch annual tech festival with national participation',
    'Create online learning platform for technical skills',
    'Develop incubation center for student startups',
    'Achieve 1000+ active members by 2025'
  ];

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Achievements</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating our journey of excellence in technical education and innovation.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 text-center">
              <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Past Achievements */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Past Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${achievement.color}`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-gray-900">{achievement.title}</h4>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {achievement.year}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{achievement.description}</p>
                    <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                      {achievement.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-2xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Future Goals</h3>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Our roadmap for continued excellence and innovation in technical education.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureGoals.map((goal, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-300">
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-white">{goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;