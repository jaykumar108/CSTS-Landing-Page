import React from "react";
import { Users } from "lucide-react";

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
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Collaborators</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We proudly collaborate with diverse institutions committed to tradition, innovation, and scholarship.
        </p>

        <div className="mt-12 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
          {collaborators.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col items-center justify-center"
            >
              {item.logo ? (
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="w-12 h-12 object-contain mb-3"
                />
              ) : (
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              )}
              <h3 className="text-sm font-semibold text-gray-800 text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurCollaborator;
