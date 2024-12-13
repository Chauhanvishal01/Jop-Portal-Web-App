import React from "react";

const Categories = () => {
  return (
    <>
      <div className="job-categories-section">
        <h2 className="section-title">Job Categories</h2>
        <div className="categories-container">
          <div className="category-card">
            <img src="/software.jpg" alt="Software Development Jobs" />
            <h3>Software Development</h3>
            <p>Explore jobs in software development</p>
          </div>
          <div className="category-card">
            <img src="dataScience.jpg" alt="Data Science Jobs" />
            <h3>Data Science</h3>
            <p>Find jobs in data science</p>
          </div>
          <div className="category-card">
            <img src="security.jpg" alt="Cybersecurity Jobs" />
            <h3>Cybersecurity</h3>
            <p>Discover jobs in cybersecurity</p>
          </div>
          <div className="category-card">
            <img src="it.jpg" alt="IT Support Jobs" />
            <h3>IT Support</h3>
            <p>Explore jobs in IT support</p>
          </div>
          {/* Web Development Category */}
          <div className="category-card">
            <img src="webdev.jpg" alt="Web Development Jobs" />
            <h3>Web Development</h3>
            <p>Explore jobs in web development</p>
          </div>
          {/* AI and Machine Learning Category */}
          <div className="category-card">
            <img src="aiml.jpg" alt="AI and Machine Learning Jobs" />
            <h3>AI & Machine Learning</h3>
            <p>Explore jobs in AI and Machine Learning</p>
          </div>
          {/* DevOps Category */}
          <div className="category-card">
            <img src="devops.jpg" alt="DevOps Jobs" />
            <h3>DevOps</h3>
            <p>Discover jobs in DevOps</p>
          </div>
          {/* Cloud Computing Category */}
          <div className="category-card">
            <img src="cloud.jpg" alt="Cloud Computing Jobs" />
            <h3>Cloud Computing</h3>
            <p>Explore jobs in cloud computing</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
