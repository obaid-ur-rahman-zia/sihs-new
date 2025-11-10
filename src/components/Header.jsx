import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SETTINGS_API, API_BASE_URL } from "../api"; // Import API_BASE_URL
import "./Header.css";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  
  // Extract the root domain for file URLs: API_BASE_URL
  const baseDomainUrl = API_BASE_URL.replace("/api", ""); 

  useEffect(() => {
    fetch(SETTINGS_API.SITE) // Use the centralized API constant
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="header-container">
          <div className="contact-info">
            <span>
              <i className="fas fa-phone"></i> {settings?.phone || "Loading..."}
            </span>
            <span>
              <i className="fas fa-envelope"></i> {settings?.email || "Loading..."}
            </span>
          </div>
          <div className="social-icons">
            {settings?.socialLinks?.facebook && (
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {settings?.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {settings?.socialLinks?.linkedin && settings.socialLinks.linkedin !== "#" && (
              <a
                href={settings.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            )}
          </div>
        </div>
      </div>
      <nav
        className="main-navbar"
        style={{ position: "sticky", top: "0", zIndex: "100000" }}
      >
        <div className="header-container nav-container">
          <NavLink to="/" className="navbar-brand">
            <img
              src="/images/logo.png"
              alt="Logo"
            />
          </NavLink>
          {/* ... rest of the component is fine ... */}
          <button
            className="navbar-toggler"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i
              className="fas fa-bars"
              style={{
                scale: "2.5",
                padding: "5px",
              }}
            ></i>
          </button>

          <div
            className={`navbar-links ${menuOpen ? "open" : ""}`}
            id="navbarNav"
          >
            <ul>
              <li>
                <NavLink
                  to="/Home"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  HOME
                </NavLink>
              </li>

              <li className="dropdown">
                <NavLink
                  to="/vision-mission"
                  className={
                    path.startsWith("/vision-mission") ||
                    path.startsWith("/principal-message")
                      ? "active"
                      : ""
                  }
                >
                  ABOUT US <i className="fas fa-chevron-down"></i>
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/vision-mission">Vision &amp; Mission</NavLink>
                  </li>
                  <li>
                    <NavLink to="/principal-message">
                      Principal's Message
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <NavLink
                  to="/admission-criteria"
                  className={path.startsWith("/admission") ? "active" : ""}
                >
                  ADMISSIONS <i className="fas fa-chevron-down"></i>
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/admission-criteria">
                      Admission Criteria
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/fee-structure">FEE STRUCTURE</NavLink>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <NavLink
                  to="/departments"
                  className={
                    path.startsWith("/faculty-of-basic-sciences") ||
                    path.startsWith("/faculty-of-clinical-sciences")
                      ? "active"
                      : ""
                  }
                >
                  DEPARTMENTS
                </NavLink>
              </li>

              <li>
                <NavLink to="/research">RESEARCH</NavLink>
              </li>
              <li>
                <NavLink to="/news-events">NEWS &amp; EVENTS</NavLink>
              </li>
              <li>
                <NavLink to="/notifications">NOTIFICATIONS</NavLink>
              </li>
              <li>
                <NavLink to="/downloads">DOWNLOADS</NavLink>
              </li>
              <li>
                <NavLink to="/contact-us">CONTACT US</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;