import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationsErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );
  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  const splitString = (str) => {
    if (typeof str === "string") {
      // Split only on ". " and ensure empty strings are removed
      return str.split(".").filter(Boolean);
    }
    return [];
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }

    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }

    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, jobId, message, user]);

  let qualification = [];
  let responsibilities = [];
  let offers = [];

  if (singleJob.qualification) {
    qualification = splitString(singleJob.qualification);
  }

  if (singleJob.responsibilities) {
    responsibilities = splitString(singleJob.responsibilities);
  }

  if (singleJob.offers) {
    offers = splitString(singleJob.offers);
  }
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (
    <>
      <article className="application_page">
        <form>
          <h3>Application Form</h3>
          <div>
            <label>Job Title</label>
            <input type="text" placeholder={singleJob.title} disabled />
          </div>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {user && user.role === "Job Seeker" && (
            <>
              <div>
                <label>Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                />
              </div>
              <div>
                <label>Resume</label>
                <input type="file" onChange={resumeHandler} />
              </div>
            </>
          )}
          {!isAuthenticated && (
            <div className="try_login">
              <h1 className="cta">Login To Continue</h1>
              <Link
                to={"/login"}
                className="outline_btn"
                style={{ textAlign: "center" }}
              >
                Login
              </Link>
            </div>
          )}
          {isAuthenticated && user.role === "Job Seeker" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
        </form>

        <div className="job-details">
          <header>
            <h3>{singleJob.title}</h3>
            {singleJob.personalWebsite && (
              <Link to={singleJob.personalWebsite.url} target="_blank">
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p>{singleJob.location}</p>
            <p>Rs. {singleJob.salary} monthly</p>
          </header>
          <hr />
          <section>
            <div className="wrapper">
              <h3>Job Details</h3>
              <div>
                <IoMdCash />
                <div>
                  <span>Pay</span>
                  <span>{singleJob.salary} monthly</span>
                </div>
              </div>
              <div>
                <FaToolbox />
                <div>
                  <span>Job Type</span>
                  <span>{singleJob.jobType} </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Location</h3>
              <div className="location-wrapper">
                <FaLocationDot />
                <span>{singleJob.location}</span>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Full Job Description</h3>
              <p>{singleJob.introduction}</p>
              {singleJob.qualification && (
                <div>
                  <h4>Qualification</h4>
                  <ul>
                    {qualification.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "outside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div>
                  <h4>Responsibilities</h4>
                  <ul>
                    {responsibilities.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "outside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.offers && (
                <div>
                  <h4>Offers</h4>
                  <ul>
                    {offers.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "outside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3>Job Niche</h3>
            <p>{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  );
};

export default PostApplication;
