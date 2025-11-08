import React from 'react'
import "./FeeStructureTable.css"

function FeeStructureTable() {
  return (
    <div className="fee-structure-container">
      <h2>Fee Structure for Sargodha Institute of Health Sciences</h2>
      <p>
        Below is the detailed fee structure for various programs offered at SIHS.
        All fees are in Pakistani Rupees (PKR) and are subject to change.
      </p>

      <table className="fee-table">
        <thead>
          <tr>
            <th>Fee Category</th>
            <th>Program</th>
            <th>Amount (PKR)</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          {/* Admission / Registration Fee */}
          <tr className="category-row">
            <td rowSpan="2">Admission / Registration Fee</td>
            <td>DPT</td>
            <td>20,000</td>
            <td>Once</td>
          </tr>
          <tr>
            <td>BS Programs</td>
            <td>20,000</td>
            <td>Once</td>
          </tr>

          {/* Security Fee */}
          <tr>
            <td>Security Fee</td>
            <td>-</td>
            <td>5,000</td>
            <td>Refundable</td>
          </tr>

          {/* Tuition Fee */}
          <tr className="category-row">
            <td rowSpan="5">Tuition Fee</td>
            <td>DPT</td>
            <td>65,000</td>
            <td>Per Semester</td>
          </tr>
          <tr>
            <td>BS-MLT</td>
            <td>30,000</td>
            <td>Per Semester</td>
          </tr>
          <tr>
            <td>BS-RIT</td>
            <td>30,000</td>
            <td>Per Semester</td>
          </tr>
          <tr>
            <td>BS-HND</td>
            <td>30,000</td>
            <td>Per Semester</td>
          </tr>
          <tr>
            <td>BS-Biochemistry</td>
            <td>25,000</td>
            <td>Per Semester</td>
          </tr>

          {/* Enrollment Fee */}
          <tr>
            <td>Enrollment Fee</td>
            <td>-</td>
            <td>2,000</td>
            <td>Per Semester</td>
          </tr>

          {/* Examination Fee */}
          <tr>
            <td>Examination Fee</td>
            <td>-</td>
            <td>6,500</td>
            <td>Per Semester</td>
          </tr>

          {/* Sports Fund */}
          <tr>
            <td>Sports Fund</td>
            <td>-</td>
            <td>1,000</td>
            <td>Per Semester</td>
          </tr>
        </tbody>
      </table>

      <p>
        <strong>Note:</strong> Additional fees may apply for special courses,
        workshops, or extracurricular activities. For the latest fee structure,
        please contact the admissions office.
      </p>
    </div>
  )
}

export default FeeStructureTable
