import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useSocket } from '../context/SocketContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Notification {
  _id: string;
  type: 'contact' | 'system';
  title: string;
  message: string;
  read: boolean;
  sourceId?: string;
  createdAt: string;
}

const NotificationBell: React.FC = () => {
  const { token } = useAuth();
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const response = await axios.get(`${API_URL}/notifications`, config);
      
      setNotifications(response.data.data);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    if (!token) return;

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.put(`${API_URL}/notifications/${id}/read`, {}, config);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === id 
            ? { ...notification, read: true } 
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!token) return;

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.put(`${API_URL}/notifications/read-all`, {}, config);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!token) return;

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.delete(`${API_URL}/notifications/${id}`, config);
      
      // Update local state
      setNotifications(prev => prev.filter(notification => notification._id !== id));
      
      // Recalculate unread count
      const newUnreadCount = notifications.filter(n => !n.read && n._id !== id).length;
      setUnreadCount(newUnreadCount);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      fetchNotifications();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Fetch notifications on initial load
    fetchNotifications();

    // Set up polling to check for new notifications every minute
    const interval = setInterval(fetchNotifications, 60000);

    // Add click outside listener
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [token]);

  // Set up socket listeners for real-time updates
  useEffect(() => {
    if (!socket) return;

    // Listen for new notifications
    socket.on('new-notification', (data) => {
      console.log('New notification received:', data);
      
      // Update notifications array
      setNotifications(prev => [data.notification, ...prev]);
      
      // Update unread count
      setUnreadCount(prev => prev + 1);
      
      // Show notification using the browser API
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Contact Message', {
          body: data.notification.message,
          icon: '/favicon.ico'
        });
      } else if ('Notification' in window && Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    });

    // Listen for notification updates
    socket.on('notification-updated', (updatedNotification) => {
      console.log('Notification updated:', updatedNotification);
      
      // Update notification in state
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === updatedNotification._id 
            ? updatedNotification 
            : notification
        )
      );
      
      // Update unread count
      if (!updatedNotification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    });

    // Listen for all notifications marked as read
    socket.on('all-notifications-read', () => {
      console.log('All notifications marked as read');
      
      // Update all notifications as read
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // Reset unread count
      setUnreadCount(0);
    });

    // Listen for notification deletion
    socket.on('notification-deleted', (notificationId) => {
      console.log('Notification deleted:', notificationId);
      
      // Remove notification from state
      const notification = notifications.find(n => n._id === notificationId);
      setNotifications(prev => prev.filter(n => n._id !== notificationId));
      
      // Update unread count if needed
      if (notification && !notification.read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    });

    return () => {
      socket.off('new-notification');
      socket.off('notification-updated');
      socket.off('all-notifications-read');
      socket.off('notification-deleted');
    };
  }, [socket, notifications]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        aria-label="Notifications"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 inline-block w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
          <div className="p-3 bg-gray-100 border-b flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              <div>
                {notifications.map(notification => (
                  <div 
                    key={notification._id} 
                    className={`p-3 border-b hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                      <button
                        onClick={() => deleteNotification(notification._id)}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Delete notification"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">{formatDate(notification.createdAt)}</span>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell; 