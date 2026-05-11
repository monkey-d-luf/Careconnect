import React from "react";
import "../App.css"; // main stylesheet;
import child from "../assets/images/children.jpg";
import seniors from "../assets/images/seniors.jpg";
import volunteers from "../assets/images/volunteers.jpg";
import { useState } from "react";

const HomePage = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="homepage">

      {/* Hero Section */}
    
      <section className="hero">
        <div className="overlay">
        <h2>Support Orphanages and Old Age Homes – Make a Difference Today</h2>
        <button onClick={() => (window.location.href = "/browse")}
        className="donate-btn">Donate Now</button>
        </div>
      </section>
    

      {/* Featured Stories */}
      <section className="featured">
        <h3>Featured Stories</h3>
        <div className="featured-grid">
          <div className="feature-card">
            <img src={child} alt="Children" />
            <h4>Bringing Joy to Children's Lives</h4>
            <p>
              Your donations help us provide education, care, and a loving
              environment for children in need.
            </p>
          </div>
          <div className="feature-card">
            <img src={seniors} alt="Seniors" />
            <h4>Providing Comfort to Seniors</h4>
            <p>
              Support our efforts to ensure seniors receive the care,
              companionship, and dignity they deserve.
            </p>
          </div>
          <div className="feature-card">
            <img src={volunteers} alt="Volunteers" />
            <h4>Volunteers Making a Difference</h4>
            <p>
              Join our volunteer team and help us create a positive impact on
              the lives of children and seniors.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a className="footer-link" onClick={() => setShowPrivacy(true)}>Privacy Policy</a>
          <a className="footer-link" onClick={() => setShowTerms(true)}>Terms of Service</a>
          <a href="/contact">Contact Us</a>
        </div>

        <div className="social-icons">
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-facebook"></i>
        </div>
        {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="modal-overlay" onClick={() => setShowPrivacy(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Privacy Policy</h2>
            <p>
              We value your privacy and are committed to protecting your personal data.
              Any information you provide during registration or donation is stored securely
              and used only for legitimate platform purposes.
            </p>
            <ul>
              <li>We never sell or share your data with third parties.</li>
              <li>Payment details are processed through secure, encrypted channels.</li>
              <li>You can request deletion of your data anytime by contacting the admin.</li>
            </ul>
            <button className="close-btn" onClick={() => setShowPrivacy(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTerms && (
        <div className="modal-overlay" onClick={() => setShowTerms(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Terms of Service</h2>
            <p>
              By using this platform, you agree to our terms and conditions designed to ensure
              fair use and transparency between donors and organizations.
            </p>
            <ul>
              <li>All donations are voluntary and non-refundable.</li>
              <li>Organizations must post only genuine and verified requests.</li>
              <li>Users must maintain respectful communication on the platform.</li>
            </ul>
            <button className="close-btn" onClick={() => setShowTerms(false)}>
              Close
            </button>
          </div>
        </div>
      )}
        <p className="footer-copy">© 2025 CareConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
