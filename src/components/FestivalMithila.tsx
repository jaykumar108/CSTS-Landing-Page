import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const festivals = [
  {
    name: 'Sama Chakeva (सामा चकेवा)',
    description: 'A festival celebrated to strengthen the bond between brothers and sisters. Celebrated during Kartik Purnima (November).',
    image: '/images/festivals/sama-chakeva.jpg',
  },
  {
    name: 'Jitiya (जीतिया व्रत)',
    description: 'A significant three-day festival observed by mothers for the well-being of their children.',
    image: '/images/festivals/jitiya.jpg',
  },
  {
    name: 'Vivah Panchami (विवाह पंचमी)',
    description: 'A grand and sacred festival marking the divine wedding of Lord Rama and Goddess Sita.',
    image: '/images/festivals/vivah-panchami.jpg',
  },
  {
    name: 'Chaurchan Puja (चौरचन पूजा)',
    description: 'A significant festival dedicated to Lord Ganesha and Chandra Deva.',
    image: '/images/festivals/chaurchan.jpg',
  },
  {
    name: 'Kojagara (कोजगरा)',
    description: 'A festival dedicated to Goddess Lakshmi, celebrated on the full moon night of Ashwin.',
    image: '/images/festivals/kojagara.jpg',
  },
  {
    name: 'Tila Sakrait (तिला सकराईत)',
    description: 'A traditional festival associated with sesame and jaggery consumption.',
    image: '/images/festivals/tila-sakrait.jpg',
  },
  {
    name: 'Joor Sital (जुर शीतल)',
    description: 'Maithili New Year celebrated with cold water sprinkling and special dishes.',
    image: '/images/festivals/joor-sital.jpg',
  },
  {
    name: 'Madhushravani (मधुश्रावणी)',
    description: 'A month-long festival celebrated in Shravan month by newly married women.',
    image: '/images/festivals/madhushravani.jpg',
  },
  {
    name: 'Sita Navami (सीता नवमी)',
    description: 'Birth anniversary of Goddess Sita, celebrated in Mithila region.',
    image: '/images/festivals/sita-navami.jpg',
  },
  {
    name: 'Ghadi Parva (घड़ी पर्व)',
    description: 'A festival for family well-being and prosperity.',
    image: '/images/festivals/ghadi-parva.jpg',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut'
    }
  })
};

const FestivalMithila = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-blue-900 mb-4 mt-12">Festivals of Mithila</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the rich cultural heritage of Mithila through its vibrant and traditional festivals.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {festivals.map((festival, index) => (
            <motion.div
              key={festival.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              custom={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={festival.image}
                  alt={festival.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">{festival.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{festival.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
                >
                  Learn More
                  <ChevronRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FestivalMithila;