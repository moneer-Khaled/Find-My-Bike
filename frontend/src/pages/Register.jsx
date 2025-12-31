import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
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
      const res = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      //  Save token
      localStorage.setItem('token', res.data.access);

      navigate('/');
    } catch (err) {
      console.error(err.response?.data);
      alert('Registration failed');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border rounded-3 overflow-hidden">
            <div className="card-body p-5">
              <h2 className="fw-bold text-center mb-4 text-primary">
                Register
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="username"
                    className="form-label fw-bold small"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-bold small">
                    Email
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
                    Register
                  </button>
                </div>

                <div className="text-center small">
                  <span className="text-muted">Already have an account? </span>
                  <Link to="/login" className="text-decoration-none fw-bold">
                    Sign in
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

export default Register;
