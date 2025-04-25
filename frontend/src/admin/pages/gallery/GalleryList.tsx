import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/Layout';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isPublished: boolean;
  createdAt: string;
}

const GalleryList: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  // Fetch gallery items
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/gallery`);
        setGalleryItems(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery items:', err);
        setError('Failed to load gallery items');
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirmDelete === id) {
      try {
        await axios.delete(`${API_URL}/gallery/${id}`);
        setGalleryItems(galleryItems.filter(item => item._id !== id));
        setConfirmDelete(null);
      } catch (err) {
        console.error('Error deleting gallery item:', err);
        setError('Failed to delete the gallery item');
      }
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <Layout title="Gallery Management">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">Gallery Images</h2>
        <Link 
          to="/admin/gallery/add" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Image
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
      ) : galleryItems.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">No gallery images found</p>
          <Link 
            to="/admin/gallery/add" 
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Your First Image
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {galleryItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-16 rounded overflow-hidden bg-gray-100">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/admin/gallery/edit/${item._id}`} 
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className={`${
                          confirmDelete === item._id
                            ? 'text-red-600 font-bold'
                            : 'text-red-400 hover:text-red-600'
                        }`}
                      >
                        {confirmDelete === item._id ? 'Confirm?' : 'Delete'}
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

export default GalleryList; 