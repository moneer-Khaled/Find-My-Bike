import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const checkStorage = () => {
      const u = localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener('storage', checkStorage);
    return () => window.removeEventListener('storage', checkStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    setUser(null);
    navigate('/login');
  };

  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'text-decoration-none fw-bold text-primary'
      : 'text-decoration-none text-secondary fw-medium';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center">
          <img
            src="/bike.svg"
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }}
          />
          FindMyBike
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto align-items-center gap-3 gap-lg-4 mt-3 mt-lg-0">
            <Link to="/" className={getLinkClass('/')}>
              Home
            </Link>
            <Link to="/contact" className={getLinkClass('/contact')}>
              Contact
            </Link>
            {user ? (
              <>
                <Link to="/report" className={getLinkClass('/report')}>
                  Report Missing
                </Link>
                <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`text-decoration-none fw-bold ${location.pathname === '/profile' ? 'text-primary' : 'text-secondary'}`}
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={getLinkClass('/login')}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-secondary px-4 rounded-3"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
