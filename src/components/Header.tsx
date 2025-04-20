import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMithilaMenuOpen, setIsMithilaMenuOpen] = useState(false);

  const toggleMithilaMenu = () => {
    setIsMithilaMenuOpen(!isMithilaMenuOpen);
  };

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
      } : {
        background: 'transparent'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo className={isOpen ? 'text-white' : (isScrolled ? 'text-blue-700' : 'text-blue-700')} />
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 hover:text-gray-600"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-8">
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
            <div className="relative group">
              <button
                onClick={toggleMithilaMenu}
                className={`flex items-center text-sm font-medium transition-colors duration-300 ${
                  isOpen 
                    ? 'text-white hover:text-pink-200' 
                    : (isScrolled 
                        ? 'text-gray-800 hover:text-blue-700' 
                        : 'text-gray-800 hover:text-blue-700')
                }`}
              >
                Know Mithila
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div
                className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 transition-all duration-300 ${
                  isMithilaMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <Link
                  to="/know-mithila/festivals"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                >
                  Festivals OF Mithila
                </Link>
              </div>
            </div>
            {['About US', 'MLF','Maithil Machaan','Gallery','Saksham Mithila','Gyan Changera','Career','Join Us'].map((item) => (
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

          {/* Mobile menu */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${isOpen ? 'block' : 'hidden'}`}
            onClick={(e) => {
              // Only close if clicking outside the menu
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <div className="fixed inset-0 bg-white z-50">
              <div className="p-4">
                <div className="flex items-center justify-between mb-8">
                  <Logo className={isOpen ? 'text-white' : (isScrolled ? 'text-blue-700' : 'text-blue-700')} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="text-gray-800 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-4">
                  <Link 
                    to="/" 
                    className="block text-gray-800 hover:text-gray-600 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  >
                    Home
                  </Link>
                  <div className="relative group">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMithilaMenu();
                      }}
                      className="flex items-center justify-between w-full text-gray-800 hover:text-gray-600 font-medium"
                    >
                      Know Mithila
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    <div
                      className={`absolute left-0 w-full bg-white rounded-md shadow-lg z-50 transition-all duration-300 ${
                        isMithilaMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link 
                        to="/know-mithila/festivals" 
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(false);
                        }}
                      >
                        Festivals OF Mithila
                      </Link>
                    </div>
                  </div>
                  {['About US', 'MLF','Maithil Machaan','Gallery','Saksham Mithila','Gyan Changera','Career','Join Us'].map((item) => (
                    <Link 
                      key={item}
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="block text-gray-800 hover:text-gray-600 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(false);
                      }}
                    >
                      {item}
                    </Link>
                  ))}
                  <Link 
                    to="/contact" 
                    className="block text-gray-800 hover:text-gray-600 font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                  >
                    Contact
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;