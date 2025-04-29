import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  registrationUrl: string;
  imageUrl?: string; // This would be added if you have event images
}

const eventImages = [
  'https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
];

const EventSlider: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fix for NodeJS.Timeout error
  type TimeoutRef = ReturnType<typeof setTimeout> | null;
  const timerRef = useRef<TimeoutRef>(null);

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

  // Auto-slide effect
  useEffect(() => {
    if (events.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
      }, 9000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [events.length]);

  // Format date function
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <h3 className="text-xl font-semibold text-blue-900 p-4">📅 Upcoming Events</h3>
        <div className="flex justify-center items-center h-64 bg-gray-100">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <h3 className="text-xl font-semibold text-blue-900 p-4">📅 Upcoming Events</h3>
        <div className="p-4">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-lg">
        <h3 className="text-xl font-semibold text-blue-900 p-4">📅 Upcoming Events</h3>
        <div className="p-4">
          <p className="text-gray-500 text-sm">No upcoming events at the moment.</p>
        </div>
        <div className="p-4 border-t border-gray-200">
          <Link to="/events" className="text-blue-700 hover:underline text-sm font-medium">
            View All Events →
          </Link>
        </div>
      </div>
    );
  }

  const currentEvent = events[currentIndex];
  // Use a placeholder image if the event doesn't have an image
  const eventImage = eventImages[currentIndex % eventImages.length];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <h3 className="text-xl font-semibold text-blue-900 p-4">📅 Upcoming Events</h3>
      
      <div className="relative">
        {/* Image Section */}
        <div className="h-48 overflow-hidden">
          <img 
            src={currentEvent.imageUrl || eventImage} 
            alt={currentEvent.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        {/* Navigation Arrows */}
        {events.length > 1 && (
          <>
            <button 
              onClick={goToPrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-1 transition-all duration-300"
            >
              <ChevronLeft className="text-gray-800" size={24} />
            </button>
            <button 
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 rounded-full p-1 transition-all duration-300"
            >
              <ChevronRight className="text-gray-800" size={24} />
            </button>
          </>
        )}
        
        {/* Pagination Dots */}
        {events.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
            {events.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-white w-4' : 'bg-white bg-opacity-50'}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Event Details */}
      <div className="p-4">
        <h4 className="font-bold text-gray-800 text-lg mb-1">{currentEvent.title}</h4>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <span className="mr-1">📅</span> {formatDate(currentEvent.date)}
        </p>
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <span className="mr-1">📍</span> {currentEvent.location}
        </p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {currentEvent.description}
        </p>
        
        {currentEvent.registrationUrl && (
          <a 
            href={currentEvent.registrationUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 px-4 rounded transition-colors duration-300"
          >
            Register Now
          </a>
        )}
      </div>
      
      {/* Footer */}
      
      
    </div>
  );
};

export default EventSlider; 