import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Award, Heart, Clock, Users, MapPin, Globe } from 'lucide-react';
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
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

const AboutCSTS = () => {
  const timeline = [
    { year: '2015', event: 'Foundation of CSTS with a vision to preserve Mithila culture' },
    { year: '2017', event: 'First major cultural event organized in Delhi' },
    { year: '2019', event: 'Launched Mithila language preservation initiative' },
    { year: '2020', event: 'Started digital archives of rare Mithila manuscripts' },
    { year: '2021', event: 'Expanded to international collaborations' },
    { year: '2023', event: 'Established Saksham Mithila for rural empowerment' }
  ];

  const achievements = [
    { 
      title: 'Cultural Preservation', 
      description: 'Preserved over 500 rare cultural artifacts and manuscripts',
      icon: <BookOpen className="w-12 h-12 text-yellow-500" />
    },
    { 
      title: 'Education Initiatives', 
      description: 'Provided scholarships to 200+ students from Mithila region',
      icon: <Lightbulb className="w-12 h-12 text-blue-500" />
    },
    { 
      title: 'International Recognition', 
      description: 'Received UNESCO recognition for cultural preservation efforts',
      icon: <Award className="w-12 h-12 text-red-500" />
    },
    { 
      title: 'Community Support', 
      description: 'Empowered 50+ rural communities through sustainable initiatives',
      icon: <Heart className="w-12 h-12 text-green-500" />
    }
  ];

  return (
    <>
      <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" style={{ backgroundImage: "url('')" }} />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1 
                variants={fadeInUp}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-indigo-700 bg-clip-text text-transparent mb-6"
              >
                About CSTS
              </motion.h1>
              
              <motion.div 
                variants={fadeInUp}
                custom={1}
                className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-8"
              ></motion.div>
              
              <motion.p 
                variants={fadeInUp}
                custom={2}
                className="text-xl text-gray-700 mb-10 leading-relaxed"
              >
                Center for Studies in Tradition and Systems (CSTS) is dedicated to preserving and promoting the rich cultural heritage of Mithila through research, education, and community engagement.
              </motion.p>
              
              <motion.p 
                variants={fadeInUp}
                custom={3}
                className="text-lg text-gray-600 mb-8"
              >
                मिथिला की समृद्ध सांस्कृतिक विरासत को शोध, शिक्षा और सामुदायिक भागीदारी के माध्यम से संरक्षित और बढ़ावा देने के लिए समर्पित है।
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <motion.h2 
                  variants={slideIn}
                  className="text-3xl font-bold text-blue-900 mb-6"
                >
                  Our Mission
                </motion.h2>
                
                <motion.p 
                  variants={slideIn}
                  className="text-gray-700 mb-6 leading-relaxed"
                >
                  Our mission is to document, preserve, and revitalize the cultural traditions of Mithila by creating platforms for artistic expression, educational programs, and sustainable development initiatives that empower local communities.
                </motion.p>
                
                <motion.p 
                  variants={slideIn}
                  className="text-gray-700 mb-8"
                >
                  हमारा मिशन कलात्मक अभिव्यक्ति, शैक्षिक कार्यक्रमों और सतत विकास पहलों के लिए मंच बनाकर मिथिला की सांस्कृतिक परंपराओं का दस्तावेजीकरण, संरक्षण और पुनर्जीवन करना है जो स्थानीय समुदायों को सशक्त बनाते हैं।
                </motion.p>
                
                <motion.h2 
                  variants={slideIn}
                  className="text-3xl font-bold text-blue-900 mb-6"
                >
                  Our Vision
                </motion.h2>
                
                <motion.p 
                  variants={slideIn}
                  className="text-gray-700 mb-6 leading-relaxed"
                >
                  We envision a world where Mithila's cultural heritage is celebrated globally while being firmly rooted in sustainable community practices, creating economic opportunities, and fostering cultural pride among future generations.
                </motion.p>
                
                <motion.p 
                  variants={slideIn}
                  className="text-gray-700"
                >
                  हम एक ऐसी दुनिया की कल्पना करते हैं जहां मिथिला की सांस्कृतिक विरासत को वैश्विक स्तर पर मनाया जाता है, जबकि यह सतत सामुदायिक प्रथाओं में दृढ़ता से जड़ा हुआ है, आर्थिक अवसर पैदा करता है, और भविष्य की पीढ़ियों में सांस्कृतिक गर्व को बढ़ावा देता है।
                </motion.p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-1 md:order-2 grid grid-cols-2 gap-6"
              >
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 h-64">
                  <img src="/carousel2.jpg" alt="Mission" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 h-64 mt-12">
                  <img src="/carousel3.jpg" alt="Vision" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 h-64 mt-12">
                  <img src="/carousel4.jpg" alt="Culture" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 h-64">
                  <img src="/carousel1.jpg" alt="Heritage" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl font-bold text-blue-900 mb-4"
              >
                Our Journey
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                The key milestones in our mission to preserve and promote Mithila culture
              </motion.p>
            </motion.div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1,
                          duration: 0.5
                        }
                      }
                    }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                      <h3 className="text-2xl font-bold text-blue-800">{item.year}</h3>
                      <p className="text-gray-700 mt-2">{item.event}</p>
                    </div>
                    
                    <div className="z-10 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full border-4 border-blue-200 bg-blue-600 flex items-center justify-center shadow-lg">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Achievements */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-4xl font-bold text-blue-900 mb-4"
              >
                Our Achievements
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Key milestones in our journey of cultural preservation and community empowerment
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={scaleIn}
                  custom={index}
                  className="bg-blue-50 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="mb-6 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3 text-center">{item.title}</h3>
                  <p className="text-gray-700 text-center">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Global Impact */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h2 
                  variants={slideIn}
                  className="text-3xl font-bold text-blue-900 mb-6"
                >
                  Our Global Impact
                </motion.h2>
                
                <motion.p 
                  variants={slideIn}
                  className="text-gray-700 mb-6 leading-relaxed"
                >
                  CSTS has established cultural partnerships across multiple countries, creating a global network of Mithila culture enthusiasts, researchers, and supporters. Our initiatives have reached international platforms, bringing recognition to the unique heritage of Mithila.
                </motion.p>
                
                <motion.p 
                  variants={slideIn}
                  className="text-gray-700 mb-8"
                >
                  CSTS ने कई देशों में सांस्कृतिक साझेदारी स्थापित की है, जिससे मिथिला संस्कृति के उत्साही, शोधकर्ताओं और समर्थकों का एक वैश्विक नेटवर्क बना है। हमारी पहल अंतरराष्ट्रीय मंचों तक पहुंची है, जिससे मिथिला की अनोखी विरासत को मान्यता मिली है।
                </motion.p>
                
                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4 mt-8"
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">10,000+ Community Members</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">20+ Regional Centers</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">15+ Countries Reached</span>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-1 rounded-2xl shadow-xl"
              >
                <img 
                  src="/carousel1.jpg" 
                  alt="Global Impact" 
                  className="w-full h-auto rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Be part of our journey to preserve and promote the rich cultural heritage of Mithila. Together, we can make a lasting impact.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/join-us"
                  className="bg-white text-blue-900 hover:bg-blue-100 py-3 px-8 rounded-lg font-medium transition-colors duration-300"
                >
                  Join CSTS
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/donate"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 py-3 px-8 rounded-lg font-medium transition-colors duration-300"
                >
                  Support Our Work
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

export default AboutCSTS; 