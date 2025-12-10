import APIENDPOINTS from "@/config";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export function UserSync() {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    if (!isSignedIn) return;

    const syncUser = async () => {
      const token = await getToken(); 
      const res = await fetch(APIENDPOINTS.USER.GET, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to sync user");
        return;
      }

      const data = await res.json();
      console.log("User synced:", data);
    };

    syncUser();
  }, [isSignedIn, getToken]);

  return null; 
}
