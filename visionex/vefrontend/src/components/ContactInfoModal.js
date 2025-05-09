import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaBook } from 'react-icons/fa';
import './ContactInfoModal.css';

const ContactInfoModal = ({ show, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send form data to your backend here
    onClose();
  };

  if (!show) return null;

  return (
    <div className="contact-modal-overlay">
      <div className="contact-modal">
        <button className="contact-modal-close" onClick={onClose}>×</button>
        <h2 className="contact-modal-title">Start Your University Journey with StudyFans</h2>
        <form onSubmit={handleSubmit}>
          <div className="contact-input-group">
            <FaUser className="contact-input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-input-group">
            <FaEnvelope className="contact-input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="contact-input-group">
            <span className="contact-flag">🇹🇷 +90</span>
            <input
              type="tel"
              name="phone"
              placeholder="Your phone number"
              value={form.phone}
              onChange={handleChange}
              required
              style={{ paddingLeft: 60 }}
            />
          </div>
          <div className="contact-input-group">
            <FaBook className="contact-input-icon" />
            <input
              type="text"
              name="specialization"
              placeholder="Your major"
              value={form.specialization}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="contact-modal-btn">Register Now</button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfoModal;
