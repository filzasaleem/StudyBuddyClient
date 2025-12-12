import { useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import APIENDPOINTS from "@/config";
import { useAuth } from "@clerk/clerk-react";

export function useNotifications() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // Define a query key for notifications
  const queryKey = ["notifications"];

  // Initialize the query to hold notifications
  const { data = [] } = useQuery<string[]>({
    queryKey,
    queryFn: async () => {
      // Start with empty array
      return [];
    },
    // Keep the data "fresh" indefinitely
    staleTime: Infinity,
  });

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(APIENDPOINTS.NOTIFICATIONHUB, {
        accessTokenFactory: async () => (await getToken()) ?? "",
      })
      .withAutomaticReconnect()
      .build();

    // Listen for incoming notifications
    connection.on("ReceiveNotification", (message: string) => {
      console.log("--------notification----------", message);
      // Update the TanStack Query cache
      queryClient.setQueryData<string[]>(queryKey, (old = []) => [
        ...old,
        message,
      ]);
    });

    connection.start().catch((err) => console.error("SignalR Error:", err));

    return () => {
      connection.stop();
    };
  }, [queryClient, queryKey]);

  return data;
}
