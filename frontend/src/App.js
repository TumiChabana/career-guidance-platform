import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';

// Auth Pages
import Login from './pages/login';
import Register from './pages/Register';

// Dashboard Pages
import StudentDashboard from './pages/student/StudentDashboard';
import InstituteDashboard from './pages/institute/InstituteDashboard';
import CompanyDashboard from './pages/company/CompanyDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route 
            path="/student/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/institute/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['institute']}>
                <InstituteDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/company/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <CompanyDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/unauthorized" element={
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h1>⛔ Unauthorized</h1>
              <p>You don't have permission to access this page.</p>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
          