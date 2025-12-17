import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Cases.css'; // Import the CSS file

// Dummy Data (In a real app, you would fetch this from an API)
const initialChildrenData = [
  { id: 1, name: "Lina Ahmad", age: 10, score: 14, status: "yellow", reviewed: false },
  { id: 2, name: "Layla Ahmad", age: 12, score: 14, status: "yellow", reviewed: false },
  { id: 3, name: "Ahmad Youssef", age: 9, score: 9, status: "green", reviewed: true },
  { id: 4, name: "Omer Ali", age: 7, score: 24, status: "red", reviewed: true }
];

const CasesPage = () => {
  // State for data, search, filter, and mobile menu
  const [cases] = useState(initialChildrenData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle Mobile Menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper to get CSS class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "yellow": return "pending";
      case "green": return "new";
      case "red": return "red";
      default: return "pending";
    }
  };

  // Filtering Logic
  const filteredCases = cases.filter((child) => {
    // 1. Search Filter
    const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Category Filter
    let matchesCategory = true;
    if (filterType === "reviewed") {
      matchesCategory = child.reviewed === true;
    } else if (filterType === "active") {
      matchesCategory = child.reviewed === false;
    }

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header */}
      {/* <header>
        <div className="container">
          <div className="logo">🤝 Helping Hand</div>
          <nav>
            <i 
              className="fas fa-bars toggle-menu" 
              onClick={toggleMenu}
            ></i>
            <ul className={isMobileMenuOpen ? "open" : ""}>
              <li><NavLink to="/">Dashboard</NavLink></li>
              <li><NavLink to="/cases" className="active">All Cases</NavLink></li>
              <li><NavLink to="/settings">Settings</NavLink></li>
              <li><a href="#"><i className="fa-solid fa-right-from-bracket"></i> Log Out</a></li>
            </ul>
          </nav>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="container">
        <div className="landing">
          <div className="contact">
            <div className="table-wrapper">
              <div className="incoming-section">
                
                {/* Section Header & Filter */}
                <div className="section">
                  <h2 className="section-title">Incoming Cases</h2>
                  <div className="filter-box">
                    <label htmlFor="caseFilter">Filter:</label>
                    <select 
                      id="caseFilter" 
                      className="filter-select"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Cases</option>
                      <option value="reviewed">Reviews Completed</option>
                      <option value="active">Active Cases</option>
                    </select>
                  </div>
                </div>

                {/* Search Box */}
                <div className="search-box">
                  <p>Review new assessment submitted by parent</p>
                  <input 
                    type="text" 
                    placeholder="Search for a specific case"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                {/* Table */}
                <div className="incoming-table">
                  <div className="table-header">
                    <span>Child Name</span>
                    <span>Age</span>
                    <span>Total Score(0-40)</span>
                    <span>Status</span>
                    <span>Parent's result</span>
                  </div>

                  {/* Render Filtered Rows */}
                  {filteredCases.length > 0 ? (
                    filteredCases.map((child) => (
                      <div className="table-row" key={child.id}>
                        <Link to={`/child/${child.id}`} className="child-link">{child.name}</Link>


                        <span>{child.age}</span>
                        <span>{child.score}/40</span>
                        <span className={`status ${getStatusClass(child.status)}`}>
                          {child.status}
                        </span>
                        <Link className="view-btn" to={`/sdq/${child.id}`}>Review</Link>
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                      No cases found matching your criteria.
                    </div>
                  )}
                </div>
                {/* End Table */}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer>
        <p>&copy; 2025 Helping Hand. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default CasesPage;