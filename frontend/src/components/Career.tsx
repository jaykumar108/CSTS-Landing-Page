import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Gift, Laptop, Globe, ChevronRight, GraduationCap, Briefcase, HeartHandshake, Users, BrainCircuit, Star, BookOpen, Paintbrush } from 'lucide-react';
import Footer from './Footer';
import axios from 'axios';

// Define the API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Define Job type interface
interface Job {
  _id: string;
  title: string;
  company: string;
  department?: string;
  location: string;
  type: string;
  description: string;
  requirements?: string;
  skills?: string[];
  salary?: string;
  duration?: string;
  perks?: string;
  note?: string;
  languages?: string;
  applicationLink?: string;
  contactEmail?: string;
  isActive: boolean;
  expiresAt: string;
}

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

// Company values
const companyValues = [
  {
    icon: <HeartHandshake className="w-8 h-8 text-purple-500" />,
    title: 'Cultural Preservation',
    description: 'We are committed to preserving and promoting the rich cultural heritage of Mithila.'
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
    title: 'Innovation',
    description: 'We embrace innovative approaches to document and share traditional knowledge.'
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: 'Collaboration',
    description: 'We believe in collaborative work across disciplines and communities.'
  },
  {
    icon: <Star className="w-8 h-8 text-amber-500" />,
    title: 'Excellence',
    description: 'We strive for excellence in all our research and cultural initiatives.'
  }
];

const Career = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch jobs from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/jobs?isActive=true`);
        console.log('API Response:', response.data);
        
        if (response.data && response.data.data) {
          setJobs(response.data.data);
        } else {
          setError('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load job listings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term and type
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesType;
  });
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" 
             style={{ backgroundImage: "url('')" }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              Join Our Team
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-700 mb-8 leading-relaxed"
            >
              Be part of our mission to preserve and promote the rich cultural heritage of Mithila. 
              Explore exciting career opportunities and make a meaningful impact.
            </motion.p>
            
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a href="#opportunities" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all">
                View Opportunities
              </a>
              <a href="#volunteer" className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold shadow-lg hover:bg-blue-50 transition-all">
                Volunteer With Us
              </a>
            </motion.div>
          </div>
        </div>
      </section>

   

      {/* Job Listings */}
      <section id="opportunities" className="py-16 bg-white">
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
              Current Opportunities
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              custom={1}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Explore our open positions and find the perfect fit for your skills and interests
            </motion.p>
          </motion.div>
          


          
          {/* Search and Filter */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-4 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedType('All')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedType === 'All' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedType('Internship')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedType === 'Internship' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <GraduationCap className="inline-block w-4 h-4 mr-1" />
                Internships
              </button>
              <button 
                onClick={() => setSelectedType('Remote')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedType === 'Remote' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Globe className="inline-block w-4 h-4 mr-1" />
                Remote
              </button>
              <button 
                onClick={() => setSelectedType('Full-time')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedType === 'Full-time' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Briefcase className="inline-block w-4 h-4 mr-1" />
                Full-time
              </button>
            </div>
          </div>


          
          
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {/* Job Cards */}
          {!loading && !error && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {filteredJobs.length === 0 ? (
                <div className="col-span-2 text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-lg">No positions found matching your criteria</p>
                  <button
                    onClick={() => {setSearchTerm(''); setSelectedType('All');}}
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                          job.type === 'Internship' 
                            ? 'bg-green-100 text-green-800' 
                            : job.type === 'Remote' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                        }`}>
                          {job.type}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <p className="text-gray-600">{job.department || job.company}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        job.type === 'Internship' 
                          ? 'bg-green-100' 
                          : job.type === 'Remote' 
                            ? 'bg-blue-100'
                            : 'bg-purple-100'
                      }`}>
                        {job.type === 'Internship' 
                          ? <GraduationCap className="w-6 h-6 text-green-600" />
                          : job.type === 'Remote'
                            ? <Globe className="w-6 h-6 text-blue-600" />
                            : <Briefcase className="w-6 h-6 text-purple-600" />
                        }
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    
                    {/* Job Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{job.location}</span>
                      </div>
                      {job.duration && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{job.duration}</span>
                        </div>
                      )}
                      {job.perks && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Gift className="w-4 h-4 text-gray-400" />
                          <span>{job.perks}</span>
                        </div>
                      )}
                      {job.note && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Laptop className="w-4 h-4 text-gray-400" />
                          <span>{job.note}</span>
                        </div>
                      )}
                      {job.salary && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Gift className="w-4 h-4 text-gray-400" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="mb-6 flex flex-wrap gap-2">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
              
                    <div className="mt-auto">
                      <a 
                        href={job.applicationLink || `mailto:${job.contactEmail || 'careers@csts.org'}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        Apply Now
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-16 bg-gradient-to-br from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Volunteer Opportunities</h2>
              <p className="text-blue-100 text-lg">
                Make a difference in preserving cultural heritage through our volunteer programs
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Research</h3>
                <p className="text-blue-100">
                  Contribute to documenting cultural practices, language variations, and traditional knowledge systems.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Fieldwork</h3>
                <p className="text-blue-100">
                  Engage in community outreach, interview traditional knowledge holders, and collect oral histories.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Paintbrush className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Content Creation</h3>
                <p className="text-blue-100">
                  Create impactful content for our digital platforms, helping to promote awareness of cultural heritage.
                </p>
              </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
        transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
      >
              <h3 className="text-2xl font-semibold mb-4">Why Volunteer With Us?</h3>
              <p className="text-blue-100 mb-4">
                Volunteering with CSTS gives you the opportunity to make a real difference in preserving linguistic and cultural heritage. You'll work with experts in the field, gain valuable experience, and contribute to meaningful projects.
        </p>
              <p className="text-blue-100 mb-6">
                Exceptional volunteers who demonstrate outstanding dedication and impact will receive a personalized recommendation letter recognizing their contributions.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-800 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
                Apply to Volunteer
        </motion.button>
      </motion.div>
          </div>
        </div>
      </section>

               {/* Company Values */}
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
              Our Values
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              custom={1}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              What makes working with CSTS a unique and rewarding experience
            </motion.p>
      </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-gray-50">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
              Hear From Our Team
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              custom={1}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Stories and experiences from our team members and volunteers
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                quote: "Working at CSTS has given me the opportunity to contribute to preserving the cultural heritage that I grew up with. It's incredibly fulfilling.",
                name: "Priya Jha",
                role: "Research Associate",
                avatar: "/carousel1.jpg"
              },
              {
                quote: "The collaborative environment and the opportunity to work on meaningful projects make CSTS a truly special place to work and grow professionally.",
                name: "Rajesh Kumar",
                role: "Language Expert",
                avatar: "/carousel2.jpg"
              },
              {
                quote: "Volunteering with CSTS has been an enriching experience. I've learned so much about my own cultural roots while contributing to important documentation work.",
                name: "Anita Singh",
                role: "Volunteer",
                avatar: "/carousel3.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Join Our Mission?</h2>
            <p className="text-blue-100 mb-8">
              Be part of our team working to document, preserve, and revitalize the cultural heritage of Mithila. 
              Apply today and make a meaningful impact!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#opportunities"
                className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Opportunities
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:careers@csts.org"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact HR Team
              </motion.a>
            </div>
          </motion.div>
        </div>
    </section>
      
    <Footer />
    </>
  );
};

export default Career;
