import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faHandshake, faCoins } from '@fortawesome/free-solid-svg-icons';
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

const Membership = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <>
      <div className="px-4 py-10 md:px-20 bg-gray-50 min-h-screen">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center text-gray-800 mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Become a Member
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-between mb-10 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div className="text-justify text-gray-700 leading-relaxed mb-6 md:mb-0 md:w-2/3">
            <p className="mb-6">
              “Centre for Studies of Traditions and System (CSTS), is a trust working in the cultural, academic arena with special emphasis on the promotion of language and literature, heritage conservation, women empowerment, sustainable development, art and craft with a clear motive of making human a resource and conscious towards civilizational structures.
              Maithili Machaan and Madhubani Literature Festival is the initiative of CSTS to bring intellectually stimulating material in the form of debates, discussion & documentation through festivals and other events which involves not only the scholars and elites but also the common mass.
            </p>
            <p>
              CSTS is a nonprofit organization which needs support to meet the expenses associated with sustaining its mission and vision, as well as its programs and services and to make the projects sustainable. Membership drive is an effort to bring likeminded people under one umbrella so that the common issues and information can be shared.
            </p>
          </div>

          <div className="w-full md:w-1/3 mb-6 md:mb-0 ml-6">
            <img
              src="https://www.shutterstock.com/image-photo/membership-concept-hand-pressing-social-260nw-340326950.jpg"
              alt="Donation Image"
              className="rounded-lg shadow-lg w-[400px] h-[280px] object-cover"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              {index === 0 && (
                <div className="bg-gradient-to-br from-teal-100 to-white p-6 rounded-3xl shadow-xl border-t-4 border-teal-500 hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-500 text-white flex items-center justify-center rounded-full shadow-lg">
                    <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">MLF, 2021 Registration</h2>
                  <p className="text-2xl font-bold text-teal-600 mb-4 text-center">Plan-1 ₹100</p>
                  <ul className="text-gray-700 list-disc pl-5 space-y-2 mb-4">
                    <li>It is yearly membership.</li>
                    <li>Entry to MLF 2021 for four days events.</li>
                    <li>Priority for volunteering CSTS events + participation certificate.</li>
                    <li>Priority for talk shows on MLF and Maithili Machaan platform.</li>
                    <li>Articles can be published in CSTS Blog after editorial approval.</li>
                  </ul>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 w-full font-medium shadow-md mt-40">Pay Now</button>
                </div>
              )}
              {index === 1 && (
                <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-3xl shadow-xl border-t-4 border-blue-500 hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-lg">
                    <FontAwesomeIcon icon={faHandshake} className="text-2xl" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">MLF, 2021 Registration</h2>
                  <p className="text-2xl font-bold text-blue-600 mb-4 text-center">Plan-2 ₹3,000</p>
                  <ul className="text-gray-700 list-disc pl-5 space-y-2 mb-4">
                    <li>It is yearly membership.</li>
                    <li>Entry to MLF 2021 at Darbhanga with complementary food for 4 days.</li>
                    <li>Complimentary MLF 2021 kit (Bag, Momento, MLF Mug, Smarika).</li>
                    <li>Priority for volunteering CSTS events + participation certificate.</li>
                    <li>Priority for talk shows on MLF and Maithili Machaan platform.</li>
                    <li>Articles can be published in CSTS Blog after editorial approval.</li>
                  </ul>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full font-medium shadow-md mt-28">Pay Now</button>
                </div>
              )}
              {index === 2 && (
                <div className="bg-gradient-to-br from-gray-100 to-white p-6 rounded-3xl shadow-xl border-t-4 border-gray-700 hover:scale-105 transition-transform duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 text-white flex items-center justify-center rounded-full shadow-lg">
                    <FontAwesomeIcon icon={faCoins} className="text-2xl" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2 text-center text-gray-800">Lifetime Membership</h2>
                  <p className="text-2xl font-bold text-gray-700 mb-4 text-center">Plan-3 ₹20,000</p>
                  <ul className="text-gray-700 list-disc pl-5 space-y-2 mb-4">
                    <li>Member’s Name and Photo on CSTS website.</li>
                    <li>Entry to all MLFs with complementary food.</li>
                    <li>Complimentary MLF kit (Bag, Momento, MLF Mug, Smarika).</li>
                    <li>Included in organizing committee for CSTS events.</li>
                    <li>Voting rights for CSTS awards.</li>
                    <li>Priority for talk shows on MLF and Maithili Machaan platform.</li>
                    <li>Articles in CSTS Smarika and Blog (post editorial approval).</li>
                    <li>Priority for memorial lectures if approved by CSTS committee.</li>
                  </ul>
                  <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 w-full font-medium shadow-md">Pay Now</button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.section
        className="bg-white py-12 px-6 md:px-12 max-w-6xl mx-auto rounded-3xl shadow-xl border border-gray-200 mt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Membership Terms and Conditions</h2>
        <p className="text-gray-700 text-lg mb-6 text-center max-w-5xl mx-auto">
          We organise the <strong>Maithili Machaan, Madhubani Literature Festival</strong> to be a rewarding and fulfilling experience. In this spirit, please raise any issues or questions with us directly so that we can work it out with you. For reference, our terms and conditions are:
        </p>
        <ol className="list-decimal text-gray-800 space-y-4 pl-5 text-base">
          <li>The benefits of the plan can only be used by the named person.</li>
          <li>The membership is non-refundable.</li>
          <li>All information provided to you as part of your application for and membership of the CSTS Maithili Machaan, Madhubani Literature Festival will be held by us in accordance with the <strong>Section 72 A of IT Act 2000</strong> and will not be passed on to a third party.</li>
          <li>Event reserves the right to reject an application for membership or to terminate a membership at any time due to misconduct by a member.</li>
          <li>Upon termination of membership, no refund will be made for the remaining duration of the membership.</li>
        </ol>
      </motion.section>

      <Footer />
    </>
  );
};

export default Membership;
