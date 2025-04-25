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

  // Fetch jobs
  useEffect(() => {
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

    fetchJobs();
  }, []);

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

  return (
    <Layout title="Job Management">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Job Listings</h2>
        <Link 
          to="/admin/jobs/add" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Job
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
      ) : jobs.length === 0 ? (
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
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{job.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {job.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(job.expiresAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/admin/jobs/edit/${job._id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
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