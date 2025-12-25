import React from 'react';

const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3.">
        <div className="container">
          <a
            href="/"
            className="navbar-brand fw-bold d-flex align-items-center"
          >
            <img
              src="./bike.svg"
              alt="FindMyBike Logo"
              style={{ height: '40px', marginRight: '10px' }}
            />
            FindMyBike
          </a>
          <div className="ms-auto d-flex align-items-center gap-4">
            <a
              href="#"
              className="text-decoration-none text-secondary fw-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-decoration-none text-secondary fw-medium"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-decoration-none text-secondary fw-medium"
            >
              Report Missing
            </a>
            <a
              href="#"
              className="text-decoration-none text-secondary fw-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-decoration-none text-secondary fw-medium"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;
