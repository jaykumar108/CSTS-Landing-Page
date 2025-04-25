import React from 'react';
import { Mail, Phone, MapPin, Send, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Contact = () => {
  return (
    <>
      <section id="contact" className="py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-blue-950 mb-4 mt-4">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or ready to start your next project? Contact us today for a consultation.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-10"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-2/3 order-1"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-blue-950 mb-6">Send Us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required
                        placeholder="Your Name"
                      />
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Email"
                      />
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Your Phone Number"
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Subject"
                      />
                    </motion.div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Message"
                      required
                    />
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:w-1/3 order-2"
            >
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h3 className="text-xl font-semibold text-blue-950 mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <Mail className="h-6 w-6 text-blue-700 mt-1" />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:info@csts.com" className="text-gray-600 hover:text-blue-700">
                          info@csts.com
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <Phone className="h-6 w-6 text-blue-700 mt-1" />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">+91 1234567890</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <MapPin className="h-6 w-6 text-blue-700 mt-1" />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">SH75 Mabbi Road, Darbhanga, Bihar 846005</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Follow Us Section */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8"
                >
                  <h3 className="text-xl font-semibold text-blue-950 mb-4">Follow Us</h3>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex justify-center gap-6"
                  >
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Twitter className="w-6 h-6 text-blue-950 hover:text-[#1da1f2]" />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-6 h-6 text-blue-950 hover:text-[#3b5998]" />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-6 h-6 text-blue-950 hover:text-[#e1306c]" />
                    </motion.a>
                    <motion.a 
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-6 h-6 text-blue-950 hover:text-[#0077b5]" />
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Contact;