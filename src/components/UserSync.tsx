import APIENDPOINTS from "@/config";
import { useAuth, useUser } from "@clerk/clerk-react";
import { config } from "process";
import { useEffect } from "react";

export function UserSync() {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();

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
      const needsUpdate = !data.firstName || !data.lastName || !data.email;

      if (!needsUpdate) return;
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

      if (!updateRes.ok) {
        console.error("Failed to update user");
        return;
      }

    };

    syncUser();
  }, [isSignedIn, getToken]);

  return null;
}
