import React, { useState, useEffect } from "react";
// Assuming SETTINGS_API.SLIDER is the endpoint '/slider' and API_BASE_URL is 'API_BASE_URL/api'
import { SETTINGS_API, API_BASE_URL } from "../api";
import "./SliderSettings.css";

function SliderSettings() {
  const [slides, setSlides] = useState([]);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });

  // Extract the root domain for file URLs: API_BASE_URL
  const baseDomainUrl = API_BASE_URL.replace("/api", "");
  
  // Construct the full API URL for fetching/saving slides
  const SLIDER_API_URL = `${API_BASE_URL}${SETTINGS_API.SLIDER}`; // e.g., API_BASE_URL/api/slider
  const UPLOAD_API_URL = `${API_BASE_URL}${SETTINGS_API.SLIDER}/upload`; // e.g., API_BASE_URL/api/slider/upload

  // ✅ Popup Message System
  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3000);
  };

  // ✅ Fetch slides (using fetch instead of axios)
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(SLIDER_API_URL);
        
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        
        const data = await res.json();
        setSlides(data?.slides || []);
      } catch (err) {
        console.error("Error fetching slider data:", err);
      }
    };
    fetchSlides();
  }, [SLIDER_API_URL]); // Dependency added for safety

  // --- Handlers ---

  const updateSlide = (index, value) => {
    const copy = [...slides];
    copy[index] = { ...copy[index], url: value };
    setSlides(copy);
  };

  const handleFileUpload = async (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      
      try {
        // ✅ Replaced axios.post with native fetch for file upload
        const res = await fetch(
          UPLOAD_API_URL, 
          { 
            method: "POST",
            body: formData,
            // Fetch automatically sets Content-Type: multipart/form-data for FormData, 
            // no need to set headers manually.
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Upload failed: ${errorText}`);
        }
        
        const resData = await res.json();
        
        updateSlide(index, resData.url);
        showPopup("success", "✅ Image uploaded successfully!");

      } catch (err) {
        console.error("Upload failed", err);
        showPopup("error", "❌ Upload failed!");
      }
    }
  };

  const addSlide = () => setSlides((prev) => [...prev, { url: "" }]);
  
  const deleteSlide = (index) =>
    setSlides((prev) => prev.filter((_, i) => i !== index));

  const saveAllSlides = async () => {
    try {
      // ✅ Replaced axios.post with native fetch for saving JSON data
      const res = await fetch(SLIDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slides }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Save failed: ${errorText}`);
      }

      showPopup("success", "✅ Slider updated successfully!");
    } catch (err) {
      console.error(err);
      showPopup("error", "❌ Failed to save slider!");
    }
  };

  // --- Render ---

  return (
    <div className="slider-admin">
      {/* Popup Message */}
      {popup.show && (
        <div className={`popup ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <div className="toprow">
        <h2 style={{ display: "flex", gap: "12px" }}>
          <img src="/images/logo.png" alt="" style={{ width: "40px" }} />
          <span>Slider Settings</span>
        </h2>
        <div className="btns">
          <button className="btn-add" onClick={addSlide}>
            + Add Slide
          </button>
          <button className="btn-save" onClick={saveAllSlides}>
            Save All
          </button>
        </div>
      </div>

      <div className="slides-list">
        {slides.length === 0 ? (
          <div className="empty">No slides yet. Add one!</div>
        ) : (
          slides.map((s, i) => (
            <div key={i} className="slide-row">
              <div className="preview">
                {s.url ? (
                  // ✅ Using baseDomainUrl constant for image preview URL
                  <img
                    src={`${baseDomainUrl}${s.url}`}
                    alt={`slide-${i}`}
                  />
                ) : (
                  <span>No image</span>
                )}
              </div>
              <div className="controls">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={s.url || ""} // Ensure controlled input handles null/undefined
                  onChange={(e) => updateSlide(i, e.target.value)}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(i, e)}
                />
                <button className="btn-del" onClick={() => deleteSlide(i)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SliderSettings;