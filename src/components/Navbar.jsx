import { Link } from "react-router-dom";
import logoImage from "../images/logo.png";
import "../styles.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* LOGO SECTION */}
      <div className="logo-section">
        <img
          src={logoImage}
          alt="Tibgao logo"
          className="logo"
        />

        <div>
          <h2>TIBGAO</h2>
          <p>eReport</p>
        </div>
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <p><Link to="/">Home</Link></p>

        <p>
          <a href="/#services">Services</a>
        </p>

        <p><Link to="/about">About Us</Link></p>
        <p><Link to="/contact">Contact Us</Link></p>
      </div>

      {/* AUTH BUTTONS */}
      <div className="nav-buttons">
        <Link to="/login" className="login-btn">Log in</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>

    </nav>
  );
}

export default Navbar;