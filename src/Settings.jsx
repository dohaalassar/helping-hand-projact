import React, { useState } from 'react';
import './Settings.css';

// Placeholder image (if you don't have one in public folder yet)
const DEFAULT_AVATAR = "https://via.placeholder.com/150"; 

const Settings = () => {
  // --- STATE ---
  
  // 1. Mobile Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Profile Data State
  const [profile, setProfile] = useState({
    name: "Dr. Ahmad Al-Masri",
    role: "Clinical Psychologist",
    bio: "Here you can view your main profile details. Contact support to make changes to this information.",
    image: DEFAULT_AVATAR 
  });

  // 3. Account Settings State
  const [account, setAccount] = useState({
    email: "ahmad.masri@example.com",
    phone: "+966 50 123 4567",
    workplace: "Al-Amal Mental Health Center"
  });

  // 4. Password Form State
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // --- HANDLERS ---

  // Handle Menu Toggle
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle Photo Upload (using FileReader)
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, image: event.target.result });
      };
      reader.readAsDataURL(file);
      
      // Backend Note: You would append 'file' to FormData here and fetch()
      console.log("File ready to upload:", file.name);
    }
  };

  // Handle Update Setting (using Prompt as requested)
  const handleUpdateSetting = (fieldKey, label) => {
    const currentValue = account[fieldKey];
    const newValue = window.prompt(`Enter new value for ${label}:`, currentValue);

    if (newValue && newValue !== currentValue) {
      setAccount({ ...account, [fieldKey]: newValue });
      
      // Backend Note: fetch() request to update DB goes here
      console.log(`Updated ${fieldKey} to: ${newValue}`);
    }
  };

  // Handle Password Input Change
  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
  };

  // Handle Password Submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }

    if (!passwords.current) {
        alert("Please enter your current password.");
        return;
    }

    // Backend Note: fetch() request to update password goes here
    console.log("Password update requested", passwords);
    
    alert("Password validated! (Check console for data)");
    // Clear form
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="container">
          <div className="logo">🤝 Helping Hand</div>
          <nav>
            <i 
                className="fas fa-bars toggle-menu" 
                onClick={toggleMenu}
            ></i>
            <ul className={isMenuOpen ? "open" : ""}>
              <li><a href="/dashboard"><i className="fa-solid fa-table-columns"></i> Dashboard</a></li>
              <li><a href="/cases"><i className="fa-solid fa-users"></i> All Cases</a></li>
              <li><a className="active" href="/settings"><i className="fa-solid fa-chart-column"></i> Settings</a></li>
              <li><a href="/logout"><i className="fa-solid fa-right-from-bracket"></i> Log Out</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <div className="container">
        <div className="landing">
          <div className="contact">
            
            {/* Page Header */}
            <div className="page-header animate-fade-in">
              <h1>Settings</h1>
              <p>Manage your account and preferences</p>
            </div>

            {/* Settings Content */}
            <div className="settings-content animate-slide-up">

              {/* 1. Profile Block */}
              <div className="settings-block">
                <div className="block-title">Profile Information</div>
                <div className="card profile-card">
                  <div className="profile-avatar">
                    <img src={profile.image} alt={profile.name} />
                    <input 
                        type="file" 
                        id="upload-photo" 
                        accept="image/*" 
                        style={{ marginTop: '10px', fontSize: '13px' }}
                        onChange={handlePhotoUpload}
                    />
                  </div>
                  <div className="profile-info">
                    <h3>{profile.name}</h3>
                    <span className="profile-role">{profile.role}</span>
                    <p className="profile-text">{profile.bio}</p>
                  </div>
                </div>
              </div>

              {/* 2. Account Settings Block */}
              <div className="settings-block">
                <div className="block-title">Account Settings</div>

                {/* Email Row */}
                <div className="card setting-row">
                  <div className="setting-main">
                    <p className="setting-label">Email Address</p>
                    <p className="setting-value">{account.email}</p>
                  </div>
                  <button 
                    className="setting-change"
                    onClick={() => handleUpdateSetting('email', 'Email Address')}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>Change</span>
                  </button>
                </div>

                {/* Phone Row */}
                <div className="card setting-row">
                  <div className="setting-main">
                    <p className="setting-label">Personal Phone Number</p>
                    <p className="setting-value">{account.phone}</p>
                  </div>
                  <button 
                    className="setting-change"
                    onClick={() => handleUpdateSetting('phone', 'Phone Number')}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>Change</span>
                  </button>
                </div>

                {/* Workplace Row */}
                <div className="card setting-row">
                  <div className="setting-main">
                    <p className="setting-label">Workplace</p>
                    <p className="setting-value">{account.workplace}</p>
                  </div>
                  <button 
                    className="setting-change"
                    onClick={() => handleUpdateSetting('workplace', 'Workplace')}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                    <span>Change</span>
                  </button>
                </div>
              </div>

              {/* 3. Security Block */}
              <div className="settings-block">
                <div className="block-title">Security</div>
                <div className="card">
                  <div className="sub-title">Change Password</div>

                  <form className="password-form" onSubmit={handlePasswordSubmit}>
                    <div className="form-row">
                      <label htmlFor="current">Current Password</label>
                      <input 
                        id="current" 
                        type="password" 
                        placeholder="Enter your current password"
                        value={passwords.current}
                        onChange={handlePasswordChange}
                      />
                    </div>

                    <div className="form-row form-row-inline">
                      <div className="form-field">
                        <label htmlFor="new">New Password</label>
                        <input 
                            id="new" 
                            type="password" 
                            placeholder="Enter your new password"
                            value={passwords.new}
                            onChange={handlePasswordChange}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="confirm">Confirm New Password</label>
                        <input 
                            id="confirm" 
                            type="password" 
                            placeholder="Confirm your new password"
                            value={passwords.confirm}
                            onChange={handlePasswordChange}
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary">Update Password</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>
            
            {/* Footer */}
            <footer>
              <p>&copy; 2025 Helping Hand. All rights reserved.</p>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;