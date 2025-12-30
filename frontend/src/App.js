import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';
import BikeDetails from './components/BikeDetails';
import ReportMissing from './components/ReportMissing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bikes/:id" element={<BikeDetails />} />

          {/* 🔒 protect report page if you want logged-in only */}
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportMissing />
              </ProtectedRoute>
            }
          />

          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 dashboard is logged-in only */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
