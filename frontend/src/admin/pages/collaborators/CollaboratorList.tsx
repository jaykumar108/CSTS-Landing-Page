import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import useAuth from '../../hooks/useAuth';
import { Edit, Trash2, Eye, Plus, ExternalLink } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Collaborator {
  _id: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

const CollaboratorList: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCollaborators, setTotalCollaborators] = useState<number>(0);

  const { token } = useAuth();

  // Fetch collaborators
  useEffect(() => {
    const fetchCollaborators = async () => {
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
            sort: 'order'
          }
        };

        const response = await axios.get(`${API_URL}/collaborators`, config);
        
        if (response.data.success) {
          setCollaborators(response.data.data);
          setTotalCollaborators(response.data.total || 0);
        } else {
          setError(response.data.message || 'Failed to load collaborators');
          setCollaborators([]);
        }
      } catch (err: any) {
        console.error('Error fetching collaborators:', err);
        setError(err.response?.data?.message || 'Failed to load collaborators. Please check your connection.');
        setCollaborators([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCollaborators();
    } else {
      setError('You must be logged in to view collaborators');
      setLoading(false);
    }
  }, [currentPage, token]);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        await axios.delete(`${API_URL}/collaborators/${id}`, config);
        setCollaborators(collaborators.filter(collaborator => collaborator._id !== id));
        setConfirmDelete(null);
      } catch (err) {
        console.error('Error deleting collaborator:', err);
        setError('Failed to delete the collaborator');
      }
    } else {
      setConfirmDelete(id);
    }
  };

  // Toggle active status
  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      await axios.put(`${API_URL}/collaborators/${id}`, { 
        isActive: !currentStatus 
      }, config);
      
      setCollaborators(
        collaborators.map(collaborator => 
          collaborator._id === id 
            ? { ...collaborator, isActive: !currentStatus } 
            : collaborator
        )
      );
    } catch (err) {
      console.error('Error updating collaborator status:', err);
      setError('Failed to update collaborator status');
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Calculate pagination values
  const pageSize = 10;
  const totalPages = Math.ceil(totalCollaborators / pageSize);

  return (
    <Layout title="Manage Collaborators">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Collaborators</h1>
        <Link 
          to="/admin/collaborators/add" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus size={16} />
          Add New
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
      ) : collaborators.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No collaborators found</p>
          <Link 
            to="/admin/collaborators/add" 
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add Your First Collaborator
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Logo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {collaborators.map((collaborator) => (
                  <tr key={collaborator._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{collaborator.order}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex-shrink-0 h-10 w-10">
                        {collaborator.logo ? (
                          <img 
                            className="h-10 w-10 rounded object-cover" 
                            src={collaborator.logo} 
                            alt={`${collaborator.name} logo`}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">No Logo</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{collaborator.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {collaborator.website ? (
                        <a 
                          href={collaborator.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        >
                          <span className="truncate max-w-[150px]">{collaborator.website}</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => toggleActiveStatus(collaborator._id, collaborator.isActive)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            collaborator.isActive ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              collaborator.isActive ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className="ml-2 text-sm text-gray-700">
                          {collaborator.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(collaborator.createdAt)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/admin/collaborators/${collaborator._id}/edit`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={16} className="inline" />
                      </Link>
                      <button
                        onClick={() => handleDelete(collaborator._id)}
                        className={`${
                          confirmDelete === collaborator._id
                            ? 'text-red-600 font-bold'
                            : 'text-red-400 hover:text-red-600'
                        }`}
                      >
                        {confirmDelete === collaborator._id ? (
                          'Confirm?'
                        ) : (
                          <Trash2 size={16} className="inline" />
                        )}
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
      {!loading && collaborators.length > 0 && totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {collaborators.length} of {totalCollaborators} collaborators
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

export default CollaboratorList; 