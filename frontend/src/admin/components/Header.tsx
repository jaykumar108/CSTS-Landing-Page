import React from 'react';
import useAuth from '../hooks/useAuth';
import NotificationBell from './NotificationBell';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      
      <div className="flex items-center">
        <div className="mr-4">
          <NotificationBell />
        </div>
        
        <div className="hidden md:flex mr-4">
          <span className="text-sm text-gray-600 mr-2">Welcome,</span>
          <span className="text-sm font-medium">{user?.username}</span>
        </div>
        
        <div className="relative">
          <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 