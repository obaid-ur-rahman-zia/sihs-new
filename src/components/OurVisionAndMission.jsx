import React from "react";
import "./OurVisionAndMission.css";

function OurVisionAndMission() {
  return (
    <div className="vision-container">
      <div className="vision-mission-content-section">
        <div className="vision-left" style={{ backgroundImage: "url('/images/sihsbuilding.jpg')" }}>
          <div className="highlightvision-box">
            OUR <br />
            VISION <br />
            &amp; <br />
            MISSION
          </div>
        </div>

        <div className="vision-right" >
          <h2 className="section2-title">Our Vision &amp; Mission</h2>
          <p>
            <strong>Vision:</strong><br />
            To be among the best academic health centers in research, medical education, and excellence in patient care by using technological advancement,
innovative methodology, immense clinical experience, continuous quality improvement, gracious professionalism and long-life learning till perfection.
<br />
<strong>Mission Statement:</strong><br />
The overall mission of the Sargodha Institute of Health Sciences (SIHS) is to establish a Centre of excellence in the medical sciences and technology which would be an agent of change and the role model for other institutions to emulate. It serves to attract the maximum possible talent for its
upgrading. The college hopes to provide graduates in Physiotherapy who would distinguish themselves with their professional, humanistic and
educational standards by the virtue of their organizational skills. They should be able to respond to the needs and problems of the patients while
maintaining international standards. The Sargodha Institute of Health Sciences (SIHS) has been established to educate young men & women, the
principles and appreciation of their responsibility to the society. The academic program of the College is demanding and will require applied physical and intellectual energy. Graduates of this College are in great demand for appointment in National and Private Hospitals, Rehabilitation Centers, Clinics and institutions of Physically Handicapped, Industrial Centers and foreign countries. The aim of the Sargodha Institute of Health
Sciences (SIHS) is to produce efficiently trained and specialized young men& women who can render their services as Physiotherapists, to the
national need.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurVisionAndMission;
