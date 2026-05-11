import React from "react";
import "../App.css";

const ContactUs = () => {
  const adminEmail = "admin@orphanagedonation.org"; // change this to your real admin mail
  const subject = encodeURIComponent("Query Regarding Donation Platform");
  const body = encodeURIComponent(
    "Hi Admin,\n\nI would like to ask about..."
  );

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="contact-intro">
        Have a question, suggestion, or issue? We’re here to help!
        <br />
        You can easily reach out to our admin team via email.  
        Just click the email link below — it will open your Gmail or default email app
        with the recipient already filled in.  
        You can then type your message and hit **Send**.
      </p>

      <div className="contact-email">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${adminEmail}&su=${subject}&body=${body}`}
          target="_blank"
          rel="noopener noreferrer"
          className="email-link"
        >
          ✉️ {adminEmail}
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
