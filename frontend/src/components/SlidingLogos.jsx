import React from "react";

const logos = [
  "/logos/google.png",
  "/logos/microsoft.png",
  "/logos/Amazon.png",
  "/logos/Samsung.png",
  "/logos/hp.jpg",
  "/logos/ibm.png",
  "/logos/Intel.png",
  "/logos/Oracle.jpg",
  "/logos/tcs.svg",
];

const SlidingLogos = () => {
  return (
    <div className="sliding-logos-section">
      <h2 className="section-title">Powering Your Career with Top Brands</h2>
      <div className="logos-container">
        <div className="logos-slide">
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt={`Logo ${index}`}
              className="logo"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidingLogos;
