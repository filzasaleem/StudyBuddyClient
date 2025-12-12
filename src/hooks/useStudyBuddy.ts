import APIENDPOINTS from "@/config";
import { useQuery } from "@tanstack/react-query";

export interface StudyBuddyT {
  id: string;
  initials: string;
  fullName: string;
  isOnline: boolean;
  subject: string;
  description?:string
}

const getStudyBuddyCards = async (): Promise<StudyBuddyT[]> => {
  const response = await fetch(APIENDPOINTS.STDYBUDDY.GET, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) throw new Error("Failed to fetch studybuddy cards");

  return (await response.json()) as StudyBuddyT[];
};

export function useStudybuddy() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studybuddyCards"],
    queryFn: getStudyBuddyCards, 
  });

  return { data, isLoading, isError };
}
