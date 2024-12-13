import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobsErrors,
  postJob,
  resetJobSlice,
} from "../../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";
const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntorduction] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualification, setQualification] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidate, setHiringMultipleCandidate] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nicheArray = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Cybersecurity Analyst",
    "Cloud Solutions Architect",
    "MERN STACK DEVELOPER",
    "MEAN STACK DEVELOPER",
    "Full-Stack Developer",
    "Front-End Developer",
    "Back-End Developer",
    "DevOps Engineer",
    "Software Developer",
    "AI Researcher",
    "Database Administrator",
    "Mobile App Developer",
    "Web Developer",
    "UI/UX Designer",
    "Systems Analyst",
    "Network Engineer",
    "IT Project Manager",
    "Embedded Systems Engineer",
    "Blockchain Developer",
    "Robotics Engineer",
    "Quality Assurance Tester",
  ];

  const Cities = [
    "Chandigarh",
    "Himachal",
    "Mandi, HP",
    "Noida",
    "Delhi",
    "Bangalore",
    "Ahmedabad",
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Gurgaon",
    "Kolkata",
    "Chennai",
  ];

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostJob = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualification", qualification);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    /*    hiringMultipleCandidate &&
      formData.append("hiringMultipleCandidate", hiringMultipleCandidate);
 */
    formData.append("hiringMultipleCandidate", hiringMultipleCandidate || "No");
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, loading, message]);

  return (
    <>
      <div className="account_components">
        <h3>Post A Job</h3>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
          />
        </div>
        <div>
          <label>Job Type</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">--Select Job Type--</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>
        <div>
          <label>Location (city)</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">--Select Job Type--</option>
            {Cities.map((element, index) => {
              return (
                <option key={index} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
          />
        </div>
        <div>
          <label>Job Introduction</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntorduction(e.target.value)}
            placeholder="Job Introduction"
            rows={7}
          />
        </div>
        <div>
          <label>Responsibilities</label>
          <textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="Job Responsibilities"
            rows={7}
          />
        </div>
        <div>
          <label>Qualifications</label>
          <textarea
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            placeholder="Qualifications for Job"
            rows={7}
          />
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>What we Offer ?</label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <textarea
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
            placeholder="What are we Offering in return"
            rows={7}
          />
        </div>
        <div>
          <label>Job Niche</label>
          <select
            value={jobNiche}
            onChange={(e) => setJobNiche(e.target.value)}
          >
            <option value="">--Select Job Niche--</option>
            {nicheArray.map((element) => {
              return <option value={element}>{element}</option>;
            })}
          </select>
        </div>
        <div>
          <label>Salary</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="eg: 50000"
          />
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>Hiring Multiple Candidate </label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <select
            value={hiringMultipleCandidate}
            onChange={(e) => setHiringMultipleCandidate(e.target.value)}
          >
            <option value="">--Hiring Mulitple Candidates --</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>Personal Website Name </label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <input
            type="text"
            value={personalWebsiteTitle}
            onChange={(e) => setPersonalWebsiteTitle(e.target.value)}
            placeholder="Personal website Name"
          />
        </div>
        <div>
          <div className="label-infoTag-wrapper">
            <label>Personal Website URL </label>
            <span>
              <CiCircleInfo /> Optional
            </span>
          </div>
          <input
            type="text"
            value={personalWebsiteUrl}
            onChange={(e) => setPersonalWebsiteUrl(e.target.value)}
            placeholder="Personal website URL..."
          />
        </div>
        <div>
          <button
            style={{ margin: "0 auto" }}
            className="btn"
            onClick={handlePostJob}
            disabled={loading}
          >
            Post Job
          </button>
        </div>
      </div>
    </>
  );
};

export default JobPost;
