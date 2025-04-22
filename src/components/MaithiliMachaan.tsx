import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Paintbrush, Music, Calendar } from 'lucide-react';
import Footer from './Footer';

const MaithiliMachaan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Key Aspects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Key Aspects of Maithili Machaan
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-yellow-100">
                <BookOpen className="w-8 h-8 text-yellow-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Language & Literature</h3>
              <p className="text-gray-600">
                Discusses the rich literary history of Maithili, including works by Vidyapati and other Maithili scholars. Focuses on the preservation and promotion of Maithili as a language.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-green-100">
                <Paintbrush className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Heritage & Culture</h3>
              <p className="text-gray-600">
                Highlights Mithila's cultural identity through festivals, rituals, and folk traditions. Encourages discussions on Madhubani painting, folk music, and historical significance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <div className="mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center bg-blue-100">
                <Users className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tradition & Society</h3>
              <p className="text-gray-600">
                Explores Maithili wedding customs, social structures, and traditional practices. Addresses modern challenges and ways to preserve Mithila's cultural roots.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Connection with Madhubani Literature Festival */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Connection with Madhubani Literature Festival
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              As a part of the Madhubani Literature Festival, Maithili Machaan serves as a cultural think tank, bringing together scholars, writers, artists, and intellectuals. It provides a space for debates, literary readings, and discussions on Maithili identity and progress.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Significance Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              Significance
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Revives interest in Maithili traditions and heritage in the modern era. Promotes Mithila's cultural richness on national and global platforms. Encourages youth participation in preserving Maithili language and literature.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MaithiliMachaan; 