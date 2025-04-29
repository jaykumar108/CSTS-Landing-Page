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
import CollaboratorList from './collaborators/CollaboratorList';
import CollaboratorForm from './collaborators/CollaboratorForm';
import EventList from './events/EventList';
import EventAdd from './events/EventAdd';
import EventEdit from './events/EventEdit';

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
        
        {/* Collaborator Routes */}
        <Route path="collaborators" element={<CollaboratorList />} />
        <Route path="collaborators/add" element={<CollaboratorForm />} />
        <Route path="collaborators/:id/edit" element={<CollaboratorForm />} />
        
        {/* Event Routes */}
        <Route path="events" element={<EventList />} />
        <Route path="events/add" element={<EventAdd />} />
        <Route path="events/edit/:id" element={<EventEdit />} />
        
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes; 