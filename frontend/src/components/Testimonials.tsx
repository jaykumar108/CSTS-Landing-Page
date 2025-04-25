import React from 'react';

const Testimonials = () => {
  return (
    <section className="bg-gradient-to-b from-[#f0f8ff] to-[#fff0f5] py-12 px-4 sm:px-8 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Testimonials</h2>
        
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        
        <div className="flex-shrink-0">
          <img
            src="" // 👈 Change to your actual image path
            alt=""
            className="w-44 h-44 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-900">महामहिम आरिफ मोहम्मद खान</h3>
          <p className="text-sm text-gray-500 mb-4">माननीय राज्यपाल बिहार</p>

          <p className="text-gray-700 text-lg leading-relaxed italic relative">
            <span className="text-yellow-300 text-4xl font-bold absolute -top-4 left-[-10px]">“</span>
            मधुबनी लिटरेचर फेस्टिवल एक बहुत महत्वपूर्ण आयोजन है जिसके जरिए पूरे देश को, दुनिया को जो मिथिला से आई है,
            जो मधुबनी से आई है, उस इलाके से आई है, जो ज्ञान की परंपरा है, जो कला है, हुनर है उसके बारे में दुनिया को पता चलेगा।
            ये जो फेस्टिवल है अपने ज्ञान परंपरा के बारे में जागरूकता पैदा करता है।
            <span className="text-yellow-300 text-4xl font-bold absolute -bottom-4 right-[-10px]">”</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
