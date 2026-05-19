import { Link } from "react-router-dom";
import "../App.css";
import logoImage from "../images/logo.png";
import loc from "../images/loc.jpg";
import aboutBg from "../images/about-bg.jpg"; // ✅ FIXED (replaced require)

function Home() {
  return (
    <div className="app">

      {/* HEADER */}
      <header className="navbar">

        <div className="logo-section">
          <img
            src={logoImage}
            alt="Tibgao logo"
            className="logo"
          />

          <div>
            <h2>TIBGAO</h2>
            <p>eREPORT</p>
          </div>
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#services">Services</a>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>

        {/* AUTH BUTTONS */}
        <div className="auth-buttons">

          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>

          <Link to="/signup">
            <button className="signup-btn">Sign Up</button>
          </Link>

        </div>

      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
          <h1>
            <b>
              Report Today,
              <br />
              Improve Tomorrow
            </b>
          </h1>

          <p>
            Submit concerns and help improve
            <br />
            the Tibgao community.
          </p>

          <div className="hero-buttons">

            <a href="#services">
              <button className="submit-btn">
                Explore Services
              </button>
            </a>

            <Link to="/contact">
              <button className="track-btn">
                Contact Us
              </button>
            </Link>

          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="incidents">
        <h2><b><center>Services</center></b></h2>

        <div className="cards">

          <div className="card teal-card">
            <h3>Incident Reporting</h3>
            <p>Report incidents and unusual situations happening in the barangay.</p>

            <Link to="/login">
              <button className="card-btn">File a Report</button>
            </Link>
          </div>

          <div className="card teal-card">
            <h3>Complaint Filing</h3>
            <p>File complaints about issues or concerns in the community.</p>

            <Link to="/login">
              <button className="card-btn">File a Complaint</button>
            </Link>
          </div>

          <div className="card teal-card">
            <h3>Status Tracking</h3>
            <p>Track updates and progress of submitted reports.</p>

            <Link to="/login">
              <button className="card-btn">Track Status</button>
            </Link>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION (FIXED) */}
      <section
        className="about-preview"
        style={{
          backgroundImage: `url(${aboutBg})`, // ✅ FIXED
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          padding: "100px 70px",
          textAlign: "center",
          color: "white"
        }}
      >

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)"
          }}
        ></div>

        <h2 style={{ position: "relative", fontSize: "42px" }}>
          About Us
        </h2>

        <p
          style={{
            position: "relative",
            maxWidth: "800px",
            margin: "20px auto",
            fontSize: "18px"
          }}
        >
          Tibgao eReport is a digital community reporting system that allows residents and non-residents to submit incident reports, file complaints,
          and track their status in real time, provided that the incident occurs within Tibgao.
          It enhances communication between the community and local authorities, promoting a safer and more efficient barangay management system.
        </p>

        <Link to="/about" style={{ position: "relative" }}>
          <button
            style={{
              background: "#0d5c4f",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
          >
            See More
          </button>
        </Link>

      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <h2><b> Contact Us </b></h2>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />

          <div className="contact-row">
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Your Phone Number" />
          </div>

          <textarea placeholder="Your Message" rows="5"></textarea>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-image-container">
          <img
            src={loc}
            alt="Contact"
            className="contact-image"
          />
        </div>
      </section>

      {/* FOOTER */}
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

export default Home;