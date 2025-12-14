// Home.tsx
import { useStudybuddy } from "@/hooks/useStudyBuddy";
import React from "react";
import StudyBuddyCard from "./StudyBuddyCard";
import "@/components/styles/studybuddy.css";
import Loader from "../loader/Loader";
import ErrorDisplay from "../Errors/ErrorDisplay";
import EmptyState from "../emptyState/EmptyState";

export default function Home({ searchQuery = "" }: { searchQuery?: string }) {
  const { data, isLoading, isError } = useStudybuddy(searchQuery);

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorDisplay message="We couldn't load the study partners." />;
if (!data || data.length === 0) {
    return (
      <EmptyState 
        title="No partners found"
        description={
          searchQuery 
            ? `We couldn't find anyone studying "${searchQuery}". Try a different subject!`
            : "There are no study partners available right now. Check back later!"
        }
        // If searching, show "Clear Search" button. If just empty, hide button.
        actionLabel={searchQuery ? "Clear Search" : undefined}
        actionLink={searchQuery ? "/" : undefined}
      />
    );
  }
  return (
    <div className="studybuddy-card-container">
      {data?.map((card, index) => (
        <StudyBuddyCard key={index} card={card} />
      ))}
    </div>
  );
}
