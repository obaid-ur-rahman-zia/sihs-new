import React, { useState, useEffect } from "react";
// Assuming you have SETTINGS_API and REQUEST_CONFIG defined in '../api', 
// but we will no longer use SETTINGS_API to avoid the URL concatenation error.
import { REQUEST_CONFIG } from "../api"; 
import "./SiteSettings.css";

// Define the base API URL for your application
// This constant is clean and only points to the base API path.
const BASE_API_URL = "http://localhost:5000/api"; 

// NOTE: The 'normalizeUrl' helper was removed as it was not solving the issue, 
// and we are now manually building the correct, simple path.

function SiteSettings() {
  const [settings, setSettings] = useState({
    theme: "default",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
    mapLocation: {
      latitude: 32.08237311905389,
      longitude: 72.67886211039271,
      zoom: 15,
    },
    mapEmbedUrl: "",
    socialLinks: { facebook: "", instagram: "", linkedin: "" },
    openingHours: {
      mondayFriday: "",
      saturday: "",
      sunday: "",
    },
  });

  // State variables for message and map mode kept.
  const [mapMode, setMapMode] = useState("coordinates");
  const [message, setMessage] = useState({ text: "", type: "" });

  // ✅ Toast message system
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // ✅ Load settings on mount
  useEffect(() => {
    // 🛑 FIX: Explicitly construct the correct API URL to fix the 404 (Not Found) error.
    const apiUrl = `${BASE_API_URL}/site-settings`; 
    
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          // Attempt to read error message if server returns one
          return res.json().catch(() => {
            throw new Error(`HTTP error! status: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((data) => setSettings((prev) => ({ ...prev, ...data })))
      .catch((error) => {
        console.error("Fetch Error:", error);
        showMessage("Failed to load site settings", "error");
      });
  }, []);

  // --- Handlers (Simplified, removed logo logic) ---

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSocialChange = (platform, value) => {
    setSettings({
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        [platform]: value,
      },
    });
  };

  const handleOpeningHoursChange = (day, value) => {
    setSettings({
      ...settings,
      openingHours: {
        ...settings.openingHours,
        [day]: value,
      },
    });
  };

  const handleMapLocationChange = (field, value) => {
    setSettings({
      ...settings,
      mapLocation: {
        ...settings.mapLocation,
        [field]: parseFloat(value) || 0,
      },
    });
  };
  
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSettings({
            ...settings,
            mapLocation: {
              ...settings.mapLocation,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          showMessage("Current location captured!");
        },
        (error) => showMessage("Unable to get location: " + error.message, "error")
      );
    } else {
      showMessage("Geolocation not supported", "error");
    }
  };

  const handleSave = async () => {
    try {
      // NOTE: FormData is still used here, but it's not strictly necessary 
      // since we aren't sending files anymore. We can switch to JSON.
      
      // ✅ OPTIMIZATION: Send data as JSON since no files are being uploaded.
      const res = await fetch(`${BASE_API_URL}/site-settings`, {
        method: "POST",
        // Setting Content-Type is mandatory for JSON payload
        headers: {
          'Content-Type': 'application/json',
          // Include auth headers if defined in REQUEST_CONFIG
          ...(REQUEST_CONFIG.headers || {}), 
        },
        // Send the settings object directly as JSON string
        body: JSON.stringify(settings), 
      });

      if (res.ok) { 
        showMessage("Settings saved successfully!");
      } else {
        const errorBody = await res.text();
        console.error("API Save Failed:", errorBody);
        showMessage("Failed to save settings. Check console for details.", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Error saving settings", "error");
    }
  };

  // --- Render (Simplified, removed logo section) ---

  return (
    <div className={`site-settings theme-${settings.theme}`}>
      {/* ✅ Animated Toast */}
      {message.text && (
        <div className={`toast ${message.type}`}>
          {message.type === "success" ? "✅" : "❌"} {message.text}
        </div>
      )}

      <h2 className="settings-title">
        {/* Placeholder logo image is kept for the title bar, but the input/preview is removed. */}
        <img src="/images/logo.png" alt="logo" className="settings-logo" />
        Site Settings
      </h2>

      <div className="settings-grid">
        {/* The former Logo Upload div is now removed */}
        
        {/* ... Contact Info inputs ... */}
        <div className="setting">
          <label>Address</label>
          <textarea
            name="address"
            value={settings.address}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div className="setting">
          <label>Phone</label>
          <input name="phone" value={settings.phone} onChange={handleChange} />
        </div>
        <div className="setting">
          <label>WhatsApp</label>
          <input name="whatsapp" value={settings.whatsapp} onChange={handleChange} />
        </div>
        <div className="setting">
          <label>Email</label>
          <input name="email" value={settings.email} onChange={handleChange} />
        </div>

        {/* ✅ Map Section */}
        <div className="setting full-width">
          <h3>📍 Map Location</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="coordinates"
                checked={mapMode === "coordinates"}
                onChange={(e) => setMapMode(e.target.value)}
              />
              Use Coordinates
            </label>
            <label>
              <input
                type="radio"
                value="embed"
                checked={mapMode === "embed"}
                onChange={(e) => setMapMode(e.target.value)}
              />
              Use Embed URL
            </label>
          </div>

          {mapMode === "coordinates" ? (
            <div className="map-grid">
              <div>
                <label>Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={settings.mapLocation.latitude}
                  onChange={(e) =>
                    handleMapLocationChange("latitude", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={settings.mapLocation.longitude}
                  onChange={(e) =>
                    handleMapLocationChange("longitude", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Zoom (1-20)</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={settings.mapLocation.zoom}
                  onChange={(e) => handleMapLocationChange("zoom", e.target.value)}
                />
              </div>
            </div>
          ) : (
            <textarea
              name="mapEmbedUrl"
              value={settings.mapEmbedUrl}
              onChange={handleChange}
              rows="3"
              placeholder="Paste Google Maps Embed URL"
            />
          )}

          {mapMode === "coordinates" && (
            <div className="map-buttons">
              <button onClick={handleGetCurrentLocation} className="btn-green">
                📍 Use My Current Location
              </button>
              {/* NOTE: Corrected Google Maps preview URL format for a proper map link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${settings.mapLocation.latitude},${settings.mapLocation.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blue"
              >
                🗺️ Preview on Google Maps
              </a>
            </div>
          )}
        </div>
        
        {/* ... Social Links and Opening Hours ... */}
        <div className="setting full-width">
          <h3>🔗 Social Links</h3>
          <div className="triple-grid">
            {["facebook", "instagram", "linkedin"].map((platform) => (
              <div key={platform}>
                <label>{platform.charAt(0).toUpperCase() + platform.slice(1)} URL</label>
                <input
                  value={settings.socialLinks[platform]}
                  onChange={(e) => handleSocialChange(platform, e.target.value)}
                  placeholder={`https://${platform}.com/...`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="setting full-width">
          <h3>🕒 Opening Hours</h3>
          <div className="triple-grid">
            <div>
              <label>Mon - Fri</label>
              <input
                value={settings.openingHours.mondayFriday}
                onChange={(e) =>
                  handleOpeningHoursChange("mondayFriday", e.target.value)
                }
              />
            </div>
            <div>
              <label>Saturday</label>
              <input
                value={settings.openingHours.saturday}
                onChange={(e) =>
                  handleOpeningHoursChange("saturday", e.target.value)
                }
              />
            </div>
            <div>
              <label>Sunday</label>
              <input
                value={settings.openingHours.sunday}
                onChange={(e) =>
                  handleOpeningHoursChange("sunday", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn-save" onClick={handleSave}>
          💾 Save All Settings
        </button>
      </div>
    </div>
  );
}

export default SiteSettings;