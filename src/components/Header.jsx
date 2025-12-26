import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <div className="container">
        
        {/* Logo */}
        <div className="logo">🤝 Helping Hand</div>

        {/* Navigation */}
        <nav>
          {/* Mobile Toggle */}
          <i
            className="fas fa-bars toggle-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></i>

          {/* Links */}
          <ul className={isMenuOpen ? 'open' : ''}>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-chart-line"></i>
                
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cases"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-folder-open"></i>

                All Cases
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fa-solid fa-gear"></i>

                Settings
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
  );
};

export default Header;
