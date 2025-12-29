import React, { useState, useEffect } from 'react';
import './AuthPage.css';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [theme, setTheme] = useState('light');
  
  // Form States
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', role: '', password: '' });
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

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
      // Clear error on change
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateEmail(loginData.email)) newErrors.loginEmail = "Please enter a valid email address";
    if (!loginData.password) newErrors.loginPassword = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Login submitted:", loginData);
      // In React Router: navigate('/parent/dashboard');
      window.location.href = "parent-dashboard.html"; 
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signupData.name.trim()) newErrors.signupName = "Name is required";
    if (!validateEmail(signupData.email)) newErrors.signupEmail = "Please enter a valid email address";
    if (signupData.password.length < 8) newErrors.signupPassword = "Password must be at least 8 characters";
    if (!signupData.role) newErrors.signupRole = "Please select a role"; // Assuming you might want role validation too although not strictly in your original script

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Signup submitted:", signupData);
      window.location.href = "parent-dashboard.html";
    }
  };

  return (
    <div className="auth-container">
      <header className="page-header">
        <h1>🤝 Helping Hand</h1>
        <p>Supporting Children's Mental Health</p>
      </header>

      <main className="auth-card">
        <section className="auth-left">
          <nav className="tabs-nav">
            <button 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </nav>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="tab-content">
              <form onSubmit={handleLoginSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    placeholder="you@example.com"
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
                    placeholder="Your password"
                    value={loginData.password}
                    onChange={(e) => handleInputChange(e, 'login')}
                    className={errors.loginPassword ? 'error' : ''}
                  />
                  {errors.loginPassword && <p className="error-message">{errors.loginPassword}</p>}
                </div>

                <button type="submit" className="btn-primary">Login</button>
              </form>
            </div>
          )}

          {/* Sign Up Form */}
          {activeTab === 'signup' && (
            <div className="tab-content">
              <form onSubmit={handleSignupSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <input
                    type="text"
                    id="signup-name"
                    name="name"
                    placeholder="Your full name"
                    value={signupData.name}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className={errors.signupName ? 'error' : ''}
                  />
                  {errors.signupName && <p className="error-message">{errors.signupName}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="signup-email">Email</label>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    placeholder="you@example.com"
                    value={signupData.email}
                    onChange={(e) => handleInputChange(e, 'signup')}
                    className={errors.signupEmail ? 'error' : ''}
                  />
                  {errors.signupEmail && <p className="error-message">{errors.signupEmail}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="signup-role">Role</label>
                  <select 
                    id="signup-role" 
                    name="role" 
                    value={signupData.role}
                    onChange={(e) => handleInputChange(e, 'signup')}
                  >
                    <option value="">Select your role</option>
                    <option value="parent">Parent</option>
                    <option value="specialist">Specialist / Psychologist</option>
                  </select>
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

                <button type="submit" className="btn-primary">Sign Up</button>
              </form>
            </div>
          )}

          <div className="admin-entry">
            <a href="/admin/login">Are you an admin? Log in here →</a>
          </div>
        </section>

        <aside className="auth-right">
          <div className="welcome-content">
            <h2>Welcome to Helping Hand</h2>
            <p>Join thousands of families supporting their children's emotional well-being through our innovative platform.</p>
            <ul className="welcome-features">
              <li>Track your child's emotional progress</li>
              <li>Weekly SDQ assessments</li>
              <li>Professional guidance available</li>
              <li>Fun & engaging activities</li>
            </ul>
            <a href="/" className="welcome-btn">
              ← Back to Home
            </a>
          </div>
        </aside>
      </main>

      <a href="/" className="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </a>
    </div>
  );
};

export default AuthPage;