import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, X, Globe } from 'lucide-react';

const festivals = [
  {
    name: 'Sama Chakeva (सामा चकेवा)',
    description: 'A festival celebrated to strengthen the bond between brothers and sisters. Celebrated during Kartik Purnima (November).',
    image: '/images/festivals/sama-chakeva.jpg',
    details: {
      en: 'Sama-Chakeva is a beautiful and vibrant festival celebrated in the Mithila region, especially by women and young girls. It marks the bond of love between brothers and sisters and is observed during the Kartik month (October-November) when migratory birds return from the Himalayas to the plains. This festival is filled with folk songs, rituals, and colorful clay figurines, making it an essential part of Mithila\'s rich cultural heritage.',
      hi: 'सामा-चकेवा मिथिला क्षेत्र में एक सुंदर और जीवंत त्योहार है, विशेष रूप से महिलाओं और युवा लड़कियों द्वारा मनाया जाता है। यह भाई-बहनों के प्रेम के बंधन को चिह्नित करता है और कार्तिक मास (अक्टूबर-नवंबर) के समय में मनाया जाता है जब हिमालय से चारागाहों में पक्षी लौटते हैं। इस त्योहार में लोकगीत, रीति-रिवाज और रंगीन मिट्टी की मूर्तियों से भरा होता है, जो मिथिला की समृद्ध सांस्कृतिक विरासत का एक महत्वपूर्ण हिस्सा है।'
    }
  },
  {
    name: 'Jitiya (जीतिया व्रत)',
    description: 'A significant three-day festival observed by mothers for the well-being of their children.',
    image: '/images/festivals/jitiya.jpg',
    details: {
      en: 'Jitiya, also known as Jivitputrika Vrat, is a significant three-day festival observed by mothers for the well-being of their children. The first day, Nahai-Khai, begins with a ritual bath, after which mothers partake in a single vegetarian meal. This meal is traditionally prepared using ghee (clarified butter) and pink salt, adhering to specific dietary guidelines. The second day, Khur-Jitiya or Jiviputrika day, is marked by a rigorous, waterless fast, demonstrating immense devotion. The third day, Parana, culminates in the breaking of the fast with a feast of carefully prepared delicacies.',
      hi: 'जीतिया, जिसे जीवितपुत्रिका व्रत भी कहा जाता है, माताओं द्वारा अपने बच्चों के स्वास्थ्य के लिए मनाया जाने वाला एक महत्वपूर्ण तीन दिन का त्योहार है। पहले दिन, नहाई-खाई, से शुरू होता है, जिसमें माताएं एक वैराग्य भोजन लेती हैं। यह भोजन साधारण तौर पर घी (घी) और लाल नमक का प्रयोग करके तैयार किया जाता है, जिसमें विशेष आहार नियम शामिल होते हैं। दूसरे दिन, खुर-जीतिया या जीवितपुत्रिका दिवस, जल के बिना एक कठोर व्रत का पालन किया जाता है, जो अत्यधिक भक्ति को दर्शाता है। तीसरे दिन, परणा, व्रत को तोड़ने के साथ समाप्त होता है, जिसमें तैयार किए गए विशेष मिठाई और सब्जियों का भोजन होता है।'
    }
  },
  {
    name: 'Vivah Panchami (विवाह पंचमी)',
    description: 'A grand and sacred festival marking the divine wedding of Lord Rama and Goddess Sita.',
    image: '/images/festivals/vivah-panchami.jpg',
    details: {
      en: 'Vivah Panchami is a grand and sacred festival marking the divine wedding of Lord Rama and Goddess Sita. It is celebrated on the fifth day of the bright half of the month of Agrahayana (November-December). This festival is a celebration of the union of two divine souls and is observed with great fervor and devotion in the Mithila region.',
      hi: 'विवाह पंचमी भगवान राम और देवी सीता के पवित्र विवाह को चिह्नित करने वाला एक भव्य और पवित्र त्योहार है। यह अग्रहायण मास (नवंबर-दिसंबर) के शुक्ल पक्ष की पांचवीं तिथि को मनाया जाता है। यह त्योहार दो दिव्य आत्माओं के मिलन का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  },
  {
    name: 'Chaurchan Puja (चौरचन पूजा)',
    description: 'A significant festival dedicated to Lord Ganesha and Chandra Deva.',
    image: '/images/festivals/chaurchan.jpg',
    details: {
      en: 'Chaurchan Puja is a significant festival dedicated to Lord Ganesha and Chandra Deva. It is celebrated on the full moon night of the month of Kartik (October-November). This festival is a celebration of the divine union of Lord Ganesha and Chandra Deva and is observed with great devotion and fervor in the Mithila region.',
      hi: 'चौरचन पूजा भगवान गणेश और चंद्र देव को समर्पित एक महत्वपूर्ण त्योहार है। यह कार्तिक मास (अक्टूबर-नवंबर) की पूर्णिमा की रात को मनाया जाता है। यह त्योहार भगवान गणेश और चंद्र देव के दिव्य मिलन का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  },
  {
    name: 'Kojagara (कोजगरा)',
    description: 'A festival dedicated to Goddess Lakshmi, celebrated on the full moon night of Ashwin.',
    image: '/images/festivals/kojagara.jpg',
    details: {
      en: 'Kojagara is a festival dedicated to Goddess Lakshmi, celebrated on the full moon night of the month of Ashwin (September-October). This festival is a celebration of the divine power of Goddess Lakshmi and is observed with great devotion and fervor in the Mithila region.',
      hi: 'कोजगरा देवी लक्ष्मी को समर्पित एक त्योहार है, जो आश्विन मास (सितंबर-अक्टूबर) की पूर्णिमा की रात को मनाया जाता है। यह त्योहार देवी लक्ष्मी की दिव्य शक्ति का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  },
  {
    name: 'Tila Sakrait (तिला सकराईत)',
    description: 'A traditional festival associated with sesame and jaggery consumption.',
    image: '/images/festivals/tila-sakrait.jpg',
    details: {
      en: 'Tila Sakrait is a traditional festival associated with sesame and jaggery consumption. It is celebrated on the second day of the bright half of the month of Magha (January-February). This festival is a celebration of the union of sesame and jaggery and is observed with great fervor and devotion in the Mithila region.',
      hi: 'तिला सकराईत तिल और गुड़ के सेवन से जुड़ा एक पारंपरिक त्योहार है। यह माघ मास (जनवरी-फरवरी) के शुक्ल पक्ष की दूसरी तिथि को मनाया जाता है। यह त्योहार तिल और गुड़ के मिलन का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  },
  {
    name: 'Joor Sital (जुर शीतल)',
    description: 'Maithili New Year celebrated with cold water sprinkling and special dishes.',
    image: '/images/festivals/joor-sital.jpg',
    details: {
      en: 'Joor Sital is the Maithili New Year celebrated with cold water sprinkling and special dishes. It is celebrated on the first day of the bright half of the month of Chaitra (March-April). This festival is a celebration of the beginning of the new year and is observed with great fervor and devotion in the Mithila region.',
      hi: 'जुर शीतल मैथिली नव वर्ष है, जो ठंडे पानी के छिड़काव और विशेष व्यंजनों के साथ मनाया जाता है। यह चैत्र मास (मार्च-अप्रैल) के शुक्ल पक्ष की पहली तिथि को मनाया जाता है। यह त्योहार नए वर्ष की शुरुआत का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  },
  {
    name: 'Madhushravani (मधुश्रावणी)',
    description: 'A month-long festival celebrated in Shravan month by newly married women.',
    image: '/images/festivals/madhushravani.jpg',
    details: {
      en: 'Madhushravani is a month-long festival celebrated in the month of Shravan (July-August) by newly married women. This festival is a celebration of the union of the newly married couple and is observed with great devotion and fervor in the Mithila region.',
      hi: 'मधुश्रावणी श्रावण मास (जुलाई-अगस्त) में नवविवाहित महिलाओं द्वारा मनाया जाने वाला एक मास भर का त्योहार है। यह त्योहार नवविवाहित दंपत्ति के मिलन का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  },
  {
    name: 'Sita Navami (सीता नवमी)',
    description: 'Birth anniversary of Goddess Sita, celebrated in Mithila region.',
    image: '/images/festivals/sita-navami.jpg',
    details: {
      en: 'Sita Navami is the birth anniversary of Goddess Sita, celebrated in the Mithila region. It is celebrated on the ninth day of the bright half of the month of Vaishakh (April-May). This festival is a celebration of the divine power of Goddess Sita and is observed with great devotion and fervor in the Mithila region.',
      hi: 'सीता नवमी देवी सीता की जयंती है, जो मिथिला क्षेत्र में मनाई जाती है। यह वैशाख मास (अप्रैल-मई) के शुक्ल पक्ष की नौवीं तिथि को मनाया जाता है। यह त्योहार देवी सीता की दिव्य शक्ति का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  },
  {
    name: 'Ghadi Parva (घड़ी पर्व)',
    description: 'A festival for family well-being and prosperity.',
    image: '/images/festivals/ghadi-parva.jpg',
    details: {
      en: 'Ghadi Parva is a festival for family well-being and prosperity. It is celebrated on the first day of the bright half of the month of Chaitra (March-April). This festival is a celebration of the union of the family and is observed with great fervor and devotion in the Mithila region.',
      hi: 'घड़ी पर्व परिवार के सुख-समृद्धि के लिए मनाया जाने वाला एक त्योहार है। यह चैत्र मास (मार्च-अप्रैल) के शुक्ल पक्ष की पहली तिथि को मनाया जाता है। यह त्योहार परिवार के मिलन का जश्न है और मिथिला क्षेत्र में बड़े उत्साह और भक्ति के साथ मनाया जाता है।'
    }
  }
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

const modalVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
};

const FestivalMithila = () => {
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const openModal = (festival) => {
    setSelectedFestival(festival);
  };

  const closeModal = () => {
    setSelectedFestival(null);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

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
          <div className="flex justify-center items-center gap-2 mb-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
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
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {language === 'en' ? festival.description : festival.details.hi.split('. ')[0]}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
                  onClick={() => openModal(festival)}
                >
                  Learn More
                  <ChevronRight className="ml-2 w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        {selectedFestival && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              className="fixed inset-0 max-w-4xl mx-auto p-4"
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-blue-900">{selectedFestival.name}</h2>
                    <button
                      onClick={toggleLanguage}
                      className="flex items-center text-blue-700 hover:text-blue-900 font-medium"
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      {language === 'en' ? 'हिंदी' : 'English'}
                    </button>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <img
                        src={selectedFestival.image}
                        alt={selectedFestival.name}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600 leading-relaxed">
                        {language === 'en' ? selectedFestival.details.en : selectedFestival.details.hi}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FestivalMithila;