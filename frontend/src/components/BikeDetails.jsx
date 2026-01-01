import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bikes } from '../data/bikes';
import { DUTCH_CITIES } from '../data/options';

export default function BikeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSightingModal, setShowSightingModal] = useState(false);

  const [useCitySelect, setUseCitySelect] = useState(true);

  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });
  const [sightings, setSightings] = useState([]);
  const [sightingData, setSightingData] = useState({
    city: '',
    street: '',
    postalCode: '',
    date: '',
    time: '',
    details: '',
    images: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bike, setBike] = useState(null);

  useEffect(() => {
    const storedBikes = JSON.parse(localStorage.getItem('myBikes') || '[]');
    let foundBike = storedBikes.find((b) => b.id.toString() === id);

    if (!foundBike) {
      foundBike = bikes.find((b) => b.id.toString() === id);
    }

    setBike(foundBike);
  }, [id]);

  const handleSightingChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setSightingData((prev) => ({ ...prev, [name]: files }));
    } else {
      setSightingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const submitSighting = (e) => {
    e.preventDefault();
    console.log('Sighting Reported:', sightingData);

    const images = sightingData.images
      ? Array.from(sightingData.images).map((file) => URL.createObjectURL(file))
      : [];

    const newSighting = {
      ...sightingData,
      id: Date.now(),
      images: images,
      imagePreview: images.length > 0 ? images[0] : null,
    };

    setSightings([...sightings, newSighting]);

    alert('Sighting submitted successfully!');
    setShowSightingModal(false);
    setSightingData({
      city: '',
      street: '',
      postalCode: '',
      date: '',
      time: '',
      details: '',
      images: null,
    });
  };

  const handleDelete = () => {
    if (
      window.confirm(
        'Are you sure you want to delete this report? This cannot be undone.'
      )
    ) {
      const storedBikes = JSON.parse(localStorage.getItem('myBikes') || '[]');
      const updatedBikes = storedBikes.filter((b) => b.id.toString() !== id);
      localStorage.setItem('myBikes', JSON.stringify(updatedBikes));

      alert('Report deleted successfully! (Mock)');
      navigate('/dashboard');
    }
  };

  const handleMarkFound = () => {
    if (window.confirm('Is this bike found?')) {
      const storedBikes = JSON.parse(localStorage.getItem('myBikes') || '[]');
      const updatedBikes = storedBikes.map((b) => {
        if (b.id.toString() === id) {
          return { ...b, status: 'Found' };
        }
        return b;
      });
      localStorage.setItem('myBikes', JSON.stringify(updatedBikes));

      alert('Great news! Bike marked as found. (Mock)');
      navigate('/dashboard');
    }
  };

  const openLightbox = (images, index = 0) => {
    setLightboxState({ isOpen: true, images, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightboxState({ ...lightboxState, isOpen: false });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxState((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  const [mainImageIndex, setMainImageIndex] = useState(0);

  const nextMainImage = (e) => {
    e.stopPropagation();
    if (bike.images && bike.images.length > 0) {
      setMainImageIndex((prev) => (prev + 1) % bike.images.length);
    }
  };

  const prevMainImage = (e) => {
    e.stopPropagation();
    if (bike.images && bike.images.length > 0) {
      setMainImageIndex(
        (prev) => (prev - 1 + bike.images.length) % bike.images.length
      );
    }
  };

  if (!bike) return <div className="text-center mt-5">Bike not found</div>;

  const displayImages =
    bike.images && bike.images.length > 0 ? bike.images : [bike.image];

  return (
    <div className="container py-5">
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        <div
          className="position-relative bg-light text-center p-0"
          style={{ height: '400px', backgroundColor: '#f0f2f5' }}
        >
          <img
            src={displayImages[mainImageIndex]}
            alt={bike.brand}
            className="h-100"
            style={{
              maxWidth: '100%',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
            onClick={() => openLightbox(displayImages, mainImageIndex)}
          />

          {displayImages.length > 1 && (
            <>
              <button
                className="btn btn-dark bg-opacity-50 border-0 position-absolute start-0 top-50 translate-middle-y ms-3 rounded-circle text-white shadow-sm"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={prevMainImage}
              >
                &lsaquo;
              </button>
              <button
                className="btn btn-dark bg-opacity-50 border-0 position-absolute end-0 top-50 translate-middle-y me-3 rounded-circle text-white shadow-sm"
                style={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={nextMainImage}
              >
                &rsaquo;
              </button>
              {/* Dots */}
              <div className="position-absolute bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
                {displayImages.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImageIndex(idx)}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor:
                        idx === mainImageIndex
                          ? '#fff'
                          : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  />
                ))}
              </div>
            </>
          )}

          <div className="position-absolute top-0 end-0 m-3">
            <button
              className="btn btn-sm btn-light bg-white bg-opacity-75 border-0 rounded-circle shadow-sm p-2"
              onClick={() => openLightbox(displayImages, mainImageIndex)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrows-fullscreen"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="card-body p-5">
          <div className="row align-items-center mb-4">
            <div className="col-md-8 order-2 order-md-1">
              <h2 className="fw-bold mb-1">
                {bike.brand} - {bike.model}
              </h2>
              <p className="text-muted mb-0">Frame: {bike.frame}</p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0 order-1 order-md-2">
              <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-2">
                <button
                  className="btn btn-outline-success"
                  onClick={handleMarkFound}
                >
                  Mark as Found
                </button>
                <Link
                  to={`/bikes/edit/${bike.id}`}
                  className="btn btn-outline-dark"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-outline-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-6 col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Color</small>
                <span className="fw-bold">{bike.color}</span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Location</small>
                <span className="fw-bold">{bike.location}</span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Street</small>
                <span className="fw-bold">{bike.street}</span>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Postal Code</small>
                <span className="fw-bold">{bike.post_code}</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div
              className="p-3 border rounded-2 bg-light"
              style={{ width: 'fit-content', minWidth: '200px' }}
            >
              <small className="text-muted d-block mb-1">Theft Date</small>
              <span className="fw-bold">{bike.date}</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="p-4 border rounded-2 bg-light">
              <small className="text-muted d-block mb-2">Description</small>
              <p className="mb-0 text-secondary">
                This is a {bike.color} {bike.brand} {bike.model}. Please contact
                us if you have seen it locally in {bike.location}. (This is
                placeholder text for the description field).
              </p>
            </div>
          </div>

          <hr className="my-5" />

          <div className="d-flex flex-wrap justify-content-between align-items-end mb-3 px-1 gap-3">
            <div>
              <h4 className="fw-bold mb-1 d-flex align-items-center text-dark">
                <span
                  className="bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-2 d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                </span>
                Reported Sightings
              </h4>
              <p
                className="text-muted small ms-5 mb-0"
                style={{ marginTop: '-5px' }}
              >
                Community reports for this bike
              </p>
            </div>
            <button
              className="btn btn-sm btn-dark shadow-sm rounded-pill px-3"
              onClick={() => setShowSightingModal(true)}
            >
              + Report Sighting
            </button>
          </div>

          <div className="d-flex flex-column gap-3">
            {sightings.length === 0 ? (
              <div className="text-center py-4 bg-light rounded-3 border-0">
                <div className="mb-2 text-muted opacity-25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    fill="currentColor"
                    className="bi bi-binoculars-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7.793l4-4.5V1.5a.5.5 0 0 0-.5-.5h-8z" />
                    <path d="M3.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h2z" />
                  </svg>
                </div>
                <h6 className="fw-bold text-secondary mb-1">
                  No sightings reported yet
                </h6>
                <p className="text-muted small mb-0">
                  Be the first to help find this bike!
                </p>
              </div>
            ) : (
              sightings.map((sighting) => (
                <div
                  key={sighting.id}
                  className="card shadow-sm border rounded-2 overflow-hidden hover-shadow transition-all p-2"
                >
                  <div className="d-flex h-100">
                    <div
                      className="rounded-1 overflow-hidden position-relative bg-light border d-flex align-items-center justify-content-center"
                      style={{ width: '120px', height: '90px', flexShrink: 0 }}
                    >
                      {sighting.images && sighting.images.length > 0 ? (
                        <>
                          <img
                            src={sighting.images[0]}
                            alt="Sighting"
                            className="h-100 w-100"
                            style={{ objectFit: 'cover', cursor: 'pointer' }}
                            onClick={() => openLightbox(sighting.images)}
                          />
                          {sighting.images.length > 1 && (
                            <div
                              className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-1 py-0 m-1 rounded-1"
                              style={{ fontSize: '0.6rem' }}
                            >
                              +{sighting.images.length - 1}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-muted text-center p-1">
                          <div className="border border-secondary border-opacity-25 p-1 d-inline-block rounded-1 mb-1">
                            <div
                              style={{
                                width: '20px',
                                height: '14px',
                                border: '1px solid #999',
                                position: 'relative',
                              }}
                            >
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  border: '1px solid #999',
                                  transform: 'rotate(15deg) scale(0.8)',
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="ms-3 flex-grow-1 d-flex flex-column justify-content-center">
                      <h6
                        className="fw-bold text-dark mb-1"
                        style={{ fontSize: '0.95rem' }}
                      >
                        {sighting.city}
                        {[sighting.street, sighting.postalCode].filter(Boolean)
                          .length > 0 && (
                          <span className="text-muted fw-normal">
                            ,{' '}
                            {[sighting.street, sighting.postalCode]
                              .filter(Boolean)
                              .join(', ')}
                          </span>
                        )}
                      </h6>

                      <div
                        className="text-muted small mb-2"
                        style={{ fontSize: '0.8rem' }}
                      >
                        {sighting.date} {sighting.time && `- ${sighting.time}`}
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-end gap-2">
                        <div style={{ maxWidth: '100%' }}>
                          <small
                            className="text-uppercase text-muted fw-bold d-block"
                            style={{
                              fontSize: '0.65rem',
                              paddingBottom: '2px',
                            }}
                          >
                            DETAILS
                          </small>
                          <p
                            className="text-secondary mb-0 text-wrap"
                            style={{
                              fontSize: '0.8rem',
                              wordBreak: 'break-word',
                            }}
                          >
                            {sighting.details || 'No details provided.'}
                          </p>
                        </div>

                        <button
                          className="btn btn-link text-decoration-none p-0 text-muted fst-italic"
                          onClick={() =>
                            alert(
                              `Contacting Owner at: owner_${bike.id}@example.com`
                            )
                          }
                          style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                        >
                          Contact Owner &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {lightboxState.isOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999 }}
          onClick={closeLightbox}
        >
          <div className="position-relative w-100 h-100 d-flex align-items-center justify-content-center">
            <img
              src={lightboxState.images[lightboxState.currentIndex]}
              alt="Full Size"
              style={{
                maxWidth: '90%',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="btn btn-close btn-close-white position-absolute top-0 end-0 m-4 fs-3"
              onClick={closeLightbox}
            ></button>

            {lightboxState.images.length > 1 && (
              <>
                <button
                  className="btn btn-link position-absolute start-0 top-50 translate-middle-y text-white p-3 text-decoration-none"
                  style={{ fontSize: '3rem', opacity: 0.7 }}
                  onClick={prevImage}
                >
                  &lsaquo;
                </button>
                <button
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-white p-3 text-decoration-none"
                  style={{ fontSize: '3rem', opacity: 0.7 }}
                  onClick={nextImage}
                >
                  &rsaquo;
                </button>
                {/* Image Counter */}
                <div className="position-absolute bottom-0 text-white pb-3 small bg-dark bg-opacity-50 px-3 py-1 rounded-pill">
                  {lightboxState.currentIndex + 1} /{' '}
                  {lightboxState.images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showSightingModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              {/* Header */}
              <div className="modal-header border-0 pb-0 pt-4 px-4">
                <h4 className="modal-title fw-bold text-primary">
                  Have you seen this bike?
                </h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSightingModal(false)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body p-4">
                <form onSubmit={submitSighting}>
                  {/* City with Toggle Logic */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small">City</label>
                    <div className="input-group">
                      {useCitySelect ? (
                        <select
                          className="form-select bg-light border-0"
                          name="city"
                          value={sightingData.city}
                          onChange={handleSightingChange}
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
                          className="form-control bg-light border-0"
                          placeholder="Enter city..."
                          name="city"
                          value={sightingData.city}
                          onChange={handleSightingChange}
                        />
                      )}
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setUseCitySelect(!useCitySelect)}
                      >
                        {useCitySelect ? 'Type' : 'List'}
                      </button>
                    </div>
                  </div>

                  {/* Street & Postal Code */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        Street Name
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        name="street"
                        value={sightingData.street}
                        onChange={handleSightingChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light border-0"
                        name="postalCode"
                        value={sightingData.postalCode}
                        onChange={handleSightingChange}
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">Date</label>
                      <input
                        type="date"
                        className="form-control bg-light border-0"
                        name="date"
                        value={sightingData.date}
                        onChange={handleSightingChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold small">Time</label>
                      <input
                        type="time"
                        className="form-control bg-light border-0"
                        name="time"
                        value={sightingData.time}
                        onChange={handleSightingChange}
                      />
                    </div>
                  </div>

                  {/* Proof / Images */}
                  <div className="mb-3">
                    <label className="form-label fw-bold small">
                      Proof / Images (Optional)
                    </label>
                    <label
                      className="form-control bg-light border-0 d-flex flex-column align-items-center justify-content-center py-4"
                      style={{
                        cursor: 'pointer',
                        height: '180px',
                        border: '2px dashed #ccc',
                      }}
                    >
                      {sightingData.images && sightingData.images.length > 0 ? (
                        <div className="text-center">
                          <div className="mb-2 p-2 bg-success bg-opacity-10 rounded-circle text-success d-inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="currentColor"
                              className="bi bi-check-lg"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                          </div>
                          <div className="fw-bold text-dark">
                            {sightingData.images.length} File(s) Selected
                          </div>
                          <div className="text-muted small mt-1">
                            Click to change
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="mb-3 p-3 bg-primary bg-opacity-10 rounded-circle text-primary d-inline-block">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              fill="currentColor"
                              className="bi bi-cloud-arrow-up-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2m2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0z" />
                            </svg>
                          </div>
                          <div className="fw-bold text-dark d-block">
                            Click to upload photos
                          </div>
                          <div className="text-muted small mt-1">
                            Supports JPG, PNG
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        className="d-none"
                        name="images"
                        multiple
                        onChange={handleSightingChange}
                      />
                    </label>
                  </div>

                  {/* Details */}
                  <div className="mb-4">
                    <label className="form-label fw-bold small">Details</label>
                    <textarea
                      className="form-control bg-light border-0"
                      rows="4"
                      name="details"
                      value={sightingData.details}
                      onChange={handleSightingChange}
                      placeholder="Describe specifically where you saw it..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary py-2 fw-bold shadow-sm"
                    >
                      Submit Sighting
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
