import React, { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';
import useAuth from '../../hooks/useAuth';
import { ArrowLeft, Upload, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface FormData {
  name: string;
  logo: string;
  website: string;
  description: string;
  order: number;
  isActive: boolean;
}

const CollaboratorForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    logo: '',
    website: '',
    description: '',
    order: 0,
    isActive: true
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const { token } = useAuth();
  
  // Fetch collaborator data if in edit mode
  useEffect(() => {
    if (isEditMode && token) {
      const fetchCollaborator = async () => {
        try {
          setLoading(true);
          
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          
          const response = await axios.get(`${API_URL}/collaborators/${id}`, config);
          
          if (response.data.success) {
            const collaborator = response.data.data;
            setFormData({
              name: collaborator.name,
              logo: collaborator.logo || '',
              website: collaborator.website || '',
              description: collaborator.description || '',
              order: collaborator.order || 0,
              isActive: collaborator.isActive
            });
            
            if (collaborator.logo) {
              setFilePreview(collaborator.logo);
            }
          } else {
            setError('Failed to load collaborator data');
          }
        } catch (err) {
          console.error('Error fetching collaborator:', err);
          setError('Could not load collaborator data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchCollaborator();
    }
  }, [id, isEditMode, token]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked
        : name === 'order' 
          ? parseInt(value, 10) || 0
          : value
    }));
  };
  
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/i)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }
    
    setUploadedFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Remove uploaded file
  const removeFile = () => {
    setFilePreview(null);
    setUploadedFile(null);
    
    // If in edit mode and there was a logo, set to empty to remove on save
    if (isEditMode) {
      setFormData(prev => ({
        ...prev,
        logo: ''
      }));
    }
  };
  
  // Upload file to server
  const uploadFile = async () => {
    if (!uploadedFile) return null;
    
    try {
      const formDataForUpload = new FormData();
      formDataForUpload.append('file', uploadedFile);
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      };
      
      // Check server connection before upload
      try {
        await axios.get(`${API_URL}/auth/check`, { 
          timeout: 3000,
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (connErr) {
        console.warn('Connection check failed, but attempting upload anyway:', connErr);
      }
      
      const response = await axios.post(`${API_URL}/upload`, formDataForUpload, config);
      
      if (response.data.success) {
        return response.data.url;
      } else {
        throw new Error(response.data.message || 'Failed to upload file');
      }
    } catch (err: any) {
      console.error('Error uploading file:', err);
      // If it's a network error, provide more context
      if (err.message === 'Network Error') {
        throw new Error('Cannot connect to server. Please check if the backend server is running.');
      }
      throw new Error(err.response?.data?.message || 'Failed to upload file');
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      // Basic validation
      if (!formData.name.trim()) {
        setError('Collaborator name is required');
        setLoading(false);
        return;
      }
      
      let logoUrl = formData.logo;
      
      // Upload file if a new one was selected
      if (uploadedFile) {
        try {
          logoUrl = await uploadFile();
        } catch (err: any) {
          console.error('Error uploading file:', err);
          // Instead of blocking the form submission, just use empty logo and continue
          logoUrl = '';
          // Show warning but continue with form submission
          setError(`Logo upload failed: ${err.message}. Continuing without logo. You can add a logo later.`);
        }
      }
      
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const dataToSubmit = {
        ...formData,
        logo: logoUrl
      };
      
      let response;
      
      try {
        if (isEditMode) {
          response = await axios.put(`${API_URL}/collaborators/${id}`, dataToSubmit, config);
        } else {
          response = await axios.post(`${API_URL}/collaborators`, dataToSubmit, config);
        }
        
        if (response.data.success) {
          setSuccess(`Collaborator successfully ${isEditMode ? 'updated' : 'created'}!`);
          setTimeout(() => {
            navigate('/admin/collaborators');
          }, 1500);
        } else {
          setError(response.data.message || `Failed to ${isEditMode ? 'update' : 'create'} collaborator`);
        }
      } catch (apiErr: any) {
        // Handle API error specifically
        console.error(`API Error ${isEditMode ? 'updating' : 'creating'} collaborator:`, apiErr);
        
        if (apiErr.message === 'Network Error') {
          setError('Cannot connect to server. Please check your internet connection and make sure the backend server is running.');
        } else {
          setError(apiErr.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} collaborator: ${apiErr.message}`);
        }
      }
    } catch (err: any) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} collaborator:`, err);
      setError(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Layout title={isEditMode ? 'Edit Collaborator' : 'Add New Collaborator'}>
      <div className="mb-6 flex items-center">
        <button 
          onClick={() => navigate('/admin/collaborators')}
          className="mr-4 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditMode ? 'Edit Collaborator' : 'Add New Collaborator'}
        </h1>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading && !isEditMode ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Collaborator Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Lower numbers appear first. Items with the same order are sorted by name.
                </p>
              </div>
              
              <div className="flex items-center h-10 mt-7">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active (visible on website)
                </label>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logo Image
              </label>
              
              {filePreview ? (
                <div className="relative inline-block">
                  <img 
                    src={filePreview} 
                    alt="Logo preview" 
                    className="h-32 w-32 object-contain border border-gray-300 rounded-md p-2 bg-white"
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="logo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="logo-upload"
                          name="logo-upload"
                          type="file"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/admin/collaborators')}
                disabled={loading}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  `${isEditMode ? 'Update' : 'Create'} Collaborator`
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default CollaboratorForm; 