import React from "react";
import "./WhySection.css";
 
function Section1() {
  return (
    <div className="Why-section-container">
  
      <div className="row-section">
        <div className="text-column">
          <h2 className="Why-section-title">Why<br />Choose<br />SIHS</h2>
          <p>
           Sargodha Institute of Health Sciences (SIHS) is state of the art Institution of Health Sciences, and the1st Institute in the Sargodha Division of
Punjab which is affiliated with Government College University Faisalabad, a highly ranked university by Higher Education Commission, Pakistan
and Clinically attached with National Hospital, Sargodha and other private hospitals (in process). Sargodha Institute of Health Sciences (SIHS)
offering Doctor of Physiotherapy (DPT) 5 years degree program, BS Nutrition & Dietetics4 year program, Allied Health Sciences (AHS) 4 year
program including Medical Lab. Technology (MLT),Radiology/Imaging Technology and Operation Theater Technology (OTT) and Doctor of Eastern
Medicine and Surgery (DEMS), BS in Biochemistry and Physiology, BS in Food Sciences, BS in Ophthalmology, BS in speech Therapy and BS in
Psychology and ADP-Advance Diploma in Psychology. Doctor of Human Nutrition and Dietetics (DHND) will be offered in near future. Sargodha
Institute of Health Sciences (SIHS) has highly qualified faculty, excellent Anatomy museum, well equipped labs of basic medical sciences, Kinesiology/Biomechanics, Nutrition and latest computer Lab.
          </p> 
        </div>
        <div className="image-column">
          <img
            src="/images/sihsbuilding.jpg"
            alt="SMC Campus"
            className="responsive-image"
          />
        </div>
      </div>

      <div className="row-section">
        <div
          className="vision-bg"
          style={{ backgroundImage: "url('/images/sihsbuilding.jpg')" }}
        >
          <div className="highlight-box">
            OUR<br />VISION<br />&<br />MISSION
          </div>
        </div>
        <div className="text-column padded">
          <h2 className="Why-section-title">Our Vision & Mission</h2>
          <p>
            Sargodha Institute of Health Sciences, Sargodha is committed to provide
            competency based medical education to produce socially accountable
            health professionals by fostering critical thinking, effective 
            community services, and lifelong learning, enhancing clinical and
            research skills with ethical and professional values.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section1;
