import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './PsyPage.css'; // This connects the CSS file above

const PsyPage = () => {
  // --- STATE (Data) ---
  
  // 1. Mobile Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Doctor Data
  const [doctor] = useState({
    name: "Dr. Ahmed Al-Masri",
    email: "ahmad.masri@example.com",
    phone: "+966 50 123 4567",
    job: "Child Psychologist",
    workplace: "Al-Amal Mental Health Center"
  });

  // 3. Children Data (Cases)
  const [cases] = useState([
    { id: 1, name: "Lina Ahmad", age: 10, score: 14, status: "yellow", reviewed: false },
    { id: 2, name: "Layla Ahmad", age: 12, score: 14, status: "yellow", reviewed: false },
    { id: 3, name: "Ahmad Youssef", age: 9, score: 9, status: "green", reviewed: true },
    { id: 4, name: "Omer Ali", age: 7, score: 24, status: "red", reviewed: true }
  ]);

  // 4. Search Bar State
  const [searchTerm, setSearchTerm] = useState("");

  // --- LOGIC ---

  // Calculate Statistics dynamically
  const totalCases = cases.length;
  const completedReviews = cases.filter(c => c.reviewed).length;
  const activeCases = cases.filter(c => !c.reviewed).length;

  // Filter the table based on search
  const filteredCases = cases.filter(child => 
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to get the correct CSS class for the status
  const getStatusClass = (status) => {
    switch(status) {
        case 'green': return 'new';
        case 'yellow': return 'pending';
        case 'red': return 'red';
        default: return 'pending';
    }
  };

  return (
    <>
      {/* --- HEADER --- */}
      <header>
        <div className="container">
          <div className="logo">🤝 Helping Hand</div>
          <nav>
            <i 
              className="fas fa-bars toggle-menu" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            ></i>
            <ul className={isMenuOpen ? "open" : ""}>
<li>
  <li><NavLink to="/" className="active">Dashboard</NavLink></li>
</li>

<li>
  <NavLink to="/cases">
    <i className="fa-solid fa-users"></i> All Cases
  </NavLink>
</li>

<li>
  <NavLink to="/settings">
    <i className="fa-solid fa-chart-column"></i> Settings
  </NavLink>
</li>

<li>
  <a href="#">
    <i className="fa-solid fa-right-from-bracket"></i> Log Out
  </a>
</li>

            </ul>
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="container">
        <div className="landing">
          <div className="contact">
            
            {/* 1. Doctor Info Section */}
            <div className="text">
              <h2>Welcome back, <span>{doctor.name}</span></h2>
              <p>{doctor.job}</p>
              <div className="personal-info">
                <div className="info-item">
                  <i className="fa-solid fa-envelope"></i> {doctor.email}
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-phone"></i> {doctor.phone}
                </div>
                <div className="info-item">
                  <i className="fa-solid fa-building"></i> {doctor.workplace}
                </div>
              </div>
            </div>

            {/* 2. Stats Cards */}
            <div className="stats-container">
              <div className="stat-card">
                <h3>Total Cases</h3>
                <p className="number"><span>{totalCases}</span></p>
              </div>
              <div className="stat-card">
                <h3>Reviews Completed</h3>
                <p className="number"><span>{completedReviews}</span></p>
              </div>
              <div className="stat-card">
                <h3>Active Cases</h3>
                <p className="number"><span>{activeCases}</span></p>
              </div>
            </div>

            {/* 3. Incoming Cases Table */}
            <div className="table-wrapper">
              <div className="incoming-section">
                <div className="section">
                  <h2 className="section-title">Incoming Cases</h2>
                  <Link className="view" to="/cases"> View All <i className="fa-solid fa-arrow-right"></i></Link>
                </div>

                {/* Search Box */}
                <div className="search-box">
                  <input 
                    type="text" 
                    placeholder="Search for a specific case"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className="incoming-table">
                  {/* Table Header */}
                  <div className="table-header">
                    <span>Child Name</span>
                    <span>Age</span>
                    <span>Total Score(0-40)</span>
                    <span>Status</span>
                    <span>Action</span>
                  </div>

                  {/* Table Rows (Generated from Data) */}
                  {filteredCases.map((child) => (
                    <div className="table-row" key={child.id}>
                      <span>{child.name}</span>
                      <span>{child.age}</span>
                      <span>{child.score}/40</span>
                      <span className={`status ${getStatusClass(child.status)}`}>
                        {child.status}
                      </span>
                      <Link className="view-btn" to={`/sdq/${child.id}`}> Review</Link>

                    </div>
                  ))}

                  {filteredCases.length === 0 && (
                     <div style={{textAlign: 'center', padding: '20px', color: '#666'}}>
                        No cases found.
                     </div>
                  )}

                </div>
              </div>
            </div>

            <footer>
              <p>&copy; 2025 Helping Hand. All rights reserved.</p>
            </footer>

          </div>
        </div>
      </div>
    </>
  );
};

export default PsyPage;