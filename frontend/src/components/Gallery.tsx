import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';

// Gallery images data
const galleryImages = [
  {
    id: 1,
    title: 'Mithila Art Exhibition',
    category: 'art',
    image: '/carousel1.jpg',
    description: 'Traditional Mithila artwork on display at our annual exhibition'
  },
  {
    id: 2,
    title: 'Cultural Performance',
    category: 'culture',
    image: '/carousel2.jpg',
    description: 'Folk dancers performing traditional Maithili dance forms'
  },
  {
    id: 3,
    title: 'Handicraft Workshop',
    category: 'craft',
    image: '/carousel3.jpg',
    description: 'Local artisans showcasing handmade crafts and techniques'
  },
  {
    id: 4,
    title: 'Community Gathering',
    category: 'event',
    image: '/carousel4.jpg',
    description: 'Community members participating in Mithila cultural event'
  },
  {
    id: 5,
    title: 'Heritage Tour',
    category: 'culture',
    image: '/carousel2.jpg', 
    description: 'Exploring the rich cultural heritage sites of Mithila region'
  },
  {
    id: 6,
    title: 'Art Workshop',
    category: 'art',
    image: '/carousel3.jpg',
    description: 'Learning traditional Madhubani painting techniques'
  },
  {
    id: 7,
    title: 'Literature Festival',
    category: 'event',
    image: '/carousel1.jpg',
    description: 'Celebrating Maithili literature and poetry at our annual festival'
  },
  {
    id: 8,
    title: 'Folk Music Concert',
    category: 'culture',
    image: '/carousel4.jpg',
    description: 'Traditional musicians performing folk songs of Mithila'
  }
];

// Define image type
type GalleryImage = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut" 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { 
      duration: 0.3,
      ease: "easeIn" 
    }
  }
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const categories = ['all', 'art', 'culture', 'craft', 'event'];

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16 pb-12">
        <motion.div 
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-6 mt-12"
          >
            Our Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Explore the rich cultural heritage and vibrant activities of Mithila through our collection of images.
          </motion.p>
          
          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 rounded-full capitalize transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                } shadow-md`}
                onClick={() => setSelectedCategory(category)}
                custom={index}
                variants={fadeInUp}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Gallery Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, i) => (
                <motion.div
                  key={image.id}
                  layout
                  custom={i}
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative overflow-hidden h-64">
                    <motion.img
                      src={image.image}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
                    onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </button>
                  <div className="h-[70vh] relative">
                    <img 
                      src={selectedImage.image} 
                      alt={selectedImage.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h2>
                    <p className="text-gray-600 mt-2">{selectedImage.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery; 