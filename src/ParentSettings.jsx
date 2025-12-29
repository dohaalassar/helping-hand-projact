import React, { useState, useEffect } from 'react';
import './ParentSettings.css';

const ParentSettings = () => {
  // --- THEME STATE ---
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hh-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // --- PROFILE STATE ---
  const [parentName, setParentName] = useState("Sarah Ahmed");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");

  const handleEditName = () => {
    setTempName(parentName);
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setParentName(tempName);
      // In a real app: await api.updateProfile({ name: tempName });
      setIsEditingName(false);
    }
  };

  const handleCancelName = () => {
    setIsEditingName(false);
  };

  // --- PASSWORD FORM STATE ---
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const { old, new: newPwd, confirm } = passwords;

    if (!old || !newPwd || !confirm) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPwd.length < 8) {
      alert("New password must be at least 8 characters.");
      return;
    }
    if (newPwd !== confirm) {
      alert("Passwords do not match.");
      return;
    }

    // In a real app: await api.changePassword(passwords);
    console.log("Password change submitted");
    setSuccessMsg("Password updated successfully!");
    setPasswords({ old: '', new: '', confirm: '' });

    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="settings-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">
            <span>🤝</span>
            <span>Helping Hand</span>
          </a>
          <div className="nav-links">
            <a href="/parent/dashboard">Dashboard</a>
            <a href="/parent/settings" className="active">Settings</a>
            <a href="/login" className="btn btn-primary">Logout</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>Settings</h1>
          <p>Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <section className="section-card">
          <div className="section-header">
            <div className="section-icon">👤</div>
            <h2 className="section-title">Profile Information</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Parent's Name</label>
            {!isEditingName ? (
              <div className="profile-display">
                <span className="profile-name">{parentName}</span>
                <button className="btn btn-outline" onClick={handleEditName}>Edit</button>
              </div>
            ) : (
              <div className="edit-name-form">
                <input 
                  type="text" 
                  className="form-input" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  maxLength="50"
                />
                <button className="btn btn-primary" onClick={handleSaveName}>Save</button>
                <button className="btn btn-outline" onClick={handleCancelName}>Cancel</button>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <p className="profile-email">sarah.ahmed@email.com</p>
          </div>
        </section>

        {/* Password Section */}
        <section className="section-card">
          <div className="section-header">
            <div className="section-icon">🔒</div>
            <h2 className="section-title">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} style={{ maxWidth: '420px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="old">Current Password</label>
              <div className="input-wrapper">
                <input 
                  type={showPassword.old ? "text" : "password"} 
                  className="form-input" 
                  id="old"
                  name="old"
                  value={passwords.old}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password" 
                />
                <button 
                  type="button" 
                  className="input-toggle" 
                  onClick={() => toggleShow('old')}
                >
                  {showPassword.old ? '🚫' : '👁'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="new">New Password</label>
              <div className="input-wrapper">
                <input 
                  type={showPassword.new ? "text" : "password"} 
                  className="form-input" 
                  id="new"
                  name="new"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password" 
                />
                <button 
                  type="button" 
                  className="input-toggle" 
                  onClick={() => toggleShow('new')}
                >
                  {showPassword.new ? '🚫' : '👁'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirm">Confirm New Password</label>
              <div className="input-wrapper">
                <input 
                  type={showPassword.confirm ? "text" : "password"} 
                  className="form-input" 
                  id="confirm"
                  name="confirm"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password" 
                />
                <button 
                  type="button" 
                  className="input-toggle" 
                  onClick={() => toggleShow('confirm')}
                >
                  {showPassword.confirm ? '🚫' : '👁'}
                </button>
              </div>
              <p className="form-hint">Minimum 8 characters, must include letters and numbers.</p>
            </div>

            <button type="submit" className="btn btn-primary">Save Changes</button>
            {successMsg && <div className="success-message">{successMsg}</div>}
          </form>
        </section>

        {/* Appearance Section */}
        <section className="section-card">
          <div className="section-header">
            <div className="section-icon">🎨</div>
            <h2 className="section-title">Appearance</h2>
          </div>

          <div className="theme-row">
            <div className="theme-info">
              <h4>Dark Mode</h4>
              <p>Switch between light and dark theme</p>
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
        © 2025 Helping Hand. All rights reserved.
      </footer>
    </div>
  );
};

export default ParentSettings;