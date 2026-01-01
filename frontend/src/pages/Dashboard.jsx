import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bikes } from '../data/bikes'; // Mock data
import BikeCard from '../components/BikeCard';

const Dashboard = () => {
  const [myBikes, setMyBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const storedBikes = localStorage.getItem('myBikes');
      if (storedBikes) {
        setMyBikes(JSON.parse(storedBikes));
      } else {
        const initialBikes = bikes.slice(0, 2);
        setMyBikes(initialBikes);
        localStorage.setItem('myBikes', JSON.stringify(initialBikes));
      }
      setLoading(false);
    }, 300);
    // ----------------
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Delete this report?')) {
      const updatedBikes = myBikes.filter((b) => b.id !== id);
      setMyBikes(updatedBikes);
      localStorage.setItem('myBikes', JSON.stringify(updatedBikes));
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  const hasNoReports = myBikes.length === 0;

  return (
    <div className="container py-5">
      {hasNoReports ? (
        /* Empty State */
        <div className="row justify-content-center">
          <div className="col-md-6 card p-5 text-center shadow-sm">
            <h2>No Reports Yet</h2>
            <p>Report your missing bike to see it here.</p>
            <Link to="/report" className="btn btn-primary">
              Report Bike
            </Link>
          </div>
        </div>
      ) : (
        /* Populated State */
        <div>
          <h2 className="fw-bold text-center mb-4 text-primary">
            My Dashboard
          </h2>
          <div className="row justify-content-center">
            {myBikes.map((bike) => (
              <div key={bike.id} className="col-md-4 mb-3">
                <BikeCard data={bike}>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/bikes/edit/${bike.id}`}
                      className="btn btn-sm btn-outline-secondary flex-grow-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(bike.id)}
                      className="btn btn-sm btn-outline-danger flex-grow-1"
                    >
                      Delete
                    </button>
                  </div>
                </BikeCard>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
