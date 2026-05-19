// Contact.jsx

import Navbar from "../components/Navbar";
import "../Contact.css";
import "../App.css";
import fbLogo from "../images/facebook.png";
import mapImage from "../images/loc.jpg";
import logoImage from "../images/logo.png"; // ✅ added for footer
import { Link } from "react-router-dom"; // ✅ needed for footer links

export default function Contact() {
  return (
    <div className="contact-page">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Keeping the community connected, one report at a time.
        </p>
      </div>

      {/* CONTACT SECTION */}
      <div className="contact-container">

        <h2>More questions? Message us!</h2>

        <div className="contact-content">

          {/* LEFT FORM */}
          <div className="contact-form">

            <div className="row">
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Phone number" />
            </div>

            <input
              type="text"
              placeholder="Name"
              className="full-input"
            />

            <textarea
              placeholder="Message"
              rows="8"
            ></textarea>

            <button>Submit</button>

          </div>

          {/* FACEBOOK CARD */}
          <a
            href="https://www.facebook.com/share/14dZ6wUJi9g/"
            target="_blank"
            rel="noreferrer"
            className="facebook-card"
          >
            <div className="fb-top">
              <img src={fbLogo} alt="facebook" />

              <h3>Blgu Tibgao Canaman</h3>
            </div>

            <p>
              Follow us on Facebook
              <br />
              for more updates
            </p>
          </a>

        </div>

        {/* MAP */}
        <div className="map-container">
          <img src={mapImage} alt="map" />
        </div>

      </div>

      {/* FOOTER (ADDED - NO LAYOUT CHANGES) */}
      <footer className="footer">

        <div className="footer-section">
          <img
            src={logoImage}
            alt="Logo"
            style={{ width: "50px", marginBottom: "10px" }}
          />
          <h3>BARANGAY TIBGAO</h3>
          <p>Working together for a safer, cleaner, and better Tibgao.</p>
        </div>

        <div className="footer-section">
          <h4><b> Quick Links </b></h4>

          <Link to="/">Home</Link>
          <a href="#services">Services</a>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-section">
          <h3><b> Follow Us </b></h3>

          <a
            href="https://www.facebook.com/share/14dZ6wUJi9g/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook Page
          </a>

          <h5><b> Address </b></h5>
          <p>Brgy, Multi-purpose Hall, Tibgao, Canaman, Camarines Sur</p>
        </div>

      </footer>

    </div>
  );
}