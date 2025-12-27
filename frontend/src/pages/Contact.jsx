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

                <div className="d-grid mb-4">
                  <button type="submit" className="btn btn-secondary py-2">
                    Send Message
                  </button>
                </div>
              </form>

              <hr className="my-4 text-muted" />

              <div className="mt-4">
                <h6 className="fw-bold mb-3">Our Contact Details</h6>
                <div className="d-flex align-items-center mb-2 small text-muted">
                  <i className="bi bi-envelope-fill me-2"></i>
                  info@findmybike.com
                </div>
                <div className="d-flex align-items-center mb-2 small text-muted">
                  <i className="bi bi-telephone-fill me-2"></i>
                  +31 (0) 20 123-4567
                </div>
                <div className="d-flex align-items-center small text-muted">
                  <i className="bi bi-geo-alt-fill me-2"></i>
                  Amsterdam, Central, AB 12345
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
