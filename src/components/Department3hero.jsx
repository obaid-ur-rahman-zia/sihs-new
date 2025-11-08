import React from 'react';
import './Department3hero.css'; // make sure to import the styles

function Department3hero() {
  return (
    <>
      <div
        className="focspage-hero"
        style={{ backgroundImage: "url('/images/sihsbuilding.jpg')" }}
      >
        <div className="focsoverlay">
          <h1>Department of Allied Health Sciences</h1>
        </div>
      </div>
    </>
  );
}

export default Department3hero;
