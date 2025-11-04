import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">
            <h2>🎓 Career Guidance Platform</h2>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn-register">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Your Gateway to Higher Education & Employment in Lesotho</h1>
          <p>
            Discover institutions, apply for courses, and connect with employers - all in one platform
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary-large">
              Apply to Institutions
            </Link>
            <Link to="/institutions" className="btn-secondary-large">
              Browse Institutions
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏫</div>
            <h3>For Students</h3>
            <p>Browse institutions and courses across Lesotho</p>
            <p>Apply to up to 2 courses per institution</p>
            <p>Track your application status in real-time</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>For Institutions</h3>
            <p>Manage courses and admissions online</p>
            <p>Review and process applications efficiently</p>
            <p>Publish admission results instantly</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>For Graduates</h3>
            <p>Access job opportunities from partner companies</p>
            <p>Upload transcripts and certificates</p>
            <p>Get matched with relevant job openings</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>For Companies</h3>
            <p>Post job opportunities with specific requirements</p>
            <p>View pre-filtered qualified candidates</p>
            <p>Connect with talented graduates</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>10+</h3>
            <p>Partner Institutions</p>
          </div>
          <div className="stat-item">
            <h3>100+</h3>
            <p>Available Courses</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Student Applications</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Job Opportunities</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of students discovering their future</p>
        <Link to="/register" className="btn-cta">
          Create Your Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Career Guidance Platform</h4>
            <p>Connecting students with opportunities across Lesotho</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/institutions">Institutions</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@careerguide.ls</p>
            <p>Phone: +266 xxxx xxxx</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Career Guidance Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;