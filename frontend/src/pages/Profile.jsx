import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Updating password...', passwords);
    alert('Password updated successfully! (Mock)');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          {/* Main Card */}
          <div className="card shadow border-0 rounded-4 overflow-hidden">
            <div className="card-body p-5">
              <h2 className="text-center fw-bold text-primary mb-4">
                My Profile
              </h2>
              <p className="text-muted text-center mb-5 small">
                Manage your account details and preferences.
              </p>

              {/* Avatar */}
              <div className="text-center mb-5">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10"
                  style={{ width: '100px', height: '100px' }}
                >
                  <i className="bi bi-person-fill display-1 text-primary"></i>
                </div>
              </div>

              {/* Account Info */}
              <div className="mb-5">
                <h5 className="fw-bold mb-3 text-primary">
                  <i className="bi bi-person-fill me-2"></i>Account Info
                </h5>

                <div className="mb-3">
                  <label className="small text-muted fw-bold mb-1">
                    USERNAME
                  </label>
                  <p className="fw-bold mb-0">{user.name || 'Guest'}</p>
                </div>

                <div className="mb-0">
                  <label className="small text-muted fw-bold mb-1">
                    EMAIL ADDRESS
                  </label>
                  <p className="fw-bold mb-0 d-flex align-items-center gap-2">
                    <i className="bi bi-envelope-fill text-primary"></i>
                    {user.email || 'guest@example.com'}
                  </p>
                </div>
              </div>

              <hr className="my-4 text-muted" />

              {/* Change Password Form */}
              <div className="mt-4">
                <h5 className="fw-bold mb-4 text-primary">Change Password</h5>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-bold small">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current"
                      className="form-control rounded-3"
                      value={passwords.current}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new"
                      className="form-control rounded-3"
                      value={passwords.new}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      className="form-control rounded-3"
                      value={passwords.confirm}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg fw-bold rounded-3 px-5"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
