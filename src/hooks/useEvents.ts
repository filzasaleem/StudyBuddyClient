import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import APIENDPOINTS from "../config";
import { useAuth } from "@clerk/clerk-react";

export interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}
export interface EventNew {
  title: string;
  start: string;
  end: string;
  description?: string;
}

// GET EVENTS
export const getEvents = async (token: string | null): Promise<Event[]> => {

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
export const addEvent = async ({
  eventNew,
  token,
}: {
  eventNew: EventNew;
  token: string | null;
}): Promise<Event> => {
  const response = await fetch(APIENDPOINTS.EVENTS.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventNew),
  });

  if (!response.ok) throw new Error("Failed to create event");
  return (await response.json()) as Event;
};


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
      const token = await getToken();
      return getEvents(token);
    },
    enabled: !!userId,
  });

  // --- CREATE EVENT ---
  const createEvent = useMutation({
    mutationFn: async (eventNew: EventNew) => {
      const token = await getToken();
      return addEvent({ eventNew, token });
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
