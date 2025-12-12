// src/hooks/useConnections.ts
import APIENDPOINTS from "@/config";
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserSync } from "./useUserSync";

export interface Connection {
  id: string;
  senderId: string;
  receiverId: string;
  status: "Pending" | "Accepted" | "Rejected";
}

interface ConnectionRequestDto {
  senderId: string | undefined;
  receiverId: string | undefined;
}

interface ConnectionResponseDto {
  status: "Accepted" | "Rejected";
}

export function useConnections() {
  const { user } = useUserSync();
  const currentUserId = user?.id;
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // ---------------------
  // Fetch pending connection requests (polling)
  // ---------------------
  const pendingQuery = useQuery<Connection[]>({
    queryKey: ["connections", "pending", currentUserId],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(
        APIENDPOINTS.CONNECTION.GET_PENDING_REQUESTS(currentUserId),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch pending requests");
      return res.json();
    },
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 0, // always refetch on interval
  });

  // ---------------------
  // Fetch notifications (polling)
  // ---------------------
  const notificationsQuery = useQuery<
    { message: string; connectionId: string }[]
  >({
    queryKey: ["notifications", currentUserId],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(
        APIENDPOINTS.CONNECTION.NOTIFICATION(currentUserId),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
    refetchInterval: 5000, // Poll every 5 seconds
    staleTime: 0,
  });

  // ---------------------
  // Send connection request
  // ---------------------
  const sendRequestMutation = useMutation({
    mutationFn: async (data: ConnectionRequestDto) => {
      const token = await getToken();
      const res = await fetch(APIENDPOINTS.CONNECTION.SEND_REQUEST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send request");
      return res.json();
    },
    onSuccess: () => {
      // Refetch pending requests and notifications after sending request
      queryClient.invalidateQueries(["connections", "pending", currentUserId]);
      queryClient.invalidateQueries(["notifications", currentUserId]);
    },
  });

  // ---------------------
  // Respond to connection request
  // ---------------------
  const respondMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "Accepted" | "Rejected";
    }) => {
      const token = await getToken();
      const res = await fetch(APIENDPOINTS.CONNECTION.SEND_RESPONSE(id), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to respond");
      return res.json();
    },
    onSuccess: () => {
      // Refetch pending requests and notifications after responding
      queryClient.invalidateQueries(["connections", "pending", currentUserId]);
      queryClient.invalidateQueries(["notifications", currentUserId]);
    },
  });

  return {
    pendingQuery,
    notificationsQuery,
    sendRequestMutation,
    respondMutation,
  };
}
