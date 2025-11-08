import React, { useEffect } from "react";
import "./SmcNumber.css";

function SmcNumber() {
  useEffect(() => {
    const numbersSection = document.querySelector(".smc-numbers-section");
    const numberValues = document.querySelectorAll(".number-value");
    let hasAnimated = false;

    function animateNumbers() {
      if (hasAnimated) return;
      const sectionTop = numbersSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight && sectionTop > -numbersSection.offsetHeight) {
        numberValues.forEach((valueElement) => {
          const target = parseInt(valueElement.dataset.target);
          let current = 0;
          const increment = Math.ceil(target / 100);
          const hasPlus = valueElement.querySelector(".plus-sign");

          const timer = setInterval(() => {
            current += increment;
            if (current < target) {
              valueElement.textContent = current;
            } else {
              valueElement.textContent = target;
              if (hasPlus) valueElement.textContent += "+";
              valueElement.classList.add("animate");
              clearInterval(timer);
            }
          }, 20);
        });
        hasAnimated = true;
        window.removeEventListener("scroll", animateNumbers);
      }
    }

    animateNumbers();
    window.addEventListener("scroll", animateNumbers);
    return () => window.removeEventListener("scroll", animateNumbers);
  }, []);

  return (
    <div className="smc-numbers-section">
      <div className="smc-container">
        <h2 className="smc-numbers-title">SIHS IN NUMBERS</h2>
        <div className="smc-numbers-row">
          <div className="smc-number-box">
            <div className="number-item">
              <div className="number-value" data-target="600">0</div>
              <div className="number-label">Enrolled Students</div>
            </div>
          </div>
          <div className="smc-number-box">
            <div className="number-item">
              <div className="number-value" data-target="1500">0</div>
              <div className="number-label">Alumni</div>
            </div>
          </div>
          <div className="smc-number-box">
            <div className="number-item">
              <div className="number-value" data-target="150">0<span className="plus-sign">+</span></div>
              <div className="number-label">Faculty</div>
            </div>
          </div>
          <div className="smc-number-box">
            <div className="number-item">
              <div className="number-value" data-target="19">0</div>
              <div className="number-label">Years of Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmcNumber;
