import React from 'react';
import './Department2hero.css'; // make sure to import the styles

function Department2hero() {
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

export default Department2hero;
