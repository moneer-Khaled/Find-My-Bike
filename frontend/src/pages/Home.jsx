import React from 'react';
import BikeCard from '../components/BikeCard';
import '../index.css';

export default function Home() {
  const bikes = [
    {
      id: 1,
      brand: 'VanMoof',
      model: 'S3',
      frame: 'Test-72365',
      color: 'Black',
      status: 'Stolen',
      location: 'Amsterdam',
      street: 'Black street',
      post_code: '1115NA',
      date: '2025-01-10',
      image: '/images/4.jpg',
    },
    {
      id: 2,
      brand: 'Gazelle',
      model: 'Chamonix',
      frame: 'Test-7235546',
      color: 'Blue',
      status: 'Found',
      location: 'Utrecht',
      street: 'Central',
      post_code: '1004AB',
      date: '2024-12-20',
      image: '/images/2.jpg',
    },
    {
      id: 3,
      brand: 'Cowboy',
      model: 'C4',
      frame: 'Test-72352052',
      color: 'Gray',
      status: 'Stolen',
      location: 'Rotterdam',
      street: 'White Street',
      post_code: '1124CB',
      date: '2025-02-01',
      image: '/images/3.jpg',
    },
    {
      id: 4,
      brand: 'Trek',
      model: 'FX 3',
      frame: 'Test-72358901',
      color: 'Red',
      status: 'Found',
      location: 'The Hague',
      street: 'Prinsengracht',
      post_code: '2595AA',
      date: '2025-01-25',
      image: '/images/4.jpg',
    },
  ];

  return (
    <div>
      <div className="banner-section py-5 text-center text-light">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">Help find stolen Bikes</h1>
          <p className="lead mb-0">
            Join our community to track and recover stolen bikes -
          </p>
        </div>
        <div
          className="row justify-content-center mt-4"
          style={{ marginTop: '-2.5rem' }}
        >
          <div className="col-md-6">
            <div className="input-group input-group-lg shadow-lg border-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search by brand, model...."
              />
              <button className="btn btn-primary fw-bold px-4">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3">
        <h3 className="mt-4">Recent Reports</h3>
      </div>
      <div className="row mt-4 mx-3">
        <div className="col-md-2 mb-3">
          <select className="form-select shadow-sm border-1">
            <option value="">All Status</option>
            <option value="stolen">Stolen</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select shadow-sm border-1">
            <option value="">All Brands</option>
            <option></option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select shadow-sm border-1">
            <option value="">All Colors</option>
            <option></option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select shadow-sm border-1">
            <option value="">All Cities</option>
            <option></option>
          </select>
        </div>

        <div className="col-md-2 mb-3">
          <select className="form-select shadow-sm border-1">
            <option value="">Any Date</option>
            <option></option>
          </select>
        </div>

        <div className="row mt-4">
          {bikes.map((bike) => (
            <div key={bike.id} className="col-md-3 mb-4">
              <BikeCard data={bike} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
