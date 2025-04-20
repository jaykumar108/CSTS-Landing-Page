import React from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const Donate = () => {
  return (
    <>
    <motion.div
      className="px-6 md:px-20 py-10 bg-gray-100 text-gray-800"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-800 mt-12">
          Become a Member
        </h1>

        {/* Top Section: Text and Image Side by Side */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side Paragraph */}
          <div className="flex-1 text-justify">
            <p className="h-full">
              CSTS (Centre for Studies of Tradition and Systems, New Delhi) formed in 2016 as a public charitable trust for the benefit of agriculture, art and craft, literature, education, language promotion, village upliftment and revival, water resources management, philosophical and knowledge systems, women empowerment, environmental protection, rural employment generation, heritage and architecture conservation, tourism , music, folk traditions, documentation of popular histories, growth of history of ideas etc. at large. It is a legal registered entity with the Government of National Capital Territory of Delhi at New Delhi, India.
            </p>
          </div>

          {/* Right Side Image - match height of text */}
          <div className="flex-1 flex justify-center items-start">
  <img
    src="https://img.freepik.com/free-photo/volunteers-holding-box-containing-donations-charity_23-2149230560.jpg"
    alt="Donation Image"
    className="rounded-lg shadow-lg w-[500px] h-[220px] object-cover"
  />
</div>

        </div>

        {/* Full Width Section Below */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-lg text-justify">
          <p>
            With all-encompassing philanthropic objectives to serve the masses, CSTS is now working in diverse areas. All the services of the Trust are structured to promote the local, equal opportunity for all to live and progress. Evidently exhausting our resources for some years, we have potential fund shortage. We would welcome and urge any financial contribution for our endeavours along with creating an endowment fund for serious research projects and future plans of heritage conservation efforts for Mithila. CSTS has plans to embark upon some major social projects and it needs significant amount of funds in the form of donations to expand the scope of its activities.
          </p>
          <p className="mt-4">
            With this introduction, we request you to join hands with CSTS and donate for the work that it is doing through <strong>MAITHILI MACHAAN</strong> and <strong>MADHUBANI LITERATURE FESTIVAL</strong>. Your donation will help us provide our services better. Donors can help CSTS with their contributions using the following bank details and also suggest scope to do better. We welcome your valuable feedback and suggestions and are ready to collaborate with likeminded people and organizations. It will help us in enlarging the scope of our work.
          </p>

          {/* Donation Info */}
          <h2 className="text-2xl font-semibold mt-6 text-blue-700">You Can Donate</h2>
          <p><strong>Name:</strong> CENTRE FOR STUDIES OF TRADITION AND SYSTEMS</p>

          <h3 className="mt-4 text-xl font-semibold">Payment Method</h3>
          <ul className="list-disc ml-6">
            <li>NEFT</li>
            <li>IMPS</li>
            <li>RTGS</li>
          </ul>

          <h3 className="mt-4 text-xl font-semibold">Payment Information</h3>
          <ul className="ml-4 space-y-1">
            <li><strong>Account No.:</strong> 36470412229</li>
            <li><strong>IFSC:</strong> SBIN0001624</li>
            <li><strong>Bank Name:</strong> STATE BANK OF INDIA, JNU Branch, Old JNU Campus, Ber Sarai, New Delhi</li>
            <li><strong>Account Name:</strong> CENTRE FOR STUDIES OF TRADITION AND SYSTEMS</li>
            <li><strong>A/C Type:</strong> Current Account</li>
          </ul>

          <h3 className="mt-4 text-xl font-semibold">For Donations by Cheque / Draft</h3>
          <p>
            Cheque / Draft in favour of <strong>“CENTRE FOR STUDIES OF TRADITION AND SYSTEMS”</strong> payable at New Delhi.
          </p>

          <h3 className="mt-4 text-xl font-semibold">Note</h3>
          <p>
            Kindly send the transaction slip / detail to our email ID: <a href="mailto:csts.ind@gmail.com" className="text-blue-600 font-medium">csts.ind@gmail.com</a>
          </p>
        </div>
      </div>
    </motion.div>
    <Footer />
    </>
  );
};

export default Donate;
