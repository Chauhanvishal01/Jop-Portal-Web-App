import React from "react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="notfound">
      <div className="content">
        <img src="/notfound.png" alt="notFoundImg" />
        <Link to={"/"} className="btn">
          Back to home Page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
