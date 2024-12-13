import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import {
  clearAllJobsErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../../store/slices/jobSlice";
const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobsErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, message, error]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You Have Not Posted Any Job!
        </h1>
      ) : (
        <>
          <div className="account_components">
            <h3>My Jobs</h3>
            <div className="applications_container">
              {myJobs.map((element) => (
                <div className="card" key={element._id}>
                  <p className="sub-sec">
                    <span>Job Title : </span>
                    {element.title}
                  </p>
                  <p className="sub-sec">
                    <span>Job Niche</span>
                    {element.jobNiche}
                  </p>
                  <p className="sub-sec">
                    <span>Salary: </span> {element.salary}
                  </p>
                  <p className="sub-sec">
                    <span>Location : </span> {element.location}
                  </p>
                  <p className="sub-sec">
                    <span>Job Type:</span> {element.jobType}
                  </p>
                  <p className="sub-sec">
                    <span>Company Name:</span> {element.companyName}
                  </p>
                  <p className="sub-sec">
                    <span>Introduction:</span> {element.introduction}
                  </p>
                  <p className="sub-sec">
                    <span>Qaulifications:</span> {element.qualifications}
                  </p>
                  <p className="sub-sec">
                    <span>Responsibilities:</span> {element.responsibilities}
                  </p>
                  {element.offers && (
                    <p className="sub-sec">
                      <span>What are we offering: </span> {element.offers}
                    </p>
                  )}
                  <button
                    className="btn"
                    style={{marginTop:"20px"}}
                    onClick={() => handleDeleteJob(element._id)}
                  >
                    Delete Job
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyJobs;
