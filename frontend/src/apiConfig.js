// Centralized API Configuration
// Change this URL to switch between Port 8000, 8001, or Production URL

export const API_BASE_URL = "http://127.0.0.1:8001";

// Helper function to get full endpoint
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
