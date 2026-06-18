import React from "react";
import "../styles/global.css";

const Contact = () => {
  return (
    <div className="contact-page">

      {/* HEADER */}
      <div className="contact-header">
        <h1>Contact Our Team</h1>
        <p>
          Have questions about our premium fleet? Our team is ready to
          assist with your car rental needs.
        </p>
      </div>

      {/* CONTACT CONTAINER */}
      <div className="contact-container">

        {/* LEFT INFO CARD */}
        <div className="info-card glass">

          <div className="card-title">
            📍 <span>Contact Information</span>
          </div>

          <div className="info-box">
            <span>📱</span>
            <div>
              <h4>WhatsApp</h4>
              <p>+91 8299431275</p>
            </div>
          </div>

          <div className="info-box">
            <span>📧</span>
            <div>
              <h4>Email</h4>
              <p>contact@hexagonservices.com</p>
            </div>
          </div>

          <div className="info-box">
            <span>🕒</span>
            <div>
              <h4>Working Hours</h4>
              <p>Mon - Sat: 8AM - 8PM</p>
              <p>Sunday: 10AM - 6PM</p>
            </div>
          </div>

          <div className="offer-box">
            🎁 <b>Special Offer</b>
            <p>Book 3+ days & get 10% OFF</p>
          </div>

        </div>

        {/* RIGHT FORM CARD */}
        <div className="form-card glass">

          <div className="card-title">
            ✈️ <span>Send Inquiry</span>
          </div>

          <p className="form-subtitle">
            Fill the form and we’ll respond within 24 hours
          </p>

          <form>

            <div className="row">

              <div className="input-box">
                <span>👤</span>
                <input type="text" placeholder="Full Name" />
              </div>

              <div className="input-box">
                <span>📧</span>
                <input type="email" placeholder="Email Address" />
              </div>

            </div>

            <div className="row">

              <div className="input-box">
                <span>📞</span>
                <input type="text" placeholder="Phone Number" />
              </div>

              <div className="input-box">
                <span>🚘</span>
                <select>
                  <option>Select Car Type</option>
                  <option>SUV</option>
                  <option>Sedan</option>
                  <option>Luxury</option>
                  <option>Sports</option>
                </select>
              </div>

            </div>

            <div className="textarea-box">
              <textarea placeholder="Tell us about your rental needs..." />
            </div>

            <button type="submit" className="send-btn">
              Send Message →
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default Contact;