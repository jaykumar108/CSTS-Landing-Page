import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="CSTS Logo" 
        className="h-8 w-8 object-cover"
      />
      <span className="ml-2 text-xl font-bold text-blue-950">CSTS</span>
    </div>
  );
};

export default Logo;