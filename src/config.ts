export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const APIENDPOINTS = {
  EVENTS: {
    GET: `${API_BASE}/events`,
    CREATE: `${API_BASE}/events`,
    UPDATE: (id: string) => `${API_BASE}/events/${id}`,
    DELETE: (id: string) => `${API_BASE}/events/${id}`,
  },
  USER: {
    GET: `${API_BASE}/user/me`,
    UPDATE: `${API_BASE}/user/me`,
  },
  STDYBUDDY: {
    GET:`${API_BASE}/studybuddy`,
  }
};

export default APIENDPOINTS;
