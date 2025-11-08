import React, { useState, useEffect } from "react";
// Import API constants
import { SETTINGS_API } from "../api"; 
import "./OurLocation.css";

function OurLocation() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    // FIXED: Use SETTINGS_API.SITE to fetch site settings consistently
    fetch(SETTINGS_API.SITE)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <section className="our-location-section">
      <div className="container">
        <h2 className="section-title">Our Location</h2>

        <div className="contact-section-card">
          <div className="col" style={{ flex: 1 }}>
            <div className="map-container-compact">
              <iframe
                src={
                  // FIXED: Removed the invalid URL and kept the setting property
                  settings?.mapEmbedUrl ||
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d72.6784!3d32.0673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzA1LjAiTiA3MMKwMDgnNDIuMCJF!5e0!3m2!1sen!2s!4v1647416393710!5m2!1sen!2s"
                }
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sargodha Medical College Map"
              ></iframe>
            </div>
          </div>

          <div className="col" style={{ flex: 1 }}>
            <div className="contact-info-compact">
              <h3
                style={{
                  color: "#003366",
                  fontWeight: 600,
                  marginBottom: "20px",
                }}
              >
                Find Us
              </h3>

              <div className="contact-info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <strong>Address</strong>
                  <p>{settings?.address || "Loading..."}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <strong>Phone</strong>
                  <p>{settings?.phone || "Loading..."}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <strong>Email</strong>
                  <p>{settings?.email || "Loading..."}</p>
                </div>
              </div>

              <h4
                style={{
                  color: "#003366",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                Opening Hours
              </h4>
              <ul className="opening-hours">
                <li>
                  <span>Monday - Friday:</span>{" "}
                  <span>
                    {settings?.openingHours?.mondayFriday || "Loading..."}
                  </span>
                </li>
                <li>
                  <span>Saturday:</span>{" "}
                  <span>
                    {settings?.openingHours?.saturday || "Loading..."}
                  </span>
                </li>
                <li>
                  <span>Sunday:</span>{" "}
                  <span>{settings?.openingHours?.sunday || "Loading..."}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurLocation;