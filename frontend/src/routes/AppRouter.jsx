import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';

// Import the NEW Layout we created
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import GoogleCallback from '../pages/GoogleCallback';
import Dashboard from '../pages/Dashboard';
import JobsList from '../pages/JobsListNew';
import JobForm from '../pages/JobForm';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />

      {/* --- Private Dashboard Routes --- */}
      {/* This is the "Layout Route". 
          It renders the Sidebar + Navbar once, and changes the content inside.
      */}
      <Route element={
        <PrivateRoute>
          <DashboardLayout /> 
        </PrivateRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobsList />} />
        <Route path="/jobs/new" element={<JobForm />} />
        <Route path="/jobs/:id/edit" element={<JobForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* --- 404 Route --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;