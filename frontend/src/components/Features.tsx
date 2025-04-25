import React from 'react';
import { Code, Shield, Rocket, Database } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 border-t-4 border-blue-700">
      <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-blue-950 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Code size={24} className="text-blue-700" />,
      title: "Custom Software Development",
      description: "We build tailored software solutions that align perfectly with your business objectives and workflows."
    },
    {
      icon: <Shield size={24} className="text-blue-700" />,
      title: "Cybersecurity Solutions",
      description: "Protect your digital assets with our comprehensive security services and risk management."
    },
    {
      icon: <Rocket size={24} className="text-blue-700" />,
      title: "Digital Transformation",
      description: "Transform your business with cutting-edge digital solutions that drive efficiency and growth."
    },
    {
      icon: <Database size={24} className="text-blue-700" />,
      title: "Cloud Infrastructure",
      description: "Leverage the power of cloud computing with our scalable and reliable infrastructure solutions."
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive technology solutions to help businesses thrive in the digital landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;