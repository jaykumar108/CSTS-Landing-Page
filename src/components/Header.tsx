import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${ 
        isOpen ? 'bg-gradient-to-br from-pink-400 to-blue-400 text-white' : (isScrolled ? 'bg-white shadow-md' : 'bg-transparent')
      }`}
      style={isOpen ? {
        background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)'
      } : isScrolled ? {
        background: 'linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)'
      } : undefined}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Logo className={isOpen ? 'text-white' : (isScrolled ? 'text-blue-700' : 'text-blue-700')} />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex justify-center space-x-8">
            <Link 
              to="/"
              className={`text-sm font-medium transition-colors duration-300 ${
                isOpen 
                  ? 'text-white hover:text-pink-200' 
                  : (isScrolled 
                      ? 'text-gray-800 hover:text-blue-700' 
                      : 'text-gray-800 hover:text-blue-700')
              }`}
            >
              Home
            </Link>
            {['About US', 'Know Mithila', 'MLF','Maithil Machaan','Gallery','Saksham Mithila','Gyan Changera','Career','Join Us'].map((item) => (
              <Link 
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isOpen 
                    ? 'text-white hover:text-pink-200' 
                    : (isScrolled 
                        ? 'text-gray-800 hover:text-blue-700' 
                        : 'text-gray-800 hover:text-blue-700')
                }`}
              >
                {item}
              </Link>
            ))}
            <Link 
              to="/contact"
              className={`text-sm font-medium transition-colors duration-300 ${
                isOpen 
                  ? 'text-white hover:text-pink-200' 
                  : (isScrolled 
                      ? 'text-gray-800 hover:text-blue-700' 
                      : 'text-gray-800 hover:text-blue-700')
              }`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <div className="flex flex-col items-center space-y-4 px-4">
              <Link 
                to="/"
                className="text-gray-800 hover:text-blue-700 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              {['About US', 'Know Mithila', 'MLF','Maithil Machaan','Gallery','Saksham Mithila','Gyan Changera','Career','Join Us'].map((item) => (
                <Link 
                  key={item}
                  to={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-800 hover:text-blue-700 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link 
                to="/contact"
                className="text-gray-800 hover:text-blue-700 text-sm font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;