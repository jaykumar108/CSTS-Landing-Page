import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import axios from '../../utils/axiosConfig';

interface Stats {
  galleryCount: number;
  jobsCount: number;
  contactsCount: number;
  newContactsCount: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    galleryCount: 0,
    jobsCount: 0,
    contactsCount: 0,
    newContactsCount: 0
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch gallery count
        const galleryRes = await axios.get('/gallery');
        
        // Fetch jobs count
        const jobsRes = await axios.get('/jobs');
        
        // Fetch contacts count
        const contactsRes = await axios.get('/contacts');
        
        // Create stats object from responses
        setStats({
          galleryCount: galleryRes.data.count || 0,
          jobsCount: jobsRes.data.count || 0,
          contactsCount: contactsRes.data.count || 0,
          newContactsCount: contactsRes.data.data.filter((contact: any) => contact.status === 'new').length || 0
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Stat cards
  const StatCard = ({ title, value, icon, color }: { title: string; value: number; icon: JSX.Element; color: string }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${color}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  // Render loading state
  if (loading) {
    return (
      <Layout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  // Render error state
  if (error) {
    return (
      <Layout title="Dashboard">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Overview</h2>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Gallery Images" 
          value={stats.galleryCount}
          color="border-blue-500"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Active Jobs" 
          value={stats.jobsCount}
          color="border-green-500"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
        
        <StatCard 
          title="Total Contacts" 
          value={stats.contactsCount}
          color="border-purple-500"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          }
        />
        
        <StatCard 
          title="New Messages" 
          value={stats.newContactsCount}
          color="border-red-500"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/admin/gallery/add" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="p-2 rounded-md bg-blue-200 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-blue-700">Add Gallery Image</h3>
              <p className="text-sm text-blue-600">Upload a new image to gallery</p>
            </div>
          </a>
          
          <a href="/admin/jobs/add" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div className="p-2 rounded-md bg-green-200 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-green-700">Post New Job</h3>
              <p className="text-sm text-green-600">Create a new job listing</p>
            </div>
          </a>
          
          <a href="/admin/contacts" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="p-2 rounded-md bg-purple-200 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-purple-700">View Messages</h3>
              <p className="text-sm text-purple-600">Check contact form submissions</p>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard; 