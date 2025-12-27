import React from 'react';
import { useEffect, useState } from 'react';
import { bikes } from '../data/bikes';
import BikeCard from '../components/BikeCard';
import '../index.css';
import { RAW_BRANDS, RAW_COLORS, DUTCH_CITIES, DATE_OPTIONS } from '../data/options';

export default function Home() {
  const [filters, setFilters] = useState({
    status: '',
    brand: '',
    color: '',
    city: '',
    date: '',
    search: '',
  });

  const isFilterActive = Object.values(filters).some((val) => val !== '');

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setFilters({
      status: '',
      brand: '',
      color: '',
      city: '',
      date: '',
      search: '',
    });
  };

  const filteredBikes = bikes.filter((bike) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchBrand = bike.brand.toLowerCase().includes(searchLower);
      const matchModel = bike.model.toLowerCase().includes(searchLower);
      const matchCity = bike.location.toLowerCase().includes(searchLower);
      if (!matchBrand && !matchModel && !matchCity) {
        return false;
      }
    }
    if (
      filters.status &&
      bike.status.toLowerCase() !== filters.status.toLowerCase()
    ) {
      return false;
    }
    // Filter Brand
    if (
      filters.brand &&
      bike.brand !== filters.brand &&
      filters.brand !== 'Other'
    ) {
      return false;
    }
    if (filters.brand === 'Other' && RAW_BRANDS.includes(bike.brand)) {
      return false;
    }

    // Filter Color
    if (
      filters.color &&
      bike.color !== filters.color &&
      filters.color !== 'Other'
    ) {
      return false;
    }
    if (filters.color === 'Other' && RAW_COLORS.includes(bike.color)) {
      return false;
    }

    // Filter City
    if (
      filters.city &&
      bike.location !== filters.city &&
      filters.city !== 'Other'
    ) {
      return false;
    }
    if (filters.city === 'Other' && DUTCH_CITIES.includes(bike.location)) {
      return false;
    }

    // Filter Date
    if (filters.date) {
      const bikeDate = new Date(bike.date);
      const today = new Date();

      if (filters.date === 'Last 24 Hours') {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (bikeDate < yesterday) return false;
      }

      if (filters.date === 'Last Week') {
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        if (bikeDate < lastWeek) return false;
      }

      if (filters.date === 'Last Month') {
        const lastMonth = new Date(today);
        lastMonth.setDate(today.getDate() - 30);
        if (bikeDate < lastMonth) return false;
      }

      if (filters.date === 'This Year') {
        if (bikeDate.getFullYear() !== today.getFullYear()) return false;
      }

      if (filters.date === 'Last Year') {
        if (bikeDate.getFullYear() !== today.getFullYear() - 1) return false;
      }
    }
    return true;
  });

  return (
    <div>
      <div className="banner-section py-5 text-center text-light">
        <div className="container py-5">
          <h1 className="display-4 fw-bold">Help find stolen Bikes</h1>
          <p className="lead mb-0">
            Join our community to track and recover stolen bikes
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
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
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
          <select
            className="form-select shadow-sm border-1"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="stolen">Stolen</option>
            <option value="found">Found</option>
          </select>
        </div>

        {/* Brands */}
        <div className="col-md-2 mb-3">
          <select
            className="form-select shadow-sm border-1"
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {RAW_BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
            <option value="Other" style={{ color: 'red' }}>
              Other
            </option>
          </select>
        </div>

        {/* Colors */}
        <div className="col-md-2 mb-3">
          <select
            className="form-select shadow-sm border-1"
            value={filters.color}
            onChange={(e) => handleFilterChange('color', e.target.value)}
          >
            <option value="">All Colors</option>
            {RAW_COLORS.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
            <option value="Other" style={{ color: 'red' }}>
              Other
            </option>
          </select>
        </div>

        {/* Cities */}
        <div className="col-md-2 mb-3">
          <select
            className="form-select shadow-sm border-1"
            value={filters.city}
            onChange={(e) => handleFilterChange('city', e.target.value)}
          >
            <option value="">All Cities</option>
            {DUTCH_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
            <option value="Other" style={{ color: 'red' }}>
              Other
            </option>
          </select>
        </div>

        {/* Date */}
        <div className="col-md-2 mb-3">
          <select
            className="form-select shadow-sm border-1"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
          >
            <option value="">Any Date</option>
            {DATE_OPTIONS.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
            <option value="Other" style={{ color: 'red' }}>
              Other
            </option>
          </select>
        </div>

        {isFilterActive && (
          <div className="col-md-2 mb-3">
            <button
              className="btn btn-outline-danger w-100 shadow-sm h-100 fw-bold"
              onClick={clearAll}
            >
              Clear All
            </button>
          </div>
        )}

        <div className="row mt-4">
          {filteredBikes.map((bike) => (
            <div key={bike.id} className="col-md-3 mb-4">
              <BikeCard data={bike} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
