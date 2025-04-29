import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  registrationUrl: string;
}

const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/events/upcoming`);
        setEvents(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching upcoming events:', err);
        setError('Failed to load upcoming events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">📅 Upcoming Events</h3>
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">📅 Upcoming Events</h3>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">📅 Upcoming Events</h3>
      
      {events.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming events at the moment.</p>
      ) : (
        <ul className="space-y-4 text-gray-700 text-sm">
          {events.map((event) => (
            <li key={event._id}>
              <div className="font-semibold">{event.title}</div>
              <div className="text-xs text-gray-500">
                {formatDate(event.date)} – {event.location}
                {event.registrationUrl && (
                  <a 
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-blue-700 hover:underline text-sm font-medium bg-blue-100 px-2 py-1 rounded ml-2"
                  >
                    Register
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      
      <div className="mt-6">
        <Link to="/events" className="text-blue-700 hover:underline text-sm font-medium">
          View All Events →
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents; 