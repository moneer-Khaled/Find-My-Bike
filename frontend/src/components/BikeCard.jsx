import React from 'react';
import { Link } from 'react-router-dom';

export default function BikeCard({ data, children }) {
  return (
    <div className="card shadow-sm border-0 rounded-3 h-100">
      <img
        src={data.image}
        alt={`${data.brand}`}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'contain', objectPosition: 'center', backgroundColor: '#f8f9fa', padding: '10px' }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-primary">
          {data.brand} - {data.model}
        </h5>

        <p className="card-text">
          <strong>Status: </strong>
          <span
            className={`badge ${data.status === 'Stolen' ? 'bg-danger' : 'bg-success'}`}
          >
            {data.status}
          </span>
        </p>

        <p className="card-text">
          <strong>Frame:</strong> {data.frame}
        </p>

        <p className="card-text">
          <strong>Location:</strong> {data.location}, {data.street} -{' '}
          {data.post_code}
        </p>

        <p className="card-text">
          <strong>Date: </strong> {data.date}
        </p>

        <p className="card-text">
          <strong>Color:</strong> {data.color}
        </p>
        <div className="d-flex justify-content-center mt-auto">
          <Link
            to={`/bikes/${data.id}`}
            className="btn btn-primary btn-sm w-50"
          >
            View Details
          </Link>
        </div>
        
        {children && (
           <div className="mt-3">
             {children}
           </div>
        )}
      </div>
    </div>
  );
}
