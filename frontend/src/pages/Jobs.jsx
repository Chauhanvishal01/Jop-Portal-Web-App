import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobsErrors, fetchjobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, SetNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    SetNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobsErrors());
    }
    dispatch(fetchjobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchjobs(city, niche, searchKeyword));
  };
  const handleClearFilters = () => {
    setCity("");
    setSelectedCity("");
    SetNiche("");
    setSelectedNiche("");
    setSearchKeyword("");
    dispatch(fetchjobs("", "", ""));
  };
  const Cities = [
    "Chandigarh",
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

  const nicheArray = [
    "Data Scientist",
    "Machine Learning Engineer",
    "Cybersecurity Analyst",
    "Cloud Solutions Architect",
    "Full Stack Developer",
    "MERN  Developer",
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
    "Blockchain Developer",
    "Robotics Engineer",
    "Quality Assurance Tester",
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              placeholder="Search..."
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <button
                onClick={handleClearFilters}
                className="clear-filters-button"
              >
                Clear Filters
              </button>
              <div className="cities">
                <h2>Filter Job By City</h2>
                {Cities.map((city, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nicheArray.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">Filter By City</option>
                  {Cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => SetNiche(e.target.value)}
                >
                  <option value="">Filter By Niche</option>
                  {nicheArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className="jobs_container
                "
              >
                {jobs.length === 0 ? (
                  <h1>No jobs found...</h1>
                ) : (
                  jobs.map((element) => (
                    <div className="card" key={element._id}>
                      {element.hiringMultipleCandidates === "Yes" ? (
                        <p className="hiring-multiple">
                          Hiring Multiple Candidates
                        </p>
                      ) : (
                        <p className="hiring">Hiring</p>
                      )}
                      <p className="title">{element.title}</p>
                      <p className="company">{element.companyName}</p>
                      <p className="location">{element.location}</p>
                      <p className="salary">
                        {" "}
                        <span>Salary: </span>Rs. {element.salary}
                      </p>
                      <p className="posted">
                        <span>Posted On: </span>
                        {element.jobPostedOn.substring(0, 10)}
                      </p>
                      <div className="btn-wrapper">
                        <Link
                          className="btn"
                          to={`/post/application/${element._id}`}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
