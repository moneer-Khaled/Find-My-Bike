import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        username: formData.email,
        password: formData.password,
      });

      //  SAVE TOKEN
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      navigate('/');
    } catch (err) {
      console.error(err.response?.data);
      alert('Login failed');
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
              <p className="text-muted text-center mb-5 small">
                Enter your credentials to access your account.
              </p>

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

                <div className="d-grid mb-4">
                  <button type="submit" className="btn btn-secondary py-2">
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
