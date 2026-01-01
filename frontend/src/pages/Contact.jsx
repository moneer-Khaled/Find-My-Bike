import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending email to info@findmybike.com', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow border-0 rounded-4 text-center p-5">
              <div className="mb-4">
                <i className="bi bi-check-circle-fill text-success display-1"></i>
              </div>
              <h2 className="fw-bold mb-3">Thank You!</h2>
              <p className="lead text-muted mb-4">
                We have received your message and will get back to you shortly.
              </p>
              <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border rounded-3 overflow-hidden">
            <div className="card-body p-4">
              <h2 className="fw-bold text-center mb-4 text-primary">
                Contact Us
              </h2>
              <p className="text-muted text-center mb-5 small">
                Have a question or need assistance? Send us a message!
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold small">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold small">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label fw-bold small">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label fw-bold small">
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="d-flex justify-content-center mt-5">
                  <button type="submit" className="btn btn-primary btn-lg fw-bold rounded-3 px-5">
                    Send Message
                  </button>
                </div>
              </form>

              <hr className="my-4 text-muted" />

              <div className="mt-5">
                <div className="row g-4 text-center">
                  {/* Email */}
                  <div className="col-md-4">
                    <div className="p-3 h-100 rounded-3 bg-light bg-opacity-50">
                      <div className="mb-2 text-primary">
                        <i className="bi bi-envelope-fill fs-4"></i>
                      </div>
                      <h6 className="fw-bold small mb-1">Email</h6>
                      <a href="mailto:info@findmybike.com" className="small text-muted mb-0 text-decoration-none stretched-link">info@findmybike.com</a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-md-4">
                    <div className="p-3 h-100 rounded-3 bg-light bg-opacity-50">
                      <div className="mb-2 text-primary">
                        <i className="bi bi-telephone-fill fs-4"></i>
                      </div>
                      <h6 className="fw-bold small mb-1">Phone</h6>
                      <a href="tel:+310201234567" className="small text-muted mb-0 text-decoration-none stretched-link">+31 (0) 20 123-4567</a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="col-md-4">
                    <div className="p-3 h-100 rounded-3 bg-light bg-opacity-50">
                      <div className="mb-2 text-primary">
                        <i className="bi bi-geo-alt-fill fs-4"></i>
                      </div>
                      <h6 className="fw-bold small mb-1">Address</h6>
                      <p className="small text-muted mb-0">Amsterdam, Central, AB 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
