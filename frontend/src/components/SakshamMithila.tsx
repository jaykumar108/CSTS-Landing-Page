import React from 'react';
import { motion } from 'framer-motion';
import Footer from './Footer';

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

const slideIn = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const SakshamMithila = () => {
  return (
    <>
      <div className="bg-gray-50 px-6 md:px-20 py-12">
        <motion.h1 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-4xl font-bold text-center text-green-700 mb-8 mt-12"
        >
          Saksham Mithila
        </motion.h1>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-5xl mx-auto text-gray-800 text-lg leading-relaxed space-y-6"
        >
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            Welcome to <strong>Saksham Mithila</strong> – a CSTS initiative dedicated to empowering rural communities, developed in collaboration with <strong>Mithila Stack</strong>!
          </motion.p>
          
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            Saksham Mithila aims to provide employment opportunities to rural youth, women, and specially-abled individuals. By partnering with CSR programs, Mithila Stack brings innovative solutions like a <strong>mobile flour/sattu mill mounted on a battery-operated tricycle</strong>, empowering local businesses and fostering sustainable income.
          </motion.p>

          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            Saksham Mithila में आपका स्वागत है – यह ग्रामीण समुदायों को सशक्त बनाने के लिए CSTS की एक पहल है, जिसे Mithila Stack के सहयोग से विकसित किया गया है!
          </motion.p>
          <motion.p 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
          >
            सक्षम मिथिला का उद्देश्य ग्रामीण युवाओं, महिलाओं और विशेष रूप से सक्षम व्यक्तियों को रोजगार के अवसर प्रदान करना है। सीएसआर कार्यक्रमों के साथ साझेदारी करके, मिथिला स्टैक बैटरी से चलने वाले तिपहिया वाहन पर लगे मोबाइल आटा/सत्तू मिल जैसे अभिनव समाधान लाता है, जो स्थानीय व्यवसायों को सशक्त बनाता है और स्थायी आय को बढ़ावा देता है।
          </motion.p>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mt-8">App Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <motion.li 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                Elegant UI and UX: Supports English, Hindi, and Maithili with high-quality visuals.
              </motion.li>
              <motion.li 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                List of Mill Owners: Directory with names, villages, and direct call functionality.
              </motion.li>
              <motion.li 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                Register for Mill: Forms for specially-abled individuals and youth.
              </motion.li>
              <motion.li 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                Upcoming Events: Stay updated with workshops, training, and community events.
              </motion.li>
              <motion.li 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideIn}
              >
                Video Library: Watch program descriptions and success stories.
              </motion.li>
            </ul>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mt-8">Our Mission</h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              We are committed to empowering rural communities through strategic partnerships. Collaborating with Mithila Stack, we ensure the development of the Saksham Mithila mobile app and support the procurement of mobile milling units.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              हमारा लक्ष्य ग्रामीण युवाओं, महिलाओं और विशेष रूप से सक्षम व्यक्तियों के लिए रोजगार के अवसर प्रदान करना है, जिससे आर्थिक विकास और समावेशिता को बढ़ावा मिले।
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mt-8">About Us</h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              Saksham Mithila, developed by CSTS in collaboration with Mithila Stack, bridges the gap between technology and rural empowerment. We work with banks, NBFCs, and micro-finance institutions to provide the necessary funding and resources.
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              Saksham Mithila, जिसे CSTS ने Mithila Stack के सहयोग से विकसित किया है, प्रौद्योगिकी और ग्रामीण सशक्तिकरण के बीच की खाई को पाटता है।
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mt-8">Contact Us</h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              Email: csts.ind@gmail.com | contact@mithilastack.com
            </motion.p>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              Address: Mithila Stack, SH75 Mabbi Road, near Oriental College, Darbhanga, Bihar, India – 846005
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex space-x-4 mt-4"
          >
            <motion.a 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              href="#" 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Visit Mithila Stack 🚀
            </motion.a>
            <motion.a 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              href="#" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Visit Saksham Mithila 🚀
            </motion.a>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-2xl font-semibold text-indigo-700 mt-10">Join Our Mission</h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              Together, we can create a more inclusive and prosperous rural community. Download the Saksham Mithila app, developed by Mithila Stack, today and be a part of our mission to empower local businesses and support specially-abled individuals and youth in rural areas. Coming Soon on App Store and Google Play Store.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid md:grid-cols-2 gap-6 mt-8"
          >
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h3>
              <p>
                The CSTS believes in creating a platform for dialogue on social science, science, technology, philosophy, economy, lifeworld, and more, with a focus on knowledge traditions, language promotion, heritage, and empowerment.
              </p>
            </motion.div>
            <motion.img 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              src="https://via.placeholder.com/400x300" 
              alt="Our Mission" 
              className="rounded-lg shadow-md"
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h3>
              <p>
                CSTS aims to address developmental disparities with dynamic approaches, becoming a voice for the marginalized through inclusive and conscious practices.
              </p>
            </motion.div>
            <motion.img 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              src="https://via.placeholder.com/400x300" 
              alt="Our Vision" 
              className="rounded-lg shadow-md"
            />

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Values</h3>
              <p>
                CSTS revives and shares the rich cultural life of Mithila with the world, uniting scholars, artists, farmers, and creators on a shared platform.
              </p>
            </motion.div>
            <motion.img 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
              src="https://via.placeholder.com/400x300" 
              alt="Our Values" 
              className="rounded-lg shadow-md"
            />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default SakshamMithila;
