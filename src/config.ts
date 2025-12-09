// src/config/api.ts


// Base URLs for different environments
// const API_BASE_URLS = {
//   development: "http://localhost:5054/api", 
//   production: "https://my-backend.com/api",
// };

// Detect environment
// const ENV = import.meta.env.MODE || "development";

// Use the correct base URL
// export const API_BASE = API_BASE_URLS[ENV];
export const API_BASE = import.meta.env.VITE_API_BASE_URL;

// All API endpoints
export const APIENDPOINTS = {
  EVENTS: {
    GET: `${API_BASE}/events`,          // GET events for a user
    CREATE: `${API_BASE}/events`,       // POST new event
    UPDATE: (id: string) => `${API_BASE}/events/${id}`, // PUT update event
    DELETE: (id: string) => `${API_BASE}/events/${id}`, // DELETE event
  },
  USERS: {
    PROFILE: (userId: string) => `${API_BASE}/users/${userId}`,
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
  },
  // Add more APIs here as needed
};

export default APIENDPOINTS;
