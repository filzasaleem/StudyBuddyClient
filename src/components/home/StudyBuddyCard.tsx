import React from "react";
import { StudyBuddyT } from "@/hooks/useStudyBuddy";

export default function StudyBuddyCard({ card }: { card: StudyBuddyT }) {
  return (
    <div className="studdybuddy-card">
      <div className="studdybuddy-card-initials">{card.initials}</div>
      <h3 className="studdybuddy-card-name">{card.fullName}</h3>
      <p
        className={`studdybuddy-card-status ${card.isOnline ? "" : "offline"}`}
      >
        {card.isOnline ? "Online" : "Offline"}
      </p>

      <div className="studdybuddy-card-subject">{card.subject}</div>
     <div className="studdybuddy-card-description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt, quidem!</div>
      <button className="btn btn-default ">Connect</button>
    </div>
  );
}
