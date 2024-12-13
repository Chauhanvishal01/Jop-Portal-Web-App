import React from "react";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Discover Your <span className="textBlue hero-title">Dream</span>  Job</h1>
        <h4 className="hero-subtitle">
          Find top employers, explore exciting job listings, and take the next
          step in your career journey.
        </h4>
        <div className="hero-box">
          <p className="hero-description">
            Welcome to <span className="textBlue">JobLinker</span> , your premier destination for career
            advancement. Whether you're starting out, changing <span className="textBlue">careers</span>  , or
            aiming for the top, we offer extensive job listings, valuable
            insights, and connections with leading employers. Start your path to
            success with <span className="textBlue">JobLinker</span>  today!
          </p>
          <div className="hero-button-container">
            <Link to={"/jobs"} className="hero-button">
              Explore JOBS
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-background">
        <img
          src="https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
