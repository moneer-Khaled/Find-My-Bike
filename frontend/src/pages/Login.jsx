import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import { getApiUrl } from '../apiConfig';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use generic API URL
      const res = await fetch(getApiUrl('/api/auth/login/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        const userObj = {
          name: formData.email.split('@')[0],
          email: formData.email,
        };
        localStorage.setItem('user', JSON.stringify(userObj));

        window.dispatchEvent(new Event('storage'));
        navigate('/dashboard');
      } else {
        alert('Login Failed: ' + (data.detail || 'Invalid credentials'));
      }
    } catch (err) {
      console.error('Login Error:', err);
      alert('Could not connect to server.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border rounded-3 overflow-hidden">
            <div className="card-body p-5">
              <h2 className="fw-bold text-center mb-4 text-primary">
                Login to FindMyBike
              </h2>
              <form onSubmit={handleSubmit}>
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
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label fw-bold small"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary py-2 fw-bold rounded-3 px-5"
                  >
                    Login
                  </button>
                </div>

                <div className="text-center small">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/register" className="text-decoration-none fw-bold">
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
