import React, { useState, useEffect } from 'react';
import './ParentDashboard.css';

// --- MOCK DATA ---
const MOCK_CHILDREN = [
  {
    id: 1,
    name: "Layan Ahmed",
    age: 9,
    gender: "Female",
    latestScore: 12,
    zone: "normal",
    weeks: [
      { week: "Week 1", score: 10, zone: "normal" },
      { week: "Week 2", score: 12, zone: "normal" },
    ],
    status: "Week 2 completed"
  },
  {
    id: 2,
    name: "Omar Ahmed",
    age: 11,
    gender: "Male",
    latestScore: 18,
    zone: "borderline",
    weeks: [
      { week: "Week 1", score: 15, zone: "borderline" },
      { week: "Week 2", score: 18, zone: "borderline" },
    ],
    status: "Week 2 pending"
  },
  {
    id: 3,
    name: "Noor Ahmed",
    age: 7,
    gender: "Female",
    latestScore: 25,
    zone: "clinical",
    weeks: [
      { week: "Week 1", score: 22, zone: "clinical" },
      { week: "Week 2", score: 25, zone: "clinical" },
    ],
    status: "Week 2 completed"
  }
];

// --- SUB-COMPONENT: GAUGE SVG ---
const Gauge = ({ score, zone }) => {
  const color = zone === 'normal' ? '#16a34a' : zone === 'borderline' ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 40; // ~251.2
  const dashArray = `${(score / 40) * circumference} ${circumference}`;

  return (
    <div className="gauge-wrapper">
      <svg className="gauge" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle 
          cx="50" cy="50" r="40" 
          fill="none" 
          stroke={color} 
          strokeWidth="10" 
          strokeDasharray={dashArray} 
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="700" fill="currentColor">
          {score}
        </text>
      </svg>
      <span className="gauge-label">SDQ Score (0–40)</span>
    </div>
  );
};

// --- SUB-COMPONENT: CHILD CARD ---
const ChildCard = ({ child, onViewDetails }) => {
  return (
    <article className="child-card">
      <div className="child-header">
        <div>
          <div className="child-name">{child.name}</div>
          <div className="child-meta">{child.age} years • {child.gender}</div>
        </div>
        <span className={`badge ${child.zone}`}>{child.zone}</span>
      </div>
      
      <Gauge score={child.latestScore} zone={child.zone} />
      
      <div className="weeks-block">
        {child.weeks.map((w, index) => (
          <div className="week-row" key={index}>
            <span className="week-label">{w.week}</span>
            <span className="week-score">
              <span>{w.score}/40</span>
              <span className={`week-zone ${w.zone}`}>{w.zone}</span>
            </span>
          </div>
        ))}
      </div>
      
      <div className="status-pill">{child.status}</div>
      
      <div className="child-actions">
        <button 
          className="view-details-btn" 
          onClick={() => onViewDetails(child.id)}
        >
          View Details
        </button>
      </div>
    </article>
  );
};

// --- MAIN COMPONENT ---
const ParentDashboard = () => {
  const [children, setChildren] = useState(MOCK_CHILDREN);

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleViewDetails = (id) => {
    console.log(`Navigating to details for child ${id}`);
    // In React Router: navigate(`/parent/child/${id}`);
    window.location.href = `child-details.html?id=${id}`;
  };

  // Calculate stats
  const normalCount = children.filter(c => c.zone === "normal").length;
  const borderlineCount = children.filter(c => c.zone === "borderline").length;
  const clinicalCount = children.filter(c => c.zone === "clinical").length;

  return (
    <div className="parent-dashboard-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <a href="/" className="brand">
            <span className="brand-emoji">🤝</span>
            <span>Helping Hand</span>
          </a>
          <div className="nav-links">
            <a href="/parent/dashboard" className="nav-link active">Dashboard</a>
            <a href="/parent/settings" className="nav-link">Settings</a>
            <a href="/login" className="logout-btn">Logout</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-container">
        <h1 className="page-title">Parent Dashboard</h1>

        {/* Welcome Card */}
        <section className="welcome-card">
          <div className="welcome-heading">
            <div className="welcome-name">Hello, Sarah Ahmed! 👋</div>
            <p className="welcome-sub">Parent Account</p>
          </div>
          <div className="welcome-text">
            <p>Monitor your children's emotional well-being through weekly SDQ-based assessments.</p>
          </div>
        </section>

        {/* Stats Grid  */}
        <section className="stats-grid">
          <div className="stat-card">
            <div>
              <div className="stat-info-title">Normal Zone</div>
              <div className="stat-value">{normalCount}</div>
            </div>
            <div className="stat-icon normal">✓</div>
          </div>
          <div className="stat-card">
            <div>
              <div className="stat-info-title">Borderline Zone</div>
              <div className="stat-value">{borderlineCount}</div>
            </div>
            <div className="stat-icon monitor">⚠</div>
          </div>
          <div className="stat-card">
            <div>
              <div className="stat-info-title">Clinical Zone</div>
              <div className="stat-value">{clinicalCount}</div>
            </div>
            <div className="stat-icon critical">!</div>
          </div>
        </section>

        {/* Children Section */}
        <h2 className="section-header">Your Children</h2>
        <section className="children-grid">
          {children.map(child => (
            <ChildCard 
              key={child.id} 
              child={child} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </section>
      </main>

      <footer>
        © 2025 Helping Hand. All rights reserved.
      </footer>
    </div>
  );
};

export default ParentDashboard;