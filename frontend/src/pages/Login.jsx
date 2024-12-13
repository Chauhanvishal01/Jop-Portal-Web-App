import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMailOpenOutline } from "react-icons/io5";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section className="authPage">
        <div className="container login-container">
          <div className="header">
            <h3 className="section-title">Login to your account</h3>
            <form onSubmit={handleLogin}>
              <div className="inputTag">
                <label>Login As</label>
                <div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">--Select Role--</option>
                    <option value="Employer">Login as an Recruiter</option>
                    <option value="Job Seeker">Login as an Job Seeker</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>
              <div className="inputTag">
                <label>Email Address</label>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <IoMailOpenOutline />
                </div>
              </div>
              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input
                    type="password"
                    placeholder="Your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <RiLockPasswordLine />
                </div>
              </div>
              <button type="submit" disabled={loading}>
                Login
              </button>
              <Link to={"/register"}>Register</Link>
            </form>
          </div>
          <div className="authpageImg">
            <img src="/login.png" alt="login Image"/>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
