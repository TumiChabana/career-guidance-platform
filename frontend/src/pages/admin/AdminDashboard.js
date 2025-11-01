import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <button onClick={() => { logout(); navigate('/login'); }}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;