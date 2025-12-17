import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

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
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/cases"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsMenuOpen(false)}
              >
                All Cases
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setIsMenuOpen(false)}
              >
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
