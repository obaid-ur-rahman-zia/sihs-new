import React, { useState } from "react";
import styles from "./Department4.module.css";

function Department4() {
  const [openSemester, setOpenSemester] = useState(null);

  const toggleSemester = (id) => {
    setOpenSemester(openSemester === id ? null : id);
  };

  const semesters = [
    {
      id: 1,
      title: "Semester 1",
      courses: [
        "Introductory Biochemistry 4(3-1)",
        "Functional English 3(3-0)",
        "Islamic Studies/ Ethics 2(2-0)",
        "Mathematics-l 3(3-0)",
        "Fundamentals of Inorganic Chemistry 3(2-1)",
        "Introduction to Sociology 3(3-0)",
      ],
    },
    {
      id: 2,
      title: "Semester 2",
      courses: [
        "Biochemistry of Carbohydrates 4(3-1)",
        "Biophysics 3(3-0)",
        "English Comprehension and Composition 3(3-0)",
        "Pakistan Studies 2(2-0)",
        "Introduction to Statistical Theory 3(3-0)",
        "Introduction to Psychology 3(3-0)",
      ],
    },
    {
      id: 3,
      title: "Semester 3",
      courses: [
        "Cell Biology 3(2-1)",
        "Genetics 3(3-0)",
        "Communication Skills 3(3-0)",
        "Introduction to Computing Applications 3(3-0)",
        "Fundamentals of Organic Chemistry 3(2-1)",
      ],
    },
    {
      id: 4,
      title: "Semester 4",
      courses: [
        "Human Physiology 3(3-0)",
        "Biochemistry of Lipids 4(3-1)",
        "Molecular Biology 3(3-0)",
        "Fundamental of Physical Chemistry 3(2-1)",
        "General Microbiology-I 3(2-1)",
      ],
    },
    {
      id: 5,
      title: "Semester 5",
      courses: [
        "Amino Acids and Proteins 4(3-1)",
        "Enzymology 3(2-1)",
        "Biosafety & Ethics 2(2-0)",
        "Biochemical Techniques 3(2-1)",
        "Plant Biochemistry 3(2-1)",
      ],
    },
    {
      id: 6,
      title: "Semester 6",
      courses: [
        "Nutritional Biochemistry 3(2-1)",
        "Biochemistry of Nucleic Acid 3(3-0)",
        "Proteomics (Elective I) 3(2-1)",
        "Biomembranes & Cell Signaling 3(3-0)",
        "Bioenergetics 2(2-0)",
        "Industrial Biochemistry 3(2-1)",
      ],
    },
    {
      id: 7,
      title: "Semester 7",
      courses: [
        "Biological Metabolism 4(4-0)",
        "Bioinformatics-I 3(2-1)",
        "Genomics (Elective II) 3(3-0)",
        "Fermentation Biotechnology (Elective III) 3(3-0)",
        "Current Trends in Biochemistry 3(3-0)",
      ],
    },
    {
      id: 8,
      title: "Semester 8",
      courses: [
        "Biotechnology 3(3-0)",
        "Immunochemistry 3(2-1)",
        "Antimicrobials & Chemotherapy (Elective IV) 3(3-0)",
        "Research Planning & Report Writing 3(3-0)",
        "Seminar (Research) 1(0-1)",
        "Research Project/Review Article/Internship 3(0-3)",
      ],
    },
  ];

  return (
    <div className={styles.facultyContent}>
      <h2 className={styles.sectionTitle}>Department of Applied Sciences</h2>

      <h3 className={styles.subTitle}>BS-Biochemistry</h3>
      <h4 className={styles.subTitle}>INTRODUCTION</h4>
      <p className={styles.overviewText}>
        Biochemistry is the science concerned with the chemical basis of life. Biochemistry incorporates everything in size between a molecule and a cell and all the interactions between them. The aim of biochemists is to describe in molecular terms the structures, mechanisms and chemical processes shared by all organisms, providing organizing principles that underlie life in all its diverse forms. So a biochemist would study about these molecules namely carbohydrates, lipids, proteins and nucleic acids. Biochemist also studies their reactions and what affects them and in what ways. Biochemistry is thus a study of the compounds found inside living beings, the processes involved with the focus on the role, function and structure of these molecules. 
      </p>
      <p className={styles.overviewText}>
        Biochemistry now encompasses all of the molecular and cellular life sciences. Scientific topics falling under the broad description of biochemistry include genetics, immunology, virology, developmental biology, neuro biology, cell biology and structural biology. A recent milestone in biochemistry was the completion of the Human Genome Project and stem cell therapy. There has never been a better time to study biochemistry. With the introduction of newer methods in science and technology, the scope in biochemistry is much greater than before. In fact, biochemistry is one course that is selected by most of today‟s students. This is because of the challenging nature of the course and the lucrative jobs that can be got after the completion of studies in this field. 
      </p>
      <p className={styles.overviewText}>
        There are quite a few fields where Biochemists can find employment. These include: Biotechnology, Chemical manufacturing companies, Food and Drink (includes brewing), Health and Beauty Care, Medical Instrument companies, Research Companies and Laboratories Public Sectors, Agriculture and fisheries, Blood Service, Cancer research institutes, Environmental Pollution Control, Forensic Science, Hospitals, National Blood Services, Overseas Development, Public Health Entities, Public Health Laboratories, Pharmaceutical firms, Food industry and agrochemical companies.  
      </p>

      <h3 className={styles.programTitle}>BS-Biochemistry – 4 Year Program</h3>

      {semesters.map((semester) => (
        <div key={semester.id} className={styles.semesterBlock}>
          <button
            className={styles.semesterButton}
            
            onClick={() => toggleSemester(semester.id)}
          >
            <span>{semester.title}</span>
            <span className={styles.arrow}>
              {openSemester === semester.id ? "▲" : "▼"}
            </span>
          </button>

          <div
            className={`${styles.semesterContent} ${
              openSemester === semester.id ? styles.show : ""
            }`}
            style={{width: "50%"}}
          >
            <table className={styles.semesterTable}>
              <tbody>
                {semester.courses.map((course, index) => (
                  <tr key={index}>
                    <td className={styles.lineCell}>{course}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Department4;
