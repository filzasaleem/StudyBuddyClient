import StudyBuddyCard from "./components/home/StudyBuddyCard";

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
    PING: `${API_BASE}/user/ping`,
  },
  STDYBUDDY: {
    GET:`${API_BASE}/studybuddy`,
  },
  CONNECTION: {
    SEND_REQUEST: `${API_BASE}/connections`,
    SEND_RESPONSE: (id: string) => `${API_BASE}/connections/${id}/respond`,
    GET_PENDING_REQUESTS: (currentUserId: string) => `${API_BASE}/connections/pending/${currentUserId}`,
    GET_SENT_PENDING_REQUESTS: (userId: string) => `${API_BASE}/connections/pending/sent/${userId}`,
    NOTIFICATION:(currentUserId:string) =>  `${API_BASE}/connections/notifications/${currentUserId}`,
    BUDDIES:(currentUserId:string) =>  `${API_BASE}/connections/buddies/${currentUserId}`,

    GET_ACCEPTED:""

  },
 
};

export default APIENDPOINTS;
