import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import useAuth from '../../hooks/useAuth';
import { useSocket } from '../../context/SocketContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [totalContacts, setTotalContacts] = useState<number>(0);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  const { token } = useAuth();
  const { socket } = useSocket();

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            page: currentPage,
            limit: 10,
            sort: '-createdAt',
            ...(searchQuery ? { search: searchQuery } : {})
          }
        };

        const response = await axios.get(`${API_URL}/contacts`, config);
        
        if (response.data.success) {
          setContacts(response.data.data);
          setTotalContacts(response.data.total || 0);
        } else {
          setError(response.data.message || 'Failed to load contacts');
          setContacts([]);
        }
      } catch (err: any) {
        console.error('Error fetching contacts:', err);
        setError(err.response?.data?.message || 'Failed to load contacts. Please check your connection.');
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchContacts();
    } else {
      setError('You must be logged in to view contacts');
      setLoading(false);
    }
  }, [currentPage, searchQuery, token]);

  // Listen for real-time contact updates
  useEffect(() => {
    if (!socket) return;

    socket.on('new-notification', (data) => {
      if (data.contact) {
        // Add new contact to the list if we're on the first page
        if (currentPage === 1) {
          setContacts(prev => [data.contact, ...prev]);
          setTotalContacts(prev => prev + 1);
        } else {
          // Just update the count if we're not on the first page
          setTotalContacts(prev => prev + 1);
        }
      }
    });

    return () => {
      socket.off('new-notification');
    };
  }, [socket, currentPage]);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        await axios.delete(`${API_URL}/contacts/${id}`, config);
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
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.put(`${API_URL}/contacts/${id}`, { status: newStatus }, config);
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

  // Filter contacts based on status and search query
  useEffect(() => {
    let filtered = contacts;
    
    // Apply status filter if not 'all'
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter);
    }
    
    // Apply search filter if query exists
    if (searchQuery) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (contact.phone && contact.phone.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    setFilteredContacts(filtered);
  }, [contacts, statusFilter, searchQuery]);

  // Function to handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Calculate pagination values
  const pageSize = 10;
  const totalPages = Math.ceil(totalContacts / pageSize);

  return (
    <Layout title="Contact Messages">
      <div className="mb-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
       
        
        <div className="flex flex-col md:flex-row gap-1 md:items-center mt-2">
          {/* Search box */}
          <div className="w-full md:w-1/1 flex mb-4">
            <input
              type="text" 
              placeholder="Search contacts..."
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="status-filter" className="text-sm text-gray-600 p-2 mb-4">
              Filter by status:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((contact, index) => (
                  <tr key={contact._id} className={`hover:bg-gray-50 ${contact.status === 'new' ? 'bg-blue-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{filteredContacts.length - index}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{contact.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{contact.phone || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{contact.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(contact.status)} border`}>
                        {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                      </span>
                      <select
                        value={contact.status}
                        onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                        className="ml-2 px-2 py-1 text-xs rounded bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Add pagination controls after the table */}
      {!loading && filteredContacts.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredContacts.length} of {totalContacts} contacts
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                // Show pages around current page
                let pageToShow;
                if (totalPages <= 5) {
                  pageToShow = i + 1;
                } else if (currentPage <= 3) {
                  pageToShow = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageToShow = totalPages - 4 + i;
                } else {
                  pageToShow = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageToShow)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === pageToShow
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pageToShow}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="px-1">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ContactList; 