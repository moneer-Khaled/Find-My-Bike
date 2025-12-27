import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3.">
        <div className="container">
          <Link
            to="/"
            className="navbar-brand fw-bold d-flex align-items-center"
          >
            <img
              src="/bike.svg"
              alt="FindMyBike Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            FindMyBike
          </Link>
          <div className="ms-auto d-flex align-items-center gap-4">
            <Link
              to="/"
              className="text-decoration-none text-secondary fw-medium"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-decoration-none text-secondary fw-medium"
            >
              Contact
            </Link>
            <Link
              to="/report"
              className="text-decoration-none text-secondary fw-medium"
            >
              Report Missing
            </Link>
            <a
              href="#"
              className="text-decoration-none text-secondary fw-medium"
            >
              Dashboard
            </a>
            <Link
              to="/login"
              className="text-decoration-none text-secondary fw-medium"
            >
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary px-4 rounded-3">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
