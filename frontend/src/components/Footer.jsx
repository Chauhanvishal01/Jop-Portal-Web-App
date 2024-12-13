import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaLinkedin,
  FaSquareFacebook,
} from "react-icons/fa6";
const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer>
        <div></div>
        <div>
          <h4>Suppot</h4>
          <ul>
            <li>vishalchauhan@email.com</li>
            <li>+91 9876543210</li>
          </ul>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to={"/"}>
                <span>
                  <FaSquareXTwitter />
                </span>{" "}
                <span>X</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaSquareInstagram />
                </span>{" "}
                <span>Instagram</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaSquareFacebook />
                </span>{" "}
                <span>Facebook</span>
              </Link>
            </li>
            <li>
              <Link to={"/"}>
                <span>
                  <FaLinkedin />
                </span>{" "}
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
