import React from 'react';
import './Department1hero.css'; // make sure to import the styles

function Department1hero() {
  return (
    <>
      <div
        className="fobspage-hero"
        style={{ backgroundImage: "url('/images/sihsbuilding.jpg')" }}
      >
        <div className="fobsoverlay">
          <h1>Department of Physical Therapy</h1>
        </div>
      </div>
    </>
  );
}

export default Department1hero;
