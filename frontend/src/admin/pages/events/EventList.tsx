import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import useAuth from '../../hooks/useAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Default placeholder images
const defaultEventImages = [
  'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
];

interface EventItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  isActive: boolean;
  registrationUrl: string;
  imageUrl?: string;
  createdAt: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState<string | null>(null);
  const { token } = useAuth();

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events`);
        setEvents(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        await axios.delete(`${API_URL}/events/${id}`, config);
        setEvents(events.filter(item => item._id !== id));
        setConfirmDelete(null);
      } catch (err) {
        console.error('Error deleting event:', err);
        setError('Failed to delete the event');
      }
    } else {
      setConfirmDelete(id);
    }
  };

  // Handle toggle active status
  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      setStatusLoading(id);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.put(
        `${API_URL}/events/${id}`, 
        { isActive: !currentStatus },
        config
      );
      
      // Update the list with the updated item
      setEvents(events.map(item => 
        item._id === id ? { ...item, isActive: !currentStatus } : item
      ));
      
      setStatusLoading(null);
    } catch (err) {
      console.error('Error updating event status:', err);
      setError('Failed to update the status');
      setStatusLoading(null);
    }
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get a placeholder image based on event ID
  const getPlaceholderImage = (id: string) => {
    // Use the sum of character codes in the ID to determine image index
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return defaultEventImages[sum % defaultEventImages.length];
  };

  return (
    <Layout title="Event Management">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Upcoming Events</h2>
        <Link 
          to="/admin/events/add" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Event
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No events found</p>
          <Link 
            to="/admin/events/add" 
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Your First Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((item) => (
            <div 
              key={item._id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageUrl || getPlaceholderImage(item._id)} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
                  <div className="mt-1 flex">
                    <button 
                      onClick={() => toggleActiveStatus(item._id, item.isActive)}
                      disabled={statusLoading === item._id}
                      className={`relative mr-2 inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.isActive ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span 
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          item.isActive ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <div className="flex items-center">
                    <span className="mr-1">📅</span> {formatDate(item.date)}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-1">📍</span> {item.location}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <Link 
                    to={`/admin/events/edit/${item._id}`} 
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className={`${
                      confirmDelete === item._id
                        ? 'text-red-600 font-bold'
                        : 'text-red-400 hover:text-red-600'
                    }`}
                  >
                    {confirmDelete === item._id ? (
                      'Confirm?'
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default EventList; 