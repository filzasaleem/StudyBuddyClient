import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import APIENDPOINTS from "../config";
import { useAuth } from "@clerk/clerk-react";

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  Subject: string;
}

// GET EVENTS
const getEvents = async (token: string | null): Promise<Event[]> => {
  const response = await fetch(APIENDPOINTS.EVENTS.GET, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch events");
  return (await response.json()) as Event[];
};

// CREATE EVENT
const addEvent = async ({
  event,
  token,
}: {
  event: Event;
  token: string | null;
}): Promise<Event> => {
  const response = await fetch(APIENDPOINTS.EVENTS.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(event),
  });

  if (!response.ok) throw new Error("Failed to create event");
  return (await response.json()) as Event;
};

// ======================================
//              HOOK
// ======================================
export function useEvents() {
  const { getToken, userId } = useAuth();
  const queryClient = useQueryClient();

  // --- GET EVENTS ---
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events", userId],
    queryFn: async () => {
      const token = await getToken(); // ✅ FIX — awaited inside
      return getEvents(token);
    },
    enabled: !!userId, // only run if logged in
  });

  // --- CREATE EVENT ---
  const createEvent = useMutation({
    mutationFn: async (event: Event) => {
      const token = await getToken(); // ✅ must also get token here
      return addEvent({ event, token });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["events", userId]);
    },
  });

  return {
    events,
    isLoading,
    isError,
    createEvent,
  };
}
