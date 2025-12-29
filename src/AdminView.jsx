import React, { useState, useEffect } from 'react';
import './AdminView.css';

// --- MOCK DATA ---
const INITIAL_USER_DATA = {
  id: 1,
  name: "Sarah Ahmed",
  email: "sarah.ahmed@email.com",
  phone: "+966 50 123 4567",
  status: "active",
  children: [
    { id: 1, name: "Layan Ahmed", age: 9, latestScore: 12, zone: "normal", week2Status: "completed" },
    { id: 2, name: "Omar Ahmed", age: 11, latestScore: 18, zone: "borderline", week2Status: "pending" },
    { id: 3, name: "Noor Ahmed", age: 7, latestScore: 25, zone: "clinical", week2Status: "completed" }
  ]
};

const AdminView = () => {
  const [user, setUser] = useState(INITIAL_USER_DATA);

  // --- THEME MANAGEMENT ---
  useEffect(() => {
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // --- LOGIC HELPERS ---
  const calculateRiskStats = () => {
    const total = user.children.length;
    const normal = user.children.filter(c => c.zone === "normal").length;
    const borderline = user.children.filter(c => c.zone === "borderline").length;
    const clinical = user.children.filter(c => c.zone === "clinical").length;

    return {
      normal,
      borderline,
      clinical,
      normalPercent: total > 0 ? ((normal / total) * 100).toFixed(0) : 0,
      borderlinePercent: total > 0 ? ((borderline / total) * 100).toFixed(0) : 0,
      clinicalPercent: total > 0 ? ((clinical / total) * 100).toFixed(0) : 0
    };
  };

  const riskStats = calculateRiskStats();

  const handleToggleStatus = () => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    const action = newStatus === "suspended" ? "suspend" : "activate";
    
    if (window.confirm(`Are you sure you want to ${action} this account?`)) {
      // In a real app: await api.updateStatus(user.id, newStatus);
      setUser(prev => ({ ...prev, status: newStatus }));
      alert(`Account ${newStatus === "suspended" ? "suspended" : "activated"} successfully.`);
    }
  };

  const handleViewChild = (childId) => {
    console.log(`Navigating to child ${childId}`);
    // In a real app: navigate(`/admin/child/${childId}`);
    window.location.href = `child-details.html?id=${childId}`;
  };

  // Helper to generate initials for avatar
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <div className="admin-view-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <span>🤝</span>
          <span>Helping Hand</span>
        </a>
        <div className="navbar-nav">
          <a href="/admin/dashboard" className="nav-link">Dashboard</a>
          <a href="/admin/settings" className="nav-link">Settings</a>
          <button className="btn-logout">Logout</button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="main-container">
        {/* Back Button */}
        <a href="/admin/dashboard" className="back-button">
          ← Back to Admin Dashboard
        </a>

        {/* Page Header */}
        <header className="page-header">
          <h1>Admin View</h1>
          <p>Parent account details and children overview</p>
        </header>

        {/* User Summary Card */}
        <section className="card">
          <div className="user-summary">
            <div className="user-info">
              <div className="user-avatar">
                {getInitials(user.name)}
              </div>
              <div className="user-details">
                <h2>{user.name}</h2>
                <div className="user-badges">
                  <span className="badge badge-role">Parent</span>
                  <span className={`badge badge-${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>
                <div className="user-contact">
                  <span>📧 {user.email}</span>
                  <span>📞 {user.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="user-stats">
              <div className="stat-block">
                <span className="stat-value">{user.children.length}</span>
                <div className="stat-label">Children</div>
              </div>
              <div className="stat-block">
                <span className="stat-value">{user.children.length * 2 + 2}</span>
                <div className="stat-label">Assessments</div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Distribution Card */}
        <section className="card">
          <h3 className="card-title">📊 Risk Distribution (This Parent's Children)</h3>
          
          <div className="risk-blocks">
            <div className="risk-block normal">
              <div className="risk-block-label">Normal</div>
              <div className="risk-block-count">{riskStats.normal}</div>
              <div className="risk-block-percent">{riskStats.normalPercent}%</div>
            </div>
            <div className="risk-block borderline">
              <div className="risk-block-label">Borderline</div>
              <div className="risk-block-count">{riskStats.borderline}</div>
              <div className="risk-block-percent">{riskStats.borderlinePercent}%</div>
            </div>
            <div className="risk-block clinical">
              <div className="risk-block-label">Clinical</div>
              <div className="risk-block-count">{riskStats.clinical}</div>
              <div className="risk-block-percent">{riskStats.clinicalPercent}%</div>
            </div>
          </div>

          <div className="risk-bar-container">
            <div className="risk-bar-segment normal" style={{ width: `${riskStats.normalPercent}%` }}></div>
            <div className="risk-bar-segment borderline" style={{ width: `${riskStats.borderlinePercent}%` }}></div>
            <div className="risk-bar-segment clinical" style={{ width: `${riskStats.clinicalPercent}%` }}></div>
          </div>
        </section>

        {/* Children Table Card */}
        <section className="card">
          <h3 className="card-title">👧 Children</h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Child Name</th>
                  <th>Age</th>
                  <th>Latest Score</th>
                  <th>Zone</th>
                  <th>Week 2 Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user.children.map(child => (
                  <tr key={child.id}>
                    <td style={{ fontWeight: 600 }}>{child.name}</td>
                    <td>{child.age} years</td>
                    <td>{child.latestScore}/40</td>
                    <td>
                      <span className={`risk-chip ${child.zone}`}>{child.zone}</span>
                    </td>
                    <td>
                      <span className={`status-chip ${child.week2Status}`}>{child.week2Status}</span>
                    </td>
                    <td>
                      <button 
                        className="btn-view-child" 
                        onClick={() => handleViewChild(child.id)}
                      >
                        View Child
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Admin Actions Card */}
        <section className="card">
          <h3 className="card-title">⚙️ Admin Actions</h3>
          <div className="admin-actions">
            <button className="btn btn-danger-outline" onClick={handleToggleStatus}>
              {user.status === 'active' ? '🚫 Suspend Account' : '✅ Activate Account'}
            </button>
          </div>
        </section>
      </main>

      <footer>
        © 2025 Helping Hand. Admin Portal.
      </footer>
    </div>
  );
};

export default AdminView;