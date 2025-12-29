import React, { useState, useEffect } from 'react';
import './AdminSettings.css';

const AdminSettings = () => {
  // --- THEME STATE ---
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Apply theme to DOM and save to local storage
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hh-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // --- PASSWORD FORM STATE ---
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Validation
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill in all password fields.");
      return;
    }

    if (passwords.new.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }

    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match.");
      return;
    }

    // Simulate API call success
    console.log("Password change submitted:", passwords);
    setMessage({ text: 'Password updated successfully!', type: 'success' });
    
    // Reset form
    setPasswords({ current: '', new: '', confirm: '' });

    // Hide message after 3 seconds
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  return (
    <div className="admin-settings-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/landing" className="navbar-logo">
            <span>🤝</span>
            <span>Helping Hand</span>
          </a>
          <nav className="navbar-nav">
            <a href="/admin/dashboard" className="nav-link">Dashboard</a>
            <a href="/admin/settings" className="nav-link active">Settings</a>
            <button className="nav-btn-logout">Logout</button>
          </nav>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-container">
        {/* Page Header */}
        <header className="page-header">
          <h1>Settings</h1>
          <p>Manage your admin account and system preferences</p>
        </header>

        {/* Profile Card */}
        <section className="settings-card">
          <h2 className="card-title"><span>👤</span> Profile Information</h2>
          <div className="profile-content">
            <div className="profile-avatar">LK</div>
            <div className="profile-info">
              <div className="profile-field">
                <div className="profile-label">Admin Name</div>
                <div className="profile-value">Dr. Lina Khalil</div>
              </div>
              <div className="profile-field">
                <div className="profile-label">Email</div>
                <div className="profile-value">lina.khalil@helpinghand.com</div>
              </div>
              <div className="profile-field">
                <div className="profile-label">Role</div>
                <div className="profile-value">System Administrator</div>
              </div>
            </div>
          </div>
        </section>

        {/* Password Card */}
        <section className="settings-card">
          <h2 className="card-title"><span>🔒</span> Change Password</h2>
          <form id="passwordForm" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
            
            {/* Current Password */}
            <div className="form-group">
              <label htmlFor="current">Current Password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword.current ? "text" : "password"} 
                  id="current"
                  name="current"
                  value={passwords.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password" 
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => toggleShow('current')}
                >
                  {showPassword.current ? '🚫' : '👁'}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="form-group">
              <label htmlFor="new">New Password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword.new ? "text" : "password"} 
                  id="new" 
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password" 
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => toggleShow('new')}
                >
                  {showPassword.new ? '🚫' : '👁'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirm">Confirm New Password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword.confirm ? "text" : "password"} 
                  id="confirm" 
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password" 
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => toggleShow('confirm')}
                >
                  {showPassword.confirm ? '🚫' : '👁'}
                </button>
              </div>
              <p className="form-hint">Minimum 8 characters, must include letters and numbers.</p>
            </div>

            <div className="btn-group">
              <button type="submit" className="btn-primary">Save Changes</button>
            </div>
            
            <div className={`success-message ${message.text ? 'show' : ''}`}>
              {message.text}
            </div>
          </form>
        </section>

        {/* Appearance Card */}
        <section className="settings-card">
          <h2 className="card-title"><span>🎨</span> Appearance</h2>
          <div className="theme-row">
            <div className="theme-info">
              <h4>Dark Mode</h4>
              <p>Switch between light and dark theme for the admin area</p>
            </div>
            <div className="theme-toggle">
              <span className="theme-icon">☀️</span>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={theme === 'dark'} 
                  onChange={toggleTheme} 
                />
                <span className="switch-slider"></span>
              </label>
              <span className="theme-icon">🌙</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        © 2025 Helping Hand. Admin Portal.
      </footer>
    </div>
  );
};

export default AdminSettings;