import React, { useState, useEffect } from 'react';
import './AdminPortal.css';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [theme, setTheme] = useState('light');
  
  // Form States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Validation Logic
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!validateEmail(loginData.email)) {
      newErrors.loginEmail = "Please enter a valid email address";
    }
    if (loginData.password.length < 8) {
      newErrors.loginPassword = "Password must be at least 8 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Admin login submitted:", loginData);
      // Simulate redirect
      window.location.href = "admin-dashboard.html"; 
      // In React Router: navigate('/admin/dashboard');
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signupData.name.trim()) {
      newErrors.signupName = "Name is required";
    }
    if (!validateEmail(signupData.email)) {
      newErrors.signupEmail = "Please enter a valid email address";
    }
    if (signupData.password.length < 8) {
      newErrors.signupPassword = "Password must be at least 8 characters";
    }
    if (signupData.password !== signupData.confirm) {
      newErrors.signupConfirm = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Admin signup submitted:", signupData);
      window.location.href = "admin-dashboard.html";
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
      // Clear specific error when typing
      if (errors[`login${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
        setErrors(prev => ({ ...prev, [`login${name.charAt(0).toUpperCase() + name.slice(1)}`]: '' }));
      }
    } else {
      setSignupData(prev => ({ ...prev, [name]: value }));
      if (errors[`signup${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
        setErrors(prev => ({ ...prev, [`signup${name.charAt(0).toUpperCase() + name.slice(1)}`]: '' }));
      }
    }
  };

  return (
    <div className="portal-container">
      <header className="page-header">
        <h1>🤝 Helping Hand</h1>
        <span className="admin-badge">Admin Portal</span>
        <p>Secure access for system administrators</p>
      </header>

      <main className="auth-card">
        <section className="auth-left">
          <nav className="tabs-nav">
            <button 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`} 
              onClick={() => setActiveTab('login')}
            >
              Admin Login
            </button>
            <button 
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`} 
              onClick={() => setActiveTab('signup')}
            >
              Admin Sign Up
            </button>
          </nav>

          {/* Admin Login Form */}
          {activeTab === 'login' && (
            <div className="tab-content">
              <form onSubmit={handleLoginSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="login-email">Email Address</label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="admin@example.com"
                    value={loginData.email}
                    onChange={(e) => handleInputChange(e, 'login')}
                    className={errors.loginEmail ? 'error' : ''}
                  />
                  {errors.loginEmail && <p className="error-message">{errors.loginEmail}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <input
                    type="password"
                    id="login-password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => handleInputChange(e, 'login')}
                    className={errors.loginPassword ? 'error' : ''}
                  />
                  {errors.loginPassword && <p className="error-message">{errors.loginPassword}</p>}
                </div>

                <button type="submit" className="btn-primary">Login as Admin</button>
              </form>

              <p className="secondary-link">
                Not an admin? <a href="/login">Go to main login</a>
              </p>
            </div>
          )}

          {/* Admin Sign Up Form */}
          {activeTab === 'signup' && (
            <div className="tab-content">
              <form onSubmit={handleSignupSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <input
                    type="text"
                    id="signup-name"
                    name="name"
                    placeholder="Dr. Admin Name"
                    value={signupData.name}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className={errors.signupName ? 'error' : ''}
                  />
                  {errors.signupName && <p className="error-message">{errors.signupName}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="signup-email">Email Address</label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    placeholder="admin@example.com"
                    value={signupData.email}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className={errors.signupEmail ? 'error' : ''}
                  />
                  {errors.signupEmail && <p className="error-message">{errors.signupEmail}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    placeholder="Create a password (min 8 chars)"
                    value={signupData.password}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className={errors.signupPassword ? 'error' : ''}
                  />
                  {errors.signupPassword && <p className="error-message">{errors.signupPassword}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="signup-confirm">Confirm Password</label>
                  <input
                    type="password"
                    id="signup-confirm"
                    name="confirm"
                    placeholder="Confirm your password"
                    value={signupData.confirm}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className={errors.signupConfirm ? 'error' : ''}
                  />
                  {errors.signupConfirm && <p className="error-message">{errors.signupConfirm}</p>}
                </div>

                <button type="submit" className="btn-primary">Create Admin Account</button>
              </form>

              <p className="secondary-link">
                Already have an account? <button onClick={() => setActiveTab('login')}>Login here</button>
              </p>
            </div>
          )}
        </section>

        <aside className="auth-right">
          <div className="welcome-content">
            <h2>Admin Control Center</h2>
            <p>Access the full administrative panel to manage cases, users, and system settings.</p>
            <ul className="welcome-features">
              <li>Monitor all parent and child cases</li>
              <li>View risk distribution analytics</li>
              <li>Manage user accounts</li>
              <li>System-wide settings control</li>
            </ul>
            <div className="restricted-notice">
              ⚠️ This area is restricted to authorized administrators only.
            </div>
          </div>
        </aside>
      </main>

      <a href="/login" className="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Main Login
      </a>
    </div>
  );
};

export default AdminPortal;