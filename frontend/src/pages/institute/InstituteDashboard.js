import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const InstituteDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h1>Institute Dashboard</h1>
      <p>Welcome, {user?.instituteProfile?.institutionName}!</p>
      <button onClick={() => { logout(); navigate('/login'); }}>
        Logout
      </button>
    </div>
  );
};

export default InstituteDashboard;