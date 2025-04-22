import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book, Calendar, MapPin, Users, Mic, Award, Camera, ChevronRight, ExternalLink, Clock, Star } from 'lucide-react';
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Sample event schedule
const eventSchedule = [
  {
    day: "Day 1",
    date: "October 15, 2023",
    events: [
      { time: "09:00 AM", title: "Opening Ceremony", location: "Main Stage" },
      { time: "10:30 AM", title: "Maithili Poetry Reading", location: "Literary Corner" },
      { time: "12:00 PM", title: "Panel: Future of Regional Literature", location: "Discussion Hall" },
      { time: "02:30 PM", title: "Book Launch: 'Mithila Through Ages'", location: "Author's Pavilion" },
      { time: "04:00 PM", title: "Cultural Performance", location: "Main Stage" },
    ]
  },
  {
    day: "Day 2",
    date: "October 16, 2023",
    events: [
      { time: "09:30 AM", title: "Storytelling Session", location: "Children's Area" },
      { time: "11:00 AM", title: "Workshop: Madhubani Art", location: "Art Pavilion" },
      { time: "01:30 PM", title: "Author Meet & Greet", location: "Literary Corner" },
      { time: "03:00 PM", title: "Panel: Preserving Linguistic Heritage", location: "Discussion Hall" },
      { time: "05:00 PM", title: "Folk Music Performance", location: "Main Stage" },
    ]
  },
  {
    day: "Day 3",
    date: "October 17, 2023",
    events: [
      { time: "09:00 AM", title: "Academic Symposium", location: "Conference Hall" },
      { time: "11:30 AM", title: "Book Fair Tour", location: "Exhibition Area" },
      { time: "02:00 PM", title: "Film Screening: 'Mithila's Voice'", location: "Media Center" },
      { time: "04:30 PM", title: "Award Ceremony", location: "Main Stage" },
      { time: "06:00 PM", title: "Closing Ceremony", location: "Main Stage" },
    ]
  }
];

// Featured speakers
const featuredSpeakers = [
  {
    name: "Dr. Ramanand Jha",
    role: "Renowned Maithili Poet",
    image: "/carousel1.jpg",
    bio: "Award-winning poet known for his contribution to modern Maithili literature"
  },
  {
    name: "Prof. Usha Kiran Khan",
    role: "Literary Critic",
    image: "/carousel2.jpg",
    bio: "Leading authority on comparative literature and cultural studies"
  },
  {
    name: "Abhishek Mishra",
    role: "Author & Journalist",
    image: "/carousel3.jpg",
    bio: "Documenting oral histories and folk traditions of Mithila region"
  },
  {
    name: "Dr. Vidya Niwas Mishra",
    role: "Cultural Historian",
    image: "/carousel4.jpg",
    bio: "Expert on the evolution of Maithili language and its dialects"
  }
];

// Festival highlights
const festivalHighlights = [
  {
    icon: <Book className="w-6 h-6 text-purple-600" />,
    title: "Literary Sessions",
    description: "Panel discussions, book readings, and author interactions focusing on Maithili literature"
  },
  {
    icon: <Camera className="w-6 h-6 text-blue-600" />,
    title: "Art Exhibitions",
    description: "Showcasing traditional Madhubani art alongside contemporary interpretations"
  },
  {
    icon: <Mic className="w-6 h-6 text-red-600" />,
    title: "Cultural Performances",
    description: "Folk music, traditional dance, and theatrical performances celebrating Mithila culture"
  },
  {
    icon: <Award className="w-6 h-6 text-amber-600" />,
    title: "Literary Awards",
    description: "Recognizing excellence in Maithili literature and contributions to cultural preservation"
  }
];

const MLF = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/3 h-64 bg-purple-100 rounded-bl-full opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-40 bg-blue-100 rounded-tr-full opacity-30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6"
            >
              Annual Literary Event
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-900 to-blue-700 bg-clip-text text-transparent mb-6"
            >
              Madhubani Literature Festival
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-700 mb-8 leading-relaxed"
            >
              A celebration of Maithili language, literature, and cultural heritage through engaging discussions, performances, and exhibitions.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a href="#schedule" className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium shadow-lg hover:bg-purple-800 transition-colors">
                View Schedule
              </a>
              <a href="#register" className="px-6 py-3 bg-transparent border-2 border-purple-700 text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                Register Now
              </a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>October 15-17, 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span>Madhubani, Bihar, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span>50+ Authors & Artists</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">About MLF</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Celebrating the Literary Heritage of Mithila</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  The Madhubani Literature Festival (MLF) is a prestigious annual event dedicated to celebrating and promoting the rich literary traditions of the Mithila region and Maithili language.
                </p>
                <p>
                  Founded in 2018, MLF brings together authors, poets, academics, artists, and cultural enthusiasts from across the region and beyond to engage in meaningful dialogue about literature, culture, and heritage.
                </p>
                <p>
                  Through a diverse program of panel discussions, readings, performances, workshops, and exhibitions, MLF aims to preserve and revitalize interest in Maithili language and literature while creating platforms for contemporary voices.
                </p>
              </div>
              <div className="mt-8">
                <a href="#highlights" className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900">
                  <span>Discover Festival Highlights</span>
                  <ChevronRight className="ml-1 w-5 h-5" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/carousel1.jpg" 
                  alt="Madhubani Literature Festival" 
                  className="w-full h-auto" 
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-purple-100 rounded-full opacity-50 z-0"></div>
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-100 rounded-full opacity-50 z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Festival Highlights */}
      <section id="highlights" className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp} 
              className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4"
            >
              Festival Features
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              custom={1}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Festival Highlights
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Experience the diverse facets of Maithili culture and literature
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {festivalHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="mb-4 p-3 rounded-full w-14 h-14 flex items-center justify-center bg-gray-50">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a 
              href="#speakers" 
              className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900"
            >
              <span>Meet our featured speakers</span>
              <ChevronRight className="ml-1 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Speakers */}
      <section id="speakers" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4"
            >
              Distinguished Guests
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              custom={1}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Featured Speakers
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Meet the literary luminaries and cultural experts joining us this year
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredSpeakers.map((speaker, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
                  <p className="text-purple-700 font-medium mb-3">{speaker.role}</p>
                  <p className="text-gray-600 text-sm">{speaker.bio}</p>
                  <a 
                    href="#" 
                    className="mt-4 inline-flex items-center text-sm text-purple-700 hover:text-purple-900"
                  >
                    <span>Full Profile</span>
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Event Schedule */}
      <section id="schedule" className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-4"
            >
              Program Details
            </motion.span>
            <motion.h2 
              variants={fadeInUp}
              custom={1}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Event Schedule
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={2}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Plan your visit with our comprehensive event schedule
            </motion.p>
          </motion.div>

          {/* Day selector tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              {eventSchedule.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeDay === index
                      ? 'bg-purple-700 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule for selected day */}
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="bg-purple-700 text-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{eventSchedule[activeDay].day}</h3>
                <span className="text-purple-100">{eventSchedule[activeDay].date}</span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {eventSchedule[activeDay].events.map((event, index) => (
                <div 
                  key={index} 
                  className="p-4 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <div className="mt-1 flex items-center text-sm text-gray-600">
                        <MapPin className="mr-1 w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      <Clock className="mr-1 w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="text-center mt-8">
            <a 
              href="#" 
              className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900"
            >
              <span>Download Full Schedule (PDF)</span>
              <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-800 to-blue-700 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="p-8 md:p-12 text-white">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl font-bold mb-6">Register for MLF 2023</h2>
                  <p className="text-lg text-purple-100 mb-8">
                    Secure your spot at the Madhubani Literature Festival and be part of this celebration of Maithili culture and literature.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                      <h3 className="text-xl font-semibold mb-3">General Admission</h3>
                      <p className="mb-2 text-purple-100">Access to all sessions, exhibitions, and performances</p>
                      <div className="text-2xl font-bold mb-4">₹500</div>
                      <ul className="mb-6 space-y-2">
                        {["3-day access", "Festival booklet", "Tote bag"].map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Star className="mr-2 w-4 h-4 text-yellow-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30">
                      <h3 className="text-xl font-semibold mb-3">Premium Pass</h3>
                      <p className="mb-2 text-purple-100">Enhanced experience with special benefits</p>
                      <div className="text-2xl font-bold mb-4">₹1200</div>
                      <ul className="mb-6 space-y-2">
                        {[
                          "Priority seating", 
                          "Meet & greet with authors", 
                          "Workshop participation",
                          "Exclusive dinner event"
                        ].map((item, index) => (
                          <li key={index} className="flex items-center">
                            <Star className="mr-2 w-4 h-4 text-yellow-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <a 
                      href="#" 
                      className="px-8 py-3 bg-white text-purple-800 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
                    >
                      Register Now
                    </a>
                    <a 
                      href="#" 
                      className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
                    >
                      Group Bookings
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sponsors & Partners */}
      <section className="py-16 bg-gray-50">
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
              Our Sponsors & Partners
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={1}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              MLF is made possible through the generous support of our sponsors and partners
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                variants={fadeInUp}
                className="bg-white p-6 rounded-lg flex items-center justify-center h-24"
              >
                <div className="text-gray-400 font-medium">Sponsor Logo</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-blue-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Join Us at MLF 2023</h2>
            <p className="text-lg text-purple-100 mb-8">
              Be part of this celebration of Maithili language, literature, and culture. 
              Register today and immerse yourself in three days of inspiring discussions, performances, and connections.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#register"
              className="px-8 py-3 bg-white text-purple-800 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-block"
            >
              Register Now
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MLF;