// src/components/UserSync.tsx
import { useUserSync } from "@/hooks/useUserSync";

export function UserSync() {
  const { user, isLoading, error } = useUserSync();

  if (user) console.log("Synced User:", user);

  return null;
}
