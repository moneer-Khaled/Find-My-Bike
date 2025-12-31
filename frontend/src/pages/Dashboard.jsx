import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [myBikes, setMyBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiReady, setApiReady] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {setLoading(false);
        return;}

    axios
      .get("http://127.0.0.1:8000/api/my-bikes/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMyBikes(res.data))
      .catch((err) => {
        console.error(err.response?.data || err.message);
        setApiReady(false); // endpoint not created yet
        setMyBikes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container py-5">
        <h2 className="fw-bold">Dashboard</h2>
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-3">Dashboard</h2>
      <p className="text-muted">
        This page will show the bikes reported by the logged-in user.
      </p>

      {!apiReady && (
        <div className="alert alert-warning">
          The endpoint <b>/api/my-bikes/</b> is not available yet. Add it in the backend to load your bikes.
        </div>
      )}

      {myBikes.length === 0 ? (
        <div className="alert alert-secondary mt-4">
          You haven’t reported any bikes yet.
        </div>
      ) : (
        <div className="row mt-4">
          {myBikes.map((bike) => (
            <div className="col-md-6 col-lg-4 mb-3" key={bike.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {bike.brand} {bike.model}
                  </h5>
                  <p className="card-text text-muted">
                    Color: {bike.color} <br />
                    Status: {bike.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
