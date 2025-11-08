import React from "react";
import "./OurFaculties.css";

function OurFaculties() {
  return (
    <div className="section2-container">
      <h2 className="section-title center-text">Our Faculties</h2>

      <div className="faculty-grid">
        <div className="faculty-col">
          <div className="faculty-card">
            <img
              src="/images/sihsbuilding.jpg"
              alt="Faculty of Basic Sciences"
              className="faculty-img"
            />
            <div className="faculty-card-body">
              <h5 className="faculty-card-title">Faculty of Basic Sciences</h5>
              <p className="faculty-card-text">
                The Faculty of Basic Sciences provides foundational knowledge in
                core scientific disciplines, preparing students for advanced
                studies and research in ...
              </p>
              <a href="faculty_detail.php?id=1" className="btn btn-view-details">
                View Details
              </a>
            </div>
          </div>
        </div>

        <div className="faculty-col">
          <div className="faculty-card">
            <img
              src="/images/sihsbuilding.jpg"
              alt="Faculty of Clinical Sciences"
              className="faculty-img"
            />
            <div className="faculty-card-body">
              <h5 className="faculty-card-title">Faculty of Clinical Sciences</h5>
              <p className="faculty-card-text">
                Dedicated to advanced medical training and patient care, the
                Faculty of Clinical Sciences offers specialized programs and
                hands-on experience in diver...
              </p>
              <a href="faculty_detail.php?id=2" className="btn btn-view-details">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurFaculties;
