import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

const jobData = [
  {
    title: 'Intern',
    location: 'Darbhanga',
    duration: 'Minimum 2 months',
    perks: 'Certificate & Stipend',
    note: 'A personal laptop is required',
    type: 'Internship',
  },
  {
    title: 'Language Expert',
    location: 'Remote',
    languages: 'Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Maithili, Malayalam, Manipuri, Marathi, Nepali, Oriya, Punjabi, Tamil, Telugu, Urdu',
    type: 'Remote Job',
  },
  {
    title: 'Data Annotator',
    location: 'Remote',
    languages: 'Assamese, Bengali, Bodo, Dogri, Gujarati, Hindi, Kannada, Kashmiri, Maithili, Malayalam, Manipuri, Marathi, Nepali, Oriya, Punjabi, Tamil, Telugu, Urdu',
    type: 'Remote Job',
  },
];

const Career = () => {
  return (
    <>
    <section className="min-h-screen px-4 md:px-20 py-10 bg-gradient-to-b from-white to-blue-50 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-blue-800">Career @ CSTS</h1>
        <p className="mt-2 text-gray-600 text-lg max-w-2xl mx-auto">
          Explore exciting opportunities for students and scholars interested in language research, cultural studies, and community-driven projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobData.map((job, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.2 }}
            className="rounded-2xl shadow-lg bg-white p-6 border border-gray-200 hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">📌 Position: {job.title}</h2>
            <p className="text-gray-700 mb-1">📍 Location: {job.location}</p>
            {job.duration && <p className="text-gray-700 mb-1">⏳ Duration: {job.duration}</p>}
            {job.perks && <p className="text-gray-700 mb-1">🎁 Perks: {job.perks}</p>}
            {job.note && <p className="text-gray-700 mb-1">💻 Note: {job.note}</p>}
            {job.languages && <p className="text-gray-700 mb-1">🗣️ Languages: {job.languages}</p>}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              Apply Now
            </motion.button>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Volunteer Opportunities</h2>
        <p className="text-gray-700 mb-4">
          Become a part of CSTS by contributing as a researcher, fieldworker, or content creator. Whether you’re passionate about documenting languages, exploring cultural traditions, or creating impactful content, we welcome your expertise.
        </p>
        <p className="text-gray-700 mb-4">
          Volunteering with us gives you the opportunity to make a real difference in preserving linguistic and cultural heritage. Exceptional volunteers who demonstrate outstanding dedication and impact will receive a personalized recommendation letter recognizing their contributions.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
        >
          Apply Now
        </motion.button>
      </motion.div>
    </section>
    <Footer />
    </>
  );
};

export default Career;
