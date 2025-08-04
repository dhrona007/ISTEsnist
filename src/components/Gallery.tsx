import React, { useState } from 'react';
import { Image, Play, X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      title: 'AI Workshop 2024',
      category: 'workshop'
    },
    {
      id: 2,
      type: 'image',
      src: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
      title: 'Coding Competition',
      category: 'competition'
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      title: 'Tech Talk Session',
      category: 'seminar'
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      title: 'Web Development Bootcamp',
      category: 'workshop'
    },
    {
      id: 5,
      type: 'image',
      src: 'https://images.pexels.com/photos/3861458/pexels-photo-3861458.jpeg',
      title: 'IoT Innovation Summit',
      category: 'seminar'
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
      title: 'Team Building Activity',
      category: 'social'
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      title: 'Project Showcase',
      category: 'competition'
    },
    {
      id: 8,
      type: 'image',
      src: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
      title: 'Annual Tech Fest',
      category: 'social'
    }
  ];

  const categories = ['all', 'workshop', 'seminar', 'competition', 'social'];
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing memorable moments from our events, workshops, and activities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(item.src)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white">
                  {item.type === 'image' ? (
                    <Image className="h-8 w-8 mx-auto mb-2" />
                  ) : (
                    <Play className="h-8 w-8 mx-auto mb-2" />
                  )}
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Image Preview */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={selectedImage}
                alt="Gallery preview"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200">
            View More Photos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;