import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Footer';
import axios from 'axios';

// Define the API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Define Gallery image type
type GalleryImage = {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  isPublished: boolean;
};

// Default categories to show immediately while loading
const DEFAULT_CATEGORIES = ['all'];

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
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  
  // Fetch gallery images from the API
  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/gallery?isPublished=true`);
        
        if (response.data && response.data.data) {
          const images = response.data.data;
          setGalleryImages(images);
          
          // Extract unique categories from the images
          const uniqueCategories = ['all', ...new Set(images.map((img: GalleryImage) => img.category || 'other').filter(Boolean) as string[])];
          setCategories(uniqueCategories);
        } else {
          setError('Invalid data format received from server');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setError('Failed to load gallery images. Please try again later.');
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);
  
  // Filter images by selected category - memoize to avoid recalculation
  const filteredImages = useMemo(() => {
    return selectedCategory === 'all' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory, galleryImages]);

  // Handle image selection and set current index
  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    const index = filteredImages.findIndex(img => img._id === image._id);
    if (index !== -1) {
      setCurrentImageIndex(index);
    }
  };

  // Navigate to next image
  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (filteredImages.length <= 1) return;
    
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  // Navigate to previous image
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (filteredImages.length <= 1) return;
    
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        const nextIndex = (currentImageIndex + 1) % filteredImages.length;
        setCurrentImageIndex(nextIndex);
        setSelectedImage(filteredImages[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        setCurrentImageIndex(prevIndex);
        setSelectedImage(filteredImages[prevIndex]);
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, filteredImages]);

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
          
          {/* Filter Buttons - showing default categories immediately */}
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
          
          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {/* Gallery Grid */}
          {(!loading || filteredImages.length > 0) && (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredImages.length > 0 ? (
                  filteredImages.map((image, i) => (
                    <motion.div
                      key={image._id}
                      layout
                      custom={i}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                      className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    >
                      <div className="relative overflow-hidden h-64">
                        <motion.img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                          loading="lazy" // Add lazy loading for better performance
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">{image.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{image.description}</p>
                      </div>
                    </motion.div>
                  ))
                ) : !loading && (
                  <div className="col-span-full text-center py-12 text-gray-500">
                    No images found in this category
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          
          {/* Lightbox Modal */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button 
                    className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
                    onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </button>
                  
                  {/* Navigation arrows */}
                  {filteredImages.length > 1 && (
                    <>
                      {/* Previous button */}
                      <button 
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      {/* Next button */}
                      <button 
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
                        onClick={handleNextImage}
                        aria-label="Next image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  <div className="h-[70vh] relative">
                    <img 
                      src={selectedImage.imageUrl} 
                      alt={selectedImage.title} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="p-6 bg-white">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedImage.title}</h2>
                    <p className="text-gray-600 mt-2">{selectedImage.description}</p>
                    <p className="text-gray-500 text-sm mt-4">
                      Image {currentImageIndex + 1} of {filteredImages.length}
                    </p>
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