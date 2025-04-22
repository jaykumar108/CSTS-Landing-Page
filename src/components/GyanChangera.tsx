import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, BookMarked, Download, Heart, ShoppingCart, Users, Library } from 'lucide-react';
import Footer from './Footer';

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

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const bookHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

// Featured books data
const featuredBooks = [
  {
    id: 1,
    title: 'Ramcharit Manas',
    author: 'Tulsidas',
    price: '₹299',
    rating: 5,
    cover: '/carousel1.jpg'
  },
  {
    id: 2,
    title: 'Maithili Grammar',
    author: 'Umesh Mishra',
    price: '₹199',
    rating: 4.5,
    cover: '/carousel2.jpg'
  },
  {
    id: 3,
    title: 'Vidyapati Padavali',
    author: 'Vidyapati',
    price: '₹249',
    rating: 5,
    cover: '/carousel3.jpg'
  },
  {
    id: 4,
    title: 'Folk Tales of Mithila',
    author: 'Rajeshwar Jha',
    price: '₹179',
    rating: 4.8,
    cover: '/carousel4.jpg'
  }
];

// Book categories
const categories = [
  {
    name: 'Maithili Literature',
    count: 254,
    icon: <BookOpen className="w-10 h-10 text-blue-600" />
  },
  {
    name: 'Rare Books',
    count: 857,
    icon: <BookMarked className="w-10 h-10 text-purple-600" />
  },
  {
    name: 'Religious Books',
    count: 432,
    icon: <Library className="w-10 h-10 text-red-600" />
  },
  {
    name: 'Folk Literature',
    count: 621,
    icon: <Users className="w-10 h-10 text-green-600" />
  }
];

// Testimonials
const testimonials = [
  {
    id: 1,
    text: 'Buying Maithili books from Gyan Changera is very convenient. Their collection is amazing!',
    name: 'Sarita Jha',
    designation: 'Teacher',
    avatar: '/carousel1.jpg'
  },
  {
    id: 2,
    text: 'Excellent collection of old and rare books. The service is also outstanding.',
    name: 'Ramesh Mishra',
    designation: 'Literary Scholar',
    avatar: '/carousel3.jpg'
  },
  {
    id: 3,
    text: 'A wonderful effort to promote Maithili language and culture!',
    name: 'Anita Devi',
    designation: 'Professor',
    avatar: '/carousel2.jpg'
  }
];

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
          } ${i === Math.floor(rating) && rating % 1 !== 0 ? 'text-yellow-300' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const GyanChangera = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-5 z-0" 
               style={{ backgroundImage: "url('')" }} />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-16 h-16 mx-auto text-blue-600 mb-6" />
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent mb-6"
              >
                ज्ञान चंगेरा
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
              >
                Discover the World of Maithili Literature
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl text-gray-700 mb-10 leading-relaxed"
              >
                Explore a vast collection of Mithila's rich literary heritage and rare books. 
                Your favorite books are just a click away.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gyanchangera.csts.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Books
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gyanchangera.csts.org.in/categories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition-colors"
                >
                  Explore Categories
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Search Bar Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for books, authors, or categories..."
                  className="w-full py-4 px-6 pr-12 bg-gray-50 border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="py-16 bg-gradient-to-br from-white to-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Featured Books
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Our selected books that you will love
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            >
              {featuredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  variants={fadeInUp}
                  custom={index}
                  whileHover="hover"
                  initial="rest"
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <motion.div
                    variants={bookHover}
                    className="relative h-64 overflow-hidden"
                  >
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="flex justify-between w-full">
                        <button className="text-white p-2 rounded-full bg-blue-600/80 hover:bg-blue-600">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="text-white p-2 rounded-full bg-green-600/80 hover:bg-green-600">
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-gray-600 mb-2">{book.author}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-blue-600 font-semibold">{book.price}</p>
                      <StarRating rating={book.rating} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <div className="text-center mt-10">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://gyanchangera.csts.org.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-transparent text-blue-600 font-medium border-b-2 border-blue-600 hover:border-blue-800 hover:text-blue-800 transition-colors"
              >
                View All Books
              </motion.a>
            </div>
          </div>
        </section>

        {/* Book Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Popular Categories
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Find books according to your interests
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -5 }}
                  className="bg-blue-50 rounded-xl p-6 flex items-center gap-4 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 bg-white p-3 rounded-full shadow-sm">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-blue-600">{category.count} Books</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Reader Reviews
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Our readers' experiences
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={fadeInUp}
                  custom={index}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-3">
                      <img className="w-10 h-10 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.name} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.designation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Gyan Changera */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About Gyan Changera</h2>
                <p className="text-blue-100 mb-6 leading-relaxed">
                  Gyan Changera is a digital repository of Maithili literature, rare books, and cultural documents. Our mission is to preserve and promote the rich literary heritage of Mithila region.
                </p>
                <p className="text-blue-100 mb-6">
                  The name "Changera" refers to a traditional Maithili storage basket, and we serve as a digital basket preserving the knowledge and wisdom of generations.
                </p>
                <p className="text-blue-100 mb-8">
                  Our collection includes thousands of books, manuscripts, and documents that showcase the linguistic and cultural richness of the Mithila region.
                </p>
                <div className="flex gap-4 mt-8">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://gyanchangera.csts.org.in/about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-900 hover:bg-blue-100 py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  >
                    Learn More
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://gyanchangera.csts.org.in/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 py-3 px-6 rounded-lg font-medium transition-colors duration-300"
                  >
                    Contact Us
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500 rounded-full opacity-20"></div>
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-2xl">
                  <img 
                    src="/carousel2.jpg" 
                    alt="Gyan Changera" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Find Your Favorite Books
              </h2>
              <p className="text-xl text-gray-600 mb-10">
                A vast collection of thousands of Maithili and rare books is ready for you
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gyanchangera.csts.org.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Books
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://gyanchangera.csts.org.in/categories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-full font-semibold shadow-lg hover:bg-blue-50 transition-colors"
                >
                  Explore Categories
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default GyanChangera;