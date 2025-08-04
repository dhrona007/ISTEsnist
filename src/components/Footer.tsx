import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Instagram, Linkedin, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Volunteers', href: '#volunteers' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' }
  ];

  const resources = [
    { name: 'ISTE National', href: '#' },
    { name: 'Student Resources', href: '#' },
    { name: 'Downloads', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Privacy Policy', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ISTE Club</h3>
                <p className="text-sm text-gray-400">Technical Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students through technology, innovation, and collaborative learning. 
              Join us in shaping the future of technical education.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-sm">contact@iste.club</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Student Activity Center<br />
                  XYZ Engineering College<br />
                  City, State - 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 py-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and events.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 ISTE Club. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by ISTE Web Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;