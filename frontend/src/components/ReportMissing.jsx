import React, { useState } from 'react';
import { RAW_BRANDS, RAW_COLORS, DUTCH_CITIES } from '../data/options';

export default function ReportMissing() {
  const [useBrandSelect, setUseBrandSelect] = useState(false);
  const [useColorSelect, setUseColorSelect] = useState(false);
  const [useCitySelect, setUseCitySelect] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    color: '',
    frameNumber: '',
    city: '',
    street: '',
    postalCode: '',
    dateStolen: '',
    description: '',
    images: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validation Logic
  const validate = () => {
    const newErrors = {};
    if (!formData.brand) newErrors.brand = 'Brand is required';
    if (!formData.model) newErrors.model = 'Model is required';
    if (!formData.color) newErrors.color = 'Color is required';
    if (!formData.frameNumber)
      newErrors.frameNumber = 'Frame Number is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.street) newErrors.street = 'Street is required';
    if (!formData.postalCode) newErrors.postalCode = 'Postal Code is required';
    if (!formData.dateStolen) newErrors.dateStolen = 'Date Stolen is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Valid Data:', formData);
      alert('Report Submitted! Check console for details.');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="fw-bold text-center mb-4 text-primary">
                Report Stolen Bike
              </h2>
              <p className="text-muted text-center mb-5">
                Please provide as many details as possible to help us find your
                bike.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-4">
                  {/* Brand */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Brand</label>
                    <div className="input-group has-validation">
                      {useBrandSelect ? (
                        <select
                          name="brand"
                          className={`form-select ${
                            errors.brand ? 'is-invalid' : ''
                          }`}
                          value={formData.brand}
                          onChange={handleChange}
                        >
                          <option value="">Select Brand...</option>
                          {RAW_BRANDS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="brand"
                          className={`form-control ${
                            errors.brand ? 'is-invalid' : ''
                          }`}
                          placeholder="Enter brand name..."
                          value={formData.brand}
                          onChange={handleChange}
                        />
                      )}
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setUseBrandSelect(!useBrandSelect)}
                      >
                        {useBrandSelect ? 'Type' : 'List'}
                      </button>
                      {errors.brand && (
                        <div className="invalid-feedback">{errors.brand}</div>
                      )}
                    </div>
                  </div>

                  {/* Model */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Model</label>
                    <input
                      type="text"
                      name="model"
                      className={`form-control ${errors.model ? 'is-invalid' : ''}`}
                      value={formData.model}
                      onChange={handleChange}
                    />
                    {errors.model && (
                      <div className="invalid-feedback">{errors.model}</div>
                    )}
                  </div>
                  {/* Frame Number */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Frame Number</label>
                    <input
                      type="text"
                      name="frameNumber"
                      className={`form-control ${errors.frameNumber ? 'is-invalid' : ''}`}
                      value={formData.frameNumber}
                      onChange={handleChange}
                    />
                    {errors.frameNumber && (
                      <div className="invalid-feedback">
                        {errors.frameNumber}
                      </div>
                    )}
                  </div>

                  {/* Color */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Color</label>
                    <div className="input-group has-validation">
                      {useColorSelect ? (
                        <select
                          name="color"
                          className={`form-select ${
                            errors.color ? 'is-invalid' : ''
                          }`}
                          value={formData.color}
                          onChange={handleChange}
                        >
                          <option value="">Select Color...</option>
                          {RAW_COLORS.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="color"
                          className={`form-control ${
                            errors.color ? 'is-invalid' : ''
                          }`}
                          placeholder="Select Color"
                          value={formData.color}
                          onChange={handleChange}
                        />
                      )}
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setUseColorSelect(!useColorSelect)}
                      >
                        {useColorSelect ? 'Type' : 'List'}
                      </button>
                      {errors.color && (
                        <div className="invalid-feedback">{errors.color}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  {/* City */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">City</label>
                    <div className="input-group has-validation">
                      {useCitySelect ? (
                        <select
                          name="city"
                          className={`form-select ${
                            errors.city ? 'is-invalid' : ''
                          }`}
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="">Select City...</option>
                          {DUTCH_CITIES.map((city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="city"
                          className={`form-control ${
                            errors.city ? 'is-invalid' : ''
                          }`}
                          placeholder="Select City"
                          value={formData.city}
                          onChange={handleChange}
                        />
                      )}
                      <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => setUseCitySelect(!useCitySelect)}
                      >
                        {useCitySelect ? 'Type' : 'List'}
                      </button>
                      {errors.city && (
                        <div className="invalid-feedback">{errors.city}</div>
                      )}
                    </div>
                  </div>

                  {/* Street */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Street</label>
                    <input
                      type="text"
                      name="street"
                      className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                      value={formData.street}
                      onChange={handleChange}
                    />
                    {errors.street && (
                      <div className="invalid-feedback">{errors.street}</div>
                    )}
                  </div>

                  {/* Postal Code */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                    {errors.postalCode && (
                      <div className="invalid-feedback">
                        {errors.postalCode}
                      </div>
                    )}
                  </div>

                  {/* Date Stolen */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Date Stolen</label>
                    <input
                      type="date"
                      name="dateStolen"
                      className={`form-control ${errors.dateStolen ? 'is-invalid' : ''}`}
                      value={formData.dateStolen}
                      onChange={handleChange}
                    />
                    {errors.dateStolen && (
                      <div className="invalid-feedback">
                        {errors.dateStolen}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="col-12">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* Upload Images */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Bike Photos</label>
                  <input
                    type="file"
                    name="images"
                    className="form-control"
                    multiple
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <div className="form-text">
                    You can upload multiple images (Max 5MB each).
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid mt-5">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
