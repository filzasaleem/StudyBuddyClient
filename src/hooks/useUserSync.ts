// src/hooks/useUserSync.ts
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import APIENDPOINTS from "@/config";

export interface BackendUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export function useUserSync() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();

  // -------------------------------
  // 1. Fetch User From Backend
  // -------------------------------
  const userQuery = useQuery<BackendUser>({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const token = await getToken();
      console.log("token",token);
      if (!token) throw new Error("Missing token");

      const res = await fetch(APIENDPOINTS.USER.GET, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      return res.json();
    },

    enabled: isSignedIn, // only run when logged in
  });

  // -------------------------------
  // 2. Sync Clerk → Backend (only if backend missing fields)
  // -------------------------------
  useEffect(() => {
    if (!isSignedIn || !userQuery.data) return;

    const syncProfile = async () => {
      const backendUser = userQuery.data;

      const needsUpdate =
        !backendUser.firstName ||
        !backendUser.lastName ||
        !backendUser.email;

      if (!needsUpdate) return;

      const token = await getToken();
      if (!token) return;

      const payload = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
      };

      const updateRes = await fetch(APIENDPOINTS.USER.UPDATE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (updateRes.ok) {
        // refetch user after update
        queryClient.invalidateQueries(["user", "profile"]);
      }
    };

    syncProfile();
  }, [isSignedIn, user, userQuery.data, getToken]);

  // -------------------------------
  // 3. Ping Every 60 Seconds
  // -------------------------------
  useEffect(() => {
    if (!isSignedIn) return;

    const interval = setInterval(async () => {
      const token = await getToken();
      if (!token) return;

      await fetch(APIENDPOINTS.USER.PING, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }, 60000);

    console.log("Pinging every 1 minute…");

    return () => clearInterval(interval);
  }, [isSignedIn, getToken]);

  // -------------------------------
  // Return user + status
  // -------------------------------
  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    refetch: userQuery.refetch,
  };
}
