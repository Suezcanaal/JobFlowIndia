import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import PageWrapper from '../components/layout/PageWrapper';

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
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />

      {/* Private routes */}
      <Route path="/dashboard" element={
        <PrivateRoute>
          <PageWrapper>
            <Dashboard />
          </PageWrapper>
        </PrivateRoute>
      } />
      
      <Route path="/jobs" element={
        <PrivateRoute>
          <PageWrapper>
            <JobsList />
          </PageWrapper>
        </PrivateRoute>
      } />
      
      <Route path="/jobs/new" element={
        <PrivateRoute>
          <PageWrapper>
            <JobForm />
          </PageWrapper>
        </PrivateRoute>
      } />
      
      <Route path="/jobs/:id/edit" element={
        <PrivateRoute>
          <PageWrapper>
            <JobForm />
          </PageWrapper>
        </PrivateRoute>
      } />
      
      <Route path="/profile" element={
        <PrivateRoute>
          <PageWrapper>
            <Profile />
          </PageWrapper>
        </PrivateRoute>
      } />
      
      <Route path="/settings" element={
        <PrivateRoute>
          <PageWrapper>
            <Settings />
          </PageWrapper>
        </PrivateRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;