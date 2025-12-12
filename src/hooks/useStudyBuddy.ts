import APIENDPOINTS from "@/config";
import { useQuery } from "@tanstack/react-query";

export interface StudyBuddyT {
  id: string;
  initials: string;
  fullName: string;
  isOnline: boolean;
  subject: string;
  description?: string;
}

const getStudyBuddyCards = async (
  searchQuery: string = ""
): Promise<StudyBuddyT[]> => {
  const url = `${APIENDPOINTS.STDYBUDDY.GET}?q=${encodeURIComponent(searchQuery)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Failed to fetch studybuddy cards");

  return (await response.json()) as StudyBuddyT[];
};

export function useStudybuddy(searchQuery: string = "") {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studybuddyCards", searchQuery],
    queryFn: () => getStudyBuddyCards(searchQuery),
  });

  return { data, isLoading, isError };
}
