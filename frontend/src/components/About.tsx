import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import EventSlider from './EventSlider';

const About = () => {
  const handleDonateClick = () => {
    // Add your donation logic here
    console.log('Donate button clicked');
  };

  const handleJoinClick = () => {
    // Add your join logic here
    console.log('Join button clicked');
  };

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* About CSTS with Upcoming Events Side-by-Side */}
<div className="flex flex-col lg:flex-row gap-12 mb-16">
  {/* About CSTS Text */}
  <div className="lg:w-2/3">
    <h2 className="text-3xl font-bold text-blue-950 mb-4 text-center lg:text-left">About CSTS</h2>
    <div className="max-w-4xl mx-auto">
      <p className="text-gray-600 mb-6 leading-relaxed text-justify">
        Centre for Studies of Tradition and Systems (CSTS) is an organisation for sustained community engagement with the aim of helping people in resolving the philosophical conflicts by creating a space for dialogue. 
      </p>
      <p className="text-gray-600 mb-6 leading-relaxed text-justify">
        The CSTS should be seen as an institution which is attempting to reclaim the knowledge tradition keeping in mind its contemporariness. 
      </p>
      <p className="text-gray-600 mb-6 leading-relaxed text-justify">
        It should not be taken as a revivalist effort but a creative intervention for resolving the conflict between modernity and tradition to influence the lifeworld of these people.
      </p>
    </div>
  </div>

  {/* Upcoming Events Card - Using the slider component instead */}
  <div className="lg:w-1/3">
    <EventSlider />
  </div>
</div>


        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-5/12 mb-10 lg:mb-0">
            <img
              src="https://t4.ftcdn.net/jpg/00/96/54/53/360_F_96545306_cX6N4Fv2TTVRMKahA3aoCvxlUOGm2KkV.jpg"
              alt="CSTS Mission"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          
          <div className="lg:w-7/12">
            <h3 className="text-2xl font-bold text-blue-950 mb-4">Our Mission</h3>
            <div className="max-w-3xl">
              <p className="text-gray-600 mb-6 leading-relaxed text-justify">
                The CSTS believes in creating a platform for dialogue on social science, science, technology, philosophy, economy, lifeworld, and almost everything that concerns human beings. The idea is to look into the multiple dimensions of knowledge traditions, archiving the manuscripts, publishing the scholarly works, conducting seminars/workshops and action research on contemporary issues, rural uplifting, mother tongue promotion with special focus on Maithili language and literature, women's empowerment, heritage conservation, promotion of local art and craft, Indo-Nepal relationship, promoting the discourse between modern and traditional, organising philosophical debates as soft power knowledge, reading culture, agricultural experiments, water
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section with image on right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="lg:w-7/12">
            <h3 className="text-2xl font-bold text-blue-950 mb-4">Our Vision</h3>
            <div className="max-w-3xl">
              <p className="text-gray-600 mb-6 leading-relaxed text-justify">
                The CSTS aims to address the issue of uneven, unequal spectrum of developmental goals and it's deep rooted crisis has propelled us to look for alternative modes of understanding. CSTS as an organization is an ardent believer in dynamism and pace of the tradition and traditional. We strive for becoming the voice of the marginalized.
              </p>
            </div>
          </div>
          
          <div className="lg:w-5/12 mb-10 lg:mb-0">
            <img
              src="https://thumbs.dreamstime.com/b/our-vision-background-light-bulb-words-drawn-blackboard-chalkboard-business-concept-40008857.jpg"
              alt="CSTS Vision"
              className="rounded-lg shadow-xl w-full"
            />
          </div>
        </div>

        {/* How Can You Help Section */}
        <div className="text-center py-12 bg-gradient-to-r from-green-100 to-blue-300">
          <h3 className="text-2xl font-bold text-blue-950 mb-4">How Can You Help?</h3>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Your donation will help us save and improve lives with research, education and emergency care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={handleDonateClick}
              className="bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg active:shadow-sm text-sm sm:text-base w-full sm:w-auto"
            >
              <Link to="/donate">Donate Now</Link>
            </button>
            <button 
              onClick={handleJoinClick}
              className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 px-6 sm:px-8 py-2 sm:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg active:shadow-sm text-sm sm:text-base w-full sm:w-auto"
            >
              <Link to="/join-us">Join Us Now</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;