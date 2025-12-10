import { useAuth } from "@clerk/clerk-react";

export function useAuthToken() {
  const { getToken } = useAuth();

 const getAuthToken = async () => {
    try {
      const token = await getToken({ template: "clerk-backend" });
      return token;
    } catch (err) {
      console.error("Failed to get Clerk token:", err);
      return null;
    }
  };

  return { getAuthToken };
}
