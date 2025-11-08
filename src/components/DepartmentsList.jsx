import React from "react";
import { Link } from "react-router-dom";
import "./DepartmentsList.css";

function DepartmentsList() {
  const departments = [
    {
      name: "Physical Therapy",
      path: "/department-of-physical-therapy",
      img: "../images/sihsbuilding.jpg",
    },
    {
      name: "Allied Health Sciences",
      path: "/department-of-allied-health-sciences",
      img: "../images/sihsbuilding.jpg", 
    },
    {
      name: "Food & Nutrition Sciences",
      path: "/department-of-food-and-nutrition-sciences",
      img: "../images/sihsbuilding.jpg",
    },
    {
      name: "Applied Sciences",
      path: "/department-of-applied-sciences",
      img: "../images/sihsbuilding.jpg", 

    },
    
  ];

  return (
    <div className="departments-list">
      <h2>Explore Our Departments</h2>
      <div className="departments-grid">
        {departments.map((dept, index) => (
          <div key={index} className="department-card">
            <div className="card-image">
              <img src={dept.img} alt={dept.name} />
            </div>
            <div className="card-content">
              <h3>{dept.name}</h3>
              <Link to={dept.path} className="department-link">
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DepartmentsList;
