import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import PrivateRoute from '../components/PrivateRoute';

// Pages
import Login from './Login';
import Dashboard from './Dashboard';
import Profile from './Profile';
import GalleryList from './gallery/GalleryList';
import GalleryAdd from './gallery/GalleryAdd';
import GalleryEdit from './gallery/GalleryEdit';
import JobList from './jobs/JobList';
import JobAdd from './jobs/JobAdd';
import JobEdit from './jobs/JobEdit';
import ContactList from './contacts/ContactList';
import ContactView from './contacts/ContactView';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        
        {/* Gallery Routes */}
        <Route path="gallery" element={<GalleryList />} />
        <Route path="gallery/add" element={<GalleryAdd />} />
        <Route path="gallery/edit/:id" element={<GalleryEdit />} />
        
        {/* Job Routes */}
        <Route path="jobs" element={<JobList />} />
        <Route path="jobs/add" element={<JobAdd />} />
        <Route path="jobs/edit/:id" element={<JobEdit />} />
        
        {/* Contact Routes */}
        <Route path="contacts" element={<ContactList />} />
        <Route path="contacts/:id" element={<ContactView />} />
        
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 