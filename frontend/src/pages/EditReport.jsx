import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bikes } from '../data/bikes';
import { RAW_BRANDS, RAW_COLORS, DUTCH_CITIES } from '../data/options';

const EditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [useBrandSelect, setUseBrandSelect] = useState(false);
  const [useColorSelect, setUseColorSelect] = useState(false);
  const [useCitySelect, setUseCitySelect] = useState(false);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const storedBikes = JSON.parse(localStorage.getItem('myBikes') || '[]');
    let bike = storedBikes.find((b) => b.id.toString() === id);
    if (!bike) {
      bike = bikes.find((b) => b.id.toString() === id);
    }

    if (bike) {
      setFormData({
        frameNumber: bike.frame || '',
        brand: bike.brand || '',
        model: bike.model || '',
        color: bike.color || '',
        dateStolen: bike.date || '',
        city: bike.location || '',
        street: bike.street || '',
        postalCode: bike.post_code || '',
        description: bike.description || '',
        images: bike.images || (bike.image ? [bike.image] : []),
      });
    } else {
      setFormData({
        frameNumber: '',
        brand: '',
        model: '',
        color: '',
        dateStolen: '',
        city: '',
        street: '',
        postalCode: '',
        description: '',
        images: [],
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Saving Updates (Mock):', formData);

    const processUpdates = async () => {
      let finalImages = formData.images || [];

      if (formData.newImages && formData.newImages.length > 0) {
        const newImageUrls = await Promise.all(
          Array.from(formData.newImages).map((file) => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(file);
            });
          })
        );
        finalImages = [...finalImages, ...newImageUrls];
      }

      const storedBikes = JSON.parse(localStorage.getItem('myBikes') || '[]');
      const updatedBikes = storedBikes.map((b) => {
        if (b.id.toString() === id) {
          return {
            ...b,
            brand: formData.brand,
            model: formData.model,
            color: formData.color,
            frame: formData.frameNumber,
            location: formData.city,
            street: formData.street,
            post_code: formData.postalCode,
            date: formData.dateStolen,
            description: formData.description,
            images: finalImages,
            image: finalImages.length > 0 ? finalImages[0] : b.image,
          };
        }
        return b;
      });
      localStorage.setItem('myBikes', JSON.stringify(updatedBikes));

      alert('Report updated successfully!');
      navigate('/dashboard');
    };

    processUpdates();
    // -------------------
  };

  if (!formData)
    return <div className="p-5 text-center">Loading Bike Details...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-5">
              <h2 className="fw-bold text-center mb-4 text-primary">
                Edit Bicycle Report
              </h2>
              <p className="text-muted text-center mb-5">
                Update the details of your missing bike report.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Brand</label>
                    <div className="input-group">
                      {useBrandSelect ? (
                        <select
                          name="brand"
                          className="form-select"
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
                          className="form-control"
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
                    </div>
                  </div>

                  {/* Model */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Model</label>
                    <input
                      type="text"
                      name="model"
                      className="form-control"
                      value={formData.model}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  {/* Frame Number */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Frame Number</label>
                    <input
                      type="text"
                      name="frameNumber"
                      className="form-control"
                      value={formData.frameNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold">Color</label>
                    <div className="input-group">
                      {useColorSelect ? (
                        <select
                          name="color"
                          className="form-select"
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
                          className="form-control"
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
                    </div>
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  {/* City (with Toggle) */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">City</label>
                    <div className="input-group">
                      {useCitySelect ? (
                        <select
                          name="city"
                          className="form-select"
                          value={formData.city}
                          onChange={handleChange}
                        >
                          <option value="">Select City...</option>
                          {DUTCH_CITIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name="city"
                          className="form-control"
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
                    </div>
                  </div>

                  {/* Street */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Street</label>
                    <input
                      type="text"
                      name="street"
                      className="form-control"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  {/* Postal Code */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      className="form-control"
                      value={formData.postalCode}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Date Stolen */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Date Stolen</label>
                    <input
                      type="date"
                      name="dateStolen"
                      className="form-control"
                      value={formData.dateStolen}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Description & Details
                  </label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Images */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Bike Photos</label>

                  <input
                    type="file"
                    name="newImages"
                    className="form-control"
                    multiple
                    onChange={handleChange}
                  />
                  <div className="form-text mb-2">
                    You can upload multiple images (Max 5MB each).
                  </div>

                  {/* Show Existing Images */}
                  {formData.images && formData.images.length > 0 && (
                    <div className="d-flex gap-2 flex-wrap">
                      {formData.images.map((img, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '100px',
                            height: '80px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          {typeof img === 'string' ? (
                            <img
                              src={img}
                              alt="Bike"
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          ) : (
                            <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted small">
                              New File
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-5">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg fw-bold px-5 rounded-3"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg fw-bold px-5 rounded-3"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
