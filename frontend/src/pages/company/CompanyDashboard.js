import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CompanyDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px' }}>
      <h1>Company Dashboard</h1>
      <p>Welcome, {user?.companyProfile?.companyName}!</p>
      <button onClick={() => { logout(); navigate('/login'); }}>
        Logout
      </button>
    </div>
  );
};

export default CompanyDashboard;