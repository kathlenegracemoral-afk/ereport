import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../About.css";
import "../App.css";
import missionImg from "../images/mission.png";
import visionImg from "../images/vision.png";
import logoImage from "../images/logo.png";
import fasterImg from "../images/faster.png";
import accessibleImg from "../images/accessible.png";
import organizedImg from "../images/organized.png";
import communicationImg from "../images/communication.png";
import saferImg from "../images/safer.png";

function About() {
  return (
    <div className="about-page">

      <Navbar />

      <section className="about-hero">

        <div className="hero-overlay">

          <h1><b>About Us</b></h1>

          <p>
            The Tibgao eReport System is an online platform designed to help
            users residents and non-residents report incidents, concerns, complaints, and community
            issues quickly and conveniently. Our goal is to improve
            communication between the barangay and the community through
            accessible digital reporting.
          </p>

        </div>

        <div className="wave"></div>

      </section>

      {/* MISSION & VISION */}
      <section className="mission-vision">

        <div className="mission-box">

          <img src={missionImg} alt="Mission" />

          <h2><b>Our Mission</b></h2>

          <p>
            Our mission is to create a safer, more responsive,
            and connected community by providing resident and non-residents
            with an easy and reliable way to report local concerns.
          </p>

        </div>

        <div className="vision-box">

          <img src={visionImg} alt="Vision" />

          <h2><b>Our Vision</b></h2>

          <p>
            We envision a community where every resident and non-resident
            has a voice and where concerns are addressed
            efficiently through transparent and
            technology-driven services.
          </p>

        </div>

      </section>

      <section className="quote-section">
        <h3>“Connecting Community Through Technology.”</h3>
      </section>

      {/* WHY CHOOSE */}
      <section className="why-section">

        <h2><b>Why Choose eReport?</b></h2>

        <div className="why-grid">

          <div className="why-card">
            <img src={fasterImg} alt="" />
            <h3>Faster Reporting Process</h3>
          </div>

          <div className="why-card">
            <img src={accessibleImg} alt="" />
            <h3>Accessible Anytime <br /> and Anywhere</h3>
          </div>

          <div className="why-card">
            <img src={organizedImg} alt="" />
            <h3>Organized Complaint <br /> Management</h3>
          </div>

          <div className="why-card">
            <img src={communicationImg} alt="" />
            <h3>Improved Communication <br /> with Community</h3>
          </div>

          <div className="why-card safer-card">
            <img src={saferImg} alt="" />
            <h3>Safer and more Responsive <br /> Community Service</h3>
          </div>

        </div>

      </section>

      {/* PRIVACY */}
      <section className="privacy-section">

        <h2>Privacy & Confidentiality</h2>

        <p>
          All submitted reports and personal information
          are handled with confidentiality and used only
          for legitimate barangay services and investigations.
        </p>

      </section>

      {/* FAQ */}
      <section className="faq-section">

        <div className="faq-left">

          <p className="faq-small">FAQ</p>

          <h2>Frequently Asked Question</h2>

          <p>Here are some common questions about our services</p>

         <Link to="/contact">
  <button>Contact Us</button>
</Link>

        </div>

        <div className="faq-right">

          {/* FAQ 1 */}
          <div className="faq-item">
            <input type="checkbox" id="faq1" />

            <label htmlFor="faq1" className="faq-question">
              <span>How do I submit a report?</span>
              <span className="arrow">⌃</span>
            </label>

            <div className="faq-answer">
              <p>
                You can submit a report by filling out
                the report form on the website.
                Provide details such as the incident
                type, description, location, date,
                and any supporting evidence if available.
              </p>
            </div>
          </div>

          {/* FAQ 2 */}
          <div className="faq-item">
            <input type="checkbox" id="faq2" />

            <label htmlFor="faq2" className="faq-question">
              <span>What types of reports are accepted?</span>
              <span className="arrow">⌃</span>
            </label>

            <div className="faq-answer">
              <p>
                The system accepts reports such as
                community disturbances, safety concerns,
                illegal activities, infrastructure issues,
                and other barangay-related complaints.
              </p>
            </div>
          </div>

          {/* FAQ 3 */}
          <div className="faq-item">
            <input type="checkbox" id="faq3" />

            <label htmlFor="faq3" className="faq-question">
              <span>How long does it take for a report to be addressed?</span>
              <span className="arrow">⌃</span>
            </label>

            <div className="faq-answer">
              <p>
                Response time may vary depending on
                the severity and nature of the report.
                Urgent cases are prioritized and handled
                as soon as possible by barangay officials.
              </p>
            </div>
          </div>

          {/* FAQ 4 */}
          <div className="faq-item">
            <input type="checkbox" id="faq4" />

            <label htmlFor="faq4" className="faq-question">
              <span>How can I check the status of my report?</span>
              <span className="arrow">⌃</span>
            </label>

            <div className="faq-answer">
              <p>
                If you submitted your report with contact
                details, you can check its status through
                the “Track Report” section of the website.
              </p>
            </div>
          </div>

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
          <h4><b>Quick Links</b></h4>

          <Link to="/">Home</Link>
          <Link to="/">Services</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-section">
          <h3><b>Follow Us</b></h3>

          <a
            href="https://www.facebook.com/share/14dZ6wUJi9g/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook Page
          </a>

          <h5><b>Address</b></h5>
          <p>Brgy, Multi-purpose Hall, Tibgao, Canaman, Camarines Sur</p>
        </div>

      </footer>

    </div>
  );
}

export default About;