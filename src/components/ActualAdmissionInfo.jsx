import React, { useState } from "react";
import "./ActualAdmissionInfo.css";

function ActualAdmissionInfo() {
  const [activeTab, setActiveTab] = useState("policy");

  return (
    <div className="admission-container">
      <div className="criteria-card">
        {/* Tabs */}
        <ul className="nav-tabs">
          <li className="tab-item">
            <button
              className={`tab-link ${activeTab === "policy" ? "active" : ""}`}
              onClick={() => setActiveTab("policy")}
            >
              General Policy
            </button>
          </li>
          <li className="tab-item">
            <button
              className={`tab-link ${activeTab === "eligibility" ? "active" : ""}`}
              onClick={() => setActiveTab("eligibility")}
            >
              Eligibility Criteria
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "policy" && (
            <div className="tab-pane active">
              <h2 className="section3-title">
                General Policy (According to the Affiliated University)
              </h2>
              <ul>
                <li>Admission will be notified in the major Urdu / English newspapers.</li>
                <li>Admission forms are available with/without prospectus from the institute or downloadable from the website.</li>
                <li>Application form may be filled and submitted online.</li>
                <li>Selection of candidates will be on the basis of merit.</li>
                <li>Academic session will be commencing according to the Sargodha Institute of Health Sciences.</li>
              </ul>

              <h3 className="mt-4">Instructions for Admission</h3>
              <ul>
                <li>Each candidate has to submit the application on the prescribed form.</li>
                <li>Separate application is required for each category.</li>
                <li>
                  The application should be duly filled in by the candidate in his/her own handwriting in BLOCK letters with black ink or ballpoint. 
                  Fill all the columns and write "Not Applicable" if a column is irrelevant.
                </li>
                <li>
                  O/A level candidates should mention equivalent marks obtained and maximum marks in the admission form awarded by the Inter Boards Committee, Islamabad.
                </li>
                <li>
                  If a candidate is admitted on the basis of false statements, he/she will be expelled from the Institute 
                  and all fee and other dues paid shall be forfeited. Further departmental or legal action may be taken.
                </li>
              </ul>
            </div>
          )}

          {activeTab === "eligibility" && (
  <div className="tab-pane active">
    <h2 className="section3-title">Eligibility Criteria</h2>

    {/* Eligibility Table */}
    <table className="eligibility-table">
      <thead>
        <tr>
          <th>Department</th>
          <th>Course</th>
          <th>Marks %</th>
          <th>Qualification</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="Department">Physiotherapy</td>
          <td data-label="Course">DPT (Doctor of Physical Therapy)</td>
          <td data-label="Marks %">60% (660)</td>
          <td data-label="Qualification">F.Sc. Pre-medical or equivalent</td>
        </tr>
        <tr>
          <td data-label="Department">Allied Health Sciences</td>
          <td data-label="Course">BS-MLT (Medical Laboratory Technology)</td>
          <td data-label="Marks %">60% (660)</td>
          <td data-label="Qualification">F.Sc. Pre-medical or equivalent</td>
        </tr>
        <tr>
          <td data-label="Department">Allied Health Sciences</td>
          <td data-label="Course">BS-RIT (Radiography & Imaging Technology)</td>
          <td data-label="Marks %">60% (660)</td>
          <td data-label="Qualification">F.Sc. Pre-medical or equivalent</td>
        </tr>
        <tr>
          <td data-label="Department">Allied Health Sciences</td>
          <td data-label="Course">BS-OTT (Operation Theater Technology)</td>
          <td data-label="Marks %">60% (660)</td>
          <td data-label="Qualification">F.Sc. Pre-medical or equivalent</td>
        </tr>
        <tr>
          <td data-label="Department">Food & Nutrition</td>
          <td data-label="Course">BS-HND (Human Nutrition & Dietetics)</td>
          <td data-label="Marks %">45% (495)</td>
          <td data-label="Qualification">F.Sc. Pre-medical or equivalent</td>
        </tr>
        <tr>
          <td data-label="Department">Applied Sciences</td>
          <td data-label="Course">BS-Biochemistry</td>
          <td data-label="Marks %">45% (495)</td>
          <td data-label="Qualification">F.Sc. Pre-medical or equivalent</td>
        </tr>
      </tbody>
    </table>

    {/* Additional Eligibility Info */}
    <div className="eligibility-extra">
      <h3>Additional Criteria</h3>
      <ul>
        <li>
          <strong>Age:</strong> Maximum 22 years of age on closing date 
          (extendable up to 24 years with Director/Principal’s permission and up to 27 years by Vice Chancellor GCUF).  
          Or according to the affiliated University.
        </li>
        <li>
          <strong>Domicile:</strong> Candidates from whole Punjab can apply for open merit only.
        </li>
      </ul>

      <h4>Requirements</h4>
      <p>The following attested copies should be attached with the application form:</p>
      <ul>
        <li>Four Passport size Photographs</li>
        <li>Two attested copies of Matriculation Certificate (or equivalent)</li>
        <li>Two attested copies of Intermediate Certificate (F.Sc. or equivalent)</li>
        <li>Two attested copies of CNIC / Form-B</li>
        <li>Two attested copies of Father's/Guardian's CNIC</li>
        <li>Two attested copies of Domicile Certificate</li>
        <li>Two copies of Character Certificate</li>
        <li>Equivalence Certificate from IBCC/HEC (for foreign Qualification)</li>
        <li>
          Two attested copies of Attempt Certificate (if the period between Matric and Intermediate is more than two sessions)
        </li>
      </ul>

      <p><strong>Note:</strong> Required before the commencement of classes or on the day of selection interview:</p>
      <ul>
        <li>All Original Documents</li>
        <li>An affidavit on stamp paper of Rs.100/-</li>
      </ul>

      <h4>Final Selection</h4>
      <ul>
        <li>For the final selection, candidates will be interviewed at SIHS campus by the admission committee.</li>
        <li>Original documents will be kept with the institution till completion of degree.</li>
        <li>All candidates selected at the final interview will be examined for medical fitness.</li>
        <li>Candidates medically unfit or of unsatisfactory conduct shall not be eligible for admission.</li>
        <li>The Health Department Govt. of Punjab, Degree Awarding Body and SIHS reserve full rights to amend the rules & regulations during the course of study.</li>
      </ul>

      <p>
        <strong>Note:</strong> SIHS reserves the right to amend/change the admission policy in accordance with University/HEC/Govt. of Pakistan/Punjab at any time without prior notice.
      </p>
    </div>
  </div>
)}

        </div>

        {/* Disclaimer */}
        <p className="criteria-disclaimer">
          <i className="fas fa-info-circle me-2"></i>
          Disclaimer: Criteria are based on affiliated university guidelines. Always confirm with
          the official prospectus.
        </p>
      </div>
    </div>
  );
}

export default ActualAdmissionInfo;
