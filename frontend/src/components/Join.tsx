import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Join = () => {
  return (
    <>
      <section className="min-h-screen px-4 md:px-20 py-10 bg-gradient-to-b from-white to-blue-50 mt-12">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-800">Join Us</h1>
          <p className="mt-2 text-gray-600 text-lg max-w-2xl mx-auto">
            Be part of a movement to preserve and celebrate linguistic and cultural diversity.
          </p>
        </motion.div>

        {/* Donate Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-10"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Donate & Support</h2>
          <p className="text-gray-700 mb-4">
            Help us sustain and expand our mission by making a donation. Your contribution directly supports language preservation, research projects, and community outreach initiatives. With your support, we can continue to protect cultures and traditions for future generations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
          >
           <Link to="/donate"> Donate Now</Link>
          </motion.button>
        </motion.div>

        {/* Membership Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold text-blue-700 mb-4"> Become a Member</h2>
          <p className="text-gray-700 mb-4">
            The Centre for Studies of Traditions and Systems (CSTS) is a cultural and academic trust focused on language, literature, heritage, women empowerment, sustainable development, and the arts.
          </p>
          <p className="text-gray-700 mb-4">
            Its key initiatives — <strong>Maithili Machaan</strong> and the <strong>Madhubani Literature Festival</strong> — aim to spark intellectual discourse through festivals and events that engage both scholars and the wider public.
          </p>
          <p className="text-gray-700 mb-4">
            As a member, you will gain early access to events, publications, and opportunities to collaborate on our research and outreach programs.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
          >
           <Link to="/membership"> Membership</Link>
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Join;
