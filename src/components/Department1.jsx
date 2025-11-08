import React, { useState } from "react";
import styles from "./Department1.module.css";

function Department1() {
  const [openSemester, setOpenSemester] = useState(null);

  const toggleSemester = (semester) => {
    setOpenSemester(openSemester === semester ? null : semester);
  };

  const semesters = [
    {
      id: 1,
      title: "Semester 1",
      courses: [
        "Upper Limb & General Anatomy 4(3-1)",
        "Cardiovascular & Neuromuscular Physiology 3(2-1)",
        "Introduction to Kinesiology 3(2-1)",
        "Functional English 3(3-0)",
        "Introduction to Statistical Theory-I 3(3-0)",
        "Pakistan Studies 2(2-0)",
      ],
    },
    {
      id: 2,
      title: "Semester 2",
      courses: [
        "Lower Limb Anatomy & General Histology 4(3-1)",
        "Visceral Physiology 3(2-1)",
        "Clinical Kinesiology 3(2-1)",
        "English Comprehension & Composition 3(3-0)",
        "Introduction to Statistical Theory-II 3(3-0)",
        "Islamic Studies / Ethics 2(2-0)",
      ],
    },
    {
      id: 3,
      title: "Semester 3",
      courses: [
        "Head and Neck Anatomy & Human Embryology 3(2-1)",
        "Physiology of Reproductive, Nervous & Renal System 3(2-1)",
        "Introduction to Biomechanics & Ergonomics 3(3-0)",
        "Biochemistry & Genetics I 2(2-0)",
        "Introduction to Exercise Physiology 3(3-0)",
        "Introduction to Computing Applications 3(2-1)",
      ],
    },
    {
      id: 4,
      title: "Semester 4",
      courses: [
        "Human Neuro Anatomy 3(2-1)",
        "Advance Techniques in Biomechanics & Ergonomics 3(2-1)",
        "Behavioral Sciences (Psychiatry & Psychology) 3(3-0)",
        "Biochemistry & Genetics II 2(2-0)",
        "Advance Clinical Exercise Physiology 3(3-0)",
        "Medical Physics in Rehabilitation 3(2-1)",
      ],
    },
    {
      id: 5,
      title: "Semester 5",
      courses: [
        "General Pathology 3(2-1)",
        "Microbiology & Applied Pathology 3(2-1)",
        "Introduction to Pharmacology 3(3-0)",
        "Physical Agents & Electrotherapy I 3(2-1)",
        "Therapeutic Exercises I 3(2-1)",
        "Musculoskeletal Physical Therapy I 3(2-1)",
      ],
    },
    {
      id: 6,
      title: "Semester 6",
      courses: [
        "Special Pathology 3(3-0)",
        "Applied Microbiology 3(2-1)",
        "Applied Pharmacology 3(3-0)",
        "Physical Agents & Electrotherapy II 3(2-1)",
        "Therapeutic Exercises II 3(2-1)",
        "Musculoskeletal Physical Therapy II 3(2-1)",
      ],
    },
    {
      id: 7,
      title: "Semester 7",
      courses: [
        "Medicine (Clinical) 3(3-0)",
        "Surgery (Clinical) 3(3-0)",
        "Community Medicine & Rehabilitation 3(3-0)",
        "Orthotics & Prosthetics 3(2-1)",
        "Neurological Physical Therapy I 3(2-1)",
        "Radiology & Diagnostic Imaging 3(2-1)",
      ],
    },
    {
      id: 8,
      title: "Semester 8",
      courses: [
        "Pediatrics (Clinical) 3(3-0)",
        "Gynecology & Obstetrics (Clinical) 3(3-0)",
        "Sports Physical Therapy 3(2-1)",
        "Neurological Physical Therapy II 3(2-1)",
        "Cardiopulmonary Physical Therapy 3(2-1)",
        "Research Methodology & Evidence Based Practice 3(3-0)",
      ],
    },
    {
      id: 9,
      title: "Semester 9",
      courses: [
        "Clinical Practice I (Medicine & Surgery) 6(0-6)",
        "Clinical Practice II (Neuro & Cardio) 6(0-6)",
        "Management Sciences in Rehabilitation 3(3-0)",
        "Emergency Procedures & First Aid 2(2-0)",
      ],
    },
    {
      id: 10,
      title: "Semester 10",
      courses: [
        "Clinical Practice III (Musculoskeletal & Sports PT) 6(0-6)",
        "Clinical Practice IV (Pediatrics & Gynae) 6(0-6)",
        "Professional Ethics & Law 2(2-0)",
        "Research Project / Thesis 6(0-6)",
      ],
    },
  ];

  return (
    <div className={styles.facultyContent}>
      <h2 className={styles.sectionTitle}>Department of Physical Therapy</h2>

      <h3 className={styles.sectionSubtitle}>Doctor of Physical Therapy</h3>
      <h4 className={styles.sectionSubtitle}>INTRODUCTION</h4>
      <p className={styles.overviewText}>
        In keeping with recent growth and advancement of Physical Therapy profession worldwide,
        the Doctor of Physical Therapy (DPT) curriculum is developed to prepare Physical Therapists
        for independent practice in Pakistan. The program emphasizes differential diagnosis, applied
        pharmacology, diagnostic imaging, health care prevention and practice management. With the
        increasing recognition of Physical Therapists’ skills in diagnosing, treating, and preventing
        illness and injuries, the profession is moving toward greater autonomy in patient care.
      </p>

      <h3 className={styles.sectionSubtitle}>
        Doctor of Physical Therapy (DPT) – 5 Year Program
      </h3>

      {semesters.map((semester) => (
        <div key={semester.id} className={styles.semesterBlock} style={{ marginBottom: "20px" }}>
          <button
            className={styles.toggleBtn}
            onClick={() => toggleSemester(semester.id)}
            style={{display: 'flex', justifyContent: 'space-between', transitionDelay: '1.7s'}}
          >
             <span>{semester.title}</span><span>{openSemester === semester.id ? "▲" : "▼"}</span>
          </button>

          {openSemester === semester.id && (
            <table className={styles.semesterTable}
              style={{ animation: "fadeIn 1.5s" , transitionDelay: '1.3s',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
                marginTop: "10px",
                // display: "inline-table",
              }}>
              <tbody>
                {semester.courses.map((course, index) => (
                  <tr key={index}>
                    <td>{course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}

export default Department1;
