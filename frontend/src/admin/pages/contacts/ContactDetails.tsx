import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch contact details
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/contacts/${id}`);
        setContact(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contact details:', err);
        setError('Failed to load contact details');
        setLoading(false);
      }
    };

    if (id) {
      fetchContactDetails();
    }
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Handle status change
  const handleStatusChange = async (newStatus: string) => {
    if (!contact) return;
    
    try {
      await axios.put(`${API_URL}/contacts/${id}`, { status: newStatus });
      setContact({ ...contact, status: newStatus });
    } catch (err) {
      console.error('Error updating contact status:', err);
      setError('Failed to update status');
    }
  };

  // Handle sending reply
  const handleSendReply = async () => {
    if (!contact || !reply.trim()) return;
    
    setIsSending(true);
    try {
      await axios.post(`${API_URL}/contacts/${id}/reply`, { 
        message: reply,
        email: contact.email,
        name: contact.name,
        subject: `Re: ${contact.subject}`
      });
      
      // Update status to replied
      await handleStatusChange('replied');
      
      setSuccessMessage('Reply sent successfully');
      setReply('');
      setIsSending(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error sending reply:', err);
      setError('Failed to send reply');
      setIsSending(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) {
      return;
    }
    
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      navigate('/admin/contacts');
    } catch (err) {
      console.error('Error deleting contact:', err);
      setError('Failed to delete the contact');
    }
  };

  return (
    <Layout title={contact ? `Message from ${contact.name}` : 'Contact Details'}>
      <div className="mb-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/admin/contacts')}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Contacts
        </button>
        
        {contact && (
          <div className="flex space-x-2">
            <select
              value={contact.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-1 bg-gray-100 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="resolved">Resolved</option>
              <option value="spam">Spam</option>
            </select>
            
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : contact ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">From</h3>
                <p className="text-gray-900">{contact.name} &lt;{contact.email}&gt;</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="text-gray-900">{formatDate(contact.createdAt)}</p>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Subject</h3>
                <p className="text-gray-900 text-lg font-medium">{contact.subject}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
              <div className="p-4 bg-gray-50 rounded-lg whitespace-pre-wrap">
                {contact.message}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Reply</h3>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full h-36 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <div className="mt-2 flex justify-end">
                <button
                  onClick={handleSendReply}
                  disabled={isSending || !reply.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
                >
                  {isSending ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">Contact not found</p>
        </div>
      )}
    </Layout>
  );
};

export default ContactDetails; 