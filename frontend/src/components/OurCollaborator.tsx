import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import axios from "axios";

interface Collaborator {
  _id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  order: number;
  isActive: boolean;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.2,
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
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

const OurCollaborator = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/collaborators`);
        
        if (response.data.success) {
          setCollaborators(response.data.data);
        } else {
          setError(response.data.message || 'Failed to load collaborators');
        }
      } catch (err) {
        console.error('Error fetching collaborators:', err);
        setError('Failed to load collaborators. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  return (
    <div className="py-16 px-4 bg-gray-50 min-h-screen">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto text-center"
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideIn}
          className="text-4xl font-bold text-gray-800 mb-6"
        >
          Our Collaborators
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideIn}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          We proudly collaborate with diverse institutions committed to tradition, innovation, and scholarship.
        </motion.p>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="mt-12 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : collaborators.length === 0 ? (
          <div className="mt-12 p-4 bg-gray-100 text-gray-600 rounded-lg">
            No collaborators found.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
            className="mt-12 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8"
          >
            {collaborators.map((item, index) => (
              <motion.div
                key={item._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col items-center justify-center"
              >
                {item.logo ? (
                  <motion.img
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideIn}
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="w-12 h-12 object-contain mb-3"
                  />
                ) : (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={slideIn}
                    className="bg-blue-100 p-3 rounded-full mb-3"
                  >
                    <Users className="w-6 h-6 text-blue-500" />
                  </motion.div>
                )}
                <motion.h3
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={slideIn}
                  className="text-sm font-semibold text-gray-800 text-center"
                >
                  {item.name}
                </motion.h3>
                {item.website && (
                  <a 
                    href={item.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 text-xs text-blue-500 hover:text-blue-700"
                  >
                    Visit Website
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default OurCollaborator;
