import React, { useState, useEffect } from 'react';
import './ChildDetails.css';

// --- MOCK DATA ---
const MOCK_CHILD_DATA = {
  id: 1,
  name: "Layan Ahmed",
  age: 9,
  gender: "Female",
  zone: "normal",
  // Total = Emotional(4) + Conduct(5) + Hyperactivity(6) + Peer(3) = 18
  totalScore: 18,
  status: "Week 2 assessment completed",
  weeks: [
    { week: "Week 1", score: 14, zone: "normal", date: "2025-01-01" },
    { week: "Week 2", score: 18, zone: "normal", date: "2025-01-08" }
  ],
  games: [
    {
      name: "Emotion Explorer",
      sdqDimension: "Emotional Symptoms",
      includesInTotal: true,
      week: "Week 2",
      score: 4,
      maxScore: 10,
      zone: "normal",
      recommendation: "Continue encouraging emotional expression through play. Practice naming different emotions together."
    },
    {
      name: "Hero Mission",
      sdqDimension: "Conduct Problems",
      includesInTotal: true,
      week: "Week 2",
      score: 5,
      maxScore: 10,
      zone: "borderline",
      recommendation: "Work on impulse control activities. Use positive reinforcement for good behavior choices."
    },
    {
      name: "Focus Race",
      sdqDimension: "Hyperactivity / Inattention",
      includesInTotal: true,
      week: "Week 2",
      score: 6,
      maxScore: 10,
      zone: "borderline",
      recommendation: "Practice sustained attention tasks with breaks. Consider movement-based learning activities."
    },
    {
      name: "Good Friend Quest",
      sdqDimension: "Peer Problems",
      includesInTotal: true,
      week: "Week 1",
      score: 3,
      maxScore: 10,
      zone: "normal",
      recommendation: "Great social skills development! Continue encouraging peer interactions and group play."
    },
    {
      name: "Positive Treasure Box",
      sdqDimension: "Prosocial Behavior",
      includesInTotal: false, // ⚠️ Not included in Total Score
      week: "Week 2",
      score: 8,
      maxScore: 10,
      zone: "normal",
      recommendation: "Excellent prosocial development! Child shows strong empathy and helping behaviors."
    }
  ]
};

// --- SUB-COMPONENT: SCORE GAUGE ---
const ScoreGauge = ({ score, zone }) => {
  const color = zone === 'normal' ? '#16a34a' : zone === 'borderline' ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 40; // ~251.2
  const dashArray = `${(score / 40) * circumference} ${circumference}`;

  return (
    <svg className="score-gauge" viewBox="0 0 100 100">
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
  );
};

// --- MAIN COMPONENT ---
const ChildDetails = () => {
  const [childData, setChildData] = useState(MOCK_CHILD_DATA);

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <div className="child-details-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">
            <span>🤝</span>
            <span>Helping Hand</span>
          </a>
          <div className="nav-links">
            <a href="/parent/dashboard">Dashboard</a>
            <a href="/parent/settings">Settings</a>
            <a href="/login" className="logout-btn">Logout</a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="container">
        {/* Back Button */}
        <a href="/parent/dashboard" className="back-btn">
          ← Back to Dashboard
        </a>

        {/* Child Header Card */}
        <section className="card">
          <div className="child-header">
            <div className="child-info-header">
              <div className="child-avatar">👧</div>
              <div>
                <h1 className="child-name">{childData.name}</h1>
                <div className="child-meta">
                  <span>{childData.age} years old</span>
                  <span>•</span>
                  <span>{childData.gender}</span>
                </div>
              </div>
            </div>
            <span className={`status-badge ${childData.zone}`}>{childData.zone}</span>
          </div>

          <div className="status-section">
            <p className="status-text">{childData.status}</p>
          </div>

          <div className="total-score-section">
            <div className="total-score-header">
              <span className="total-score-label">Total Difficulty Score (Emotional + Conduct + Hyperactivity + Peer)</span>
              <span className="total-score-value">{childData.totalScore}/40</span>
            </div>
            <div className="total-score-bar">
              <div 
                className="total-score-progress" 
                style={{ width: `${(childData.totalScore / 40) * 100}%` }}
              ></div>
            </div>
            <p className="score-note">Note: Prosocial Behavior is a positive strength and is NOT included in this score.</p>
          </div>
        </section>

        {/* Weekly Assessments */}
        <section className="card">
          <h2 className="section-title">Weekly Assessments</h2>
          <p className="section-subtitle">SDQ-based emotional assessments over time</p>

          <div className="assessments-grid">
            {childData.weeks.map((week, index) => (
              <div className="assessment-card" key={index}>
                <div className="assessment-header">
                  <span className="assessment-title">{week.week}</span>
                  <span className={`status-badge ${week.zone}`}>{week.zone}</span>
                </div>
                <div className="score-gauge-container">
                  <ScoreGauge score={week.score} zone={week.zone} />
                </div>
                <div className="assessment-details">
                  <div className="detail-row">
                    <span className="detail-label">Score</span>
                    <span className="detail-value">{week.score}/40</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{week.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Games Played */}
        <section className="card">
          <h2 className="section-title">Games Played</h2>
          <p className="section-subtitle">Activities mapped to SDQ psychological dimensions</p>

          <div className="games-grid">
            {childData.games.map((game, index) => (
              <div className="game-card" key={index}>
                <div className="game-header">
                  <div>
                    <div className="game-name">{game.name}</div>
                    <div className="game-week">{game.week}</div>
                  </div>
                  <span className={`game-result-badge ${game.zone}`}>{game.zone}</span>
                </div>
                
                <div className="game-score-section">
                  <div className="game-score-header">
                    <span className="game-score-label">Game Score</span>
                    <span className="game-score-value">{game.score}/{game.maxScore}</span>
                  </div>
                  <div className="game-score-bar">
                    <div 
                      className="game-score-progress" 
                      style={{ width: `${(game.score / game.maxScore) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="sdq-section">
                  <div className="sdq-title">SDQ Dimension</div>
                  <span className="sdq-tag">{game.sdqDimension}</span>
                  {!game.includesInTotal && (
                    <p className="prosocial-note">⭐ Positive Strength (Not included in Total Difficulty Score)</p>
                  )}
                </div>

                <div className="recommendation-box">
                  <div className="recommendation-title">Recommendation</div>
                  <div className="recommendation-text">{game.recommendation}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        © 2025 Helping Hand. All rights reserved.
      </footer>
    </div>
  );
};

export default ChildDetails;