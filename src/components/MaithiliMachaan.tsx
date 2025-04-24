import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Paintbrush, Music, Calendar, ArrowRight, MessageCircle, Globe, ChevronRight, Camera, MapPin } from 'lucide-react';
import Footer from './Footer';
import Header from './Header';

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Maithili Literature Symposium",
    date: "March 12, 2023",
    location: "Darbhanga, Bihar",
    description: "Join us for discussions on contemporary Maithili literature and its global impact.",
    image: "/carousel1.jpg" 
  },
  {
    id: 2,
    title: "Folk Music of Mithila Workshop",
    date: "April 5, 2023",
    location: "Madhubani, Bihar",
    description: "An immersive workshop exploring the traditional folk music of Mithila region.",
    image: "/carousel2.jpg"
  },
  {
    id: 3,
    title: "Heritage Conservation Talk",
    date: "May 17, 2023",
    location: "Janakpur, Nepal",
    description: "Panel discussion on preserving the architectural heritage of Mithila region.",
    image: "/carousel3.jpg"
  }
];

// Gallery images
const galleryImages = [
  { id: 1, src: "/carousel1.jpg", alt: "Maithili Machaan event" },
  { id: 2, src: "/carousel2.jpg", alt: "Panel discussion" },
  { id: 3, src: "/carousel3.jpg", alt: "Cultural performance" },
  { id: 4, src: "/carousel4.jpg", alt: "Art exhibition" },
];

// Testimonials
const testimonials = [
  {
    id: 1,
    quote: "Maithili Machaan has revitalized interest in our mother tongue among the younger generation.",
    author: "Dr. Rambhadra Jha",
    position: "Linguist & Author",
    image: "/carousel1.jpg"
  },
  {
    id: 2,
    quote: "The platform provides a much-needed space for dialogue on preserving Mithila's rich cultural heritage.",
    author: "Vidya Thakur",
    position: "Cultural Activist",
    image: "/carousel2.jpg"
  },
  {
    id: 3,
    quote: "I've witnessed how Maithili Machaan brings together diverse voices to create a vibrant discourse on our traditions.",
    author: "Prof. Avinash Mishra",
    position: "Folklorist",
    image: "/carousel3.jpg"
  }
];

const MaithiliMachaan = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white overflow-x-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute top-1/4 left-0 w-40 h-40 bg-yellow-200 rounded-full opacity-20 -translate-x-1/2"></div>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-5 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 mx-auto w-24 h-24 bg-gradient-to-br from-red-700 to-yellow-500 rounded-full flex items-center justify-center"
            >
              <MessageCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-900 to-yellow-700 bg-clip-text text-transparent mb-6"
            >
              Maithili Machaan
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-700 mb-10 leading-relaxed"
            >
              Maithili Machaan is a flagship program of CSTS along with Madhubani Literature Festival. MM is a platform for discussions/dialogue and dissemination on body politic called Mithila and its various facets including language literature heritage culture and tradition.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#events" className="px-6 py-3 bg-red-800 text-white rounded-lg font-medium shadow-lg hover:bg-red-700 transition-colors flex items-center">
                <span>Upcoming Events</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
              <a href="#about" className="px-6 py-3 bg-transparent border-2 border-red-800 text-red-800 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What is Maithili Machaan? */}
      <section id="about" className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[80%] bg-yellow-50 rounded-l-full opacity-50 z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Maithili Machaan?</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  It is a platform for discussions and dialogues focused on the body politic of Mithila—its cultural, literary, and traditional aspects.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The initiative aims to promote and disseminate knowledge about Maithili language, literature, heritage, culture, and traditions.
                </p>
                <div className="pt-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/know-mithila"
                    className="inline-flex items-center text-red-800 font-medium hover:text-red-900"
                  >
                    <span>Explore Mithila Heritage</span>
                    <ChevronRight className="ml-1 w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 md:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/carousel4.jpg" 
                  alt="Maithili Machaan discussion" 
                  className="w-full h-auto" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm">A discussion session at Maithili Machaan</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Aspects Section */}
      <section className="py-16 bg-gradient-to-br from-white to-yellow-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
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
              Key Aspects of Maithili Machaan
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Our platform covers various dimensions of Mithila's rich cultural heritage
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-yellow-500"
            >
              <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-yellow-100">
                <BookOpen className="w-8 h-8 text-yellow-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Language & Literature</h3>
              <p className="text-gray-600 mb-4">
                Discusses the rich literary history of Maithili, including works by Vidyapati and other Maithili scholars. Focuses on the preservation and promotion of Maithili as a language.
              </p>
              <a href="#" className="text-yellow-800 hover:text-yellow-900 font-medium inline-flex items-center">
                Learn more <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-green-500"
            >
              <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-green-100">
                <Paintbrush className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Heritage & Culture</h3>
              <p className="text-gray-600 mb-4">
                Highlights Mithila's cultural identity through festivals, rituals, and folk traditions. Encourages discussions on Madhubani painting, folk music, and historical significance.
              </p>
              <a href="#" className="text-green-800 hover:text-green-900 font-medium inline-flex items-center">
                Learn more <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-blue-500"
            >
              <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-blue-100">
                <Users className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tradition & Society</h3>
              <p className="text-gray-600 mb-4">
                Explores Maithili wedding customs, social structures, and traditional practices. Addresses modern challenges and ways to preserve Mithila's cultural roots.
              </p>
              <a href="#" className="text-blue-800 hover:text-blue-900 font-medium inline-flex items-center">
                Learn more <ChevronRight className="ml-1 w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="events" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
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
              Upcoming Events
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Join us for these exciting events celebrating Maithili culture and heritage
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-red-700 mr-2" />
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="flex items-center mb-3">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{event.location}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <a href="#" className="inline-block bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                    Register Now
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
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
              Glimpses of Maithili Machaan
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Visual memories from our events and discussions
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                variants={fadeInUp}
                custom={index}
                whileHover={{ scale: 1.03 }}
                className="relative overflow-hidden rounded-lg shadow-md aspect-square w-full"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-white to-yellow-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
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
              Voices from the Community
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              What scholars and participants say about Maithili Machaan
            </motion.p>
          </motion.div>

          <div className="max-w-2xl md:max-w-4xl mx-auto relative">
            <div className="overflow-hidden">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src={testimonials[activeTestimonial].image} 
                      alt={testimonials[activeTestimonial].author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-red-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-gray-700 mb-6 text-sm md:text-lg italic leading-relaxed">"{testimonials[activeTestimonial].quote}"</p>
                    <h4 className="font-bold text-gray-900">{testimonials[activeTestimonial].author}</h4>
                    <p className="text-red-800">{testimonials[activeTestimonial].position}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-red-800' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Significance Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Significance
            </motion.h2>
            
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div
                variants={fadeInUp}
                custom={0}
                className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500"
              >
                <h3 className="font-bold text-gray-900 mb-2">Cultural Revival</h3>
                <p className="text-gray-700">Revives interest in Maithili traditions and heritage in the modern era.</p>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                custom={1}
                className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500"
              >
                <h3 className="font-bold text-gray-900 mb-2">Global Recognition</h3>
                <p className="text-gray-700">Promotes Mithila's cultural richness on national and global platforms.</p>
              </motion.div>
              
              <motion.div
                variants={fadeInUp}
                custom={2}
                className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500"
              >
                <h3 className="font-bold text-gray-900 mb-2">Youth Engagement</h3>
                <p className="text-gray-700">Encourages youth participation in preserving Maithili language and literature.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      
     
    </div>
    <Footer />
    </>
  );
};

export default MaithiliMachaan; 