import React, { useState, useEffect } from 'react';
import './LandingPage.css';

// You will need to place your image in the public/images folder or import it
// import HeroImage from './assets/Q1.png'; // If using src/assets
const HERO_IMAGE_PATH = "/Q1.png";
; // If using public folder

const LandingPage = () => {
  const [theme, setTheme] = useState('light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('hh-theme') || 'light';
    setTheme(savedTheme);
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hh-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <div className="landing-container">
      {/* ==================== Navbar ==================== */}
      <nav className="navbar">
        <div className="container">
          <a className="logo" onClick={() => scrollToSection('home')}>
            🤝 Helping Hand
          </a>

          <div className="nav-links">
            <button className="nav-link" onClick={() => scrollToSection('home')}>Home</button>
            <button className="nav-link" onClick={() => scrollToSection('about')}>About</button>
            <button className="nav-link" onClick={() => scrollToSection('contact')}>Contact</button>
          </div>

          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                // Sun Icon
                <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                // Moon Icon
                <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a href="#" className="btn btn-primary">Download App</a>
            <a href="/login" className="btn btn-outline">Login</a>
          </div>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="container">
            <button className="mobile-nav-link" onClick={() => scrollToSection('home')}>Home</button>
            <button className="mobile-nav-link" onClick={() => scrollToSection('about')}>About</button>
            <button className="mobile-nav-link" onClick={() => scrollToSection('contact')}>Contact</button>

            <div className="mobile-theme-row">
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Theme:</span>
              <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            <a href="#" className="btn btn-primary">Download App</a>
            <a href="/login" className="btn btn-outline">Login</a>
          </div>
        </div>
      </nav>

      {/* ==================== Hero ==================== */}
      <section id="home" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <h1>Helping Hand – Emotional Support for Children</h1>
              <p>
                Parents can monitor their children's emotional status through the
                web dashboard, while kids use the interactive mobile app to track
                moods and access mental health activities.
              </p>
              <div className="hero-buttons">
                <a href="#" className="btn btn-primary btn-lg">Get the Mobile App</a>
                <button 
                  className="btn btn-outline btn-lg" 
                  onClick={() => scrollToSection('get-started')}
                >
                  Learn More
                </button>
              </div>
            </div>

            <div className="hero-image-card">
              <img
                src={HERO_IMAGE_PATH}
                alt="Happy children giving thumbs up"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Get Started ==================== */}
      <section id="get-started" className="get-started">
        <div className="container">
          <div className="get-started-card">
            <h2>Get Started with Helping Hand</h2>
            <p className="intro-text">
              Helping Hand is a brand-new platform designed to assist parents in
              monitoring and supporting their children's emotional well-being.
            </p>
            <p className="intro-text">Here's how you can get started:</p>

            <ul className="get-started-list">
              <li>
                <span className="check">✓</span>
                <div>
                  <strong>Sign Up:</strong>
                  <span> Create an account to start tracking your child's emotional health.</span>
                </div>
              </li>
              <li>
                <span className="check">✓</span>
                <div>
                  <strong>Set Up Child Profile:</strong>
                  <span> Add your child's profile to begin personalized assessments.</span>
                </div>
              </li>
              <li>
                <span className="check">✓</span>
                <div>
                  <strong>Engage with Interactive Games:</strong>
                  <span> Let your child engage with our emotional wellness games designed for children ages 7–14.</span>
                </div>
              </li>
              <li>
                <span className="check">✓</span>
                <div>
                  <strong>Track Emotional Growth:</strong>
                  <span> View weekly SDQ-based reports and insights directly in your parent dashboard.</span>
                </div>
              </li>
              <li>
                <span className="check">✓</span>
                <div>
                  <strong>Stay Informed:</strong>
                  <span> Get personalized recommendations based on your child's emotional development.</span>
                </div>
              </li>
            </ul>

            <p className="mission-text">
              Our mission is to provide a safe and engaging environment for your
              child's emotional growth. Start your journey with us today!
            </p>

            <div className="btn-wrapper">
              <a href="/login" className="btn btn-primary btn-lg">Get Started Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== About ==================== */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header">
            <h2>About the Platform</h2>
            <p>
              Helping Hand is designed specifically for children aged 7–14 years
              old, providing a safe and engaging environment for emotional wellness
              tracking and mental health support.
            </p>
            <p>
              The mobile app allows children to log their daily moods, complete
              activities, and interact with a virtual counselor. All activity
              results are sent to the parent dashboard on the web, giving parents
              valuable insights into their children's emotional wellbeing.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>Mobile App</h3>
              <p>Interactive activities and mood tracking designed for children.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3>Parent Dashboard</h3>
              <p>Monitor your child's emotional status and activity trends.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>Virtual Support</h3>
              <p>AI-powered counselor for children's emotional guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Contact ==================== */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p>Have questions about Helping Hand? We're here to help.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon blue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3>Email Us</h3>
              <a href="mailto:support@helpinghand.example">support@helpinghand.example</a>
            </div>

            <div className="contact-card">
              <div className="contact-icon purple">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3>Call Us</h3>
              <a href="tel:+972123456789">+972 123 456 7890</a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== Footer ==================== */}
      <footer className="footer">
        <div className="container">
          <p className="copyright">© 2025 Helping Hand. All rights reserved.</p>
          <p className="tagline">Supporting children's mental health and emotional wellbeing.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;