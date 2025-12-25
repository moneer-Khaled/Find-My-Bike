import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Column 1: Brand/About */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">FindMyBike</h5>
            <p className="small text-white-50">
              Helping the Dutch community recover stolen bicycles through
              crowd-sourced reporting and tracking.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Report Stolen Bike
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  Contact
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-white-50">
                  My Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold mb-3">Resources</h5>
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

          {/* Column 4: Contact */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold mb-3">Contact</h5>
            <p className="small text-white-50 mb-1">
              <i className="bi bi-envelope me-2"></i>support@findmybike.com
            </p>
            <p className="small text-white-50 mb-3">
              <i className="bi bi-telephone me-2"></i>+31 (0) 20 123 4567
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
