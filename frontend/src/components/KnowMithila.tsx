import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Paintbrush, BookOpen, Utensils, Music, Calendar, Users } from 'lucide-react';
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

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
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

// Categories for Mithila info
const categories = [
  {
    id: 'history',
    title: 'History',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'art',
    title: 'Art & Craft',
    icon: <Paintbrush className="w-6 h-6" />,
    color: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'cuisine',
    title: 'Cuisine',
    icon: <Utensils className="w-6 h-6" />,
    color: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'music',
    title: 'Music & Dance',
    icon: <Music className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'festivals',
    title: 'Festivals',
    icon: <Calendar className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'people',
    title: 'People & Society',
    icon: <Users className="w-6 h-6" />,
    color: 'bg-orange-100 text-orange-800'
  }
];

// Featured attractions
const attractions = [
  {
    id: 1,
    name: 'Janaki Mandir',
    location: 'Janakpur, Nepal',
    category: 'Heritage Sites',
    image: '/carousel1.jpg',
    description: 'A stunning example of Hindu-Rajput architecture, dedicated to Goddess Sita.'
  },
  {
    id: 2,
    name: 'Mithila Museum',
    location: 'Darbhanga, Bihar',
    category: 'Museums',
    image: '/carousel2.jpg',
    description: 'Houses rare Madhubani paintings and historical artifacts from the region.'
  },
  {
    id: 3,
    name: 'Madhubani Art Center',
    location: 'Madhubani, Bihar',
    category: 'Art Centers',
    image: '/carousel3.jpg',
    description: 'A hub for traditional Mithila painting and artwork creation.'
  },
  {
    id: 4,
    name: 'Darbhanga Palace',
    location: 'Darbhanga, Bihar',
    category: 'Heritage Sites',
    image: '/carousel4.jpg',
    description: 'Historic palace of the Maharajas of Darbhanga built in unique Indo-European style.'
  }
];

// Cultural aspects data
const culturalAspects = {
  history: {
    title: 'Rich Historical Legacy',
    content: 'Mithila, one of the oldest regions of Eastern India, has a recorded history dating back to 3000 BCE. It was the birthplace of Goddess Sita and the seat of King Janak. The region is mentioned in ancient texts like the Ramayana, Mahabharata, and Buddhist literature. Throughout history, Mithila has been a center of learning, philosophy, and culture.',
    image: '/carousel1.jpg'
  },
  art: {
    title: 'Madhubani Art & Craft',
    content: 'Madhubani (or Mithila) painting is a renowned art form practiced in the Mithila region. Characterized by geometric patterns, mythological motifs, and vibrant colors, these paintings have gained international recognition. Originally created on freshly plastered mud walls of homes, they are now produced on paper, cloth, and canvas as well.',
    image: '/carousel2.jpg'
  },
  cuisine: {
    title: 'Authentic Maithil Cuisine',
    content: 'Maithil cuisine is known for its unique flavors and preparation methods. Popular dishes include Thekua (a sweet snack), Makhana Kheer (lotus seed pudding), Dhuska (fried rice pancakes), and Ghughni (curried black chickpeas). The cuisine emphasizes seasonal ingredients and traditional cooking techniques passed down through generations.',
    image: '/carousel3.jpg'
  },
  music: {
    title: 'Music & Dance Traditions',
    content: 'The musical traditions of Mithila include folk songs like Jat-Jatin, Sama-Chakeva, and Sohni. The region has a rich tradition of devotional music and festival songs. Dance forms such as Jat-Jatin and Jhijhiya are performed during specific festivals and celebrations, showcasing the cultural vibrancy of the region.',
    image: '/carousel4.jpg'
  },
  festivals: {
    title: 'Vibrant Festivals',
    content: 'Festivals in Mithila reflect its cultural richness and religious diversity. Chhath Puja, one of the most important festivals, involves worship of the Sun God. Other significant celebrations include Sama-Chakeva, Jur Sital, Madhushravani, and Durga Puja, each with unique rituals and customs that have been preserved for centuries.',
    image: '/carousel2.jpg'
  },
  people: {
    title: 'People & Society',
    content: 'Mithila society is known for its unique social structure and traditions. The region has produced renowned scholars, philosophers, and artists. The Maithil Brahmin and Kayastha communities have traditionally been custodians of knowledge and art. The society values education, with ancient centers of learning like the University of Vikramashila having roots in the region.',
    image: '/carousel4.jpg'
  }
};

const KnowMithila = () => {
  const [activeCategory, setActiveCategory] = useState('history');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-10 z-0" 
               style={{ backgroundImage: "url('')" }} />
          
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
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent mb-6"
              >
                Know Mithila
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-xl text-gray-700 mb-10 leading-relaxed"
              >
                Explore the rich cultural heritage, art, traditions, and history of Mithila - 
                one of India's oldest cultural regions with a legacy spanning thousands of years.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-center"
              >
                <a href="#explore" className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-colors">
                  Explore Mithila
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Region Map & Intro */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">The Land of Mithila</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Mithila is a historical and cultural region located in the northeastern part of the Indian subcontinent, 
                  spanning across parts of modern-day Bihar in India and the eastern Terai of Nepal.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  With a history dating back thousands of years, Mithila was mentioned in ancient texts like the 
                  Upanishads, Ramayana, and Buddhist Jataka tales. It was ruled by the legendary King Janak 
                  and is revered as the birthplace of Goddess Sita.
                </p>
                <div className="flex items-center space-x-2 text-blue-700 mb-4">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">Geographical Span: North Bihar (India) and parts of Nepal</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-700">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Language: Maithili (An ancient Indo-Aryan language)</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative z-10 bg-white p-2 rounded-xl shadow-lg">
                  <img 
                    src="/carousel2.jpg" 
                    alt="Map of Mithila Region" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-blue-900">
                    Historical Mithila Region
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500 rounded-full opacity-10"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500 rounded-full opacity-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cultural Aspects Section */}
        <section id="explore" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Explore Cultural Aspects
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Discover the various dimensions of Mithila's rich cultural heritage
              </motion.p>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : `${category.color} shadow-sm hover:shadow`
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  <span className="font-medium">{category.title}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Content Display */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="order-2 md:order-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {culturalAspects[activeCategory as keyof typeof culturalAspects].title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {culturalAspects[activeCategory as keyof typeof culturalAspects].content}
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`/know-mithila/${activeCategory}`}
                  className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </motion.a>
              </div>
              <div className="order-1 md:order-2 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={culturalAspects[activeCategory as keyof typeof culturalAspects].image} 
                  alt={culturalAspects[activeCategory as keyof typeof culturalAspects].title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Attractions */}
        <section className="py-16 bg-white">
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
                Must-Visit Places in Mithila
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Explore these iconic locations to experience Mithila's culture and heritage
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {attractions.map((attraction, index) => (
                <motion.div
                  key={attraction.id}
                  variants={fadeInUp}
                  custom={index}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={attraction.image} 
                      alt={attraction.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                      {attraction.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{attraction.name}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      {attraction.location}
                    </div>
                    <p className="text-gray-700 text-sm">{attraction.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16 bg-blue-50">
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
                Frequently Asked Questions
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                custom={1}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Common questions about Mithila and its cultural heritage
              </motion.p>
            </motion.div>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              {[
                {
                  question: "What is the historical significance of Mithila?",
                  answer: "Mithila is one of the oldest cultural regions of India, mentioned in ancient texts like the Ramayana and Upanishads. It was the kingdom of King Janak and birthplace of Goddess Sita. The region has been a significant center of learning, philosophy, and art for thousands of years."
                },
                {
                  question: "What is Madhubani or Mithila painting?",
                  answer: "Madhubani (or Mithila) painting is a traditional art form originating from the Mithila region. It features geometric patterns, mythological themes, and vibrant colors. Originally created on mud walls of homes, these paintings are now recognized worldwide and have received UNESCO cultural heritage status."
                },
                {
                  question: "What language is spoken in Mithila?",
                  answer: "The primary language of Mithila is Maithili, an ancient Indo-Aryan language with a rich literary tradition. It has its own script called Mithilakshar (or Tirhuta) and was recognized as an official language in the Indian constitution in 2003."
                },
                {
                  question: "What are some traditional festivals of Mithila?",
                  answer: "Mithila celebrates numerous traditional festivals including Chhath Puja (sun worship), Sama-Chakeva (celebrating brother-sister relationships), Jur Sital (agricultural festival), and Madhushravani (celebrating newly married women). Each festival has unique customs and rituals that reflect Mithila's cultural richness."
                },
                {
                  question: "How can I experience Mithila culture today?",
                  answer: "You can experience Mithila culture by visiting places like Darbhanga, Madhubani, and Janakpur, exploring museums with Mithila art collections, attending cultural festivals, learning about Madhubani painting, trying Maithil cuisine, and engaging with cultural organizations working to preserve Mithila's heritage."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  custom={index}
                  className="mb-4"
                >
                  <button
                    className={`w-full text-left p-5 rounded-lg ${
                      expandedFAQ === index ? 'bg-white shadow-md' : 'bg-gray-100 hover:bg-gray-200'
                    } transition-all duration-200`}
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                      <ChevronDown 
                        className={`w-5 h-5 text-blue-600 transition-transform ${
                          expandedFAQ === index ? 'transform rotate-180' : ''
                        }`} 
                      />
                    </div>
                    {expandedFAQ === index && (
                      <p className="mt-3 text-gray-700 animate-fadeIn">
                        {faq.answer}
                      </p>
                    )}
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Magic of Mithila</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Immerse yourself in the vibrant culture, art, and traditions of this ancient land. 
                Join us in celebrating and preserving the heritage of Mithila.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/know-mithila/festivals"
                  className="px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                >
                  Explore Festivals
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/gallery"
                  className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  View Gallery
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

export default KnowMithila; 