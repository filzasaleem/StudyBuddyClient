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
  senderId: string;
  receiverId: string;
}
export interface Buddy {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}


export function useConnections() {
  const { user } = useUserSync();
  const currentUserId = user?.id;
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // --------------------------
  // PENDING REQUESTS (Polling)
  // --------------------------
  const pendingQuery = useQuery<Connection[]>({
    queryKey: ["connections", "pending", currentUserId],
    enabled: !!currentUserId, // ⛔ BLOCK until user exists
    queryFn: async () => {
      const token = await getToken();
      const url = APIENDPOINTS.CONNECTION.GET_PENDING_REQUESTS(currentUserId!);
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch pending requests");
      return res.json();
    },
    refetchInterval: 5000,
  });

  // --------------------------
  // Buddies
  // --------------------------
  const buddiesQuery = useQuery<BuddyDto[]>({
    queryKey: ["buddies"],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(APIENDPOINTS.CONNECTION.BUDDIES(currentUserId!), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch buddies");
      return res.json();
    },
    enabled: !!currentUserId,
  });

  // --------------------------
  // NOTIFICATIONS (Polling)
  // --------------------------
  const notificationsQuery = useQuery<
    { id: string; message: string; connectionId: string }[]
  >({
    queryKey: ["notifications", currentUserId],
    enabled: !!currentUserId, // ⛔ BLOCK until user exists
    queryFn: async () => {
      const token = await getToken();
      const url = APIENDPOINTS.CONNECTION.NOTIFICATION(currentUserId!);
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      return res.json();
    },
    refetchInterval: 5000,
  });

  // --------------------------
  // SEND REQUEST
  // --------------------------
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
      queryClient.invalidateQueries(["connections", "pending", currentUserId]);
      queryClient.invalidateQueries(["notifications", currentUserId]);
    },
  });

  // --------------------------
  // ACCEPT / REJECT
  // --------------------------
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
      // Remove item from Notification immediately
      notificationsQuery.refetch();
      pendingQuery.refetch();
    },
  });

  return {
    pendingQuery,
    notificationsQuery,
    sendRequestMutation,
    respondMutation,
    buddiesQuery,
  };
}
