import React, { useState, useEffect } from "react";
// Import API constants and replace axios with fetch
import { SETTINGS_API, API_BASE_URL } from "../api";
import "./Slidshow.css";

function Slidshow() {
  const defaultImages = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.png",
  ];

  const [images, setImages] = useState(defaultImages);
  const [activeIndex, setActiveIndex] = useState(0);

  // Extract the root domain for file URLs: API_BASE_URL
  const baseDomainUrl = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        // FIXED: Use SETTINGS_API.SLIDER for the URL
        const res = await fetch(SETTINGS_API.SLIDER); 
        const resData = await res.json();
        
        const fetched = resData?.slides?.map((s) => s.url) || [];
        
        // FIXED: Use baseDomainUrl for dynamic image URL construction
        setImages(
          fetched.length 
            ? fetched.map((x) => `${baseDomainUrl}${x}`) 
            : defaultImages
        );
      } catch (err) {
        console.error("Error fetching slider:", err);
        setImages(defaultImages);
      }
    };
    fetchSlider();
  }, [baseDomainUrl]); // baseDomainUrl added to deps array

  useEffect(() => {
    const timer = setInterval(() => {
      // Safely handle modulus operation even if images.length is 0
      setActiveIndex((prev) => (prev + 1) % (images.length || 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="slideshow">
      {images.map((src, i) => (
        <div
          key={i}
          className={`slide ${i === activeIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      ))}

      <div className="bullets">
        {images.map((_, i) => (
          <span
            key={i}
            className={`bullet ${i === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slidshow;