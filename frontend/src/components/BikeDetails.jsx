import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { bikes } from '../data/bikes';

export default function BikeDetails() {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bike = bikes.find((b) => b.id === parseInt(id));

  if (!bike) return <div className="text-center mt-5">Bike not found</div>;

  return (
    <div className="container py-5">
      {/* Main Card Wrapper */}
      <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
        {/* Top Image Section */}
        <div
          className="position-relative bg-light text-center p-2"
          style={{ height: '400px' }}
        >
          <img
            src={bike.image}
            alt={bike.brand}
            className="h-100 w-100 shadow-sm rounded-3"
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div className="card-body p-5">
          {/* Header & Action Buttons */}
          <div className="row align-items-center mb-4">
            <div className="col-md-8">
              <h2 className="fw-bold mb-1">
                {bike.brand} - {bike.model}
              </h2>
              <p className="text-muted mb-0">Frame: {bike.frame}</p>
            </div>
            <div className="col-md-4 text-end">
              <button className="btn btn-outline-success me-2">
                Mark as Found
              </button>
              <button className="btn btn-outline-dark me-2">Edit</button>
              <button className="btn btn-outline-danger">Delete</button>
            </div>
          </div>

          {/* Data Grid (The Boxes) */}
          <div className="row g-3 mb-4">
            {/* Color */}
            <div className="col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Color</small>
                <span className="fw-bold">{bike.color}</span>
              </div>
            </div>
            {/* Location */}
            <div className="col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Location</small>
                <span className="fw-bold">{bike.location}</span>
              </div>
            </div>
            {/* Street */}
            <div className="col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Street</small>
                <span className="fw-bold">{bike.street}</span>
              </div>
            </div>
            {/* Postal Code */}
            <div className="col-md-3">
              <div className="p-3 border rounded-2 bg-light h-100">
                <small className="text-muted d-block mb-1">Postal Code</small>
                <span className="fw-bold">{bike.post_code}</span>
              </div>
            </div>
          </div>

          {/* Date Section */}
          <div className="mb-4">
            <div
              className="p-3 border rounded-2 bg-light"
              style={{ width: 'fit-content', minWidth: '200px' }}
            >
              <small className="text-muted d-block mb-1">Theft Date</small>
              <span className="fw-bold">{bike.date}</span>
            </div>
          </div>

          {/* Description */}
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

          {/* 6. Sightings Section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">Reported Sightings</h4>
            <button className="btn btn-secondary shadow-sm">
              Report Sighting
            </button>
          </div>

          <div className="text-center py-5 bg-light rounded-3">
            <p className="text-muted mb-0">No sightings reported yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
