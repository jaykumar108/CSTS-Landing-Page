import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/contacts`);
        setContacts(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setError('Failed to load contacts');
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        await axios.delete(`${API_URL}/contacts/${id}`);
        setContacts(contacts.filter(contact => contact._id !== id));
        setConfirmDelete(null);
      } catch (err) {
        console.error('Error deleting contact:', err);
        setError('Failed to delete the contact');
      }
    } else {
      setConfirmDelete(id);
    }
  };

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await axios.put(`${API_URL}/contacts/${id}`, { status: newStatus });
      setContacts(
        contacts.map(contact => 
          contact._id === id ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (err) {
      console.error('Error updating contact status:', err);
      setError('Failed to update contact status');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Filter contacts based on status
  const filteredContacts = statusFilter === 'all' 
    ? contacts 
    : contacts.filter(contact => contact.status === statusFilter);

  return (
    <Layout title="Contact Messages">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Contact Messages</h2>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="status-filter" className="text-sm text-gray-600">
            Filter by status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="resolved">Resolved</option>
            <option value="spam">Spam</option>
          </select>
        </div>
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
      ) : filteredContacts.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">
            {statusFilter === 'all' 
              ? 'No contact messages found' 
              : `No ${statusFilter} messages found`}
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact) => (
                  <tr key={contact._id} className={`hover:bg-gray-50 ${contact.status === 'new' ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{contact.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                        <option value="resolved">Resolved</option>
                        <option value="spam">Spam</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(contact.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/admin/contacts/${contact._id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        onClick={() => {
                          if (contact.status === 'new') {
                            handleStatusChange(contact._id, 'read');
                          }
                        }}
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(contact._id)}
                        className={`${
                          confirmDelete === contact._id
                            ? 'text-red-600 font-bold'
                            : 'text-red-400 hover:text-red-600'
                        }`}
                      >
                        {confirmDelete === contact._id ? 'Confirm?' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ContactList; 