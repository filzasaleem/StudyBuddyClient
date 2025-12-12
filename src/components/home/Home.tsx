import { useStudybuddy } from "@/hooks/useStudyBuddy";
import React from "react";
import StudyBuddyCard from "./StudyBuddyCard";
import "@/components/styles/studybuddy.css"

export default function Home() {
  const { data, isLoading, isError } = useStudybuddy();
  if (isLoading) {
    return <p className="loader">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="error">
        Unable to load data. Please refresh the app.
      </p>
    );
  }

  return (
    <div className="studybuddy-card-container">
      {data?.map((card,index) => (
        <StudyBuddyCard key={index} card={card} />
      ))}
    </div>
  );
}
