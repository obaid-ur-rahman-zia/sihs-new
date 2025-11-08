import React, { useState, useEffect } from "react";
// Import API constants
import { SETTINGS_API, API_BASE_URL, REQUEST_CONFIG } from "../api";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  const [settings, setSettings] = useState(null);
  
  // Extract the root domain for API contact
  const baseDomainUrl = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    fetch(SETTINGS_API.SITE) // Use the centralized API constant
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <>
      <footer role="contentinfo">
        <div className="footer-content">
          <div className="footer-row">
            <div className="footer-col">
              <div className="footer-logo">
                <i className="fas fa-eye"></i> Our Vision & Mission
              </div>
              <p className="footer-desc">
                To be among the best academic health centers in research,
                medical education, and excellence in patient care by using
                technological advancement, innovative methodology, immense
                clinical experience, continuous quality improvement, gracious
                professionalism and long-life learning till perfection.
              </p>
            </div>

            <div className="footer-col">
              <div className="footer-title">Quick Links</div>
              <ul className="footer-links">
                {/* ... existing links ... */}
                <li>
                  <a href="/">
                    <i className="fas fa-chevron-right"></i> Home
                  </a>
                </li>
                <li>
                  <a href="/about">
                    <i className="fas fa-chevron-right"></i> About Us
                  </a>
                </li>
                <li>
                  <a href="/admissions">
                    <i className="fas fa-chevron-right"></i> Admissions
                  </a>
                </li>
                <li>
                  <a href="/campus">
                    <i className="fas fa-chevron-right"></i> Campus Life
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <div className="footer-title">Contact Information</div>
              <div className="footer-contact">
                <p>
                  <i className="fas fa-phone-alt"></i> <strong>Phone:</strong>{" "}
                  {settings?.phone || "Loading..."}
                </p>
                <p>
                  <i className="fas fa-circle"></i>{" "}
                  <strong>Whatsapp:</strong>{" "}
                  {settings?.whatsapp || "Loading..."}
                </p>
                <p>
                  <i className="fas fa-envelope"></i> <strong>Email:</strong>{" "}
                  {settings?.email || "Loading..."}
                </p>
                <p>
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  <strong>Address:</strong>{" "}
                  {settings?.address || "Loading..."}
                </p>

                <div className="social-icons">
                  {settings?.socialLinks?.facebook && (
                    <Link
                      to={settings.socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                  )}
                  {settings?.socialLinks?.instagram && (
                    <Link
                      to={settings.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <i className="fab fa-instagram"></i>
                    </Link>
                  )}
                  {settings?.socialLinks?.linkedin &&
                    settings.socialLinks.linkedin !== "#" && (
                      <Link
                        to={settings.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <i className="fab fa-linkedin"></i>
                      </Link>
                    )}
                </div>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-title">Send a Message</div>
              <div className="form-message" id="formMessage"></div>
              <form
                className="footer-form"
                id="footerForm"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = {
                    name: e.target.name.value,
                    email: e.target.email.value,
                    message: e.target.message.value,
                  };
                  try {
                    // FIXED: Use API_BASE_URL to dynamically construct the contact endpoint
                    const response = await fetch(
                      `${API_BASE_URL}/contact`,
                      REQUEST_CONFIG.POST(formData) // Use the POST config from api.js
                    );
                    if (response.ok) {
                      alert("Message sent successfully!");
                      e.target.reset();
                    } else {
                      alert("Failed to send message. Please try again.");
                    }
                  } catch (error) {
                    console.error(error);
                    alert("An error occurred. Please try again.");
                  }
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                />
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Your Message"
                  required
                ></textarea>
                <button type="submit">
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} Sargodha Institute of Health
              Sciences. Developed by{" "}
              <a href="/" target="_blank" rel="noopener noreferrer">
                <b>Zeeshan Siddique</b>
              </a>
              .
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;