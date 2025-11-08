import React, { useState } from "react";
import styles from "./DepartmentFoodNutrition.module.css";

function DepartmentFoodNutrition() {
  const [openSemester, setOpenSemester] = useState(null);

  const toggleSemester = (id) => {
    setOpenSemester(openSemester === id ? null : id);
  };

  const semesters = [
    {
      id: 1,
      title: "Semester 1",
      courses: [
        "Introduction to Food Science & Technology 3(2-1)",
        "Principles of Human Nutrition 3(3-0)",
        "Functional English 3(3-0)",
        "Introduction to Computing Applications 3(3-0)",
        "Pakistan Studies 2(2-0)",
        "Introduction to Psychology 3(3-0)",
        "Essentials of Biochemistry 3(3-0)",
      ],
    },
    {
      id: 2,
      title: "Semester 2",
      courses: [
        "Community Nutrition 3(2-1)",
        "Food Processing & Preservation 3(2-1)",
        "Fundamentals of Halal Foods 3(3-0)",
        "Food Microbiology 3(2-1)",
        "English Composition & Comprehension 3(3-0)",
        "Islamic Studies/ Ethics 2(2-0)",
      ],
    },
    {
      id: 3,
      title: "Semester 3",
      courses: [
        "Dietetics I 3(2-1)",
        "Contemporary Nutrition 2(0-2)",
        "Metabolism of Nutrients 3(3-0)",
        "Analytical Tools in Food & Nutrition 3(1-2)",
        "General Human Anatomy 3(2-1)",
        "General Pathology 3(2-1)",
        "Introduction to Biotechnology 3(2-1)",
      ],
    },
    {
      id: 4,
      title: "Semester 4",
      courses: [
        "Dietetics II 3(2-1)",
        "Life Cycle Nutrition 3(3-0)",
        "Food Safety & Toxicology 3(3-0)",
        "Assessment of Nutritional status 3(2-1)",
        "Applied Anatomy 3(2-1)",
        "Introduction to Statistical Theory 3(3-0)",
      ],
    },
    {
      id: 5,
      title: "Semester 5",
      courses: [
        "Nutrients Drugs Interaction 3(3-0)",
        "Functional Foods & Nutraceuticals 3(3-0)",
        "Meal Planning & Management 3(2-1)",
        "Nutrition in Emergency 3(3-0)",
        "Nutritional Biochemistry 3(3-0)",
        "Functional Anatomy and Physiology-I 3(2-1)",
      ],
    },
    {
      id: 6,
      title: "Semester 6",
      courses: [
        "Clinical and Therapeutic Nutrition 3(2-1)",
        "Diet Modeling and Counseling 3(1-2)",
        "Vitamins & Minerals in Nutrition 3(3-0)",
        "Biochemistry of Diseases 3(1-2)",
        "Functional Anatomy and Physiology-II 3(2-1)",
        "General Pharmacology 3(3-0)",
      ],
    },
    {
      id: 7,
      title: "Semester 7",
      courses: [
        "Medical Nutrition Therapy 3(2-1)",
        "Nutrition in Exercise & Sports 3(3-0)",
        "Nutritional Deficiency Disorders 3(2-1)",
        "Infant and Young Child Feeding 3(2-1)",
        "Research Projects and Scientific Writing 2(1-1)",
        "Nutrition Policy and Public Health 3(3-0)",
      ],
    },
    {
      id: 8,
      title: "Semester 8",
      courses: ["Internship (Six Month) & Report Writing 10(0-10)"],
    },
  ];

  return (
    <div className={styles.facultyContent}>
      <h2 className={styles.sectionTitle}>Department of Food & Nutrition</h2>

      <h3 className={styles.programTitle}>BS-Human Nutrition & Dietetics</h3>

      <h4 className={styles.subTitle}>Objectives</h4>
      <ul className={styles.overviewText}>
        <li>
          1. To produce competent Nutritionists and Dieticians with adequate
          scientific background to meet the needs of public and private sector,
          organization/industries
        </li>
        <li>
          2.  To provide professional leadership, services and outreach activities
          in the major areas of nutrition and dietetics.
        </li>
        <li>
          3. To develop a diet effective appropriate control of diseases, and
          helpful to boost the human body by natural way through nutrition.
        </li>
        <li>4. To meet the training needs of public and private sector.</li>
        <li>
          5. To produce competent nutritionists and dietitians for different
          organizations in the country.
        </li>
        <li>
          6. To address the issues in different sectors of Food Science, Nutrition
          and Home Economics.
        </li>
      </ul>

      <h4 className={styles.subTitle}>Introduction</h4>
      <p className={styles.overviewText}>
        Under Sargodha Institute of Health Sciences, the Department of Food &
        Nutrition is one of the best in country. The outstanding faculty,
        state-of-the-art building and laboratory facilities, and friendly and
        dedicated staff members make the Department a pleasant place to study
        and conduct research.
      </p>
      <p className={styles.overviewText}>
        <strong>World Class internship experiences in collaboration with:</strong>
        <br />• Punjab Food Authority, Lahore
        <br />• Engro Foods Limited, Karachi
        <br />• Halal Research Council, Pakistan
      </p>
      <p className={styles.overviewText}>
        Our graduate programs offer study leading to Masters of Science and
        Doctor of Philosophy degrees. Graduate students receive in-depth
        training in the core disciplines of food & nutrition, food chemistry,
        food microbiology, food engineering & processing, food safety, food
        service management, human nutrition & textile & clothing.
      </p>

      <h3 className={styles.subTitle}>BS-Human Nutrition & Dietetics 
(4 Years)</h3>

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

export default DepartmentFoodNutrition;
