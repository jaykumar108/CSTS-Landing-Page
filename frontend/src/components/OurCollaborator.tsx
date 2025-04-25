import React from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

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

// Add logo path for each collaborator
const collaborators = [
  { name: "IGNCA", logo: "" },
  { name: "Sahitya Akademi", logo: "" },
  { name: "Darbhanga Sanskrit University", logo: "" },
  { name: "Bihar Lalit Kala Akademi", logo: "" },
  { name: "Mithila Research Foundation", logo: "" }, 
  { name: "JNU Sanskrit Dept.", logo: "" },
  { name: "Nalanda Studies Centre", logo: "" }, 
  { name: "Cultural Forum Delhi", logo: "" },
  { name: "Academy of Mithila Art", logo: "" },
];

const OurCollaborator = () => {
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideIn}
          className="mt-12 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8"
        >
          {collaborators.map((item, index) => (
            <motion.div
              key={index}
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
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OurCollaborator;
