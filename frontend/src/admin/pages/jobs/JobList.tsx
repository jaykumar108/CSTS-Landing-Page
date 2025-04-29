import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs`);
      setJobs(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle toggle status
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      setStatusUpdating(id);
      const newStatus = !currentStatus;
      
      await axios.put(`${API_URL}/jobs/${id}`, { 
        isActive: newStatus 
      });
      
      // Update local state
      setJobs(jobs.map(job => 
        job._id === id ? { ...job, isActive: newStatus } : job
      ));
      
      setStatusUpdating(null);
    } catch (err) {
      console.error('Error updating job status:', err);
      setError('Failed to update job status');
      setStatusUpdating(null);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        await axios.delete(`${API_URL}/jobs/${id}`);
        setJobs(jobs.filter(job => job._id !== id));
        setConfirmDelete(null);
      } catch (err) {
        console.error('Error deleting job:', err);
        setError('Failed to delete the job');
      }
    } else {
      setConfirmDelete(id);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Check if job is expired
  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    searchQuery === '' || 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Layout title="Job Management">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-700">Job Listings</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearch}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          />
          <Link 
            to="/admin/jobs/add" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Add New Job
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="float-right text-red-700 font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No job listings found</p>
          <Link 
            to="/admin/jobs/add" 
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">S.No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32 sm:w-auto">Job Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32 sm:w-auto">Company</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32 sm:w-auto">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20 sm:w-auto">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24 sm:w-auto">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24 sm:w-auto">Expires</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-28">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job, index) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{filteredJobs.length - index}</div>
                    </td>
                    <td className="px-4 py-3 truncate max-w-[150px] sm:max-w-none">
                      <div className="text-sm font-medium text-gray-900 truncate" title={job.title}>{job.title}</div>
                    </td>
                    <td className="px-4 py-3 truncate max-w-[100px] sm:max-w-none">
                      <div className="text-sm text-gray-500 truncate" title={job.company}>{job.company}</div>
                    </td>
                    <td className="px-4 py-3 truncate max-w-[100px] sm:max-w-none">
                      <div className="text-sm text-gray-500 truncate" title={job.location}>{job.location}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* Status Toggle Switch */}
                        <button 
                          className={`relative inline-block w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2 ${
                            job.isActive ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                          onClick={() => handleToggleStatus(job._id, job.isActive)}
                          disabled={statusUpdating === job._id || isExpired(job.expiresAt)}
                          title={isExpired(job.expiresAt) ? "Can't toggle expired job" : ''}
                        >
                          <span 
                            className={`absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-200 transform ${
                              job.isActive ? 'translate-x-5' : 'translate-x-0'
                            } ${statusUpdating === job._id ? 'animate-pulse' : ''}`}
                          />
                        </button>
                        
                        {/* Status Text */}
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          !job.isActive 
                            ? 'bg-gray-100 text-gray-800' 
                            : isExpired(job.expiresAt)
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {!job.isActive 
                            ? 'Inactive' 
                            : isExpired(job.expiresAt)
                              ? 'Expired'
                              : 'Active'
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(job.expiresAt)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/admin/jobs/edit/${job._id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className={`${
                          confirmDelete === job._id
                            ? 'text-red-600 font-bold'
                            : 'text-red-400 hover:text-red-600'
                        }`}
                      >
                        {confirmDelete === job._id ? 'Confirm?' : 'Delete'}
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

export default JobList; 