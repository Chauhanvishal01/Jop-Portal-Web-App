import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

const HowItWorks = () => {
  return (
    <section className="howItWorks">
      <div className="container">
        <h3 className="section-title">How It Works</h3>
        <div className="cards">
          <div className="card">
            <div className="icon-container">
              <FiUserPlus className="icon" />
            </div>
            <h4>Create an Account</h4>
            <p>
              Sign up by providing your details, set up your profile, and get started with job hunting or posting your opportunities.
            </p>
          </div>
          <div className="card">
            <div className="icon-container">
              <FaTasks className="icon" />
            </div>
            <h4>Find or Post Jobs</h4>
            <p>
              Explore job listings that match your skills or post job openings. Use our tools to manage and streamline your job search or hiring process.
            </p>
          </div>
          <div className="card">
            <div className="icon-container">
              <AiFillLike className="icon" />
            </div>
            <h4>Apply or Hire</h4>
            <p>
              Easily apply for jobs or find the right candidates. Our platform simplifies the application and hiring process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
