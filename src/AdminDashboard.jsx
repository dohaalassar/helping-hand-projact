import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

// --- MOCK DATA ---
const MOCK_STATS = {
  total: 120,
  assessed: 90,
  pending: 30,
  distribution: { normal: 60, borderline: 35, clinical: 25 },
  trend: [
    { week: "W1", normal: 12, borderline: 6, clinical: 3 },
    { week: "W2", normal: 15, borderline: 8, clinical: 4 },
    { week: "W3", normal: 18, borderline: 10, clinical: 6 },
    { week: "W4", normal: 15, borderline: 11, clinical: 7 }
  ]
};

const MOCK_USERS = [
  { id: 1, name: "Sarah Ahmed", email: "sarah@example.com", children: 3, riskLevel: "normal", status: "active" },
  { id: 2, name: "Mohammed Ali", email: "mohammed@example.com", children: 2, riskLevel: "borderline", status: "active" },
  { id: 3, name: "Fatima Hassan", email: "fatima@example.com", children: 1, riskLevel: "clinical", status: "active" },
  { id: 4, name: "Omar Khalil", email: "omar@example.com", children: 2, riskLevel: "normal", status: "suspended" },
  { id: 5, name: "Aisha Ibrahim", email: "aisha@example.com", children: 1, riskLevel: "borderline", status: "active" }
];

// --- SUB-COMPONENTS ---

const DonutChart = ({ distribution }) => {
  const { normal, borderline, clinical } = distribution;
  const total = normal + borderline + clinical;

  const normalPercent = (normal / total) * 100;
  const borderlinePercent = (borderline / total) * 100;
  const clinicalPercent = (clinical / total) * 100;

  const circumference = 2 * Math.PI * 70; // radius = 70
  const normalDash = (normalPercent / 100) * circumference;
  const borderlineDash = (borderlinePercent / 100) * circumference;
  const clinicalDash = (clinicalPercent / 100) * circumference;

  const normalOffset = 0;
  const borderlineOffset = normalDash;
  const clinicalOffset = normalDash + borderlineDash;

  return (
    <div className="donut-container">
      <div className="donut-chart">
        <svg viewBox="0 0 180 180">
          <circle cx="90" cy="90" r="70" fill="none" stroke="#e5e7eb" strokeWidth="20" />
          <circle 
            cx="90" cy="90" r="70" fill="none" stroke="#16a34a" strokeWidth="20"
            strokeDasharray={`${normalDash} ${circumference}`} 
            strokeDashoffset="0" 
          />
          <circle 
            cx="90" cy="90" r="70" fill="none" stroke="#ca8a04" strokeWidth="20"
            strokeDasharray={`${borderlineDash} ${circumference}`} 
            strokeDashoffset={`-${borderlineOffset}`} 
          />
          <circle 
            cx="90" cy="90" r="70" fill="none" stroke="#dc2626" strokeWidth="20"
            strokeDasharray={`${clinicalDash} ${circumference}`} 
            strokeDashoffset={`-${clinicalOffset}`} 
          />
        </svg>
        <div className="donut-center">
          <div className="total">{total}</div>
          <div className="label">Total</div>
        </div>
      </div>
      
      <div className="donut-legend">
        <div className="legend-item">
          <div className="legend-color normal"></div>
          <span className="legend-text">Normal: <span className="legend-value">{normal} ({normalPercent.toFixed(0)}%)</span></span>
        </div>
        <div className="legend-item">
          <div className="legend-color borderline"></div>
          <span className="legend-text">Borderline: <span className="legend-value">{borderline} ({borderlinePercent.toFixed(0)}%)</span></span>
        </div>
        <div className="legend-item">
          <div className="legend-color clinical"></div>
          <span className="legend-text">Clinical: <span className="legend-value">{clinical} ({clinicalPercent.toFixed(0)}%)</span></span>
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ trend }) => {
  const width = 400;
  const height = 180;
  const padding = 20;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate scaling
  const allValues = trend.flatMap(t => [t.normal, t.borderline, t.clinical]);
  const maxValue = Math.max(...allValues) + 5;
  const xStep = chartWidth / (trend.length - 1);

  const getY = (value) => height - padding - (value / maxValue) * chartHeight;

  // Helper to build polyline string
  const createPoints = (key) => 
    trend.map((t, i) => `${padding + i * xStep},${getY(t[key])}`).join(' ');

  return (
    <>
      <div className="line-chart-container">
        <svg viewBox={`0 0 ${width} ${height}`}>
          {/* Grid lines */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />

          {/* Lines */}
          <polyline points={createPoints('normal')} fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={createPoints('borderline')} fill="none" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={createPoints('clinical')} fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Dots */}
          {trend.map((t, i) => (
            <React.Fragment key={i}>
              <circle cx={padding + i * xStep} cy={getY(t.normal)} r="5" fill="#16a34a" />
              <circle cx={padding + i * xStep} cy={getY(t.borderline)} r="5" fill="#ca8a04" />
              <circle cx={padding + i * xStep} cy={getY(t.clinical)} r="5" fill="#dc2626" />
            </React.Fragment>
          ))}
        </svg>
      </div>
      
      <div className="chart-labels">
        {trend.map((t, i) => <span key={i}>{t.week}</span>)}
      </div>

      <div className="line-legend">
        <div className="line-legend-item"><div className="line-legend-dot normal"></div> Normal</div>
        <div className="line-legend-item"><div className="line-legend-dot borderline"></div> Borderline</div>
        <div className="line-legend-item"><div className="line-legend-dot clinical"></div> Clinical</div>
      </div>
    </>
  );
};

// --- MAIN COMPONENT ---

const AdminDashboard = () => {
  const [theme, setTheme] = useState('light');
  const [stats, setStats] = useState(MOCK_STATS);
  const [users, setUsers] = useState(MOCK_USERS);

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hh-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleViewUser = (id) => {
    console.log(`Navigating to user ${id}`);
    // In a real app: navigate(`/admin/user/${id}`);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="/" className="navbar-logo">
            <span>🤝</span>
            <span>Helping Hand</span>
          </a>
          <div className="navbar-nav">
            <span className="nav-link active">Dashboard</span>
            <span className="nav-link">Settings</span>
            <button className="nav-link" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="nav-btn-logout">Logout</button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-container">
        {/* Page Header */}
        <section className="page-header-card">
          <div className="page-header-left">
            <h1>Admin Dashboard</h1>
            <p>Overview of all cases and system activity</p>
          </div>
          <div className="page-header-right">
            <div className="admin-name">Hello, Dr. Lina Khalil</div>
            <div className="admin-role">System Administrator</div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="summary-cards">
          <div className="summary-card">
            <div className="summary-icon blue">📋</div>
            <div className="summary-content">
              <h3>{stats.total}</h3>
              <p>Total Cases</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon green">✅</div>
            <div className="summary-content">
              <h3>{stats.assessed}</h3>
              <p>Assessed</p>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-icon orange">⏳</div>
            <div className="summary-content">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
        </section>

        {/* Charts Grid */}
        <section className="charts-grid">
          {/* Donut Chart */}
          <div className="chart-card">
            <h2 className="card-title"><span>📊</span> Risk Distribution</h2>
            <DonutChart distribution={stats.distribution} />
          </div>

          {/* Line Chart */}
          <div className="chart-card">
            <h2 className="card-title"><span>📈</span> Weekly Trend</h2>
            <LineChart trend={stats.trend} />
          </div>
        </section>

        {/* Recent Users Table */}
        <section className="table-card">
          <div className="table-header">
            <h2 className="card-title"><span>👥</span> Recent Parents</h2>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Parent Name</th>
                  <th>Email</th>
                  <th>Children</th>
                  <th>Risk Level</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="user-name">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.children}</td>
                    <td><span className={`pill ${user.riskLevel}`}>{user.riskLevel}</span></td>
                    <td><span className={`pill ${user.status}`}>{user.status}</span></td>
                    <td>
                      <button className="btn-view" onClick={() => handleViewUser(user.id)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer>
        © 2025 Helping Hand. Admin Portal.
      </footer>
    </div>
  );
};

export default AdminDashboard;