import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Gift, Laptop, Globe, ChevronRight, GraduationCap, Briefcase, HeartHandshake, Users, BrainCircuit, Star, BookOpen, Paintbrush, X, Info } from 'lucide-react';
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
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  
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

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" 
             style={{ backgroundImage: "url('')" }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent mb-1"
            >
              Join Our Team
            </motion.h1>
          </div>
        </div>
      </section>
      {/* Job Listings */}
      <section id="opportunities" className="py-4 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-4"
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {jobs.length === 0 ? (
                <div className="col-span-3 text-center py-12 bg-gray-50 rounded-xl">
                  <p className="text-gray-500 text-lg">No positions available at the moment</p>
                </div>
              ) : (
                jobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    variants={fadeInUp}
                    custom={index}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all p-4 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                          job.type === 'Internship' 
                            ? 'bg-green-100 text-green-800' 
                            : job.type === 'Remote' 
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                        }`}>
                          {job.type}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.department || job.company}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        job.type === 'Internship' 
                          ? 'bg-green-100' 
                          : job.type === 'Remote' 
                            ? 'bg-blue-100'
                            : 'bg-purple-100'
                      }`}>
                        {job.type === 'Internship' 
                          ? <GraduationCap className="w-5 h-5 text-green-600" />
                          : job.type === 'Remote'
                            ? <Globe className="w-5 h-5 text-blue-600" />
                            : <Briefcase className="w-5 h-5 text-purple-600" />
                        }
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                    
                    {/* Job Details */}
                    <div className="grid grid-cols-1 gap-1 mb-3">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{job.location}</span>
                      </div>
                      {job.duration && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span>{job.duration}</span>
                        </div>
                      )}
                      {job.perks && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Gift className="w-3 h-3 text-gray-400" />
                          <span>{job.perks}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Skills */}
                    {job.skills && job.skills.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {job.skills.map((skill, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
              
                    <div className="mt-auto flex gap-2">
                      <button
                        onClick={() => openJobDetails(job)}
                        className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm"
                      >
                        View Details
                        <Info className="w-3 h-3" />
                      </button>
                      <a 
                        href={job.applicationLink || `mailto:${job.contactEmail || 'careers@csts.org'}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-1 transition-colors text-sm"
                      >
                        Apply Now
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
              <button 
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  selectedJob.type === 'Internship' 
                    ? 'bg-green-100 text-green-800' 
                    : selectedJob.type === 'Remote' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-purple-100 text-purple-800'
                }`}>
                  {selectedJob.type}
                </span>
                <span className="text-gray-600">{selectedJob.department || selectedJob.company}</span>
                <span className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {selectedJob.location}
                </span>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{selectedJob.description}</p>
              </div>
              
              {selectedJob.requirements && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <p className="text-gray-700 whitespace-pre-line">{selectedJob.requirements}</p>
                </div>
              )}
              
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {selectedJob.duration && (
                  <div>
                    <h4 className="font-medium text-gray-900">Duration</h4>
                    <p className="text-gray-600">{selectedJob.duration}</p>
                  </div>
                )}
                
                {selectedJob.salary && (
                  <div>
                    <h4 className="font-medium text-gray-900">Salary/Stipend</h4>
                    <p className="text-gray-600">{selectedJob.salary}</p>
                  </div>
                )}
                
                {selectedJob.perks && (
                  <div>
                    <h4 className="font-medium text-gray-900">Perks</h4>
                    <p className="text-gray-600">{selectedJob.perks}</p>
                  </div>
                )}
                
                {selectedJob.languages && (
                  <div>
                    <h4 className="font-medium text-gray-900">Languages</h4>
                    <p className="text-gray-600">{selectedJob.languages}</p>
                  </div>
                )}
              </div>
              
              {selectedJob.note && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-1">Additional Note</h4>
                  <p className="text-blue-700">{selectedJob.note}</p>
                </div>
              )}
              
              <div className="mt-8">
                <a 
                  href={selectedJob.applicationLink || `mailto:${selectedJob.contactEmail || 'careers@csts.org'}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  Apply For This Position
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

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
