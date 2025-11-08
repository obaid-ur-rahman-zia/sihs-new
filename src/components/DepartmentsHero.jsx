import React from 'react';
import './Department1hero.css'; // reusing the same CSS for consistency

function DepartmentsHero() {
  return (
    <>
      <div
        className="fobspage-hero"
        style={{ backgroundImage: "url('/images/sihsbuilding.jpg')" }}
      >
        <div className="fobsoverlay">
          <h1>Our Departments</h1>
        </div>
      </div>
    </>
  );
}

export default DepartmentsHero;
