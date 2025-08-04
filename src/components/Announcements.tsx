import React from 'react';
import { Bell, Calendar, Clock, ArrowRight } from 'lucide-react';

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: 'Registration Open: AI & ML Workshop',
      content: 'Hurry up! Limited seats available for our upcoming AI & Machine Learning workshop. Early bird discount ends this Friday.',
      date: '2024-02-10',
      time: '10:00 AM',
      type: 'urgent',
      link: '#'
    },
    {
      id: 2,
      title: 'New Board Member Elections',
      content: 'Nominations are now open for ISTE board member positions for the academic year 2024-25. Eligible students can apply before March 1st.',
      date: '2024-02-08',
      time: '2:00 PM',
      type: 'important',
      link: '#'
    },
    {
      id: 3,
      title: 'Tech Talk: Blockchain Revolution',
      content: 'Join us for an insightful tech talk on blockchain technology and its real-world applications. Industry expert speaker confirmed.',
      date: '2024-02-05',
      time: '4:30 PM',
      type: 'event',
      link: '#'
    },
    {
      id: 4,
      title: 'Coding Competition Results',
      content: 'Congratulations to all participants! Check out the results of our annual coding competition and prize distribution details.',
      date: '2024-02-01',
      time: '11:00 AM',
      type: 'update',
      link: '#'
    }
  ];

  const blogPosts = [
    {
      title: 'The Future of Artificial Intelligence in Education',
      excerpt: 'Exploring how AI is transforming the educational landscape and what it means for students and educators.',
      author: 'Priya Patel',
      date: '2024-02-12',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg'
    },
    {
      title: 'Building Sustainable Tech Solutions',
      excerpt: 'How students can contribute to environmental sustainability through innovative technology solutions.',
      author: 'Rahul Kumar',
      date: '2024-02-10',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg'
    },
    {
      title: 'My Journey from Student to Tech Entrepreneur',
      excerpt: 'A personal account of transitioning from being an ISTE member to founding a successful tech startup.',
      author: 'Alumni Guest',
      date: '2024-02-08',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'important':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'event':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="announcements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Announcements & Blog</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and insightful articles from our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Announcements */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-8">
              <Bell className="h-6 w-6 text-blue-900 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900">Latest Announcements</h3>
            </div>
            
            <div className="space-y-6">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {announcement.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(announcement.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {announcement.time}
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(announcement.type)}`}>
                      {announcement.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{announcement.content}</p>
                  
                  <a
                    href={announcement.link}
                    className="inline-flex items-center text-blue-900 hover:text-blue-700 font-medium text-sm"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Recent Blog Posts</h3>
            
            <div className="space-y-6">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>By {post.author}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-800 rounded-xl p-6 text-white mt-8">
              <h4 className="text-lg font-semibold mb-3">Subscribe to Newsletter</h4>
              <p className="text-blue-200 text-sm mb-4">
                Get the latest updates and announcements delivered to your inbox.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;