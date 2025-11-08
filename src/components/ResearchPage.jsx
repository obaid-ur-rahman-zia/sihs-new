import React, { useEffect, useState } from "react";
// Import API constants and API_BASE_URL
import { CONTENT_API, API_BASE_URL } from "../api";
import "./ResearchPage.css";

function ResearchPage() {
  const [research, setResearch] = useState([]);

  // Extract the root domain for file URLs: http://localhost:5000
  const baseDomainUrl = API_BASE_URL.replace("/api", "");

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        // FIXED: Use CONTENT_API.RESEARCH
        const res = await fetch(CONTENT_API.RESEARCH);
        const data = await res.json();
        setResearch(data);
      } catch (err) {
        console.error("Error fetching research:", err);
      }
    };
    fetchResearch();
  }, []);

  return (
    <div className="research-page">
      <div className="content-section">
        <h2 className="section5-title">Recent Papers & Projects</h2>

        <div className="research-container">
          {research.length === 0 ? (
            <div className="research empty">
              <i className="far fa-sad-tear"></i>
              <p>No research papers or projects yet.</p>
            </div>
          ) : (
            research.map((item) => (
              <div key={item._id} className="research-card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.fileUrl && (
                  <a
                    // FIXED: Use baseDomainUrl to ensure correct file link
                    href={`${baseDomainUrl}${item.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="research-link"
                  >
                    📄 View File
                  </a>
                )}
                <span className="research-date">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ResearchPage;