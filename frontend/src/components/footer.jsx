import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold d-flex align-items-center">
              <img
                src="/bike.svg"
                alt="Logo"
                style={{
                  height: '24px',
                  marginRight: '10px',
                }}
              />
              FindMyBike
            </h5>
            <p className="small text-white-50 mt-3">
              Helping the Dutch community recover stolen bicycles through
              crowd-sourced reporting and tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold mb-3" style={{ color: '#667eea' }}>
              Quick Links
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-white-50">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/report"
                  className="text-decoration-none text-white-50"
                >
                  Report Stolen Bike
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/contact"
                  className="text-decoration-none text-white-50"
                >
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  My Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold mb-3" style={{ color: '#667eea' }}>
              Resources
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Bike Theft Statistics
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Prevention Tips
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Police Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold mb-3" style={{ color: '#667eea' }}>
              Contact
            </h5>
            <p className="small text-white-50 mb-3">
              <i className="bi bi-geo-alt me-2"></i>Amsterdam, Central, AB 12345
            </p>
            <p className="small text-white-50 mb-3">
              <i className="bi bi-telephone me-2"></i>+31 (0) 20 123-4567
            </p>

            <p className="small text-white-50 mb-3">
              <i className="bi bi-envelope me-2"></i>info@findmybike.com
            </p>

            <div className="d-flex gap-3 mt-3">
              <a
                href="https://x.com/"
                className="text-white-50 text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                className="text-white-50 text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://www.facebook.com/"
                className="text-white-50 text-decoration-none"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-facebook"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center small text-white-50 mb-0">
          &copy; 2025 FindMyBike. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
