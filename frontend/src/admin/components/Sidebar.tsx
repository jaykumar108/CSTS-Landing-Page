import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Image, 
  Briefcase, 
  MessageSquare, 
  User, 
  LogOut,
  Menu, 
  X 
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { path: '/admin/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { path: '/admin/gallery', icon: <Image size={20} />, label: 'Gallery' },
    { path: '/admin/jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
    { path: '/admin/contacts', icon: <MessageSquare size={20} />, label: 'Contacts' },
    { path: '/admin/profile', icon: <User size={20} />, label: 'Profile' }
  ];

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin/login';
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-20 m-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-md shadow-md focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`bg-white w-64 min-h-screen flex flex-col shadow-md transition-all duration-300 fixed lg:static z-30
                   ${isMobileMenuOpen ? 'left-0' : '-left-64 lg:left-0'}`}
      >
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-blue-900">CSTS Admin</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-md mx-2 
                            ${isActive(item.path) ? 'bg-blue-100 text-blue-700 font-medium' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-md"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar; 