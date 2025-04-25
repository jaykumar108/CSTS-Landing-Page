import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  notes: string;
  createdAt: string;
}

interface ReplyData {
  subject: string;
  message: string;
}

const ContactDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [replyData, setReplyData] = useState<ReplyData>({
    subject: '',
    message: '',
  });
  const [notes, setNotes] = useState<string>('');
  const [statusUpdated, setStatusUpdated] = useState<boolean>(false);

  // Fetch contact details
  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/contacts/${id}`);
        setContact(response.data.data);
        setNotes(response.data.data.notes || '');
        setLoading(false);
        
        // Auto update status to 'read' if it's 'new'
        if (response.data.data.status === 'new') {
          await handleStatusChange('read');
        }
      } catch (err) {
        console.error('Error fetching contact:', err);
        setError('Failed to load contact details');
        setLoading(false);
      }
    };

    if (id) {
      fetchContact();
    }
  }, [id]);

  // Handle reply input changes
  const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReplyData(prev => ({ ...prev, [name]: value }));
  };

  // Handle status change
  const handleStatusChange = async (newStatus: string) => {
    try {
      await axios.put(`${API_URL}/contacts/${id}`, { status: newStatus });
      setContact(prev => prev ? { ...prev, status: newStatus } : null);
      setStatusUpdated(true);
      
      // Hide status updated message after 3 seconds
      setTimeout(() => {
        setStatusUpdated(false);
      }, 3000);
    } catch (err) {
      console.error('Error updating contact status:', err);
      setError('Failed to update contact status');
    }
  };

  // Handle notes update
  const handleNotesUpdate = async () => {
    try {
      await axios.put(`${API_URL}/contacts/${id}`, { notes });
      setStatusUpdated(true);
      
      // Hide status updated message after 3 seconds
      setTimeout(() => {
        setStatusUpdated(false);
      }, 3000);
    } catch (err) {
      console.error('Error updating notes:', err);
      setError('Failed to update notes');
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would implement the email sending logic
      // For now, we'll just update the status to 'replied'
      await axios.put(`${API_URL}/contacts/${id}`, { 
        status: 'replied',
        notes: notes + `\n\n[${new Date().toLocaleString()}] Replied: ${replyData.subject} - ${replyData.message}` 
      });
      
      setContact(prev => prev ? { ...prev, status: 'replied' } : null);
      setShowReplyForm(false);
      setReplyData({ subject: '', message: '' });
      
      // Auto-refresh the contact details
      const response = await axios.get(`${API_URL}/contacts/${id}`);
      setContact(response.data.data);
      setNotes(response.data.data.notes || '');
    } catch (err) {
      console.error('Error sending reply:', err);
      setError('Failed to send reply');
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        navigate('/admin/contacts');
      } catch (err) {
        console.error('Error deleting contact:', err);
        setError('Failed to delete the contact');
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'read':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'replied':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'spam':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Layout title="Contact Details">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Contact Details">
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
        <button 
          onClick={() => navigate('/admin/contacts')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to List
        </button>
      </Layout>
    );
  }

  if (!contact) {
    return (
      <Layout title="Contact Details">
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Contact not found
        </div>
        <button 
          onClick={() => navigate('/admin/contacts')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to List
        </button>
      </Layout>
    );
  }

  return (
    <Layout title={`Contact from ${contact.name}`}>
      <div className="mb-4 flex justify-between items-center">
        <button 
          onClick={() => navigate('/admin/contacts')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to List
        </button>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showReplyForm ? 'Cancel Reply' : 'Reply'}
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {statusUpdated && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Updates saved successfully!
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{contact.subject}</h2>
              <p className="text-sm text-gray-500">From: {contact.name} &lt;{contact.email}&gt;</p>
              {contact.phone && <p className="text-sm text-gray-500">Phone: {contact.phone}</p>}
              <p className="text-sm text-gray-500">Received: {formatDate(contact.createdAt)}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`inline-flex px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(contact.status)} border mb-2`}>
                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
              </span>
              <select
                value={contact.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="resolved">Resolved</option>
                <option value="spam">Spam</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="prose max-w-none">
              <p>{contact.message}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add private notes about this contact..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button 
              onClick={handleNotesUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reply to Contact</h3>
            <form onSubmit={handleReplySubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={replyData.subject}
                  onChange={handleReplyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Re: "
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={replyData.message}
                  onChange={handleReplyChange}
                  className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your reply..."
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ContactDetails; 