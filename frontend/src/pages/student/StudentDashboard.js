import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome, {user?.studentProfile?.firstName || 'Student'}!</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>📚 Browse Institutions</h3>
          <p>Explore available institutions and courses</p>
        </div>
        
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>📝 My Applications</h3>
          <p>View and manage your course applications</p>
        </div>
        
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}>
          <h3>💼 Job Opportunities</h3>
          <p>Find employment opportunities</p>
        </div>
      </div>

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        border: '1px solid #dee2e6'
      }}>
        <h2>Quick Stats</h2>
        <p>Applications: 0</p>
        <p>Admissions: 0</p>
        <p>Email Verified: {user?.isEmailVerified ? '✅ Yes' : '❌ No'}</p>
      </div>
    </div>
  );
};

export default StudentDashboard;