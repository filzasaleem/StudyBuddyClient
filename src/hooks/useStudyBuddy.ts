import APIENDPOINTS from "@/config";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export interface StudyBuddyT {
  userId: string;
  initials: string;
  fullName: string;
  isOnline: boolean;
  subject: string;
  description?: string;
}

const getStudyBuddyCards = async (
  token: string | null,
  searchQuery: string = ""
): Promise<StudyBuddyT[]> => {
  const url = searchQuery
    ? `${APIENDPOINTS.STDYBUDDY.GET}?q=${encodeURIComponent(searchQuery)}`
    : APIENDPOINTS.STDYBUDDY.GET;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to fetch studybuddy cards");

  return (await response.json()) as StudyBuddyT[];
};

export function useStudybuddy(searchQuery: string = "") {
  const { getToken } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studybuddyCards", searchQuery],
    queryFn: async () => {
      const token = await getToken();
      return getStudyBuddyCards(token, searchQuery);
    },
    // refetchInterval: 5000,  how to get the lated data
  });

  return { data, isLoading, isError };
}
