import React, { useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import useAuth from '../hooks/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    // Validate passwords match
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    // Only allow password update if current password is provided
    if (formData.newPassword && !formData.currentPassword) {
      setMessage({ type: 'error', text: 'Please enter your current password' });
      return;
    }
    
    try {
      setLoading(true);
      
      // Update profile
      const updateData = {
        username: formData.username,
        email: formData.email,
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      };
      
      await axios.put(`${API_URL}/auth/update-profile`, updateData);
      
      setMessage({ type: 'success', text: 'Profile updated successfully' });
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err: any) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout title="Profile">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl text-white font-bold">
                  {user?.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user?.username}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {user?.role}
              </p>
            </div>
            
            {message && (
              <div className={`mb-6 p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 rounded-md font-medium text-white ${
                    loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  } transition duration-200`}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile; 